'use client';

import { useEffect, useState } from 'react';
import { getLatestNewsTimestamp } from '@/lib/news';

export default function NewsPulseDot() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const latest = getLatestNewsTimestamp();
    const lastRead = window.localStorage.getItem('mlue-last-read-news');
    if (latest && (!lastRead || new Date(latest) > new Date(lastRead))) setShow(true);
  }, []);

  if (!show) return null;
  return <span className="absolute -top-0.5 -right-1.5 w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />;
}
