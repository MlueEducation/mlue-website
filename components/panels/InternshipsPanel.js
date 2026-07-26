'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/ProfileUI';
import { supabase } from '@/lib/supabaseClient';

const MOCK_INTERNSHIPS = [
  { id: 1, company: 'TechBakı MMC', logoLetter: 'T', title: 'Landing Page Klonu Hazırla', desc: 'Verilmiş Figma dizaynına əsasən responsive landing page kodla.', skills: ['HTML/CSS', 'React'], duration: '3-5 gün', reward: '15 MLUE Token' },
  { id: 2, company: 'Kreativ Studio', logoLetter: 'K', title: 'Sosial Media Post Dəsti Dizayn Et', desc: '5 postdan ibarət marka üslubunda vizual dəst hazırla.', skills: ['Figma', 'UI Dizayn'], duration: '2-3 gün', reward: '10 MLUE Token' },
  { id: 3, company: 'Startup Bakı', logoLetter: 'S', title: 'İstifadəçi Sorğusu Analiz Et', desc: '50 cavablıq sorğu datasını Excel/Power BI ilə təhlil et.', skills: ['Excel', 'Data Analitikası'], duration: '2 gün', reward: '8 MLUE Token' },
  { id: 4, company: 'Bakı Fintech', logoLetter: 'B', title: 'API Sənədləşdirməsi Yaz', desc: 'Verilmiş REST API üçün istifadəçi dostu sənədləşdirmə hazırla.', skills: ['REST API', 'Copywriting'], duration: '2-4 gün', reward: '12 MLUE Token' },
  { id: 5, company: 'EduTech AZ', logoLetter: 'E', title: 'Kiçik Kviz Tətbiqi Kodla', desc: 'JavaScript ilə 10 sualdan ibarət sadə kviz tətbiqi hazırla.', skills: ['JavaScript', 'HTML/CSS'], duration: '3 gün', reward: '15 MLUE Token' },
  { id: 6, company: 'Marketinq Ofisi', logoLetter: 'M', title: 'SEO Auditi Apar', desc: 'Verilmiş sayt üçün əsas SEO problemlərini müəyyən et və hesabat yaz.', skills: ['SEO', 'Kontent Marketinqi'], duration: '2 gün', reward: '10 MLUE Token' },
];

function tokensFromReward(reward) {
  return parseInt(reward, 10) || 0;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

const TABS = [
  { id: 'active', label: 'Aktiv tapşırıqlar' },
  { id: 'history', label: 'Tarixçə' },
];

export default function InternshipsPanel({ user }) {
  const [tab, setTab] = useState('active');
  const [completed, setCompleted] = useState([]); // [{ task_id, tokens_awarded, completed_at }]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('completed_micro_tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .then(({ data }) => {
        setCompleted(data || []);
        setLoading(false);
      });
  }, [user.id]);

  const completedIds = completed.map((c) => c.task_id);

  /* Atomic anti-spam gate: completed_micro_tasks has a unique(user_id,
     task_id) constraint, so a duplicate insert (e.g. a double-click, or two
     tabs racing) fails at the database level instead of relying on a
     check-then-insert race that client state alone can't close. */
  async function completeTask(job) {
    if (completedIds.includes(job.id)) return;
    const tokens = tokensFromReward(job.reward);
    const { data, error } = await supabase
      .from('completed_micro_tasks')
      .insert({ user_id: user.id, task_id: job.id, tokens_awarded: tokens })
      .select()
      .single();
    if (error) return;
    setCompleted((c) => [data, ...c]);
    await supabase.from('token_transactions').insert({ user_id: user.id, description: job.title, amount: tokens });
  }

  return (
    <div>
      <PageHeader sub="Şirkətlərin yerləşdirdiyi kiçik layihələrlə real təcrübə qazan">Mikro-Təcrübələr</PageHeader>

      <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`text-xs font-bold px-4 py-1.5 rounded-[var(--radius-full)] transition-colors whitespace-nowrap ${
              tab === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'active' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {MOCK_INTERNSHIPS.map((job) => {
            const done = completedIds.includes(job.id);
            return (
              <div key={job.id} className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--bg-surface-2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 text-sm font-extrabold text-[var(--text-primary)]">
                    {job.logoLetter}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">{job.title}</div>
                    <div className="text-xs text-[var(--text-tertiary)] truncate">{job.company}</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">{job.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {job.skills.map((s) => (
                    <span key={s} className="text-[10px] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] mb-4">
                  <span>{job.duration}</span>
                  <span className="font-bold text-[var(--accent-warm)]">{job.reward}</span>
                </div>
                <button
                  type="button"
                  disabled={done || loading}
                  onClick={() => completeTask(job)}
                  className={`w-full text-sm font-bold px-5 py-2 rounded-lg transition-colors ${
                    done
                      ? 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-not-allowed'
                      : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-60'
                  }`}
                >
                  {done ? 'Tamamlanıb ✔️' : 'Tapşırığı tamamla'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-2.5">
          {loading ? (
            <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
          ) : completed.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">Hələ heç bir mikro-təcrübə tamamlamamısan.</p>
          ) : (
            completed.map((c) => {
              const job = MOCK_INTERNSHIPS.find((j) => j.id === c.task_id);
              return (
                <div key={c.id} className="flex items-center justify-between gap-3 bg-[var(--bg-surface-2)] rounded-xl p-4">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">{job?.title || `Tapşırıq #${c.task_id}`}</div>
                    <div className="text-xs text-[var(--text-tertiary)]">{job?.company} · {formatDate(c.completed_at)}</div>
                  </div>
                  <span className="text-sm font-bold text-[var(--accent-warm)] flex-shrink-0">+{c.tokens_awarded} Token</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
