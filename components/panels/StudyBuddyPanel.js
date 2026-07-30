'use client';

import { useEffect, useState } from 'react';
import { PageHeader, Panel, PanelSection, Toggle } from '@/components/ProfileUI';
import { fetchMyProfile, setStudyBuddyVisible, fetchVisibleBuddies, fetchMyConnections, connectWithBuddy } from '@/lib/studyBuddy';

/* Simple, transparent heuristic — not a black-box score. Shared interests
   matter most, same major/university are smaller bonuses. Clamped to 98 so
   it never claims a false 100% (no two people are a "perfect" match). */
function computeMatch(mine, theirs) {
  const myInterests = mine.interests || [];
  const theirInterests = theirs.interests || [];
  const shared = myInterests.filter((i) => theirInterests.includes(i));
  let score = 30 + shared.length * 15;
  if (mine.major && mine.major === theirs.major) score += 20;
  if (mine.university && mine.university === theirs.university) score += 10;
  return { score: Math.min(98, score), shared };
}

export default function StudyBuddyPanel({ user }) {
  const [myProfile, setMyProfile] = useState(null);
  const [buddies, setBuddies] = useState([]);
  const [connectedIds, setConnectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingVisible, setTogglingVisible] = useState(false);
  const [connectingId, setConnectingId] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const profile = await fetchMyProfile(user.id);
        if (cancelled) return;
        setMyProfile(profile);
        const conns = await fetchMyConnections(user.id);
        if (cancelled) return;
        setConnectedIds(conns);
        if (profile?.study_buddy_visible) {
          const list = await fetchVisibleBuddies(user.id);
          if (!cancelled) setBuddies(list);
        }
      } catch (err) {
        console.error('StudyBuddyPanel load failed:', err);
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [user.id]);

  async function handleToggleVisible(next) {
    if (togglingVisible) return;
    setTogglingVisible(true);
    try {
      await setStudyBuddyVisible(user.id, next);
      setMyProfile((p) => (p ? { ...p, study_buddy_visible: next } : p));
      if (next) {
        const list = await fetchVisibleBuddies(user.id);
        setBuddies(list);
      } else {
        setBuddies([]);
      }
    } finally {
      setTogglingVisible(false);
    }
  }

  async function handleConnect(buddyId) {
    setConnectingId(buddyId);
    try {
      await connectWithBuddy(user.id, buddyId);
      setConnectedIds((ids) => [...ids, buddyId]);
    } finally {
      setConnectingId(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>;
  }

  if (loadError) {
    return (
      <div>
        <PageHeader sub="Oxşar maraqlara və ixtisas qrupuna sahib istifadəçilərlə tanış ol">Tədris Yoldaşı</PageHeader>
        <p className="text-sm text-[var(--text-secondary)]">Hələlik uyğun yoldaş yoxdur — istifadəçilərin sayı artdıqca uyğunlaşmalar başlayacaq.</p>
      </div>
    );
  }

  const isVisible = !!myProfile?.study_buddy_visible;
  const matches = buddies
    .map((b) => ({ buddy: b, ...computeMatch(myProfile || {}, b) }))
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <PageHeader sub="Oxşar maraqlara və ixtisas qrupuna sahib istifadəçilərlə tanış ol">Tədris Yoldaşı</PageHeader>

      <Panel>
        <PanelSection first title="Görünürlük" desc="Görünən olmadan başqa istifadəçiləri görə bilməzsən — bu qarşılıqlı işləyir">
          <Toggle
            label="Tədris Yoldaşı siyahısında görünən ol"
            desc="Ad, avatar, təhsil məlumatların və maraqların digər istifadəçilərə göstərilir"
            checked={isVisible}
            onChange={handleToggleVisible}
          />
        </PanelSection>
      </Panel>

      {!isVisible ? (
        <p className="text-sm text-[var(--text-secondary)] mt-5">Başqa tələbələri görmək üçün əvvəlcə özün görünən olmalısan.</p>
      ) : matches.length === 0 ? (
        <p className="text-sm text-[var(--text-secondary)] mt-5">Hələlik uyğun yoldaş yoxdur — istifadəçilərin sayı artdıqca uyğunlaşmalar başlayacaq.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          {matches.map(({ buddy, score, shared }) => {
            const connected = connectedIds.includes(buddy.id);
            const subtitle = [buddy.major, buddy.university].filter(Boolean).join(' · ') || 'MLUE istifadəçisi';
            return (
              <div key={buddy.id} className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  {buddy.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={buddy.avatar_url} alt="" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0">
                      {(buddy.full_name || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--text-primary)] truncate">{buddy.full_name || 'Adsız istifadəçi'}</div>
                    <div className="text-xs text-[var(--text-secondary)] truncate">{subtitle}</div>
                    <span className="text-xs font-bold text-[var(--success)]">{score}% uyğunluq</span>
                  </div>
                </div>
                {shared.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {shared.map((tag) => (
                      <span key={tag} className="text-[10px] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  disabled={connected || connectingId === buddy.id}
                  onClick={() => handleConnect(buddy.id)}
                  className={`w-full text-sm font-bold px-5 py-2 rounded-lg transition-colors ${
                    connected
                      ? 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-not-allowed'
                      : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-60'
                  }`}
                >
                  {connected ? 'Göndərildi ✓' : 'Bağlantı qur'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
