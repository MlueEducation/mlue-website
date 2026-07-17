'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';
import { supabase } from '@/lib/supabaseClient';

const NAV_LINKS = [
  { href: '/platforma', label: 'Platforma' },
  { href: '/nece-isleyir', label: 'Necə işləyir' },
  { href: '/qiymetler', label: 'Qiymətlər' },
  { href: '/terefdasliq', label: 'Tərəfdaşlıq' },
  { href: '/haqqimizda', label: 'Haqqımızda' },
];

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label="Tema dəyiş"
      title={theme === 'dark' ? 'Açıq rejimə keç' : 'Tünd rejimə keç'}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

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

  return (
    <header>
      <nav>
        <Link href="/" className="brand">
          <img src="/mlue-icon.png" alt="" className="brand-icon" />
          <img src="/mlue-wordmark.png" alt="Mlue" className="brand-word-img" />
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>
        <div className="nav-auth-desktop">
          <ThemeToggle />
          <AuthArea />
        </div>
        <button className="burger" aria-label="Menyu" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <div className="theme-toggle-row">
          <span>Görünüş</span>
          <ThemeToggle />
        </div>
        <AuthArea onNavigate={() => setOpen(false)} />
      </div>
    </header>
  );
}
