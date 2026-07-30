'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const RECOVERY_WINDOW_DAYS = 30;

export default function AccountRecoveryModal({ open, profile, onResolved }) {
  const [restoring, setRestoring] = useState(false);
  const [error, setError] = useState(null);

  if (!open || !profile?.deleted_at) return <div className="mlue-modal-backdrop" />;

  const daysSinceDeleted = (Date.now() - new Date(profile.deleted_at).getTime()) / 86400000;
  const withinWindow = daysSinceDeleted <= RECOVERY_WINDOW_DAYS;
  const daysLeft = Math.max(0, Math.ceil(RECOVERY_WINDOW_DAYS - daysSinceDeleted));

  async function handleRestore() {
    setRestoring(true);
    setError(null);
    const { error: err } = await supabase.from('profiles').upsert({ id: profile.id, deleted_at: null });
    setRestoring(false);
    if (err) {
      setError(err.message);
      return;
    }
    onResolved?.();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <>
      <div className="mlue-modal-backdrop open" />
      <div className="mlue-modal-panel open" role="dialog" aria-modal="true">
        {withinWindow ? (
          <>
            <div className="text-3xl mb-3">🥶</div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">
              Hesabınız dondurulub. 30 gün bitməyib. Bərpa etmək istəyirsiniz?
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Qalan bərpa müddəti: <b>{daysLeft} gün</b>. Bərpa etsən, XP-n, sertifikatların və kurs qeydiyyatların olduğu kimi geri qayıdacaq.
            </p>
            {error && <p className="text-xs text-[var(--danger)] mb-3">{error}</p>}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRestore}
                disabled={restoring}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {restoring ? 'Bərpa olunur...' : 'Hesabı Bərpa Et'}
              </button>
              <button type="button" onClick={handleSignOut} className="w-full text-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Yox, çıxış et
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-3xl mb-3">⏳</div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">30 günlük bərpa müddəti bitib</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Hesabınız hazırda deaktiv statusdadır. Bərpa etmək və ya məlumatlarınızın tam silinməsini tələb etmək üçün dəstək komandası ilə əlaqə saxlayın:{' '}
              <a href="mailto:support@mlue.az" className="text-[var(--accent)] font-semibold">support@mlue.az</a>
            </p>
            {error && <p className="text-xs text-[var(--danger)] mb-3">{error}</p>}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRestore}
                disabled={restoring}
                className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] hover:border-[var(--border-strong)] disabled:opacity-60 text-[var(--text-primary)] font-bold py-3 rounded-xl transition-colors"
              >
                {restoring ? 'Bərpa olunur...' : 'Yenə də bərpa et (istisna)'}
              </button>
              <button type="button" onClick={handleSignOut} className="w-full text-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Çıxış et
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
