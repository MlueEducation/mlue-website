import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { PRO_MONTHLY_PRICE } from '@/lib/proSubscription';

export const metadata = { title: 'MLUE Pro — Mlue' };

const FEATURES = [
  '🤖 Meagle AI köməkçidən limitsiz istifadə',
  '💼 Yeni iş elanlarını 48 saat əvvəl gör',
  '⚡ Bütün fəaliyyətlərdən 1.2x təcrübə xalı (XP)',
  '👑 Liderlik lövhəsində Pro nişanı və parlaq çərçivə',
];

export default function ProLandingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>MLUE Pro</h1></Reveal>
          <Reveal><p>Alət səviyyəli abunəlik — kurs deyil, bütün platformanı gücləndirən üstünlüklər paketi.</p></Reveal>
        </div>
      </section>
      <section style={{ paddingTop: 24, paddingBottom: 64 }}>
        <div className="container">
          <div className="price-grid" style={{ maxWidth: 420, margin: '0 auto' }}>
            <Reveal className="price-card highlight">
              <div className="price-tag">MLUE Pro</div>
              <div className="price-amount"><b>₼{PRO_MONTHLY_PRICE}</b><span>/ ay</span></div>
              <div className="price-note">İstənilən vaxt ləğv et</div>
              <ul>
                {FEATURES.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Link href="/profil?tab=pro" className="btn-primary">Pro-ya keç</Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
