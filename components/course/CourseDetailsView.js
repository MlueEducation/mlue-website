'use client';

import { Link2 } from 'lucide-react';

/* Pure presentational — extracted verbatim from app/courses/[courseId]/page.js
   so MLUE Studio's PreviewModal can render the exact same student-facing
   markup against in-progress (possibly unsaved) builder state, with zero risk
   of the preview drifting from what students actually see. All state/handlers
   are passed in as props; this component fetches nothing itself. */

function InstructorCard({ instructor }) {
  const initials = instructor.fullName ? instructor.fullName.split(' ').map((n) => n[0]).join('') : '?';
  // lucide-react no longer ships brand/logo icons (removed for trademark
  // reasons) — a generic link glyph + platform label is used instead.
  const socials = [
    { url: instructor.linkedinUrl, label: 'LinkedIn' },
    { url: instructor.facebookUrl, label: 'Facebook' },
    { url: instructor.instagramUrl, label: 'Instagram' },
  ].filter((s) => s.url);

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 mb-8">
      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Müəllim Haqqında</h2>
      <div className="flex items-center gap-4 mb-4">
        {instructor.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={instructor.avatarUrl} alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-lg font-extrabold text-white flex-shrink-0">
            {initials}
          </div>
        )}
        <div>
          <div className="text-sm font-bold text-[var(--text-primary)]">{instructor.fullName}</div>
          {instructor.specialtyTitle && <div className="text-xs text-[var(--text-secondary)]">{instructor.specialtyTitle}</div>}
        </div>
      </div>
      {instructor.bio && <p className="text-sm text-[var(--text-secondary)] mb-4">{instructor.bio}</p>}
      {socials.length > 0 && (
        <div className="flex items-center gap-4">
          {socials.map(({ url, label }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
              <Link2 className="w-3.5 h-3.5" /> {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* accessLevel: 'none' | 'audit' | 'full' — replaces the old boolean
   `enrolled` (which only ever meant "does a user_courses row exist") now
   that a paid course has a real free-audit-vs-purchased distinction. A free
   course only ever reaches 'none' or 'full' — the audit tier only applies
   to paid courses. */
export default function CourseDetailsView({
  course, accessLevel = 'none', checking, enrolling, enrollError,
  onEnroll, onStart, onAddToCart, onStartAudit, onUpgrade,
}) {
  const hasContent = course.curriculum.length > 0 && course.curriculum.some((m) => m.lessons.length > 0);
  const mentorInitials = course.mentor ? course.mentor.split(' ').map((n) => n[0]).join('') : '?';

  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {course.thumbnailUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.thumbnailUrl}
            alt=""
            className="w-full aspect-video object-cover rounded-2xl mb-8"
          />
        )}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-2">{course.level} · {course.duration}</div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">{course.title}</h1>
          {course.summary && <p className="text-[var(--text-secondary)] mb-5">{course.summary}</p>}
          {!course.instructor && course.mentor && (
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

        {course.instructor && <InstructorCard instructor={course.instructor} />}

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
        ) : accessLevel === 'full' ? (
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
        ) : accessLevel === 'audit' ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--text-primary)] font-bold px-6 py-3.5 rounded-lg transition-colors"
            >
              ▶️ Dinləyici kimi davam et
            </button>
            <button
              type="button"
              onClick={onUpgrade}
              className="w-full sm:w-auto bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              Kursu tam əldə et — ₼{Number(course.price).toFixed(2)}
            </button>
          </div>
        ) : course.isFree ? (
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
        ) : (
          <div>
            <div className="text-2xl font-extrabold text-[var(--text-primary)] mb-4">₼{Number(course.price).toFixed(2)}</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={onAddToCart}
                disabled={checking}
                className="w-full sm:w-auto bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold px-8 py-3.5 rounded-lg transition-colors"
              >
                Kursu Al
              </button>
              <button
                type="button"
                onClick={onStartAudit}
                disabled={enrolling || checking}
                className="w-full sm:w-auto bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--text-primary)] font-bold px-6 py-3.5 rounded-lg transition-colors"
              >
                {enrolling ? '...' : 'Dinləyici kimi başla'}
              </button>
            </div>
            {enrollError && <p className="text-sm text-[var(--danger)] mt-3">{enrollError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
