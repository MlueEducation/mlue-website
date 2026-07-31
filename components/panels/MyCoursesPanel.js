'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel, PanelSection, PageHeader, ProgressBar } from '@/components/ProfileUI';
import { supabase } from '@/lib/supabaseClient';
import { getCoursesByIds } from '@/lib/courses';

function CourseRow({ enrollment, courseMap, onContinue }) {
  const course = courseMap.get(enrollment.course_id) || null;
  const title = course?.title || enrollment.course_id;
  const isCompleted = !!enrollment.completed_at;

  return (
    <div className="bg-[var(--bg-surface-2)] rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--text-primary)] truncate">{title}</div>
          {course && <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{course.level} · {course.duration}</div>}
        </div>
        <button
          type="button"
          onClick={() => onContinue(enrollment.course_id)}
          className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-lg transition-colors ${
            isCompleted
              ? 'bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
          }`}
        >
          {isCompleted ? 'Yenidən bax' : 'Davam et'}
        </button>
      </div>
      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-1.5">
        <span>İrəliləyiş</span>
        <span className={isCompleted ? 'text-[var(--success)] font-bold' : ''}>{enrollment.progress_percentage || 0}% tamamlanıb</span>
      </div>
      <ProgressBar value={enrollment.progress_percentage || 0} colorClass={isCompleted ? 'bg-[var(--success)]' : 'bg-[var(--accent)]'} />
    </div>
  );
}

export default function MyCoursesPanel({ user }) {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState([]);
  const [courseMap, setCourseMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  function refresh() {
    setLoadError(null);
    setLoading(true);
    supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', user.id)
      .order('enrolled_at', { ascending: false })
      .then(async ({ data, error }) => {
        if (error) throw error;
        const rows = data || [];
        setEnrollments(rows);
        setCourseMap(await getCoursesByIds(rows.map((e) => e.course_id)));
        setLoading(false);
      })
      .catch((err) => {
        setLoadError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  function handleContinue(courseId) {
    router.push(`/courses/${courseId}/learn`);
  }

  const active = enrollments.filter((e) => !e.completed_at);
  const completed = enrollments.filter((e) => e.completed_at);

  return (
    <div>
      <PageHeader sub="Qeydiyyatdan keçdiyin bütün kurslar və irəliləyişin">Kurslarım</PageHeader>
      <div className="space-y-5">
        <Panel>
          <PanelSection first title="Davam edən kurslar" desc="Hələ tamamlanmamış kurslar">
            {loading ? (
              <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
            ) : loadError ? (
              <div className="flex items-center justify-between gap-3 bg-[var(--danger-10)] border border-[var(--danger)]/20 rounded-xl px-4 py-3">
                <p className="text-sm text-[var(--danger)]">Kurslar yüklənərkən xəta baş verdi: {loadError}</p>
                <button type="button" onClick={refresh} className="text-xs font-bold text-[var(--danger)] underline flex-shrink-0">Yenidən cəhd et</button>
              </div>
            ) : active.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Hazırda davam edən kursun yoxdur — kataloqdan bir kurs seç və başla.</p>
            ) : (
              <div className="space-y-3">
                {active.map((e) => (
                  <CourseRow key={e.id} enrollment={e} courseMap={courseMap} onContinue={handleContinue} />
                ))}
              </div>
            )}
          </PanelSection>
        </Panel>

        {!loading && completed.length > 0 && (
          <Panel>
            <PanelSection first title="Tamamlanmış kurslar" desc="Uğurla bitirdiyin kurslar">
              <div className="space-y-3">
                {completed.map((e) => (
                  <CourseRow key={e.id} enrollment={e} courseMap={courseMap} onContinue={handleContinue} />
                ))}
              </div>
            </PanelSection>
          </Panel>
        )}
      </div>
    </div>
  );
}
