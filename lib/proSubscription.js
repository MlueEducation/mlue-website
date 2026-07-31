import { supabase } from '@/lib/supabaseClient';

export const PRO_MONTHLY_PRICE = 4.99;

export async function subscribeToPro() {
  const { data, error } = await supabase.rpc('subscribe_pro');
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

/* The one place "is Pro currently active" gets decided — never trust a bare
   is_pro=true alone, since nothing in this app auto-flips it back to false
   once pro_expires_at passes (no cron/recurring-billing infra exists). */
export function isProActive(profile) {
  return !!profile?.is_pro && !!profile?.pro_expires_at && new Date(profile.pro_expires_at) > new Date();
}
