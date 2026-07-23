'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import { supabase } from '@/lib/supabaseClient';

/* ---------------- Icons (inline, no dependency) ---------------- */
const Icon = {
  identity: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" /></svg>,
  bio: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h6M7 13h10" /></svg>,
  academic: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" /></svg>,
  career: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>,
  wallet: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" /></svg>,
  game: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><path d="M8 4h8l1 5a5 5 0 0 1-10 0Z" /><path d="M6 7H4a2 2 0 0 0 2 4M18 7h2a2 2 0 0 1-2 4" /><path d="M12 14v3M9 20h6" /></svg>,
  settings: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>,
};

const NAV_ITEMS = [
  { id: 'identity', label: 'Ümumi baxış', icon: Icon.identity },
  { id: 'bio', label: 'İctimai profil', icon: Icon.bio },
  { id: 'academic', label: 'Təhsil', icon: Icon.academic },
  { id: 'career', label: 'Karyera', icon: Icon.career },
  { id: 'wallet', label: 'Ödənişlər', icon: Icon.wallet },
  { id: 'game', label: 'Nailiyyətlər', icon: Icon.game },
  { id: 'settings', label: 'Tənzimləmələr', icon: Icon.settings },
];

/* ---------------- Mock data (placeholder until real backend exists) ---------------- */
const MOCK = {
  name: 'Nicat Əliyev',
  role: 'Frontend İnkişafı — 3-cü səviyyə',
  memberSince: 'Yanvar 2026',
  plan: 'Pro Plan',
  stats: [
    { label: 'Aktiv kurslar', value: '3', icon: '📚', tone: 'accent' },
    { label: 'Tamamlanma', value: '68%', icon: '✅', tone: 'success' },
    { label: 'Seriya (streak)', value: '12 gün', icon: '🔥', tone: 'streak' },
    { label: 'Ümumi bal (XP)', value: '2,450', icon: '⚡', tone: 'warm' },
  ],
  activity: [
    'React ilə Frontend İnkişafı — 4-cü modul tamamlandı',
    'Yeni nişan qazanıldı: "7 Günlük Seriya"',
    'CV redaktə edildi və yeniləndi',
    '"UI/UX Dizayn Əsasları" sertifikatı alındı',
  ],
  gpa: 87,
  courses: [
    { title: 'React ilə Frontend İnkişafı', progress: 100, done: true },
    { title: 'UI/UX Dizayn Əsasları', progress: 100, done: true },
    { title: 'Data Analitikası Əsasları', progress: 45, done: false },
    { title: 'İngilis Dili — Biznes Kommunikasiyası', progress: 20, done: false },
  ],
  certificates: ['React ilə Frontend İnkişafı', 'UI/UX Dizayn Əsasları'],
  learningHours: 142,
  cvCompletion: 92,
  portfolio: [
    { title: 'Mlue Landing Page', tags: ['React', 'Tailwind'] },
    { title: 'Kofe Sifariş Tətbiqi (UI)', tags: ['Figma', 'UX'] },
    { title: 'Şəxsi Portfolio Sayt', tags: ['Next.js'] },
  ],
  jobMatches: [
    { title: 'Junior Frontend Developer', company: 'TechBakı MMC', match: 88 },
    { title: 'UI Dizayner (Intern)', company: 'Kreativ Studio', match: 74 },
  ],
  interviewProgress: { done: 5, total: 10 },
  balance: '45.50 ₼',
  transactions: [
    { date: '12 iyul 2026', desc: 'Kurs alışı — Data Analitikası', amount: '-9.99 ₼' },
    { date: '05 iyul 2026', desc: 'Balans artırıldı', amount: '+50.00 ₼' },
    { date: '28 iyun 2026', desc: 'Kurs alışı — UI/UX Əsasları', amount: '-9.99 ₼' },
    { date: '20 iyun 2026', desc: 'Erkən qeydiyyat endirimi', amount: '+5.00 ₼' },
  ],
  level: 7,
  xp: { current: 2450, max: 3000 },
  badges: [
    { label: '7 Günlük Seriya', earned: true },
    { label: 'İlk Sertifikat', earned: true },
    { label: 'Erkən Qoşulan', earned: true },
    { label: '30 Günlük Seriya', earned: false },
    { label: 'Mentor Rəyi', earned: false },
    { label: 'Portfolio Ustası', earned: false },
  ],
  leaderboard: [
    { name: 'Aysel M.', xp: 3820 },
    { name: 'Tural H.', xp: 3210 },
    { name: 'Nicat Əliyev', xp: 2450, isMe: true },
    { name: 'Günel S.', xp: 2100 },
  ],
};

/* ---------------- Onboarding-based scenario content ---------------- */
const SCENARIO_A = {
  uniRanking: [
    { name: 'UNEC', points: 4210 },
    { name: 'ADA University', points: 3980 },
    { name: 'Bakı Dövlət Universiteti', points: 3540 },
    { name: 'Xəzər Universiteti', points: 3105 },
  ],
  starterTasks: [
    'İlk məhsul kataloqunu yarat (5 məhsul)',
    'Sadə qiymətqoyma strategiyası hazırla',
    'Müştəri profili (persona) çək',
  ],
  courseTitle: 'İlk Onlayn Mağazanı Qur',
};
const SCENARIO_B = {
  jobs: [
    { title: 'Junior Frontend Developer', company: 'TechBakı MMC' },
    { title: 'UI/UX Dizayner (Intern)', company: 'Kreativ Studio' },
    { title: 'Product Designer', company: 'Startup Bakı' },
  ],
  portfolioTips: [
    '3-4 güclü layihəni seç, kəmiyyətdən keyfiyyətə önəm ver',
    'Hər layihədə problemi, prosesi və nəticəni izah et',
    'Şəxsi sayt və ya Behance/Dribbble profili yarat',
  ],
  articleTitle: 'İrəli Səviyyə: Component-Driven Development',
};

/* ---------------- Public profile: skill catalog + link validation ---------------- */
const SKILL_CATALOG = [
  // Proqramlaşdırma
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin',
  'HTML/CSS', 'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 'Django', 'Laravel',
  '.NET', 'SQL', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST API', 'Git', 'Docker', 'Kubernetes', 'AWS', 'Linux',
  // Dizayn
  'Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'UI Dizayn', 'UX Tədqiqatı',
  'Prototipləşdirmə', 'Motion Dizayn', 'Sketch', 'Canva',
  // Data / Analitika
  'Excel', 'Power BI', 'Tableau', 'Data Analitikası', 'Maşın Öyrənməsi', 'Süni İntellekt', 'Statistika',
  'R proqramlaşdırma', 'SPSS',
  // Biznes / Menecment
  'Layihə İdarəetməsi', 'Agile/Scrum', 'Məhsul İdarəetməsi', 'Biznes Analitikası', 'Strateji Planlaşdırma',
  'Satış', 'Danışıqlar Aparma', 'Maliyyə Analizi', 'Mühasibatlıq', 'HR İdarəetməsi',
  // Marketinq
  'Rəqəmsal Marketinq', 'SMM', 'SEO', 'Google Ads', 'Kontent Marketinqi', 'Email Marketinq',
  'Marka Menecmenti', 'Copywriting',
  // Dillər
  'Azərbaycan dili', 'İngilis dili', 'Rus dili', 'Türk dili', 'Alman dili', 'Fransız dili', 'Ərəb dili', 'Çin dili',
  // Soft skills
  'Komanda İşi', 'Liderlik', 'Vaxt İdarəetməsi', 'Problem Həlli', 'Tənqidi Düşüncə', 'Ünsiyyət Bacarıqları',
  'Yaradıcılıq', 'Uyğunlaşma Qabiliyyəti', 'Təqdimat Bacarıqları', 'Mentorluq',
  // Alətlər
  'Microsoft Office', 'Google Workspace', 'Slack', 'Jira', 'Trello', 'Notion', 'Zoom', 'WordPress', 'Shopify',
];

const MAX_SKILLS = 15;

const LINK_FIELDS = [
  {
    id: 'linkedin_url',
    label: 'LinkedIn',
    placeholder: 'https://www.linkedin.com/in/istifadeci-adi',
    pattern: /^https?:\/\/([\w-]+\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]+\/?$/i,
    error: 'LinkedIn şəxsi profil linki linkedin.com/in/... formatında olmalıdır.',
  },
  {
    id: 'facebook_url',
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/istifadeci.adi',
    pattern: /^https?:\/\/([\w-]+\.)?facebook\.com\/(profile\.php\?id=\d+|[A-Za-z0-9.\-_]+)\/?$/i,
    error: 'Facebook profil linki facebook.com/istifadəçi-adı formatında olmalıdır.',
  },
  {
    id: 'instagram_url',
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/istifadeci_adi',
    pattern: /^https?:\/\/([\w-]+\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/i,
    error: 'Instagram profil linki instagram.com/istifadəçi_adı formatında olmalıdır.',
  },
];

function validateLinkField(field, value) {
  const v = value.trim();
  if (!v) return null;
  return field.pattern.test(v) ? null : field.error;
}

/* ---------------- Shared building blocks ----------------
   One consistent "grouped panel" pattern is used everywhere instead of
   many separately-bordered/shadowed boxes, so every tab reads the same way. */
function PageHeader({ children, sub }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">{children}</h1>
      {sub && <p className="text-[var(--text-secondary)] text-sm mt-1">{sub}</p>}
    </div>
  );
}
function Panel({ children, className = '' }) {
  return (
    <div className={`bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
function PanelSection({ title, desc, children, first = false, tint = false }) {
  return (
    <div className={`p-6 ${first ? '' : 'border-t border-[var(--border)]'} ${tint ? 'bg-[var(--bg-surface-2)]' : ''}`}>
      {title && (
        <div className="mb-4">
          <div className="text-base font-bold text-[var(--text-primary)]">{title}</div>
          {desc && <div className="text-sm text-[var(--text-secondary)] mt-0.5">{desc}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
const STAT_TONES = {
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)]',
  success: 'bg-[var(--success-soft)] text-[var(--success)]',
  streak: 'bg-[var(--streak-soft)] text-[var(--streak)]',
  warm: 'bg-[var(--warm-soft)] text-[var(--accent-warm)]',
};
function StatTile({ label, value, icon, tone = 'accent' }) {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm p-5 text-center">
      {icon && (
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg mx-auto mb-2.5 ${STAT_TONES[tone] || STAT_TONES.accent}`}>
          {icon}
        </div>
      )}
      <div className="text-xl font-extrabold text-[var(--text-primary)]">{value}</div>
      <div className="text-[11px] text-[var(--text-secondary)] mt-1 uppercase tracking-wide">{label}</div>
    </div>
  );
}
function ProgressBar({ value, colorClass = 'bg-[var(--accent)]' }) {
  return (
    <div className="w-full h-3 rounded-full bg-[var(--border)] overflow-hidden">
      <div className={`h-full ${colorClass} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  );
}
function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
        {desc && <div className="text-xs text-[var(--text-secondary)] mt-0.5">{desc}</div>}
      </div>
      {children}
    </div>
  );
}
function Toggle({ label, desc, defaultChecked }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
        {desc && <div className="text-xs text-[var(--text-secondary)] mt-0.5">{desc}</div>}
      </div>
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

function SkillPicker({ selected, onChange }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filtered = SKILL_CATALOG.filter((s) => !q || s.toLowerCase().includes(q));
  const atMax = selected.length >= MAX_SKILLS;

  function toggle(skill) {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
    } else if (!atMax) {
      onChange([...selected, skill]);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[var(--text-secondary)]">Sənə uyğun bacarıqları seç</span>
        <span className={`text-xs font-bold ${atMax ? 'text-[var(--accent-warm)]' : 'text-[var(--text-tertiary)]'}`}>
          {selected.length}/{MAX_SKILLS}
        </span>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selected.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--accent-soft)] text-[var(--accent)] pl-3 pr-2 py-1.5 rounded-full">
              {s}
              <button type="button" onClick={() => toggle(s)} aria-label={`${s} sil`} className="hover:opacity-60 leading-none">✕</button>
            </span>
          ))}
        </div>
      )}

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Bacarıq axtar..."
        className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] mb-3 focus:outline-none focus:border-[var(--accent)]"
      />

      <div className="max-h-56 overflow-y-auto border border-[var(--border)] rounded-lg p-3 flex flex-wrap gap-2 content-start">
        {filtered.length === 0 && <span className="text-xs text-[var(--text-tertiary)] px-1">Nəticə tapılmadı</span>}
        {filtered.map((s) => {
          const active = selected.includes(s);
          const disabled = !active && atMax;
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggle(s)}
              disabled={disabled}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                active
                  ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                  : disabled
                  ? 'bg-[var(--bg-surface-2)] border-[var(--border)] text-[var(--text-tertiary)] opacity-50 cursor-not-allowed'
                  : 'bg-[var(--bg-surface-2)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
      {atMax && <p className="text-xs text-[var(--accent-warm)] mt-2">Maksimum {MAX_SKILLS} bacarıq seçə bilərsən.</p>}
    </div>
  );
}

function LinkInput({ field, value, onChange, error }) {
  return (
    <div>
      <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1.5 block">{field.label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={`w-full bg-[var(--bg-surface-2)] border rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none ${
          error ? 'border-[var(--danger)]' : 'border-[var(--border)] focus:border-[var(--accent)]'
        }`}
      />
      {error && <p className="text-xs text-[var(--danger)] mt-1.5">{error}</p>}
    </div>
  );
}

/* ---------------- Tabs ---------------- */
function IdentityPanel({ user, profile }) {
  const email = user?.email || 'nicat.aliyev@example.com';
  const initial = email.charAt(0).toUpperCase();
  const p = profile || {};
  const onboarded = !!profile?.role;
  const isEcommerceStudent = onboarded && p.role === 'student' && p.interests?.includes('ecommerce');

  return (
    <div>
      <PageHeader sub="Hesabına ümumi baxış">Xoş gəldin, {(p.full_name || MOCK.name).split(' ')[0]}</PageHeader>

      <div className="space-y-5">
        <Panel>
          <div className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="text-base font-bold text-[var(--text-primary)] truncate">{p.full_name || MOCK.name}</div>
              <div className="text-sm text-[var(--text-secondary)] truncate">{email}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wide bg-[var(--accent-warm)] text-white px-2 py-0.5 rounded-full">{MOCK.plan}</span>
                <span className="text-xs text-[var(--text-tertiary)]">Üzv: {MOCK.memberSince}</span>
              </div>
            </div>
          </div>
        </Panel>

        {!onboarded && (
          <div className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="text-sm font-bold text-[var(--text-primary)]">Sənə uyğun ana səhifəni quraq</div>
              <div className="text-sm text-[var(--text-secondary)] mt-0.5">2 sürətli sualla fərdiləşdirilmiş tövsiyələr alacaqsan</div>
            </div>
            <Link href="/onboarding" className="flex-shrink-0 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap text-center">
              Sorğunu tamamla →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK.stats.map((s) => <StatTile key={s.label} {...s} />)}
        </div>

        {onboarded && (
          <Panel>
            {isEcommerceStudent ? (
              <>
                <PanelSection first title="Universitetlər Arası Reytinq" desc="Fəallığa görə hazırkı sıralama">
                  <div className="space-y-2">
                    {SCENARIO_A.uniRanking.map((u, i) => (
                      <div key={u.name} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${u.name === p.university ? 'bg-[var(--accent-soft)] border border-[var(--accent)]' : 'bg-[var(--bg-surface-2)]'}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[var(--text-tertiary)] w-4">{i + 1}</span>
                          <span className="text-sm text-[var(--text-primary)]">{u.name}</span>
                        </div>
                        <span className="text-xs font-bold text-[var(--accent-warm)]">{u.points} xal</span>
                      </div>
                    ))}
                  </div>
                </PanelSection>
                <PanelSection title="E-ticarət Üzrə Başlanğıc Tapşırıqlar" desc="İlk addımlarını burdan at">
                  <ul className="space-y-3">
                    {SCENARIO_A.starterTasks.map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </PanelSection>
                <PanelSection title="Tövsiyə Olunan Kurs" desc="Marağına uyğun seçildi">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="text-sm font-bold text-[var(--text-primary)]">🛍️ {SCENARIO_A.courseTitle}</div>
                    <Link href="/qiymetler" className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">Kursa bax</Link>
                  </div>
                </PanelSection>
              </>
            ) : (
              <>
                <PanelSection first title="Sənə Uyğun İş Elanları" desc="IT və dizayn sahəsində açıq mövqelər">
                  <div className="space-y-2">
                    {SCENARIO_B.jobs.map((j) => (
                      <div key={j.title} className="bg-[var(--bg-surface-2)] rounded-xl p-3.5">
                        <div className="text-sm font-bold text-[var(--text-primary)]">{j.title}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{j.company}</div>
                      </div>
                    ))}
                  </div>
                </PanelSection>
                <PanelSection title="Portfel Yaratmaq Üçün İpuçları" desc="Diqqətini bunlara ver">
                  <ul className="space-y-3">
                    {SCENARIO_B.portfolioTips.map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </PanelSection>
                <PanelSection title="İrəli Səviyyə Məqalə" desc="Bacarıqlarını dərinləşdir">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="text-sm font-bold text-[var(--text-primary)]">💻 {SCENARIO_B.articleTitle}</div>
                    <Link href="/platforma" className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">Oxu</Link>
                  </div>
                </PanelSection>
              </>
            )}
          </Panel>
        )}

        <Panel>
          <PanelSection first title="Son fəaliyyət" desc="Hesabında son baş verən dəyişikliklər">
            <ul className="space-y-3">
              {MOCK.activity.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}

function BioPanel({ user, profile, onSaved }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bio, setBio] = useState(profile?.bio || '');
  const [skills, setSkills] = useState(profile?.skills || []);
  const [links, setLinks] = useState({
    linkedin_url: profile?.linkedin_url || '',
    facebook_url: profile?.facebook_url || '',
    instagram_url: profile?.instagram_url || '',
  });
  const [errors, setErrors] = useState({});

  function startEdit() {
    setBio(profile?.bio || '');
    setSkills(profile?.skills || []);
    setLinks({
      linkedin_url: profile?.linkedin_url || '',
      facebook_url: profile?.facebook_url || '',
      instagram_url: profile?.instagram_url || '',
    });
    setErrors({});
    setEditing(true);
  }

  async function handleSave() {
    const newErrors = {};
    LINK_FIELDS.forEach((f) => {
      const err = validateLinkField(f, links[f.id]);
      if (err) newErrors[f.id] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    const payload = {
      id: user.id,
      bio: bio.trim(),
      skills,
      linkedin_url: links.linkedin_url.trim(),
      facebook_url: links.facebook_url.trim(),
      instagram_url: links.instagram_url.trim(),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('profiles').upsert(payload);
    setSaving(false);
    if (error) {
      setErrors({ submit: 'Yadda saxlanılmadı, yenidən cəhd et.' });
      return;
    }
    onSaved((prev) => ({ ...(prev || {}), ...payload }));
    setEditing(false);
  }

  const savedLinks = LINK_FIELDS.map((f) => ({ ...f, url: profile?.[f.id] })).filter((f) => f.url);

  return (
    <div>
      <PageHeader sub="Digər istifadəçilərin gördüyü açıq profilin">İctimai Profil</PageHeader>
      <div className="space-y-5">
        <Panel>
          <PanelSection first title="Haqqımda" desc="Digər istifadəçilərin gördüyü qısa təqdimat">
            {editing ? (
              <div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 500))}
                  rows={4}
                  placeholder="Özün haqqında qısa məlumat yaz..."
                  className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
                />
                <div className="text-xs text-[var(--text-tertiary)] mt-1.5 text-right">{bio.length}/500</div>
              </div>
            ) : profile?.bio ? (
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{profile.bio}</p>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)] italic">Hələ heç nə yazılmayıb.</p>
            )}
          </PanelSection>

          <PanelSection title="Bacarıqlar" desc={`Profilində görünən bacarıq etiketləri (maksimum ${MAX_SKILLS})`}>
            {editing ? (
              <SkillPicker selected={skills} onChange={setSkills} />
            ) : profile?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s) => (
                  <span key={s} className="text-xs font-semibold bg-[var(--bg-surface-2)] text-[var(--text-primary)] px-3 py-1.5 rounded-full">{s}</span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)] italic">Hələ bacarıq seçilməyib.</p>
            )}
          </PanelSection>

          <PanelSection title="Bağlantılar" desc="LinkedIn, Facebook və Instagram profil linklərin">
            {editing ? (
              <div className="space-y-4">
                {LINK_FIELDS.map((f) => (
                  <LinkInput
                    key={f.id}
                    field={f}
                    value={links[f.id]}
                    onChange={(v) => setLinks((prev) => ({ ...prev, [f.id]: v }))}
                    error={errors[f.id]}
                  />
                ))}
              </div>
            ) : savedLinks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {savedLinks.map((l) => (
                  <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] bg-[var(--bg-surface-2)] px-3 py-1.5 rounded-full">{l.label} ↗</a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)] italic">Hələ bağlantı əlavə edilməyib.</p>
            )}
          </PanelSection>
        </Panel>

        {errors.submit && <p className="text-sm text-[var(--danger)]">{errors.submit}</p>}

        <div className="flex gap-3">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors"
              >
                {saving ? 'Yadda saxlanılır...' : 'Yadda saxla'}
              </button>
              <button
                onClick={() => setEditing(false)}
                disabled={saving}
                className="bg-[var(--bg-surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] text-sm font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Ləğv et
              </button>
            </>
          ) : (
            <button onClick={startEdit} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors">
              Profili Düzəlt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AcademicPanel() {
  return (
    <div>
      <PageHeader sub="Kurslar, nailiyyət balı və sertifikatlar">Təhsil</PageHeader>
      <div className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatTile label="Nailiyyət balı" value={`${MOCK.gpa}/100`} icon="🎯" tone="accent" />
          <StatTile label="Öyrənmə saatı" value={`${MOCK.learningHours} saat`} icon="⏱️" tone="warm" />
          <StatTile label="Sertifikat" value={MOCK.certificates.length} icon="🎓" tone="success" />
        </div>
        <Panel>
          <PanelSection first title="Kurslar" desc="Tamamladığın və davam edən kurslar">
            <div className="space-y-5">
              {MOCK.courses.map((c) => (
                <div key={c.title}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[var(--text-primary)] font-medium">{c.title}</span>
                    <span className={c.done ? 'text-[var(--success)]' : 'text-[var(--text-secondary)]'}>{c.progress}%</span>
                  </div>
                  <ProgressBar value={c.progress} colorClass={c.done ? 'bg-[var(--success)]' : 'bg-[var(--accent)]'} />
                </div>
              ))}
            </div>
          </PanelSection>
          <PanelSection title="Sertifikatlar" desc="Uğurla tamamlanmış kurslardan qazanılan sertifikatlar">
            <div className="grid sm:grid-cols-2 gap-3">
              {MOCK.certificates.map((c) => (
                <div key={c} className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl p-3.5">
                  <span className="text-xl">🎓</span>
                  <span className="text-sm text-[var(--text-primary)] font-medium">{c}</span>
                </div>
              ))}
            </div>
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}

function CareerPanel() {
  return (
    <div>
      <PageHeader sub="CV, portfolio və iş imkanları">Karyera Mərkəzi</PageHeader>
      <Panel>
        <PanelSection first title="CV vəziyyəti" desc="Karyera profilinin tamamlanma dərəcəsi">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-primary)] font-medium">Tamamlanma</span>
            <span className="text-[var(--accent-warm)] font-bold">{MOCK.cvCompletion}%</span>
          </div>
          <ProgressBar value={MOCK.cvCompletion} colorClass="bg-[var(--accent-warm)]" />
          <button className="mt-4 text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">CV-ni redaktə et →</button>
        </PanelSection>
        <PanelSection title="Portfolio Layihələri" desc="İşəgötürənlərə göstərmək üçün seçilmiş işlərin">
          <div className="grid sm:grid-cols-3 gap-4">
            {MOCK.portfolio.map((p) => (
              <div key={p.title} className="bg-[var(--bg-surface-2)] rounded-xl p-4">
                <div className="text-sm font-bold text-[var(--text-primary)] mb-2">{p.title}</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => <span key={t} className="text-[10px] bg-[var(--bg-surface)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </PanelSection>
        <PanelSection title="Sənə Uyğun İş Elanları" desc="Bacarıqlarına uyğun tövsiyə olunan vakansiyalar">
          <div className="space-y-2">
            {MOCK.jobMatches.map((j) => (
              <div key={j.title} className="flex items-center justify-between bg-[var(--bg-surface-2)] rounded-xl p-3.5">
                <div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">{j.title}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{j.company}</div>
                </div>
                <span className="text-xs font-bold text-[var(--success)]">{j.match}% uyğunluq</span>
              </div>
            ))}
          </div>
        </PanelSection>
        <PanelSection title="Müsahibəyə hazırlıq" desc="Simulyasiya olunmuş müsahibə seansların">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-primary)] font-medium">Tamamlanma</span>
            <span className="text-[var(--text-secondary)]">{MOCK.interviewProgress.done}/{MOCK.interviewProgress.total} simulyasiya</span>
          </div>
          <ProgressBar value={(MOCK.interviewProgress.done / MOCK.interviewProgress.total) * 100} />
        </PanelSection>
      </Panel>
    </div>
  );
}

function WalletPanel() {
  return (
    <div>
      <PageHeader sub="Balans, ödənişlər və əməliyyat tarixçəsi">Pul Kisəsi</PageHeader>
      <div className="space-y-5">
        <Panel>
          <div className="p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wide mb-1">Cari balans</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{MOCK.balance}</div>
            </div>
            <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">Balansı artır</button>
          </div>
        </Panel>
        <Panel>
          <PanelSection first title="Ödəniş üsulu" desc="Kurs alışları üçün istifadə olunan kart">
            <div className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl p-3.5 w-fit">
              <span className="text-lg">💳</span>
              <span className="text-sm text-[var(--text-primary)]">•••• •••• •••• 4242</span>
            </div>
          </PanelSection>
          <PanelSection title="Əməliyyatlar" desc="Son ödəniş və balans hərəkətlərin">
            <div className="divide-y divide-[var(--border)]">
              {MOCK.transactions.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <div className="text-[var(--text-primary)]">{t.desc}</div>
                    <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{t.date}</div>
                  </div>
                  <span className={`font-bold ${t.amount.startsWith('+') ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>{t.amount}</span>
                </div>
              ))}
            </div>
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}

function GamePanel() {
  return (
    <div>
      <PageHeader sub="Nişanlar, səviyyə və icma sıralaması">Nailiyyətlər</PageHeader>
      <Panel>
        <PanelSection first title="Səviyyə və təcrübə xalı" desc="Platformada fəallığına görə qazandığın XP">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-primary)] font-bold">Səviyyə {MOCK.level}</span>
            <span className="text-[var(--text-secondary)]">{MOCK.xp.current} / {MOCK.xp.max} XP</span>
          </div>
          <ProgressBar value={(MOCK.xp.current / MOCK.xp.max) * 100} colorClass="bg-[var(--accent-warm)]" />
        </PanelSection>
        <PanelSection title="Nişanlar" desc="Qazandığın və hələ açılmamış nailiyyətlər">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {MOCK.badges.map((b) => (
              <div key={b.label} className={`text-center p-3 rounded-2xl border transition-all ${b.earned ? 'border-[var(--accent-warm)] bg-[var(--warm-soft)]' : 'border-[var(--border)] bg-[var(--bg-surface-2)] opacity-50'}`}>
                <div className={`w-9 h-9 mx-auto mb-2 rounded-full flex items-center justify-center text-sm ${b.earned ? 'bg-[var(--accent-warm)] text-white' : 'bg-[var(--border)] text-[var(--text-secondary)]'}`}>
                  {b.earned ? '🏆' : '🔒'}
                </div>
                <div className="text-[10px] font-semibold text-[var(--text-primary)] leading-tight">{b.label}</div>
              </div>
            ))}
          </div>
        </PanelSection>
        <PanelSection title="Liderlik Cədvəli" desc="İcma daxilində ən yüksək XP-yə sahib istifadəçilər">
          <div className="space-y-2">
            {MOCK.leaderboard.map((p, i) => (
              <div key={p.name} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${p.isMe ? 'bg-[var(--accent-soft)] border border-[var(--accent)]' : 'bg-[var(--bg-surface-2)]'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[var(--text-tertiary)] w-4">{i + 1}</span>
                  <span className={`text-sm ${p.isMe ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>{p.name}</span>
                </div>
                <span className="text-xs font-bold text-[var(--accent-warm)]">{p.xp} XP</span>
              </div>
            ))}
          </div>
        </PanelSection>
      </Panel>
    </div>
  );
}

function SettingsPanel({ user }) {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <PageHeader sub="Hesab, şifrə və bildiriş tənzimləmələri">Tənzimləmələr</PageHeader>
      <div className="space-y-5">
        <Panel>
          <PanelSection first title="Görünüş" tint>
            <SettingRow label="Tema" desc="İşıqlı və tünd rejim arasında seç">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="light">İşıqlı</option>
                <option value="dark">Tünd</option>
              </select>
            </SettingRow>
          </PanelSection>

          <PanelSection title="Hesab məlumatları" tint>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Ad Soyad</label>
                <input defaultValue={MOCK.name} className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Email</label>
                <input defaultValue={user?.email || ''} className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
              </div>
            </div>
            <button className="mt-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">Yadda saxla</button>
          </PanelSection>

          <PanelSection title="Şifrəni dəyiş" tint>
            <div className="space-y-4">
              <input type="password" placeholder="Yeni şifrə" className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
              <input type="password" placeholder="Yeni şifrəni təsdiqlə" className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
            </div>
            <button className="mt-4 bg-[var(--bg-surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">Şifrəni yenilə</button>
          </PanelSection>

          <PanelSection title="Bildirişlər" tint>
            <div className="divide-y divide-[var(--border)]">
              <Toggle label="Email bildirişləri" desc="Kurs yenilikləri və hesab bildirişləri email ilə göndərilsin" defaultChecked={true} />
              <Toggle label="Push bildirişləri" desc="Brauzer bildirişləri vasitəsilə anında xəbərdar ol" defaultChecked={false} />
              <Toggle label="Marketinq mesajları" desc="Endirim və kampaniyalar haqqında məlumat al" defaultChecked={false} />
            </div>
          </PanelSection>
        </Panel>

        <div className="rounded-2xl border border-[var(--danger-30)] bg-[var(--danger-10)] p-6">
          <div className="text-sm font-bold text-[var(--danger)] mb-1">Təhlükəli zona</div>
          <div className="text-sm text-[var(--text-secondary)] mb-4">Hesabını sildikdə bütün məlumatların həmişəlik silinir. Bu addım geri qaytarıla bilməz.</div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-transparent border border-[var(--danger-50)] text-[var(--danger)] hover:bg-[var(--danger-10)] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            Çıxış et
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main dashboard ---------------- */
export default function ProfilPage() {
  const { user, loading } = useAuth();
  const [active, setActive] = useState('identity');
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!user) { setProfileLoading(false); return; }
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        setProfile(data);
        setProfileLoading(false);
      });
  }, [user]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center px-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">Panelə baxmaq üçün daxil ol</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Bu səhifə yalnız giriş etmiş istifadəçilər üçündür.</p>
          <Link href="/giris" className="block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-lg transition-colors">Giriş et</Link>
          <div className="text-xs text-[var(--text-secondary)] mt-4">Hesabın yoxdur? <Link href="/qeydiyyat" className="text-[var(--accent)] font-semibold">Qeydiyyatdan keç</Link></div>
        </div>
      </div>
    );
  }

  const PANELS = {
    identity: <IdentityPanel user={user} profile={profile} />,
    bio: <BioPanel user={user} profile={profile} onSaved={setProfile} />,
    academic: <AcademicPanel />,
    career: <CareerPanel />,
    wallet: <WalletPanel />,
    game: <GamePanel />,
    settings: <SettingsPanel user={user} />,
  };

  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col md:h-[calc(100vh-var(--header-h))] md:sticky md:top-[var(--header-h)]">
        <nav className="flex flex-row md:flex-col gap-1 p-3 overflow-x-auto md:overflow-visible">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors w-full text-left
                  ${isActive
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                    : 'text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'}`}
              >
                {item.icon('w-4 h-4 flex-shrink-0')}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-3xl">
        <div key={active} className="fade-in">
          {PANELS[active]}
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeInPanel {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeInPanel 0.35s ease;
        }
      `}</style>
    </div>
  );
}
