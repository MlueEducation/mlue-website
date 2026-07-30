'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseCatalogGrid from './CourseCatalogGrid';

function PublicCourseCatalogInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  return (
    <section id="kurslar" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="container">
        <div className="courses-home-header" style={{ marginBottom: 24 }}>
          <div className="eyebrow">Kurs kataloqu</div>
          <h2>Bütün kurslara nəzər sal</h2>
          <p className="section-sub">Kateqoriyalara görə göz gəzdir, maraqlandığın sahəni axtar — başlamaq üçün qeydiyyatdan keçməyin belə lazım deyil.</p>
        </div>
        <CourseCatalogGrid initialQuery={initialQuery} />
      </div>
    </section>
  );
}

/* useSearchParams() requires a Suspense boundary under App Router (it opts
   this subtree into client-side rendering so the ?q= param from HomeSearch
   can be read) — the rest of the (server-rendered, ISR'd) /platforma page
   is unaffected. */
export default function PublicCourseCatalog() {
  return (
    <Suspense fallback={null}>
      <PublicCourseCatalogInner />
    </Suspense>
  );
}
