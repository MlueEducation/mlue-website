import { supabase } from '@/lib/supabaseClient';

/* Single-purpose helper for MLUE Studio's access gate. Deliberately kept out
   of components/AuthProvider.js so the rest of the site never pays for a
   profiles fetch it doesn't need. Returns 'admin' | 'instructor' | null. */
export async function fetchStaffRole(userId) {
  if (!userId) return null;
  const { data, error } = await supabase.from('profiles').select('staff_role').eq('id', userId).maybeSingle();
  if (error) {
    console.error('Staff role check failed:', error.message);
    return null;
  }
  return data?.staff_role || null;
}
