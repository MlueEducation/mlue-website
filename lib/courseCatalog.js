/* Static curriculum content for the small set of "flagship" courses that
   have a real Course Details + Course Player flow. The other ~35 courses in
   components/CoursesHome.js stay title/level/duration-only and non-clickable
   — this catalogue only covers the courses worth fully authoring for now.
   Per-user state (enrollment, lesson completion, notes) lives in Supabase
   (user_courses / lesson_progress / lesson_notes), not here — this file is
   curriculum metadata only, same split already used for ROADMAP_TRACKS. */

const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
];

export const COURSES = [
  {
    id: 'python-data-analitikasi',
    categoryId: 'data',
    title: 'Python ilə Data Analitikasına Giriş',
    level: 'Başlanğıc',
    duration: '5 həftə',
    mentor: 'Aysel Məmmədova',
    mentorTitle: 'Data Analitik, ABB Bank',
    summary: 'Python-un əsaslarından tutmuş real data ilə işləməyə qədər — pandas və NumPy kitabxanaları ilə məlumatları təmizləməyi, təhlil etməyi və vizuallaşdırmağı öyrənəcəksən.',
    whatYouWillLearn: [
      'Python-da dəyişənlər, siyahılar və funksiyalarla işləmək',
      'Pandas ilə cədvəl formatlı məlumatları oxumaq və təmizləmək',
      'NumPy ilə ədədi hesablamalar aparmaq',
      'Matplotlib ilə sadə qrafiklər qurmaq',
    ],
    curriculum: [
      {
        id: 'm1', title: 'Giriş və Quraşdırma',
        lessons: [
          { id: 'm1-l1', title: 'Python-a giriş', duration: '12:30', videoUrl: SAMPLE_VIDEOS[0] },
          { id: 'm1-l2', title: 'Mühitin qurulması (Anaconda)', duration: '8:15', videoUrl: null },
        ],
      },
      {
        id: 'm2', title: 'Data ilə İşləmək',
        lessons: [
          { id: 'm2-l1', title: 'Pandas ilə cədvəllər', duration: '15:40', videoUrl: null },
          { id: 'm2-l2', title: 'Məlumatların təmizlənməsi', duration: '11:20', videoUrl: null },
        ],
      },
    ],
    materials: [
      { id: 'mat1', name: 'Dərs 1 – Slaydlar.pdf' },
      { id: 'mat2', name: 'Nümunə kodlar.zip' },
    ],
  },
  {
    id: 'alqoritmler-data-strukturlari',
    categoryId: 'cs',
    title: 'Alqoritmlər və Data Strukturları',
    level: 'Orta',
    duration: '8 həftə',
    mentor: 'Elvin Quliyev',
    mentorTitle: 'Backend Mühəndis, Kapital Bank',
    summary: 'Effektiv kod yazmaq üçün fundamental alqoritmləri və data strukturlarını real nümunələr üzərindən öyrənəcəksən — texniki müsahibələr üçün əsas hazırlıq.',
    whatYouWillLearn: [
      'Massiv, siyahı, stack və queue strukturlarının işləmə prinsipi',
      'Axtarış və sıralama alqoritmlərinin mürəkkəbliyini qiymətləndirmək',
      'Ağac və qraf strukturları ilə praktik məsələ həlli',
      'Böyük O notasiyası ilə kodun performansını təhlil etmək',
    ],
    curriculum: [
      {
        id: 'm1', title: 'Əsas Strukturlar',
        lessons: [
          { id: 'm1-l1', title: 'Massiv və bağlı siyahılar', duration: '14:05', videoUrl: SAMPLE_VIDEOS[1] },
          { id: 'm1-l2', title: 'Stack və Queue', duration: '10:50', videoUrl: null },
        ],
      },
      {
        id: 'm2', title: 'Sıralama və Axtarış',
        lessons: [
          { id: 'm2-l1', title: 'Sürətli sıralama (Quick Sort)', duration: '13:15', videoUrl: null },
          { id: 'm2-l2', title: 'İkili axtarış', duration: '9:40', videoUrl: null },
        ],
      },
    ],
    materials: [
      { id: 'mat1', name: 'Alqoritm konspektləri.pdf' },
      { id: 'mat2', name: 'Praktik tapşırıqlar.zip' },
    ],
  },
  {
    id: 'reqemsal-marketinq-strategiyasi',
    categoryId: 'business',
    title: 'Rəqəmsal Marketinq Strategiyası',
    level: 'Orta',
    duration: '5 həftə',
    mentor: 'Nərmin Hüseynova',
    mentorTitle: 'Marketinq Direktoru, Bravo',
    summary: 'Sosial media, SEO və məzmun marketinqini birləşdirən real strategiya qurmağı, kampaniya nəticələrini ölçməyi öyrənəcəksən.',
    whatYouWillLearn: [
      'Hədəf auditoriyanı müəyyən etmək və mesajlaşma strategiyası qurmaq',
      'SEO əsasları ilə üzvi trafiki artırmaq',
      'Sosial media kampaniyalarını planlaşdırmaq və ölçmək',
      'Məzmun təqvimi hazırlamaq',
    ],
    curriculum: [
      {
        id: 'm1', title: 'Strategiya Əsasları',
        lessons: [
          { id: 'm1-l1', title: 'Hədəf auditoriya təhlili', duration: '11:20', videoUrl: SAMPLE_VIDEOS[2] },
          { id: 'm1-l2', title: 'Marka mesajlaşması', duration: '9:05', videoUrl: null },
        ],
      },
      {
        id: 'm2', title: 'Kanallar və Ölçmə',
        lessons: [
          { id: 'm2-l1', title: 'SEO əsasları', duration: '13:30', videoUrl: null },
          { id: 'm2-l2', title: 'Kampaniya analitikası', duration: '10:15', videoUrl: null },
        ],
      },
    ],
    materials: [
      { id: 'mat1', name: 'Məzmun təqvimi şablonu.pdf' },
    ],
  },
  {
    id: 'ingilis-dili-biznes',
    categoryId: 'language',
    title: 'İngilis Dili — Biznes Kommunikasiyası',
    level: 'Orta',
    duration: '8 həftə',
    mentor: 'Leyla Cavadova',
    mentorTitle: 'İngilis Dili Müəllimi, IELTS Sertifikatlı',
    summary: 'İş yerində, görüşlərdə və yazışmalarda inamla ingiliscə danışmağı və yazmağı praktik nümunələr üzərindən öyrənəcəksən.',
    whatYouWillLearn: [
      'Peşəkar e-poçt və məktub yazmaq',
      'Görüş və təqdimatlarda özünü ifadə etmək',
      'Danışıq bacarıqlarını real ssenarilərlə inkişaf etdirmək',
      'Biznes lüğətini genişləndirmək',
    ],
    curriculum: [
      {
        id: 'm1', title: 'Yazılı Kommunikasiya',
        lessons: [
          { id: 'm1-l1', title: 'Peşəkar e-poçt yazmaq', duration: '10:40', videoUrl: SAMPLE_VIDEOS[3] },
          { id: 'm1-l2', title: 'Hesabat və memo yazmaq', duration: '8:55', videoUrl: null },
        ],
      },
      {
        id: 'm2', title: 'Şifahi Kommunikasiya',
        lessons: [
          { id: 'm2-l1', title: 'Görüşlərdə danışıq', duration: '12:10', videoUrl: null },
          { id: 'm2-l2', title: 'Təqdimat bacarıqları', duration: '11:45', videoUrl: null },
        ],
      },
    ],
    materials: [
      { id: 'mat1', name: 'Lüğət siyahısı.pdf' },
      { id: 'mat2', name: 'E-poçt şablonları.zip' },
    ],
  },
  {
    id: 'qrafik-dizayn-esaslari',
    categoryId: 'arts',
    title: 'Qrafik Dizayn Əsasları',
    level: 'Başlanğıc',
    duration: '5 həftə',
    mentor: 'Tural Abbasov',
    mentorTitle: 'Art Director, Freelance',
    summary: 'Rəng, kompozisiya və tipoqrafiya prinsiplərini öyrənərək öz dizayn layihələrini yaratmağa başlayacaqsan.',
    whatYouWillLearn: [
      'Rəng nəzəriyyəsi və kompozisiya qaydaları',
      'Tipoqrafiya seçimi və mətn hierarxiyası',
      'Loqotip və marka kimliyi əsasları',
      'Figma ilə praktik dizayn işi',
    ],
    curriculum: [
      {
        id: 'm1', title: 'Dizayn Prinsipləri',
        lessons: [
          { id: 'm1-l1', title: 'Rəng nəzəriyyəsi', duration: '9:30', videoUrl: SAMPLE_VIDEOS[4] },
          { id: 'm1-l2', title: 'Kompozisiya qaydaları', duration: '10:20', videoUrl: null },
        ],
      },
      {
        id: 'm2', title: 'Praktik Layihə',
        lessons: [
          { id: 'm2-l1', title: 'Loqotip yaratmaq', duration: '14:00', videoUrl: null },
          { id: 'm2-l2', title: 'Figma ilə iş', duration: '12:50', videoUrl: null },
        ],
      },
    ],
    materials: [
      { id: 'mat1', name: 'Rəng palitraları.pdf' },
    ],
  },
  {
    id: 'liderlik-bacariqlari',
    categoryId: 'personal',
    title: 'Liderlik Bacarıqlarının İnkişafı',
    level: 'Orta',
    duration: '5 həftə',
    mentor: 'Rəna Səfərova',
    mentorTitle: 'HR Direktoru, PASHA Holding',
    summary: 'Komanda idarə etmək, effektiv qərar vermək və konfliktləri həll etmək bacarıqlarını real iş nümunələri üzərindən inkişaf etdirəcəksən.',
    whatYouWillLearn: [
      'Komanda motivasiyası və effektiv delegasiya',
      'Konflikt idarəetməsi texnikaları',
      'Qərarvermə çərçivələri',
      'Fikir bildirmə (feedback) mədəniyyəti qurmaq',
    ],
    curriculum: [
      {
        id: 'm1', title: 'Liderlik Əsasları',
        lessons: [
          { id: 'm1-l1', title: 'Lider kimi özünü tanımaq', duration: '11:15', videoUrl: SAMPLE_VIDEOS[5] },
          { id: 'm1-l2', title: 'Komanda motivasiyası', duration: '9:50', videoUrl: null },
        ],
      },
      {
        id: 'm2', title: 'Praktik Vərdişlər',
        lessons: [
          { id: 'm2-l1', title: 'Konflikt idarəetməsi', duration: '13:05', videoUrl: null },
          { id: 'm2-l2', title: 'Effektiv fikir bildirmə', duration: '10:30', videoUrl: null },
        ],
      },
    ],
    materials: [
      { id: 'mat1', name: 'Öz-özünə qiymətləndirmə vərəqi.pdf' },
    ],
  },
];

export function getCourseById(id) {
  return COURSES.find((c) => c.id === id) || null;
}
