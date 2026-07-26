'use client';

import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { Panel, PageHeader, Tooltip } from '@/components/ProfileUI';
import { supabase } from '@/lib/supabaseClient';

const ROADMAP_TRACKS = [
  {
    id: 'frontend',
    label: 'Frontend Developer',
    icon: '💻',
    nodes: [
      { id: 'html-css', title: 'HTML və CSS Əsasları', defaultStatus: 'completed', desc: 'Semantik HTML, Flexbox/Grid, responsive dizayn.' },
      { id: 'js', title: 'JavaScript Əsasları', defaultStatus: 'completed', desc: 'DOM manipulyasiyası, async/await, ES6+.' },
      { id: 'react', title: 'React ilə İnkişaf', defaultStatus: 'in-progress', desc: 'Komponentlər, hooks, state idarəetməsi.' },
      { id: 'ts', title: 'TypeScript', defaultStatus: 'locked', desc: 'Tip təhlükəsizliyi və böyük layihələr üçün TS.' },
      { id: 'testing', title: 'Test Yazma (Jest)', defaultStatus: 'locked', desc: 'Unit və inteqrasiya testləri.' },
      { id: 'portfolio', title: 'Portfolio Layihəsi', defaultStatus: 'locked', desc: 'Tam funksional layihə ilə CV-ni gücləndir.' },
    ],
  },
  {
    id: 'data-analyst',
    label: 'Data Analyst',
    icon: '📊',
    nodes: [
      { id: 'excel', title: 'Excel və Data Əsasları', defaultStatus: 'completed', desc: 'Cədvəllər, düsturlar, pivot table.' },
      { id: 'sql', title: 'SQL Sorğuları', defaultStatus: 'completed', desc: 'Verilənlər bazasından məlumat çıxarma.' },
      { id: 'python', title: 'Python ilə Analiz', defaultStatus: 'in-progress', desc: 'Pandas, NumPy ilə data emalı.' },
      { id: 'viz', title: 'Data Vizualizasiyası', defaultStatus: 'locked', desc: 'Power BI / Tableau ilə hesabat qurma.' },
      { id: 'ml-intro', title: 'Maşın Öyrənməsinə Giriş', defaultStatus: 'locked', desc: 'Əsas ML alqoritmləri və proqnozlaşdırma.' },
    ],
  },
];

const STATUS_CFG = {
  completed: { dot: 'bg-[var(--success)] text-white', badge: 'bg-[var(--success-soft)] text-[var(--success)]', label: 'Tamamlandı' },
  'in-progress': { dot: 'bg-[var(--accent)] text-white', badge: 'bg-[var(--accent-soft)] text-[var(--accent)]', label: 'Davam edir' },
  locked: { dot: 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] border border-[var(--border)]', badge: 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)]', label: 'Kilidli' },
};

function RoadmapNode({ node, status, isLast, onComplete }) {
  const cfg = STATUS_CFG[status];
  const dotEl = (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${cfg.dot}`}>
      {status === 'completed' ? '✓' : status === 'locked' ? <Lock className="w-4 h-4" /> : '●'}
    </div>
  );
  return (
    <div className={`relative flex gap-4 ${isLast ? '' : 'pb-6'}`}>
      {status === 'locked' ? <Tooltip text="Əvvəlki addımı tamamla">{dotEl}</Tooltip> : dotEl}
      <div className={`flex-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-4 ${status === 'locked' ? 'opacity-60' : ''}`}>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-bold text-[var(--text-primary)]">{node.title}</span>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.badge}`}>{cfg.label}</span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-2">{node.desc}</p>
        {status === 'in-progress' && (
          <button
            type="button"
            onClick={onComplete}
            className="text-xs font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Tamamla ✓
          </button>
        )}
      </div>
    </div>
  );
}

export default function RoadmapPanel({ user }) {
  const [activeTrack, setActiveTrack] = useState(ROADMAP_TRACKS[0].id);
  const [progressMap, setProgressMap] = useState({});
  const track = ROADMAP_TRACKS.find((t) => t.id === activeTrack);

  useEffect(() => {
    supabase
      .from('roadmap_progress')
      .select('node_id, status')
      .eq('user_id', user.id)
      .eq('track_id', activeTrack)
      .then(({ data }) => {
        const map = {};
        (data || []).forEach((row) => { map[row.node_id] = row.status; });
        setProgressMap(map);
      });
  }, [user.id, activeTrack]);

  function statusFor(node) {
    return progressMap[node.id] || node.defaultStatus;
  }

  async function completeNode(node) {
    setProgressMap((m) => ({ ...m, [node.id]: 'completed' }));
    await supabase.from('roadmap_progress').upsert(
      { user_id: user.id, track_id: activeTrack, node_id: node.id, status: 'completed' },
      { onConflict: 'user_id,track_id,node_id' }
    );

    const idx = track.nodes.findIndex((n) => n.id === node.id);
    const next = track.nodes[idx + 1];
    if (next && statusFor(next) === 'locked') {
      setProgressMap((m) => ({ ...m, [next.id]: 'in-progress' }));
      await supabase.from('roadmap_progress').upsert(
        { user_id: user.id, track_id: activeTrack, node_id: next.id, status: 'in-progress' },
        { onConflict: 'user_id,track_id,node_id' }
      );
    }
  }

  return (
    <div>
      <PageHeader sub="Karyera istiqamətlərinə görə addım-addım tədris planı">Yol Xəritələri</PageHeader>
      <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 mb-5">
        {ROADMAP_TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTrack(t.id)}
            className={`text-xs font-bold px-4 py-1.5 rounded-[var(--radius-full)] transition-colors whitespace-nowrap ${
              activeTrack === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <Panel className="p-6">
        <div className="relative pl-2">
          <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-[var(--border)]" />
          {track.nodes.map((node, i) => (
            <RoadmapNode
              key={node.id}
              node={node}
              status={statusFor(node)}
              isLast={i === track.nodes.length - 1}
              onComplete={() => completeNode(node)}
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}
