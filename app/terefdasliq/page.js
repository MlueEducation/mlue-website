import Reveal from '@/components/Reveal';

export const metadata = { title: 'Tərəfdaşlıq — Mlue' };

export default function TerefdasliqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>Yerli ehtiyacdan regional imkana</h1></Reveal>
          <Reveal><p>Tam lokallaşdırılmış məzmun xarici platformalardan asılılığı azaltmağı, növbəti mərhələdə isə regional bazarlara çıxışı hədəfləyir.</p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="vision" style={{ gridTemplateColumns: '1fr' }}>
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
          <div className="eyebrow reveal">Tərəfdaşlıq planı</div>
          <Reveal><h2>Hədəflədiyimiz əməkdaşlıqlar</h2></Reveal>
          <Reveal><p className="section-sub">Marketinq planımızın bir hissəsi olaraq aşağıdakı universitet və şirkətlərlə əməkdaşlıq qurmağı hədəfləyirik. Bunlar hazırda danışıq/hədəf mərhələsindədir, təsdiqlənmiş tərəfdaşlıq deyil.</p></Reveal>
          <Reveal>
            <div className="chip-group">
              <h4>Hədəf universitetlər</h4>
              <div className="chips">
                <span className="chip">UNEC</span>
                <span className="chip">ADA University</span>
                <span className="chip">Xəzər Universiteti</span>
                <span className="chip">Bakı Dövlət Universiteti</span>
              </div>
            </div>
            <div className="chip-group">
              <h4>Hədəf şirkət tərəfdaşları</h4>
              <div className="chips">
                <span className="chip">PASHA Bank</span>
                <span className="chip">Kapital Bank</span>
                <span className="chip">Azercell</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
