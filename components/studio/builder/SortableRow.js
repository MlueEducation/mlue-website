'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export default function SortableRow({ id, children, className = '' }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className={`flex items-start gap-2 ${className}`}>
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="mt-2.5 text-[var(--text-tertiary)] cursor-grab active:cursor-grabbing flex-shrink-0 touch-none"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
