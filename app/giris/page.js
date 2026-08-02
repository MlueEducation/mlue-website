'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { getSiteOrigin } from '@/lib/siteUrl';
import { friendlyErrorMessage } from '@/lib/friendlyError';
import GoogleIcon from '@/components/GoogleIcon';
import AccountRecoveryModal from '@/components/AccountRecoveryModal';

export default function GirisPage() {
  const router = useRouter();
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [pendingRecovery, setPendingRecovery] = useState(null);

  async function handleGoogle() {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${getSiteOrigin()}/profil` },
    });
    if (error) {
      setGoogleLoading(false);
      setMsg({ text: friendlyErrorMessage(error, 'Google ilə giriş alınmadı.'), type: 'error' });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      setMsg({ text: friendlyErrorMessage(error, 'Daxil olmaq alınmadı.'), type: 'error' });
      return;
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, deleted_at')
      .eq('id', data.user.id)
      .maybeSingle();
    setLoading(false);

    if (profileError) {
      // A transient lookup failure isn't proof this is a brand-new user —
      // routing to /onboarding here would wrongly restart onboarding for a
      // returning user. /profil is always safe: it handles a still-missing
      // profile with its own conditional banner, not a misroute.
      console.error('Profil sorğusu uğursuz oldu:', profileError.message);
      setMsg({ text: 'Daxil oldun! Yönləndirilirsən...', type: 'success' });
      setTimeout(() => router.push('/profil'), 600);
      return;
    }

    if (profile?.deleted_at) {
      setPendingRecovery(profile);
      return;
    }

    setMsg({ text: 'Daxil oldun! Yönləndirilirsən...', type: 'success' });
    const destination = profile ? '/profil' : '/onboarding';
    setTimeout(() => router.push(destination), 600);
  }

  return (
    <section className="auth-page">
      <div className="orb"></div>
      <div className="auth-card">
        <h1>Xoş gəldin</h1>
        <p className="auth-sub">Hesabına daxil ol və öyrənməyə davam et.</p>
        <button type="button" className="oauth-btn" onClick={handleGoogle} disabled={googleLoading}>
          <GoogleIcon />
          {googleLoading ? 'Yönləndirilir...' : 'Google ilə davam et'}
        </button>
        <div className="auth-divider"><span>və ya e-poçt ilə</span></div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email ünvanın" required />
          <input type="password" name="password" placeholder="Şifrə" required />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Yoxlanılır...' : 'Daxil ol'}
          </button>
        </form>
        {msg.text && <div className={`form-msg show ${msg.type}`}>{msg.text}</div>}
        <div className="auth-switch">Hesabın yoxdur? <Link href="/qeydiyyat">Qeydiyyatdan keç</Link></div>
      </div>
      <AccountRecoveryModal
        open={!!pendingRecovery}
        profile={pendingRecovery}
        onResolved={() => router.push('/profil')}
      />
    </section>
  );
}
