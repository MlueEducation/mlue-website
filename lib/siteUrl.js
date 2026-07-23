// OAuth redirects must land on a URL that's guaranteed to still exist when the
// provider bounces back. window.location.origin can be a specific, ephemeral
// Vercel deployment URL that gets pruned later (-> Vercel's DEPLOYMENT_NOT_FOUND
// 404), so outside local dev we always target the stable production domain.
const PRODUCTION_ORIGIN = 'https://mlue-website.vercel.app';

export function getSiteOrigin() {
  if (typeof window === 'undefined') return PRODUCTION_ORIGIN;
  const { hostname, origin } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return origin;
  return PRODUCTION_ORIGIN;
}
