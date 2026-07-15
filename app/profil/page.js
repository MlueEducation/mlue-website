'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

export default function ProfilPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <section className="auth-page">
        <p style={{ color: 'var(--text-muted)' }}>Yüklənir...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <h1>Profilinə baxmaq üçün daxil ol</h1>
          <p className="auth-sub">Bu səhifə yalnız giriş etmiş istifadəçilər üçündür.</p>
          <Link href="/giris" className="btn-primary" style={{ width: '100%' }}>Giriş et</Link>
          <div className="auth-switch">Hesabın yoxdur? <Link href="/qeydiyyat">Qeydiyyatdan keç</Link></div>
        </div>
      </section>
    );
  }

  const initial = user.email.charAt(0).toUpperCase();
  const joined = new Date(user.created_at).toLocaleDateString('az-AZ', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <section className="auth-page">
      <div className="profile-page-card">
        <div className="profile-page-header">
          <div className="profile-avatar-lg">{initial}</div>
          <div>
            <div className="profile-page-name">{user.email}</div>
            <div className="profile-page-joined">Qeydiyyat tarixi: {joined}</div>
          </div>
        </div>
        <div className="profile-placeholder">🎓 Kurslarım, tərəqqim və sertifikatlarım tezliklə burada görünəcək.</div>
        <button className="btn-secondary" style={{ width: '100%' }} onClick={() => supabase.auth.signOut()}>
          Çıxış
        </button>
      </div>
    </section>
  );
}
