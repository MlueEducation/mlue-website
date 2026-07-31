import { supabase } from '@/lib/supabaseClient';

/* All three RPCs debit the existing ₼ wallet balance (wallet_transactions)
   and re-validate price/balance server-side inside one atomic transaction —
   never trust a client-displayed balance. See the Supabase-side
   purchase_course/purchase_bundle/purchase_cart functions for the real
   enforcement (advisory-locked per user to prevent a double-click/two-tab
   double-spend). */

export async function purchaseCourse(courseId) {
  const { data, error } = await supabase.rpc('purchase_course', { p_course_id: courseId });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

export async function purchaseBundle(bundleId) {
  const { data, error } = await supabase.rpc('purchase_bundle', { p_bundle_id: bundleId });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

export async function purchaseCart(courseIds, bundleIds) {
  const { data, error } = await supabase.rpc('purchase_cart', {
    p_course_ids: courseIds || [],
    p_bundle_ids: bundleIds || [],
  });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

/* Stays a plain client upsert, not an RPC — 'audit' is the strictly-lower
   access level, so the only real security boundary to protect is 'full',
   which the restrictive RLS on user_courses already locks down server-side
   regardless of what a client sends here. */
export async function startAudit(userId, courseId) {
  const { error } = await supabase
    .from('user_courses')
    .upsert({ user_id: userId, course_id: courseId, access_level: 'audit' }, { onConflict: 'user_id,course_id' });
  if (error) throw error;
}
