'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function QeydiyyatPage() {
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setMsg({ text: error.message, type: 'error' });
      return;
    }
    if (data.user && !data.session) {
      setMsg({ text: 'Hesabın yaradıldı! Təsdiqləmək üçün email-ini yoxla.', type: 'success' });
      setDone(true);
    } else {
      setMsg({ text: 'Xoş gəldin, hesabın hazırdır!', type: 'success' });
      setDone(true);
    }
  }

  return (
    <section className="auth-page">
      <div className="orb"></div>
      <div className="auth-card">
        <h1>Hesab yarat</h1>
        <p className="auth-sub">Bir neçə saniyəyə Mlue-yə qoşul.</p>
        {!done && (
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email ünvanın" required />
            <input type="password" name="password" placeholder="Şifrə (min. 6 simvol)" minLength={6} required />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Yaradılır...' : 'Hesab yarat'}
            </button>
          </form>
        )}
        {msg.text && <div className={`form-msg show ${msg.type}`}>{msg.text}</div>}
        <div className="auth-switch">Artıq hesabın var? <Link href="/giris">Daxil ol</Link></div>
      </div>
    </section>
  );
}
