'use client';

import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import SortableRow from './SortableRow';

function LessonRow({ moduleId, lesson, onEdit, onDelete }) {
  return (
    <SortableRow id={lesson.id} className="py-1.5">
      <div className="flex items-center gap-2 bg-[var(--bg-surface-2)] rounded-xl px-3 py-2">
        <button type="button" onClick={() => onEdit(moduleId, lesson.id)} className="flex-1 min-w-0 text-left">
          <div className="text-sm font-semibold text-[var(--text-primary)] truncate">{lesson.title || 'Adsız dərs'}</div>
          <div className="text-[11px] text-[var(--text-tertiary)]">
            {lesson.duration || 'müddət yoxdur'}{!lesson.videoUrl && ' · video yoxdur'}
          </div>
        </button>
        <button type="button" onClick={() => onDelete(moduleId, lesson.id)} className="text-[var(--text-tertiary)] hover:text-[var(--danger)] flex-shrink-0">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </SortableRow>
  );
}

function ModuleBlock({ module, onUpdateTitle, onDeleteModule, onAddLesson, onEditLesson, onDeleteLesson, onReorderLessons }) {
  const [collapsed, setCollapsed] = useState(false);

  function handleLessonDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = module.lessons.map((l) => l.id);
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    const reordered = arrayMove(module.lessons, oldIndex, newIndex).map((l, i) => ({ ...l, position: i }));
    onReorderLessons(module.id, reordered);
  }

  return (
    <SortableRow id={module.id} className="py-2">
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <button type="button" onClick={() => setCollapsed((c) => !c)} className="text-[var(--text-tertiary)] flex-shrink-0">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <input
            value={module.title}
            onChange={(e) => onUpdateTitle(module.id, e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-sm font-bold text-[var(--text-primary)] focus:outline-none"
          />
          <button type="button" onClick={() => onDeleteModule(module.id)} className="text-[var(--text-tertiary)] hover:text-[var(--danger)] flex-shrink-0">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {!collapsed && (
          <>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleLessonDragEnd}>
              <SortableContext items={module.lessons.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                <div>
                  {module.lessons.map((lesson) => (
                    <LessonRow key={lesson.id} moduleId={module.id} lesson={lesson} onEdit={onEditLesson} onDelete={onDeleteLesson} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            <button type="button" onClick={() => onAddLesson(module.id)} className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[var(--accent)]">
              <Plus className="w-3.5 h-3.5" /> Dərs əlavə et
            </button>
          </>
        )}
      </div>
    </SortableRow>
  );
}

export default function CurriculumPanel({
  modules, onAddModule, onUpdateModuleTitle, onDeleteModule,
  onReorderModules, onAddLesson, onEditLesson, onDeleteLesson, onReorderLessons,
}) {
  function handleModuleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const ids = modules.map((m) => m.id);
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    const reordered = arrayMove(modules, oldIndex, newIndex).map((m, i) => ({ ...m, position: i }));
    onReorderModules(reordered);
  }

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleModuleDragEnd}>
        <SortableContext items={modules.map((m) => m.id)} strategy={verticalListSortingStrategy}>
          <div>
            {modules.map((module) => (
              <ModuleBlock
                key={module.id}
                module={module}
                onUpdateTitle={onUpdateModuleTitle}
                onDeleteModule={onDeleteModule}
                onAddLesson={onAddLesson}
                onEditLesson={onEditLesson}
                onDeleteLesson={onDeleteLesson}
                onReorderLessons={onReorderLessons}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {modules.length === 0 && <p className="text-sm text-[var(--text-secondary)] mb-3">Hələ modul yoxdur.</p>}
      <button type="button" onClick={onAddModule} className="flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] mt-2">
        <Plus className="w-4 h-4" /> Modul əlavə et
      </button>
    </div>
  );
}
