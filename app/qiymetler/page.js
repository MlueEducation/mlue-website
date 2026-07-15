import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Qiymətlər — Mlue' };

export default function QiymetlerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>Sadə. Əlçatan. Şəffaf.</h1></Reveal>
          <Reveal><p>Abunə deyil, kurs əsaslı model — yalnız öyrəndiyin üçün ödə. Qiymət kursdan kursa dəyişə bilər.</p></Reveal>
        </div>
      </section>
      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="price-grid">
            <Reveal className="price-card">
              <div className="plan">Pulsuz Sınaq</div>
              <div className="price-amount"><b>0 ₼</b><span>/ 7 gün</span></div>
              <div className="price-note">Kart məlumatı tələb olunmur</div>
              <ul>
                <li>Seçilmiş dərslərə giriş</li>
                <li>Platformanı sınamaq imkanı</li>
                <li>İstənilən vaxt ləğv et</li>
              </ul>
              <Link href="/qeydiyyat" className="btn-secondary">Pulsuz Başla</Link>
            </Reveal>
            <Reveal className="price-card highlight">
              <div className="price-tag">Ən çox seçilən</div>
              <div className="plan">Standart Kurs</div>
              <div className="price-amount"><b>9.99 ₼</b><span>-dən / kurs</span></div>
              <div className="price-note">Qiymət kursdan kursa dəyişə bilər</div>
              <ul>
                <li>Kursa tam giriş</li>
                <li>Praktiki tapşırıqlar</li>
                <li>Sertifikat daxildir</li>
                <li>Mentor dəstəyi seçimi</li>
              </ul>
              <Link href="/qeydiyyat" className="btn-primary">Qeydiyyatdan keç</Link>
            </Reveal>
          </div>
          <Reveal style={{ maxWidth: 620, margin: '48px auto 0', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6 }}>
              Qiymətlər hazırda ilkin qiymətləndirmə mərhələsindədir və platforma açıldıqca kursa görə fərqləndirilə bilər. Erkən qeydiyyatdan keçənlər üçün xüsusi endirimlər planlaşdırılır.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
