import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand">
              <img src="/mlue-icon.png" alt="" className="brand-icon" />
              <img src="/mlue-wordmark.png" alt="Mlue" className="brand-word-img" />
            </Link>
            <p className="footer-tagline">Azərbaycan gəncləri üçün yeni nəsil rəqəmsal təhsil və karyera platforması.</p>
          </div>
          <div className="footer-links">
            <Link href="/platforma">Platforma</Link>
            <Link href="/nece-isleyir">Necə işləyir</Link>
            <Link href="/qiymetler">Qiymətlər</Link>
            <Link href="/terefdasliq">Tərəfdaşlıq</Link>
            <Link href="/haqqimizda">Haqqımızda</Link>
          </div>
          <div className="footer-links">
            <Link href="/qeydiyyat">Qeydiyyat</Link>
            <Link href="/giris">Giriş</Link>
            <Link href="/erken-giris">Erkən çıxış</Link>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Mlue. Bütün hüquqlar qorunur. · Bakı, Azərbaycan</div>
      </div>
    </footer>
  );
}
