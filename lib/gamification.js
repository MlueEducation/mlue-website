import { supabase } from '@/lib/supabaseClient';

/* Matches Postgres to_char(now(),'IYYY-"W"IW') — ISO week number, zero-padded
   to 2 digits. Used to look up the right quest_progress row client-side
   without needing a server-side period filter. */
function getIsoWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const isoYear = d.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${isoYear}-W${String(weekNum).padStart(2, '0')}`;
}

export async function checkStreakStatus() {
  const { data, error } = await supabase.rpc('check_streak_status');
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

export async function useStreakFreeze() {
  const { error } = await supabase.rpc('use_streak_freeze');
  if (error) throw error;
}

export async function recordDailyActivity() {
  const { data, error } = await supabase.rpc('record_daily_activity');
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

/* Fire-and-forget from action sites (lesson complete, internship submit,
   DİM save, portfolio add) — errors are swallowed by callers since a quest
   miss must never block the real action that triggered it. */
export async function recordQuestAction(actionKey, increment = 1) {
  const { error } = await supabase.rpc('record_quest_action', { p_action_key: actionKey, p_increment: increment });
  if (error) throw error;
}

export async function claimBadge(badgeKey) {
  const { data, error } = await supabase.rpc('claim_badge', { p_badge_key: badgeKey });
  if (error) throw error;
  return !!data;
}

export async function openMysteryBox() {
  const { data, error } = await supabase.rpc('open_mystery_box');
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

export async function setLeaderboardVisible(userId, visible) {
  const { error } = await supabase.from('profiles').update({ leaderboard_visible: visible }).eq('id', userId);
  if (error) throw error;
}

export async function fetchLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard_profiles')
    .select('*')
    .order('xp_points', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data || [];
}

/* Real week/month XP totals, computed from the xp_transactions ledger
   (never from the bare xp_points counter, which has no time dimension). */
export async function fetchXpSince(userId, sinceIso) {
  let query = supabase.from('xp_transactions').select('amount').eq('user_id', userId);
  if (sinceIso) query = query.gte('created_at', sinceIso);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).reduce((sum, row) => sum + row.amount, 0);
}

export async function fetchUnconsumedMysteryBoxCount(userId) {
  const { count, error } = await supabase
    .from('user_inventory')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('item_type', 'mystery_box')
    .is('consumed_at', null);
  if (error) throw error;
  return count || 0;
}

/* Two-query-zip: active quests + this user's progress rows for those quests,
   matched to the current period_key client-side (daily = today's date,
   weekly = ISO week) rather than filtering server-side by period. */
export async function fetchMyQuestProgress() {
  const { data: quests, error: questsError } = await supabase.from('quests').select('*').eq('active', true);
  if (questsError) throw questsError;
  const questIds = (quests || []).map((q) => q.id);
  if (questIds.length === 0) return [];

  const { data: progressRows, error: progressError } = await supabase
    .from('quest_progress')
    .select('*')
    .in('quest_id', questIds);
  if (progressError) throw progressError;

  const dailyKey = new Date().toISOString().slice(0, 10);
  const weeklyKey = getIsoWeekKey();

  return quests.map((q) => {
    const periodKey = q.type === 'daily' ? dailyKey : weeklyKey;
    const row = (progressRows || []).find((r) => r.quest_id === q.id && r.period_key === periodKey);
    return { ...q, progress: row?.progress || 0, completed: !!row?.completed_at };
  });
}
