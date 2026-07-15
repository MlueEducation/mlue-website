'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabaseClient';

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

  return (
    <header>
      <nav>
        <Link href="/" className="brand">
          <span className="brand-m">M</span><span className="brand-rest">LUE</span>
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>
        <div className="nav-auth-desktop"><AuthArea /></div>
        <button className="burger" aria-label="Menyu" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <AuthArea onNavigate={() => setOpen(false)} />
      </div>
    </header>
  );
}
