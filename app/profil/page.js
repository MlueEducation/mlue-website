'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { supabase } from '@/lib/supabaseClient';
import { resolveDisplayName } from '@/lib/displayName';
import { Flame, Award, Rocket, MessageCircle, Briefcase, Gift } from 'lucide-react';
import { Panel, PanelSection, SettingRow, Toggle, Tooltip, PageHeader, StatTile, ProgressBar } from '@/components/ProfileUI';
import AccountSettings from '@/components/AccountSettings';
import DimCalculatorPanel from '@/components/panels/DimCalculatorPanel';
import ExamAnalysisPanel from '@/components/panels/ExamAnalysisPanel';
import RoadmapPanel from '@/components/panels/RoadmapPanel';
import StudyBuddyPanel from '@/components/panels/StudyBuddyPanel';
import InternshipsPanel from '@/components/panels/InternshipsPanel';
import MyCoursesPanel from '@/components/panels/MyCoursesPanel';
import MyNotesPanel from '@/components/panels/MyNotesPanel';

/* ---------------- Icons (inline, no dependency) ---------------- */
const Icon = {
  identity: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" /></svg>,
  bio: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h6M7 13h10" /></svg>,
  academic: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" /></svg>,
  certificate: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="12" cy="9" r="5" /><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" /></svg>,
  career: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></svg>,
  wallet: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" /></svg>,
  tokens: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="9" cy="9" r="6" /><circle cx="15" cy="15" r="6" /></svg>,
  game: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><path d="M8 4h8l1 5a5 5 0 0 1-10 0Z" /><path d="M6 7H4a2 2 0 0 0 2 4M18 7h2a2 2 0 0 1-2 4" /><path d="M12 14v3M9 20h6" /></svg>,
  settings: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>,
  calculator: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></svg>,
  examCheck: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v2h6V3" /><path d="M9 12l2 2 4-4" /></svg>,
  roadmap: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M6 8.5V15.5M8.5 6H15.5M8.5 18H15.5" /></svg>,
  buddy: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" /><circle cx="17" cy="7" r="2.3" /><path d="M15.5 13.2c2 .3 3.5 1.9 3.5 4.3" /></svg>,
  briefcaseTask: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M9 13l2 2 4-4" /></svg>,
  myCourses: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M8 13h5" /></svg>,
  myNotes: (c) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}><path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /><path d="M8 13h8M8 17h5" /></svg>,
};

const NAV_ITEMS = [
  { id: 'identity', label: 'Ümumi baxış', icon: Icon.identity },
  { id: 'bio', label: 'İctimai profil', icon: Icon.bio },
  { id: 'academic', label: 'Təhsil', icon: Icon.academic },
  { id: 'myCourses', label: 'Kurslarım', icon: Icon.myCourses },
  { id: 'myNotes', label: 'Kurs Qeydlərim', icon: Icon.myNotes },
  { id: 'career', label: 'Karyera', icon: Icon.career },
  { id: 'wallet', label: 'Ödənişlər', icon: Icon.wallet },
  { id: 'game', label: 'Nailiyyətlər', icon: Icon.game },
  { id: 'settings', label: 'Tənzimləmələr', icon: Icon.settings },
  { id: 'dimCalculator', label: 'DİM Kalkulyatoru', icon: Icon.calculator },
  { id: 'examAnalysis', label: 'Sınaq Nəticələri', icon: Icon.examCheck },
  { id: 'roadmap', label: 'Yol Xəritələri', icon: Icon.roadmap },
  { id: 'studyBuddy', label: 'Tədris Yoldaşı', icon: Icon.buddy },
  { id: 'internships', label: 'Mikro-Təcrübələr', icon: Icon.briefcaseTask },
  { id: 'tokens', label: 'Token / Balansım', icon: Icon.tokens },
  { id: 'certificates', label: 'Sertifikatlar', icon: Icon.certificate },
];

/* ---------------- Mock data ----------------
   Most of what used to live here now comes from real, per-user Supabase
   tables (see the panels below). What's left has no real source of truth
   yet: there's no course-enrollment system anywhere in the app to derive
   gpa/courses/learningHours from, and a real multi-user leaderboard needs
   a Supabase view/RPC exposing other users' data (a privacy decision left
   for a future pass, same tradeoff already made once for this exact
   leaderboard's "name" field). */
const MOCK = {
  memberSince: 'Yanvar 2026',
  plan: 'Pro Plan',
  stats: [
    { label: 'Aktiv kurslar', value: '3', icon: '📚', tone: 'accent' },
    { label: 'Tamamlanma', value: '68%', icon: '✅', tone: 'success' },
  ],
  activity: [
    'React ilə Frontend İnkişafı — 4-cü modul tamamlandı',
    'Yeni nişan qazanıldı: "7 Günlük Seriya"',
    'CV redaktə edildi və yeniləndi',
    '"UI/UX Dizayn Əsasları" sertifikatı alındı',
  ],
  gpa: 87,
  learningHours: 142,
  leaderboardByRange: {
    week: [
      { name: 'Aysel M.', xp: 640 },
      { name: 'Tural H.', xp: 510 },
      { name: '__ME__', xp: 480, isMe: true },
      { name: 'Günel S.', xp: 390 },
    ],
    month: [
      { name: 'Aysel M.', xp: 2150 },
      { name: 'Tural H.', xp: 1890 },
      { name: '__ME__', xp: 1720, isMe: true },
      { name: 'Günel S.', xp: 1340 },
    ],
    all: [
      { name: 'Aysel M.', xp: 3820 },
      { name: 'Tural H.', xp: 3210 },
      { name: '__ME__', xp: 2450, isMe: true },
      { name: 'Günel S.', xp: 2100 },
    ],
  },
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
   many separately-bordered/shadowed boxes, so every tab reads the same way.
   Panel/PanelSection/SettingRow/Toggle/Tooltip/PageHeader/StatTile/ProgressBar
   live in components/ProfileUI.js so other files (AccountSettings, the new
   panels/ directory) can reuse them too. */
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
function IdentityPanel({ user, profile, onNavigate }) {
  const email = user.email;
  const initial = email.charAt(0).toUpperCase();
  const displayName = resolveDisplayName({ profile, user });
  const pictureUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
  const p = profile || {};
  const onboarded = !!profile?.role;
  const isEcommerceStudent = onboarded && p.role === 'student' && p.interests?.includes('ecommerce');

  return (
    <div>
      <PageHeader sub="Hesabına ümumi baxış">Xoş gəldin, {displayName.split(' ')[0]}</PageHeader>

      <div className="space-y-5">
        <Panel>
          <div className="p-6 flex items-center gap-4">
            {pictureUrl ? (
              <img src={pictureUrl} alt="" className="w-14 h-14 rounded-full object-cover flex-shrink-0 border border-[var(--border)]" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-base font-bold text-[var(--text-primary)] truncate">{displayName}</div>
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
          {[
            MOCK.stats[0],
            MOCK.stats[1],
            { label: 'Seriya (streak)', value: `${profile?.current_streak ?? 0} gün`, icon: '🔥', tone: 'streak' },
            { label: 'Ümumi bal (XP)', value: (profile?.xp_points ?? 0).toLocaleString('az-AZ'), icon: '⚡', tone: 'warm' },
          ].map((s) => <StatTile key={s.label} {...s} />)}
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
                <PanelSection first title="Sənə Uyğun İş Elanları" desc="Bacarıqlarına uyğun mikro-təcrübə tapşırıqları">
                  <button onClick={() => onNavigate('internships')} className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                    Mikro-Təcrübələr bölməsinə bax →
                  </button>
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

function AcademicPanel({ onNavigate }) {
  return (
    <div>
      <PageHeader sub="Kurslar və nailiyyət balı">Təhsil</PageHeader>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <StatTile label="Nailiyyət balı" value={`${MOCK.gpa}/100`} icon="🎯" tone="accent" />
          <StatTile label="Öyrənmə saatı" value={`${MOCK.learningHours} saat`} icon="⏱️" tone="warm" />
        </div>
        <Panel>
          <PanelSection first title="Kurslar" desc="Qeydiyyatdan keçdiyin kursların real siyahısı və irəliləyişi">
            <button
              onClick={() => onNavigate('myCourses')}
              className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]"
            >
              Kurslarım bölməsinə bax →
            </button>
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}

function CertificatesPanel({ user }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id)
      .order('issue_date', { ascending: false })
      .then(({ data }) => {
        setCertificates(data || []);
        setLoading(false);
      });
  }, [user.id]);

  return (
    <div>
      <PageHeader sub="Uğurla tamamlanmış kurslardan qazanılan sertifikatlar">Sertifikatlar</PageHeader>
      <div className="space-y-5">
        <div className="max-w-[200px]">
          <StatTile label="Ümumi sertifikat" value={certificates.length} icon="🎓" tone="success" />
        </div>
        <Panel>
          <PanelSection first title="Sertifikatlar" desc="Uğurla tamamlanmış kurslardan qazanılan sertifikatlar">
            {loading ? (
              <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
            ) : certificates.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Hələ sertifikatın yoxdur — bir kurs tamamlayaraq ilk sertifikatını qazan.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {certificates.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl p-3.5">
                    <span className="text-xl">🎓</span>
                    <span className="text-sm text-[var(--text-primary)] font-medium">{c.course_name}</span>
                  </div>
                ))}
              </div>
            )}
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}

const INTERVIEW_SESSIONS_TARGET = 10;

function computeCvCompletion(profile) {
  const fields = [
    profile?.full_name,
    profile?.bio,
    profile?.skills?.length > 0,
    profile?.avatar_url,
    profile?.linkedin_url || profile?.facebook_url || profile?.instagram_url,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

function CareerPanel({ user, profile, onNavigate }) {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const cvCompletion = computeCvCompletion(profile);
  const interviewDone = profile?.interview_sessions_done || 0;

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPortfolio(data || []);
        setLoading(false);
      });
  }, [user.id]);

  return (
    <div>
      <PageHeader sub="CV, portfolio və iş imkanları">Karyera Mərkəzi</PageHeader>
      <Panel>
        <PanelSection first title="CV vəziyyəti" desc="Karyera profilinin tamamlanma dərəcəsi">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-primary)] font-medium">Tamamlanma</span>
            <span className="text-[var(--accent-warm)] font-bold">{cvCompletion}%</span>
          </div>
          <ProgressBar value={cvCompletion} colorClass="bg-[var(--accent-warm)]" />
          <button onClick={() => onNavigate('bio')} className="mt-4 text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">CV-ni redaktə et →</button>
        </PanelSection>
        <PanelSection title="Portfolio Layihələri" desc="İşəgötürənlərə göstərmək üçün seçilmiş işlərin">
          {loading ? (
            <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
          ) : portfolio.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">Hələ portfolio layihən yoxdur.</p>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {portfolio.map((p) => (
                <div key={p.id} className="bg-[var(--bg-surface-2)] rounded-xl p-4">
                  <div className="text-sm font-bold text-[var(--text-primary)] mb-2">{p.title}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(p.tags || []).map((t) => <span key={t} className="text-[10px] bg-[var(--bg-surface)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </PanelSection>
        <PanelSection title="Sənə Uyğun İş Elanları" desc="Bacarıqlarına uyğun mikro-təcrübə tapşırıqları">
          <button onClick={() => onNavigate('internships')} className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">
            Mikro-Təcrübələr bölməsinə bax →
          </button>
        </PanelSection>
        <PanelSection title="Müsahibəyə hazırlıq" desc="Simulyasiya olunmuş müsahibə seansların">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-primary)] font-medium">Tamamlanma</span>
            <span className="text-[var(--text-secondary)]">{interviewDone}/{INTERVIEW_SESSIONS_TARGET} simulyasiya</span>
          </div>
          <ProgressBar value={(interviewDone / INTERVIEW_SESSIONS_TARGET) * 100} />
        </PanelSection>
      </Panel>
    </div>
  );
}

function TokensPanel({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('token_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setTransactions(data || []);
        setLoading(false);
      });
  }, [user.id]);

  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <PageHeader sub="Cari balansın və əməliyyat tarixçən">Token / Balansım</PageHeader>
      <div className="space-y-5">
        <Panel>
          <div className="p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wide mb-1">Cari balans</div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)]">{loading ? '...' : `${balance} MLUE Token`}</div>
            </div>
          </div>
          {!loading && (
            <PanelSection title="Əməliyyatlar" desc="Token qazandığın və istifadə etdiyin hallar">
              {transactions.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)]">Hələ token əməliyyatın yoxdur — nailiyyət qazanaraq token qazanmağa başla.</p>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between py-3 text-sm">
                      <div className="text-[var(--text-primary)]">{t.description}</div>
                      <span className={`font-bold ${t.amount >= 0 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>{t.amount >= 0 ? '+' : ''}{t.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </PanelSection>
          )}
        </Panel>
      </div>
    </div>
  );
}

function WalletPanel({ user }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setTransactions(data || []);
        setLoading(false);
      });
  }, [user.id]);

  return (
    <div>
      <PageHeader sub="Ödəniş üsulu və əməliyyat tarixçəsi">Pul Kisəsi</PageHeader>
      <div className="space-y-5">
        <Panel>
          <PanelSection first title="Ödəniş üsulu" desc="Kurs alışları üçün istifadə olunan kart">
            <div className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl p-3.5 w-fit">
              <span className="text-lg">💳</span>
              <span className="text-sm text-[var(--text-primary)]">•••• •••• •••• 4242</span>
            </div>
          </PanelSection>
          <PanelSection title="Əməliyyatlar" desc="Son ödəniş və balans hərəkətlərin">
            {loading ? (
              <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
            ) : transactions.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Hələ heç bir əməliyyatın yoxdur.</p>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {transactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-3 text-sm">
                    <div>
                      <div className="text-[var(--text-primary)]">{t.description}</div>
                      <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{new Date(t.created_at).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <span className={`font-bold ${t.amount >= 0 ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>{t.amount >= 0 ? '+' : ''}{t.amount.toFixed(2)} ₼</span>
                  </div>
                ))}
              </div>
            )}
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}

const LEADERBOARD_TABS = [
  { id: 'week', label: 'Bu həftə' },
  { id: 'month', label: 'Bu ay' },
  { id: 'all', label: 'Ümumi' },
];

const LEVEL_XP_STEP = 500;
const DAILY_QUESTS = [
  { id: 'q1', label: 'Bir dərsi tamamla', xp: 20 },
  { id: 'q2', label: 'Forumda bir suala cavab yaz', xp: 15 },
  { id: 'q3', label: '10 dəqiqə təcrübə et', xp: 25 },
];
const EARLY_ADOPTER_CUTOFF = new Date('2027-01-01');

function GamePanel({ user, profile, onXpAwarded }) {
  const email = user.email;
  const initial = email.charAt(0).toUpperCase();
  const myName = resolveDisplayName({ profile, user });

  const [claimedToday, setClaimedToday] = useState([]);
  const [certCount, setCertCount] = useState(0);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [range, setRange] = useState('all');

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    supabase.from('daily_quest_claims').select('quest_key').eq('user_id', user.id).eq('claimed_on', today)
      .then(({ data }) => setClaimedToday((data || []).map((r) => r.quest_key)));
    supabase.from('certificates').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setCertCount(count || 0));
    supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setPortfolioCount(count || 0));
  }, [user.id, today]);

  async function claimQuest(quest) {
    if (claimedToday.includes(quest.id)) return;
    const { error } = await supabase.from('daily_quest_claims').insert({ user_id: user.id, quest_key: quest.id, claimed_on: today, xp_awarded: quest.xp });
    if (!error) {
      setClaimedToday((k) => [...k, quest.id]);
      onXpAwarded(quest.xp);
    }
  }

  const xp = profile?.xp_points || 0;
  const level = Math.floor(xp / LEVEL_XP_STEP) + 1;
  const xpIntoLevel = xp % LEVEL_XP_STEP;
  const streak = profile?.current_streak || 0;

  const badges = [
    { key: 'streak-7', label: '7 Günlük Seriya', icon: Flame, earned: streak >= 7, requirement: '7 gün ardıcıl aktivlik lazımdır' },
    { key: 'first-cert', label: 'İlk Sertifikat', icon: Award, earned: certCount >= 1, requirement: 'Bir sertifikat qazanmalısan' },
    { key: 'early', label: 'Erkən Qoşulan', icon: Rocket, earned: new Date(user.created_at) < EARLY_ADOPTER_CUTOFF, requirement: 'Erkən qeydiyyat dövründə qoşulmalısan' },
    { key: 'streak-30', label: '30 Günlük Seriya', icon: Flame, earned: streak >= 30, requirement: '30 gün ardıcıl aktivlik lazımdır' },
    { key: 'mentor-review', label: 'Mentor Rəyi', icon: MessageCircle, earned: false, requirement: 'Bir mentordan rəy almalısan' },
    { key: 'portfolio-master', label: 'Portfolio Ustası', icon: Briefcase, earned: portfolioCount >= 5, requirement: '5 portfolio layihəsi əlavə et' },
  ];

  const leaderboard = MOCK.leaderboardByRange[range].map((row) =>
    row.isMe ? { ...row, name: myName } : row
  );

  return (
    <div>
      <PageHeader sub="Nişanlar, gündəlik tapşırıqlar, səviyyə və icma sıralaması">Nailiyyətlər</PageHeader>
      <Panel>
        <PanelSection first title="Səviyyə və təcrübə xalı" desc="Platformada fəallığına görə qazandığın XP">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-primary)] font-bold">Səviyyə {level}</span>
            <span className="text-[var(--text-secondary)]">{xpIntoLevel} / {LEVEL_XP_STEP} XP</span>
          </div>
          <ProgressBar value={(xpIntoLevel / LEVEL_XP_STEP) * 100} colorClass="bg-[var(--accent-warm)]" />
          <div className="flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-[var(--accent-warm)]">
            <Gift className="w-3.5 h-3.5" />
            Səviyyə {level + 1} mükafatı: +50 MLUE Token
          </div>
        </PanelSection>

        <PanelSection title="Gündəlik Tapşırıqlar" desc="Hər gün yenilənən kiçik tapşırıqlarla əlavə XP qazan">
          <div className="space-y-2">
            {DAILY_QUESTS.map((q) => {
              const claimed = claimedToday.includes(q.id);
              return (
                <div key={q.id} className="flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{q.label}</div>
                    <div className="text-xs text-[var(--accent-warm)] font-bold mt-0.5">+{q.xp} XP</div>
                  </div>
                  <button
                    onClick={() => claimQuest(q)}
                    disabled={claimed}
                    className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors flex-shrink-0 ${
                      claimed
                        ? 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-default'
                        : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
                    }`}
                  >
                    {claimed ? 'Alındı ✓' : 'Al'}
                  </button>
                </div>
              );
            })}
          </div>
        </PanelSection>

        <PanelSection title="Nişanlar" desc="Qazandığın və hələ açılmamış nailiyyətlər">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {badges.map((b) => {
              const BadgeIcon = b.icon;
              const cell = (
                <div className={`text-center p-3 rounded-2xl border transition-all ${b.earned ? 'border-[var(--accent-warm)] bg-[var(--warm-soft)]' : 'border-[var(--border)] bg-[var(--bg-surface-2)] opacity-50'}`}>
                  <div className={`w-9 h-9 mx-auto mb-2 rounded-full flex items-center justify-center ${b.earned ? 'bg-[var(--accent-warm)] text-white' : 'bg-[var(--border)] text-[var(--text-secondary)]'}`}>
                    <BadgeIcon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-[10px] font-semibold text-[var(--text-primary)] leading-tight">{b.label}</div>
                </div>
              );
              return b.earned ? (
                <div key={b.key}>{cell}</div>
              ) : (
                <Tooltip key={b.key} text={b.requirement}>{cell}</Tooltip>
              );
            })}
          </div>
        </PanelSection>

        <PanelSection title="Liderlik Cədvəli" desc="İcma daxilində ən yüksək XP-yə sahib istifadəçilər">
          <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 mb-4">
            {LEADERBOARD_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setRange(t.id)}
                className={`text-xs font-bold px-4 py-1.5 rounded-[var(--radius-full)] transition-colors ${
                  range === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {leaderboard.map((row, i) => (
              <div key={row.isMe ? 'me' : row.name} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${row.isMe ? 'bg-[var(--accent-soft)] border border-[var(--accent)]' : 'bg-[var(--bg-surface-2)]'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[var(--text-tertiary)] w-4">{i + 1}</span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                    {row.isMe ? initial : row.name.charAt(0)}
                  </div>
                  <span className={`text-sm ${row.isMe ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>{row.name}</span>
                </div>
                <span className="text-xs font-bold text-[var(--accent-warm)]">{row.xp} XP</span>
              </div>
            ))}
          </div>
        </PanelSection>
      </Panel>
    </div>
  );
}

function SettingsPanel({ user, profile, onSaved }) {
  const { t } = useLanguage();
  return (
    <div>
      <PageHeader sub={t('settings.sub', 'Hesab, şifrə və bildiriş tənzimləmələri')}>{t('settings.title', 'Tənzimləmələr')}</PageHeader>
      <AccountSettings user={user} profile={profile} onSaved={onSaved} />
    </div>
  );
}

/* Once-per-day streak bump: same day as last visit -> unchanged, exactly
   yesterday -> +1, any bigger gap (or first ever visit) -> resets to 1. */
function applyDailyStreak(profile) {
  const today = new Date().toISOString().slice(0, 10);
  const last = profile.last_activity_at ? profile.last_activity_at.slice(0, 10) : null;
  if (last === today) return profile;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = last === yesterday ? (profile.current_streak || 0) + 1 : 1;
  return { ...profile, current_streak: newStreak, last_activity_at: new Date().toISOString() };
}

/* ---------------- Main dashboard ---------------- */
export default function ProfilPage() {
  const { user, loading } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const [active, setActive] = useState('identity');
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (tab && NAV_ITEMS.some((i) => i.id === tab)) setActive(tab);
  }, []);

  useEffect(() => {
    if (!user) { setProfileLoading(false); return; }
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) { setProfile(data); setProfileLoading(false); return; }
        const updated = applyDailyStreak(data);
        setProfile(updated);
        setProfileLoading(false);
        if (updated.preferred_language && updated.preferred_language !== lang) {
          setLang(updated.preferred_language);
        }
        if (updated !== data) {
          supabase.from('profiles').update({
            current_streak: updated.current_streak,
            last_activity_at: updated.last_activity_at,
          }).eq('id', user.id);
        }
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

  async function awardXp(amount) {
    const prevXp = profile?.xp_points || 0;
    const nextXp = prevXp + amount;
    setProfile((p) => (p ? { ...p, xp_points: nextXp } : p));
    const { error } = await supabase.from('profiles').update({ xp_points: nextXp }).eq('id', user.id);
    if (error) {
      console.error('XP saxlanılmadı, geri qaytarılır:', error.message);
      setProfile((p) => (p ? { ...p, xp_points: prevXp } : p));
    }
  }

  const PANELS = {
    identity: <IdentityPanel user={user} profile={profile} onNavigate={setActive} />,
    bio: <BioPanel user={user} profile={profile} onSaved={setProfile} />,
    academic: <AcademicPanel onNavigate={setActive} />,
    myCourses: <MyCoursesPanel user={user} />,
    myNotes: <MyNotesPanel user={user} />,
    career: <CareerPanel user={user} profile={profile} onNavigate={setActive} />,
    wallet: <WalletPanel user={user} />,
    game: <GamePanel user={user} profile={profile} onXpAwarded={awardXp} />,
    settings: <SettingsPanel user={user} profile={profile} onSaved={setProfile} />,
    dimCalculator: <DimCalculatorPanel profile={profile} user={user} onXpAwarded={awardXp} />,
    examAnalysis: <ExamAnalysisPanel user={user} />,
    roadmap: <RoadmapPanel user={user} />,
    studyBuddy: <StudyBuddyPanel user={user} profile={profile} />,
    internships: <InternshipsPanel user={user} />,
    tokens: <TokensPanel user={user} />,
    certificates: <CertificatesPanel user={user} />,
  };

  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col md:h-[calc(100vh-var(--header-h))] md:sticky md:top-[var(--header-h)]">
        <nav className="flex flex-row md:flex-col gap-1 p-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <div key={item.id}>
                {item.id === 'myCourses' && (
                  <div className="hidden md:block w-full mt-3 mb-1.5 pt-3 px-4 border-t border-[var(--border)]">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">Kurslar</span>
                  </div>
                )}
                {item.id === 'dimCalculator' && (
                  <div className="hidden md:block w-full mt-3 mb-1.5 pt-3 px-4 border-t border-[var(--border)]">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">Simulyasiyalar</span>
                  </div>
                )}
                {item.id === 'studyBuddy' && (
                  <div className="hidden md:block w-full mt-3 mb-1.5 pt-3 px-4 border-t border-[var(--border)]">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">İcma</span>
                  </div>
                )}
                {item.id === 'tokens' && (
                  <div className="hidden md:block w-full mt-3 mb-1.5 pt-3 px-4 border-t border-[var(--border)]">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">Ekosistem</span>
                  </div>
                )}
                <button
                  onClick={() => setActive(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors w-full text-left min-w-0
                    ${isActive
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-semibold'
                      : 'text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]'}`}
                >
                  {item.icon('w-4 h-4 flex-shrink-0')}
                  <span className="flex-1 min-w-0 truncate">{t(`nav.${item.id}`, item.label)}</span>
                </button>
              </div>
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
