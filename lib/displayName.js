export function resolveDisplayName({ profile, user, fallback = 'dostum' }) {
  return profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || fallback;
}
