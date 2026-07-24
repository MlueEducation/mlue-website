'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import ThemeToggle from './ThemeToggle';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { href: '/platforma', label: 'Platforma' },
  { href: '/nece-isleyir', label: 'Necə işləyir' },
  { href: '/qiymetler', label: 'Qiymətlər' },
  { href: '/terefdasliq', label: 'Tərəfdaşlıq' },
  { href: '/haqqimizda', label: 'Haqqımızda' },
];

function AuthArea({ onNavigate }) {
  const { user } = useAuth();
  if (user) {
    const initial = user.email.charAt(0).toUpperCase();
    return (
      <Link href="/profil" className="profile-pill" onClick={onNavigate}>
        <span className="profile-avatar">{initial}</span>
        <span className="profile-email">{user.email}</span>
      </Link>
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
        </div>
        <div className="nav-right">
          <ThemeToggle />
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
        </div>
        <div className="nav-overlay-auth"><AuthArea onNavigate={() => setOpen(false)} /></div>
      </div>
    </header>
  );
}
