'use client';

import { useEffect, useState } from 'react';
import { checkStreakStatus, useStreakFreeze, recordDailyActivity } from '@/lib/gamification';

/* Mounted once at the top-level ProfilPage component (regardless of which
   tab is active) — replaces the old client-side read-then-write streak
   effect. Runs once per page load: checks whether yesterday was missed and
   a freeze is available (shows a recovery prompt if so), otherwise records
   today's activity server-side via record_daily_activity(), which is also
   what grants a Mystery Box every 7th consecutive day. */
export default function StreakActivitySync({ onStreakUpdated, onMysteryBoxGranted }) {
  const [prompt, setPrompt] = useState(null); // null | 'at-risk'
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function finishActivity() {
      const result = await recordDailyActivity();
      if (cancelled) return;
      if (result?.current_streak != null) onStreakUpdated?.(result.current_streak);
      if (result?.mystery_box_granted) {
        setToast('Yeni Mystery Box qazandın! Nailiyyətlər bölməsində aç.');
        onMysteryBoxGranted?.();
      }
    }

    async function run() {
      try {
        const status = await checkStreakStatus();
        if (cancelled) return;
        if (status?.streak_at_risk && status?.freeze_available) {
          setPrompt('at-risk');
          return;
        }
        await finishActivity();
      } catch (err) {
        console.error('Seriya sinxronizasiyası uğursuz oldu:', err.message);
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  async function handleUseFreeze() {
    setBusy(true);
    try {
      await useStreakFreeze();
    } catch (err) {
      console.error('Dondurma istifadə olunmadı:', err.message);
    } finally {
      setBusy(false);
      setPrompt(null);
    }
  }

  async function handleSkipFreeze() {
    setPrompt(null);
    try {
      const result = await recordDailyActivity();
      if (result?.current_streak != null) onStreakUpdated?.(result.current_streak);
      if (result?.mystery_box_granted) {
        setToast('Yeni Mystery Box qazandın! Nailiyyətlər bölməsində aç.');
        onMysteryBoxGranted?.();
      }
    } catch (err) {
      console.error('Fəaliyyət qeydə alınmadı:', err.message);
    }
  }

  return (
    <>
      {prompt === 'at-risk' && (
        <>
          <div className="mlue-modal-backdrop open" />
          <div className="mlue-modal-panel open text-center" role="dialog" aria-modal="true">
            <div className="text-4xl mb-3">🥶</div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">Seriyanı itirmisən!</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Dünən aktiv olmamısan. Seriya Dondurmandan istifadə edərək seriyanı qorumaq istəyirsən?
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleUseFreeze}
                disabled={busy}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {busy ? 'İstifadə olunur...' : 'Dondurma istifadə et'}
              </button>
              <button type="button" onClick={handleSkipFreeze} className="w-full text-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Yox, seriyanı sıfırla
              </button>
            </div>
          </div>
        </>
      )}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[302] bg-[var(--bg-surface)] border border-[var(--border)] shadow-[var(--shadow-lg)] rounded-xl px-5 py-4 max-w-xs">
          <p className="text-sm font-semibold text-[var(--text-primary)]">🎁 {toast}</p>
          <button type="button" onClick={() => setToast(null)} className="text-xs font-bold text-[var(--accent)] mt-2">Bağla</button>
        </div>
      )}
    </>
  );
}
