'use client';

import { useQuery } from '@tanstack/react-query';
import { getSponsors } from '@/lib/sponsors';

/* Additive, separate from the existing static "social-proof" partner-name
   text row above it — that block stays untouched (aspirational-partnership
   copy, unrelated to this real, admin-managed logo list). Renders nothing
   when the table is empty, so it's safe by default. */
export default function SponsorsStrip() {
  const { data: sponsors = [] } = useQuery({ queryKey: ['sponsors'], queryFn: getSponsors });

  if (sponsors.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
      {sponsors.map((s) => {
        const logo = (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.logo_url} alt={s.name} title={s.name} className="h-9 max-w-[120px] object-contain opacity-80 hover:opacity-100 transition-opacity" />
        );
        return s.link_url ? (
          <a key={s.id} href={s.link_url} target="_blank" rel="noopener noreferrer">{logo}</a>
        ) : (
          <span key={s.id}>{logo}</span>
        );
      })}
    </div>
  );
}
