'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { useCourse } from '@/hooks/useCoursesData';
import CourseDetailsView from '@/components/course/CourseDetailsView';

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const { data: course, isLoading: courseLoading, isError: courseError } = useCourse(courseId);

  const [enrolled, setEnrolled] = useState(false);
  const [checking, setChecking] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  useEffect(() => {
    if (!user || !course) { setChecking(false); return; }
    supabase
      .from('user_courses')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) console.error('Enrollment check failed:', error.message);
        setEnrolled(!!data);
        setChecking(false);
      })
      .catch((err) => {
        console.error('Enrollment check threw:', err);
        setChecking(false);
      });
  }, [user, course]);

  if (courseLoading) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center px-6">
        <p className="text-[var(--text-secondary)] text-center max-w-sm">Bu kurs haqqında ətraflı məlumat tezliklə əlavə olunacaq.</p>
      </div>
    );
  }

  async function handleEnroll() {
    if (!user) { router.push('/giris'); return; }
    setEnrolling(true);
    setEnrollError(null);
    try {
      const { error } = await supabase.from('user_courses').upsert(
        { user_id: user.id, course_id: course.id },
        { onConflict: 'user_id,course_id' }
      );
      if (error) throw error;
      setEnrolled(true);
    } catch (err) {
      console.error('Enrollment failed:', err);
      setEnrollError('Qeydiyyat alınmadı. Zəhmət olmasa yenidən cəhd et.');
    } finally {
      setEnrolling(false);
    }
  }

  function handleStart() {
    router.push(`/courses/${course.id}/learn`);
  }

  return (
    <CourseDetailsView
      course={course}
      enrolled={enrolled}
      checking={checking}
      enrolling={enrolling}
      enrollError={enrollError}
      onEnroll={handleEnroll}
      onStart={handleStart}
    />
  );
}
