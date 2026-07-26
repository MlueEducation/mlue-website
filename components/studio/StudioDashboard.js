'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Users } from 'lucide-react';
import { PageHeader } from '@/components/ProfileUI';
import { fetchStudioCourseList, fetchEnrollmentCounts, CATEGORY_OPTIONS } from '@/lib/studioCourses';

const CATEGORY_LABEL = Object.fromEntries(CATEGORY_OPTIONS.map((c) => [c.id, c.label]));
const STATUS_FILTERS = [
  { id: 'all', label: 'Hamısı' },
  { id: 'draft', label: 'Qaralama' },
  { id: 'live', label: 'Canlı' },
];

function StatusPill({ status }) {
  const isLive = status === 'live';
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
        isLive ? 'bg-[var(--warm-soft)] text-[var(--accent-warm)]' : 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)]'
      }`}
    >
      {isLive ? 'Canlı' : 'Qaralama'}
    </span>
  );
}

export default function StudioDashboard() {
  const [courses, setCourses] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetchStudioCourseList()
      .then(async (list) => {
        if (cancelled) return;
        setCourses(list);
        const c = await fetchEnrollmentCounts(list.map((course) => course.id));
        if (!cancelled) setCounts(c);
      })
      .catch((err) => {
        console.error('Studio course list fetch failed:', err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (q && !c.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [courses, query, statusFilter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <PageHeader sub="Bütün kursları idarə et, məzmun əlavə et və dərc et">Kurslar</PageHeader>
        <Link
          href="/studio/courses/new"
          className="flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold px-5 py-3 rounded-2xl transition-colors flex-shrink-0"
        >
          <Plus className="w-4.5 h-4.5" /> Yeni Kurs
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurs axtar..."
            className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
        <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 w-fit">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatusFilter(f.id)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-[var(--radius-full)] transition-colors whitespace-nowrap ${
                statusFilter === f.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
      ) : error ? (
        <p className="text-sm text-[var(--danger)]">Kurslar yüklənə bilmədi. Səhifəni yeniləyib yenidən cəhd et.</p>
      ) : filtered.length === 0 ? (
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-[28px] p-10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">Heç bir kurs tapılmadı.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((c) => (
            <Link
              key={c.id}
              href={`/studio/courses/${c.id}`}
              className="flex items-center gap-4 bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--border-strong)] rounded-2xl p-4 sm:p-5 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-bold text-[var(--text-primary)] truncate">{c.title}</span>
                  <StatusPill status={c.status} />
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">
                  {CATEGORY_LABEL[c.categoryId] || c.categoryId} · {c.level}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] flex-shrink-0">
                <Users className="w-3.5 h-3.5" />
                {counts[c.id] || 0}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
