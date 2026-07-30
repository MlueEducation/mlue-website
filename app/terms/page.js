import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'İstifadə Şərtləri — Mlue' };

const SECTIONS = [
  {
    title: 'Xidmətin Təsviri',
    body: 'Mlue, Azərbaycan gəncləri üçün onlayn kurslar, karyera alətləri və mikro-təcrübə imkanları təqdim edən rəqəmsal təhsil platformasıdır. Xidmətlərdən istifadə edərək bu şərtləri qəbul etmiş olursan.',
  },
  {
    title: 'Hesab Öhdəlikləri',
    body: 'Hesab yaradarkən doğru məlumat verməyisən və hesabının təhlükəsizliyinə görə məsuliyyət daşıyırsan. Hər istifadəçi yalnız bir şəxsi hesaba sahib ola bilər.',
  },
  {
    title: 'Ödəniş və Abunəlik Şərtləri',
    body: (
      <>
        Ödənişlərin necə tokenləşdirildiyi və geri ödəniş şərtləri barədə ətraflı məlumatı{' '}
        <Link href="/privacy" style={{ color: 'var(--accent)', fontWeight: 600 }}>Məxfilik Siyasətimizdə</Link> tapa bilərsən.
      </>
    ),
  },
  {
    title: 'Müəllim və Tərəfdaş Öhdəlikləri',
    body: 'Platformada kurs yerləşdirən müəllim və tərəfdaşlar Mlue ilə standart olaraq 50/50 gəlir bölgüsü əsasında əməkdaşlıq edir. Müəllimlər yerləşdirdikləri məzmunun orijinallığına, keyfiyyətinə və qanuni tələblərə uyğunluğuna görə tam məsuliyyət daşıyır.',
  },
  {
    title: 'Qadağan Olunan İstifadə',
    body: 'Platformanı qanunsuz məqsədlər üçün istifadə etmək, kurs məzmununu icazəsiz paylaşmaq/yenidən satmaq, digər istifadəçiləri narahat etmək və ya sistemin təhlükəsizliyinə xələl gətirməyə cəhd etmək qəti qadağandır.',
  },
  {
    title: 'Məsuliyyətin Məhdudlaşdırılması',
    body: 'Mlue platformanın fasiləsiz və xətasız işləməsinə səy göstərir, lakin texniki fasilələr və ya xidmət keyfiyyətindəki dəyişikliklərdən yaranan dolayı zərərlərə görə məsuliyyət daşımır.',
  },
  {
    title: 'Şərtlərin Dəyişdirilməsi',
    body: 'Bu şərtlər zaman-zaman yenilənə bilər. Əhəmiyyətli dəyişikliklər barədə platform daxilində məlumatlandırma veriləcək. Yeniləmələrdən sonra platformadan istifadəni davam etdirmək yeni şərtlərin qəbulu deməkdir.',
  },
  {
    title: 'Tətbiq Olunan Qanunvericilik',
    body: 'Bu şərtlər Azərbaycan Respublikasının qanunvericiliyinə uyğun olaraq tənzimlənir və şərh edilir.',
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal><h1>İstifadə Şərtləri</h1></Reveal>
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
