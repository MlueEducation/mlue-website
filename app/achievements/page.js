'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import AchievementsPanel from '@/components/panels/AchievementsPanel';

export default function AchievementsPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center px-6">
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm rounded-2xl p-10 max-w-sm w-full text-center">
          <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">Nailiyyətlərinə baxmaq üçün daxil ol</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Bu səhifə yalnız giriş etmiş istifadəçilər üçündür.</p>
          <Link href="/giris" className="block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-lg transition-colors">Giriş et</Link>
          <div className="text-xs text-[var(--text-secondary)] mt-4">Hesabın yoxdur? <Link href="/qeydiyyat" className="text-[var(--accent)] font-semibold">Qeydiyyatdan keç</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)]">
      <div className="max-w-3xl mx-auto px-5 md:px-10 py-8 md:py-12">
        <AchievementsPanel user={user} />
      </div>
    </div>
  );
}
