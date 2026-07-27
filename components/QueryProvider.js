'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Course content changes rarely; realtime invalidation (see
// hooks/useCoursesData.js) handles the "changed sooner than this" case, so
// staleTime just controls how aggressively we refetch when nothing told us
// to. gcTime must be >= the persister's maxAge below, otherwise React Query
// evicts a query from memory (and therefore from what gets persisted)
// before that window is up.
const STALE_TIME = 5 * 60 * 1000; // 5 min
const GC_TIME = 24 * 60 * 60 * 1000; // 24h
const PERSIST_MAX_AGE = 24 * 60 * 60 * 1000; // 24h

// Bump this string whenever lib/courses.js changes the shape of what
// getCourseById/getAllCourses return, so stale persisted shapes are dropped
// instead of crashing a component that reads a field that no longer exists.
const PERSIST_BUSTER = 'courses-v1';

export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
        // 'always' (not `true`) forces a background revalidation on every
        // mount/focus regardless of staleTime — closes the window where a
        // course flipped live -> draft in Studio stays visible on an
        // already-cached catalog page. Realtime can't catch that specific
        // transition itself (Supabase enforces the subscriber's RLS against
        // the row's NEW version, so a now-hidden draft never reaches an
        // already-connected anon client) — this is the safety net for
        // exactly that gap. Cached data still paints instantly first, so
        // there's no added loading flash; this only changes what happens
        // silently right after.
        refetchOnMount: 'always',
        refetchOnWindowFocus: 'always',
        retry: 1,
      },
    },
  }));

  // Deliberately NOT using <PersistQueryClientProvider> here — it renders a
  // different provider than plain <QueryClientProvider>, and creating the
  // localStorage persister requires `window`, which doesn't exist during
  // Next.js's server render pass. Branching the provider tree on
  // `typeof window` produces a genuine hydration mismatch (the exact
  // "server/client branch" case React's own hydration warning calls out),
  // because it changes when React Query considers itself still "restoring"
  // between the server-rendered pass and the client's first hydration pass.
  // Calling the imperative `persistQueryClient` inside a plain `useEffect`
  // sidesteps this entirely: effects never run during SSR, so the JSX tree
  // below is always the same <QueryClientProvider>, and persistence simply
  // attaches itself after the client has already hydrated.
  useEffect(() => {
    const persister = createSyncStoragePersister({ storage: window.localStorage, key: 'mlue-course-cache' });
    const [unsubscribe] = persistQueryClient({
      queryClient,
      persister,
      maxAge: PERSIST_MAX_AGE,
      buster: PERSIST_BUSTER,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) =>
          Array.isArray(query.queryKey) && (query.queryKey[0] === 'courses' || query.queryKey[0] === 'course'),
      },
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
