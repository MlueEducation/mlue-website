import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Necə işləyir — Mlue' };

const STEPS = [
  { title: 'Qeydiyyat və pulsuz sınaq', desc: '7 günlük risk-free giriş ilə platformanı sınaqdan keçir, kart məlumatı tələb olunmur.' },
  { title: 'Sahəni seç', desc: 'Proqramlaşdırma, dizayn, sahibkarlıq və digər istiqamətlərdən sənə uyğun olanı seç.' },
  { title: 'Öyrən və praktika et', desc: 'Video dərs, real ssenarili tapşırıq və mentor dəstəyi ilə bacarığını addım-addım inkişaf etdir.' },
  { title: 'Sertifikat və işə qəbul', desc: 'Kursu bitirdikdən sonra sertifikatını al, CV-ni hazırla və işə qəbul dəstəyindən yararlan.' },
];

export default function NeceIsleyirPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>Dörd addım. Bir istiqamət.</h1></Reveal>
          <Reveal><p>Qeydiyyatdan sertifikat və karyera dəstəyinə qədər hər addım aydın və izlənəbilir.</p></Reveal>
        </div>
      </section>
      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal className="step" key={s.title}>
                <div className="step-num">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: 48, textAlign: 'center' }}>
            <Link href="/qeydiyyat" className="btn-primary">İlk addımı at →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
