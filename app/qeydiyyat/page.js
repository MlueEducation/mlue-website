'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import GoogleIcon from '@/components/GoogleIcon';

export default function QeydiyyatPage() {
  const router = useRouter();
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogle() {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/profil` },
    });
    if (error) {
      setGoogleLoading(false);
      setMsg({ text: error.message, type: 'error' });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      setMsg({ text: error.message, type: 'error' });
      return;
    }
    if (data.user && !data.session) {
      setMsg({ text: 'Hesabın yaradıldı! Təsdiqləmək üçün email-ini yoxla.', type: 'success' });
      setDone(true);
    } else {
      setMsg({ text: 'Xoş gəldin! Səni tanıyaq...', type: 'success' });
      setTimeout(() => router.push('/onboarding'), 600);
    }
  }

  return (
    <section className="auth-page">
      <div className="orb"></div>
      <div className="auth-card">
        <h1>Hesab yarat</h1>
        <p className="auth-sub">Bir neçə saniyəyə Mlue-yə qoşul.</p>
        {!done && (
          <>
          <button type="button" className="oauth-btn" onClick={handleGoogle} disabled={googleLoading}>
            <GoogleIcon />
            {googleLoading ? 'Yönləndirilir...' : 'Google ilə davam et'}
          </button>
          <div className="auth-divider"><span>və ya e-poçt ilə</span></div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Ad Soyad" required />
            <input type="email" name="email" placeholder="Email ünvanın" required />
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Şifrə (min. 6 simvol)"
                minLength={6}
                required
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Şifrəni gizlət' : 'Şifrəni göstər'}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPass ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.8 9.8 0 0 1 12 5c5 0 9 4 10 7-.4 1.2-1.2 2.5-2.3 3.6M6.2 6.6C4.1 8 2.6 10 2 12c1 3 5 7 10 7 1.3 0 2.5-.2 3.6-.7" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Yaradılır...' : 'Hesab yarat'}
            </button>
          </form>
          </>
        )}
        {msg.text && <div className={`form-msg show ${msg.type}`}>{msg.text}</div>}
        <div className="auth-switch">Artıq hesabın var? <Link href="/giris">Daxil ol</Link></div>
      </div>
    </section>
  );
}
