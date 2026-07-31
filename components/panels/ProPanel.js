'use client';

import { useState } from 'react';
import { Panel, PageHeader } from '@/components/ProfileUI';
import { subscribeToPro, isProActive, PRO_MONTHLY_PRICE } from '@/lib/proSubscription';

const FEATURES = [
  { icon: '🤖', title: 'Limitsiz Meagle', desc: 'AI köməkçidən gündəlik limit olmadan istifadə et' },
  { icon: '💼', title: 'Erkən İş Elanları', desc: 'Yeni mikro-təcrübə elanlarını digərlərindən 48 saat əvvəl gör' },
  { icon: '⚡', title: '1.2x XP', desc: 'Bütün fəaliyyətlərdən qazandığın təcrübə xalı 1.2 dəfə artır' },
  { icon: '👑', title: 'Pro Nişanı', desc: 'Liderlik lövhəsində parlaq Pro nişanı və çərçivə' },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ProPanel({ profile, onProUpdated }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const active = isProActive(profile);
  const nearExpiry = active && new Date(profile.pro_expires_at) - new Date() < 5 * 24 * 60 * 60 * 1000;

  async function handleSubscribe() {
    setSubmitting(true);
    setError(null);
    try {
      const result = await subscribeToPro();
      onProUpdated((p) => (p ? { ...p, is_pro: result.is_pro, pro_expires_at: result.pro_expires_at } : p));
    } catch (err) {
      setError(err.message || 'Abunəlik alınmadı.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader sub="Alət səviyyəli abunəlik — AI, iş elanları və gamification üstünlükləri">MLUE Pro</PageHeader>
      <div className="space-y-5">
        <Panel className="p-6">
          {active ? (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-1">Aktiv</div>
                <div className="text-lg font-extrabold text-[var(--text-primary)]">
                  Bitmə tarixi: {formatDate(profile.pro_expires_at)}
                </div>
              </div>
              {nearExpiry && (
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={submitting}
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
                >
                  {submitting ? 'Emal olunur...' : `Yenilə — ₼${PRO_MONTHLY_PRICE}`}
                </button>
              )}
            </div>
          ) : (
            <div>
              <div className="text-2xl font-extrabold text-[var(--text-primary)] mb-1">₼{PRO_MONTHLY_PRICE}/ay</div>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                Ödəniş balansından çıxılır (əvvəlcə "Ödənişlər" bölməsindən balansı artır).
              </p>
              {error && <p className="text-sm text-[var(--danger)] mb-4">{error}</p>}
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={submitting}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                {submitting ? 'Emal olunur...' : 'Pro-ya keç'}
              </button>
            </div>
          )}
        </Panel>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <Panel key={f.title} className="p-5">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-bold text-[var(--text-primary)] mb-1">{f.title}</div>
              <div className="text-xs text-[var(--text-secondary)]">{f.desc}</div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}
