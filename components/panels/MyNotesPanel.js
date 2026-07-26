'use client';

import { useEffect, useState } from 'react';
import { Panel, PanelSection, PageHeader } from '@/components/ProfileUI';
import { supabase } from '@/lib/supabaseClient';
import { getCoursesByIds } from '@/lib/courses';

function formatNoteDate(iso) {
  return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' });
}

function groupByCourse(notes, courseMap) {
  const groups = new Map();
  notes.forEach((note) => {
    if (!groups.has(note.course_id)) groups.set(note.course_id, []);
    groups.get(note.course_id).push(note);
  });
  return Array.from(groups.entries()).map(([courseId, items]) => ({
    courseId,
    title: courseMap.get(courseId)?.title || courseId,
    notes: items,
  }));
}

function NoteCard({ note, expanded, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full text-left bg-[var(--bg-surface-2)] rounded-xl p-4 transition-colors hover:bg-[var(--border)]"
    >
      <div className="text-[11px] text-[var(--text-tertiary)] mb-1.5">{formatNoteDate(note.created_at)}</div>
      <p className={`text-sm text-[var(--text-primary)] whitespace-pre-wrap ${expanded ? '' : 'line-clamp-2'}`}>{note.content}</p>
      {!expanded && note.content.length > 100 && (
        <span className="text-xs font-bold text-[var(--accent)] mt-1.5 inline-block">Ətraflı oxu →</span>
      )}
    </button>
  );
}

export default function MyNotesPanel({ user }) {
  const [notes, setNotes] = useState([]);
  const [courseMap, setCourseMap] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState(new Set());

  useEffect(() => {
    supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(async ({ data }) => {
        const rows = data || [];
        setNotes(rows);
        try {
          setCourseMap(await getCoursesByIds(rows.map((n) => n.course_id)));
        } catch (err) {
          console.error('Course lookup failed:', err);
        } finally {
          setLoading(false);
        }
      });
  }, [user.id]);

  function toggleExpand(id) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const groups = groupByCourse(notes, courseMap);

  return (
    <div>
      <PageHeader sub="Kurs izləyərkən götürdüyün bütün qeydlər, kursa görə qruplaşdırılıb">Kurs Qeydlərim</PageHeader>
      <div className="space-y-5">
        {loading ? (
          <Panel className="p-6">
            <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
          </Panel>
        ) : groups.length === 0 ? (
          <Panel className="p-6">
            <p className="text-sm text-[var(--text-secondary)]">Hələ heç bir kursda qeyd etməmisən — kurs izləyərkən "Qeydlər" tabından qeyd yarada bilərsən.</p>
          </Panel>
        ) : (
          groups.map((group) => (
            <Panel key={group.courseId}>
              <PanelSection first title={group.title} desc={`${group.notes.length} qeyd`}>
                <div className="space-y-2.5">
                  {group.notes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      expanded={expandedIds.has(note.id)}
                      onToggle={() => toggleExpand(note.id)}
                    />
                  ))}
                </div>
              </PanelSection>
            </Panel>
          ))
        )}
      </div>
    </div>
  );
}
