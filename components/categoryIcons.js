/* Shared category icon glyphs + thumbnail gradients, used by CoursesHome and CourseThumb. */
export const CATEGORY_ICONS = {
  data: <><rect x="4" y="12" width="4" height="8" rx="1" /><rect x="10" y="6" width="4" height="14" rx="1" /><rect x="16" y="9" width="4" height="11" rx="1" /></>,
  business: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  cs: <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />,
  it: <><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><circle cx="7.5" cy="7" r=".6" fill="currentColor" stroke="none" /><circle cx="7.5" cy="17" r=".6" fill="currentColor" stroke="none" /></>,
  health: <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z" />,
  physics: <><circle cx="12" cy="12" r="2.5" /><ellipse cx="12" cy="12" rx="9" ry="3.6" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" /></>,
  social: <><circle cx="8.5" cy="8" r="3" /><circle cx="16" cy="9" r="2.4" /><path d="M2.5 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M14.5 14.8c2.6.4 4.5 2.3 4.5 5.2" /></>,
  language: <><path d="M4 5h11M9.5 3v2M6 5c.4 3.4 2.6 6 5.5 7.4M13 5c-.8 4.6-4.3 8-9 9.4" /><path d="m14 21 3.5-8 3.5 8M15.3 18h4.4" /></>,
  arts: <><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.7 1.5-1.4 0-.4-.2-.7-.4-1a1.5 1.5 0 0 1 1.2-2.4H16a4 4 0 0 0 4-4c0-5-3.6-9.2-8-9.2Z" /><circle cx="7.5" cy="12" r=".9" fill="currentColor" stroke="none" /><circle cx="9.5" cy="8" r=".9" fill="currentColor" stroke="none" /><circle cx="14.5" cy="8" r=".9" fill="currentColor" stroke="none" /></>,
  personal: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none" /></>,
  math: <><path d="M4 5h9M4 19h9" /><path d="m15 5 5 14M20 5l-5 14" /></>,
};

/* Decorative-only palette for course thumbnails — distinct per category for visual
   variety, intentionally separate from the core Coursera-style brand tokens. */
export const CATEGORY_GRADIENTS = {
  data: ['#1D4ED8', '#38BDF8'],
  business: ['#0F766E', '#2DD4BF'],
  cs: ['#1E293B', '#475569'],
  it: ['#0891B2', '#67E8F9'],
  health: ['#047857', '#34D399'],
  physics: ['#334155', '#94A3B8'],
  social: ['#C2410C', '#FB923C'],
  language: ['#0369A1', '#7DD3FC'],
  arts: ['#9F1239', '#FB7185'],
  personal: ['#B45309', '#FCD34D'],
  math: ['#3730A3', '#818CF8'],
};
