'use client';

import { useEffect, useState } from 'react';
import { useReleaseGroups } from '@/hooks/useNews';

export default function NewsPulseDot() {
  const { data: groups = [] } = useReleaseGroups();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const latest = groups[0]?.releaseDate;
    const lastRead = window.localStorage.getItem('mlue-last-read-news');
    setShow(!!latest && (!lastRead || new Date(latest) > new Date(lastRead)));
  }, [groups]);

  if (!show) return null;
  return <span className="absolute -top-0.5 -right-1.5 w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />;
}
