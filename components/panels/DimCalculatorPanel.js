'use client';

import { useEffect, useMemo, useState } from 'react';
import { COMMON_SUBJECTS, DIM_GROUPS, GRADUATION_MAX, getAdmissionMax } from '@/lib/dimGroups';
import { Panel, PanelSection, PageHeader, CircularProgress } from '@/components/ProfileUI';
import { supabase } from '@/lib/supabaseClient';
import { claimBadge, recordQuestAction } from '@/lib/gamification';

/* The one-time XP reward and the badges_earned insert both now happen
   server-side inside the claim_badge() RPC (SECURITY DEFINER, re-validates
   the badge key is real and not already earned before writing anything) —
   this replaces the old client-side raw `badges_earned` insert + local XP
   bump, closing the same "browser console can self-award XP" hole every
   other reward path in this app already closed. The amount here is for the
   optimistic local UI bump only; the actual server-side reward is fixed at
   30 XP inside claim_badge()'s SQL body. */
const SAVE_XP_REWARD = 30;
const DIM_XP_BADGE_KEY = 'dim-first-save';

function formatHistoryDate(iso) {
  return new Date(iso).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

function summarizeScores(result) {
  return Object.entries(result.subjects_and_scores || {})
    .filter(([key]) => key.startsWith('qebul:'))
    .map(([key, score]) => `${key.slice('qebul:'.length)}: ${score}`)
    .join(', ');
}

/* Small, curated mock group→majors mapping (real MAJORS list is too large to
   score meaningfully) — each major's weights sum to 1 across its specialized
   subjects, cutoff is a mock competitiveness baseline (0-100). */
const MOCK_MAJORS = [
  { name: 'Kimya mühəndisliyi', groupId: 'I', subgroup: 'Riyaziyyat-kimya (RK)', weights: { 'Riyaziyyat': 0.4, 'Fizika': 0.25, 'Kimya': 0.35 }, cutoff: 72 },
  { name: 'Neft-qaz mühəndisliyi', groupId: 'I', subgroup: 'Riyaziyyat-kimya (RK)', weights: { 'Riyaziyyat': 0.35, 'Fizika': 0.35, 'Kimya': 0.3 }, cutoff: 78 },
  { name: 'Kompüter elmləri', groupId: 'I', subgroup: 'Riyaziyyat-informatika (Rİ)', weights: { 'Riyaziyyat': 0.4, 'Fizika': 0.2, 'İnformatika': 0.4 }, cutoff: 80 },
  { name: 'Kompüter mühəndisliyi', groupId: 'I', subgroup: 'Riyaziyyat-informatika (Rİ)', weights: { 'Riyaziyyat': 0.35, 'Fizika': 0.3, 'İnformatika': 0.35 }, cutoff: 76 },
  { name: 'İnformasiya texnologiyaları', groupId: 'I', subgroup: 'Riyaziyyat-informatika (Rİ)', weights: { 'Riyaziyyat': 0.3, 'Fizika': 0.25, 'İnformatika': 0.45 }, cutoff: 68 },
  { name: 'İqtisadiyyat', groupId: 'II', weights: { 'Riyaziyyat': 0.5, 'Coğrafiya': 0.25, 'Tarix': 0.25 }, cutoff: 65 },
  { name: 'Maliyyə', groupId: 'II', weights: { 'Riyaziyyat': 0.55, 'Coğrafiya': 0.2, 'Tarix': 0.25 }, cutoff: 74 },
  { name: 'Marketinq', groupId: 'II', weights: { 'Riyaziyyat': 0.35, 'Coğrafiya': 0.35, 'Tarix': 0.3 }, cutoff: 58 },
  { name: 'Menecment', groupId: 'II', weights: { 'Riyaziyyat': 0.4, 'Coğrafiya': 0.3, 'Tarix': 0.3 }, cutoff: 62 },
  { name: 'Turizm işinin təşkili', groupId: 'II', weights: { 'Riyaziyyat': 0.25, 'Coğrafiya': 0.45, 'Tarix': 0.3 }, cutoff: 50 },
  { name: 'Filologiya', groupId: 'III', subgroup: 'Dil-tarix (DT)', weights: { 'Tarix': 0.25, 'Az. dili və ədəbiyyatı': 0.35, 'Ədəbiyyat': 0.4 }, cutoff: 60 },
  { name: 'Jurnalistika', groupId: 'III', subgroup: 'Dil-tarix (DT)', weights: { 'Tarix': 0.3, 'Az. dili və ədəbiyyatı': 0.4, 'Ədəbiyyat': 0.3 }, cutoff: 66 },
  { name: 'Hüquqşünaslıq', groupId: 'III', subgroup: 'Tarix-coğrafiya (TC)', weights: { 'Tarix': 0.4, 'Az. dili və ədəbiyyatı': 0.35, 'Coğrafiya': 0.25 }, cutoff: 85 },
  { name: 'Beynəlxalq münasibətlər', groupId: 'III', subgroup: 'Tarix-coğrafiya (TC)', weights: { 'Tarix': 0.35, 'Az. dili və ədəbiyyatı': 0.3, 'Coğrafiya': 0.35 }, cutoff: 82 },
  { name: 'Tibb', groupId: 'IV', weights: { 'Biologiya': 0.45, 'Kimya': 0.35, 'Fizika': 0.2 }, cutoff: 88 },
  { name: 'Əczaçılıq', groupId: 'IV', weights: { 'Biologiya': 0.4, 'Kimya': 0.4, 'Fizika': 0.2 }, cutoff: 79 },
  { name: 'Stomatologiya', groupId: 'IV', weights: { 'Biologiya': 0.4, 'Kimya': 0.35, 'Fizika': 0.25 }, cutoff: 84 },
  { name: 'Baytarlıq təbabəti', groupId: 'IV', weights: { 'Biologiya': 0.5, 'Kimya': 0.3, 'Fizika': 0.2 }, cutoff: 55 },
  { name: 'Biotexnologiya', groupId: 'IV', weights: { 'Biologiya': 0.4, 'Kimya': 0.4, 'Fizika': 0.2 }, cutoff: 63 },
  { name: 'Dizayn', groupId: 'V', weights: { 'Əsas fənn (ixtisasa görə)': 0.5, 'Qabiliyyət imtahanı': 0.5 }, cutoff: 60 },
  { name: 'Memarlıq', groupId: 'V', weights: { 'Əsas fənn (ixtisasa görə)': 0.55, 'Qabiliyyət imtahanı': 0.45 }, cutoff: 80 },
  { name: 'Vokal sənəti', groupId: 'V', weights: { 'Əsas fənn (ixtisasa görə)': 0.4, 'Qabiliyyət imtahanı': 0.6 }, cutoff: 55 },
  { name: 'Xoreoqrafiya sənəti', groupId: 'V', weights: { 'Əsas fənn (ixtisasa görə)': 0.35, 'Qabiliyyət imtahanı': 0.65 }, cutoff: 50 },
];

function parseInitialGroup(profile) {
  const m = profile?.major?.match(/^(I|II|III|IV|V) qrup$/);
  return m ? m[1] : null;
}

function initialSubgroup(groupId) {
  const g = DIM_GROUPS.find((x) => x.id === groupId);
  return g?.subgroups ? g.subgroups[0].name : null;
}

function computeProbability(major, scores) {
  const subjects = Object.keys(major.weights);
  // Normalize each subject to a 0-100 scale (some qəbul subjects go up to 150)
  // before applying weights, so the weighted score stays comparable to cutoff.
  const weightedScore = subjects.reduce((sum, s) => {
    const max = getAdmissionMax(major.groupId, s);
    const raw = Number(scores[`qebul:${s}`]) || 0;
    return sum + (raw / max) * 100 * major.weights[s];
  }, 0);
  const raw = 50 + (weightedScore - major.cutoff) * 1.2;
  return Math.min(98, Math.max(2, Math.round(raw)));
}

function toneFor(percent) {
  if (percent >= 70) return 'stroke-[var(--success)]';
  if (percent >= 40) return 'stroke-[var(--accent-warm)]';
  return 'stroke-[var(--danger)]';
}

function SubjectScoreGrid({ subjects, prefix, getMax, scores, onChange }) {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {subjects.map((subject) => {
        const max = getMax(subject);
        const key = `${prefix}:${subject}`;
        return (
          <div key={key}>
            <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1.5 block">{subject}</label>
            <input
              type="number"
              min="0"
              max={max}
              placeholder={`0-${max}`}
              value={scores[key] ?? ''}
              onChange={(e) => onChange(key, e.target.value, max)}
              className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function DimCalculatorPanel({ profile, user, onXpAwarded }) {
  const [groupId, setGroupId] = useState(() => parseInitialGroup(profile));
  const [subgroupName, setSubgroupName] = useState(() => initialSubgroup(parseInitialGroup(profile)));
  const [scores, setScores] = useState({});
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved
  const [lastSaveAwardedXp, setLastSaveAwardedXp] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const group = DIM_GROUPS.find((g) => g.id === groupId) || null;

  useEffect(() => {
    supabase
      .from('exam_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setHistory(data || []);
        setHistoryLoading(false);
      });
  }, [user.id]);

  function selectGroup(id) {
    setGroupId(id);
    setSubgroupName(initialSubgroup(id));
    setSaveState('idle');
  }

  const groupSubjects = useMemo(() => {
    if (!group) return [];
    if (group.subgroups) {
      const sg = group.subgroups.find((s) => s.name === subgroupName) || group.subgroups[0];
      return sg.subjects;
    }
    return group.subjects;
  }, [group, subgroupName]);

  function setScore(key, value, max) {
    setSaveState('idle');
    if (value === '') {
      setScores((s) => ({ ...s, [key]: '' }));
      return;
    }
    const clamped = Math.max(0, Math.min(Number(value), max));
    setScores((s) => ({ ...s, [key]: clamped }));
  }

  const results = useMemo(() => {
    if (!groupId) return [];
    return MOCK_MAJORS
      .filter((m) => m.groupId === groupId && (!m.subgroup || m.subgroup === subgroupName))
      .map((m) => ({ ...m, probability: computeProbability(m, scores) }))
      .sort((a, b) => b.probability - a.probability);
  }, [groupId, subgroupName, scores]);

  async function saveResults() {
    setSaveState('saving');
    const { data, error } = await supabase.from('exam_results').insert({
      user_id: user.id,
      major_group: groupId,
      subgroup: subgroupName,
      subjects_and_scores: scores,
    }).select().single();
    if (error) {
      setSaveState('idle');
      return;
    }
    setHistory((h) => [data, ...h]);
    recordQuestAction('dim_calculator_save').catch((err) => console.error('Tapşırıq qeydə alınmadı:', err.message));

    try {
      const awarded = await claimBadge(DIM_XP_BADGE_KEY);
      if (awarded) {
        onXpAwarded(SAVE_XP_REWARD);
        setLastSaveAwardedXp(true);
      } else {
        setLastSaveAwardedXp(false);
      }
    } catch (err) {
      console.error('Nişan təsdiqlənmədi:', err.message);
      setLastSaveAwardedXp(false);
    }
    setSaveState('saved');
  }

  return (
    <div>
      <PageHeader sub="Qrupunu seç, fənn ballarını daxil et, ixtisaslara qəbul ehtimalını gör">DİM Bal Kalkulyatoru</PageHeader>
      <div className="space-y-5">
        <Panel>
          <PanelSection first title="Qrup seçimi">
            <div className="grid sm:grid-cols-2 gap-3">
              {DIM_GROUPS.map((g) => {
                const active = groupId === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => selectGroup(g.id)}
                    className={`text-left rounded-2xl border p-4 transition-all ${
                      active
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                        : 'border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center text-sm font-extrabold ${active ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-surface-2)] text-[var(--text-primary)]'}`}>
                        {g.id}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-[var(--text-primary)]">{g.id} qrup</div>
                        <div className="text-xs text-[var(--text-secondary)]">{g.desc}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {group?.subgroups && (
              <div className="flex flex-wrap gap-2 mt-4">
                {group.subgroups.map((sg) => (
                  <button
                    key={sg.name}
                    type="button"
                    onClick={() => setSubgroupName(sg.name)}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                      subgroupName === sg.name ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {sg.name}
                  </button>
                ))}
              </div>
            )}
          </PanelSection>

          {group && (
            <>
              <PanelSection title="Buraxılış fənləri" desc="Bütün qruplarda ortaq, maksimum 100 bal">
                <SubjectScoreGrid
                  subjects={COMMON_SUBJECTS}
                  prefix="buraxilis"
                  getMax={() => GRADUATION_MAX}
                  scores={scores}
                  onChange={setScore}
                />
              </PanelSection>
              <PanelSection title="Qəbul fənləri" desc="Seçdiyin qrupa uyğun, fənndən asılı olaraq maksimum 100 və ya 150 bal">
                <SubjectScoreGrid
                  subjects={groupSubjects}
                  prefix="qebul"
                  getMax={(subject) => getAdmissionMax(groupId, subject)}
                  scores={scores}
                  onChange={setScore}
                />
              </PanelSection>
            </>
          )}
        </Panel>

        {group && (
          <Panel>
            <PanelSection
              first
              title="Uyğun ixtisaslar"
              desc="Daxil etdiyin ballara əsasən təxmini qəbul ehtimalı"
            >
              {results.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)]">Bu qrup üçün nümunə ixtisas tapılmadı.</p>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    {results.map((m) => (
                      <div key={m.name} className="flex items-center gap-4 bg-[var(--bg-surface-2)] rounded-xl p-4">
                        <CircularProgress percent={m.probability} toneClass={toneFor(m.probability)} />
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[var(--text-primary)]">{m.name}</div>
                          {m.subgroup && <div className="text-[11px] text-[var(--text-tertiary)]">{m.subgroup}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={saveResults}
                    disabled={saveState !== 'idle'}
                    className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-colors ${
                      saveState === 'saved'
                        ? 'bg-[var(--success-soft)] text-[var(--success)] cursor-default'
                        : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-60'
                    }`}
                  >
                    {saveState === 'saved'
                      ? `Saxlanıldı ✓${lastSaveAwardedXp ? ` (+${SAVE_XP_REWARD} XP)` : ''}`
                      : saveState === 'saving' ? 'Saxlanılır...' : 'Nəticələrimi saxla'}
                  </button>
                </>
              )}
            </PanelSection>
          </Panel>
        )}

        <Panel>
          <PanelSection first title="Nəticə Tarixçəsi" desc="Əvvəllər saxladığın bütün DİM Kalkulyatoru nəticələri">
            {historyLoading ? (
              <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
            ) : history.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Hələ heç bir nəticə saxlamamısan.</p>
            ) : (
              <div className="space-y-2.5">
                {history.map((h) => (
                  <div key={h.id} className="bg-[var(--bg-surface-2)] rounded-xl p-4">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-sm font-bold text-[var(--text-primary)]">{h.subgroup || `${h.major_group} qrup`}</span>
                      <span className="text-[11px] text-[var(--text-tertiary)] flex-shrink-0">{formatHistoryDate(h.created_at)}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{summarizeScores(h) || 'Bal daxil edilməyib'}</p>
                  </div>
                ))}
              </div>
            )}
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}
