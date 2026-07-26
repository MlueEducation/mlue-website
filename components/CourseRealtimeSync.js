'use client';

import { useCourseRealtimeSync } from '@/hooks/useCoursesData';

/* Renders nothing — just opens the one shared Supabase Realtime subscription
   for course content (see hooks/useCoursesData.js) once at the app root. */
export default function CourseRealtimeSync() {
  useCourseRealtimeSync();
  return null;
}
