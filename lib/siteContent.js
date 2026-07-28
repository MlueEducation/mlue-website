import { supabase } from '@/lib/supabaseClient';

/* Fails open to {} on any error (missing table, network issue, etc.) so a
   marketing page never breaks over this — every call site falls back to its
   own hardcoded default string when a key is absent. */
export async function getSiteContentMap() {
  try {
    const { data, error } = await supabase.from('site_content').select('key, value');
    if (error) return {};
    return Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  } catch {
    return {};
  }
}
