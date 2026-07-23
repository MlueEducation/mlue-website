'use client';

/*
 * Sign-Up + Onboarding + Gamification-reveal demo.
 * Not linked from site nav. The "Google ilə davam et" button is wired to
 * real Supabase OAuth; the rest of the flow (magic-link, role/interest
 * picker, trophy reveal) is still local mock state, not persisted.
 * Styled with the site's current design tokens (app/globals.css), forced
 * into dark mode via the outer data-theme="dark" wrapper.
 */

import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Trophy, Check, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { getSiteOrigin } from '@/lib/siteUrl';
import GoogleIcon from '@/components/GoogleIcon';

const ROLES = [
  { id: 'student', label: 'Tələbə', icon: '🎓' },
  { id: 'developer', label: 'Proqramçı', icon: '💻' },
  { id: 'designer', label: 'Dizayner', icon: '🎨' },
  { id: 'entrepreneur', label: 'Sahibkar', icon: '🚀' },
  { id: 'freelancer', label: 'Freelancer', icon: '💼' },
];

const INTERESTS = [
  'Proqramlaşdırma',
  'UI/UX Dizayn',
  'Sahibkarlıq',
  'Süni İntellekt',
  'Rəqəmsal Marketinq',
];

const DAILY_TARGETS = [
  { id: '15', label: '15 dəq / gün', desc: 'Tövsiyə olunan' },
  { id: '30', label: '30 dəq / gün' },
  { id: '60', label: '1 saat / gün' },
];

const STEP_LABELS = { 2: '2 / 3', 3: '3 / 3' };

export default function OnboardingDemoPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [role, setRole] = useState(null);
  const [interests, setInterests] = useState([]);
  const [dailyTarget, setDailyTarget] = useState('15');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogle() {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${getSiteOrigin()}/profil` },
    });
    if (error) setGoogleLoading(false);
  }

  function toggleInterest(i) {
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  }

  function handleMagicLink(e) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep(2);
    }, 700);
  }

  function handleFinish() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 900);
  }

  return (
    <div data-theme="dark" className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md">
        {step > 1 && !done && (
          <div className="mb-6 flex items-center justify-center gap-2">
            {[2, 3].map((s) => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${step >= s ? 'w-8 bg-[var(--accent)]' : 'w-4 bg-[var(--border)]'}`} />
            ))}
            <span className="ml-2 text-xs font-semibold text-[var(--text-tertiary)]">{STEP_LABELS[step]}</span>
          </div>
        )}

        {step === 1 && (
          <div className="bg-[var(--bg-surface)] border border-[var(--accent-soft)] rounded-2xl shadow-lg p-8">
            <div className="text-center mb-7">
              <div className="text-3xl font-extrabold mb-1.5">
                <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-warm)] bg-clip-text text-transparent">MLUE</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">Gələcəyin Təhsilinə İlk Addım</p>
            </div>

            <div className="mb-5">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 bg-[var(--bg-surface-2)] hover:bg-[var(--border)] disabled:opacity-60 border border-[var(--border)] rounded-xl py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors"
              >
                <GoogleIcon /> {googleLoading ? 'Yönləndirilir...' : 'Google ilə davam et'}
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-xs text-[var(--text-tertiary)]">və ya e-poçt ilə</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>

            <form onSubmit={handleMagicLink} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@nümunə.az"
                  className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_20px_var(--accent-soft)]"
              >
                {sending ? 'Göndərilir...' : 'Sehrli Link Göndər 🚀'}
              </button>
            </form>

            <p className="text-xs text-[var(--text-tertiary)] text-center mt-5 leading-relaxed">
              Qeydiyyatdan keçməklə İstifadə Şərtlərini qəbul edirsiniz.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-lg p-8">
            <div className="text-center mb-7">
              <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-1.5">MLUE-yə Xoş Gəldiniz! 🎯</h1>
              <p className="text-sm text-[var(--text-secondary)]">Profilinizi fərdiləşdirin və sizə uyğun məzmunları seçin.</p>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-3">Sən kimsən?</div>
              <div className="grid grid-cols-2 gap-2.5">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border py-4 text-sm font-semibold transition-all ${
                      role === r.id
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                        : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span className="text-xl">{r.icon}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-7">
              <div className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-3">Maraqların (bir neçəsini seç)</div>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => {
                  const active = interests.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleInterest(i)}
                      className={`inline-flex items-center px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
                        active
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                          : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 mr-1" />}
                      {i}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <ArrowLeft className="w-4 h-4" /> Geri
              </button>
              <button
                type="button"
                disabled={!role}
                onClick={() => setStep(3)}
                className="flex-1 flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
              >
                Davam Et <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && !done && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-lg p-8">
            <div className="text-center mb-7">
              <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-1.5">İlkin Məqsəd və İlk Trofeyiniz! 🏆</h1>
              <p className="text-sm text-[var(--text-secondary)]">Gündəlik hədəfini seç, öyrənməyə davamlı get.</p>
            </div>

            <div className="space-y-2.5 mb-6">
              {DAILY_TARGETS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setDailyTarget(t.id)}
                  className={`w-full flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all ${
                    dailyTarget === t.id ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">{t.label}</div>
                    {t.desc && <div className="text-xs text-[var(--accent-warm)] font-semibold mt-0.5">{t.desc}</div>}
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${dailyTarget === t.id ? 'border-[var(--accent)]' : 'border-[var(--border-strong)]'}`}>
                    {dailyTarget === t.id && <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--accent-warm)] bg-[var(--warm-soft)] p-5 mb-7">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-warm)] flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_var(--warm-soft)]">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[var(--text-primary)]">"İlkin Addım" Trofeyi</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">MLUE ekosisteminə qoşulduğunuz üçün verilən xüsusi start nişanı.</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              {submitting ? 'Hazırlanır...' : (
                <>
                  Platformaya Daxil Ol və Başla <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {done && (
          <div className="bg-[var(--bg-surface)] border border-[var(--success)] rounded-2xl shadow-lg p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--success-soft)] flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-[var(--success)]" />
            </div>
            <h1 className="text-xl font-extrabold text-[var(--text-primary)] mb-2">Tamamlandı!</h1>
            <p className="text-sm text-[var(--text-secondary)]">Bu, statik bir demo axınıdır — real hesab yaradılmadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
