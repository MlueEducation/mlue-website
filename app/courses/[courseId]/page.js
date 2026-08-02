'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { useCourse } from '@/hooks/useCoursesData';
import { startAudit } from '@/lib/purchases';
import { useCart } from '@/components/CartProvider';
import CourseDetailsView from '@/components/course/CourseDetailsView';

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const cart = useCart();

  const { data: course, isLoading: courseLoading, isError: courseError } = useCourse(courseId);

  const [accessLevel, setAccessLevel] = useState('none');
  const [checking, setChecking] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  useEffect(() => {
    if (!user || !course) { setChecking(false); return; }
    supabase
      .from('user_courses')
      .select('access_level')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) console.error('Enrollment check failed:', error.message);
        // No row at all means genuinely never enrolled ('none'). A row that
        // exists but has a null access_level is legacy pre-paywall data —
        // that enrollment predates 'audit' mode, so it always meant full
        // access.
        setAccessLevel(data ? (data.access_level || 'full') : 'none');
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
        { user_id: user.id, course_id: course.id, access_level: 'full' },
        { onConflict: 'user_id,course_id' }
      );
      if (error) throw error;
      setAccessLevel('full');
    } catch (err) {
      console.error('Enrollment failed:', err);
      setEnrollError('Qeydiyyat alınmadı. Zəhmət olmasa yenidən cəhd et.');
    } finally {
      setEnrolling(false);
    }
  }

  async function handleStartAudit() {
    if (!user) { router.push('/giris'); return; }
    setEnrolling(true);
    setEnrollError(null);
    try {
      await startAudit(user.id, course.id);
      setAccessLevel('audit');
    } catch (err) {
      console.error('Audit start failed:', err);
      setEnrollError('Alınmadı. Zəhmət olmasa yenidən cəhd et.');
    } finally {
      setEnrolling(false);
    }
  }

  function handleAddToCart() {
    if (!user) { router.push('/giris'); return; }
    cart.addCourse(course);
  }

  function handleStart() {
    router.push(`/courses/${course.id}/learn`);
  }

  return (
    <CourseDetailsView
      course={course}
      accessLevel={accessLevel}
      checking={checking}
      enrolling={enrolling}
      enrollError={enrollError}
      onEnroll={handleEnroll}
      onStart={handleStart}
      onAddToCart={handleAddToCart}
      onStartAudit={handleStartAudit}
      onUpgrade={handleAddToCart}
    />
  );
}
