'use client';

import { memo } from 'react';

function VideoPlayer({ lesson, onComplete }) {
  if (!lesson) return null;

  if (!lesson.videoUrl) {
    return (
      <div className="aspect-video w-full bg-black rounded-2xl flex flex-col items-center justify-center gap-3 text-center px-6">
        <p className="text-white/70 text-sm">Video tezliklə əlavə olunacaq</p>
        <button
          type="button"
          onClick={onComplete}
          className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
        >
          Dərsi tamamla
        </button>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden">
      <video key={lesson.id} src={lesson.videoUrl} controls className="w-full h-full" onEnded={onComplete} />
    </div>
  );
}

/* Realtime course-content updates (see hooks/useCoursesData.js) can hand this
   component a new `lesson` object reference whenever ANY course field
   changes, even ones with nothing to do with what's playing (a title typo
   fix, a mentor name edit). Only re-render when what's actually shown to the
   viewer could have changed — the lesson identity or its video source.
   `onComplete` is a new closure every parent render and is deliberately
   ignored here; it's only read inside a user gesture (onEnded/click), never
   during render, so an out-of-date-by-one-render reference is harmless. */
function lessonPropsAreEqual(prevProps, nextProps) {
  return (
    prevProps.lesson?.id === nextProps.lesson?.id &&
    prevProps.lesson?.videoUrl === nextProps.lesson?.videoUrl
  );
}

export default memo(VideoPlayer, lessonPropsAreEqual);
