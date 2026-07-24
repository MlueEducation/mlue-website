'use client';

import { useEffect, useState } from 'react';
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

const UNIVERSITIES = [
  'Bakı Dövlət Universiteti (BDU)', 'Azərbaycan Dövlət İqtisad Universiteti (UNEC)', 'ADA University',
  'Xəzər Universiteti', 'Azərbaycan Texniki Universiteti (AzTU)', 'Azərbaycan Dövlət Neft və Sənaye Universiteti (ADNSU)',
  'Azərbaycan Tibb Universiteti (ATU)', 'Bakı Mühəndislik Universiteti (BMU)', 'Azərbaycan Dillər Universiteti (ADU)',
  'Bakı Slavyan Universiteti (BSU)', 'Azərbaycan Dövlət Pedaqoji Universiteti (ADPU)', 'Milli Aviasiya Akademiyası',
  'Azərbaycan Memarlıq və İnşaat Universiteti (AzMİU)', 'Bakı Ali Neft Məktəbi (BHOS)', 'Qafqaz Universiteti',
  'Odlar Yurdu Universiteti', 'Azərbaycan Dövlət Aqrar Universiteti', 'Azərbaycan Dövlət Mədəniyyət və İncəsənət Universiteti',
  'Azərbaycan Dövlət Bədən Tərbiyəsi və İdman Akademiyası', 'Sumqayıt Dövlət Universiteti', 'Gəncə Dövlət Universiteti',
  'Naxçıvan Dövlət Universiteti', 'Lənkəran Dövlət Universiteti', 'Digər',
];

const MAJORS = [
  'Fizika müəllimliyi', 'Riyaziyyat müəllimliyi', 'Texnologiya müəllimliyi', 'Fizika', 'Geologiya',
  'Mexanika', 'Riyaziyyat', 'Aerokosmik mühəndislik', 'Aqromühəndislik',
  'Aviasiya təhlükəsizliyi mühəndisliyi', 'Cihaz mühəndisliyi', 'Dəniz naviqasiyası mühəndisliyi',
  'Ekologiya mühəndisliyi', 'Elektrik və elektronika mühəndisliyi', 'Energetika mühəndisliyi',
  'Gəmi energetik qurğularının istismarı mühəndisliyi', 'Gəmiqayırma və gəmi təmiri mühəndisliyi',
  'Geologiya və geofizika mühəndisliyi', 'Geomatika və geodeziya mühəndisliyi',
  'Hava nəqliyyatının hərəkətinin təşkili', 'Həyat fəaliyyətinin təhlükəsizliyi mühəndisliyi',
  'İnşaat mühəndisliyi', 'Kimya mühəndisliyi', 'Kommunikasiya sistemləri mühəndisliyi',
  'Logistika və nəqliyyat texnologiyaları mühəndisliyi', 'Maşın mühəndisliyi',
  'Materiallar mühəndisliyi', 'Mədən mühəndisliyi', 'Meliorasiya mühəndisliyi', 'Memarlıq',
  'Metallurgiya mühəndisliyi', 'Mühəndis fizikası', 'Neft-qaz mühəndisliyi',
  'Nəqliyyat mühəndisliyi', 'Nəqliyyat tikintisi mühəndisliyi', 'Qida mühəndisliyi',
  'Radiotexnika və telekommunikasiya mühəndisliyi', 'Şəhərsalma', 'Sənaye mühəndisliyi',
  'Uçuş mühəndisliyi', 'Yanğın təhlükəsizliyi mühəndisliyi', 'Aqronomluq', 'Balıqçılıq',
  'Meşəçilik', 'Şərabçılıq', 'Torpaqşünaslıq və aqrokimya',
  'Yerquruluşu və daşınmaz əmlakın kadastrı', 'Zoomühəndislik',
  'Hərbi kompozisiya materialları mühəndisliyi', 'Hərbi rabitə vasitələri mühəndisliyi',
  'Optotexnika mühəndisliyi', 'Pirotexniki və partladıcı vasitələr mühəndisliyi',
  'Sərhəd təhlükəsizliyi və idarəetmə', 'Silah və silah sistemləri mühəndisliyi',
  'İnformatika müəllimliyi', 'Riyaziyyat və informatika müəllimliyi', 'Kompüter elmləri',
  'İnformasiya təhlükəsizliyi', 'İnformasiya texnologiyaları', 'Kompüter mühəndisliyi',
  'Mexatronika və robototexnika mühəndisliyi', 'Proseslərin avtomatlaşdırılması mühəndisliyi',
  'Sistemlər mühəndisliyi', 'Coğrafiya müəllimliyi', 'Tarix və coğrafiya müəllimliyi',
  'Sosiologiya', 'Beynəlxalq ticarət və logistika', 'Biznesin idarə edilməsi',
  'Davamlı inkişafın idarə edilməsi', 'Dövlət və bələdiyyə idarəetməsi', 'İqtisadiyyat', 'Maliyyə',
  'Marketinq', 'Menecment', 'Mühasibat', 'Statistika', 'Coğrafiya', 'Hidrometeorologiya',
  'İdman menecmenti və kommunikasiya', 'Nəqliyyatda servis', 'Turizm bələdçiliyi',
  'Turizm işinin təşkili', 'Azərbaycan dili və ədəbiyyatı müəllimliyi',
  'Dil və ədəbiyyat müəllimliyi', 'İbtidai sinif müəllimliyi', 'Korreksiyaedici təlim',
  'Məktəbəqədər təhsil', 'Tarix müəllimliyi', 'Təhsildə sosial-psixoloji xidmət',
  'Xarici dil müəllimliyi', 'Dinşünaslıq', 'Dövlət və ictimai münasibətlər', 'Fəlsəfə',
  'Filologiya', 'Hüquqşünaslıq', 'İslamşünaslıq', 'Jurnalistika',
  'Kitabxanaçılıq və informasiya fəaliyyəti', 'Politologiya', 'Tarix', 'Tərcümə',
  'Bədii yaradıcılıq və ekran dramaturgiyası', 'Muzey, arxiv işi və abidələrin qorunması',
  'Sənətşünaslıq', 'Sosial iş', 'İctimai təhlükəsizlik və idarəetmə', 'Beynəlxalq münasibətlər',
  'Regionşünaslıq', 'Biologiya müəllimliyi', 'Kimya müəllimliyi', 'Kimya və biologiya müəllimliyi',
  'Psixologiya', 'Biologiya', 'Ekologiya', 'Kimya', 'Bağçılıq və tərəvəzçilik',
  'Baytarlıq təbabəti', 'Bitki mühafizəsi', 'Su bioehtiyatları və akvakultura',
  'Bədən tərbiyəsi və idmanda reabilitasiya', 'Fizioterapiya və tibbi reabilitasiya', 'Əczaçılıq',
  'Tibb bacısı işi', 'Hərbi tibb', 'İctimai səhiyyə', 'Stomatologiya', 'Tibb', 'Biotexnologiya',
  'Fiziki tərbiyə və çağırışaqədərki hazırlıq müəllimliyi', 'Musiqi müəllimliyi',
  'Təsviri incəsənət müəllimliyi', 'Aktyor sənəti', 'Bəstəkarlıq', 'Dekorativ-tətbiqi sənət',
  'Dirijorluq', 'Dizayn', 'Heykəltəraşlıq', 'İnstrumental ifaçılıq', 'Musiqişünaslıq',
  'Operator sənəti', 'Populyar musiqi və caz ifaçılığı', 'Qrafika', 'Rejissorluq', 'Rəngkarlıq',
  'Vokal sənəti', 'Xoreoqrafiya sənəti', 'Məşqçilik', 'Adaptiv bədən tərbiyəsi',
  'Kütləvi sağlamlaşdırıcı idman', 'Ümumi fiziki hazırlıq',
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

// Real DİM (Dövlət İmtahan Mərkəzi) bakalavriat ixtisas qrupları və fənləri.
// Bütün qruplarda ortaq buraxılış fənləri: Azərbaycan dili, Riyaziyyat, Xarici dil.
// I və III qruplarda əlavə olaraq altqruplar var (fərqli qəbul fənləri ilə).
const COMMON_SUBJECTS = ['Azərbaycan dili', 'Riyaziyyat', 'Xarici dil'];
const DIM_GROUPS = [
  {
    id: 'I',
    desc: 'Mühəndislik, texnika, IT və təbiət elmləri üçün',
    subgroups: [
      { name: 'Riyaziyyat-kimya (RK)', subjects: ['Riyaziyyat', 'Fizika', 'Kimya'] },
      { name: 'Riyaziyyat-informatika (Rİ)', subjects: ['Riyaziyyat', 'Fizika', 'İnformatika'] },
    ],
  },
  {
    id: 'II',
    desc: 'İqtisadiyyat, maliyyə, menecment, turizm üçün',
    subjects: ['Riyaziyyat', 'Coğrafiya', 'Tarix'],
  },
  {
    id: 'III',
    desc: 'Hüquq, jurnalistika, dilçilik, pedaqoji ixtisaslar üçün',
    subgroups: [
      { name: 'Dil-tarix (DT)', subjects: ['Tarix', 'Az. dili və ədəbiyyatı', 'Ədəbiyyat'] },
      { name: 'Tarix-coğrafiya (TC)', subjects: ['Tarix', 'Az. dili və ədəbiyyatı', 'Coğrafiya'] },
    ],
  },
  {
    id: 'IV',
    desc: 'Tibb, əczaçılıq, biologiya, kənd təsərrüfatı üçün',
    subjects: ['Biologiya', 'Kimya', 'Fizika'],
  },
  {
    id: 'V',
    desc: 'İncəsənət, musiqi, dizayn, idman ixtisasları üçün',
    subjects: ['Əsas fənn (ixtisasa görə)', 'Qabiliyyət imtahanı'],
  },
];

/* ---------------- UI helpers ---------------- */
const STEP2_META = {
  student: { title: 'Təhsil məlumatların', desc: 'Universitetini və ixtisasını seç ki, sənə uyğun tövsiyələr hazırlayaq.' },
  applicant: { title: 'DİM ixtisas qrupun', desc: 'Qəbul imtahanında iştirak edəcəyin qrupu seç.' },
  professional: { title: 'Maraq sahən', desc: 'Karyerada hansı istiqamətdə inkişaf etmək istəyirsən?' },
  teacher: { title: 'Tədris etdiyin fənn', desc: 'Hansı fənni tədris etdiyini seç ki, sənə uyğun materiallar tövsiyə edək.' },
};

function ChoiceCard({ active, onClick, icon, title, desc }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border transition-all w-full p-6 ${
        active
          ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
          : 'border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)]'
      }`}
      style={{ boxShadow: active ? 'var(--shadow-md)' : 'none' }}
    >
      {icon && (
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3.5 transition-colors ${
            active ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-surface-2)]'
          }`}
        >
          {icon}
        </div>
      )}
      <div className="text-base font-bold text-[var(--text-primary)] mb-1">{title}</div>
      {desc && <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</div>}
    </button>
  );
}

function StepDots({ step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2].map((n) => (
        <span
          key={n}
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: step === n ? 28 : 16,
            background: step >= n ? 'var(--accent)' : 'var(--border)',
          }}
        />
      ))}
    </div>
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
        className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-hover)]"
      />
      {open && (
        <div
          className="absolute z-20 mt-2 w-full max-h-56 overflow-y-auto bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-[var(--text-secondary)]">Nəticə tapılmadı</div>
          )}
          {filtered.map((opt) => (
            <button
              key={opt}
              type="button"
              onMouseDown={() => { onChange(opt); setOpen(false); }}
              className="block w-full text-left px-4 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--accent-soft)]"
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

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(null);
  const [university, setUniversity] = useState(UNIVERSITIES[0]);
  const [major, setMajor] = useState('');
  const [dimGroup, setDimGroup] = useState(null);
  const [interest, setInterest] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/giris');
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Yüklənir...</p>
      </div>
    );
  }

  const canSubmit =
    status === 'student' ? !!(university && major) :
    status === 'applicant' ? !!dimGroup :
    status === 'professional' ? !!interest :
    status === 'teacher' ? !!teacherSubject :
    false;

  function selectStatus(id) {
    setStatus(id);
    setStep(2);
    setSaveError('');
  }

  async function handleSubmit() {
    setSaving(true);
    setSaveError('');
    const specialization =
      status === 'student' ? major :
      status === 'applicant' ? `${dimGroup} qrup` :
      status === 'teacher' ? teacherSubject :
      null;

    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: user.user_metadata?.full_name || null,
      role: status,
      university: status === 'student' ? university : null,
      major: specialization,
      interests: status === 'professional' ? [interest] : [],
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Onboarding save failed:', error);
      setSaveError('Yadda saxlanılmadı — zəhmət olmasa yenidən cəhd et. (' + error.message + ')');
      setSaving(false);
      return;
    }

    router.push('/profil');
  }

  const meta = status ? STEP2_META[status] : null;

  return (
    <div className="onboard-page min-h-[calc(100vh-var(--header-h))] bg-[var(--bg-page)] px-6 py-14 flex items-start justify-center">
      <div
        className="onboard-card w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-8 sm:p-10"
        style={{ maxWidth: 640, boxShadow: 'var(--shadow-lg)' }}
      >
        <StepDots step={step} />

        {step === 1 && (
          <div key="step1" className="onboard-fade">
            <div className="mb-9 text-center">
              <div className="text-2xl font-extrabold text-[var(--text-primary)] mb-2">Xoş gəldin! 👋</div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">Sənə uyğun karyera planı qurmaq üçün cəmi bir sürətli sualımız var.</p>
            </div>

            <div className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)] mb-4">Hazırkı statusun</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {STATUS_OPTIONS.map((s) => (
                <ChoiceCard
                  key={s.id}
                  active={status === s.id}
                  onClick={() => selectStatus(s.id)}
                  icon={s.icon}
                  title={s.title}
                  desc={s.desc}
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && meta && (
          <div key="step2" className="onboard-fade">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6"
            >
              ← Geri
            </button>

            <div className="mb-8">
              <div className="text-xl font-extrabold text-[var(--text-primary)] mb-1.5">{meta.title}</div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{meta.desc}</p>
            </div>

            {/* Student: university + searchable major */}
            {status === 'student' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1.5 block">Universitet</label>
                  <select
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                  >
                    {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)] mb-1.5 block">İxtisas (axtarmaq üçün yaz)</label>
                  <SearchableSelect options={MAJORS} value={major} onChange={setMajor} placeholder="məs. Kompüter Elmləri" />
                </div>
              </div>
            )}

            {/* Applicant: DİM group */}
            {status === 'applicant' && (
              <div>
                <p className="text-xs text-[var(--text-tertiary)] mb-5">
                  Bütün qruplarda ortaq buraxılış fənləri: <b className="text-[var(--text-secondary)]">{COMMON_SUBJECTS.join(', ')}</b>
                </p>
                <div className="space-y-3">
                  {DIM_GROUPS.map((g) => {
                    const subjectGroups = g.subgroups || [{ name: null, subjects: g.subjects }];
                    const active = dimGroup === g.id;
                    return (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => setDimGroup(g.id)}
                        className={`w-full text-left rounded-2xl border p-5 transition-all ${
                          active
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                            : 'border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)]'
                        }`}
                        style={{ boxShadow: active ? 'var(--shadow-md)' : 'none' }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center text-sm font-extrabold ${
                              active ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-surface-2)] text-[var(--text-primary)]'
                            }`}
                          >
                            {g.id}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-[var(--text-primary)]">{g.id} qrup</div>
                            <div className="text-xs text-[var(--text-secondary)]">{g.desc}</div>
                          </div>
                        </div>
                        <div className="space-y-2 mt-3">
                          {subjectGroups.map((sg) => (
                            <div key={sg.name || 'x'} className="flex flex-wrap items-center gap-1.5">
                              {sg.name && <span className="text-[11px] font-bold text-[var(--accent)] mr-0.5">{sg.name}:</span>}
                              {sg.subjects.map((sub) => (
                                <span key={sub} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-secondary)]">
                                  {sub}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Professional: searchable interest */}
            {status === 'professional' && (
              <SearchableSelect options={INTERESTS} value={interest} onChange={setInterest} placeholder="məs. Frontend Development" />
            )}

            {/* Teacher: searchable subject */}
            {status === 'teacher' && (
              <SearchableSelect options={TEACHER_SUBJECTS} value={teacherSubject} onChange={setTeacherSubject} placeholder="məs. Riyaziyyat müəllimi" />
            )}

            {saveError && (
              <div className="mt-6 text-sm font-medium text-[var(--danger)] bg-[var(--danger-10)] border border-[var(--danger-30)] rounded-lg px-4 py-3">
                {saveError}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || saving}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors mt-8"
            >
              {saving ? 'Hazırlanır...' : 'Mənim Ana Səhifəmi Yarat'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
