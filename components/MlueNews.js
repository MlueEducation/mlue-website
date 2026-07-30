'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReleaseGroups } from '@/hooks/useNews';
import { RELEASE_SECTIONS, formatReleaseDate } from '@/lib/news';
import NewsReleaseModal from './NewsReleaseModal';

const PLATFORM_TABS = [
  { id: 'all', label: 'Hamısı' },
  { id: 'MLUE', label: 'MLUE' },
  { id: 'MLUE Studio', label: 'MLUE Studio' },
];

function visibleItemsOf(group, platform) {
  if (platform === 'all') return group.items;
  return group.items.filter((i) => i.platform === platform || i.platform === 'Hamısı');
}

function ReleaseCard({ group, visibleItems, onOpen }) {
  const summary = RELEASE_SECTIONS
    .map((section) => ({ section, count: visibleItems.filter((i) => section.categories.includes(i.category)).length }))
    .filter((s) => s.count > 0)
    .map((s) => `${s.count} ${s.section.shortLabel}`)
    .join(' · ');

  const headline = group.isLatest
    ? (visibleItems.find((i) => i.category === 'Yenilik') || visibleItems[0])?.title
    : null;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`news-release-card relative text-left rounded-3xl border border-[var(--border)] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${
        group.isLatest ? 'md:col-span-2 min-h-[240px] sm:min-h-[280px] news-card-latest' : 'min-h-[170px]'
      }`}
    >
      {group.isLatest && <span className="news-badge-new">Yeni</span>}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-extrabold bg-[var(--accent-soft)] text-[var(--accent)] px-3 py-1 rounded-full">{group.versionTag}</span>
          <span className="text-xs text-[var(--text-tertiary)]">{formatReleaseDate(group.releaseDate)}</span>
        </div>
        {headline && <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">{headline}</h3>}
      </div>
      <div className="text-sm font-semibold text-[var(--text-secondary)]">{summary}</div>
    </button>
  );
}

export default function MlueNews({ limit }) {
  const [platform, setPlatform] = useState('all');
  const [selectedGroupKey, setSelectedGroupKey] = useState(null);
  const { data: groups = [], allNews } = useReleaseGroups();
  const pathname = usePathname();

  const visibleGroups = useMemo(() => {
    return groups
      .map((group) => ({ group, visibleItems: visibleItemsOf(group, platform) }))
      .filter(({ visibleItems }) => visibleItems.length > 0);
  }, [groups, platform]);

  const shown = limit ? visibleGroups.slice(0, limit) : visibleGroups;
  const truncated = limit && visibleGroups.length > limit;

  // Deep link: /xeberler?release=<groupKey> auto-opens that release's modal.
  useEffect(() => {
    if (groups.length === 0) return;
    const releaseParam = new URLSearchParams(window.location.search).get('release');
    if (releaseParam && groups.some((g) => g.groupKey === releaseParam)) {
      setSelectedGroupKey(releaseParam);
    }
  }, [groups]);

  function openGroup(groupKey) {
    setSelectedGroupKey(groupKey);
    window.history.replaceState(null, '', `${pathname}?release=${encodeURIComponent(groupKey)}`);
  }
  function closeModal() {
    setSelectedGroupKey(null);
    window.history.replaceState(null, '', pathname);
  }

  const selected = visibleGroups.find(({ group }) => group.groupKey === selectedGroupKey);

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

      {shown.length === 0 ? (
        <div className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border)] p-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            {allNews.length === 0 ? 'Hələlik heç bir xəbər yoxdur.' : 'Bu platforma üçün hələ xəbər yoxdur.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shown.map(({ group, visibleItems }) => (
            <ReleaseCard key={group.groupKey} group={group} visibleItems={visibleItems} onOpen={() => openGroup(group.groupKey)} />
          ))}
        </div>
      )}

      {truncated && (
        <div className="text-center mt-8">
          <Link href="/xeberler" className="btn-secondary">Bütün xəbərlərə bax →</Link>
        </div>
      )}

      <NewsReleaseModal group={selected?.group} visibleItems={selected?.visibleItems} onClose={closeModal} />
    </div>
  );
}
