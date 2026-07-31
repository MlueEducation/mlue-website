import { supabase } from '@/lib/supabaseClient';
import { getCoursesByIds } from '@/lib/courses';

/* Public-facing bundle reads — mirrors lib/courses.js's shape/idiom (plain
   async functions, camelCase return objects, two-query-zip instead of a
   PostgREST embed). RLS already filters to status='live' for anon/students. */

export async function fetchLiveBundles() {
  const { data: bundleRows, error } = await supabase
    .from('bundles')
    .select('id, title, description, discounted_price, thumbnail_url, status')
    .eq('status', 'live')
    .order('created_at', { ascending: false });
  if (error) throw error;
  if (!bundleRows || bundleRows.length === 0) return [];

  const bundleIds = bundleRows.map((b) => b.id);
  const { data: linkRows, error: linkError } = await supabase
    .from('bundle_courses')
    .select('bundle_id, course_id')
    .in('bundle_id', bundleIds);
  if (linkError) throw linkError;

  const courseIds = (linkRows || []).map((r) => r.course_id);
  const courseMap = await getCoursesByIds(courseIds);

  const coursesByBundle = new Map();
  (linkRows || []).forEach((r) => {
    if (!coursesByBundle.has(r.bundle_id)) coursesByBundle.set(r.bundle_id, []);
    const course = courseMap.get(r.course_id);
    if (course) coursesByBundle.get(r.bundle_id).push(course);
  });

  return bundleRows.map((b) => ({
    id: b.id,
    title: b.title,
    description: b.description,
    discountedPrice: b.discounted_price,
    thumbnailUrl: b.thumbnail_url,
    courses: coursesByBundle.get(b.id) || [],
  }));
}

export async function fetchBundleById(bundleId) {
  const { data: bundleRow, error } = await supabase
    .from('bundles')
    .select('id, title, description, discounted_price, thumbnail_url, status')
    .eq('id', bundleId)
    .eq('status', 'live')
    .maybeSingle();
  if (error) throw error;
  if (!bundleRow) return null;

  const { data: linkRows, error: linkError } = await supabase
    .from('bundle_courses')
    .select('course_id')
    .eq('bundle_id', bundleId);
  if (linkError) throw linkError;

  const courseMap = await getCoursesByIds((linkRows || []).map((r) => r.course_id));

  return {
    id: bundleRow.id,
    title: bundleRow.title,
    description: bundleRow.description,
    discountedPrice: bundleRow.discounted_price,
    thumbnailUrl: bundleRow.thumbnail_url,
    courses: (linkRows || []).map((r) => courseMap.get(r.course_id)).filter(Boolean),
  };
}

/* Batched "which of these courses does this user already fully own"
   lookup — used to hide/disable the buy button on bundles the user has
   already fully purchased, instead of letting them add a 100%-duplicate
   purchase to the cart (the server-side purchase_bundle/purchase_cart RPCs
   also guard this, but the client should never invite the click at all). */
export async function fetchOwnedFullCourseIds(userId, courseIds) {
  const uniqueIds = Array.from(new Set((courseIds || []).filter(Boolean)));
  if (!userId || uniqueIds.length === 0) return new Set();
  const { data, error } = await supabase
    .from('user_courses')
    .select('course_id')
    .eq('user_id', userId)
    .eq('access_level', 'full')
    .in('course_id', uniqueIds);
  if (error) throw error;
  return new Set((data || []).map((r) => r.course_id));
}

export function computeDiscountPercent(componentPricesTotal, discountedPrice) {
  if (!componentPricesTotal || componentPricesTotal <= discountedPrice) return 0;
  return Math.round((1 - discountedPrice / componentPricesTotal) * 100);
}
