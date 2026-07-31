import { supabase } from '@/lib/supabaseClient';

/* Both RPCs replace a previous two-step client sequence (unset all
   defaults, then set/insert one) that ran as two separate network requests
   — if the second one failed or raced against another tab, the user could
   end up with zero or two cards marked default. Each RPC does both writes
   inside one Postgres transaction, so it's all-or-nothing. */

export async function setDefaultPaymentMethod(methodId) {
  const { error } = await supabase.rpc('set_default_payment_method', { p_method_id: methodId });
  if (error) throw error;
}

export async function savePaymentMethod({ provider, cardLastFour, cardBrand, tokenId }) {
  const { data, error } = await supabase.rpc('save_payment_method', {
    p_provider: provider,
    p_card_last_four: cardLastFour,
    p_card_brand: cardBrand,
    p_token_id: tokenId,
  });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}
