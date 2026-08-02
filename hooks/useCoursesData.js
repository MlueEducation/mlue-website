'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { getAllCourses, getCourseById } from '@/lib/courses';
import { fetchOwnedFullCourseIds } from '@/lib/bundles';

export function useCourseList() {
  return useQuery({ queryKey: ['courses'], queryFn: getAllCourses });
}

export function useCourse(courseId) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });
}

/* Batched "which of these courses does this user already fully own" lookup,
   React-Query-cached so a purchase invalidating ['courses'] (see
   CartCheckoutModal.js) also refreshes this — CoursesHome no longer needs
   its own local useEffect/useState pair that never refetched after a
   purchase. courseIds is joined into the query key (not just used inside
   queryFn) so a different bundle set correctly gets its own cache entry. */
export function useOwnedCourseIds(userId, courseIds) {
  const idsKey = (courseIds || []).slice().sort().join(',');
  return useQuery({
    queryKey: ['owned-course-ids', userId, idsKey],
    queryFn: () => fetchOwnedFullCourseIds(userId, courseIds),
    enabled: !!userId && (courseIds || []).length > 0,
  });
}

/* Call exactly once, near the app root (see components/CourseRealtimeSync.js).
   One shared channel for the whole app rather than one-per-page: the catalog,
   a details page, and a learn page can all have overlapping mount times
   during client-side navigation, and N separate channels would each fire
   their own (redundant) invalidateQueries for the same event. */
export function useCourseRealtimeSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    function invalidateCourse(courseId) {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      if (courseId) queryClient.invalidateQueries({ queryKey: ['course', courseId] });
    }

    const channel = supabase
      .channel('public-course-content-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, (payload) => {
        invalidateCourse(payload.new?.id ?? payload.old?.id);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'modules' }, (payload) => {
        invalidateCourse(payload.new?.course_id ?? payload.old?.course_id);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'lessons' }, (payload) => {
        invalidateCourse(payload.new?.course_id ?? payload.old?.course_id);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'materials' }, (payload) => {
        invalidateCourse(payload.new?.course_id ?? payload.old?.course_id);
      })
      // Instructor bio/avatar/specialty edits, synced via the DB-side
      // public_instructor_profiles mirror (never `profiles` directly — see
      // lib/courses.js). No course_id is present on this payload, so we
      // broadly invalidate every cached course query rather than resolving
      // exactly which course(s) reference this instructor: profile edits are
      // rare and cheap to refetch, and this table only ever contains staff
      // rows, so there's no risk of over-triggering on ordinary student
      // profile churn the way a raw `profiles` subscription would.
      .on('postgres_changes', { event: '*', schema: 'public', table: 'public_instructor_profiles' }, () => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
        queryClient.invalidateQueries({ queryKey: ['course'], exact: false });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);
}
