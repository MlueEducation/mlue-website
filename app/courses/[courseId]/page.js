'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { getCourseById } from '@/lib/courses';

export default function CourseDetailsPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState(false);

  const [enrolled, setEnrolled] = useState(false);
  const [checking, setChecking] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setCourseLoading(true);
    setCourseError(false);
    getCourseById(courseId)
      .then((data) => { if (!cancelled) { setCourse(data); setCourseLoading(false); } })
      .catch((err) => {
        console.error('Course fetch failed:', err);
        if (!cancelled) { setCourseError(true); setCourseLoading(false); }
      });
    return () => { cancelled = true; };
  }, [courseId]);

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

  const hasContent = course.curriculum.length > 0 && course.curriculum.some((m) => m.lessons.length > 0);

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

  const mentorInitials = course.mentor ? course.mentor.split(' ').map((n) => n[0]).join('') : '?';

  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-2">{course.level} · {course.duration}</div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">{course.title}</h1>
          {course.summary && <p className="text-[var(--text-secondary)] mb-5">{course.summary}</p>}
          {course.mentor && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0">
                {mentorInitials}
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text-primary)]">{course.mentor}</div>
                <div className="text-xs text-[var(--text-secondary)]">{course.mentorTitle}</div>
              </div>
            </div>
          )}
        </div>

        {course.whatYouWillLearn.length > 0 && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Nələr Öyrənəcəksən?</h2>
            <ul className="space-y-2.5">
              {course.whatYouWillLearn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--success)] font-bold mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasContent && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Mündəricat</h2>
            <div className="space-y-5">
              {course.curriculum.map((mod) => (
                <div key={mod.id}>
                  <div className="text-sm font-bold text-[var(--text-primary)] mb-2">{mod.title}</div>
                  <ul className="space-y-1.5 pl-1">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-center justify-between gap-3 text-sm text-[var(--text-secondary)]">
                        <span>{lesson.title}</span>
                        <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">{lesson.duration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasContent ? (
          <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-5 py-4 text-sm text-[var(--text-secondary)]">
            Bu kursun məzmunu hazırda hazırlanır — tezliklə əlavə olunacaq. Qeydiyyat funksiyası məzmun əlavə olunandan sonra aktivləşəcək.
          </div>
        ) : enrolled ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              disabled
              className="w-full sm:w-auto bg-[var(--success-soft)] text-[var(--success)] font-bold px-6 py-3.5 rounded-lg cursor-default"
            >
              ✅ Kurs Əlavə Edildi
            </button>
            <button
              type="button"
              onClick={handleStart}
              className="w-full sm:w-auto bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              ▶️ Kursa Başla
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={handleEnroll}
              disabled={enrolling || checking}
              className="w-full sm:w-auto bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              {enrolling ? 'Qeydiyyat edilir...' : 'Kursu Al'}
            </button>
            {enrollError && <p className="text-sm text-[var(--danger)] mt-3">{enrollError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
