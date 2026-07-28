'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import { resolveDisplayName } from '@/lib/displayName';
import ThemeToggle from './ThemeToggle';
import BrandLogo from './BrandLogo';
import NewsPulseDot from './NewsPulseDot';
import NotificationBell from './NotificationBell';

function markNewsRead() {
  window.localStorage.setItem('mlue-last-read-news', new Date().toISOString());
}

const NAV_LINKS = [
  { href: '/platforma', label: 'Platforma' },
  { href: '/nece-isleyir', label: 'Necə işləyir' },
  { href: '/qiymetler', label: 'Qiymətlər' },
  { href: '/terefdasliq', label: 'Tərəfdaşlıq' },
  { href: '/haqqimizda', label: 'Haqqımızda' },
];

function AuthArea({ onNavigate }) {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!user) { setProfile(null); return; }
    supabase
      .from('profiles')
      .select('avatar_url, full_name')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data || null));
  }, [user]);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  async function handleSignOut() {
    setOpen(false);
    onNavigate?.();
    await supabase.auth.signOut();
    router.push('/');
  }

  if (user) {
    const displayName = resolveDisplayName({ profile, user });
    const initial = displayName.charAt(0).toUpperCase();
    const pictureUrl = profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="profile-pill"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {pictureUrl ? (
            <img src={pictureUrl} alt="" className="profile-avatar-img" />
          ) : (
            <span className="profile-avatar">{initial}</span>
          )}
          <span className="profile-email">{displayName}</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-[var(--shadow-lg)] overflow-hidden z-50 py-1.5">
            <Link href="/profil" onClick={() => { setOpen(false); onNavigate?.(); }} className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors">
              👤 Profil
            </Link>
            <Link href="/achievements" onClick={() => { setOpen(false); onNavigate?.(); }} className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors">
              🏆 Nailiyyətlər
            </Link>
            <Link href="/profil?tab=settings" onClick={() => { setOpen(false); onNavigate?.(); }} className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors">
              ⚙️ Tənzimləmələr
            </Link>
            <div className="my-1.5 border-t border-[var(--border)]" />
            <button type="button" onClick={handleSignOut} className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm font-semibold text-[var(--danger)] hover:bg-[var(--bg-surface-2)] transition-colors">
              🚪 Çıxış
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="nav-auth-links">
      <Link href="/giris" className="nav-login" onClick={onNavigate}>Giriş</Link>
      <Link href="/qeydiyyat" className="nav-cta" onClick={onNavigate}>Qeydiyyat</Link>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isNewsActive = pathname === '/xeberler';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav>
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <Link
            href="/xeberler"
            className={`relative${isNewsActive ? ' nav-link-active' : ''}`}
            onClick={markNewsRead}
          >
            Xəbərlər
            <NewsPulseDot />
          </Link>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <NotificationBell />
          <div className="nav-auth-desktop"><AuthArea /></div>
          <button className={`burger ${open ? 'open' : ''}`} aria-label="Menyu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`nav-overlay ${open ? 'open' : ''}`}>
        <div className="nav-overlay-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <Link
            href="/xeberler"
            className={`relative${isNewsActive ? ' nav-link-active' : ''}`}
            onClick={() => { markNewsRead(); setOpen(false); }}
          >
            Xəbərlər
            <NewsPulseDot />
          </Link>
        </div>
        <div className="nav-overlay-auth"><AuthArea onNavigate={() => setOpen(false)} /></div>
      </div>
    </header>
  );
}
