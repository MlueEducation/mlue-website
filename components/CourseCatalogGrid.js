'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CATEGORY_ICONS as ICONS } from './categoryIcons';
import CourseThumb from './CourseThumb';
import { useCourseList } from '@/hooks/useCoursesData';

/* Category taxonomy stays a static JS constant — icons are React SVG
   components, not real DB content — but each category's course list is
   fetched from Supabase (see getAllCourses) instead of being hardcoded.
   Extracted out of CoursesHome so the same search+grid can be reused on
   the public (logged-out) /platforma catalog. */
const CATEGORIES = [
  { id: 'data', label: 'Data Elmi', icon: ICONS.data },
  { id: 'business', label: 'Biznes', icon: ICONS.business },
  { id: 'cs', label: 'Kompüter Elmləri', icon: ICONS.cs },
  { id: 'it', label: 'İnformasiya Texnologiyaları', icon: ICONS.it },
  { id: 'health', label: 'Səhiyyə', icon: ICONS.health },
  { id: 'physics', label: 'Fizika Elmləri və Mühəndislik', icon: ICONS.physics },
  { id: 'social', label: 'Sosial Elmlər', icon: ICONS.social },
  { id: 'language', label: 'Dil Öyrənmə', icon: ICONS.language },
  { id: 'arts', label: 'İncəsənət və Humanitar Elmlər', icon: ICONS.arts },
  { id: 'personal', label: 'Şəxsi İnkişaf', icon: ICONS.personal },
  { id: 'math', label: 'Riyaziyyat və Məntiq', icon: ICONS.math },
];

function CatIcon({ children }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{children}</svg>;
}

export default function CourseCatalogGrid({ initialQuery = '', toolbarExtra = null }) {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState(initialQuery);
  const { data: allCourses = [], isLoading: coursesLoading, isError: coursesError } = useCourseList();

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES
      .filter((cat) => activeCat === 'all' || activeCat === cat.id)
      .map((cat) => ({
        ...cat,
        courses: allCourses
          .filter((c) => c.categoryId === cat.id)
          .filter((c) => !q || c.title.toLowerCase().includes(q) || cat.label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.courses.length > 0);
  }, [activeCat, query, allCourses]);

  return (
    <>
      <div className="courses-toolbar">
        <input
          type="text"
          className="courses-search"
          placeholder="Kurs və ya kateqoriya axtar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {toolbarExtra}
      </div>

      <div className="category-pills">
        <button type="button" className={activeCat === 'all' ? 'cat-pill active' : 'cat-pill'} onClick={() => setActiveCat('all')}>
          Hamısı
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={activeCat === cat.id ? 'cat-pill active' : 'cat-pill'}
            onClick={() => setActiveCat(cat.id)}
          >
            <CatIcon>{cat.icon}</CatIcon>
            {cat.label}
          </button>
        ))}
      </div>

      {coursesLoading && <p className="section-sub">Yüklənir...</p>}
      {coursesError && <p className="section-sub">Kurslar yüklənərkən xəta baş verdi.</p>}
      {!coursesLoading && !coursesError && sections.length === 0 && <p className="section-sub">Axtarışına uyğun kurs tapılmadı.</p>}

      {!coursesLoading && !coursesError && sections.map((cat) => (
        <div className="category-section" key={cat.id}>
          <h2 className="category-heading">
            <CatIcon>{cat.icon}</CatIcon>
            {cat.label}
          </h2>
          <div className="course-grid">
            {cat.courses.map((c, i) => (
              <Link href={`/courses/${c.id}`} className="course-card" key={c.id}>
                <CourseThumb categoryId={cat.id} variant={i} thumbnailUrl={c.thumbnailUrl} />
                <span className="course-tag">{cat.label}</span>
                <h3>{c.title}</h3>
                <div className="course-meta">
                  <span>{c.level}</span>
                  <span className="course-meta-dot">·</span>
                  <span>{c.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
