import { supabase } from '@/lib/supabaseClient';

export const PRO_MONTHLY_PRICE = 4.99;

export async function subscribeToPro() {
  const { data, error } = await supabase.rpc('subscribe_pro');
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

/* Immediate deactivation, no partial refund for remaining days — matches
   the "İstənilən vaxt ləğv et" copy literally, since there's no recurring
   billing to actually "cancel" (Pro is manual-renew only). */
export async function cancelPro() {
  const { error } = await supabase.rpc('cancel_pro');
  if (error) throw error;
}

/* The one place "is Pro currently active" gets decided — never trust a bare
   is_pro=true alone, since nothing in this app auto-flips it back to false
   once pro_expires_at passes (no cron/recurring-billing infra exists). */
export function isProActive(profile) {
  return !!profile?.is_pro && !!profile?.pro_expires_at && new Date(profile.pro_expires_at) > new Date();
}
