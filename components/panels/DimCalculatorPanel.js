'use client';

import { useMemo, useState } from 'react';
import { COMMON_SUBJECTS, DIM_GROUPS } from '@/lib/dimGroups';
import { Panel, PanelSection, PageHeader } from '@/components/ProfileUI';

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
  const weightedScore = subjects.reduce((sum, s) => sum + (Number(scores[s]) || 0) * major.weights[s], 0);
  const raw = 50 + (weightedScore - major.cutoff) * 1.2;
  return Math.min(98, Math.max(2, Math.round(raw)));
}

function toneFor(percent) {
  if (percent >= 70) return 'stroke-[var(--success)]';
  if (percent >= 40) return 'stroke-[var(--accent-warm)]';
  return 'stroke-[var(--danger)]';
}

function CircularProgress({ percent, size = 64, strokeWidth = 6, toneClass }) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={strokeWidth} fill="none" className="stroke-[var(--border)]" />
        <circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          className={toneClass}
          style={{ transition: 'stroke-dashoffset 700ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-[var(--text-primary)]">{percent}%</div>
    </div>
  );
}

export default function DimCalculatorPanel({ profile }) {
  const [groupId, setGroupId] = useState(() => parseInitialGroup(profile));
  const [subgroupName, setSubgroupName] = useState(() => initialSubgroup(parseInitialGroup(profile)));
  const [scores, setScores] = useState({});

  const group = DIM_GROUPS.find((g) => g.id === groupId) || null;

  function selectGroup(id) {
    setGroupId(id);
    setSubgroupName(initialSubgroup(id));
  }

  const groupSubjects = useMemo(() => {
    if (!group) return [];
    if (group.subgroups) {
      const sg = group.subgroups.find((s) => s.name === subgroupName) || group.subgroups[0];
      return sg.subjects;
    }
    return group.subjects;
  }, [group, subgroupName]);

  const subjectList = useMemo(() => Array.from(new Set([...COMMON_SUBJECTS, ...groupSubjects])), [groupSubjects]);

  function setScore(subject, value) {
    setScores((s) => ({ ...s, [subject]: value }));
  }

  const results = useMemo(() => {
    if (!groupId) return [];
    return MOCK_MAJORS
      .filter((m) => m.groupId === groupId && (!m.subgroup || m.subgroup === subgroupName))
      .map((m) => ({ ...m, probability: computeProbability(m, scores) }))
      .sort((a, b) => b.probability - a.probability);
  }, [groupId, subgroupName, scores]);

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
            <PanelSection title="Fənn balların" desc="Hər fənn üzrə təxmini balını (0-100) daxil et">
              <div className="grid sm:grid-cols-3 gap-3">
                {subjectList.map((subject) => (
                  <div key={subject}>
                    <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1.5 block">{subject}</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={scores[subject] || ''}
                      onChange={(e) => setScore(subject, e.target.value)}
                      className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                ))}
              </div>
            </PanelSection>
          )}
        </Panel>

        {group && (
          <Panel>
            <PanelSection first title="Uyğun ixtisaslar" desc="Daxil etdiyin ballara əsasən təxmini qəbul ehtimalı">
              {results.length === 0 ? (
                <p className="text-sm text-[var(--text-secondary)]">Bu qrup üçün nümunə ixtisas tapılmadı.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
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
              )}
            </PanelSection>
          </Panel>
        )}
      </div>
    </div>
  );
}
