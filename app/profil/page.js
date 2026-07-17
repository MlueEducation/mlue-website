'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
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
/* Array is written 1→7 as specified; flex-col-reverse flips it visually
   so item 7 (Kimlik) lands at the top and item 1 (Tənzimləmələr) at the bottom. */
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

/* ---------------- Small UI helpers ---------------- */
function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#131520] border border-[#1f2235] rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}
function StatCard({ label, value }) {
  return (
    <Card className="text-center">
      <div className="text-2xl font-extrabold text-[#fbbf24]">{value}</div>
      <div className="text-xs text-[#94a3b8] mt-1 uppercase tracking-wide">{label}</div>
    </Card>
  );
}
function ProgressBar({ value, colorClass = 'bg-[#7c3aed]' }) {
  return (
    <div className="w-full h-2 rounded-full bg-[#1f2235] overflow-hidden">
      <div className={`h-full ${colorClass} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  );
}
function SectionTitle({ children, sub }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold text-white">{children}</h1>
      {sub && <p className="text-[#94a3b8] text-sm mt-1">{sub}</p>}
    </div>
  );
}

/* ---------------- Section panels ---------------- */
function IdentityPanel({ user }) {
  const email = user?.email || 'nicat.aliyev@example.com';
  const initial = email.charAt(0).toUpperCase();
  return (
    <div>
      <SectionTitle sub="Hesabına ümumi baxış">Xoş gəldin, {MOCK.name.split(' ')[0]}</SectionTitle>
      <Card className="flex items-center gap-5 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center text-2xl font-extrabold text-white flex-shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <div className="text-lg font-bold text-white truncate">{MOCK.name}</div>
          <div className="text-sm text-[#94a3b8] truncate">{email}</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] font-bold uppercase tracking-wide bg-[#fbbf24] text-black px-2.5 py-1 rounded-full">{MOCK.plan}</span>
            <span className="text-xs text-[#64748b]">Üzv: {MOCK.memberSince}</span>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {MOCK.stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <Card>
        <div className="text-sm font-bold text-white mb-4">Son fəaliyyət</div>
        <ul className="space-y-3">
          {MOCK.activity.map((a, i) => (
            <li key={i} className="flex gap-3 text-sm text-[#94a3b8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1.5 flex-shrink-0" />
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
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-2">Haqqımda</div>
        <p className="text-sm text-[#94a3b8] leading-relaxed">{MOCK.bio}</p>
        <div className="text-xs text-[#64748b] mt-4">📍 {MOCK.location}</div>
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-3">Bacarıqlar</div>
        <div className="flex flex-wrap gap-2">
          {MOCK.skills.map((s) => (
            <span key={s} className="text-xs font-semibold bg-[#1a1d2c] border border-[#1f2235] text-white px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-3">Bağlantılar</div>
        <div className="flex flex-wrap gap-3">
          {MOCK.links.map((l) => (
            <a key={l.label} href={l.href} className="text-xs font-semibold text-[#8b5cf6] hover:text-[#a78bfa] border border-[#1f2235] px-3 py-1.5 rounded-full">{l.label} ↗</a>
          ))}
        </div>
      </Card>
      <button className="bg-[#7c3aed] hover:bg-[#8b5cf6] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors">Profili Düzəlt</button>
    </div>
  );
}

function AcademicPanel() {
  return (
    <div>
      <SectionTitle sub="Kurslar, nailiyyət balı və sertifikatlar">Akademik Göstəricilər</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Nailiyyət balı" value={`${MOCK.gpa}/100`} />
        <StatCard label="Öyrənmə saatı" value={`${MOCK.learningHours} saat`} />
        <StatCard label="Sertifikat" value={MOCK.certificates.length} />
      </div>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-4">Kurslar</div>
        <div className="space-y-5">
          {MOCK.courses.map((c) => (
            <div key={c.title}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-white font-medium">{c.title}</span>
                <span className={c.done ? 'text-[#10b981]' : 'text-[#94a3b8]'}>{c.progress}%</span>
              </div>
              <ProgressBar value={c.progress} colorClass={c.done ? 'bg-[#10b981]' : 'bg-[#7c3aed]'} />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="text-sm font-bold text-white mb-4">Sertifikatlar</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {MOCK.certificates.map((c) => (
            <div key={c} className="flex items-center gap-3 bg-[#1a1d2c] border border-[#1f2235] rounded-xl p-4">
              <span className="text-xl">🎓</span>
              <span className="text-sm text-white font-medium">{c}</span>
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
      <Card className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white font-medium">CV tamamlanma dərəcəsi</span>
          <span className="text-[#fbbf24] font-bold">{MOCK.cvCompletion}%</span>
        </div>
        <ProgressBar value={MOCK.cvCompletion} colorClass="bg-[#fbbf24]" />
        <button className="mt-4 text-sm font-bold text-[#8b5cf6] hover:text-[#a78bfa]">CV-ni redaktə et →</button>
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-4">Portfolio Layihələri</div>
        <div className="grid sm:grid-cols-3 gap-4">
          {MOCK.portfolio.map((p) => (
            <div key={p.title} className="bg-[#1a1d2c] border border-[#1f2235] rounded-xl p-4">
              <div className="text-sm font-bold text-white mb-2">{p.title}</div>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => <span key={t} className="text-[10px] bg-[#131520] text-[#94a3b8] px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-4">Sənə Uyğun İş Elanları</div>
        <div className="space-y-3">
          {MOCK.jobMatches.map((j) => (
            <div key={j.title} className="flex items-center justify-between bg-[#1a1d2c] border border-[#1f2235] rounded-xl p-4">
              <div>
                <div className="text-sm font-bold text-white">{j.title}</div>
                <div className="text-xs text-[#94a3b8]">{j.company}</div>
              </div>
              <span className="text-xs font-bold text-[#10b981]">{j.match}% uyğunluq</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white font-medium">Müsahibəyə hazırlıq</span>
          <span className="text-[#94a3b8]">{MOCK.interviewProgress.done}/{MOCK.interviewProgress.total} simulyasiya</span>
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
      <Card className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs text-[#94a3b8] uppercase tracking-wide mb-1">Cari balans</div>
          <div className="text-3xl font-extrabold text-white">{MOCK.balance}</div>
        </div>
        <button className="bg-[#7c3aed] hover:bg-[#8b5cf6] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors">Balansı artır</button>
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-4">Ödəniş üsulu</div>
        <div className="flex items-center gap-3 bg-[#1a1d2c] border border-[#1f2235] rounded-xl p-4 w-fit">
          <span className="text-lg">💳</span>
          <span className="text-sm text-white">•••• •••• •••• 4242</span>
        </div>
      </Card>
      <Card>
        <div className="text-sm font-bold text-white mb-4">Əməliyyatlar</div>
        <div className="divide-y divide-[#1f2235]">
          {MOCK.transactions.map((t, i) => (
            <div key={i} className="flex items-center justify-between py-3 text-sm">
              <div>
                <div className="text-white">{t.desc}</div>
                <div className="text-xs text-[#64748b] mt-0.5">{t.date}</div>
              </div>
              <span className={`font-bold ${t.amount.startsWith('+') ? 'text-[#10b981]' : 'text-[#f43f5e]'}`}>{t.amount}</span>
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
      <Card className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white font-bold">Səviyyə {MOCK.level}</span>
          <span className="text-[#94a3b8]">{MOCK.xp.current} / {MOCK.xp.max} XP</span>
        </div>
        <ProgressBar value={(MOCK.xp.current / MOCK.xp.max) * 100} colorClass="bg-[#fbbf24]" />
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-4">Nişanlar</div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {MOCK.badges.map((b) => (
            <div key={b.label} className={`text-center p-3 rounded-xl border ${b.earned ? 'border-[#7c3aed]/40 bg-[#7c3aed]/10' : 'border-[#1f2235] bg-[#1a1d2c] opacity-40'}`}>
              <div className="text-2xl mb-1">{b.earned ? '🏆' : '🔒'}</div>
              <div className="text-[10px] text-white leading-tight">{b.label}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="text-sm font-bold text-white mb-4">Liderlik Cədvəli</div>
        <div className="space-y-2">
          {MOCK.leaderboard.map((p, i) => (
            <div key={p.name} className={`flex items-center justify-between px-4 py-3 rounded-xl ${p.isMe ? 'bg-[#7c3aed]/15 border border-[#7c3aed]/40' : 'bg-[#1a1d2c]'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#64748b] w-4">{i + 1}</span>
                <span className={`text-sm ${p.isMe ? 'text-white font-bold' : 'text-[#94a3b8]'}`}>{p.name}</span>
              </div>
              <span className="text-xs font-bold text-[#fbbf24]">{p.xp} XP</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Toggle({ label, defaultChecked }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-white">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[#7c3aed]' : 'bg-[#1f2235]'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${on ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

function SettingsPanel({ user }) {
  return (
    <div>
      <SectionTitle sub="Hesab, şifrə və bildiriş tənzimləmələri">Tənzimləmələr və Təhlükəsizlik</SectionTitle>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-4">Hesab məlumatları</div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#94a3b8] mb-1 block">Ad Soyad</label>
            <input defaultValue={MOCK.name} className="w-full bg-[#090a0f] border border-[#1f2235] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8b5cf6]" />
          </div>
          <div>
            <label className="text-xs text-[#94a3b8] mb-1 block">Email</label>
            <input defaultValue={user?.email || ''} className="w-full bg-[#090a0f] border border-[#1f2235] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8b5cf6]" />
          </div>
        </div>
        <button className="mt-4 bg-[#7c3aed] hover:bg-[#8b5cf6] text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">Yadda saxla</button>
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-4">Şifrəni dəyiş</div>
        <div className="space-y-3">
          <input type="password" placeholder="Yeni şifrə" className="w-full bg-[#090a0f] border border-[#1f2235] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8b5cf6]" />
          <input type="password" placeholder="Yeni şifrəni təsdiqlə" className="w-full bg-[#090a0f] border border-[#1f2235] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#8b5cf6]" />
        </div>
        <button className="mt-4 bg-[#1a1d2c] border border-[#1f2235] hover:border-[#8b5cf6] text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">Şifrəni yenilə</button>
      </Card>
      <Card className="mb-6">
        <div className="text-sm font-bold text-white mb-2">Bildirişlər</div>
        <div className="divide-y divide-[#1f2235]">
          <Toggle label="Email bildirişləri" defaultChecked={true} />
          <Toggle label="Push bildirişləri" defaultChecked={false} />
          <Toggle label="Marketinq mesajları" defaultChecked={false} />
        </div>
      </Card>
      <Card className="border-[#f43f5e]/30">
        <div className="text-sm font-bold text-[#f43f5e] mb-2">Təhlükəli zona</div>
        <p className="text-xs text-[#94a3b8] mb-4">Hesabını sildikdə bütün məlumatların həmişəlik silinir. Bu addım geri qaytarıla bilməz.</p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-transparent border border-[#f43f5e]/50 text-[#f43f5e] hover:bg-[#f43f5e]/10 text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
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
      <div className="min-h-[calc(100vh-76px)] bg-[#090a0f] flex items-center justify-center">
        <p className="text-[#94a3b8]">Yüklənir...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-76px)] bg-[#090a0f] flex items-center justify-center px-6">
        <div className="bg-[#131520] border border-[#7c3aed]/30 rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-xl font-extrabold text-white mb-2">Panelə baxmaq üçün daxil ol</h1>
          <p className="text-sm text-[#94a3b8] mb-6">Bu səhifə yalnız giriş etmiş istifadəçilər üçündür.</p>
          <Link href="/giris" className="block bg-[#7c3aed] hover:bg-[#8b5cf6] text-white font-bold py-3 rounded-lg transition-colors">Giriş et</Link>
          <div className="text-xs text-[#94a3b8] mt-4">Hesabın yoxdur? <Link href="/qeydiyyat" className="text-[#8b5cf6] font-semibold">Qeydiyyatdan keç</Link></div>
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
    <div className="min-h-[calc(100vh-76px)] bg-[#090a0f] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-72 flex-shrink-0 border-b md:border-b-0 md:border-r border-[#1f2235] flex flex-col md:h-[calc(100vh-76px)] md:sticky md:top-[76px]">
        <div className="px-5 py-5 border-b border-[#1f2235] hidden md:block">
          <div className="flex items-center gap-2">
            <img src="/mlue-icon.png" alt="" className="h-7 w-auto" />
            <img src="/mlue-wordmark.png" alt="Mlue" className="h-3 w-auto" />
            <span className="text-[#94a3b8] font-medium text-xs ml-1">Panel</span>
          </div>
        <nav className="flex-1 flex flex-row md:flex-col-reverse gap-1.5 p-3 overflow-x-auto md:overflow-visible">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
                  ${isActive
                    ? 'bg-[#7c3aed]/15 text-white border border-[#7c3aed]/40'
                    : 'text-[#94a3b8] border border-transparent hover:bg-[#131520] hover:text-white'}`}
              >
                {item.icon(`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#8b5cf6]' : ''}`)}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl">
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
