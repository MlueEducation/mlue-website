'use client';

import { useState } from 'react';
import { openMysteryBox } from '@/lib/gamification';

const REWARD_COPY = {
  xp: (amount) => ({ emoji: '⭐', title: `+${amount} XP qazandın!`, desc: 'Səviyyəni yüksəltmək üçün davam et.' }),
  tokens: (amount) => ({ emoji: '🪙', title: `+${amount} MLUE Token qazandın!`, desc: 'Balansına əlavə olundu.' }),
  streak_freeze: () => ({ emoji: '🧊', title: 'Seriya Dondurma qazandın!', desc: 'Bir gün buraxsan belə seriyanı qoruyacaq.' }),
};

export default function MysteryBoxModal({ open, onClose, onOpened }) {
  const [state, setState] = useState('idle'); // idle | opening | revealed | error
  const [reward, setReward] = useState(null);
  const [error, setError] = useState(null);

  if (!open) return <div className="mlue-modal-backdrop" />;

  async function handleOpen() {
    setState('opening');
    setError(null);
    try {
      const result = await openMysteryBox();
      setReward(result);
      setState('revealed');
      onOpened?.();
    } catch (err) {
      setError(err.message);
      setState('error');
    }
  }

  function handleClose() {
    setState('idle');
    setReward(null);
    setError(null);
    onClose?.();
  }

  const rewardCopy = reward ? REWARD_COPY[reward.reward_type]?.(reward.reward_amount) : null;

  return (
    <>
      <div className="mlue-modal-backdrop open" onClick={handleClose} />
      <div className="mlue-modal-panel open text-center" role="dialog" aria-modal="true">
        {state === 'revealed' && rewardCopy ? (
          <>
            <div className="text-5xl mb-4" style={{ animation: 'mysteryBoxReveal .5s var(--ease)' }}>{rewardCopy.emoji}</div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">{rewardCopy.title}</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">{rewardCopy.desc}</p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-xl transition-colors"
            >
              Əla!
            </button>
          </>
        ) : (
          <>
            <div className={`text-5xl mb-4 ${state === 'opening' ? '' : ''}`} style={state === 'opening' ? { animation: 'mysteryBoxShake .4s ease infinite' } : undefined}>🎁</div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">Mystery Box</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">Daxilində XP, MLUE Token və ya Seriya Dondurma ola bilər. Açmaq istəyirsən?</p>
            {error && <p className="text-xs text-[var(--danger)] mb-3">{error}</p>}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleOpen}
                disabled={state === 'opening'}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {state === 'opening' ? 'Açılır...' : 'Aç'}
              </button>
              <button type="button" onClick={handleClose} className="w-full text-center text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                Bağla
              </button>
            </div>
          </>
        )}
      </div>
      <style jsx global>{`
        @keyframes mysteryBoxReveal {
          from { transform: scale(.4) rotate(-15deg); opacity: 0; }
          to { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes mysteryBoxShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
      `}</style>
    </>
  );
}
