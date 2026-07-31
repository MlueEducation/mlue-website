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

/* Numeric-aware version compare (descending — newest first). Falls back to
   a plain string compare when a tag doesn't look like "vX.Y.Z" (e.g. the
   legacy 'Arxiv' tag on pre-migration rows) — numeric tags always sort
   ahead of non-numeric ones since a real version number is more specific
   than the archival placeholder. */
function parseVersionParts(tag) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(tag || '');
  return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}
export function compareVersionsDesc(a, b) {
  const pa = parseVersionParts(a);
  const pb = parseVersionParts(b);
  if (pa && pb) {
    for (let i = 0; i < 3; i++) {
      if (pa[i] !== pb[i]) return pb[i] - pa[i];
    }
    return 0;
  }
  if (pa && !pb) return -1;
  if (!pa && pb) return 1;
  return b.localeCompare(a);
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
    const versionTags = Array.from(new Set(sortedItems.map(versionTagOf))).sort(compareVersionsDesc);
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

/* Splits a release group's items into per-version buckets, newest version
   first — each bucket keeps its items in whatever order they were already
   in (section-then-time, per groupNewsByRelease), since filtering is
   stable. Used by the release modal to render "vX.Y.Z" sub-headings, each
   followed by its own Yeniliklər/Təkmilləşdirmə/Xəta Həlli breakdown,
   instead of interleaving different versions' changes inside one section. */
export function splitItemsByVersion(items) {
  const tags = Array.from(new Set(items.map(versionTagOf))).sort(compareVersionsDesc);
  return tags.map((versionTag) => ({
    versionTag,
    items: items.filter((i) => versionTagOf(i) === versionTag),
  }));
}

export function formatReleaseDate(isoDate) {
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}
