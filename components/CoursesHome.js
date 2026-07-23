'use client';

import { useMemo, useState } from 'react';

/* Categories mirror Coursera's top-level browse taxonomy, localized. */
const ICONS = {
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

const CATEGORIES = [
  {
    id: 'data', label: 'Data Elmi', icon: ICONS.data,
    courses: [
      { title: 'Python ilə Data Analitikasına Giriş', level: 'Başlanğıc', duration: '5 həftə' },
      { title: 'SQL və Verilənlər Bazası Əsasları', level: 'Başlanğıc', duration: '4 həftə' },
      { title: 'Maşın Öyrənməsinə Giriş', level: 'Orta', duration: '8 həftə' },
      { title: 'Power BI ilə Biznes Analitikası', level: 'Orta', duration: '4 həftə' },
    ],
  },
  {
    id: 'business', label: 'Biznes', icon: ICONS.business,
    courses: [
      { title: 'Sahibkarlıq Əsasları: Fikirdən Məhsula', level: 'Başlanğıc', duration: '6 həftə' },
      { title: 'Rəqəmsal Marketinq Strategiyası', level: 'Orta', duration: '5 həftə' },
      { title: 'Maliyyə Analizi və Büdcələmə', level: 'Orta', duration: '6 həftə' },
      { title: 'Layihə İdarəetməsi (Agile/Scrum)', level: 'Başlanğıc', duration: '4 həftə' },
    ],
  },
  {
    id: 'cs', label: 'Kompüter Elmləri', icon: ICONS.cs,
    courses: [
      { title: 'Alqoritmlər və Data Strukturları', level: 'Orta', duration: '8 həftə' },
      { title: 'Python Proqramlaşdırmaya Giriş', level: 'Başlanğıc', duration: '6 həftə' },
      { title: 'Obyekt Yönümlü Proqramlaşdırma (Java)', level: 'Orta', duration: '7 həftə' },
      { title: 'Kompüter Elmlərinin Əsasları', level: 'Başlanğıc', duration: '5 həftə' },
    ],
  },
  {
    id: 'it', label: 'İnformasiya Texnologiyaları', icon: ICONS.it,
    courses: [
      { title: 'Node.js və Express.js ilə Backend Arxitekturası', level: 'İrəli', duration: '7 həftə' },
      { title: 'Şəbəkə Əsasları və IT Dəstək', level: 'Başlanğıc', duration: '5 həftə' },
      { title: 'Kibertəhlükəsizliyə Giriş', level: 'Orta', duration: '6 həftə' },
      { title: 'Bulud Texnologiyaları (AWS Əsasları)', level: 'Orta', duration: '5 həftə' },
    ],
  },
  {
    id: 'health', label: 'Səhiyyə', icon: ICONS.health,
    courses: [
      { title: 'İctimai Səhiyyəyə Giriş', level: 'Başlanğıc', duration: '4 həftə' },
      { title: 'Qidalanma və Sağlam Həyat Tərzi', level: 'Başlanğıc', duration: '3 həftə' },
      { title: 'Sağlamlıq Sistemlərinin İdarə Edilməsi', level: 'Orta', duration: '5 həftə' },
      { title: 'Zehni Sağlamlıq və Stress İdarəetməsi', level: 'Başlanğıc', duration: '3 həftə' },
    ],
  },
  {
    id: 'physics', label: 'Fizika Elmləri və Mühəndislik', icon: ICONS.physics,
    courses: [
      { title: 'Mühəndislik Mexanikasının Əsasları', level: 'Orta', duration: '6 həftə' },
      { title: 'Yenilənə Bilən Enerji Mənbələri', level: 'Başlanğıc', duration: '4 həftə' },
      { title: 'Fizikaya Giriş: Klassik Mexanika', level: 'Başlanğıc', duration: '5 həftə' },
      { title: 'CAD ilə 3D Modelləşdirmə', level: 'Orta', duration: '5 həftə' },
    ],
  },
  {
    id: 'social', label: 'Sosial Elmlər', icon: ICONS.social,
    courses: [
      { title: 'Psixologiyaya Giriş', level: 'Başlanğıc', duration: '5 həftə' },
      { title: 'Sosiologiya: Cəmiyyəti Anlamaq', level: 'Başlanğıc', duration: '4 həftə' },
      { title: 'Beynəlxalq Münasibətlərə Giriş', level: 'Orta', duration: '6 həftə' },
      { title: 'Davranış İqtisadiyyatı', level: 'Orta', duration: '4 həftə' },
    ],
  },
  {
    id: 'language', label: 'Dil Öyrənmə', icon: ICONS.language,
    courses: [
      { title: 'İngilis Dili — Biznes Kommunikasiyası', level: 'Orta', duration: '8 həftə' },
      { title: 'Türk Dilində Sərbəst Danışıq', level: 'Başlanğıc', duration: '6 həftə' },
      { title: 'Rus Dili Əsasları', level: 'Başlanğıc', duration: '6 həftə' },
      { title: 'IELTS-ə Hazırlıq Proqramı', level: 'İrəli', duration: '8 həftə' },
    ],
  },
  {
    id: 'arts', label: 'İncəsənət və Humanitar Elmlər', icon: ICONS.arts,
    courses: [
      { title: 'Qrafik Dizayn Əsasları', level: 'Başlanğıc', duration: '5 həftə' },
      { title: 'Fotoqrafiya Sənəti', level: 'Başlanğıc', duration: '4 həftə' },
      { title: 'Dünya Tarixinə Səyahət', level: 'Başlanğıc', duration: '5 həftə' },
      { title: 'Yaradıcı Yazı Sənəti', level: 'Orta', duration: '4 həftə' },
    ],
  },
  {
    id: 'personal', label: 'Şəxsi İnkişaf', icon: ICONS.personal,
    courses: [
      { title: 'Vaxt İdarəetməsi və Məhsuldarlıq', level: 'Başlanğıc', duration: '3 həftə' },
      { title: 'Liderlik Bacarıqlarının İnkişafı', level: 'Orta', duration: '5 həftə' },
      { title: 'Effektiv Ünsiyyət və Natiqlik', level: 'Başlanğıc', duration: '4 həftə' },
      { title: 'Karyera Planlaması və CV Hazırlığı', level: 'Başlanğıc', duration: '3 həftə' },
    ],
  },
  {
    id: 'math', label: 'Riyaziyyat və Məntiq', icon: ICONS.math,
    courses: [
      { title: 'Xətti Cəbrə Giriş', level: 'Orta', duration: '6 həftə' },
      { title: 'Ehtimal Nəzəriyyəsi və Statistika', level: 'Orta', duration: '6 həftə' },
      { title: 'Məntiqi Düşüncə və Problem Həlli', level: 'Başlanğıc', duration: '3 həftə' },
      { title: 'Kalkulusun Əsasları', level: 'İrəli', duration: '7 həftə' },
    ],
  },
];

function CatIcon({ children }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{children}</svg>;
}

export default function CoursesHome({ user }) {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');

  const displayName = useMemo(() => {
    const meta = user && user.user_metadata;
    const full = meta && meta.full_name;
    if (full) return full.split(' ')[0];
    return user && user.email ? user.email.split('@')[0] : 'dostum';
  }, [user]);

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES
      .filter((cat) => activeCat === 'all' || activeCat === cat.id)
      .map((cat) => ({
        ...cat,
        courses: cat.courses.filter((c) => !q || c.title.toLowerCase().includes(q) || cat.label.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.courses.length > 0);
  }, [activeCat, query]);

  return (
    <section className="courses-home">
      <div className="container">
        <div className="courses-home-header">
          <div className="eyebrow">Kurs kataloqu</div>
          <h1>Xoş gəldin, {displayName} 👋</h1>
          <p className="section-sub">Kateqoriyalara görə göz gəzdir və növbəti kursunu seç.</p>
          <div className="badge courses-badge"><span className="dot"></span>Kataloq mərhələli açılır — aşağıdakılar ilk baxışdır</div>
        </div>

        <div className="courses-toolbar">
          <input
            type="text"
            className="courses-search"
            placeholder="Kurs və ya kateqoriya axtar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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

        {sections.length === 0 && <p className="section-sub">Axtarışına uyğun kurs tapılmadı.</p>}

        {sections.map((cat) => (
          <div className="category-section" key={cat.id}>
            <h2 className="category-heading">
              <CatIcon>{cat.icon}</CatIcon>
              {cat.label}
            </h2>
            <div className="course-grid">
              {cat.courses.map((c) => (
                <div className="course-card" key={c.title}>
                  <span className="course-tag">{cat.label}</span>
                  <h3>{c.title}</h3>
                  <div className="course-meta">
                    <span>{c.level}</span>
                    <span className="course-meta-dot">·</span>
                    <span>{c.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
