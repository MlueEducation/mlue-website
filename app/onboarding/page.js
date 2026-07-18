'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

const UNIVERSITIES = ['UNEC', 'ADA University', 'Xəzər Universiteti', 'Bakı Dövlət Universiteti', 'Digər'];

function ChoiceCard({ active, onClick, icon, title, desc }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-6 rounded-2xl border transition-all w-full ${
        active
          ? 'border-[var(--brand-purple)] bg-[var(--purple-10)]'
          : 'border-[var(--border-dark)] bg-[var(--bg-surface)] hover:border-[var(--border-glow)]'
      }`}
      style={{ boxShadow: active ? 'var(--card-shadow)' : 'none' }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-base font-bold text-[var(--text-bright)] mb-1">{title}</div>
      <div className="text-sm text-[var(--text-muted)]">{desc}</div>
    </button>
  );
}

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [status, setStatus] = useState(null); // 'student' | 'professional'
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [major, setMajor] = useState('');
  const [interest, setInterest] = useState(null); // 'ecommerce' | 'techdesign'
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-76px)] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Yüklənir...</p>
      </div>
    );
  }
  if (!user) {
    router.push('/giris');
    return null;
  }

  const canSubmit = status && interest && (status !== 'student' || major.trim().length > 0);

  async function handleSubmit() {
    setSaving(true);
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: user.user_metadata?.full_name || null,
      role: status,
      university: status === 'student' ? university : null,
      major: status === 'student' ? major : null,
      interests: [interest],
      updated_at: new Date().toISOString(),
    });
    router.push('/profil');
  }

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[var(--bg-page)] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <div className="text-2xl font-extrabold text-[var(--text-bright)] mb-2">Xoş gəldin! 👋</div>
          <p className="text-[var(--text-muted)] text-sm">Sənə uyğun karyera planı qurmaq üçün 2 sualımız var.</p>
        </div>

        {/* Question 1 */}
        <div className="mb-10">
          <div className="text-lg font-bold text-[var(--text-bright)] mb-4">Hazırkı statusun</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <ChoiceCard
              active={status === 'student'}
              onClick={() => setStatus('student')}
              icon="🎓"
              title="Tələbə"
              desc="Hazırda universitetdə təhsil alıram"
            />
            <ChoiceCard
              active={status === 'professional'}
              onClick={() => setStatus('professional')}
              icon="💼"
              title="Gənc Peşəkar"
              desc="İş həyatına artıq başlamışam"
            />
          </div>
          {status === 'student' && (
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Universitet</label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]"
                >
                  {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">İxtisas</label>
                <input
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="məs. Kompüter Elmləri"
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="mb-10">
          <div className="text-lg font-bold text-[var(--text-bright)] mb-4">Maraq sahən</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <ChoiceCard
              active={interest === 'ecommerce'}
              onClick={() => setInterest('ecommerce')}
              icon="🛍️"
              title="E-ticarət və İdarəetmə"
              desc="Onlayn satış, biznes idarəetməsi, marketinq"
            />
            <ChoiceCard
              active={interest === 'techdesign'}
              onClick={() => setInterest('techdesign')}
              icon="💻"
              title="Dizayn və Proqramlaşdırma"
              desc="Frontend, UI/UX, məhsul dizaynı"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || saving}
          className="w-full bg-[var(--brand-purple)] hover:bg-[var(--brand-purple-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors"
        >
          {saving ? 'Hazırlanır...' : 'Mənim Ana Səhifəmi Yarat'}
        </button>
      </div>
    </div>
  );
}
