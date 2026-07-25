'use client';

import { useMemo } from 'react';
import { Panel, PanelSection, PageHeader, StatTile, ProgressBar } from '@/components/ProfileUI';
import MeagleAvatar from '@/components/MeagleAvatar';
import CourseThumb from '@/components/CourseThumb';

const MOCK_EXAM_RESULT = {
  examTitle: 'DİM Sınaq İmtahanı #4 — Riyaziyyat-informatika (Rİ)',
  date: '18 iyul 2026',
  totalScore: 612,
  maxScore: 700,
  topics: [
    { name: 'İnteqrallar', correct: 3, total: 10 },
    { name: 'Törəmə', correct: 7, total: 10 },
    { name: 'Triqonometriya', correct: 4, total: 8 },
    { name: 'Ehtimal nəzəriyyəsi', correct: 8, total: 10 },
    { name: 'Alqoritmlər', correct: 6, total: 10 },
    { name: 'Elektromaqnetizm', correct: 5, total: 10 },
  ],
};

const RECOMMENDATIONS_BY_TOPIC = {
  'İnteqrallar': { categoryId: 'math', title: 'Kalkulusun Əsasları', level: 'İrəli', duration: '7 həftə' },
  'Triqonometriya': { categoryId: 'math', title: 'Xətti Cəbrə Giriş', level: 'Orta', duration: '6 həftə' },
  'Alqoritmlər': { categoryId: 'cs', title: 'Alqoritmlər və Data Strukturları', level: 'Orta', duration: '8 həftə' },
  'Elektromaqnetizm': { categoryId: 'physics', title: 'Fizikaya Giriş: Klassik Mexanika', level: 'Başlanğıc', duration: '5 həftə' },
};
const DEFAULT_RECOMMENDATIONS = [
  { categoryId: 'math', title: 'Ehtimal Nəzəriyyəsi və Statistika', level: 'Orta', duration: '6 həftə' },
  { categoryId: 'personal', title: 'Vaxt İdarəetməsi və Məhsuldarlıq', level: 'Başlanğıc', duration: '3 həftə' },
  { categoryId: 'cs', title: 'Kompüter Elmlərinin Əsasları', level: 'Başlanğıc', duration: '5 həftə' },
];

export default function ExamAnalysisPanel() {
  const { examTitle, date, totalScore, maxScore, topics } = MOCK_EXAM_RESULT;

  const weakTopics = useMemo(
    () => topics.filter((t) => t.correct / t.total < 0.6).sort((a, b) => a.correct / a.total - b.correct / b.total).slice(0, 2),
    [topics]
  );

  const recommendations = useMemo(() => {
    const fromWeak = weakTopics.map((t) => RECOMMENDATIONS_BY_TOPIC[t.name]).filter(Boolean);
    const combined = [...fromWeak];
    for (const rec of DEFAULT_RECOMMENDATIONS) {
      if (combined.length >= 3) break;
      if (!combined.some((r) => r.title === rec.title)) combined.push(rec);
    }
    return combined.slice(0, 3);
  }, [weakTopics]);

  const meagleMessage =
    weakTopics.length > 0
      ? `Sən ${weakTopics.map((t) => t.name).join(' və ')} mövzusunda çətinlik çəkmisən — bu materialları nəzərdən keçirməyini tövsiyə edirəm:`
      : 'Təbriklər — bütün mövzularda güclü nəticə göstərmisən! Səviyyəni saxlamaq üçün bu kursları da nəzərdən keçirə bilərsən:';

  return (
    <div>
      <PageHeader sub="Son sınaq imtahanının təhlili və Meagle-in tövsiyələri">Sınaq Nəticələri</PageHeader>
      <div className="space-y-5">
        <div>
          <div className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{examTitle}</div>
          <div className="text-xs text-[var(--text-tertiary)] mb-4">{date}</div>
          <div className="grid grid-cols-2 gap-4">
            <StatTile label="Nəticə" value={`${totalScore} / ${maxScore}`} icon="📊" tone="accent" />
            <StatTile label="Faiz" value={`${Math.round((totalScore / maxScore) * 100)}%`} icon="✅" tone="success" />
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

          <PanelSection title="Mövzu üzrə nəticələr" desc="Hər mövzuda düzgün cavablanan sualların nisbəti">
            <div className="space-y-3">
              {topics.map((t) => {
                const pct = Math.round((t.correct / t.total) * 100);
                const weak = t.correct / t.total < 0.6;
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
