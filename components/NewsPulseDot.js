'use client';

import { useEffect, useState } from 'react';
import { useNewsList } from '@/hooks/useNews';

export default function NewsPulseDot() {
  const { data: news = [] } = useNewsList();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const latest = news[0]?.created_at;
    const lastRead = window.localStorage.getItem('mlue-last-read-news');
    setShow(!!latest && (!lastRead || new Date(latest) > new Date(lastRead)));
  }, [news]);

  if (!show) return null;
  return <span className="absolute -top-0.5 -right-1.5 w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />;
}
