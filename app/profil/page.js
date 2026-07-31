'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Download } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { supabase } from '@/lib/supabaseClient';
import { resolveDisplayName } from '@/lib/displayName';
import { fetchMyCompanyMembership, joinCompanyWithCode } from '@/lib/companyMembership';
import { recordQuestAction } from '@/lib/gamification';
import { getCoursesByIds } from '@/lib/courses';
import { Panel, PanelSection, SettingRow, Toggle, Tooltip, PageHeader, StatTile, ProgressBar } from '@/components/ProfileUI';
import AccountSettings from '@/components/AccountSettings';
import CheckoutModal from '@/components/CheckoutModal';
import AccountRecoveryModal from '@/components/AccountRecoveryModal';
import StreakActivitySync from '@/components/StreakActivitySync';
import AchievementsPanel from '@/components/panels/AchievementsPanel';
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
   What's left here has no real source of truth yet: there's no
   assessment/grading system anywhere in the app to derive gpa from, and no
   time-tracking to derive learningHours from. Everything else that used to
   live in this object (member-since, plan badge, overview stat tiles,
   recent-activity feed) now comes from real per-user Supabase tables — see
   useIdentityOverview() below. A real multi-user leaderboard still needs a
   Supabase view/RPC exposing other users' data (a privacy decision left for
   a future pass, same tradeoff already made once for that leaderboard's
   "name" field). */
const MOCK = {
  gpa: 87,
  learningHours: 142,
};

/* Real per-user "Ümumi baxış" data: active/completed course counts, an
   average-progress completion rate, and a recent-activity feed built by
   merging course enrollment/completion events, certificates, and token
   transactions (which already carry a human-readable `description`) into
   one timeline sorted newest-first. */
function useIdentityOverview(userId) {
  const [overview, setOverview] = useState({ activeCourses: 0, completionRate: 0, activity: [], loading: true });

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      supabase.from('user_courses').select('course_id, enrolled_at, completed_at, progress_percentage').eq('user_id', userId).order('enrolled_at', { ascending: false }),
      supabase.from('certificates').select('course_name, issue_date').eq('user_id', userId).order('issue_date', { ascending: false }).limit(5),
      supabase.from('token_transactions').select('description, amount, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
    ]).then(async ([{ data: enrollmentData }, { data: certData }, { data: tokenData }]) => {
      const enrollments = enrollmentData || [];
      const certificates = certData || [];
      const tokenTx = tokenData || [];

      let courseMap = new Map();
      try {
        courseMap = await getCoursesByIds(enrollments.map((e) => e.course_id));
      } catch (err) {
        console.error('Course lookup for overview failed:', err);
      }
      if (cancelled) return;

      const activeCourses = enrollments.filter((e) => !e.completed_at).length;
      const completionRate = enrollments.length === 0
        ? 0
        : Math.round(enrollments.reduce((sum, e) => sum + (e.completed_at ? 100 : (e.progress_percentage || 0)), 0) / enrollments.length);

      const events = [];
      enrollments.forEach((e) => {
        const title = courseMap.get(e.course_id)?.title || e.course_id;
        if (e.completed_at) events.push({ ts: e.completed_at, text: `"${title}" kursunu tamamladın 🎉` });
        else events.push({ ts: e.enrolled_at, text: `"${title}" kursuna qeydiyyatdan keçdin` });
      });
      certificates.forEach((c) => events.push({ ts: c.issue_date, text: `"${c.course_name}" sertifikatı qazandın 🎓` }));
      tokenTx.forEach((t) => events.push({ ts: t.created_at, text: `+${t.amount} MLUE Token: ${t.description}` }));
      events.sort((a, b) => new Date(b.ts) - new Date(a.ts));

      setOverview({ activeCourses, completionRate, activity: events.slice(0, 5), loading: false });
    });
    return () => { cancelled = true; };
  }, [userId]);

  return overview;
}

function formatMemberSince(createdAt) {
  if (!createdAt) return '—';
  return new Date(createdAt).toLocaleDateString('az-AZ', { month: 'long', year: 'numeric' });
}

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
  const overview = useIdentityOverview(user.id);

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
                <span className="text-[10px] font-bold uppercase tracking-wide bg-[var(--accent-warm)] text-white px-2 py-0.5 rounded-full">Pulsuz Plan</span>
                <span className="text-xs text-[var(--text-tertiary)]">Üzv: {formatMemberSince(user.created_at)}</span>
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
            { label: 'Aktiv kurslar', value: overview.loading ? '—' : String(overview.activeCourses), icon: '📚', tone: 'accent' },
            { label: 'Tamamlanma', value: overview.loading ? '—' : `${overview.completionRate}%`, icon: '✅', tone: 'success' },
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
            {overview.loading ? (
              <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
            ) : overview.activity.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Hələ heç bir fəaliyyət yoxdur — bir kursa qeydiyyatdan keçərək başla.</p>
            ) : (
              <ul className="space-y-3">
                {overview.activity.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                    {a.text}
                  </li>
                ))}
              </ul>
            )}
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

function CompanyMembershipCard({ user }) {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyCompanyMembership(user.id)
      .then(setMembership)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user.id]);

  async function handleJoin() {
    if (!code.trim()) return;
    setJoining(true);
    setError(null);
    try {
      await joinCompanyWithCode(code.trim());
      const updated = await fetchMyCompanyMembership(user.id);
      setMembership(updated);
      setCode('');
    } catch (err) {
      setError(err.message);
    } finally {
      setJoining(false);
    }
  }

  if (loading) return <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>;

  if (membership?.company) {
    return (
      <p className="text-sm text-[var(--text-primary)]">
        <b>{membership.company.name}</b> şirkətinin işçisisən.
      </p>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Şirkət kodu"
        className="flex-1 bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
      />
      <button
        type="button"
        onClick={handleJoin}
        disabled={joining}
        className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors flex-shrink-0"
      >
        {joining ? 'Qoşulur...' : 'Qoşul'}
      </button>
      {error && <p className="text-xs text-[var(--danger)] sm:basis-full">{error}</p>}
    </div>
  );
}

function CareerPanel({ user, profile, onNavigate }) {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newLink, setNewLink] = useState('');
  const [saving, setSaving] = useState(false);
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

  async function handleAddProject(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setSaving(true);
    const tags = newTags.split(',').map((t) => t.trim()).filter(Boolean);
    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert({ user_id: user.id, title: newTitle.trim(), description: newDesc.trim() || null, link_url: newLink.trim() || null, tags })
      .select()
      .single();
    setSaving(false);
    if (!error && data) {
      setPortfolio((p) => [data, ...p]);
      setNewTitle(''); setNewDesc(''); setNewTags(''); setNewLink('');
      setShowAddForm(false);
      recordQuestAction('portfolio_add').catch((err) => console.error('Tapşırıq qeydə alınmadı:', err.message));
    }
  }

  async function handleDeleteProject(id) {
    const prev = portfolio;
    setPortfolio((p) => p.filter((x) => x.id !== id));
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
    if (error) setPortfolio(prev);
  }

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
          <div className="flex items-center gap-5 mt-4">
            <button onClick={() => onNavigate('bio')} className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">CV-ni redaktə et →</button>
            <Link href="/cv" className="flex items-center gap-1.5 text-sm font-bold text-[var(--accent-warm)] hover:opacity-80">
              <Download className="w-4 h-4" /> CV-ni PDF kimi yüklə
            </Link>
          </div>
        </PanelSection>
        <PanelSection title="Portfolio Layihələri" desc="İşəgötürənlərə göstərmək üçün seçilmiş işlərin">
          {loading ? (
            <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
          ) : (
            <>
              {portfolio.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)] mb-4">Hələ portfolio layihən yoxdur.</p>
              ) : (
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  {portfolio.map((p) => (
                    <div key={p.id} className="bg-[var(--bg-surface-2)] rounded-xl p-4 relative group">
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="absolute top-3 right-3 text-[var(--text-tertiary)] hover:text-[var(--danger)] opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Layihəni sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="text-sm font-bold text-[var(--text-primary)] mb-1.5 pr-5">{p.title}</div>
                      {p.description && <p className="text-xs text-[var(--text-secondary)] mb-2">{p.description}</p>}
                      <div className="flex flex-wrap gap-1.5">
                        {(p.tags || []).map((t) => <span key={t} className="text-[10px] bg-[var(--bg-surface)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {showAddForm ? (
                <form onSubmit={handleAddProject} className="bg-[var(--bg-surface-2)] rounded-xl p-4 space-y-3">
                  <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Layihənin adı" required
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Qısa təsvir (istəyə bağlı)" rows={2}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="Bacarıqlar (vergüllə ayır)"
                      className="flex-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    <input value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="Layihə linki (istəyə bağlı)"
                      className="flex-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="submit" disabled={saving} className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
                      {saving ? 'Saxlanılır...' : 'Əlavə et'}
                    </button>
                    <button type="button" onClick={() => setShowAddForm(false)} className="text-sm font-semibold text-[var(--text-secondary)]">Ləğv et</button>
                  </div>
                </form>
              ) : (
                <button onClick={() => setShowAddForm(true)} className="flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                  <Plus className="w-4 h-4" /> Layihə əlavə et
                </button>
              )}
            </>
          )}
        </PanelSection>
        <PanelSection title="Sənə Uyğun İş Elanları" desc="Bacarıqlarına uyğun mikro-təcrübə tapşırıqları">
          <button onClick={() => onNavigate('internships')} className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">
            Mikro-Təcrübələr bölməsinə bax →
          </button>
        </PanelSection>
        <PanelSection title="Şirkətim" desc="İş yerinin MLUE-də irəliləyişini izləməsi üçün şirkət kodunu daxil et">
          <CompanyMembershipCard user={user} />
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
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  function refetch() {
    return Promise.all([
      supabase.from('wallet_transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('user_payment_methods').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    ]).then(([txRes, methodsRes]) => {
      setTransactions(txRes.data || []);
      setMethods(methodsRes.data || []);
      setLoading(false);
    });
  }

  useEffect(() => {
    refetch();
  }, [user.id]);

  async function handleSetDefault(id) {
    await supabase.from('user_payment_methods').update({ is_default: false }).eq('user_id', user.id);
    await supabase.from('user_payment_methods').update({ is_default: true }).eq('id', id);
    refetch();
  }

  async function handleDeleteMethod(id) {
    await supabase.from('user_payment_methods').delete().eq('id', id);
    refetch();
  }

  const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const defaultMethod = methods.find((m) => m.is_default) || methods[0] || null;

  return (
    <div>
      <PageHeader sub="Balans, ödəniş üsulu və əməliyyat tarixçəsi">Pul Kisəsi</PageHeader>
      <div className="space-y-5">
        <Panel>
          <PanelSection first title="Cari balans">
            <div className="text-2xl font-extrabold text-[var(--text-primary)]">{loading ? '...' : `${balance.toFixed(2)} ₼`}</div>
          </PanelSection>
          <PanelSection title="Ödəniş üsulu" desc="Kurs alışları üçün istifadə olunan kart">
            {methods.length === 0 ? (
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">Hələ saxlanılan kartın yoxdur.</p>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(true)}
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Balansı artır
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl p-3.5 w-fit">
                  <span className="text-lg">💳</span>
                  <span className="text-sm text-[var(--text-primary)]">{defaultMethod.card_brand} •••• {defaultMethod.card_last_four}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutOpen(true)}
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Balansı artır
                </button>
              </div>
            )}
          </PanelSection>
          {methods.length > 0 && (
            <PanelSection title="Ödəniş üsulları" desc="Saxlanılan kartlarını idarə et">
              <div className="divide-y divide-[var(--border)]">
                {methods.map((m) => (
                  <div key={m.id} className="flex items-center justify-between py-3 text-sm gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-base">💳</span>
                      <span className="text-[var(--text-primary)]">{m.card_brand} •••• {m.card_last_four}</span>
                      {m.is_default && <span className="text-[10px] font-bold uppercase tracking-wide bg-[var(--accent-soft)] text-[var(--accent)] px-2 py-0.5 rounded-full">Defolt</span>}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {!m.is_default && (
                        <button type="button" onClick={() => handleSetDefault(m.id)} className="text-xs font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                          Defolt et
                        </button>
                      )}
                      <button type="button" onClick={() => handleDeleteMethod(m.id)} className="text-xs font-bold text-[var(--danger)] hover:opacity-80">
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </PanelSection>
          )}
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
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        user={user}
        savedMethod={defaultMethod}
        onSuccess={refetch}
      />
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

/* ---------------- Main dashboard ---------------- */
export default function ProfilPage() {
  const { user, loading } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const [active, setActive] = useState('identity');
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [pendingRecovery, setPendingRecovery] = useState(null);

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
        if (data.deleted_at) { setPendingRecovery(data); setProfileLoading(false); return; }
        setProfile(data);
        setProfileLoading(false);
        if (data.preferred_language && data.preferred_language !== lang) {
          setLang(data.preferred_language);
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

  if (pendingRecovery) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <AccountRecoveryModal
          open
          profile={pendingRecovery}
          onResolved={() => { setPendingRecovery(null); window.location.reload(); }}
        />
      </div>
    );
  }

  /* The real XP write now happens server-side (award_xp_internal(), only
     reachable from inside claim_badge()/other gamification RPCs — never
     grantable directly from the browser). This is a local-only optimistic
     bump so profile.xp_points reflects an RPC-awarded amount immediately,
     without a second round-trip; no DB write happens here. */
  function bumpXpLocal(amount) {
    setProfile((p) => (p ? { ...p, xp_points: (p.xp_points || 0) + amount } : p));
  }

  function bumpStreakLocal(newStreak) {
    setProfile((p) => (p ? { ...p, current_streak: newStreak } : p));
  }

  const PANELS = {
    identity: <IdentityPanel user={user} profile={profile} onNavigate={setActive} />,
    bio: <BioPanel user={user} profile={profile} onSaved={setProfile} />,
    academic: <AcademicPanel onNavigate={setActive} />,
    myCourses: <MyCoursesPanel user={user} />,
    myNotes: <MyNotesPanel user={user} />,
    career: <CareerPanel user={user} profile={profile} onNavigate={setActive} />,
    wallet: <WalletPanel user={user} />,
    game: <AchievementsPanel user={user} profile={profile} />,
    settings: <SettingsPanel user={user} profile={profile} onSaved={setProfile} />,
    dimCalculator: <DimCalculatorPanel profile={profile} user={user} onXpAwarded={bumpXpLocal} />,
    examAnalysis: <ExamAnalysisPanel user={user} />,
    roadmap: <RoadmapPanel user={user} />,
    studyBuddy: <StudyBuddyPanel user={user} profile={profile} />,
    internships: <InternshipsPanel user={user} />,
    tokens: <TokensPanel user={user} />,
    certificates: <CertificatesPanel user={user} />,
  };

  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex flex-col md:flex-row">
      <StreakActivitySync onStreakUpdated={bumpStreakLocal} onMysteryBoxGranted={() => {}} />
      {/* Sidebar */}
      <aside className="relative md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col md:h-[calc(100vh-var(--header-h))] md:sticky md:top-[var(--header-h)]">
        {/* Hints that the mobile tab row scrolls further right — the row has
            12 items but only ~4 fit on a phone screen at once. */}
        <div className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10" />
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
