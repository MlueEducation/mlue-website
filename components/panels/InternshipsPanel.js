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

export default function InternshipsPanel({ user }) {
  const [startedIds, setStartedIds] = useState([]);

  useEffect(() => {
    supabase
      .from('internship_applications')
      .select('internship_id')
      .eq('user_id', user.id)
      .then(({ data }) => setStartedIds((data || []).map((r) => r.internship_id)));
  }, [user.id]);

  async function start(internshipId) {
    setStartedIds((ids) => [...ids, internshipId]);
    await supabase.from('internship_applications').insert({ user_id: user.id, internship_id: internshipId });
  }

  return (
    <div>
      <PageHeader sub="Şirkətlərin yerləşdirdiyi kiçik layihələrlə real təcrübə qazan">Mikro-Təcrübələr</PageHeader>
      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_INTERNSHIPS.map((job) => {
          const started = startedIds.includes(job.id);
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
                disabled={started}
                onClick={() => start(job.id)}
                className={`w-full text-sm font-bold px-5 py-2 rounded-lg transition-colors ${
                  started
                    ? 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-not-allowed'
                    : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
                }`}
              >
                {started ? 'Başlanıldı ✓' : 'Tapşırığa başla'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
