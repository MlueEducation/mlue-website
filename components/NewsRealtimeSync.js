'use client';

import { useNewsRealtimeSync } from '@/hooks/useNews';

/* Renders nothing — opens the shared MLUE News Realtime subscription once
   at the app root (see hooks/useNews.js). */
export default function NewsRealtimeSync() {
  useNewsRealtimeSync();
  return null;
}
