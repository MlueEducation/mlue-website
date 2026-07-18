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

/* ---------------- Sidebar order: bottom-to-top per spec ---------------- */
const NAV_ITEMS = [
  { id: 'settings', label: 'Tənzimləmələr və Təhlükəsizlik', icon: Icon.settings },
  { id: 'game', label: 'Oyunlaşdırma və İcma', icon: Icon.game },
  { id: 'wallet', label: 'Pul Kisəsi və Ödənişlər', icon: Icon.wallet },
  { id: 'career', label: 'Karyera Mərkəzi və Portfel', icon: Icon.career },
  { id: 'academic', label: 'Akademik Göstəricilər və Təhsil', icon: Icon.academic },
  { id: 'bio', label: 'Açıq Profil və Bio', icon: Icon.bio },
  { id: 'identity', label: 'Kimlik və Giriş Paneli', icon: Icon.identity },
];

/* ---------------- Mock data (placeholder until real backend exists) ---------------- */
const MOCK = {
  name: 'Nicat Əliyev',
  role: 'Frontend İnkişafı — 3-cü səviyyə',
  memberSince: 'Yanvar 2026',
  plan: 'Pro Plan',
  stats: [
    { label: 'Aktiv kurslar', value: '3' },
    { label: 'Tamamlanma', value: '68%' },
    { label: 'Seriya (streak)', value: '12 gün' },
    { label: 'Ümumi bal (XP)', value: '2,450' },
  ],
  activity: [
    'React ilə Frontend İnkişafı — 4-cü modul tamamlandı',
    'Yeni nişan qazanıldı: "7 Günlük Seriya"',
    'CV redaktə edildi və yeniləndi',
    '"UI/UX Dizayn Əsasları" sertifikatı alındı',
  ],
  bio: 'Full-stack developer olmaq istəyən, dizayna böyük marağı olan tələbəyəm. Komanda işində fəal, öyrənməyə həvəslə yanaşan biriyəm.',
  location: 'Bakı, Azərbaycan',
  skills: ['JavaScript', 'React', 'Figma', 'Excel', 'Ünsiyyət', 'Layihə İdarəetməsi'],
  links: [
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Portfolio', href: '#' },
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

/* ---------------- Small UI helpers ---------------- */
function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-[var(--bg-surface)] border border-[var(--border-dark)] rounded-2xl p-8 ${className}`}
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      {children}
    </div>
  );
}
function StatCard({ label, value }) {
  return (
    <Card className="text-center">
      <div className="text-2xl font-extrabold text-[var(--brand-yellow)]">{value}</div>
      <div className="text-xs text-[var(--text-muted)] mt-1 uppercase tracking-wide">{label}</div>
    </Card>
  );
}
function ProgressBar({ value, colorClass = 'bg-[var(--brand-purple)]' }) {
  return (
    <div className="w-full h-2 rounded-full bg-[var(--border-dark)] overflow-hidden">
      <div className={`h-full ${colorClass} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  );
}
function SectionTitle({ children, sub }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-extrabold text-[var(--text-bright)]">{children}</h1>
      {sub && <p className="text-[var(--text-muted)] text-sm mt-1">{sub}</p>}
    </div>
  );
}
function CardHead({ title, desc }) {
  return (
    <div className="pb-5 mb-6 border-b border-[var(--border-dark)]">
      <div className="text-xl font-bold text-[var(--text-bright)]">{title}</div>
      {desc && <div className="text-sm text-[var(--text-muted)] mt-2">{desc}</div>}
    </div>
  );
}
function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <div className="text-base font-semibold text-[var(--text-bright)]">{label}</div>
        {desc && <div className="text-sm text-[var(--text-muted)] mt-1">{desc}</div>}
      </div>
      {children}
    </div>
  );
}

/* ---------------- Section panels ---------------- */
function IdentityPanel({ user, profile }) {
  const email = user?.email || 'nicat.aliyev@example.com';
  const initial = email.charAt(0).toUpperCase();
  const p = profile || {};
  const onboarded = !!profile;

  return (
    <div>
      <SectionTitle sub="Hesabına ümumi baxış">Xoş gəldin, {(meta.full_name || MOCK.name).split(' ')[0]}</SectionTitle>
      <Card className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-purple)] to-[#ec4899] flex items-center justify-center text-2xl font-extrabold text-[var(--text-bright)] flex-shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <div className="text-lg font-bold text-[var(--text-bright)] truncate">{meta.full_name || MOCK.name}</div>
          <div className="text-sm text-[var(--text-muted)] truncate">{email}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] font-bold uppercase tracking-wide bg-[var(--brand-yellow)] text-black px-2.5 py-1 rounded-full">{MOCK.plan}</span>
            <span className="text-xs text-[var(--text-darker)]">Üzv: {MOCK.memberSince}</span>
          </div>
        </div>
      </Card>

      {!onboarded && (
        <Card className="mb-8 border-[var(--brand-purple)]">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-base font-bold text-[var(--text-bright)]">Sənə uyğun ana səhifəni quraq</div>
              <div className="text-sm text-[var(--text-muted)] mt-1">2 sürətli sualla fərdiləşdirilmiş tövsiyələr alacaqsan</div>
            </div>
            <Link href="/onboarding" className="bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              Sorğunu tamamla →
            </Link>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {MOCK.stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {onboarded && meta.status === 'student' && meta.interest === 'ecommerce' && (
        <>
          <Card className="mb-8">
            <CardHead title="Universitetlər Arası Reytinq" desc="Fəallığa görə hazırkı sıralama" />
            <div className="space-y-3">
              {SCENARIO_A.uniRanking.map((u, i) => (
                <div key={u.name} className={`flex items-center justify-between px-4 py-3 rounded-xl ${u.name === meta.university ? 'bg-[var(--purple-15)] border border-[var(--purple-40)]' : 'bg-[var(--bg-surface-secondary)]'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[var(--text-darker)] w-4">{i + 1}</span>
                    <span className="text-sm text-[var(--text-bright)]">{u.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[var(--brand-yellow)]">{u.points} xal</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mb-8">
            <CardHead title="E-ticarət Üzrə Başlanğıc Tapşırıqlar" desc="İlk addımlarını burdan at" />
            <ul className="space-y-4">
              {SCENARIO_A.starterTasks.map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-purple)] mt-1.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHead title="Tövsiyə Olunan Kurs" desc="Marağına uyğun seçildi" />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="text-base font-bold text-[var(--text-bright)]">🛍️ {SCENARIO_A.courseTitle}</div>
              <Link href="/qiymetler" className="bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">Kursa bax</Link>
            </div>
          </Card>
        </>
      )}

      {onboarded && !(meta.status === 'student' && meta.interest === 'ecommerce') && (
        <>
          <Card className="mb-8">
            <CardHead title="Sənə Uyğun İş Elanları" desc="IT və dizayn sahəsində açıq mövqelər" />
            <div className="space-y-4">
              {SCENARIO_B.jobs.map((j) => (
                <div key={j.title} className="flex items-center justify-between bg-[var(--bg-surface-secondary)] border border-[var(--border-dark)] rounded-xl p-4">
                  <div>
                    <div className="text-sm font-bold text-[var(--text-bright)]">{j.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{j.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mb-8">
            <CardHead title="Portfel Yaratmaq Üçün İpuçları" desc="Diqqətini bunlara ver" />
            <ul className="space-y-4">
              {SCENARIO_B.portfolioTips.map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--text-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-purple)] mt-1.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHead title="İrəli Səviyyə Məqalə" desc="Bacarıqlarını dərinləşdir" />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="text-base font-bold text-[var(--text-bright)]">💻 {SCENARIO_B.articleTitle}</div>
              <Link href="/platforma" className="bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">Oxu</Link>
            </div>
          </Card>
        </>
      )}

      <Card className="mt-8">
        <CardHead title="Son fəaliyyət" desc="Hesabında son baş verən dəyişikliklər" />
        <ul className="space-y-4">
          {MOCK.activity.map((a, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--text-muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-purple)] mt-1.5 flex-shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function BioPanel() {
  return (
    <div>
      <SectionTitle sub="Digər istifadəçilərin gördüyü açıq profilin">Açıq Profil və Bio</SectionTitle>
      <Card className="mb-8">
        <CardHead title="Haqqımda" desc="Digər istifadəçilərin gördüyü qısa təqdimat" />
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{MOCK.bio}</p>
        <div className="text-xs text-[var(--text-darker)] mt-4">📍 {MOCK.location}</div>
      </Card>
      <Card className="mb-8">
        <CardHead title="Bacarıqlar" desc="Profilində görünən bacarıq etiketləri" />
        <div className="flex flex-wrap gap-2">
          {MOCK.skills.map((s) => (
            <span key={s} className="text-xs font-semibold bg-[var(--bg-surface-secondary)] border border-[var(--border-dark)] text-[var(--text-bright)] px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </Card>
      <Card className="mb-8">
        <CardHead title="Bağlantılar" desc="Sosial və peşəkar profil linklərin" />
        <div className="flex flex-wrap gap-3">
          {MOCK.links.map((l) => (
            <a key={l.label} href={l.href} className="text-xs font-semibold text-[var(--brand-purple-hover)] hover:text-[#a78bfa] border border-[var(--border-dark)] px-3 py-1.5 rounded-full">{l.label} ↗</a>
          ))}
        </div>
      </Card>
      <button className="bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] text-[var(--text-bright)] text-sm font-bold px-6 py-3 rounded-lg transition-colors">Profili Düzəlt</button>
    </div>
  );
}

function AcademicPanel() {
  return (
    <div>
      <SectionTitle sub="Kurslar, nailiyyət balı və sertifikatlar">Akademik Göstəricilər</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        <StatCard label="Nailiyyət balı" value={`${MOCK.gpa}/100`} />
        <StatCard label="Öyrənmə saatı" value={`${MOCK.learningHours} saat`} />
        <StatCard label="Sertifikat" value={MOCK.certificates.length} />
      </div>
      <Card className="mb-8">
        <CardHead title="Kurslar" desc="Tamamladığın və davam edən kurslar" />
        <div className="space-y-6">
          {MOCK.courses.map((c) => (
            <div key={c.title}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[var(--text-bright)] font-medium">{c.title}</span>
                <span className={c.done ? 'text-[var(--success)]' : 'text-[var(--text-muted)]'}>{c.progress}%</span>
              </div>
              <ProgressBar value={c.progress} colorClass={c.done ? 'bg-[var(--success)]' : 'bg-[var(--brand-purple)]'} />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHead title="Sertifikatlar" desc="Uğurla tamamlanmış kurslardan qazanılan sertifikatlar" />
        <div className="grid sm:grid-cols-2 gap-3">
          {MOCK.certificates.map((c) => (
            <div key={c} className="flex items-center gap-3 bg-[var(--bg-surface-secondary)] border border-[var(--border-dark)] rounded-xl p-4">
              <span className="text-xl">🎓</span>
              <span className="text-sm text-[var(--text-bright)] font-medium">{c}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function CareerPanel() {
  return (
    <div>
      <SectionTitle sub="CV, portfolio və iş imkanları">Karyera Mərkəzi və Portfel</SectionTitle>
      <Card className="mb-8">
        <CardHead title="CV vəziyyəti" desc="Karyera profilinin tamamlanma dərəcəsi" />
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[var(--text-bright)] font-medium">Tamamlanma</span>
          <span className="text-[var(--brand-yellow)] font-bold">{MOCK.cvCompletion}%</span>
        </div>
        <ProgressBar value={MOCK.cvCompletion} colorClass="bg-[var(--brand-yellow)]" />
        <button className="mt-4 text-sm font-bold text-[var(--brand-purple-hover)] hover:text-[#a78bfa]">CV-ni redaktə et →</button>
      </Card>
      <Card className="mb-8">
        <CardHead title="Portfolio Layihələri" desc="İşəgötürənlərə göstərmək üçün seçilmiş işlərin" />
        <div className="grid sm:grid-cols-3 gap-4">
          {MOCK.portfolio.map((p) => (
            <div key={p.title} className="bg-[var(--bg-surface-secondary)] border border-[var(--border-dark)] rounded-xl p-4">
              <div className="text-sm font-bold text-[var(--text-bright)] mb-2">{p.title}</div>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => <span key={t} className="text-[10px] bg-[var(--bg-surface)] text-[var(--text-muted)] px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mb-8">
        <CardHead title="Sənə Uyğun İş Elanları" desc="Bacarıqlarına uyğun tövsiyə olunan vakansiyalar" />
        <div className="space-y-4">
          {MOCK.jobMatches.map((j) => (
            <div key={j.title} className="flex items-center justify-between bg-[var(--bg-surface-secondary)] border border-[var(--border-dark)] rounded-xl p-4">
              <div>
                <div className="text-sm font-bold text-[var(--text-bright)]">{j.title}</div>
                <div className="text-xs text-[var(--text-muted)]">{j.company}</div>
              </div>
              <span className="text-xs font-bold text-[var(--success)]">{j.match}% uyğunluq</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHead title="Müsahibəyə hazırlıq" desc="Simulyasiya olunmuş müsahibə seansların" />
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[var(--text-bright)] font-medium">Tamamlanma</span>
          <span className="text-[var(--text-muted)]">{MOCK.interviewProgress.done}/{MOCK.interviewProgress.total} simulyasiya</span>
        </div>
        <ProgressBar value={(MOCK.interviewProgress.done / MOCK.interviewProgress.total) * 100} />
      </Card>
    </div>
  );
}

function WalletPanel() {
  return (
    <div>
      <SectionTitle sub="Balans, ödənişlər və əməliyyat tarixçəsi">Pul Kisəsi</SectionTitle>
      <Card className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">Cari balans</div>
          <div className="text-3xl font-extrabold text-[var(--text-bright)]">{MOCK.balance}</div>
        </div>
        <button className="bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] text-[var(--text-bright)] text-sm font-bold px-6 py-3 rounded-lg transition-colors">Balansı artır</button>
      </Card>
      <Card className="mb-8">
        <CardHead title="Ödəniş üsulu" desc="Kurs alışları üçün istifadə olunan kart" />
        <div className="flex items-center gap-3 bg-[var(--bg-surface-secondary)] border border-[var(--border-dark)] rounded-xl p-4 w-fit">
          <span className="text-lg">💳</span>
          <span className="text-sm text-[var(--text-bright)]">•••• •••• •••• 4242</span>
        </div>
      </Card>
      <Card>
        <CardHead title="Əməliyyatlar" desc="Son ödəniş və balans hərəkətlərin" />
        <div className="divide-y divide-[var(--border-dark)]">
          {MOCK.transactions.map((t, i) => (
            <div key={i} className="flex items-center justify-between py-4 text-sm">
              <div>
                <div className="text-[var(--text-bright)]">{t.desc}</div>
                <div className="text-xs text-[var(--text-darker)] mt-0.5">{t.date}</div>
              </div>
              <span className={`font-bold ${t.amount.startsWith('+') ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function GamePanel() {
  return (
    <div>
      <SectionTitle sub="Nişanlar, səviyyə və icma sıralaması">Oyunlaşdırma və İcma</SectionTitle>
      <Card className="mb-8">
        <CardHead title="Səviyyə və təcrübə xalı" desc="Platformada fəallığına görə qazandığın XP" />
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[var(--text-bright)] font-bold">Səviyyə {MOCK.level}</span>
          <span className="text-[var(--text-muted)]">{MOCK.xp.current} / {MOCK.xp.max} XP</span>
        </div>
        <ProgressBar value={(MOCK.xp.current / MOCK.xp.max) * 100} colorClass="bg-[var(--brand-yellow)]" />
      </Card>
      <Card className="mb-8">
        <CardHead title="Nişanlar" desc="Qazandığın və hələ açılmamış nailiyyətlər" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {MOCK.badges.map((b) => (
            <div key={b.label} className={`text-center p-3 rounded-xl border ${b.earned ? 'border-[var(--purple-40)] bg-[var(--purple-10)]' : 'border-[var(--border-dark)] bg-[var(--bg-surface-secondary)] opacity-40'}`}>
              <div className="text-2xl mb-1">{b.earned ? '🏆' : '🔒'}</div>
              <div className="text-[10px] text-[var(--text-bright)] leading-tight">{b.label}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHead title="Liderlik Cədvəli" desc="İcma daxilində ən yüksək XP-yə sahib istifadəçilər" />
        <div className="space-y-3">
          {MOCK.leaderboard.map((p, i) => (
            <div key={p.name} className={`flex items-center justify-between px-4 py-3 rounded-xl ${p.isMe ? 'bg-[var(--purple-15)] border border-[var(--purple-40)]' : 'bg-[var(--bg-surface-secondary)]'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[var(--text-darker)] w-4">{i + 1}</span>
                <span className={`text-sm ${p.isMe ? 'text-[var(--text-bright)] font-bold' : 'text-[var(--text-muted)]'}`}>{p.name}</span>
              </div>
              <span className="text-xs font-bold text-[var(--brand-yellow)]">{p.xp} XP</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Toggle({ label, desc, defaultChecked }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-4 gap-4">
      <div>
        <div className="text-base font-semibold text-[var(--text-bright)]">{label}</div>
        {desc && <div className="text-sm text-[var(--text-muted)] mt-1">{desc}</div>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[var(--brand-purple)]' : 'bg-[var(--border-dark)]'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${on ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

function SettingsPanel({ user }) {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <SectionTitle sub="Hesab, şifrə və bildiriş tənzimləmələri">Tənzimləmələr və Təhlükəsizlik</SectionTitle>

      <Card className="mb-8">
        <CardHead title="Görünüş" desc="Panelin ümumi görünüşünü fərdiləşdir" />
        <SettingRow label="Tema" desc="İşıqlı və tünd rejim arasında seç">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-[var(--bg-page)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]"
          >
            <option value="light">İşıqlı</option>
            <option value="dark">Tünd</option>
          </select>
        </SettingRow>
      </Card>

      <Card className="mb-8">
        <CardHead title="Hesab məlumatları" desc="Ad və email ünvanını yenilə" />
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">Ad Soyad</label>
            <input defaultValue={MOCK.name} className="w-full bg-[var(--bg-page)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]" />
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">Email</label>
            <input defaultValue={user?.email || ''} className="w-full bg-[var(--bg-page)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]" />
          </div>
        </div>
        <button className="mt-4 bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] text-[var(--text-bright)] text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">Yadda saxla</button>
      </Card>

      <Card className="mb-8">
        <CardHead title="Şifrəni dəyiş" desc="Hesabına daxil olmaq üçün yeni şifrə təyin et" />
        <div className="space-y-4">
          <input type="password" placeholder="Yeni şifrə" className="w-full bg-[var(--bg-page)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]" />
          <input type="password" placeholder="Yeni şifrəni təsdiqlə" className="w-full bg-[var(--bg-page)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]" />
        </div>
        <button className="mt-4 bg-[var(--bg-surface-secondary)] border border-[var(--border-dark)] hover:border-[var(--brand-purple-hover)] text-[var(--text-bright)] text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">Şifrəni yenilə</button>
      </Card>

      <Card className="mb-8">
        <CardHead title="Bildirişlər" desc="Hansı bildirişləri almaq istədiyini seç" />
        <div className="divide-y divide-[var(--border-dark)]">
          <Toggle label="Email bildirişləri" desc="Kurs yenilikləri və hesab bildirişləri email ilə göndərilsin" defaultChecked={true} />
          <Toggle label="Push bildirişləri" desc="Brauzer bildirişləri vasitəsilə anında xəbərdar ol" defaultChecked={false} />
          <Toggle label="Marketinq mesajları" desc="Endirim və kampaniyalar haqqında məlumat al" defaultChecked={false} />
        </div>
      </Card>

      <Card className="border-[var(--danger-30)]">
        <CardHead title="Təhlükəli zona" desc="Hesabını sildikdə bütün məlumatların həmişəlik silinir. Bu addım geri qaytarıla bilməz." />
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-transparent border border-[var(--danger-50)] text-[var(--danger)] hover:bg-[var(--danger-10)] text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
        >
          Çıxış et
        </button>
      </Card>
    </div>
  );
}

/* ---------------- Main dashboard ---------------- */
export default function ProfilPage() {
  const { user, loading } = useAuth();
  const [active, setActive] = useState('identity');

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-76px)] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Yüklənir...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-76px)] bg-[var(--bg-page)] flex items-center justify-center px-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--purple-30)] rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-xl font-extrabold text-[var(--text-bright)] mb-2">Panelə baxmaq üçün daxil ol</h1>
          <p className="text-sm text-[var(--text-muted)] mb-6">Bu səhifə yalnız giriş etmiş istifadəçilər üçündür.</p>
          <Link href="/giris" className="block bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] text-[var(--text-bright)] font-bold py-3 rounded-lg transition-colors">Giriş et</Link>
          <div className="text-xs text-[var(--text-muted)] mt-4">Hesabın yoxdur? <Link href="/qeydiyyat" className="text-[var(--brand-purple-hover)] font-semibold">Qeydiyyatdan keç</Link></div>
        </div>
      </div>
    );
  }

  const PANELS = {
    identity: <IdentityPanel user={user} />,
    bio: <BioPanel />,
    academic: <AcademicPanel />,
    career: <CareerPanel />,
    wallet: <WalletPanel />,
    game: <GamePanel />,
    settings: <SettingsPanel user={user} />,
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[var(--bg-page)] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-[var(--border-dark)] flex flex-col md:h-[calc(100vh-76px)] md:sticky md:top-[76px]">
        <nav className="flex flex-row md:flex-col-reverse gap-2 p-3 overflow-x-auto md:overflow-visible">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
                  ${isActive
                    ? 'bg-[var(--purple-15)] text-[var(--text-bright)] border border-[var(--purple-40)]'
                    : 'text-[var(--text-muted)] border border-transparent hover:bg-[var(--bg-surface)] hover:text-[var(--text-bright)]'}`}
              >
                {item.icon(`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[var(--brand-purple-hover)]' : ''}`)}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-12 max-w-4xl">
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
