'use client';

import { useEffect, useMemo, useState } from 'react';
import { Panel, PanelSection, PageHeader, StatTile, ProgressBar } from '@/components/ProfileUI';
import MeagleAvatar from '@/components/MeagleAvatar';
import CourseThumb from '@/components/CourseThumb';
import { supabase } from '@/lib/supabaseClient';
import { getAdmissionMax } from '@/lib/dimGroups';

const RECOMMENDATIONS_BY_SUBJECT = {
  'Riyaziyyat': { categoryId: 'math', title: 'Kalkulusun Əsasları', level: 'İrəli', duration: '7 həftə' },
  'Fizika': { categoryId: 'physics', title: 'Fizikaya Giriş: Klassik Mexanika', level: 'Başlanğıc', duration: '5 həftə' },
  'Kimya': { categoryId: 'health', title: 'Qidalanma və Sağlam Həyat Tərzi', level: 'Başlanğıc', duration: '3 həftə' },
  'İnformatika': { categoryId: 'cs', title: 'Alqoritmlər və Data Strukturları', level: 'Orta', duration: '8 həftə' },
  'Coğrafiya': { categoryId: 'social', title: 'Beynəlxalq Münasibətlərə Giriş', level: 'Orta', duration: '6 həftə' },
  'Tarix': { categoryId: 'social', title: 'Dünya Tarixinə Səyahət', level: 'Başlanğıc', duration: '5 həftə' },
  'Biologiya': { categoryId: 'health', title: 'İctimai Səhiyyəyə Giriş', level: 'Başlanğıc', duration: '4 həftə' },
  'Az. dili və ədəbiyyatı': { categoryId: 'language', title: 'Yaradıcı Yazı Sənəti', level: 'Orta', duration: '4 həftə' },
  'Ədəbiyyat': { categoryId: 'arts', title: 'Yaradıcı Yazı Sənəti', level: 'Orta', duration: '4 həftə' },
};
const DEFAULT_RECOMMENDATIONS = [
  { categoryId: 'math', title: 'Ehtimal Nəzəriyyəsi və Statistika', level: 'Orta', duration: '6 həftə' },
  { categoryId: 'personal', title: 'Vaxt İdarəetməsi və Məhsuldarlıq', level: 'Başlanğıc', duration: '3 həftə' },
  { categoryId: 'cs', title: 'Kompüter Elmlərinin Əsasları', level: 'Başlanğıc', duration: '5 həftə' },
];

function parseTopics(result) {
  return Object.entries(result.subjects_and_scores)
    .filter(([key]) => key.startsWith('qebul:'))
    .map(([key, score]) => {
      const subject = key.slice('qebul:'.length);
      const max = getAdmissionMax(result.major_group, subject);
      return { name: subject, correct: Number(score) || 0, total: max };
    });
}

export default function ExamAnalysisPanel({ user }) {
  const [result, setResult] = useState(undefined); // undefined = loading, null = no result yet

  useEffect(() => {
    supabase
      .from('exam_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setResult(data || null));
  }, [user.id]);

  const topics = useMemo(() => (result ? parseTopics(result) : []), [result]);
  const totalScore = useMemo(() => topics.reduce((s, t) => s + t.correct, 0), [topics]);
  const maxScore = useMemo(() => topics.reduce((s, t) => s + t.total, 0), [topics]);

  const weakTopics = useMemo(
    () => topics.filter((t) => t.total > 0 && t.correct / t.total < 0.6).sort((a, b) => a.correct / a.total - b.correct / b.total).slice(0, 2),
    [topics]
  );

  const recommendations = useMemo(() => {
    const fromWeak = weakTopics.map((t) => RECOMMENDATIONS_BY_SUBJECT[t.name]).filter(Boolean);
    const combined = [...fromWeak];
    for (const rec of DEFAULT_RECOMMENDATIONS) {
      if (combined.length >= 3) break;
      if (!combined.some((r) => r.title === rec.title)) combined.push(rec);
    }
    return combined.slice(0, 3);
  }, [weakTopics]);

  const meagleMessage =
    weakTopics.length > 0
      ? `Sən ${weakTopics.map((t) => t.name).join(' və ')} fənnində çətinlik çəkmisən — bu materialları nəzərdən keçirməyini tövsiyə edirəm:`
      : 'Təbriklər — bütün fənlərdə güclü nəticə göstərmisən! Səviyyəni saxlamaq üçün bu kursları da nəzərdən keçirə bilərsən:';

  if (result === undefined) {
    return (
      <div>
        <PageHeader sub="Son sınaq imtahanının təhlili və Meagle-in tövsiyələri">Sınaq Nəticələri</PageHeader>
        <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div>
        <PageHeader sub="Son sınaq imtahanının təhlili və Meagle-in tövsiyələri">Sınaq Nəticələri</PageHeader>
        <Panel>
          <PanelSection first>
            <div className="flex gap-4 items-start">
              <MeagleAvatar expression="neutral" size={48} />
              <div className="bg-[var(--accent-soft)] rounded-2xl rounded-tl-none p-4 text-sm text-[var(--text-primary)] leading-relaxed">
                Hələ sınaq imtahanı nəticən yoxdur — DİM Kalkulyatorunda ballarını daxil edib ilk nəticəni saxla, mən də sənə fərdi tövsiyələr verim.
              </div>
            </div>
          </PanelSection>
        </Panel>
      </div>
    );
  }

  const examTitle = `DİM Kalkulyatoru Nəticəsi — ${result.subgroup || `${result.major_group} qrup`}`;
  const date = new Date(result.created_at).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      <PageHeader sub="Son sınaq imtahanının təhlili və Meagle-in tövsiyələri">Sınaq Nəticələri</PageHeader>
      <div className="space-y-5">
        <div>
          <div className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{examTitle}</div>
          <div className="text-xs text-[var(--text-tertiary)] mb-4">{date}</div>
          <div className="grid grid-cols-2 gap-4">
            <StatTile label="Nəticə" value={`${totalScore} / ${maxScore}`} icon="📊" tone="accent" />
            <StatTile label="Faiz" value={`${maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0}%`} icon="✅" tone="success" />
          </div>
        </div>

        <Panel>
          <PanelSection first>
            <div className="flex gap-4 items-start">
              <MeagleAvatar expression={weakTopics.length > 0 ? 'question' : 'cheerful'} size={48} />
              <div className="bg-[var(--accent-soft)] rounded-2xl rounded-tl-none p-4 text-sm text-[var(--text-primary)] leading-relaxed">
                {meagleMessage}
              </div>
            </div>
          </PanelSection>

          <PanelSection title="Tövsiyə olunan kurslar">
            <div className="grid sm:grid-cols-3 gap-4">
              {recommendations.map((rec, i) => (
                <div className="course-card" key={rec.title}>
                  <CourseThumb categoryId={rec.categoryId} variant={i} />
                  <h3>{rec.title}</h3>
                  <div className="course-meta">
                    <span>{rec.level}</span>
                    <span className="course-meta-dot">·</span>
                    <span>{rec.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </PanelSection>

          <PanelSection title="Fənn üzrə nəticələr" desc="Qəbul fənlərində qazandığın balların maksimuma nisbəti">
            <div className="space-y-3">
              {topics.map((t) => {
                const pct = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
                const weak = t.total > 0 && t.correct / t.total < 0.6;
                return (
                  <div key={t.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[var(--text-primary)] font-medium">{t.name}</span>
                      <span className={weak ? 'text-[var(--danger)]' : 'text-[var(--success)]'}>{t.correct}/{t.total} ({pct}%)</span>
                    </div>
                    <ProgressBar value={pct} colorClass={weak ? 'bg-[var(--danger)]' : 'bg-[var(--success)]'} />
                  </div>
                );
              })}
            </div>
          </PanelSection>
        </Panel>
      </div>
    </div>
  );
}
