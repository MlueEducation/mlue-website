import { supabase } from '@/lib/supabaseClient';
import { recordQuestAction } from '@/lib/gamification';

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

/* Completion is no longer self-flipped by the client — the student can only
   move their own application from 'applied' to 'submitted' (marking the
   work as done and ready for review). Only the company manager, via the
   approve_internship_application() RPC, can actually flip a row to
   'completed' and mint the token reward — enforced server-side by RLS
   (the owner UPDATE policy only permits this exact 'applied' -> 'submitted'
   transition) and by the RPC itself, not just by hiding the button in the
   UI. Atomic check-and-flip: the update only succeeds if the row is still
   'applied' at the moment it runs, so a double-click/two-tab race can't
   submit twice. */
export async function submitForReview(userId, postingId) {
  const { data, error } = await supabase
    .from('internship_applications')
    .update({ status: 'submitted' })
    .eq('user_id', userId)
    .eq('posting_id', postingId)
    .eq('status', 'applied')
    .select()
    .maybeSingle();
  if (error) throw error;
  if (data) recordQuestAction('internship_apply').catch((err) => console.error('Tapşırıq qeydə alınmadı:', err.message));
  return data; // null if already submitted/completed — someone else won the race
}
