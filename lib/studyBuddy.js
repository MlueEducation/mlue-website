import { supabase } from '@/lib/supabaseClient';

/* Only rows for users who've explicitly opted in (profiles.study_buddy_visible)
   are ever mirrored into study_buddy_profiles — same narrow-mirror-table
   pattern as public_instructor_profiles (see lib/courses.js), kept in sync by
   a Supabase trigger. This is the only place another user's data is ever
   readable from this feature; profiles itself stays owner-only. */

export async function fetchMyProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, major, university, interests, study_buddy_visible')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function setStudyBuddyVisible(userId, visible) {
  const { error } = await supabase.from('profiles').update({ study_buddy_visible: visible }).eq('id', userId);
  if (error) throw error;
}

export async function fetchVisibleBuddies(userId) {
  const { data, error } = await supabase
    .from('study_buddy_profiles')
    .select('id, full_name, avatar_url, major, university, interests')
    .neq('id', userId)
    .limit(50);
  if (error) throw error;
  return data || [];
}

export async function fetchMyConnections(userId) {
  const { data, error } = await supabase.from('study_buddy_connections').select('buddy_user_id').eq('user_id', userId);
  if (error) throw error;
  return (data || []).map((r) => r.buddy_user_id).filter(Boolean);
}

export async function connectWithBuddy(userId, buddyUserId) {
  const { error } = await supabase.from('study_buddy_connections').insert({ user_id: userId, buddy_user_id: buddyUserId });
  // 23505 = unique_violation on (user_id, buddy_user_id) — already connected, safe no-op
  if (error && error.code !== '23505') throw error;
}
