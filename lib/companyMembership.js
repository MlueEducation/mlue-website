import { supabase } from '@/lib/supabaseClient';

/* Two-query zip (own company_members row, then companies by id) rather than
   a PostgREST embed, matching this codebase's established idiom elsewhere
   (see lib/courses.js's getCourseById). */
export async function fetchMyCompanyMembership(userId) {
  const { data: membership, error } = await supabase
    .from('company_members')
    .select('company_id, member_type, joined_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  if (!membership) return null;

  const { data: company } = await supabase.from('companies').select('id, name, logo_url').eq('id', membership.company_id).maybeSingle();
  return { ...membership, company };
}

/* This repo's first-ever supabase.rpc() call — every other Supabase
   interaction in mlue-nextjs is a plain .from(table).select/insert/update()
   chain. join_company_with_code is a SECURITY DEFINER RPC (defined in the
   sibling mlue-studio's SQL migration) since company_members has no client
   INSERT policy at all; the error-surfacing shape here mirrors the only
   existing precedent for calling a Studio RPC from a client, lib/studioAuth.js's
   redeemInvite() in the sibling repo. */
export async function joinCompanyWithCode(code) {
  const { data, error } = await supabase.rpc('join_company_with_code', { p_code: code });
  if (error) throw error;
  return data;
}
