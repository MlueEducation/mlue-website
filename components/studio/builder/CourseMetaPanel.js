'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { CATEGORY_OPTIONS } from '@/lib/studioCourses';

const LEVELS = ['Başlanğıc', 'Orta', 'İrəli'];
const inputClass = 'w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]';

export default function CourseMetaPanel({ course, onChange, courseId }) {
  const [uploading, setUploading] = useState(false);

  function set(field, value) {
    onChange({ [field]: value });
  }

  function updateLearnItem(index, value) {
    const next = [...course.whatYouWillLearn];
    next[index] = value;
    onChange({ whatYouWillLearn: next });
  }
  function addLearnItem() {
    onChange({ whatYouWillLearn: [...course.whatYouWillLearn, ''] });
  }
  function removeLearnItem(index) {
    onChange({ whatYouWillLearn: course.whatYouWillLearn.filter((_, i) => i !== index) });
  }

  async function handleThumbnail(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${courseId || 'draft'}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('course-materials').upload(path, file, { upsert: true });
    setUploading(false);
    if (error) { alert('Şəkil yüklənmədi: ' + error.message); return; }
    const { data } = supabase.storage.from('course-materials').getPublicUrl(path);
    set('thumbnailUrl', data.publicUrl);
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Başlıq</label>
          <input value={course.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Kateqoriya</label>
          <select value={course.categoryId} onChange={(e) => set('categoryId', e.target.value)} className={inputClass}>
            {CATEGORY_OPTIONS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Səviyyə</label>
          <select value={course.level} onChange={(e) => set('level', e.target.value)} className={inputClass}>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Müddət</label>
          <input value={course.duration} onChange={(e) => set('duration', e.target.value)} placeholder="məs. 5 həftə" className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Mentor adı</label>
          <input value={course.mentor} onChange={(e) => set('mentor', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Mentor vəzifəsi</label>
          <input value={course.mentorTitle} onChange={(e) => set('mentorTitle', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Qısa təsvir</label>
        <textarea value={course.summary} onChange={(e) => set('summary', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label className="text-xs font-bold text-[var(--text-secondary)] mb-2 block">Nələr öyrənəcək?</label>
        <div className="space-y-2">
          {course.whatYouWillLearn.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={item} onChange={(e) => updateLearnItem(i, e.target.value)} className={`flex-1 ${inputClass}`} />
              <button type="button" onClick={() => removeLearnItem(i)} className="text-xs font-bold text-[var(--danger)] px-2 flex-shrink-0">Sil</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addLearnItem} className="mt-2 text-xs font-bold text-[var(--accent)]">+ Sətir əlavə et</button>
      </div>

      <div>
        <label className="text-xs font-bold text-[var(--text-secondary)] mb-1.5 block">Üz qabığı (thumbnail)</label>
        <div className="flex items-center gap-3">
          {course.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.thumbnailUrl} alt="" className="w-20 h-14 object-cover rounded-xl border border-[var(--border)]" />
          ) : (
            <div className="w-20 h-14 rounded-xl border border-dashed border-[var(--border)] flex items-center justify-center text-[var(--text-tertiary)]">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
          <label className="text-xs font-bold text-[var(--accent)] cursor-pointer">
            {uploading ? 'Yüklənir...' : 'Şəkil seç'}
            <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" disabled={uploading} />
          </label>
        </div>
      </div>
    </div>
  );
}
