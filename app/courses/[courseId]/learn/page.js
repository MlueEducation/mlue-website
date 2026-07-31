'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { useCourse } from '@/hooks/useCoursesData';
import { completeCourse as completeCourseRpc } from '@/lib/courses';
import { recordQuestAction } from '@/lib/gamification';
import { ProgressBar } from '@/components/ProfileUI';
import VideoPlayer from '@/components/course/VideoPlayer';
import CoursePlayerSidebar from '@/components/course/CoursePlayerSidebar';
import PaywallModal from '@/components/PaywallModal';

function allLessons(course) {
  return course.curriculum.flatMap((m) => m.lessons);
}

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { data: course, isLoading: courseLoading } = useCourse(courseId);
  const lessons = useMemo(() => (course ? allLessons(course) : []), [course]);

  const [enrollmentChecked, setEnrollmentChecked] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [accessLevel, setAccessLevel] = useState('full');
  const [enrollmentError, setEnrollmentError] = useState(null);
  const [progressMap, setProgressMap] = useState({});
  const [activeLessonId, setActiveLessonId] = useState(() => lessons[0]?.id);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [completionError, setCompletionError] = useState(null);
  const [paywallOpen, setPaywallOpen] = useState(false);

  // Kept above every early return (Rules of Hooks) and narrowed to
  // lessons+activeLessonId only, so VideoPlayer's memo comparator (see
  // components/course/VideoPlayer.js) is handed a referentially-stable
  // lesson object whenever the active lesson's own id/videoUrl are
  // unchanged, even if `course` itself was refetched via realtime.
  const activeLesson = useMemo(
    () => lessons.find((l) => l.id === activeLessonId),
    [lessons, activeLessonId]
  );

  useEffect(() => {
    if (course && lessons.length > 0 && !activeLessonId) setActiveLessonId(lessons[0].id);
  }, [course, lessons, activeLessonId]);

  useEffect(() => {
    if (!user || !course) return;

    supabase
      .from('user_courses')
      .select('completed_at, access_level')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          console.error('Enrollment check failed:', error.message);
          setEnrollmentError('Kursun statusunu yoxlayarkən xəta baş verdi.');
          setEnrollmentChecked(true);
          return;
        }
        setEnrolled(!!data);
        setAccessLevel(data?.access_level || 'full');
        setCourseCompleted(!!data?.completed_at);
        setEnrollmentChecked(true);
      })
      .catch((err) => {
        console.error('Enrollment check threw:', err);
        setEnrollmentError('Kursun statusunu yoxlayarkən xəta baş verdi.');
        setEnrollmentChecked(true);
      });

    supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .then(({ data }) => {
        const map = {};
        (data || []).forEach((row) => { map[row.lesson_id] = true; });
        setProgressMap(map);
      });
  }, [user, course]);

  useEffect(() => {
    if (enrollmentChecked && !enrolled && !enrollmentError) {
      router.push(`/courses/${courseId}`);
    }
  }, [enrollmentChecked, enrolled, enrollmentError, courseId, router]);

  const unlockedIds = useMemo(() => {
    const set = new Set();
    lessons.forEach((lesson, i) => {
      if (i === 0 || progressMap[lessons[i - 1].id]) set.add(lesson.id);
    });
    return set;
  }, [lessons, progressMap]);

  async function completeLesson(lessonId) {
    if (progressMap[lessonId]) return;
    const nextProgressMap = { ...progressMap, [lessonId]: true };
    setProgressMap(nextProgressMap);
    await supabase.from('lesson_progress').upsert(
      { user_id: user.id, course_id: course.id, lesson_id: lessonId, completed_at: new Date().toISOString() },
      { onConflict: 'user_id,course_id,lesson_id' }
    );
    const percent = Math.round((Object.keys(nextProgressMap).length / lessons.length) * 100);
    await supabase.from('user_courses').update({ progress_percentage: percent }).eq('user_id', user.id).eq('course_id', course.id);
    const idx = lessons.findIndex((l) => l.id === lessonId);
    const next = lessons[idx + 1];
    if (next) setActiveLessonId(next.id);
    recordQuestAction('lesson_complete').catch((err) => console.error('Tapşırıq qeydə alınmadı:', err.message));
  }

  function handleCompleteCourse() {
    if (accessLevel === 'audit') {
      setPaywallOpen(true);
      return;
    }
    return doCompleteCourse();
  }

  // Split out so PaywallModal's onUnlocked can call this directly, right
  // after purchasing — calling handleCompleteCourse() there instead would
  // read a stale (still 'audit') `accessLevel` from the closure, since
  // setAccessLevel('full') hasn't re-rendered yet, and would just reopen
  // the paywall it was meant to dismiss.
  async function doCompleteCourse() {
    setCompleting(true);
    setCompletionError(null);
    try {
      await completeCourseRpc(course.id);
      setCourseCompleted(true);
      // complete_course() lives as an opaque Supabase-side RPC (no SQL in
      // this repo) — counting it toward the weekly "complete a course" quest
      // client-side, fire-and-forget, rather than risking a blind rewrite of
      // that already-live, working function.
      recordQuestAction('course_complete').catch((err) => console.error('Tapşırıq qeydə alınmadı:', err.message));
    } catch (err) {
      // A second tab/click racing this one hits the RPC's `completed_at is
      // null` guard and gets this same "already completed" message back —
      // safe to treat as success (only one of the two races actually
      // awarded anything). Any other error is a real failure, surfaced.
      if (err.message?.includes('artıq tamamlanıb')) {
        setCourseCompleted(true);
      } else {
        setCompletionError(err.message);
      }
    } finally {
      setCompleting(false);
    }
  }

  if (loading || courseLoading) {
    return (
      <div data-theme="dark" className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div data-theme="dark" className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Kurs tapılmadı.</p>
      </div>
    );
  }

  if (course.curriculum.length === 0) {
    return (
      <div data-theme="dark" className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center px-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">Məzmun hazırlanır</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Bu kursun dərsləri hələ əlavə olunmayıb.</p>
          <Link href={`/courses/${courseId}`} className="block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-lg transition-colors">Kurs səhifəsinə qayıt</Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div data-theme="dark" className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center px-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">Kursu izləmək üçün daxil ol</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Bu səhifə yalnız giriş etmiş istifadəçilər üçündür.</p>
          <Link href="/giris" className="block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-lg transition-colors">Giriş et</Link>
        </div>
      </div>
    );
  }

  if (!enrollmentChecked) {
    return (
      <div data-theme="dark" className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  if (enrollmentError) {
    return (
      <div data-theme="dark" className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center px-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">Xəta baş verdi</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">{enrollmentError}</p>
          <Link href={`/courses/${courseId}`} className="block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-lg transition-colors">Kurs səhifəsinə qayıt</Link>
        </div>
      </div>
    );
  }

  const completedCount = Object.keys(progressMap).length;
  const progressPercent = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;
  const allDone = lessons.length > 0 && completedCount >= lessons.length;

  return (
    <div data-theme="dark" className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex flex-col md:flex-row">
      <div className="flex-1 p-4 md:p-8 min-w-0">
        <div className="mb-4">
          <div className="text-xs text-[var(--text-tertiary)] mb-1">{course.title}</div>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">{activeLesson?.title}</h1>
        </div>

        <VideoPlayer lesson={activeLesson} onComplete={() => activeLesson && completeLesson(activeLesson.id)} />

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-1.5">
              <span>İrəliləyiş</span>
              <span>{progressPercent}%</span>
            </div>
            <ProgressBar value={progressPercent} />
          </div>
          <button
            type="button"
            onClick={handleCompleteCourse}
            disabled={!allDone || courseCompleted || completing}
            className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-colors flex-shrink-0 ${
              courseCompleted
                ? 'bg-[var(--success-soft)] text-[var(--success)] cursor-default'
                : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-40'
            }`}
          >
            {courseCompleted ? 'Kurs tamamlandı ✓' : completing ? 'Tamamlanır...' : 'Kurs tamamlandı'}
          </button>
        </div>
        {completionError && <p className="text-xs text-[var(--danger)] mt-2">{completionError}</p>}
      </div>

      <aside className="md:w-80 flex-shrink-0 border-t md:border-t-0 md:border-l border-[var(--border)] md:h-[calc(100vh-var(--header-h))] md:sticky md:top-[var(--header-h)]">
        <CoursePlayerSidebar
          user={user}
          course={course}
          progressMap={progressMap}
          activeLessonId={activeLessonId}
          unlockedIds={unlockedIds}
          onSelectLesson={setActiveLessonId}
        />
      </aside>

      <PaywallModal
        open={paywallOpen}
        course={course}
        onClose={() => setPaywallOpen(false)}
        onUnlocked={() => {
          setAccessLevel('full');
          setPaywallOpen(false);
          doCompleteCourse();
        }}
      />
    </div>
  );
}
