import newsData from '@/data/mlue-news.json';

/* Static, build-time JSON import — not shared-database content, so this is
   plain synchronous logic, no fetch/React Query needed. See CLAUDE.md for
   how new entries get added to the underlying file. */
export function getAllNews() {
  return [...newsData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function getLatestNewsTimestamp() {
  const all = getAllNews();
  return all[0]?.created_at || null;
}
