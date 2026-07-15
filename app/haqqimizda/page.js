import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Haqqımızda — Mlue' };

export default function HaqqimizdaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>Rəqəmsal təhsili hər kəs üçün əlçatan etmək istəyirik</h1></Reveal>
          <Reveal><p>Mlue, Azərbaycan bazarı üçün tam lokallaşdırılmış onlayn təhsil, peşə hazırlığı və karyera inkişafı platformasıdır.</p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="compare" style={{ gridTemplateColumns: '1fr' }}>
            <Reveal>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75, maxWidth: 720 }}>
                Məqsədimiz gənclərə rəqabətədavamlı bacarıqlar qazandırmaq, universitet–şirkət–tələbə əlaqəsini gücləndirmək və rəqəmsal təhsili hər kəs üçün əlçatan etməkdir. Bunun üçün yüksək keyfiyyətli video dərslər, praktiki tapşırıqlar, mentor dəstəyi, sertifikatlaşdırma və işə qəbul yönləndirməsini tək platformada birləşdiririk.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats" style={{ borderTop: 'none', justifyContent: 'flex-start', gap: 64 }}>
            <Reveal className="stat"><b>3 dil</b><span>AZ · TR · RU</span></Reveal>
            <Reveal className="stat"><b>9.99 ₼-dən</b><span>kurs başına qiymət</span></Reveal>
            <Reveal className="stat"><b>1.8M+</b><span>hədəf gənc auditoriya (18–35 yaş)</span></Reveal>
            <Reveal className="stat"><b>10–15K</b><span>hədəf aktiv istifadəçi (ilk il)</span></Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="waitlist">
            <div className="orb"></div>
            <div className="waitlist-inner">
              <h2>Bizimlə yol gəl</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 28 }}>Erkən qeydiyyatdan keç, gələcəyin təhsilinin bir hissəsi ol.</p>
              <Link href="/qeydiyyat" className="btn-primary">Qeydiyyatdan keç</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
