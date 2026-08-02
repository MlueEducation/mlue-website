'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { resolveDisplayName } from '@/lib/displayName';
import { Flame, Award, Rocket, MessageCircle, Briefcase, Gift, Gift as MysteryGiftIcon } from 'lucide-react';
import { Panel, PanelSection, Tooltip, PageHeader, StatTile, ProgressBar, Toggle } from '@/components/ProfileUI';
import {
  claimBadge,
  fetchLeaderboard,
  fetchMyQuestProgress,
  fetchUnconsumedMysteryBoxCount,
  fetchXpSince,
  setLeaderboardVisible,
} from '@/lib/gamification';
import MysteryBoxModal from '@/components/MysteryBoxModal';
import { isProActive } from '@/lib/proSubscription';

const LEVEL_XP_STEP = 500;
const EARLY_ADOPTER_CUTOFF = new Date('2027-01-01');

const BADGE_DEFS = [
  { key: 'streak-7', label: '7 Günlük Seriya', icon: Flame, requirement: '7 gün ardıcıl aktivlik lazımdır' },
  { key: 'first-cert', label: 'İlk Sertifikat', icon: Award, requirement: 'Bir sertifikat qazanmalısan' },
  { key: 'early', label: 'Erkən Qoşulan', icon: Rocket, requirement: 'Erkən qeydiyyat dövründə qoşulmalısan' },
  { key: 'streak-30', label: '30 Günlük Seriya', icon: Flame, requirement: '30 gün ardıcıl aktivlik lazımdır' },
  { key: 'mentor-review', label: 'Mentor Rəyi', icon: MessageCircle, requirement: 'Bu nişan hələ mövcud deyil', locked: true },
  { key: 'portfolio-master', label: 'Portfolio Ustası', icon: Briefcase, requirement: '5 portfolio layihəsi əlavə et' },
];

const LEADERBOARD_TABS = [
  { id: 'week', label: 'Bu həftə' },
  { id: 'month', label: 'Bu ay' },
  { id: 'all', label: 'Ümumi' },
];

function startOfWeekIso() {
  const d = new Date();
  const day = d.getDay() || 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day + 1);
  return d.toISOString();
}
function startOfMonthIso() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function tierFor(xp) {
  if (xp >= 3000) return { label: 'Qızıl', className: 'text-[var(--accent-warm)]' };
  if (xp >= 1000) return { label: 'Gümüş', className: 'text-[var(--text-secondary)]' };
  return { label: 'Bürünc', className: 'text-[var(--warning)]' };
}

/* Embedded inside /profil's "game" tab: pass profile from the parent (zero
   behavior change from before). Standalone /achievements route: omit it,
   this component self-fetches the profile. Streak/mystery-box-granting
   itself now happens once per page load via StreakActivitySync, mounted at
   the top-level ProfilPage — this component only ever reads/displays the
   resulting state. */
export default function AchievementsPanel({ user, profile: profileProp, streakOverride }) {
  const standalone = profileProp === undefined;
  const [selfProfile, setSelfProfile] = useState(null);
  const [selfProfileLoading, setSelfProfileLoading] = useState(standalone);

  useEffect(() => {
    if (!standalone) return;
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle().then(({ data }) => {
      setSelfProfile(data);
      setSelfProfileLoading(false);
    });
  }, [standalone, user.id]);

  const profile = standalone ? selfProfile : profileProp;

  const email = user.email;
  const initial = email.charAt(0).toUpperCase();
  const myName = resolveDisplayName({ profile, user });

  const [certCount, setCertCount] = useState(0);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [earnedBadgeKeys, setEarnedBadgeKeys] = useState(new Set());
  const [quests, setQuests] = useState([]);
  const [mysteryBoxCount, setMysteryBoxCount] = useState(0);
  const [mysteryBoxOpen, setMysteryBoxOpen] = useState(false);

  const [leaderboardVisible, setLeaderboardVisibleState] = useState(!!profile?.leaderboard_visible);
  const [leaderboardRows, setLeaderboardRows] = useState([]);
  const [range, setRange] = useState('all');
  const [rangeXp, setRangeXp] = useState({ week: null, month: null });

  useEffect(() => {
    setLeaderboardVisibleState(!!profile?.leaderboard_visible);
  }, [profile?.leaderboard_visible]);

  useEffect(() => {
    supabase.from('certificates').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setCertCount(count || 0));
    supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setPortfolioCount(count || 0));
    supabase.from('token_transactions').select('amount').eq('user_id', user.id)
      .then(({ data }) => setTokenBalance((data || []).reduce((sum, t) => sum + t.amount, 0)));
    fetchUnconsumedMysteryBoxCount(user.id).then(setMysteryBoxCount).catch(() => {});
    fetchMyQuestProgress().then(setQuests).catch(() => setQuests([]));
  }, [user.id]);

  useEffect(() => {
    let cancelled = false;
    async function syncBadges() {
      const { data } = await supabase.from('badges_earned').select('badge_key').eq('user_id', user.id);
      if (cancelled) return;
      let earned = new Set((data || []).map((r) => r.badge_key));
      setEarnedBadgeKeys(earned);
      for (const def of BADGE_DEFS) {
        if (def.locked || earned.has(def.key)) continue;
        try {
          const awarded = await claimBadge(def.key);
          if (awarded && !cancelled) {
            earned = new Set(earned);
            earned.add(def.key);
            setEarnedBadgeKeys(new Set(earned));
          }
        } catch {
          // best-effort — a badge that fails to claim just stays locked
        }
      }
    }
    syncBadges();
    return () => { cancelled = true; };
  }, [user.id]);

  useEffect(() => {
    if (!leaderboardVisible) { setLeaderboardRows([]); return; }
    let cancelled = false;
    Promise.all([
      fetchLeaderboard(),
      fetchXpSince(user.id, startOfWeekIso()),
      fetchXpSince(user.id, startOfMonthIso()),
    ]).then(([rows, weekXp, monthXp]) => {
      if (cancelled) return;
      setLeaderboardRows(rows);
      setRangeXp({ week: weekXp, month: monthXp });
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [leaderboardVisible, user.id]);

  async function handleToggleLeaderboard(next) {
    setLeaderboardVisibleState(next);
    try {
      await setLeaderboardVisible(user.id, next);
    } catch (err) {
      console.error('Sıralama görünürlüyü dəyişdirilmədi:', err.message);
      setLeaderboardVisibleState(!next);
    }
  }

  const xp = profile?.xp_points || 0;
  const level = Math.floor(xp / LEVEL_XP_STEP) + 1;
  const xpIntoLevel = xp % LEVEL_XP_STEP;
  // In standalone mode, the profile was fetched once on mount — before
  // StreakActivitySync (mounted by the page, one level up) has necessarily
  // finished recording today's activity. streakOverride lets the page hand
  // down the fresher value immediately, mirroring how /profil's
  // bumpStreakLocal patches its own profile state.
  const streak = (standalone && streakOverride != null) ? streakOverride : (profile?.current_streak || 0);

  const badges = BADGE_DEFS.map((def) => ({
    ...def,
    earned: def.locked ? false : earnedBadgeKeys.has(def.key),
  }));

  const leaderboardForRange = leaderboardRows
    .map((row) => ({
      id: row.id,
      name: row.id === user.id ? myName : (row.full_name || 'İstifadəçi'),
      isMe: row.id === user.id,
      xp: range === 'all' ? row.xp_points : (row.id === user.id ? (rangeXp[range] ?? 0) : row.xp_points),
      isPro: isProActive({ is_pro: row.is_pro, pro_expires_at: row.pro_expires_at }),
    }))
    .sort((a, b) => b.xp - a.xp);

  if (standalone && selfProfileLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader sub="Nişanlar, tapşırıqlar, səviyyə və icma sıralaması">Nailiyyətlər</PageHeader>
      <Panel>
        <PanelSection first title="Statistika" desc="Ümumi nailiyyət göstəricilərin">
          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Tamamlanmış kurslar" value={certCount} icon="✅" tone="success" />
            <StatTile label="Qazanılan Token" value={tokenBalance} icon="🪙" tone="warm" />
          </div>
        </PanelSection>

        <PanelSection title="Səviyyə və təcrübə xalı" desc="Platformada fəallığına görə qazandığın XP">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-primary)] font-bold">Səviyyə {level}</span>
            <span className="text-[var(--text-secondary)]">{xpIntoLevel} / {LEVEL_XP_STEP} XP</span>
          </div>
          <ProgressBar value={(xpIntoLevel / LEVEL_XP_STEP) * 100} colorClass="bg-[var(--accent-warm)]" />
          <div className="flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-[var(--accent-warm)]">
            <Gift className="w-3.5 h-3.5" />
            Səviyyə {level + 1} mükafatı: +50 MLUE Token
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold text-[var(--text-secondary)]">
            🔥 {streak} günlük seriya
          </div>
        </PanelSection>

        <PanelSection title="Tapşırıqlar" desc="Gündəlik və həftəlik tapşırıqları tamamlayaraq XP qazan">
          {quests.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">Hazırda aktiv tapşırıq yoxdur.</p>
          ) : (
            <div className="space-y-2.5">
              {quests.map((q) => (
                <div key={q.id} className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{q.title}</div>
                    <div className={`text-xs font-bold flex-shrink-0 ${q.completed ? 'text-[var(--success)]' : 'text-[var(--accent-warm)]'}`}>
                      {q.completed ? `+${q.xp_reward} XP ✓` : `+${q.xp_reward} XP`}
                    </div>
                  </div>
                  <ProgressBar value={(q.progress / q.target_count) * 100} colorClass={q.completed ? 'bg-[var(--success)]' : 'bg-[var(--accent)]'} />
                  <div className="text-[11px] text-[var(--text-tertiary)] mt-1">{q.progress} / {q.target_count}</div>
                </div>
              ))}
            </div>
          )}
        </PanelSection>

        {mysteryBoxCount > 0 && (
          <PanelSection title="Mystery Box" desc="7 günlük ardıcıl aktivlik üçün qazandığın sürpriz mükafat">
            <button
              type="button"
              onClick={() => setMysteryBoxOpen(true)}
              className="flex items-center gap-2 bg-[var(--warm-soft)] hover:opacity-90 text-[var(--accent-warm)] font-bold text-sm px-4 py-2.5 rounded-lg transition-opacity"
            >
              <MysteryGiftIcon className="w-4 h-4" />
              {mysteryBoxCount} Mystery Box aç
            </button>
          </PanelSection>
        )}

        <PanelSection title="Nişanlar" desc="Qazandığın və hələ açılmamış nailiyyətlər">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {badges.map((b) => {
              const BadgeIcon = b.icon;
              const cell = (
                <div className={`text-center p-3 rounded-2xl border transition-all ${b.earned ? 'border-[var(--accent-warm)] bg-[var(--warm-soft)]' : 'border-[var(--border)] bg-[var(--bg-surface-2)] opacity-50'}`}>
                  <div className={`w-9 h-9 mx-auto mb-2 rounded-full flex items-center justify-center ${b.earned ? 'bg-[var(--accent-warm)] text-white' : 'bg-[var(--border)] text-[var(--text-secondary)]'}`}>
                    <BadgeIcon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-[10px] font-semibold text-[var(--text-primary)] leading-tight">{b.label}</div>
                </div>
              );
              return b.earned ? (
                <div key={b.key}>{cell}</div>
              ) : (
                <Tooltip key={b.key} text={b.requirement}>{cell}</Tooltip>
              );
            })}
          </div>
        </PanelSection>

        <PanelSection title="Liderlik Cədvəli" desc="İcma daxilində ən yüksək XP-yə sahib istifadəçilər">
          <Toggle label="Sıralamada görün" checked={leaderboardVisible} onChange={handleToggleLeaderboard} />
          {!leaderboardVisible ? (
            <p className="text-sm text-[var(--text-secondary)]">Liderlik cədvəlini görmək üçün əvvəlcə özün görünən olmalısan.</p>
          ) : (
            <>
              <div className="inline-flex bg-[var(--bg-surface-2)] rounded-[var(--radius-full)] p-1 mb-4">
                {LEADERBOARD_TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setRange(t.id)}
                    className={`text-xs font-bold px-4 py-1.5 rounded-[var(--radius-full)] transition-colors ${
                      range === t.id ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {leaderboardForRange.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)]">Hələlik sıralamada heç kim yoxdur — istifadəçilərin sayı artdıqca burada görünəcəklər.</p>
              ) : (
                <div className="space-y-2">
                  {leaderboardForRange.map((row, i) => {
                    const tier = tierFor(row.xp);
                    return (
                      <div key={row.id} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${row.isMe ? 'bg-[var(--accent-soft)] border border-[var(--accent)]' : 'bg-[var(--bg-surface-2)]'}`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs font-bold text-[var(--text-tertiary)] w-4 flex-shrink-0">{i + 1}</span>
                          <div
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                            style={row.isPro ? { boxShadow: `0 0 0 2px color-mix(in srgb, var(--accent) 70%, transparent)` } : undefined}
                          >
                            {row.isMe ? initial : row.name.charAt(0)}
                          </div>
                          <span className={`text-sm truncate ${row.isMe ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>{row.name}</span>
                          {row.isPro && (
                            <span className="text-[10px] font-bold uppercase flex-shrink-0 text-[var(--accent)] bg-[var(--accent-soft)] px-1.5 py-0.5 rounded-full">PRO</span>
                          )}
                          <span className={`text-[10px] font-bold uppercase flex-shrink-0 ${tier.className}`}>{tier.label}</span>
                        </div>
                        <span className="text-xs font-bold text-[var(--accent-warm)] flex-shrink-0">{row.xp} XP</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </PanelSection>
      </Panel>

      <MysteryBoxModal
        open={mysteryBoxOpen}
        onClose={() => setMysteryBoxOpen(false)}
        onOpened={() => setMysteryBoxCount((c) => Math.max(0, c - 1))}
      />
    </div>
  );
}
