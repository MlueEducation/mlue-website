'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';

/* ---------------- Data ---------------- */
const STATUS_OPTIONS = [
  { id: 'student', icon: '🎓', title: 'Tələbə', desc: 'Hazırda universitetdə təhsil alıram' },
  { id: 'applicant', icon: '📝', title: 'Abituriyent', desc: 'Universitetə qəbul üçün hazırlaşıram' },
  { id: 'professional', icon: '💼', title: 'Gənc Peşəkar', desc: 'İş həyatına artıq başlamışam' },
  { id: 'teacher', icon: '👨‍🏫', title: 'Müəllim', desc: 'Tədris sahəsində çalışıram' },
];

const UNIVERSITIES = ['UNEC', 'ADA University', 'Xəzər Universiteti', 'Bakı Dövlət Universiteti', 'Digər'];

const MAJORS = [
  'Kompüter Elmləri', 'Proqram Mühəndisliyi', 'İqtisadiyyat', 'Maliyyə', 'Menecment', 'Marketinq',
  'Beynəlxalq Münasibətlər', 'Hüquq', 'Jurnalistika', 'Tibb', 'Stomatologiya', 'Əczaçılıq',
  'Biologiya', 'Kimya', 'Fizika', 'Riyaziyyat', 'Memarlıq', 'Tikinti Mühəndisliyi',
  'Elektrik Mühəndisliyi', 'Neft-Qaz Mühəndisliyi', 'Qrafik Dizayn', 'Bank İşi', 'Mühasibat Uçotu',
  'Turizm və Otelçilik', 'Psixologiya', 'Pedaqogika', 'Ədəbiyyat', 'Tarix',
  'Filologiya (Xarici Dillər)', 'Sənaye Mühəndisliyi',
];

const INTERESTS = [
  'Frontend Development', 'Backend Development', 'Mobil Tətbiq İnkişafı', 'Data Analitikası',
  'Süni İntellekt / Maşın Öyrənməsi', 'UI/UX Dizayn', 'Qrafik Dizayn', 'Rəqəmsal Marketinq',
  'SMM (Sosial Media Marketinqi)', 'E-ticarət', 'Məhsul İdarəetməsi', 'Layihə İdarəetməsi',
  'Satış (Sales)', 'Müştəri Xidmətləri', 'HR / İnsan Resursları', 'Mühasibatlıq',
  'Maliyyə Analitikası', 'Bank və Sığorta', 'Hüquq Məsləhəti', 'Konsaltinq', 'Loqistika',
  'Anbar İdarəetməsi', 'Kibertəhlükəsizlik', 'Şəbəkə Administrasiyası', 'Cloud/DevOps',
  'Video Montaj', 'Kontent Yaratma', 'Copywriting', 'Turizm Menecmenti', 'Sahibkarlıq / Startap',
];

const TEACHER_SUBJECTS = [
  'Riyaziyyat müəllimi', 'Fizika müəllimi', 'Kimya müəllimi', 'Biologiya müəllimi',
  'İnformatika müəllimi', 'Azərbaycan dili və ədəbiyyat müəllimi', 'İngilis dili müəllimi',
  'Rus dili müəllimi', 'Alman dili müəllimi', 'Fransız dili müəllimi', 'Tarix müəllimi',
  'Coğrafiya müəllimi', 'Həyat bilgisi müəllimi', 'Musiqi müəllimi', 'Təsviri incəsənət müəllimi',
  'Bədən tərbiyəsi müəllimi', 'Texnologiya müəllimi', 'İbtidai sinif müəllimi',
  'Məktəbəqədər təhsil müəllimi', 'Defektoloq / Loqoped', 'Məktəb psixoloqu', 'Sosial pedaqoq',
  'Hərbi hazırlıq müəllimi', 'Astronomiya müəllimi', 'Etika müəllimi', 'Robototexnika müəllimi',
  'Şahmat müəllimi', 'Xüsusi təhsil müəllimi', 'Karyera məsləhətçisi', 'Tədris işləri üzrə direktor müavini',
];

// Real DİM (Dövlət İmtahan Mərkəzi) bakalavriat ixtisas qrupları
const DIM_GROUPS = [
  { id: 'I', subjects: ['Riyaziyyat', 'Fizika', 'Kimya/İnformatika'], desc: 'Mühəndislik, IT, təbii elmlər üçün' },
  { id: 'II', subjects: ['Riyaziyyat', 'Coğrafiya', 'Azərbaycan dili'], desc: 'Maliyyə, iqtisadiyyat, menecment üçün' },
  { id: 'III', subjects: ['Tarix', 'Azərbaycan dili', 'Ədəbiyyat/Coğrafiya'], desc: 'Hüquq, jurnalistika, dilçilik üçün' },
  { id: 'IV', subjects: ['Biologiya', 'Kimya', 'Fizika'], desc: 'Tibb, əczaçılıq, biotexnologiya üçün' },
  { id: 'V', subjects: ['Əsas fənn', 'Qabiliyyət imtahanı'], desc: 'Aktyor sənəti, dizayn, musiqi üçün' },
];

/* ---------------- UI helpers ---------------- */
function ChoiceCard({ active, onClick, icon, title, desc }) {
  return (
    <button
      type="button"
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

function SearchableSelect({ options, value, onChange, placeholder }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative">
      <input
        value={open ? query : value || ''}
        onChange={(e) => { setQuery(e.target.value); onChange(''); }}
        onFocus={() => { setQuery(''); setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className="w-full bg-[var(--bg-surface)] border border-[var(--border-dark)] rounded-lg px-4 py-3 text-sm text-[var(--text-bright)] focus:outline-none focus:border-[var(--brand-purple-hover)]"
      />
      {open && (
        <div
          className="absolute z-20 mt-2 w-full max-h-56 overflow-y-auto bg-[var(--bg-surface)] border border-[var(--border-dark)] rounded-lg"
          style={{ boxShadow: 'var(--card-shadow)' }}
        >
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-[var(--text-muted)]">Nəticə tapılmadı</div>
          )}
          {filtered.map((opt) => (
            <button
              key={opt}
              type="button"
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-sm text-[var(--text-bright)] hover:bg-[var(--purple-10)]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [status, setStatus] = useState(null);
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [major, setMajor] = useState('');
  const [dimGroup, setDimGroup] = useState(null);
  const [interest, setInterest] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
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

  const canSubmit =
    status === 'student' ? !!(university && major) :
    status === 'applicant' ? !!dimGroup :
    status === 'professional' ? !!interest :
    status === 'teacher' ? !!teacherSubject :
    false;

  async function handleSubmit() {
    setSaving(true);
    const specialization =
      status === 'student' ? major :
      status === 'applicant' ? `${dimGroup} qrup` :
      status === 'teacher' ? teacherSubject :
      null;

    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: user.user_metadata?.full_name || null,
      role: status,
      university: status === 'student' ? university : null,
      major: specialization,
      interests: status === 'professional' ? [interest] : [],
      updated_at: new Date().toISOString(),
    });
    router.push('/profil');
  }

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[var(--bg-page)] px-6 py-16">
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="mb-10 text-center">
          <div className="text-2xl font-extrabold text-[var(--text-bright)] mb-2">Xoş gəldin! 👋</div>
          <p className="text-[var(--text-muted)] text-sm">Sənə uyğun karyera planı qurmaq üçün bir neçə sürətli sualımız var.</p>
        </div>

        {/* Status */}
        <div className="mb-10">
          <div className="text-lg font-bold text-[var(--text-bright)] mb-4">Hazırkı statusun</div>
          <div className="grid sm:grid-cols-2 gap-4">
            {STATUS_OPTIONS.map((s) => (
              <ChoiceCard
                key={s.id}
                active={status === s.id}
                onClick={() => setStatus(s.id)}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
              />
            ))}
          </div>
        </div>

        {/* Student: university + searchable major */}
        {status === 'student' && (
          <div className="mb-10">
            <div className="text-lg font-bold text-[var(--text-bright)] mb-4">Təhsil məlumatların</div>
            <div className="grid sm:grid-cols-2 gap-4">
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
                <label className="text-xs text-[var(--text-muted)] mb-1 block">İxtisas (axtarmaq üçün yaz)</label>
                <SearchableSelect options={MAJORS} value={major} onChange={setMajor} placeholder="məs. Kompüter Elmləri" />
              </div>
            </div>
          </div>
        )}

        {/* Applicant: DİM group */}
        {status === 'applicant' && (
          <div className="mb-10">
            <div className="text-lg font-bold text-[var(--text-bright)] mb-1">DİM ixtisas qrupun</div>
            <p className="text-sm text-[var(--text-muted)] mb-4">Qəbul imtahanında iştirak edəcəyin qrupu seç</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {DIM_GROUPS.map((g) => (
                <ChoiceCard
                  key={g.id}
                  active={dimGroup === g.id}
                  onClick={() => setDimGroup(g.id)}
                  icon="📚"
                  title={`${g.id} qrup`}
                  desc={`${g.subjects.join(' · ')} — ${g.desc}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Professional: searchable interest */}
        {status === 'professional' && (
          <div className="mb-10">
            <div className="text-lg font-bold text-[var(--text-bright)] mb-4">Maraq sahən</div>
            <SearchableSelect options={INTERESTS} value={interest} onChange={setInterest} placeholder="məs. Frontend Development" />
          </div>
        )}

        {/* Teacher: searchable subject */}
        {status === 'teacher' && (
          <div className="mb-10">
            <div className="text-lg font-bold text-[var(--text-bright)] mb-4">Tədris etdiyin fənn</div>
            <SearchableSelect options={TEACHER_SUBJECTS} value={teacherSubject} onChange={setTeacherSubject} placeholder="məs. Riyaziyyat müəllimi" />
          </div>
        )}

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
