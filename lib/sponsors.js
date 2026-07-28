import { supabase } from '@/lib/supabaseClient';

export async function getSponsors() {
  const { data, error } = await supabase.from('sponsors').select('*').order('position');
  if (error) return [];
  return data || [];
}
