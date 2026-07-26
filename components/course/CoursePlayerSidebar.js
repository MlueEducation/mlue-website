'use client';

import { useEffect, useState } from 'react';
import { Lock, FileText, Download, Plus, ArrowLeft } from 'lucide-react';
import MeagleAvatar from '@/components/MeagleAvatar';
import MeagleChatDrawer from '@/components/MeagleChatDrawer';
import { supabase } from '@/lib/supabaseClient';

const TABS = [
  { id: 'curriculum', label: 'Mündəricat' },
  { id: 'materials', label: 'Materiallar' },
  { id: 'notes', label: 'Qeydlər' },
];

const STATUS_DOT = {
  completed: 'bg-[var(--success)] text-white',
  active: 'bg-[var(--accent)] text-white',
  locked: 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] border border-[var(--border)]',
};

function CurriculumTab({ course, progressMap, activeLessonId, unlockedIds, onSelectLesson }) {
  return (
    <div className="space-y-5">
      {course.curriculum.map((mod) => (
        <div key={mod.id}>
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-2">{mod.title}</div>
          <div className="space-y-1.5">
            {mod.lessons.map((lesson) => {
              const isCompleted = !!progressMap[lesson.id];
              const isActive = lesson.id === activeLessonId;
              const isUnlocked = unlockedIds.has(lesson.id);
              const status = isCompleted ? 'completed' : isUnlocked ? 'active' : 'locked';
              return (
                <button
                  key={lesson.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--bg-surface-2)]'
                  } ${!isUnlocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${STATUS_DOT[status]}`}>
                    {isCompleted ? '✓' : !isUnlocked ? <Lock className="w-3 h-3" /> : '▶'}
                  </span>
                  <span className="flex-1 text-sm text-[var(--text-primary)] truncate">{lesson.title}</span>
                  <span className="text-[11px] text-[var(--text-tertiary)] flex-shrink-0">{lesson.duration}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function MaterialsTab({ materials }) {
  return (
    <div className="space-y-2">
      {materials.map((m) => (
        <div key={m.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--bg-surface-2)]">
          <FileText className="w-4 h-4 text-[var(--text-secondary)] flex-shrink-0" />
          <span className="flex-1 text-sm text-[var(--text-primary)] truncate">{m.name}</span>
          <span className="text-[10px] font-bold uppercase text-[var(--text-tertiary)] flex items-center gap-1 flex-shrink-0">
            <Download className="w-3 h-3" /> Tezliklə
          </span>
        </div>
      ))}
    </div>
  );
}

function formatNoteDate(iso) {
  return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

function NotesTab({ user, courseId, activeLessonId }) {
  const [mode, setMode] = useState('list'); // list | create
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setNotes(data || []);
        setLoading(false);
      });
  }, [user.id, courseId]);

  async function saveNote() {
    if (!draft.trim()) return;
    setSaving(true);
    const { data, error } = await supabase
      .from('notes')
      .insert({ user_id: user.id, course_id: courseId, lesson_id: activeLessonId || null, content: draft.trim() })
      .select()
      .single();
    setSaving(false);
    if (!error) {
      setNotes((n) => [data, ...n]);
      setDraft('');
      setMode('list');
    }
  }

  if (mode === 'create') {
    return (
      <div>
        <button
          type="button"
          onClick={() => { setMode('list'); setDraft(''); }}
          className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Geri
        </button>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Bu kursla bağlı qeydini bura yaz..."
          rows={10}
          autoFocus
          className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
        />
        <button
          type="button"
          onClick={saveNote}
          disabled={saving || !draft.trim()}
          className="mt-3 text-sm font-bold px-5 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white transition-colors"
        >
          {saving ? 'Saxlanılır...' : 'Yadda saxla'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setMode('create')}
        className="w-full flex items-center justify-center gap-2 text-sm font-bold px-4 py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors mb-4"
      >
        <Plus className="w-4 h-4" /> Yeni qeyd yarat
      </button>

      {loading ? (
        <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
      ) : notes.length === 0 ? (
        <p className="text-sm text-[var(--text-secondary)]">Bu kursla bağlı hələ qeydin yoxdur.</p>
      ) : (
        <div className="space-y-2">
          {notes.map((n) => (
            <div key={n.id} className="bg-[var(--bg-surface-2)] rounded-lg px-3.5 py-3">
              <div className="text-[11px] text-[var(--text-tertiary)] mb-1">{formatNoteDate(n.created_at)}</div>
              <p className="text-sm text-[var(--text-primary)] line-clamp-2">{n.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoursePlayerSidebar({ user, course, progressMap, activeLessonId, unlockedIds, onSelectLesson }) {
  const [tab, setTab] = useState('curriculum');
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 m-4 mb-0">
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

      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'curriculum' && (
          <CurriculumTab
            course={course}
            progressMap={progressMap}
            activeLessonId={activeLessonId}
            unlockedIds={unlockedIds}
            onSelectLesson={onSelectLesson}
          />
        )}
        {tab === 'materials' && <MaterialsTab materials={course.materials} />}
        {tab === 'notes' && <NotesTab user={user} courseId={course.id} activeLessonId={activeLessonId} />}
      </div>

      <div className="p-4 border-t border-[var(--border)]">
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          className="w-full flex items-center justify-center gap-2 text-sm font-bold px-4 py-2.5 rounded-lg bg-[var(--bg-surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] transition-colors"
        >
          <MeagleAvatar expression="cheerful" size={20} />
          Meagle ilə Soruş
        </button>
      </div>
      <MeagleChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
