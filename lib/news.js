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
