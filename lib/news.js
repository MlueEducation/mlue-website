import { supabase } from '@/lib/supabaseClient';
import newsData from '@/data/mlue-news.json';

function sortByNewest(items) {
  return [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

/* Reads live from the mlue_news table (managed via Studio's News panel).
   Falls back to the git-committed JSON file whenever the table doesn't
   exist yet or hasn't been migrated/seeded — this keeps /xeberler working
   with zero regression before the SQL migration has been run, and stops
   falling back automatically the moment real rows exist in the table. */
export async function getAllNews() {
  const { data, error } = await supabase.from('mlue_news').select('*');
  if (!error && data && data.length > 0) return sortByNewest(data);
  return sortByNewest(newsData);
}

export async function getLatestNewsTimestamp() {
  const all = await getAllNews();
  return all[0]?.created_at || null;
}

/* Fixed hierarchy for the release modal, per product decision: 'Performans'
   items fold into the Improvements section rather than getting their own
   heading, so the modal always reads as exactly these 3 sections (any
   section with zero matching items is simply omitted by the caller). */
export const RELEASE_SECTIONS = [
  { key: 'yenilik', heading: 'Yeniliklər', shortLabel: 'Yenilik', emoji: '🚀', categories: ['Yenilik'] },
  { key: 'tekmillesdirme', heading: 'Təkmilləşdirmələr', shortLabel: 'Təkmilləşdirmə', emoji: '⚡', categories: ['Təkmilləşdirmə', 'Performans'] },
  { key: 'xeta', heading: 'Xəta Həlli', shortLabel: 'Xəta Həlli', emoji: '🛠️', categories: ['Xəta Həlli'] },
];

function sectionRank(category) {
  const idx = RELEASE_SECTIONS.findIndex((s) => s.categories.includes(category));
  return idx === -1 ? RELEASE_SECTIONS.length : idx;
}

/* release_date/version_tag only exist on real DB rows (post-migration) — the
   JSON fallback's older shape has neither, so both are defended here rather
   than assumed present. */
function releaseDateOf(item) {
  return item.release_date || (item.created_at ? item.created_at.slice(0, 10) : '0000-00-00');
}
export function versionTagOf(item) {
  return item.version_tag || 'Yenilik';
}

/* Groups flat changelog rows into "release cards" keyed by release_date
   alone — every entry shipped on the same day appears in one card, even if
   a version tag was bumped mid-day or reused from an earlier entry. Each
   item keeps its own version_tag (read via versionTagOf), and the group
   exposes the distinct sorted list of version tags it contains
   (group.versionTags) so the UI can still show users exactly which
   versions' changes are bundled together, instead of collapsing them into
   one misleading version label. */
export function groupNewsByRelease(items) {
  const buckets = new Map();

  for (const item of items) {
    const releaseDate = releaseDateOf(item);
    if (!buckets.has(releaseDate)) buckets.set(releaseDate, { groupKey: releaseDate, releaseDate, items: [] });
    buckets.get(releaseDate).items.push(item);
  }

  const groups = Array.from(buckets.values()).map((group) => {
    const sortedItems = [...group.items].sort((a, b) => {
      const rankDiff = sectionRank(a.category) - sectionRank(b.category);
      if (rankDiff !== 0) return rankDiff;
      return new Date(a.created_at) - new Date(b.created_at);
    });
    const versionTags = Array.from(new Set(sortedItems.map(versionTagOf))).sort();
    return { ...group, items: sortedItems, versionTags };
  });

  groups.sort((a, b) => {
    const dateDiff = new Date(b.releaseDate) - new Date(a.releaseDate);
    if (dateDiff !== 0) return dateDiff;
    const bMax = Math.max(...b.items.map((i) => new Date(i.created_at).getTime()));
    const aMax = Math.max(...a.items.map((i) => new Date(i.created_at).getTime()));
    return bMax - aMax;
  });

  return groups.map((group, i) => ({ ...group, isLatest: i === 0 }));
}

export function formatReleaseDate(isoDate) {
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
