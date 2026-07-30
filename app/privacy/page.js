import Reveal from '@/components/Reveal';

export const metadata = { title: 'Məxfilik Siyasəti — Mlue' };

const SECTIONS = [
  {
    title: 'Giriş',
    body: 'Bu Məxfilik Siyasəti Mlue platformasından istifadə edərkən topladığımız məlumatları, onlardan necə istifadə etdiyimizi və onları necə qoruduğumuzu izah edir. Platformadan istifadə etməklə aşağıdakı şərtləri qəbul etmiş olursan.',
  },
  {
    title: 'İstifadəçi Məlumatları və Süni İntellekt',
    body: 'Profil, sertifikat və kurs irəliləyiş məlumatların yalnız sənə xidmət göstərmək məqsədilə saxlanılır. Platformadakı Meagle adlı AI köməkçi xarici bir süni intellekt modelinə qoşulmur — cavabları profil, sınaq nəticələri və nailiyyət məlumatlarına əsaslanan yerli şablonlardan formalaşır, yəni söhbətlərin heç bir zaman üçüncü tərəf AI xidmətlərinə ötürülmür.',
  },
  {
    title: 'Ödəniş Tokenləşdirilməsi',
    body: 'Kart məlumatların (tam nömrə, son istifadə tarixi, CVC) heç bir zaman Mlue serverlərində saxlanılmır. Ödənişlər PCI-DSS standartına uyğun lisenziyalı şlüzlər (Epoint, PashaPay) vasitəsilə emal olunur və tokenləşdirilir. Mlue yalnız kartın son 4 rəqəmini, növünü (Visa/Mastercard) və şlüz tərəfindən yaradılan unikal, təhlükəsiz tokeni saxlayır — bu token vasitəsilə real kart məlumatına heç bir zaman giriş yoxdur.',
  },
  {
    title: 'Cookie Siyasəti',
    body: 'Platform sessiyanın davam etdirilməsi (daxil olduğun vəziyyətin yadda saxlanması) və səhifələrin daha sürətli yüklənməsi üçün zəruri cookie-lərdən istifadə edir. Reklam məqsədli və ya üçüncü tərəf izləmə cookie-ləri istifadə olunmur.',
  },
  {
    title: 'Müəllif Hüquqları və Əqli Mülkiyyət',
    body: 'Platformadakı bütün kurs videoları, materialları, dizayn elementləri və marka aktivləri Mlue-yə və ya müvafiq müəllimlərə məxsusdur. Bu materialların icazəsiz surətinin çıxarılması, yenidən satılması və ya paylaşılması qəti qadağandır.',
  },
  {
    title: 'Geri Ödəmə Siyasəti',
    body: 'Kurs alışından sonra 14 gün ərzində, kurs videosunun 10%-dən azı izlənilibsə, tam geri ödəniş tələb edə bilərsən. 10%-dən çox məzmun izlənildikdə və ya 14 günlük müddət bitdikdə geri ödəniş edilmir.',
  },
  {
    title: 'Müəllim Öhdəlikləri',
    body: 'Platformada kurs yerləşdirən müəllim/həmmüəlliflər üçün gəlir bölgüsü standart olaraq 50/50 nisbətindədir. Müəllimlər öz kurs məzmununun düzgünlüyünə və ödəniş üçün lazımi bank/hesab məlumatlarının aktuallığına görə məsuliyyət daşıyır.',
  },
  {
    title: 'Əlaqə',
    body: 'Məxfiliklə bağlı hər hansı sual üçün bizimlə support@mlue.az ünvanından əlaqə saxlaya bilərsən.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>Məxfilik Siyasəti</h1></Reveal>
          <Reveal><p>Son yenilənmə: 30 iyul 2026</p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          {SECTIONS.map((s) => (
            <Reveal key={s.title}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{s.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, maxWidth: 720, marginBottom: 40 }}>
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
