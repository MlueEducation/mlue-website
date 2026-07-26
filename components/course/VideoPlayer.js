'use client';

export default function VideoPlayer({ lesson, onComplete }) {
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
