'use client';

/* Pure presentational — extracted verbatim from app/courses/[courseId]/page.js
   so MLUE Studio's PreviewModal can render the exact same student-facing
   markup against in-progress (possibly unsaved) builder state, with zero risk
   of the preview drifting from what students actually see. All state/handlers
   are passed in as props; this component fetches nothing itself. */
export default function CourseDetailsView({ course, enrolled, checking, enrolling, enrollError, onEnroll, onStart }) {
  const hasContent = course.curriculum.length > 0 && course.curriculum.some((m) => m.lessons.length > 0);
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
              onClick={onStart}
              className="w-full sm:w-auto bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              ▶️ Kursa Başla
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={onEnroll}
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
