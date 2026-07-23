import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AppMockup from '@/components/AppMockup';
import HomeSearch from '@/components/HomeSearch';

const COURSES = [
  { tag: 'Backend', title: 'Node.js və Express.js ilə Backend Arxitekturası', desc: 'Server tərəfi inkişafın əsaslarından production-ready API-lərə qədər.' },
  { tag: 'E-ticarət', title: 'Qlobal E-ticarət İdarəetməsi və Çoxkanallı Satış', desc: 'Onlayn mağaza qurmaqdan çoxkanallı satış strategiyasına qədər.' },
  { tag: 'Dizayn', title: 'UI/UX Dizayn Əsasları', desc: 'İstifadəçi tədqiqatından interaktiv prototipə qədər tam proses.' },
  { tag: 'Maliyyə', title: 'Makroiqtisadiyyat və Maliyyə Analizi', desc: 'İqtisadi göstəricilərdən maliyyə qərarlarına qədər praktiki yanaşma.' },
];

const FEATURES = [
  {
    title: 'Studio keyfiyyətində dərslər',
    desc: 'Peşəkar çəkiliş və dublyaj ilə hazırlanmış, standartlaşdırılmış istehsal keyfiyyətinə malik video kurslar.',
    icon: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5 16 12 10 15.5Z" fill="currentColor" stroke="none" /></>,
  },
  {
    title: 'AI əsaslı fərdiləşdirmə',
    desc: 'Süni intellekt sürətinə və səviyyənə uyğun tədris yolu qurur.',
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></>,
  },
  {
    title: 'Canlı mentor dəstəyi',
    desc: 'Sahə mütəxəssislərindən birbaşa geri bildirim və istiqamətləndirmə.',
    icon: <path d="M4 19V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-5 4Z" />,
  },
  {
    title: 'Praktiki tapşırıqlar',
    desc: 'Real ssenarilər üzərində iş üçün lazım olan bacarıqları məşq et.',
    icon: <><rect x="4" y="8" width="16" height="11" rx="2" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="orb"></div>
        <div className="hero-inner">
          <div className="badge"><span className="dot"></span>Tezliklə açılır — Azərbaycan üçün yeni nəsil təhsil</div>
          <h1 className="hero-title">Bacarığını qur,<br /><span className="accent">karyeranı</span> Mlue ilə inşa et</h1>
          <p>Video dərslər, praktiki tapşırıqlar, mentor dəstəyi və süni intellekt əsaslı fərdiləşdirmə — hamısı Azərbaycan, Türk və Rus dillərində, bir platformada. Öyrən, sınaqdan keç, sertifikat al və işə qəbula hazır ol.</p>
          <div className="cta-row">
            <Link href="/qeydiyyat" className="btn-primary">Qeydiyyatdan keç</Link>
            <Link href="/haqqimizda" className="btn-secondary">Missiyamızı oxu →</Link>
          </div>
          <div className="stats">
            <div className="stat"><b>3 dil</b><span>AZ · TR · RU</span></div>
            <div className="stat"><b>9.99 ₼-dən</b><span>kurs başına qiymət</span></div>
            <div className="stat"><b>1.8M+</b><span>hədəf gənc auditoriya</span></div>
          </div>
        </div>
        <Reveal className="hero-visual" delay={200}>
          <AppMockup />
        </Reveal>
      </section>

      <section style={{ padding: 0 }}>
        <div className="container">
          <Reveal className="social-proof">
            <div className="social-proof-title">Ən yaxşı universitetlər və şirkətlərlə birlikdə öyrənin</div>
            <div className="social-proof-row">
              <span>UNEC</span><span>ADA University</span><span>Xəzər Universiteti</span>
              <span>PASHA Bank</span><span>Kapital Bank</span><span>Azercell</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="value-grid">
            <Reveal className="value-item">
              <div className="value-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" /></svg></div>
              <h3>Yeni bacarıqlar öyrən</h3>
              <p>Sənayenin real ehtiyaclarına uyğun qurulmuş kurslar və praktiki tapşırıqlar.</p>
            </Reveal>
            <Reveal className="value-item">
              <div className="value-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="9" r="5" /><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" /></svg></div>
              <h3>Dəyərli sertifikatlar qazan</h3>
              <p>Tərəfdaş şirkətlərlə tanınma məqsədilə hazırlanan sertifikat proqramı.</p>
            </Reveal>
            <Reveal className="value-item">
              <div className="value-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="8" r="3" /><circle cx="17" cy="8" r="3" /><path d="M2 20c0-3 2.7-5 6-5s6 2 6 5M13 15.5c2.8.3 5 2.2 5 4.5" /></svg></div>
              <h3>Peşəkar şəbəkəni genişləndir</h3>
              <p>Mentorlar, digər öyrənənlər və tərəfdaş şirkətlərlə birbaşa əlaqə.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow reveal">Niyə Mlue</div>
          <Reveal><h2>Bazarda çatışmayanı tapdıq, ekosistem qurduq</h2></Reveal>
          <Reveal><p className="section-sub">40-dan çox mövcud yerli platforma araşdırıldı: qeyri-sabit məzmun keyfiyyəti, zəif mentor və karyera dəstəyi, yüksək qiymətlər və tək sahəyə fokuslanma ən çox rastlanan boşluqlar oldu. Mlue bunların hamısını tək ekosistemdə həll edir.</p></Reveal>
          <div className="compare">
            <Reveal className="compare-col bad">
              <h3>Bazarda nə çatışmır</h3>
              <div className="compare-item"><span className="mark">–</span>Qeyri-sabit, aşağı keyfiyyətli məzmun</div>
              <div className="compare-item"><span className="mark">–</span>Zəif mentor və karyera dəstəyi</div>
              <div className="compare-item"><span className="mark">–</span>Yüksək qiymət, aşağı əlçatanlıq</div>
              <div className="compare-item"><span className="mark">–</span>Yalnız bir sahəyə fokuslanma</div>
            </Reveal>
            <Reveal className="compare-col good">
              <h3>Mlue-də var</h3>
              <div className="compare-item"><span className="mark">✓</span>Studio keyfiyyətində, standartlaşdırılmış dərslər</div>
              <div className="compare-item"><span className="mark">✓</span>Canlı mentorluq + karyera marşrutu + CV generator</div>
              <div className="compare-item"><span className="mark">✓</span>9.99 ₼-dən başlayan sərfəli qiymət modeli</div>
              <div className="compare-item"><span className="mark">✓</span>Universitet–şirkət–tələbə tam ekosistemi</div>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow reveal">Platforma</div>
          <Reveal><h2>Öyrənmədən işə qəbula qədər hər mərhələ</h2></Reveal>
          <Reveal><p className="section-sub">Sənə yalnız dərs deyil, irəliləmək üçün tam sistem təqdim edirik.</p></Reveal>

          <div className="feat-spotlight">
            <Reveal className="feat-card spotlight">
              <div className="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{FEATURES[0].icon}</svg></div>
              <div>
                <h3>{FEATURES[0].title}</h3>
                <p>{FEATURES[0].desc}</p>
              </div>
            </Reveal>
          </div>

          <div className="feat-grid">
            {FEATURES.slice(1).map((f) => (
              <Reveal className="feat-card" key={f.title}>
                <div className="feat-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{f.icon}</svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href="/platforma" className="btn-secondary">Bütün imkanlara bax →</Link>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow reveal">Proses</div>
          <Reveal><h2>Dörd addım. Bir istiqamət.</h2></Reveal>
          <Reveal><p className="section-sub">Qeydiyyatdan sertifikat və karyera dəstəyinə qədər aydın yol.</p></Reveal>
          <div className="steps">
            <Reveal className="step"><div className="step-num">01</div><h3>Qeydiyyat və pulsuz sınaq</h3><p>7 günlük risk-free giriş ilə platformanı sınaqdan keçir.</p></Reveal>
            <Reveal className="step"><div className="step-num">02</div><h3>Sahəni seç</h3><p>Proqramlaşdırma, dizayn, sahibkarlıq və digər istiqamətlərdən birini seç.</p></Reveal>
            <Reveal className="step"><div className="step-num">03</div><h3>Öyrən və praktika et</h3><p>Video dərs, tapşırıq və mentor dəstəyi ilə bacarığını inkişaf etdir.</p></Reveal>
            <Reveal className="step"><div className="step-num">04</div><h3>Sertifikat və işə qəbul</h3><p>Sertifikatını al, CV-ni hazırla, işə qəbul dəstəyindən yararlan.</p></Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow reveal">Kurslar</div>
          <Reveal><h2>Tezliklə platformada</h2></Reveal>
          <Reveal><p className="section-sub">Növbəti mərhələdə açılacaq ilk kurslardan bir neçə nümunə.</p></Reveal>
          <div className="course-grid">
            {COURSES.map((c) => (
              <Reveal className="course-card" key={c.title}>
                <span className="course-tag">{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow reveal center">Qiymət</div>
          <Reveal className="center"><h2>Sadə və əlçatan qiymətləndirmə</h2></Reveal>
          <Reveal className="center"><p className="section-sub center">Abunə deyil, kurs əsaslı model — yalnız öyrəndiyin üçün ödə.</p></Reveal>
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
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="vision">
            <div>
              <div className="eyebrow">Regional baxış</div>
              <h2 style={{ fontSize: 28 }}>İdxalı əvəz edən, ixrac potensialı olan platforma</h2>
              <p>Tam lokallaşdırılmış məzmun sayəsində xarici platformalardan asılılığı azaldırıq. Növbəti mərhələdə regional bazarlara çıxış planlaşdırılır.</p>
              <Link href="/terefdasliq" className="btn-secondary">Tərəfdaşlıq planına bax →</Link>
            </div>
            <ul className="vision-list">
              <li>Türk və Orta Asiya bazarlarına ekspansiya</li>
              <li>Məzmunun Türkiyə türkcəsinə uyğunlaşdırılması</li>
              <li>Region ölkələri üçün AI dəstəkli lokallaşdırma</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="big-search">
            <div className="eyebrow center">Axtarış</div>
            <h2>Sənə uyğun kursu tap</h2>
            <p className="section-sub center" style={{ marginBottom: 0 }}>Sahəni, bacarığı və ya maraq dairəni yaz, sənə uyğun məzmunu göstərək.</p>
            <HomeSearch />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="waitlist">
            <div className="orb"></div>
            <div className="waitlist-inner">
              <h2>Erkən çıxışa qoşul</h2>
              <p style={{ fontSize: 15 }}>Platforma açılanda ilk bilənlərdən ol və erkən qeydiyyat endirimindən yararlan.</p>
              <div className="cta-row" style={{ marginTop: 28, marginBottom: 0 }}>
                <Link href="/erken-giris" className="btn-primary">Erkən girişə qoşul</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
