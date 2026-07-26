'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Panel, PanelSection, PageHeader, ProgressBar } from '@/components/ProfileUI';
import { supabase } from '@/lib/supabaseClient';
import { getCourseById } from '@/lib/courseCatalog';

function CourseRow({ enrollment, onContinue }) {
  const course = getCourseById(enrollment.course_id);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', user.id)
      .order('enrolled_at', { ascending: false })
      .then(({ data }) => {
        setEnrollments(data || []);
        setLoading(false);
      });
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
            ) : active.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Hazırda davam edən kursun yoxdur — kataloqdan bir kurs seç və başla.</p>
            ) : (
              <div className="space-y-3">
                {active.map((e) => (
                  <CourseRow key={e.id} enrollment={e} onContinue={handleContinue} />
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
                  <CourseRow key={e.id} enrollment={e} onContinue={handleContinue} />
                ))}
              </div>
            </PanelSection>
          </Panel>
        )}
      </div>
    </div>
  );
}
