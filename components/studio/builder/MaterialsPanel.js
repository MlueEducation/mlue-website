'use client';

import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Plus, Trash2, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import SortableRow from './SortableRow';

function MaterialRow({ material, courseId, onUpdate, onDelete }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `${courseId || 'draft'}/materials/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('course-materials').upload(path, file, { upsert: true });
    setUploading(false);
    if (error) { alert('Fayl yüklənmədi: ' + error.message); return; }
    const { data } = supabase.storage.from('course-materials').getPublicUrl(path);
    onUpdate(material.id, { fileUrl: data.publicUrl });
  }

  return (
    <SortableRow id={material.id} className="py-1.5">
      <div className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl px-3 py-2.5">
        <FileText className="w-4 h-4 text-[var(--text-secondary)] flex-shrink-0" />
        <input
          value={material.name}
          onChange={(e) => onUpdate(material.id, { name: e.target.value })}
          placeholder="Fayl adı"
          className="flex-1 min-w-0 bg-transparent text-sm text-[var(--text-primary)] focus:outline-none"
        />
        {material.fileUrl ? (
          <span className="text-[10px] font-bold uppercase text-[var(--success)] flex-shrink-0">Yükləndi</span>
        ) : (
          <label className="text-[11px] font-bold text-[var(--accent)] cursor-pointer flex-shrink-0">
            {uploading ? '...' : 'Fayl seç'}
            <input type="file" onChange={handleFile} className="hidden" disabled={uploading} />
          </label>
        )}
        <button type="button" onClick={() => onDelete(material.id)} className="text-[var(--text-tertiary)] hover:text-[var(--danger)] flex-shrink-0">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </SortableRow>
  );
}

export default function MaterialsPanel({ materials, courseId, onAdd, onUpdate, onDelete, onReorder }) {
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = materials.map((m) => m.id);
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    onReorder(arrayMove(materials, oldIndex, newIndex).map((m, i) => ({ ...m, position: i })));
  }

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={materials.map((m) => m.id)} strategy={verticalListSortingStrategy}>
          <div>
            {materials.map((m) => (
              <MaterialRow key={m.id} material={m} courseId={courseId} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {materials.length === 0 && <p className="text-sm text-[var(--text-secondary)] mb-3">Hələ material yoxdur.</p>}
      <button type="button" onClick={onAdd} className="flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] mt-2">
        <Plus className="w-4 h-4" /> Material əlavə et
      </button>
    </div>
  );
}
