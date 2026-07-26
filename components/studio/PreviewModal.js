'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CourseDetailsView from '@/components/course/CourseDetailsView';
import VideoPlayer from '@/components/course/VideoPlayer';
import CoursePlayerSidebar from '@/components/course/CoursePlayerSidebar';
import { useStudio } from '@/components/studio/StudioContext';

const TABS = [
  { id: 'details', label: 'Kurs səhifəsi' },
  { id: 'learn', label: 'Dərs izləmə' },
];

/* Renders the literal same student-facing components (CourseDetailsView,
   VideoPlayer, CoursePlayerSidebar) against the in-progress, possibly-unsaved
   CourseBuilder local state — no DB fetch — so the preview can never drift
   from what students actually see. course.modules is already shape-compatible
   with the curriculum[] the student-facing components expect (same id/title/
   lessons[] fields), so no adapter beyond aliasing the key is needed. */
export default function PreviewModal({ course, onClose }) {
  const { user } = useStudio();
  const [tab, setTab] = useState('details');

  const previewCourse = useMemo(() => ({ ...course, curriculum: course.modules }), [course]);
  const lessons = useMemo(() => previewCourse.curriculum.flatMap((m) => m.lessons), [previewCourse]);
  const [activeLessonId, setActiveLessonId] = useState(lessons[0]?.id);
  const unlockedIds = useMemo(() => new Set(lessons.map((l) => l.id)), [lessons]);
  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[var(--bg-page)] w-full max-w-5xl h-[85vh] rounded-[28px] overflow-hidden shadow-[var(--shadow-lg)] flex flex-col"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-surface)] flex-shrink-0">
            <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-[var(--radius-full)] transition-colors whitespace-nowrap ${
                    tab === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {tab === 'details' ? (
              <CourseDetailsView
                course={previewCourse}
                enrolled
                checking={false}
                enrolling={false}
                enrollError={null}
                onEnroll={() => {}}
                onStart={() => setTab('learn')}
              />
            ) : lessons.length === 0 ? (
              <div className="flex items-center justify-center h-full p-10 text-center">
                <p className="text-sm text-[var(--text-secondary)]">Hələ dərs əlavə olunmayıb.</p>
              </div>
            ) : (
              <div data-theme="dark" className="min-h-full bg-[var(--bg-page)] flex flex-col md:flex-row">
                <div className="flex-1 p-4 md:p-8 min-w-0">
                  <div className="mb-4">
                    <div className="text-xs text-[var(--text-tertiary)] mb-1">{previewCourse.title}</div>
                    <h1 className="text-lg font-bold text-[var(--text-primary)]">{activeLesson?.title}</h1>
                  </div>
                  <VideoPlayer lesson={activeLesson} onComplete={() => {}} />
                </div>
                <aside className="md:w-80 flex-shrink-0 border-t md:border-t-0 md:border-l border-[var(--border)]">
                  <CoursePlayerSidebar
                    user={user}
                    course={previewCourse}
                    progressMap={{}}
                    activeLessonId={activeLesson?.id}
                    unlockedIds={unlockedIds}
                    onSelectLesson={setActiveLessonId}
                  />
                </aside>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
