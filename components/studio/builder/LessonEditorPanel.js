'use client';

import { X } from 'lucide-react';
import RichTextEditor from '@/components/studio/RichTextEditor';

const inputClass = 'w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]';

export default function LessonEditorPanel({ lesson, onChange, onClose }) {
  if (!lesson) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:w-[420px] bg-[var(--bg-surface)] h-full overflow-y-auto shadow-[var(--shadow-lg)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-extrabold text-[var(--text-primary)]">Dərsi redaktə et</h3>
          <button type="button" onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Başlıq</label>
            <input value={lesson.title} onChange={(e) => onChange({ title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Video URL</label>
            <input value={lesson.videoUrl} onChange={(e) => onChange({ videoUrl: e.target.value })} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Müddət</label>
            <input value={lesson.duration} onChange={(e) => onChange({ duration: e.target.value })} placeholder="məs. 12:30" className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Təsvir</label>
            <RichTextEditor value={lesson.description} onChange={(html) => onChange({ description: html })} placeholder="Dərs haqqında qısa təsvir..." />
          </div>
        </div>
      </div>
    </div>
  );
}
