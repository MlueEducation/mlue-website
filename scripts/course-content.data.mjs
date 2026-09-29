/* Authored catalogue content for every live course.
   Kept as data (not hand-written SQL) so scripts/build-course-sql.mjs can
   regenerate the migration deterministically, and so a typo is a one-line fix
   rather than a hunt through a thousand INSERT rows.

   `id` must match the courses.id slug already in the database — the generator
   fails loudly on an unknown id rather than silently inserting an orphan row.

   Mentor names are PLACEHOLDERS with generic affiliations. They are not real
   people, and no real employer is named, so nothing here misrepresents an
   actual person or organisation. Replace them as real instructors onboard. */

export const COURSE_CONTENT = [
  /* ---------------------------------------------------------- data ---- */
  {
    id: 'masin-oyrenmesine-giris',
    mentor: 'Rəşad Əliyev',
    mentorTitle: 'Maşın Öyrənməsi Mühəndisi',
    summary:
      'Maşın öyrənməsinin necə işlədiyini sıfırdan anla: məlumatdan modelə, modeldən qiymətləndirməyə qədər. Riyazi intuisiyanı sadə dildə izah edir, hər mövzunu Python-da praktiki nümunə ilə möhkəmləndiririk.',
    learn: [
      'Nəzarətli və nəzarətsiz öyrənmə arasındakı fərqi ayırd etmək',
      'Reqressiya və təsnifat modellərini scikit-learn ilə qurmaq',
      'Modelin dəqiqliyini düzgün metriklərlə ölçmək',
      'Overfitting-i tanımaq və qarşısını almaq',
      'Real datasetdə uçdan-uca kiçik layihə tamamlamaq',
    ],
    modules: [
      { title: 'Maşın Öyrənməsinə Baxış', lessons: ['Maşın öyrənməsi nədir və nə vaxt lazımdır', 'Nəzarətli, nəzarətsiz və gücləndirilmiş öyrənmə', 'İş axını: məlumatdan modelə'] },
      { title: 'Məlumatın Hazırlanması', lessons: ['Datasetin araşdırılması və təmizlənməsi', 'Əlamətlərin (feature) seçilməsi', 'Train/test bölgüsü və niyə vacibdir'] },
      { title: 'Reqressiya Modelləri', lessons: ['Xətti reqressiya intuisiyası', 'Çoxdəyişənli reqressiya', 'Xəta funksiyaları və qradiyent enişi'] },
      { title: 'Təsnifat Modelləri', lessons: ['Logistik reqressiya', 'Qərar ağacları və random forest', 'k-NN alqoritmi'] },
      { title: 'Modelin Qiymətləndirilməsi', lessons: ['Dəqiqlik, precision, recall və F1', 'Confusion matrix oxumaq', 'Cross-validation'] },
      { title: 'Yekun Layihə', lessons: ['Məsələnin qoyulması', 'Modelin qurulması və tənzimlənməsi', 'Nəticələrin təqdimatı'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Nümunə datasetlər.zip', 'Python notebook şablonları.zip'],
  },
  {
    id: 'power-bi-ile-biznes-analitikasi',
    mentor: 'Günel Həsənova',
    mentorTitle: 'Biznes Analitik',
    summary:
      'Xam cədvəldən idarəetmə panelinə qədər: Power BI ilə məlumatı birləşdirməyi, DAX ilə hesablamağı və qərar verməyə kömək edən vizual hesabatlar qurmağı öyrən.',
    learn: [
      'Müxtəlif mənbələrdən məlumatı Power BI-a yükləmək',
      'Power Query ilə məlumatı təmizləmək və çevirmək',
      'Data modeli və cədvəllər arası əlaqələr qurmaq',
      'DAX ilə ölçülər (measures) yazmaq',
      'İnteraktiv dashboard hazırlamaq və paylaşmaq',
    ],
    modules: [
      { title: 'Power BI ilə Tanışlıq', lessons: ['İnterfeys və əsas anlayışlar', 'Məlumat mənbələrinə qoşulma', 'İlk hesabatın qurulması'] },
      { title: 'Məlumatın Çevrilməsi', lessons: ['Power Query redaktoru', 'Sütunların təmizlənməsi və birləşdirilməsi', 'Təkrarlanan addımların avtomatlaşdırılması'] },
      { title: 'Data Modeli və DAX', lessons: ['Cədvəllər arası əlaqələr', 'Hesablanmış sütunlar və ölçülər', 'Ən çox işlənən DAX funksiyaları'] },
      { title: 'Vizuallaşdırma və Paylaşım', lessons: ['Düzgün qrafik növünün seçilməsi', 'Filtrlər, slicer və drill-down', 'Hesabatın dərci və paylaşılması'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Nümunə satış datası.xlsx', 'DAX sorğu kitabçası.pdf'],
  },
  {
    id: 'python-data-analitikasi',
    mentor: 'Aysel Məmmədova',
    mentorTitle: 'Data Analitik',
    summary:
      'Python-un əsaslarından tutmuş real data ilə işləməyə qədər — pandas və NumPy kitabxanaları ilə məlumatları təmizləməyi, təhlil etməyi və vizuallaşdırmağı öyrənəcəksən.',
    learn: [
      'Python-da dəyişənlər, siyahılar və funksiyalarla işləmək',
      'Pandas ilə cədvəl formatlı məlumatları oxumaq və təmizləmək',
      'NumPy ilə ədədi hesablamalar aparmaq',
      'Matplotlib ilə sadə qrafiklər qurmaq',
      'Kiçik analitik hesabatı uçdan-uca hazırlamaq',
    ],
    /* m1/m2 (and their first two lessons) intentionally mirror the rows that
       are already in the database for this course, so the generated SQL only
       ever appends — see the note at the top of build-course-sql.mjs. */
    modules: [
      { title: 'Giriş və Quraşdırma', lessons: ['Python-a giriş', 'Mühitin qurulması (Anaconda)', 'Jupyter Notebook ilə işləmək'] },
      { title: 'Data ilə İşləmək', lessons: ['Pandas ilə cədvəllər', 'Məlumatların təmizlənməsi', 'Qruplaşdırma və aqreqasiya'] },
      { title: 'Python Əsasları', lessons: ['Dəyişənlər və məlumat tipləri', 'Siyahılar, lüğətlər və dövrlər', 'Funksiyalar və modullar'] },
      { title: 'Vizuallaşdırma', lessons: ['Matplotlib əsasları', 'Qrafik növünün seçilməsi', 'Nəticələrin şərh edilməsi'] },
      { title: 'Yekun Layihə', lessons: ['Datasetin seçilməsi', 'Analizin aparılması', 'Hesabatın təqdimatı'] },
    ],
    materials: ['Dərs 1 – Slaydlar.pdf', 'Nümunə kodlar.zip', 'Məşq datasetləri.zip'],
  },

  /* ------------------------------------------------------------ cs ---- */
  {
    id: 'python-proqramlasdirmaya-giris',
    mentor: 'Tural Quliyev',
    mentorTitle: 'Proqram Təminatı Mühəndisi',
    summary:
      'Heç bir proqramlaşdırma təcrübəsi tələb olunmur. Sadə hesablamalardan başlayıb öz kiçik proqramlarını yazacaq səviyyəyə çatırsan — hər mövzu kod yazaraq möhkəmləndirilir.',
    learn: [
      'Python sintaksisini və əsas məlumat tiplərini mənimsəmək',
      'Şərtlər və dövrlərlə proqram məntiqi qurmaq',
      'Funksiyalar yazmaq və kodu təkrar istifadə etmək',
      'Fayllarla işləmək və səhvləri idarə etmək',
      'Kiçik konsol tətbiqi hazırlamaq',
    ],
    modules: [
      { title: 'İlk Addımlar', lessons: ['Proqramlaşdırma nədir', 'Python-un quraşdırılması', 'İlk proqram: "Salam, dünya"'] },
      { title: 'Məlumat Tipləri', lessons: ['Ədədlər və mətnlər', 'Siyahılar və tuple-lar', 'Lüğətlər və çoxluqlar'] },
      { title: 'Məntiq və Dövrlər', lessons: ['Şərt operatorları', 'for və while dövrləri', 'Məşq: rəqəm tapma oyunu'] },
      { title: 'Funksiyalar', lessons: ['Funksiya yazmaq və çağırmaq', 'Parametrlər və qaytarılan dəyər', 'Modullara bölmək'] },
      { title: 'Fayllar və Səhvlər', lessons: ['Fayl oxumaq və yazmaq', 'try/except ilə səhv idarəsi', 'Sadə jurnal (log) qurmaq'] },
      { title: 'Yekun Layihə', lessons: ['Layihənin planlaşdırılması', 'Kodun yazılması', 'Təkmilləşdirmə və təqdimat'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Məşq tapşırıqları.pdf', 'Nümunə kodlar.zip'],
  },
  {
    id: 'obyekt-yonumlu-proqramlasdirma-java',
    mentor: 'Elvin Nəsirov',
    mentorTitle: 'Backend Proqramçı',
    summary:
      'Java üzərindən obyekt yönümlü düşünməyi öyrən: sinif, varislik, interfeys və dizayn prinsipləri — hamısı praktik nümunələrlə və kiçik layihə ilə möhkəmləndirilir.',
    learn: [
      'Sinif və obyekt anlayışlarını dəqiq ayırd etmək',
      'İnkapsulyasiya, varislik və polimorfizmi tətbiq etmək',
      'İnterfeys və abstrakt siniflərdən düzgün istifadə etmək',
      'İstisnaları (exception) idarə etmək',
      'Kolleksiyalarla işləmək və sadə layihə qurmaq',
    ],
    modules: [
      { title: 'Java ilə Tanışlıq', lessons: ['Java mühitinin qurulması', 'Sintaksis və əsas tiplər', 'İlk sinifin yazılması'] },
      { title: 'Sinif və Obyekt', lessons: ['Sahələr və metodlar', 'Konstruktorlar', 'İnkapsulyasiya və getter/setter'] },
      { title: 'Varislik və Polimorfizm', lessons: ['extends ilə varislik', 'Metodun üzərinə yazılması', 'Polimorfizmin praktik faydası'] },
      { title: 'Abstraksiya', lessons: ['Abstrakt siniflər', 'İnterfeyslər', 'Nə vaxt hansını seçməli'] },
      { title: 'Kolleksiyalar və İstisnalar', lessons: ['List, Set və Map', 'try/catch və özəl istisnalar', 'Kolleksiyalarla məşqlər'] },
      { title: 'Yekun Layihə', lessons: ['Domen modelinin qurulması', 'Məntiqin yazılması', 'Kodun təmizlənməsi'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Nümunə layihə.zip', 'OOP prinsipləri xülasəsi.pdf'],
  },
  {
    id: 'komputer-elmlerinin-esaslari',
    mentor: 'Nigar Səfərova',
    mentorTitle: 'Kompüter Elmləri Müəllimi',
    summary:
      'Kompüterin arxasında nə baş verdiyini anla: ikilik say sistemindən alqoritmlərə, yaddaşdan şəbəkəyə qədər. Bu kurs bütün digər texniki kursların möhkəm təməlidir.',
    learn: [
      'İkilik və onaltılıq say sistemlərini oxumaq',
      'Kompüterin əsas komponentlərinin rolunu izah etmək',
      'Alqoritm və mürəkkəblik anlayışını mənimsəmək',
      'Əsas məlumat strukturlarını tanımaq',
      'Əməliyyat sistemi və şəbəkənin iş prinsipini başa düşmək',
    ],
    modules: [
      { title: 'Məlumatın Təsviri', lessons: ['İkilik say sistemi', 'Mətn və şəkillərin kodlaşdırılması', 'Məlumat ölçü vahidləri'] },
      { title: 'Kompüterin Quruluşu', lessons: ['Prosessor və yaddaş', 'Giriş-çıxış qurğuları', 'Proqram necə icra olunur'] },
      { title: 'Alqoritmlər', lessons: ['Alqoritm nədir', 'Axtarış və çeşidləmə', 'Mürəkkəbliyə giriş (Big-O)'] },
      { title: 'Məlumat Strukturları', lessons: ['Massiv və siyahılar', 'Stek və növbə', 'Ağaclar haqqında ilkin təsəvvür'] },
      { title: 'Sistem və Şəbəkə', lessons: ['Əməliyyat sisteminin vəzifələri', 'Fayl sistemi', 'İnternet necə işləyir'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Alqoritm məşqləri.pdf', 'Terminlər lüğəti.pdf'],
  },

  /* ------------------------------------------------------------ it ---- */
  {
    id: 'nodejs-ve-expressjs-ile-backend-arxitekturasi',
    mentor: 'Kamran Əhmədov',
    mentorTitle: 'Baş Backend Mühəndisi',
    summary:
      'Node.js və Express ilə real istehsalata uyğun backend qurmağı öyrən: layihə strukturu, autentifikasiya, verilənlər bazası və təhlükəsizlik — hamısı bir layihə üzərində addım-addım.',
    learn: [
      'Express ilə REST API layihəsini düzgün strukturlaşdırmaq',
      'Middleware zəncirini və səhv idarəsini qurmaq',
      'Verilənlər bazası ilə təhlükəsiz işləmək',
      'JWT əsaslı autentifikasiya və icazə sistemi tətbiq etmək',
      'API-ni test etmək və istehsalata hazırlamaq',
    ],
    modules: [
      { title: 'Node.js Təməlləri', lessons: ['Node.js necə işləyir', 'Asinxron proqramlaşdırma və Promise', 'npm və layihə strukturu'] },
      { title: 'Express ilə API', lessons: ['Marşrutlar (routes) və nəzarətçilər', 'Middleware anlayışı', 'Mərkəzləşdirilmiş səhv idarəsi'] },
      { title: 'Verilənlər Bazası', lessons: ['Bazaya qoşulma və modellər', 'CRUD əməliyyatları', 'Miqrasiyalar və seed məlumatı'] },
      { title: 'Autentifikasiya', lessons: ['Parolların təhlükəsiz saxlanması', 'JWT ilə sessiya', 'Rol əsaslı icazələr'] },
      { title: 'Təhlükəsizlik və Performans', lessons: ['Ən çox rast gəlinən zəifliklər', 'Rate limiting və validasiya', 'Keşləmə və optimallaşdırma'] },
      { title: 'İstehsalata Çıxış', lessons: ['Mühit dəyişənləri və konfiqurasiya', 'Loglama və monitorinq', 'Deploy prosesi'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Başlanğıc layihə şablonu.zip', 'API test kolleksiyası.json'],
  },
  {
    id: 'sebeke-esaslari-ve-it-destek',
    mentor: 'Orxan Babayev',
    mentorTitle: 'Şəbəkə Administratoru',
    summary:
      'IT dəstək sahəsində işə başlamaq üçün lazım olan praktik bilik: şəbəkənin necə qurulduğu, problemin necə diaqnoz edildiyi və istifadəçiyə necə kömək edildiyi.',
    learn: [
      'IP ünvanlama və alt şəbəkələri başa düşmək',
      'Şəbəkə avadanlıqlarının rolunu izah etmək',
      'Əsas şəbəkə problemlərini addım-addım diaqnoz etmək',
      'Əməliyyat sistemi səviyyəsində nasazlıqları aradan qaldırmaq',
      'Dəstək müraciətlərini peşəkar idarə etmək',
    ],
    modules: [
      { title: 'Şəbəkənin Əsasları', lessons: ['Şəbəkə növləri və topologiyalar', 'OSI və TCP/IP modelləri', 'IP ünvan və alt şəbəkə'] },
      { title: 'Avadanlıq və Protokollar', lessons: ['Router, switch və access point', 'DNS, DHCP və NAT', 'Wi-Fi konfiqurasiyası'] },
      { title: 'Diaqnostika', lessons: ['ping, tracert və nslookup', 'Problemin təcrid edilməsi metodikası', 'Ən çox rast gəlinən nasazlıqlar'] },
      { title: 'İstifadəçi Dəstəyi', lessons: ['Əməliyyat sistemi problemləri', 'Printer və periferiya', 'Dəstək bileti idarəetməsi'] },
      { title: 'Təhlükəsizlik və Sənədləşmə', lessons: ['Əsas təhlükəsizlik tədbirləri', 'Ehtiyat nüsxələr', 'Sənədləşdirmə vərdişləri'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Diaqnostika yoxlama siyahısı.pdf', 'Şəbəkə sxemləri.pdf'],
  },
  {
    id: 'kibertehlukesizliye-giris',
    mentor: 'Leyla Rəhimova',
    mentorTitle: 'Kibertəhlükəsizlik Mütəxəssisi',
    summary:
      'Hücumların necə baş verdiyini anlayaraq müdafiəni öyrən. Kurs müdafiə yönümlüdür: risklərin qiymətləndirilməsi, sistemlərin möhkəmləndirilməsi və insidentə reaksiya.',
    learn: [
      'Əsas təhdid növlərini və hücum vektorlarını tanımaq',
      'Parol, şifrələmə və autentifikasiya prinsiplərini tətbiq etmək',
      'Şəbəkə və sistem səviyyəsində müdafiə qurmaq',
      'Sosial mühəndislik cəhdlərini aşkarlamaq',
      'İnsidentə reaksiya planı hazırlamaq',
    ],
    modules: [
      { title: 'Təhdid Mənzərəsi', lessons: ['Kibertəhlükəsizlik nədir', 'Hücum növləri və motivasiya', 'Risklərin qiymətləndirilməsi'] },
      { title: 'Kriptoqrafiyanın Əsasları', lessons: ['Simmetrik və asimmetrik şifrələmə', 'Heş funksiyaları', 'Sertifikatlar və HTTPS'] },
      { title: 'Sistemlərin Müdafiəsi', lessons: ['Çoxfaktorlu autentifikasiya', 'Təhlükəsiz konfiqurasiya', 'Yeniləmə və zəiflik idarəsi'] },
      { title: 'İnsan Amili', lessons: ['Fişinq və sosial mühəndislik', 'Təhlükəsiz iş vərdişləri', 'Təhlükəsizlik mədəniyyəti'] },
      { title: 'İnsidentə Reaksiya', lessons: ['Aşkarlama və izolyasiya', 'Bərpa prosesi', 'İnsident hesabatı'] },
      { title: 'Praktik Tətbiq', lessons: ['Sistemin möhkəmləndirilməsi', 'Sadə audit aparmaq', 'Təhlükəsizlik siyasətinin yazılması'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Təhlükəsizlik yoxlama siyahısı.pdf', 'İnsident hesabat şablonu.docx'],
  },
  {
    id: 'bulud-texnologiyalari-aws-esaslari',
    mentor: 'Fərid Məmmədli',
    mentorTitle: 'Bulud Həlləri Arxitektoru',
    summary:
      'Bulud texnologiyalarının məntiqini və AWS-in əsas xidmətlərini öyrən: server, yaddaş, şəbəkə və təhlükəsizlik — hər mövzu praktik ssenari ilə izah olunur.',
    learn: [
      'Bulud modellərini (IaaS, PaaS, SaaS) fərqləndirmək',
      'EC2 və S3 kimi əsas xidmətlərdən istifadə etmək',
      'Bulud şəbəkəsi və təhlükəsizlik qruplarını konfiqurasiya etmək',
      'İcazələri düzgün idarə etmək',
      'Xərcləri planlamaq və optimallaşdırmaq',
    ],
    modules: [
      { title: 'Buluda Giriş', lessons: ['Bulud nədir və nə üçün lazımdır', 'Xidmət və yerləşdirmə modelləri', 'Regionlar və əlçatanlıq zonaları'] },
      { title: 'Hesablama və Yaddaş', lessons: ['Virtual serverlər (EC2)', 'Obyekt yaddaşı (S3)', 'Verilənlər bazası xidmətləri'] },
      { title: 'Şəbəkə və Təhlükəsizlik', lessons: ['Virtual şəbəkə qurmaq', 'Təhlükəsizlik qrupları', 'İcazə idarəetməsi (IAM)'] },
      { title: 'Etibarlılıq və Xərc', lessons: ['Yedəkləmə və bərpa', 'Miqyaslanma prinsipləri', 'Xərclərin idarə olunması'] },
      { title: 'Praktik Ssenari', lessons: ['Sadə veb tətbiqin yerləşdirilməsi', 'Monitorinqin qurulması', 'Yekun icmal'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Xidmətlər müqayisə cədvəli.pdf', 'Praktik tapşırıqlar.pdf'],
  },

  /* -------------------------------------------------------- health ---- */
  {
    id: 'ictimai-sehiyyeye-giris',
    mentor: 'Dr. Səbinə Hüseynova',
    mentorTitle: 'İctimai Səhiyyə Mütəxəssisi',
    summary:
      'Səhiyyənin fərdi müalicədən kənar tərəfi: cəmiyyət səviyyəsində xəstəliklərin qarşısının alınması, epidemiologiyanın əsasları və sağlamlıq siyasətinin necə formalaşdığı.',
    learn: [
      'İctimai səhiyyənin əsas funksiyalarını izah etmək',
      'Epidemiologiyanın təməl anlayışlarını mənimsəmək',
      'Sağlamlıq göstəricilərini oxumaq və şərh etmək',
      'Profilaktika səviyyələrini fərqləndirmək',
      'Sağlamlıq maarifləndirmə kampaniyası planlamaq',
    ],
    modules: [
      { title: 'İctimai Səhiyyə Nədir', lessons: ['Tarixi inkişaf və əsas missiya', 'Fərdi və ictimai yanaşma', 'Səhiyyənin sosial təyinediciləri'] },
      { title: 'Epidemiologiyanın Əsasları', lessons: ['Xəstəliyin yayılma modelləri', 'İnsidens və prevalens', 'Tədqiqat növləri'] },
      { title: 'Profilaktika', lessons: ['İlkin, ikincili və üçüncülü profilaktika', 'Peyvəndləmə proqramları', 'Skrininq'] },
      { title: 'Səhiyyə Siyasəti', lessons: ['Səhiyyə sistemlərinin modelləri', 'Resursların bölgüsü', 'Etik məsələlər'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Statistik göstəricilər bələdçisi.pdf', 'Nümunə hallar.pdf'],
  },
  {
    id: 'qidalanma-ve-saglam-heyat-terzi',
    mentor: 'Aynur Qasımova',
    mentorTitle: 'Klinik Dietoloq',
    summary:
      'Elmi əsaslı qidalanma bilikləri: makro və mikroelementlər, enerji balansı, etiket oxumaq və dəbdəki pəhrizlərin arxasındakı həqiqət.',
    learn: [
      'Zülal, yağ və karbohidratların rolunu izah etmək',
      'Gündəlik enerji tələbatını hesablamaq',
      'Qida etiketlərini düzgün oxumaq',
      'Balanslı həftəlik menyu qurmaq',
      'Qidalanma haqqında yanlış məlumatı ayırd etmək',
    ],
    modules: [
      { title: 'Qidalanmanın Əsasları', lessons: ['Makroelementlər', 'Vitamin və mineral', 'Su və hidratasiya'] },
      { title: 'Enerji Balansı', lessons: ['Kalori nədir', 'Metabolizm və aktivlik', 'Çəki idarəetməsinin prinsipləri'] },
      { title: 'Praktik Seçimlər', lessons: ['Qida etiketlərinin oxunması', 'Menyu planlaması', 'Kənar yeməklərdə seçim'] },
      { title: 'Mif və Həqiqət', lessons: ['Dəbdəki pəhrizlərin təhlili', 'Əlavələrə tənqidi baxış', 'Mənbənin etibarlılığını yoxlamaq'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Həftəlik menyu şablonu.pdf', 'Qida dəyəri cədvəli.pdf'],
  },
  {
    id: 'saglamliq-sistemlerinin-idare-edilmesi',
    mentor: 'Dr. Ramil Əsgərov',
    mentorTitle: 'Səhiyyə Menecmenti üzrə Mütəxəssis',
    summary:
      'Xəstəxana və klinikaların idarəolunması: resurs planlaması, keyfiyyət göstəriciləri, xəstə axınının optimallaşdırılması və maliyyə idarəçiliyi.',
    learn: [
      'Səhiyyə təşkilatının strukturunu təhlil etmək',
      'Xəstə axınını və növbələri optimallaşdırmaq',
      'Keyfiyyət və təhlükəsizlik göstəricilərini ölçmək',
      'Büdcə və resursları planlamaq',
      'Dəyişiklik idarəetməsini tətbiq etmək',
    ],
    modules: [
      { title: 'Səhiyyə Menecmentinə Giriş', lessons: ['Təşkilati struktur', 'Maraqlı tərəflər', 'Əsas idarəetmə funksiyaları'] },
      { title: 'Əməliyyat İdarəetməsi', lessons: ['Xəstə axınının modelləşdirilməsi', 'Növbə və gözləmə vaxtı', 'Resursların planlaşdırılması'] },
      { title: 'Keyfiyyət və Təhlükəsizlik', lessons: ['Keyfiyyət göstəriciləri', 'Xəstə təhlükəsizliyi', 'Akkreditasiya standartları'] },
      { title: 'Maliyyə və İnsan Resursları', lessons: ['Büdcələmə əsasları', 'Xərc-fayda təhlili', 'Komandanın idarə olunması'] },
      { title: 'Dəyişiklik İdarəetməsi', lessons: ['Təkmilləşdirmə metodikaları', 'Rəqəmsallaşma', 'Nümunə hal təhlili'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Göstəricilər paneli şablonu.xlsx', 'Nümunə hallar.pdf'],
  },
  {
    id: 'zehni-saglamliq-ve-stress-idareetmesi',
    mentor: 'Nərmin Allahverdiyeva',
    mentorTitle: 'Psixoloq',
    summary:
      'Stressin bədəndə və zehində necə işlədiyini anla, sübuta əsaslanan texnikalarla onu idarə etməyi öyrən. Kurs maarifləndirmə məqsədi daşıyır, müalicəni əvəz etmir.',
    learn: [
      'Stressin fizioloji mexanizmini izah etmək',
      'Tükənmişlik əlamətlərini erkən tanımaq',
      'Nəfəs və diqqətlilik texnikalarını tətbiq etmək',
      'Sağlam sərhədlər qurmaq',
      'Peşəkar yardımın nə vaxt lazım olduğunu bilmək',
    ],
    modules: [
      { title: 'Stress Nədir', lessons: ['Stress reaksiyasının fiziologiyası', 'Kəskin və xroniki stress', 'Stressin bədənə təsiri'] },
      { title: 'Tanıma və Ölçmə', lessons: ['Tükənmişlik sindromu', 'Narahatlıq əlamətləri', 'Özünümüşahidə gündəliyi'] },
      { title: 'İdarəetmə Texnikaları', lessons: ['Nəfəs və relaksasiya', 'Diqqətlilik (mindfulness) məşqləri', 'Koqnitiv yenidənqiymətləndirmə'] },
      { title: 'Dayanıqlıq Qurmaq', lessons: ['Yuxu, hərəkət və qidalanma', 'Sərhədlər və "yox" demək', 'Dəstək şəbəkəsi və peşəkar yardım'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Nəfəs məşqləri bələdçisi.pdf', 'Özünümüşahidə gündəliyi.pdf'],
  },

  /* ------------------------------------------------------- physics ---- */
  {
    id: 'muhendislik-mexanikasinin-esaslari',
    mentor: 'Emin Vəliyev',
    mentorTitle: 'İnşaat Mühəndisi',
    summary:
      'Statika və materiallar müqavimətinin təməli: qüvvələrin necə paylandığını, konstruksiyaların niyə dayandığını və hesablamaların necə aparıldığını öyrən.',
    learn: [
      'Qüvvə və momentləri vektor şəklində hesablamaq',
      'Sərbəst cisim diaqramı qurmaq',
      'Fermaların daxili qüvvələrini təyin etmək',
      'Gərginlik və deformasiyanı hesablamaq',
      'Sadə tir hesabatını aparmaq',
    ],
    modules: [
      { title: 'Statikanın Əsasları', lessons: ['Qüvvə və vektorlar', 'Moment anlayışı', 'Tarazlıq şərtləri'] },
      { title: 'Konstruksiyaların Təhlili', lessons: ['Sərbəst cisim diaqramı', 'Ferma hesabatı', 'Dayaq reaksiyaları'] },
      { title: 'Materiallar Müqaviməti', lessons: ['Gərginlik və deformasiya', 'Elastiklik modulu', 'Təhlükəsizlik əmsalı'] },
      { title: 'Tirlər və Yüklər', lessons: ['Kəsici qüvvə diaqramı', 'Əyici moment diaqramı', 'Praktik hesablama nümunəsi'] },
      { title: 'Tətbiq', lessons: ['Real konstruksiya təhlili', 'Hesablama səhvləri', 'Yekun məsələ həlli'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Düsturlar kitabçası.pdf', 'Məsələlər toplusu.pdf'],
  },
  {
    id: 'yenilene-bilen-enerji-menbeleri',
    mentor: 'Şəhla Muradova',
    mentorTitle: 'Enerji Sistemləri Mühəndisi',
    summary:
      'Günəş, külək, su və geotermal enerjinin necə işlədiyi, hansı şəraitdə səmərəli olduğu və enerji keçidinin qarşısındakı real maneələr.',
    learn: [
      'Əsas bərpaolunan enerji növlərini müqayisə etmək',
      'Günəş və külək sistemlərinin iş prinsipini izah etmək',
      'Enerji səmərəliliyini hesablamaq',
      'Enerjinin saxlanması məsələsini anlamaq',
      'Kiçik sistem üçün ilkin hesablama aparmaq',
    ],
    modules: [
      { title: 'Enerjiyə Baxış', lessons: ['Enerji mənbələrinin təsnifatı', 'Enerji keçidi və iqlim', 'Əsas anlayış və vahidlər'] },
      { title: 'Günəş Enerjisi', lessons: ['Fotoelektrik effekt', 'Panel sistemlərinin quruluşu', 'Məhsuldarlığa təsir edən amillər'] },
      { title: 'Külək və Su', lessons: ['Külək turbinlərinin iş prinsipi', 'Hidroenerji', 'Yerləşdirmə kriteriyaları'] },
      { title: 'Saxlama və Şəbəkə', lessons: ['Akkumulyator texnologiyaları', 'Şəbəkəyə inteqrasiya', 'Balanslaşdırma problemi'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Hesablama cədvəli.xlsx', 'Müqayisəli analiz.pdf'],
  },
  {
    id: 'fizikaya-giris-klassik-mexanika',
    mentor: 'Anar Salmanov',
    mentorTitle: 'Fizika Müəllimi',
    summary:
      'Nyuton mexanikasını düsturları əzbərləmədən anla: hərəkət, qüvvə, enerji və impuls — hər anlayış gündəlik həyatdan nümunələrlə izah olunur.',
    learn: [
      'Hərəkəti kinematik tənliklərlə təsvir etmək',
      'Nyutonun üç qanununu tətbiq etmək',
      'İş, enerji və gücü hesablamaq',
      'İmpulsun saxlanması qanunundan istifadə etmək',
      'Fiziki məsələləri sistemli həll etmək',
    ],
    modules: [
      { title: 'Kinematika', lessons: ['Yerdəyişmə, sürət və təcil', 'Düzxətli bərabərtəcilli hərəkət', 'Qravitasiya sahəsində hərəkət'] },
      { title: 'Dinamika', lessons: ['Nyutonun birinci qanunu', 'İkinci və üçüncü qanunlar', 'Sürtünmə qüvvəsi'] },
      { title: 'İş və Enerji', lessons: ['İş və kinetik enerji', 'Potensial enerji', 'Enerjinin saxlanması'] },
      { title: 'İmpuls', lessons: ['İmpuls və toqquşmalar', 'Elastik və qeyri-elastik toqquşma', 'Praktik nümunələr'] },
      { title: 'Məsələ Həlli', lessons: ['Məsələ həllinin metodikası', 'Qarışıq məsələlər', 'Yekun təkrar'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Məsələlər toplusu.pdf', 'Düsturlar vərəqi.pdf'],
  },
  {
    id: 'cad-ile-3d-modellesdirme',
    mentor: 'Rüfət İsmayılov',
    mentorTitle: 'Mexanika Dizayn Mühəndisi',
    summary:
      'Eskizdən hazır 3D modelə və texniki çertyoja qədər: parametrik modelləşdirmənin məntiqini öyrən və öz detalını yaradıb yığ.',
    learn: [
      'Parametrik eskiz çəkmək və məhdudiyyətlər qoymaq',
      '2D eskizdən 3D həcm yaratmaq',
      'Detalları yığma (assembly) halına gətirmək',
      'Texniki çertyoj hazırlamaq',
      'Modeli çap və istehsal üçün ixrac etmək',
    ],
    modules: [
      { title: 'CAD-ə Giriş', lessons: ['İnterfeys və iş axını', 'Koordinat sistemləri', 'İlk eskiz'] },
      { title: 'Eskiz və Məhdudiyyətlər', lessons: ['Həndəsi məhdudiyyətlər', 'Ölçü məhdudiyyətləri', 'Parametrik düşüncə'] },
      { title: '3D Modelləşdirmə', lessons: ['Extrude və revolve', 'Fillet, chamfer və pattern', 'Mürəkkəb detalın qurulması'] },
      { title: 'Yığma', lessons: ['Detalların əlaqələndirilməsi', 'Hərəkət və toqquşma yoxlaması', 'Yığma sənədləşdirmə'] },
      { title: 'Çertyoj və İxrac', lessons: ['Texniki çertyojun qurulması', 'Ölçü və tolerans', 'STL və PDF ixracı'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Məşq faylları.zip', 'Çertyoj standartları.pdf'],
  },

  /* -------------------------------------------------------- social ---- */
  {
    id: 'psixologiyaya-giris',
    mentor: 'Lamiyə Cəfərova',
    mentorTitle: 'Psixologiya Müəllimi',
    summary:
      'İnsan davranışının arxasındakı elmi izahlar: qavrayış, yaddaş, motivasiya, şəxsiyyət və sosial təsir — klassik tədqiqatlar üzərindən.',
    learn: [
      'Psixologiyanın əsas istiqamətlərini fərqləndirmək',
      'Yaddaş və öyrənmə mexanizmlərini izah etmək',
      'Motivasiya nəzəriyyələrini müqayisə etmək',
      'Koqnitiv təhrifləri tanımaq',
      'Psixoloji tədqiqatı tənqidi oxumaq',
    ],
    modules: [
      { title: 'Psixologiyaya Baxış', lessons: ['Elm kimi psixologiya', 'Əsas məktəblər', 'Tədqiqat metodları'] },
      { title: 'Qavrayış və Yaddaş', lessons: ['Hisslər və qavrayış', 'Yaddaşın modelləri', 'Unutma və xatırlama'] },
      { title: 'Öyrənmə və Motivasiya', lessons: ['Şərtləndirmə', 'Motivasiya nəzəriyyələri', 'Emosiyalar'] },
      { title: 'Şəxsiyyət və Sosial Təsir', lessons: ['Şəxsiyyət nəzəriyyələri', 'Qrup təzyiqi və itaət', 'Stereotiplər və qərəz'] },
      { title: 'Tətbiqi Psixologiya', lessons: ['Gündəlik həyatda tətbiq', 'Koqnitiv təhriflər', 'Yekun icmal'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Klassik tədqiqatlar xülasəsi.pdf', 'Məşq sualları.pdf'],
  },
  {
    id: 'sosiologiya-cemiyyeti-anlamaq',
    mentor: 'Kamil Bayramov',
    mentorTitle: 'Sosioloq',
    summary:
      'Cəmiyyətin necə qurulduğunu və dəyişdiyini sosioloji baxışla təhlil et: institutlar, təbəqələşmə, mədəniyyət və sosial dəyişiklik.',
    learn: [
      'Sosioloji təxəyyülü tətbiq etmək',
      'Əsas sosioloji nəzəriyyələri müqayisə etmək',
      'Sosial təbəqələşməni təhlil etmək',
      'Mədəniyyət və sosiallaşmanı izah etmək',
      'Sadə sosioloji müşahidə aparmaq',
    ],
    modules: [
      { title: 'Sosioloji Baxış', lessons: ['Sosiologiya nədir', 'Sosioloji təxəyyül', 'Tədqiqat metodları'] },
      { title: 'Mədəniyyət və Sosiallaşma', lessons: ['Mədəniyyətin elementləri', 'Sosiallaşma prosesi', 'Normalar və dəyərlər'] },
      { title: 'Struktur və Təbəqələşmə', lessons: ['Sosial institutlar', 'Sinif və bərabərsizlik', 'Sosial mobillik'] },
      { title: 'Dəyişiklik', lessons: ['Urbanizasiya və miqrasiya', 'Texnologiya və cəmiyyət', 'Sosial hərəkatlar'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Mətn seçmələri.pdf', 'Müşahidə tapşırığı.pdf'],
  },
  {
    id: 'beynelxalq-munasibetlere-giris',
    mentor: 'Nihad Rzayev',
    mentorTitle: 'Beynəlxalq Münasibətlər üzrə Tədqiqatçı',
    summary:
      'Dövlətlərin bir-biri ilə niyə belə davrandığını anla: əsas nəzəriyyələr, beynəlxalq təşkilatlar, diplomatiya və qlobal problemlər.',
    learn: [
      'Realizm, liberalizm və konstruktivizmi fərqləndirmək',
      'Beynəlxalq təşkilatların rolunu izah etmək',
      'Diplomatiya və danışıqların məntiqini anlamaq',
      'Qlobal münaqişələri çərçivəyə salmaq',
      'Xəbərləri analitik oxumaq',
    ],
    modules: [
      { title: 'Əsas Anlayışlar', lessons: ['Dövlət, suverenlik və güc', 'Beynəlxalq sistem', 'Tarixi arxa plan'] },
      { title: 'Nəzəriyyələr', lessons: ['Realizm', 'Liberalizm', 'Konstruktivizm'] },
      { title: 'Aktorlar və İnstitutlar', lessons: ['BMT və regional təşkilatlar', 'Qeyri-dövlət aktorları', 'Beynəlxalq hüquq'] },
      { title: 'Təhlükəsizlik və İqtisadiyyat', lessons: ['Münaqişə və sülh', 'Beynəlxalq ticarət', 'Enerji və resurslar'] },
      { title: 'Qlobal Problemlər', lessons: ['İqlim diplomatiyası', 'Miqrasiya', 'Yekun təhlil'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Xəritə və sxemlər.pdf', 'Nümunə hallar.pdf'],
  },
  {
    id: 'davranis-iqtisadiyyati',
    mentor: 'Ülviyyə Əliyeva',
    mentorTitle: 'İqtisadçı',
    summary:
      'İnsanlar niyə həmişə "rasional" qərar vermir? Davranış iqtisadiyyatı klassik nəzəriyyənin boşluqlarını psixologiya ilə doldurur — real eksperimentlər üzərindən.',
    learn: [
      'Rasional aktor modelinin məhdudiyyətlərini izah etmək',
      'Əsas koqnitiv qərəzləri tanımaq',
      'Perspektiv nəzəriyyəsini başa düşmək',
      '"Nudge" yanaşmasını tətbiq etmək',
      'Qərar mühitini yenidən dizayn etmək',
    ],
    modules: [
      { title: 'Klassikadan Davranışa', lessons: ['Homo economicus fərziyyəsi', 'Məhdud rasionallıq', 'Eksperimental iqtisadiyyat'] },
      { title: 'Qərəzlər', lessons: ['Lövbər effekti və çərçivələmə', 'Mövcudluq və təsdiq qərəzi', 'Status-kvo meyli'] },
      { title: 'Risk və Zaman', lessons: ['Perspektiv nəzəriyyəsi', 'İtki qorxusu', 'Vaxta görə diskontlaşdırma'] },
      { title: 'Tətbiq', lessons: ['Nudge və seçim memarlığı', 'Siyasətdə tətbiqlər', 'Etik məhdudiyyətlər'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Eksperiment xülasələri.pdf', 'Məşq ssenariləri.pdf'],
  },

  /* ------------------------------------------------------ business ---- */
  {
    id: 'sahibkarliq-esaslari-fikirden-mehsula',
    mentor: 'Orxan Kərimli',
    mentorTitle: 'Startap Məsləhətçisi',
    summary:
      'Bir fikri işləyən biznesə çevirməyin yolu: problemi doğrulamaq, minimal məhsul qurmaq, müştəri tapmaq və maliyyəni planlamaq.',
    learn: [
      'Biznes fikrini müştəri ilə doğrulamaq',
      'Dəyər təklifini aydın formalaşdırmaq',
      'Minimal işlək məhsul (MVP) planlamaq',
      'Sadə maliyyə modeli qurmaq',
      'İnvestora təqdimat hazırlamaq',
    ],
    modules: [
      { title: 'Fikirdən Problemə', lessons: ['Problemin müəyyən edilməsi', 'Müştəri müsahibələri', 'Bazar araşdırması'] },
      { title: 'Dəyər Təklifi', lessons: ['Hədəf seqmentin seçilməsi', 'Dəyər təklifi kətanı', 'Rəqabət təhlili'] },
      { title: 'Məhsulun Qurulması', lessons: ['MVP anlayışı', 'Sınaq və geri bildirim', 'Təkrarlanan inkişaf'] },
      { title: 'Biznes Modeli', lessons: ['Gəlir modelləri', 'Xərc strukturu', 'Biznes modeli kətanı'] },
      { title: 'Maliyyə', lessons: ['Sadə maliyyə proqnozu', 'Zərərsizlik nöqtəsi', 'Maliyyələşmə mənbələri'] },
      { title: 'Təqdimat', lessons: ['Pitch strukturu', 'Slaydların hazırlanması', 'Suallara hazırlıq'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Biznes modeli kətanı.pdf', 'Pitch şablonu.pptx'],
  },
  {
    id: 'maliyye-analizi-ve-budcelme',
    mentor: 'Samir Hacıyev',
    mentorTitle: 'Maliyyə Analitiki',
    summary:
      'Maliyyə hesabatlarını oxumağı, şirkətin sağlamlığını qiymətləndirməyi və işlək büdcə qurmağı öyrən — hamısı Excel üzərində praktik nümunələrlə.',
    learn: [
      'Balans, mənfəət-zərər və pul axını hesabatlarını oxumaq',
      'Əsas maliyyə əmsallarını hesablamaq və şərh etmək',
      'Büdcə hazırlamaq və plan-fakt təhlili aparmaq',
      'Pul axını proqnozu qurmaq',
      'İnvestisiya qərarını qiymətləndirmək',
    ],
    modules: [
      { title: 'Maliyyə Hesabatları', lessons: ['Balans hesabatı', 'Mənfəət və zərər hesabatı', 'Pul vəsaitlərinin hərəkəti'] },
      { title: 'Əmsal Təhlili', lessons: ['Likvidlik əmsalları', 'Rentabellik əmsalları', 'Borc və dayanıqlıq'] },
      { title: 'Büdcələmə', lessons: ['Büdcə növləri', 'Büdcənin qurulması', 'Plan-fakt təhlili'] },
      { title: 'Proqnozlaşdırma', lessons: ['Gəlir proqnozu', 'Pul axını proqnozu', 'Ssenari təhlili'] },
      { title: 'İnvestisiya Qərarları', lessons: ['Pulun zaman dəyəri', 'NPV və IRR', 'Qərar nümunəsi'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Büdcə şablonu.xlsx', 'Nümunə hesabatlar.xlsx'],
  },
  {
    id: 'layihe-idareetmesi-agile-scrum',
    mentor: 'Türkan Əliyeva',
    mentorTitle: 'Scrum Master',
    summary:
      'Agile düşüncəsini və Scrum çərçivəsini praktik öyrən: rollar, mərasimlər, backlog idarəsi və komandanın real problemləri.',
    learn: [
      'Agile manifestinin prinsiplərini tətbiq etmək',
      'Scrum rollarını və mərasimlərini idarə etmək',
      'Məhsul backlog-unu prioritetləşdirmək',
      'Sprint planlaması və qiymətləndirmə aparmaq',
      'Komanda problemlərini aradan qaldırmaq',
    ],
    modules: [
      { title: 'Agile Düşüncəsi', lessons: ['Şəlalə və Agile fərqi', 'Agile manifesti', 'Nə vaxt Agile uyğun deyil'] },
      { title: 'Scrum Çərçivəsi', lessons: ['Rollar və məsuliyyətlər', 'Sprint dövrü', 'Artefaktlar'] },
      { title: 'Backlog İdarəsi', lessons: ['İstifadəçi hekayələri', 'Prioritetləşdirmə üsulları', 'Qiymətləndirmə və story point'] },
      { title: 'Komanda və Təkmilləşmə', lessons: ['Gündəlik görüş', 'Retrospektiv', 'Ümumi səhvlər və həlləri'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Sprint şablonları.xlsx', 'Retrospektiv təlimatı.pdf'],
  },
  {
    id: 'reqemsal-marketinq-strategiyasi',
    mentor: 'Nərgiz Sultanova',
    mentorTitle: 'Rəqəmsal Marketinq Meneceri',
    summary:
      'Kanal-kanal deyil, strategiya kimi düşün: auditoriyanı müəyyən et, mesajı qur, kanalları seç və nəticəni ölçərək büdcəni düzgün yönləndir.',
    learn: [
      'Hədəf auditoriyanı və müştəri yolunu təsvir etmək',
      'Kanal strategiyası qurmaq',
      'Məzmun planı hazırlamaq',
      'Kampaniya nəticələrini ölçmək',
      'Büdcəni nəticəyə görə bölüşdürmək',
    ],
    /* m1/m2 mirror the rows already in the database — additive only. */
    modules: [
      { title: 'Strategiya Əsasları', lessons: ['Hədəf auditoriya təhlili', 'Marka mesajlaşması', 'Məqsəd və KPI təyini'] },
      { title: 'Kanallar və Ölçmə', lessons: ['SEO əsasları', 'Kampaniya analitikası', 'Büdcənin optimallaşdırılması'] },
      { title: 'Məzmun və Mesaj', lessons: ['Məzmun planı', 'Yaradıcı mesajlaşma', 'Vizual və mətn uyğunluğu'] },
      { title: 'Digər Kanallar', lessons: ['Sosial media', 'E-poçt marketinqi', 'Ödənişli reklam'] },
      { title: 'Kampaniya Layihəsi', lessons: ['Kampaniyanın planlaşdırılması', 'İcra', 'Nəticə hesabatı'] },
    ],
    materials: ['Məzmun təqvimi şablonu.pdf', 'Kampaniya planı şablonu.xlsx', 'KPI bələdçisi.pdf'],
  },

  /* ------------------------------------------------------ language ---- */
  {
    id: 'turk-dilinde-serbest-danisiq',
    mentor: 'Aysu Qəhrəmanlı',
    mentorTitle: 'Türk Dili Müəllimi',
    summary:
      'Azərbaycan dilini bilən üçün türk dili sürətli öyrənilir, amma "yalançı dostlar" və tələffüz fərqləri çaşdırır. Bu kurs məhz danışıq üzərində qurulub.',
    learn: [
      'Gündəlik mövzularda sərbəst danışmaq',
      'Azərbaycan və türk dili arasındakı fərqləri ayırd etmək',
      'Düzgün tələffüz və intonasiya qurmaq',
      'Zaman formalarını danışıqda işlətmək',
      'Rəsmi və qeyri-rəsmi üslubu fərqləndirmək',
    ],
    modules: [
      { title: 'Səs və Tələffüz', lessons: ['Türk əlifbası və səslər', 'Vurğu və intonasiya', 'Ən çox səhv edilən sözlər'] },
      { title: 'Gündəlik Danışıq', lessons: ['Tanışlıq və salamlaşma', 'Alış-veriş və yol soruşmaq', 'Telefon danışığı'] },
      { title: 'Qrammatik Təməl', lessons: ['İsim halları', 'Zaman formaları', 'Şərt və arzu'] },
      { title: '"Yalançı Dostlar"', lessons: ['Eyni görünən, fərqli mənalı sözlər', 'İfadə fərqləri', 'Məşq dialoqları'] },
      { title: 'Üslub', lessons: ['Rəsmi danışıq', 'Qeyri-rəsmi və jarqon', 'Yekun danışıq məşqi'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Dialoq mətnləri.pdf', 'Tələffüz audio siyahısı.pdf'],
  },
  {
    id: 'rus-dili-esaslari',
    mentor: 'Yelena Abbasova',
    mentorTitle: 'Rus Dili Müəllimi',
    summary:
      'Kiril əlifbasından başlayıb gündəlik ünsiyyətə qədər: oxumağı, əsas qrammatikanı və praktik danışıq qəliblərini sıfırdan öyrən.',
    learn: [
      'Kiril əlifbasını oxumaq və yazmaq',
      'Əsas hal sistemini başa düşmək',
      'Gündəlik mövzularda sadə cümlələr qurmaq',
      'Fellərin indiki və keçmiş zamanını işlətmək',
      'Sadə mətnləri oxuyub anlamaq',
    ],
    modules: [
      { title: 'Əlifba və Səslər', lessons: ['Kiril hərfləri', 'Oxu qaydaları', 'Vurğunun əhəmiyyəti'] },
      { title: 'İlk Cümlələr', lessons: ['Salamlaşma və tanışlıq', 'Şəxs əvəzlikləri', 'Sadə cümlə quruluşu'] },
      { title: 'Hallar', lessons: ['Adlıq və təsirlik hal', 'Yiyəlik hal', 'Yerlik və yönlük hal'] },
      { title: 'Fellər', lessons: ['İndiki zaman', 'Keçmiş zaman', 'Hərəkət felləri'] },
      { title: 'Praktika', lessons: ['Gündəlik dialoqlar', 'Qısa mətnlərin oxunması', 'Yekun təkrar'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Əlifba məşq vərəqləri.pdf', 'Lüğət minimumu.pdf'],
  },
  {
    id: 'ielts-e-hazirliq-proqrami',
    mentor: 'Rəvan Məmmədov',
    mentorTitle: 'IELTS Təlimçisi',
    summary:
      'Dörd bölmənin hər biri üçün ayrıca strategiya: imtahanın məntiqini anlayıb vaxtı düzgün bölməyi, tipik tələləri görməyi və bal artırmağı öyrən.',
    learn: [
      'IELTS formatını və qiymətləndirmə meyarlarını bilmək',
      'Listening və Reading üçün vaxt strategiyası qurmaq',
      'Writing Task 1 və 2 strukturunu mənimsəmək',
      'Speaking-də axıcılığı artırmaq',
      'Zəif bölməni hədəfli şəkildə gücləndirmək',
    ],
    modules: [
      { title: 'İmtahana Baxış', lessons: ['Format və bal sistemi', 'Qiymətləndirmə meyarları', 'Hazırlıq planının qurulması'] },
      { title: 'Listening', lessons: ['Sual tipləri', 'Not götürmə texnikası', 'Tipik tələlər'] },
      { title: 'Reading', lessons: ['Skimming və scanning', 'True/False/Not Given', 'Vaxtın idarə olunması'] },
      { title: 'Writing', lessons: ['Task 1: qrafik təsviri', 'Task 2: esse strukturu', 'Leksik müxtəliflik'] },
      { title: 'Speaking', lessons: ['Üç hissənin məntiqi', 'Cavabın genişləndirilməsi', 'Tələffüz və axıcılıq'] },
      { title: 'Sınaq və Təhlil', lessons: ['Tam sınaq imtahanı', 'Səhvlərin təhlili', 'Son həftə strategiyası'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Sınaq imtahanı dəsti.pdf', 'Esse nümunələri.pdf'],
  },
  {
    id: 'ingilis-dili-biznes',
    mentor: 'Ceyhun Əliyev',
    mentorTitle: 'Biznes İngilis Dili Təlimçisi',
    summary:
      'İş mühitində işlənən ingilis dili: e-poçt, iclas, təqdimat və danışıqlar — hər mövzu hazır qəliblər və rollu məşqlərlə möhkəmləndirilir.',
    learn: [
      'Peşəkar e-poçt yazmaq',
      'İclasda fikir bildirmək və razılaşmamaq',
      'Təqdimatı strukturla aparmaq',
      'Danışıqlarda nəzakətli dil işlətmək',
      'Telefon və onlayn görüşlərdə sərbəst olmaq',
    ],
    /* m1/m2 mirror the rows already in the database — additive only. */
    modules: [
      { title: 'Yazılı Kommunikasiya', lessons: ['Peşəkar e-poçt yazmaq', 'Hesabat və memo yazmaq', 'Rəsmi və qeyri-rəsmi ifadələr'] },
      { title: 'Şifahi Kommunikasiya', lessons: ['Görüşlərdə danışıq', 'Təqdimat bacarıqları', 'Telefon və onlayn görüşlər'] },
      { title: 'İclasları İdarə Etmək', lessons: ['İclası aparmaq', 'Fikir bildirmək və müdaxilə', 'Razılaşmamaq və kompromis'] },
      { title: 'Danışıqlar', lessons: ['Nəzakətli təkid dili', 'Şərt cümlələri', 'Rollu məşq'] },
    ],
    materials: ['Lüğət siyahısı.pdf', 'E-poçt şablonları.zip', 'İfadələr toplusu.pdf'],
  },

  /* ---------------------------------------------------------- arts ---- */
  {
    id: 'fotoqrafiya-seneti',
    mentor: 'Elçin Şirinov',
    mentorTitle: 'Peşəkar Fotoqraf',
    summary:
      'Kameranı avtomatik rejimdən çıxar: işıq, ekspozisiya və kompozisiyanı anlayaraq istədiyin kadrı şüurlu şəkildə qur.',
    learn: [
      'Diafraqma, sürət və ISO üçlüyünü idarə etmək',
      'İşığı oxumaq və ondan istifadə etmək',
      'Kompozisiya qaydalarını tətbiq etmək',
      'Müxtəlif janrlarda çəkiliş aparmaq',
      'Şəkilləri redaktə edib portfolio qurmaq',
    ],
    modules: [
      { title: 'Kameranı Anlamaq', lessons: ['Kameranın iş prinsipi', 'Ekspozisiya üçbucağı', 'Fokus və dərinlik'] },
      { title: 'İşıq', lessons: ['Təbii işıq', 'İşığın istiqaməti və keyfiyyəti', 'Süni işıqla işləmək'] },
      { title: 'Kompozisiya', lessons: ['Üçdəbir qaydası', 'Xətlər və çərçivələmə', 'Qaydaları nə vaxt pozmalı'] },
      { title: 'Janrlar', lessons: ['Portret', 'Mənzərə', 'Küçə fotoqrafiyası'] },
      { title: 'Redaktə və Portfolio', lessons: ['Əsas redaktə addımları', 'Rəng və ton', 'Portfolio seçimi'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Çəkiliş tapşırıqları.pdf', 'Redaktə presetləri.zip'],
  },
  {
    id: 'dunya-tarixine-seyahet',
    mentor: 'Mahir Əliyev',
    mentorTitle: 'Tarix Müəllimi',
    summary:
      'Tarixi tarix-ad yığını kimi yox, səbəb-nəticə zənciri kimi oxu: ilk sivilizasiyalardan müasir dünyaya qədər böyük dönüş nöqtələri.',
    learn: [
      'Əsas tarixi dövrləri ardıcıllıqla yerləşdirmək',
      'Sivilizasiyaların yüksəliş və süqut səbəblərini təhlil etmək',
      'Mənbələrə tənqidi yanaşmaq',
      'Tarixi hadisələri müasir dünya ilə əlaqələndirmək',
      'Qısa tarixi esse yazmaq',
    ],
    modules: [
      { title: 'İlk Sivilizasiyalar', lessons: ['Kənd təsərrüfatı inqilabı', 'Mesopotamiya və Misir', 'Yazının yaranması'] },
      { title: 'Antik Dünya', lessons: ['Yunanıstan', 'Roma imperiyası', 'Şərq sivilizasiyaları'] },
      { title: 'Orta Əsrlər', lessons: ['İslam dünyası', 'Avropada feodalizm', 'Ticarət yolları'] },
      { title: 'Yeni Dövr', lessons: ['Coğrafi kəşflər', 'Sənaye inqilabı', 'İnqilablar əsri'] },
      { title: 'Müasir Dünya', lessons: ['Dünya müharibələri', 'Soyuq müharibə', 'Qloballaşma'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Xronoloji cədvəl.pdf', 'Mənbə seçmələri.pdf'],
  },
  {
    id: 'yaradici-yazi-seneti',
    mentor: 'Günay Rzayeva',
    mentorTitle: 'Yazıçı və Redaktor',
    summary:
      'Ağ səhifə qorxusundan hazır hekayəyə: personaj, süjet, dialoq və redaktə — hər dərsdə yazırsan, sadəcə oxumursan.',
    learn: [
      'İdeyadan süjet qurmaq',
      'İnandırıcı personaj yaratmaq',
      'Təbii dialoq yazmaq',
      '"Göstər, demə" prinsipini tətbiq etmək',
      'Öz mətnini redaktə etmək',
    ],
    modules: [
      { title: 'Başlamaq', lessons: ['Yazı vərdişi qurmaq', 'İdeyaların toplanması', 'Ağ səhifə ilə mübarizə'] },
      { title: 'Personaj', lessons: ['Personajın motivasiyası', 'Daxili ziddiyyət', 'Personaj vərəqəsi'] },
      { title: 'Süjet', lessons: ['Süjet strukturları', 'Gərginliyin qurulması', 'Final'] },
      { title: 'Səhnə və Dialoq', lessons: ['Səhnənin qurulması', 'Dialoqun təbiiliyi', 'Göstər, demə'] },
      { title: 'Redaktə', lessons: ['İlk qaralamadan sonra', 'Kəsmək sənəti', 'Geri bildirimlə işləmək'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Yazı tapşırıqları.pdf', 'Redaktə yoxlama siyahısı.pdf'],
  },
  {
    id: 'qrafik-dizayn-esaslari',
    mentor: 'Səbuhi Nəbiyev',
    mentorTitle: 'Qrafik Dizayner',
    summary:
      'Dizaynı zövq məsələsi kimi deyil, qaydalar sistemi kimi öyrən: kompozisiya, tipoqrafiya, rəng və iyerarxiya — hər mövzu praktik tapşırıqla.',
    learn: [
      'Kompozisiya və boşluqdan düzgün istifadə etmək',
      'Şriftləri uyğunlaşdırmaq və oxunaqlılığı qorumaq',
      'Rəng nəzəriyyəsini tətbiq etmək',
      'Vizual iyerarxiya qurmaq',
      'Hazır işi çap və rəqəmsal üçün hazırlamaq',
    ],
    /* m1/m2 mirror the rows already in the database — additive only. */
    modules: [
      { title: 'Dizayn Prinsipləri', lessons: ['Rəng nəzəriyyəsi', 'Kompozisiya qaydaları', 'Boşluğun rolu'] },
      { title: 'Praktik Layihə', lessons: ['Loqotip yaratmaq', 'Figma ilə iş', 'Yekun fayl hazırlığı'] },
      { title: 'Tipoqrafiya', lessons: ['Şrift anatomiyası', 'Şrift cütləşdirmə', 'Oxunaqlılıq'] },
      { title: 'İyerarxiya və Şəbəkə', lessons: ['Vizual iyerarxiya', 'Grid sistemi', 'Layout məşqi'] },
      { title: 'Rəng Sistemləri', lessons: ['Rəng çarxı və harmoniya', 'Kontrast və əlçatanlıq', 'Palitranın qurulması'] },
    ],
    materials: ['Rəng palitraları.pdf', 'Şablon fayllar.zip', 'Kurs slaydları.pdf'],
  },

  /* ------------------------------------------------------ personal ---- */
  {
    id: 'vaxt-idareetmesi-ve-mehsuldarliq',
    mentor: 'İlkin Hüseynli',
    mentorTitle: 'Məhsuldarlıq Təlimçisi',
    summary:
      'Daha çox işləmək yox, daha düzgün işləmək: prioritet qoymaq, diqqəti qorumaq və işləyən bir sistem qurmaq.',
    learn: [
      'Tapşırıqları təsirə görə prioritetləşdirmək',
      'Diqqəti dağıdan amilləri idarə etmək',
      'Real planlama və vaxt bloklaması qurmaq',
      'Təxirəsalmanın səbəbini aradan qaldırmaq',
      'Həftəlik icmal vərdişi formalaşdırmaq',
    ],
    modules: [
      { title: 'Vaxtın Auditi', lessons: ['Vaxt nəyə gedir', 'Enerji və diqqət dövrləri', 'Real imkanın qiymətləndirilməsi'] },
      { title: 'Prioritetləşdirmə', lessons: ['Vacib və təcili ayrımı', 'Tapşırıqların qruplaşdırılması', '"Yox" demək'] },
      { title: 'Sistem Qurmaq', lessons: ['Tapşırıq sistemi seçimi', 'Vaxt bloklaması', 'Həftəlik icmal'] },
      { title: 'Diqqət və Davamlılıq', lessons: ['Dərin iş rejimi', 'Təxirəsalma ilə iş', 'Vərdişin qorunması'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Həftəlik planlama şablonu.pdf', 'Vaxt auditi cədvəli.xlsx'],
  },
  {
    id: 'effektiv-unsiyyet-ve-natiqlik',
    mentor: 'Aysel Şirinova',
    mentorTitle: 'Ünsiyyət Təlimçisi',
    summary:
      'Fikri aydın çatdırmaq və auditoriya qarşısında özünü rahat hiss etmək — struktur, səs, bədən dili və hazırlıq üzərindən.',
    learn: [
      'Nitqi aydın strukturla qurmaq',
      'Səs və bədən dilini idarə etmək',
      'Çıxış həyəcanı ilə işləmək',
      'Aktiv dinləmə tətbiq etmək',
      'Çətin söhbətləri idarə etmək',
    ],
    modules: [
      { title: 'Ünsiyyətin Əsasları', lessons: ['Mesajın aydınlığı', 'Aktiv dinləmə', 'Qeyri-verbal ünsiyyət'] },
      { title: 'Nitqin Qurulması', lessons: ['Giriş, əsas hissə, nəticə', 'Hekayə ilə təsir', 'Vaxtın idarə olunması'] },
      { title: 'Səhnə Bacarıqları', lessons: ['Səs və tempin idarəsi', 'Bədən dili və göz təması', 'Həyəcanla iş'] },
      { title: 'Çətin Vəziyyətlər', lessons: ['Gözlənilməz suallar', 'Fikir ayrılığının idarəsi', 'Geri bildirim vermək'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Nitq hazırlıq şablonu.pdf', 'Məşq tapşırıqları.pdf'],
  },
  {
    id: 'liderlik-bacariqlari',
    mentor: 'Rauf Məmmədzadə',
    mentorTitle: 'Liderlik və Komanda Təlimçisi',
    summary:
      'Liderlik vəzifə deyil, davranışdır: etibar qurmaq, məsuliyyət paylamaq, geri bildirim vermək və komandanı çətin anda saxlamaq.',
    learn: [
      'Öz liderlik üslubunu tanımaq',
      'Komandada etibar və psixoloji təhlükəsizlik qurmaq',
      'Effektiv delegasiya etmək',
      'İnkişafetdirici geri bildirim vermək',
      'Münaqişəni konstruktiv idarə etmək',
    ],
    /* m1/m2 mirror the rows already in the database — additive only. */
    modules: [
      { title: 'Liderlik Əsasları', lessons: ['Lider kimi özünü tanımaq', 'Komanda motivasiyası', 'Menecer və lider fərqi'] },
      { title: 'Praktik Vərdişlər', lessons: ['Konflikt idarəetməsi', 'Effektiv fikir bildirmə', 'Birə-bir görüşlər'] },
      { title: 'Komanda Qurmaq', lessons: ['Etibarın təməli', 'Psixoloji təhlükəsizlik', 'Komanda mərhələləri'] },
      { title: 'Çətin Anlar', lessons: ['Çətin qərarlar', 'Dəyişiklik dövründə liderlik', 'Delegasiya'] },
      { title: 'İnkişaf', lessons: ['Komandanın inkişaf planı', 'Uzunmüddətli motivasiya', 'Yekun icmal'] },
    ],
    materials: ['Öz-özünə qiymətləndirmə vərəqi.pdf', 'Birə-bir görüş şablonu.pdf', 'Geri bildirim bələdçisi.pdf'],
  },
  {
    id: 'karyera-planlamasi-ve-cv-hazirligi',
    mentor: 'Zeynəb Qurbanova',
    mentorTitle: 'Karyera Məsləhətçisi',
    summary:
      'İşə qəbul prosesini anlayaraq hərəkət et: güclü tərəflərini müəyyən et, CV və LinkedIn profilini qur, müsahibəyə hazırlaş.',
    learn: [
      'Güclü tərəf və karyera istiqamətini müəyyən etmək',
      'Nəticəyönümlü CV yazmaq',
      'Motivasiya məktubu hazırlamaq',
      'LinkedIn profilini gücləndirmək',
      'Müsahibə suallarına strukturla cavab vermək',
    ],
    modules: [
      { title: 'Özünüdərk', lessons: ['Bacarıq inventarı', 'Dəyərlər və prioritetlər', 'Karyera istiqamətinin seçilməsi'] },
      { title: 'CV və Məktub', lessons: ['CV strukturu', 'Nəticələrin yazılması', 'Motivasiya məktubu'] },
      { title: 'Rəqəmsal Mövcudluq', lessons: ['LinkedIn profili', 'Şəbəkələşmə', 'Portfolio'] },
      { title: 'Müsahibə', lessons: ['Ən çox verilən suallar', 'STAR metodu', 'Əmək haqqı danışığı'] },
    ],
    materials: ['Kurs slaydları.pdf', 'CV şablonları.docx', 'Müsahibə sualları bankı.pdf'],
  },

  /* ---------------------------------------------------------- math ---- */
  {
    id: 'xetti-cebre-giris',
    mentor: 'Vüqar Nəbiyev',
    mentorTitle: 'Riyaziyyat Müəllimi',
    summary:
      'Matrisləri düstur kimi yox, həndəsi çevrilmə kimi anla. Data elmi və mühəndislik üçün lazım olan xətti cəbr intuisiyası.',
    learn: [
      'Vektor və matris əməliyyatlarını aparmaq',
      'Xətti tənliklər sistemini həll etmək',
      'Determinant və tərs matrisi hesablamaq',
      'Xətti asılılıq və bazisi başa düşmək',
      'Məxsusi qiymət və vektorları tapmaq',
    ],
    modules: [
      { title: 'Vektorlar', lessons: ['Vektor anlayışı', 'Skalyar hasil', 'Həndəsi şərh'] },
      { title: 'Matrislər', lessons: ['Matris əməliyyatları', 'Matris kimi çevrilmə', 'Xüsusi matrislər'] },
      { title: 'Tənliklər Sistemi', lessons: ['Qauss üsulu', 'Determinant', 'Tərs matris'] },
      { title: 'Fəza və Bazis', lessons: ['Xətti asılılıq', 'Bazis və ölçü', 'Rütbə (rank)'] },
      { title: 'Məxsusi Qiymətlər', lessons: ['Məxsusi qiymət və vektor', 'Diaqonallaşdırma', 'Tətbiq nümunələri'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Məsələlər toplusu.pdf', 'Həll nümunələri.pdf'],
  },
  {
    id: 'ehtimal-nezeriyyesi-ve-statistika',
    mentor: 'Sevinc Abdullayeva',
    mentorTitle: 'Statistika Müəllimi',
    summary:
      'Təsadüfü ölçməyi öyrən: ehtimaldan paylanmalara, oradan da hipotez yoxlamasına — data ilə işləyən hər kəs üçün təməl.',
    learn: [
      'Ehtimalı düzgün hesablamaq',
      'Şərti ehtimal və Bayes düsturunu tətbiq etmək',
      'Əsas paylanmaları tanımaq',
      'Etibarlılıq intervalı qurmaq',
      'Hipotez yoxlaması aparmaq və p-dəyəri şərh etmək',
    ],
    modules: [
      { title: 'Ehtimalın Əsasları', lessons: ['Hadisə və ehtimal', 'Kombinatorika', 'Şərti ehtimal və Bayes'] },
      { title: 'Təsadüfi Kəmiyyətlər', lessons: ['Diskret kəmiyyətlər', 'Kəsilməz kəmiyyətlər', 'Gözlənilən qiymət və dispersiya'] },
      { title: 'Paylanmalar', lessons: ['Binomial paylanma', 'Normal paylanma', 'Mərkəzi limit teoremi'] },
      { title: 'Təsviri Statistika', lessons: ['Mərkəzi meyl ölçüləri', 'Yayılma ölçüləri', 'Vizual təhlil'] },
      { title: 'Nəticə Çıxarma', lessons: ['Etibarlılıq intervalı', 'Hipotez yoxlaması', 'p-dəyərinin düzgün şərhi'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Statistik cədvəllər.pdf', 'Məsələlər toplusu.pdf'],
  },
  {
    id: 'mentiqi-dusunce-ve-problem-helli',
    mentor: 'Elmar Əliyev',
    mentorTitle: 'Məntiq və Analitik Düşüncə Təlimçisi',
    summary:
      'Arqumenti təhlil etməyi, məntiqi səhvləri görməyi və mürəkkəb problemi idarə oluna bilən hissələrə bölməyi öyrən.',
    learn: [
      'Arqumentin strukturunu ayırd etmək',
      'Ən çox rast gəlinən məntiqi səhvləri tanımaq',
      'Deduktiv və induktiv mühakiməni fərqləndirmək',
      'Problemi strukturlu şəkildə parçalamaq',
      'Qərar üçün meyar sistemi qurmaq',
    ],
    modules: [
      { title: 'Məntiqin Əsasları', lessons: ['Müddəa və nəticə', 'Deduksiya və induksiya', 'Doğruluq cədvəlləri'] },
      { title: 'Məntiqi Səhvlər', lessons: ['Formal səhvlər', 'Qeyri-formal səhvlər', 'Mediada nümunələr'] },
      { title: 'Problem Həlli', lessons: ['Problemin dəqiq qoyuluşu', 'Parçalama (dekompozisiya)', 'Fərziyyələrin yoxlanması'] },
      { title: 'Qərar Vermə', lessons: ['Meyar matrisi', 'Qeyri-müəyyənlikdə qərar', 'Yekun məşq'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Məntiq məşqləri.pdf', 'Nümunə təhlillər.pdf'],
  },
  {
    id: 'kalkulusun-esaslari',
    mentor: 'Fuad Həsənov',
    mentorTitle: 'Riyazi Analiz Müəllimi',
    summary:
      'Törəmə və inteqralın nə demək olduğunu həqiqətən anla: dəyişmə sürəti və toplam kəmiyyət — həndəsi intuisiya ilə, quru düsturla deyil.',
    learn: [
      'Limit anlayışını başa düşmək',
      'Törəməni hesablamaq və şərh etmək',
      'Funksiyanı törəmə ilə tədqiq etmək',
      'Müəyyən və qeyri-müəyyən inteqralı hesablamaq',
      'Tətbiqi məsələlər həll etmək',
    ],
    modules: [
      { title: 'Limit', lessons: ['Limit anlayışı', 'Limitin hesablanması', 'Kəsilməzlik'] },
      { title: 'Törəmə', lessons: ['Törəmənin mənası', 'Törəmə qaydaları', 'Mürəkkəb funksiyanın törəməsi'] },
      { title: 'Törəmənin Tətbiqi', lessons: ['Ekstremumlar', 'Funksiyanın tədqiqi', 'Optimallaşdırma məsələləri'] },
      { title: 'İnteqral', lessons: ['İbtidai funksiya', 'Müəyyən inteqral', 'Nyuton-Leybnis düsturu'] },
      { title: 'İnteqralın Tətbiqi', lessons: ['Sahənin hesablanması', 'Həcm', 'Yekun məsələlər'] },
    ],
    materials: ['Kurs slaydları.pdf', 'Düsturlar vərəqi.pdf', 'Məsələlər toplusu.pdf'],
  },
];
