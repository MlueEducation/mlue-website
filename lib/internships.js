import { supabase } from '@/lib/supabaseClient';

export async function fetchOpenPostings() {
  const { data, error } = await supabase
    .from('internship_postings')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/* Batched companies lookup into a Map, same two-query-zip idiom as
   lib/courses.js's getCoursesByIds — no PostgREST nested embed. */
export async function fetchCompaniesByIds(ids) {
  const uniqueIds = Array.from(new Set((ids || []).filter(Boolean)));
  if (uniqueIds.length === 0) return new Map();
  const { data, error } = await supabase.from('companies').select('id, name, logo_url').in('id', uniqueIds);
  if (error) throw error;
  const map = new Map();
  (data || []).forEach((c) => map.set(c.id, c));
  return map;
}

export async function fetchMyApplications(userId) {
  const { data, error } = await supabase
    .from('internship_applications')
    .select('*')
    .eq('user_id', userId)
    .order('applied_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function applyToPosting(userId, postingId) {
  const { error } = await supabase.from('internship_applications').insert({ user_id: userId, posting_id: postingId, status: 'applied' });
  // 23505 = unique_violation on (user_id, posting_id) — a double-click race
  // against an already-applied posting, safe to swallow as a no-op.
  if (error && error.code !== '23505') throw error;
}

/* Atomic check-and-flip: the update only succeeds if this row is still
   'applied' at the moment it runs, so two concurrent completion calls (a
   double-click, or two open tabs) can never both award tokens — Postgres
   row locking during the UPDATE makes the check-then-award race-free without
   needing a separate unique constraint the way the old mock relied on. */
export async function completeApplication(userId, postingId, rewardTokens, postingTitle) {
  const { data, error } = await supabase
    .from('internship_applications')
    .update({ status: 'completed', completed_at: new Date().toISOString(), tokens_awarded: rewardTokens })
    .eq('user_id', userId)
    .eq('posting_id', postingId)
    .eq('status', 'applied')
    .select()
    .maybeSingle();
  if (error) throw error;
  if (!data) return null; // already completed or never applied — someone else won the race
  await supabase.from('token_transactions').insert({ user_id: userId, description: postingTitle, amount: rewardTokens });
  return data;
}
