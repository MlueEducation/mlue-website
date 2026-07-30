'use client';

import { useEffect, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { getAllNews, groupNewsByRelease } from '@/lib/news';

export function useNewsList() {
  return useQuery({ queryKey: ['news'], queryFn: getAllNews });
}

/* Derived from useNewsList()'s cache — no extra fetch, no changes needed to
   useNewsRealtimeSync below, since a refetch of ['news'] automatically
   recomputes this memo. */
export function useReleaseGroups() {
  const query = useNewsList();
  const groups = useMemo(() => groupNewsByRelease(query.data || []), [query.data]);
  return { ...query, data: groups, allNews: query.data || [] };
}

/* Call once near the app root — mirrors hooks/useCoursesData.js's
   useCourseRealtimeSync pattern, so a Studio-published entry appears
   without a manual refresh. */
export function useNewsRealtimeSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('public-mlue-news-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mlue_news' }, () => {
        queryClient.invalidateQueries({ queryKey: ['news'] });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);
}
