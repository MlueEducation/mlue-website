'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { resolveDisplayName } from '@/lib/displayName';
import { Flame, Award, Rocket, MessageCircle, Briefcase, Gift } from 'lucide-react';
import { Panel, PanelSection, Tooltip, PageHeader, StatTile, ProgressBar } from '@/components/ProfileUI';

const LEVEL_XP_STEP = 500;
const DAILY_QUESTS = [
  { id: 'q1', label: 'Bir dərsi tamamla', xp: 20 },
  { id: 'q2', label: 'Forumda bir suala cavab yaz', xp: 15 },
  { id: 'q3', label: '10 dəqiqə təcrübə et', xp: 25 },
];
const EARLY_ADOPTER_CUTOFF = new Date('2027-01-01');

const LEADERBOARD_TABS = [
  { id: 'week', label: 'Bu həftə' },
  { id: 'month', label: 'Bu ay' },
  { id: 'all', label: 'Ümumi' },
];

/* Still mock — a real multi-user leaderboard needs a Supabase view/RPC
   exposing other users' data (a privacy decision left for a future pass),
   same tradeoff already made once for this exact leaderboard's "name"
   field. Kept identical to the values that used to live inline in
   app/profil/page.js's GamePanel. */
const MOCK_LEADERBOARD_BY_RANGE = {
  week: [
    { name: 'Aysel M.', xp: 640 },
    { name: 'Tural H.', xp: 510 },
    { name: '__ME__', xp: 480, isMe: true },
    { name: 'Günel S.', xp: 390 },
  ],
  month: [
    { name: 'Aysel M.', xp: 2150 },
    { name: 'Tural H.', xp: 1890 },
    { name: '__ME__', xp: 1720, isMe: true },
    { name: 'Günel S.', xp: 1340 },
  ],
  all: [
    { name: 'Aysel M.', xp: 3820 },
    { name: 'Tural H.', xp: 3210 },
    { name: '__ME__', xp: 2450, isMe: true },
    { name: 'Günel S.', xp: 2100 },
  ],
};

/* Embedded inside /profil's "game" tab: pass profile/onXpAwarded from the
   parent (zero behavior change from before this was extracted).
   Standalone /achievements route: omit both, this component self-fetches
   the profile and self-manages XP awards using the same logic that used
   to live inline in app/profil/page.js. */
export default function AchievementsPanel({ user, profile: profileProp, onXpAwarded: onXpAwardedProp }) {
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

  async function selfAwardXp(amount) {
    const prevXp = selfProfile?.xp_points || 0;
    const nextXp = prevXp + amount;
    setSelfProfile((p) => (p ? { ...p, xp_points: nextXp } : p));
    const { error } = await supabase.from('profiles').update({ xp_points: nextXp }).eq('id', user.id);
    if (error) setSelfProfile((p) => (p ? { ...p, xp_points: prevXp } : p));
  }
  const onXpAwarded = standalone ? selfAwardXp : onXpAwardedProp;

  const email = user.email;
  const initial = email.charAt(0).toUpperCase();
  const myName = resolveDisplayName({ profile, user });

  const [claimedToday, setClaimedToday] = useState([]);
  const [certCount, setCertCount] = useState(0);
  const [portfolioCount, setPortfolioCount] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [range, setRange] = useState('all');

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    supabase.from('daily_quest_claims').select('quest_key').eq('user_id', user.id).eq('claimed_on', today)
      .then(({ data }) => setClaimedToday((data || []).map((r) => r.quest_key)));
    supabase.from('certificates').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setCertCount(count || 0));
    supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      .then(({ count }) => setPortfolioCount(count || 0));
    supabase.from('token_transactions').select('amount').eq('user_id', user.id)
      .then(({ data }) => setTokenBalance((data || []).reduce((sum, t) => sum + t.amount, 0)));
  }, [user.id, today]);

  async function claimQuest(quest) {
    if (claimedToday.includes(quest.id)) return;
    const { error } = await supabase.from('daily_quest_claims').insert({ user_id: user.id, quest_key: quest.id, claimed_on: today, xp_awarded: quest.xp });
    if (!error) {
      setClaimedToday((k) => [...k, quest.id]);
      onXpAwarded(quest.xp);
    }
  }

  const xp = profile?.xp_points || 0;
  const level = Math.floor(xp / LEVEL_XP_STEP) + 1;
  const xpIntoLevel = xp % LEVEL_XP_STEP;
  const streak = profile?.current_streak || 0;

  const badges = [
    { key: 'streak-7', label: '7 Günlük Seriya', icon: Flame, earned: streak >= 7, requirement: '7 gün ardıcıl aktivlik lazımdır' },
    { key: 'first-cert', label: 'İlk Sertifikat', icon: Award, earned: certCount >= 1, requirement: 'Bir sertifikat qazanmalısan' },
    { key: 'early', label: 'Erkən Qoşulan', icon: Rocket, earned: new Date(user.created_at) < EARLY_ADOPTER_CUTOFF, requirement: 'Erkən qeydiyyat dövründə qoşulmalısan' },
    { key: 'streak-30', label: '30 Günlük Seriya', icon: Flame, earned: streak >= 30, requirement: '30 gün ardıcıl aktivlik lazımdır' },
    { key: 'mentor-review', label: 'Mentor Rəyi', icon: MessageCircle, earned: false, requirement: 'Bir mentordan rəy almalısan' },
    { key: 'portfolio-master', label: 'Portfolio Ustası', icon: Briefcase, earned: portfolioCount >= 5, requirement: '5 portfolio layihəsi əlavə et' },
  ];

  const leaderboard = MOCK_LEADERBOARD_BY_RANGE[range].map((row) => (row.isMe ? { ...row, name: myName } : row));

  if (standalone && selfProfileLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader sub="Nişanlar, gündəlik tapşırıqlar, səviyyə və icma sıralaması">Nailiyyətlər</PageHeader>
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
        </PanelSection>

        <PanelSection title="Gündəlik Tapşırıqlar" desc="Hər gün yenilənən kiçik tapşırıqlarla əlavə XP qazan">
          <div className="space-y-2">
            {DAILY_QUESTS.map((q) => {
              const claimed = claimedToday.includes(q.id);
              return (
                <div key={q.id} className="flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{q.label}</div>
                    <div className="text-xs text-[var(--accent-warm)] font-bold mt-0.5">+{q.xp} XP</div>
                  </div>
                  <button
                    onClick={() => claimQuest(q)}
                    disabled={claimed}
                    className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors flex-shrink-0 ${
                      claimed
                        ? 'bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] cursor-default'
                        : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
                    }`}
                  >
                    {claimed ? 'Alındı ✓' : 'Al'}
                  </button>
                </div>
              );
            })}
          </div>
        </PanelSection>

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
          <div className="space-y-2">
            {leaderboard.map((row, i) => (
              <div key={row.isMe ? 'me' : row.name} className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${row.isMe ? 'bg-[var(--accent-soft)] border border-[var(--accent)]' : 'bg-[var(--bg-surface-2)]'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[var(--text-tertiary)] w-4">{i + 1}</span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                    {row.isMe ? initial : row.name.charAt(0)}
                  </div>
                  <span className={`text-sm ${row.isMe ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>{row.name}</span>
                </div>
                <span className="text-xs font-bold text-[var(--accent-warm)]">{row.xp} XP</span>
              </div>
            ))}
          </div>
        </PanelSection>
      </Panel>
    </div>
  );
}
