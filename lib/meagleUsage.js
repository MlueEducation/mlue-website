import { supabase } from '@/lib/supabaseClient';

/* DB-enforced daily cap (5 messages/day for non-Pro) — a client-only limit
   would be trivially bypassed via devtools and defeat the entire point of
   paying to remove it. Throws once the cap is hit; the caller shows an
   upsell instead of a reply. */
export async function incrementMeagleUsage() {
  const { data, error } = await supabase.rpc('increment_meagle_usage');
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}
