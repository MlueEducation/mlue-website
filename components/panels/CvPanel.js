'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { resolveDisplayName } from '@/lib/displayName';
import { Download, Flame, Award, Rocket, MessageCircle, Briefcase } from 'lucide-react';

const LEVEL_XP_STEP = 500;
const EARLY_ADOPTER_CUTOFF = new Date('2027-01-01');

/* Same 6 badges / same earned-logic as components/panels/AchievementsPanel.js
   — a CV should show the exact medals the user already sees there, not a
   second, potentially-drifting definition of "earned". */
function computeBadges({ certCount, portfolioCount, streak, createdAt }) {
  return [
    { key: 'streak-7', label: '7 Günlük Seriya', icon: Flame, earned: streak >= 7 },
    { key: 'first-cert', label: 'İlk Sertifikat', icon: Award, earned: certCount >= 1 },
    { key: 'early', label: 'Erkən Qoşulan', icon: Rocket, earned: new Date(createdAt) < EARLY_ADOPTER_CUTOFF },
    { key: 'streak-30', label: '30 Günlük Seriya', icon: Flame, earned: streak >= 30 },
    { key: 'mentor-review', label: 'Mentor Rəyi', icon: MessageCircle, earned: false },
    { key: 'portfolio-master', label: 'Portfolio Ustası', icon: Briefcase, earned: portfolioCount >= 5 },
  ].filter((b) => b.earned);
}

export default function CvPanel({ user }) {
  const [profile, setProfile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  function refresh() {
    setLoadError(null);
    setLoading(true);
    Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase.from('certificates').select('*').eq('user_id', user.id).order('issue_date', { ascending: false }),
      supabase.from('portfolio_projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    ]).then(([{ data: profileData }, { data: certData }, { data: portfolioData }]) => {
      setProfile(profileData);
      setCertificates(certData || []);
      setPortfolio(portfolioData || []);
      setLoading(false);
    }).catch((err) => {
      setLoadError(err.message);
      setLoading(false);
    });
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  if (loading) {
    return <p className="text-sm text-[var(--text-secondary)] text-center py-16">CV hazırlanır...</p>;
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-between gap-3 bg-[var(--danger-10)] border border-[var(--danger)]/20 rounded-xl px-4 py-3">
        <p className="text-sm text-[var(--danger)]">CV hazırlanarkən xəta baş verdi: {loadError}</p>
        <button type="button" onClick={refresh} className="text-xs font-bold text-[var(--danger)] underline flex-shrink-0">Yenidən cəhd et</button>
      </div>
    );
  }

  const name = resolveDisplayName({ profile, user, fallback: 'MLUE İstifadəçisi' });
  const initial = name.charAt(0).toUpperCase();
  const skills = profile?.skills || [];
  const xp = profile?.xp_points || 0;
  const level = Math.floor(xp / LEVEL_XP_STEP) + 1;
  const streak = profile?.current_streak || 0;
  const badges = computeBadges({ certCount: certificates.length, portfolioCount: portfolio.length, streak, createdAt: user.created_at });

  const socials = [
    profile?.linkedin_url && { url: profile.linkedin_url, label: 'LinkedIn' },
    profile?.facebook_url && { url: profile.facebook_url, label: 'Facebook' },
    profile?.instagram_url && { url: profile.instagram_url, label: 'Instagram' },
  ].filter(Boolean);

  return (
    <div>
      <div className="no-print flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <Link href="/profil?tab=career" className="text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)]">← Karyera Mərkəzinə qayıt</Link>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2">CV-n</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">MLUE-dəki nailiyyətlərindən avtomatik hazırlanıb. PDF kimi yükləmək üçün "Yüklə" düyməsinə bas — açılan çap pəncərəsində "Save as PDF" seçimini et.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <Download className="w-4 h-4" /> PDF Yüklə
        </button>
      </div>

      <div className="cv-document bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm p-8 md:p-12 max-w-[820px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-5 pb-6 border-b border-[var(--border)]">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt={name} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0">
              {initial}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] truncate">{name}</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {[profile?.major, profile?.university].filter(Boolean).join(' · ') || 'MLUE tələbəsi'}
            </p>
            {socials.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                {socials.map(({ url, label }) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {profile?.bio && (
          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-2">Haqqımda</h3>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-2">Bacarıqlar</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="text-xs font-medium bg-[var(--accent-soft)] text-[var(--accent)] px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-2">Portfolio Layihələri</h3>
          {portfolio.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)]">Hələ layihə əlavə edilməyib.</p>
          ) : (
            <div className="space-y-3">
              {portfolio.map((p) => (
                <div key={p.id}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[var(--text-primary)]">{p.title}</span>
                    {p.link_url && (
                      <a href={p.link_url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[var(--accent)] shrink-0">Baxış →</a>
                    )}
                  </div>
                  {p.description && <p className="text-sm text-[var(--text-secondary)] mt-0.5">{p.description}</p>}
                  {(p.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {p.tags.map((t) => <span key={t} className="text-[10px] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certificates */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-2">Sertifikatlar</h3>
          {certificates.length === 0 ? (
            <p className="text-sm text-[var(--text-tertiary)]">Hələ sertifikat qazanılmayıb.</p>
          ) : (
            <ul className="space-y-1.5">
              {certificates.map((c) => (
                <li key={c.id} className="text-sm text-[var(--text-primary)] flex items-center justify-between gap-2">
                  <span>🎓 {c.course_name}</span>
                  <span className="text-xs text-[var(--text-tertiary)] shrink-0">{new Date(c.issue_date).toLocaleDateString('az-AZ')}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* MLUE stats + badges */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-2">MLUE Nailiyyətləri</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[var(--text-primary)] mb-3">
            <span className="font-bold whitespace-nowrap">Səviyyə {level}</span>
            <span className="text-[var(--text-tertiary)] hidden sm:inline">·</span>
            <span className="whitespace-nowrap">{xp} XP</span>
            {streak > 0 && (
              <>
                <span className="text-[var(--text-tertiary)] hidden sm:inline">·</span>
                <span className="whitespace-nowrap">{streak} günlük seriya</span>
              </>
            )}
          </div>
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b.key} className="flex items-center gap-1.5 text-xs font-semibold bg-[var(--warm-soft)] text-[var(--accent-warm)] px-2.5 py-1.5 rounded-full">
                  <b.icon className="w-3.5 h-3.5" /> {b.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
