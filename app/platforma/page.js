import Reveal from '@/components/Reveal';

export const metadata = { title: 'Platforma — Mlue' };

const FEATURES = [
  { title: 'Studio keyfiyyətində dərslər', desc: 'Peşəkar çəkiliş və dublyaj ilə hazırlanmış video kurslar.', icon: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5 16 12 10 15.5Z" fill="currentColor" stroke="none" /></> },
  { title: 'AI əsaslı fərdiləşdirmə', desc: 'Süni intellekt sənin sürətinə və səviyyənə uyğun tədris yolu qurur.', icon: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></> },
  { title: 'Canlı mentor dəstəyi', desc: 'Sahə mütəxəssislərindən birbaşa geri bildirim və istiqamətləndirmə.', icon: <path d="M4 19V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4Z" /> },
  { title: 'Praktiki tapşırıqlar', desc: 'Real ssenarilər üzərində iş üçün lazım olan bacarıqları məşq et.', icon: <><rect x="4" y="8" width="16" height="11" rx="2" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></> },
  { title: 'Tanınan sertifikatlar', desc: 'Tərəfdaş şirkətlərlə tanınma məqsədilə hazırlanmış sertifikat proqramı.', icon: <><circle cx="12" cy="9" r="5" /><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" /></> },
  { title: 'Karyera marşrutu + CV generator', desc: 'Addım-addım karyera planı və avtomatik CV hazırlama aləti.', icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></> },
  { title: 'Müsahibəyə hazırlıq', desc: 'Simulyasiya edilmiş müsahibələrlə özünə inam qazan.', icon: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4M9 22h6" /></> },
  { title: '3 dildə məzmun', desc: 'Azərbaycan, Türk və Rus dillərində tam lokallaşdırılmış kurslar.', icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></> },
];

export default function PlatformaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>Öyrənmədən işə qəbula qədər hər mərhələ bir yerdə</h1></Reveal>
          <Reveal><p>Mlue sənə yalnız dərs deyil, irəliləmək üçün lazım olan tam sistemi təqdim edir — video dərslərdən mentorluğa, praktikadan işə qəbul dəstəyinə qədər.</p></Reveal>
        </div>
      </section>
      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="feat-grid">
            {FEATURES.map((f) => (
              <Reveal className="feat-card" key={f.title}>
                <div className="feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{f.icon}</svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
