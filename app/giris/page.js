'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function GirisPage() {
  const router = useRouter();
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      setMsg({ text: error.message, type: 'error' });
      return;
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', data.user.id)
      .maybeSingle();
    setLoading(false);
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
    </section>
  );
}
