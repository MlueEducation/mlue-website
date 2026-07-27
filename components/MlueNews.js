'use client';

import { useMemo, useState } from 'react';
import { getAllNews } from '@/lib/news';

const PLATFORM_TABS = [
  { id: 'all', label: 'Hamısı' },
  { id: 'MLUE', label: 'MLUE' },
  { id: 'MLUE Studio', label: 'MLUE Studio' },
];

const CATEGORY_STYLES = {
  'Yenilik': 'bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/20',
  'Təkmilləşdirmə': 'bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]/20',
  'Xəta Həlli': 'bg-[var(--danger-10)] text-[var(--danger)] border-[var(--danger)]/20',
  'Performans': 'bg-[var(--warning-soft)] text-[var(--warning)] border-[var(--warning)]/20',
};

const CATEGORY_EMOJI = {
  'Yenilik': '✨',
  'Təkmilləşdirmə': '🛠️',
  'Xəta Həlli': '🐛',
  'Performans': '⚡',
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' });
}

function NewsCard({ item }) {
  return (
    <div className="rounded-3xl bg-[var(--bg-surface)]/70 backdrop-blur-xl border border-[var(--border)] p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all duration-300">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${CATEGORY_STYLES[item.category] || CATEGORY_STYLES['Yenilik']}`}>
          {CATEGORY_EMOJI[item.category]} {item.category}
        </span>
        <span className="text-xs font-semibold text-[var(--text-tertiary)] flex-shrink-0">{item.platform}</span>
      </div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{item.description}</p>
      <div className="text-xs text-[var(--text-tertiary)]">{formatDate(item.created_at)}</div>
    </div>
  );
}

export default function MlueNews() {
  const [platform, setPlatform] = useState('all');
  const allNews = useMemo(() => getAllNews(), []);

  const filtered = useMemo(() => {
    if (platform === 'all') return allNews;
    return allNews.filter((n) => n.platform === platform || n.platform === 'Hamısı');
  }, [allNews, platform]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">MLUE NEWS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">Ekosistemdəki yeniliklər</h2>
        </div>
        <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 w-fit flex-shrink-0">
          {PLATFORM_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPlatform(tab.id)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-[var(--radius-full)] transition-colors whitespace-nowrap ${
                platform === tab.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] p-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">Bu platforma üçün hələ xəbər yoxdur.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
