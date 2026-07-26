'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ProfileUI';
import { supabase } from '@/lib/supabaseClient';

const MOCK_BUDDIES = [
  { id: 1, name: 'Nərmin Əliyeva', group: 'II qrup — İqtisadiyyat', sharedCourses: ['Data Analitikası Əsasları', 'İngilis Dili — Biznes Kommunikasiyası'], matchPercent: 92 },
  { id: 2, name: 'Kamran Rzayev', group: 'I qrup (Rİ) — Kompüter Elmləri', sharedCourses: ['React ilə Frontend İnkişafı'], matchPercent: 81 },
  { id: 3, name: 'Aygün Səfərova', group: 'IV qrup — Tibb', sharedCourses: ['UI/UX Dizayn Əsasları'], matchPercent: 76 },
  { id: 4, name: 'Tural Hüseynov', group: 'I qrup (Rİ) — Kompüter mühəndisliyi', sharedCourses: ['React ilə Frontend İnkişafı', 'Data Analitikası Əsasları'], matchPercent: 88 },
  { id: 5, name: 'Günel Sadıqova', group: 'III qrup (DT) — Jurnalistika', sharedCourses: ['İngilis Dili — Biznes Kommunikasiyası'], matchPercent: 68 },
  { id: 6, name: 'Elvin Quliyev', group: 'II qrup — Marketinq', sharedCourses: ['UI/UX Dizayn Əsasları', 'Data Analitikası Əsasları'], matchPercent: 84 },
];

export default function StudyBuddyPanel({ user }) {
  const [connectedIds, setConnectedIds] = useState([]);

  useEffect(() => {
    supabase
      .from('study_buddy_connections')
      .select('buddy_id')
      .eq('user_id', user.id)
      .then(({ data }) => setConnectedIds((data || []).map((r) => r.buddy_id)));
  }, [user.id]);

  async function connect(buddyId) {
    setConnectedIds((ids) => [...ids, buddyId]);
    await supabase.from('study_buddy_connections').insert({ user_id: user.id, buddy_id: buddyId });
  }

  return (
    <div>
      <PageHeader sub="Oxşar maraqlara və ixtisas qrupuna sahib istifadəçilərlə tanış ol">Tədris Yoldaşı</PageHeader>
      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_BUDDIES.map((b) => {
          const connected = connectedIds.includes(b.id);
          return (
            <div key={b.id} className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0">
                  {b.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--text-primary)] truncate">{b.name}</div>
                  <div className="text-xs text-[var(--text-secondary)] truncate">{b.group}</div>
                  <span className="text-xs font-bold text-[var(--success)]">{b.matchPercent}% uyğunluq</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {b.sharedCourses.map((c) => (
                  <span key={c} className="text-[10px] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
              <button
                type="button"
                disabled={connected}
                onClick={() => connect(b.id)}
                className={`w-full text-sm font-bold px-5 py-2 rounded-lg transition-colors ${
                  connected
                    ? 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-not-allowed'
                    : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
                }`}
              >
                {connected ? 'Göndərildi ✓' : 'Bağlantı qur'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
