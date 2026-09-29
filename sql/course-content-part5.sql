-- MLUE kurs məzmunu — hissə 5/7
-- Təkrar işə salmaq təhlükəsizdir: heç nə silinmir, dolu sahə üzərinə yazılmır.

begin;

-- ======================================================================
-- layihe-idareetmesi-agile-scrum
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Türkan Əliyeva'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Scrum Master'),
  summary             = coalesce(nullif(summary, ''), 'Agile düşüncəsini və Scrum çərçivəsini praktik öyrən: rollar, mərasimlər, backlog idarəsi və komandanın real problemləri.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Agile manifestinin prinsiplərini tətbiq etmək', 'Scrum rollarını və mərasimlərini idarə etmək', 'Məhsul backlog-unu prioritetləşdirmək', 'Sprint planlaması və qiymətləndirmə aparmaq', 'Komanda problemlərini aradan qaldırmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/layihe-idareetmesi-agile-scrum.jpg')
where id = 'layihe-idareetmesi-agile-scrum';

insert into modules (id, course_id, title, position)
select 'm1', 'layihe-idareetmesi-agile-scrum', 'Agile Düşüncəsi', 1
where not exists (select 1 from modules where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'layihe-idareetmesi-agile-scrum', 'm1', 'Şəlalə və Agile fərqi', '10:03', 1
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'layihe-idareetmesi-agile-scrum', 'm1', 'Agile manifesti', '11:04', 2
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'layihe-idareetmesi-agile-scrum', 'm1', 'Nə vaxt Agile uyğun deyil', '12:05', 3
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'layihe-idareetmesi-agile-scrum', 'Scrum Çərçivəsi', 2
where not exists (select 1 from modules where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'layihe-idareetmesi-agile-scrum', 'm2', 'Rollar və məsuliyyətlər', '11:34', 1
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'layihe-idareetmesi-agile-scrum', 'm2', 'Sprint dövrü', '12:35', 2
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'layihe-idareetmesi-agile-scrum', 'm2', 'Artefaktlar', '13:36', 3
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'layihe-idareetmesi-agile-scrum', 'Backlog İdarəsi', 3
where not exists (select 1 from modules where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'layihe-idareetmesi-agile-scrum', 'm3', 'İstifadəçi hekayələri', '12:05', 1
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'layihe-idareetmesi-agile-scrum', 'm3', 'Prioritetləşdirmə üsulları', '13:06', 2
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'layihe-idareetmesi-agile-scrum', 'm3', 'Qiymətləndirmə və story point', '14:07', 3
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'layihe-idareetmesi-agile-scrum', 'Komanda və Təkmilləşmə', 4
where not exists (select 1 from modules where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'layihe-idareetmesi-agile-scrum', 'm4', 'Gündəlik görüş', '13:36', 1
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'layihe-idareetmesi-agile-scrum', 'm4', 'Retrospektiv', '14:37', 2
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'layihe-idareetmesi-agile-scrum', 'm4', 'Ümumi səhvlər və həlləri', '15:38', 3
where not exists (select 1 from lessons where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'layihe-idareetmesi-agile-scrum', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'layihe-idareetmesi-agile-scrum', 'Sprint şablonları.xlsx', 2
where not exists (select 1 from materials where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'layihe-idareetmesi-agile-scrum', 'Retrospektiv təlimatı.pdf', 3
where not exists (select 1 from materials where course_id = 'layihe-idareetmesi-agile-scrum' and id = 'mat3');

-- ======================================================================
-- reqemsal-marketinq-strategiyasi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Nərgiz Sultanova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Rəqəmsal Marketinq Meneceri'),
  summary             = coalesce(nullif(summary, ''), 'Kanal-kanal deyil, strategiya kimi düşün: auditoriyanı müəyyən et, mesajı qur, kanalları seç və nəticəni ölçərək büdcəni düzgün yönləndir.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Hədəf auditoriyanı və müştəri yolunu təsvir etmək', 'Kanal strategiyası qurmaq', 'Məzmun planı hazırlamaq', 'Kampaniya nəticələrini ölçmək', 'Büdcəni nəticəyə görə bölüşdürmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/reqemsal-marketinq-strategiyasi.jpg')
where id = 'reqemsal-marketinq-strategiyasi';

insert into modules (id, course_id, title, position)
select 'm1', 'reqemsal-marketinq-strategiyasi', 'Strategiya Əsasları', 1
where not exists (select 1 from modules where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'reqemsal-marketinq-strategiyasi', 'm1', 'Hədəf auditoriya təhlili', '12:15', 1
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'reqemsal-marketinq-strategiyasi', 'm1', 'Marka mesajlaşması', '13:16', 2
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'reqemsal-marketinq-strategiyasi', 'm1', 'Məqsəd və KPI təyini', '14:17', 3
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'reqemsal-marketinq-strategiyasi', 'Kanallar və Ölçmə', 2
where not exists (select 1 from modules where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'reqemsal-marketinq-strategiyasi', 'm2', 'SEO əsasları', '13:46', 1
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'reqemsal-marketinq-strategiyasi', 'm2', 'Kampaniya analitikası', '14:47', 2
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'reqemsal-marketinq-strategiyasi', 'm2', 'Büdcənin optimallaşdırılması', '15:48', 3
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'reqemsal-marketinq-strategiyasi', 'Məzmun və Mesaj', 3
where not exists (select 1 from modules where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'reqemsal-marketinq-strategiyasi', 'm3', 'Məzmun planı', '14:17', 1
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'reqemsal-marketinq-strategiyasi', 'm3', 'Yaradıcı mesajlaşma', '15:18', 2
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'reqemsal-marketinq-strategiyasi', 'm3', 'Vizual və mətn uyğunluğu', '16:19', 3
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'reqemsal-marketinq-strategiyasi', 'Digər Kanallar', 4
where not exists (select 1 from modules where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'reqemsal-marketinq-strategiyasi', 'm4', 'Sosial media', '15:48', 1
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'reqemsal-marketinq-strategiyasi', 'm4', 'E-poçt marketinqi', '16:49', 2
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'reqemsal-marketinq-strategiyasi', 'm4', 'Ödənişli reklam', '7:50', 3
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'reqemsal-marketinq-strategiyasi', 'Kampaniya Layihəsi', 5
where not exists (select 1 from modules where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'reqemsal-marketinq-strategiyasi', 'm5', 'Kampaniyanın planlaşdırılması', '16:19', 1
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'reqemsal-marketinq-strategiyasi', 'm5', 'İcra', '7:20', 2
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'reqemsal-marketinq-strategiyasi', 'm5', 'Nəticə hesabatı', '8:21', 3
where not exists (select 1 from lessons where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'reqemsal-marketinq-strategiyasi', 'Məzmun təqvimi şablonu.pdf', 1
where not exists (select 1 from materials where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'reqemsal-marketinq-strategiyasi', 'Kampaniya planı şablonu.xlsx', 2
where not exists (select 1 from materials where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'reqemsal-marketinq-strategiyasi', 'KPI bələdçisi.pdf', 3
where not exists (select 1 from materials where course_id = 'reqemsal-marketinq-strategiyasi' and id = 'mat3');

-- ======================================================================
-- turk-dilinde-serbest-danisiq
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Aysu Qəhrəmanlı'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Türk Dili Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Azərbaycan dilini bilən üçün türk dili sürətli öyrənilir, amma "yalançı dostlar" və tələffüz fərqləri çaşdırır. Bu kurs məhz danışıq üzərində qurulub.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Gündəlik mövzularda sərbəst danışmaq', 'Azərbaycan və türk dili arasındakı fərqləri ayırd etmək', 'Düzgün tələffüz və intonasiya qurmaq', 'Zaman formalarını danışıqda işlətmək', 'Rəsmi və qeyri-rəsmi üslubu fərqləndirmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/turk-dilinde-serbest-danisiq.jpg')
where id = 'turk-dilinde-serbest-danisiq';

insert into modules (id, course_id, title, position)
select 'm1', 'turk-dilinde-serbest-danisiq', 'Səs və Tələffüz', 1
where not exists (select 1 from modules where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'turk-dilinde-serbest-danisiq', 'm1', 'Türk əlifbası və səslər', '14:27', 1
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'turk-dilinde-serbest-danisiq', 'm1', 'Vurğu və intonasiya', '15:28', 2
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'turk-dilinde-serbest-danisiq', 'm1', 'Ən çox səhv edilən sözlər', '16:29', 3
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'turk-dilinde-serbest-danisiq', 'Gündəlik Danışıq', 2
where not exists (select 1 from modules where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'turk-dilinde-serbest-danisiq', 'm2', 'Tanışlıq və salamlaşma', '15:58', 1
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'turk-dilinde-serbest-danisiq', 'm2', 'Alış-veriş və yol soruşmaq', '16:59', 2
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'turk-dilinde-serbest-danisiq', 'm2', 'Telefon danışığı', '7:00', 3
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'turk-dilinde-serbest-danisiq', 'Qrammatik Təməl', 3
where not exists (select 1 from modules where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'turk-dilinde-serbest-danisiq', 'm3', 'İsim halları', '16:29', 1
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'turk-dilinde-serbest-danisiq', 'm3', 'Zaman formaları', '7:30', 2
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'turk-dilinde-serbest-danisiq', 'm3', 'Şərt və arzu', '8:31', 3
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'turk-dilinde-serbest-danisiq', '"Yalançı Dostlar"', 4
where not exists (select 1 from modules where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'turk-dilinde-serbest-danisiq', 'm4', 'Eyni görünən, fərqli mənalı sözlər', '7:00', 1
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'turk-dilinde-serbest-danisiq', 'm4', 'İfadə fərqləri', '8:01', 2
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'turk-dilinde-serbest-danisiq', 'm4', 'Məşq dialoqları', '9:02', 3
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'turk-dilinde-serbest-danisiq', 'Üslub', 5
where not exists (select 1 from modules where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'turk-dilinde-serbest-danisiq', 'm5', 'Rəsmi danışıq', '8:31', 1
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'turk-dilinde-serbest-danisiq', 'm5', 'Qeyri-rəsmi və jarqon', '9:32', 2
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'turk-dilinde-serbest-danisiq', 'm5', 'Yekun danışıq məşqi', '10:33', 3
where not exists (select 1 from lessons where course_id = 'turk-dilinde-serbest-danisiq' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'turk-dilinde-serbest-danisiq', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'turk-dilinde-serbest-danisiq' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'turk-dilinde-serbest-danisiq', 'Dialoq mətnləri.pdf', 2
where not exists (select 1 from materials where course_id = 'turk-dilinde-serbest-danisiq' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'turk-dilinde-serbest-danisiq', 'Tələffüz audio siyahısı.pdf', 3
where not exists (select 1 from materials where course_id = 'turk-dilinde-serbest-danisiq' and id = 'mat3');

-- ======================================================================
-- rus-dili-esaslari
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Yelena Abbasova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Rus Dili Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Kiril əlifbasından başlayıb gündəlik ünsiyyətə qədər: oxumağı, əsas qrammatikanı və praktik danışıq qəliblərini sıfırdan öyrən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Kiril əlifbasını oxumaq və yazmaq', 'Əsas hal sistemini başa düşmək', 'Gündəlik mövzularda sadə cümlələr qurmaq', 'Fellərin indiki və keçmiş zamanını işlətmək', 'Sadə mətnləri oxuyub anlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/rus-dili-esaslari.jpg')
where id = 'rus-dili-esaslari';

insert into modules (id, course_id, title, position)
select 'm1', 'rus-dili-esaslari', 'Əlifba və Səslər', 1
where not exists (select 1 from modules where course_id = 'rus-dili-esaslari' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'rus-dili-esaslari', 'm1', 'Kiril hərfləri', '7:20', 1
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'rus-dili-esaslari', 'm1', 'Oxu qaydaları', '8:21', 2
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'rus-dili-esaslari', 'm1', 'Vurğunun əhəmiyyəti', '9:22', 3
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'rus-dili-esaslari', 'İlk Cümlələr', 2
where not exists (select 1 from modules where course_id = 'rus-dili-esaslari' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'rus-dili-esaslari', 'm2', 'Salamlaşma və tanışlıq', '8:51', 1
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'rus-dili-esaslari', 'm2', 'Şəxs əvəzlikləri', '9:52', 2
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'rus-dili-esaslari', 'm2', 'Sadə cümlə quruluşu', '10:53', 3
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'rus-dili-esaslari', 'Hallar', 3
where not exists (select 1 from modules where course_id = 'rus-dili-esaslari' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'rus-dili-esaslari', 'm3', 'Adlıq və təsirlik hal', '9:22', 1
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'rus-dili-esaslari', 'm3', 'Yiyəlik hal', '10:23', 2
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'rus-dili-esaslari', 'm3', 'Yerlik və yönlük hal', '11:24', 3
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'rus-dili-esaslari', 'Fellər', 4
where not exists (select 1 from modules where course_id = 'rus-dili-esaslari' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'rus-dili-esaslari', 'm4', 'İndiki zaman', '10:53', 1
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'rus-dili-esaslari', 'm4', 'Keçmiş zaman', '11:54', 2
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'rus-dili-esaslari', 'm4', 'Hərəkət felləri', '12:55', 3
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'rus-dili-esaslari', 'Praktika', 5
where not exists (select 1 from modules where course_id = 'rus-dili-esaslari' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'rus-dili-esaslari', 'm5', 'Gündəlik dialoqlar', '11:24', 1
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'rus-dili-esaslari', 'm5', 'Qısa mətnlərin oxunması', '12:25', 2
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'rus-dili-esaslari', 'm5', 'Yekun təkrar', '13:26', 3
where not exists (select 1 from lessons where course_id = 'rus-dili-esaslari' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'rus-dili-esaslari', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'rus-dili-esaslari' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'rus-dili-esaslari', 'Əlifba məşq vərəqləri.pdf', 2
where not exists (select 1 from materials where course_id = 'rus-dili-esaslari' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'rus-dili-esaslari', 'Lüğət minimumu.pdf', 3
where not exists (select 1 from materials where course_id = 'rus-dili-esaslari' and id = 'mat3');

-- ======================================================================
-- ielts-e-hazirliq-proqrami
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Rəvan Məmmədov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'IELTS Təlimçisi'),
  summary             = coalesce(nullif(summary, ''), 'Dörd bölmənin hər biri üçün ayrıca strategiya: imtahanın məntiqini anlayıb vaxtı düzgün bölməyi, tipik tələləri görməyi və bal artırmağı öyrən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['IELTS formatını və qiymətləndirmə meyarlarını bilmək', 'Listening və Reading üçün vaxt strategiyası qurmaq', 'Writing Task 1 və 2 strukturunu mənimsəmək', 'Speaking-də axıcılığı artırmaq', 'Zəif bölməni hədəfli şəkildə gücləndirmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/ielts-e-hazirliq-proqrami.jpg')
where id = 'ielts-e-hazirliq-proqrami';

insert into modules (id, course_id, title, position)
select 'm1', 'ielts-e-hazirliq-proqrami', 'İmtahana Baxış', 1
where not exists (select 1 from modules where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'ielts-e-hazirliq-proqrami', 'm1', 'Format və bal sistemi', '11:14', 1
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'ielts-e-hazirliq-proqrami', 'm1', 'Qiymətləndirmə meyarları', '12:15', 2
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'ielts-e-hazirliq-proqrami', 'm1', 'Hazırlıq planının qurulması', '13:16', 3
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'ielts-e-hazirliq-proqrami', 'Listening', 2
where not exists (select 1 from modules where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'ielts-e-hazirliq-proqrami', 'm2', 'Sual tipləri', '12:45', 1
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'ielts-e-hazirliq-proqrami', 'm2', 'Not götürmə texnikası', '13:46', 2
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'ielts-e-hazirliq-proqrami', 'm2', 'Tipik tələlər', '14:47', 3
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'ielts-e-hazirliq-proqrami', 'Reading', 3
where not exists (select 1 from modules where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'ielts-e-hazirliq-proqrami', 'm3', 'Skimming və scanning', '13:16', 1
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'ielts-e-hazirliq-proqrami', 'm3', 'True/False/Not Given', '14:17', 2
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'ielts-e-hazirliq-proqrami', 'm3', 'Vaxtın idarə olunması', '15:18', 3
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'ielts-e-hazirliq-proqrami', 'Writing', 4
where not exists (select 1 from modules where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'ielts-e-hazirliq-proqrami', 'm4', 'Task 1: qrafik təsviri', '14:47', 1
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'ielts-e-hazirliq-proqrami', 'm4', 'Task 2: esse strukturu', '15:48', 2
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'ielts-e-hazirliq-proqrami', 'm4', 'Leksik müxtəliflik', '16:49', 3
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'ielts-e-hazirliq-proqrami', 'Speaking', 5
where not exists (select 1 from modules where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'ielts-e-hazirliq-proqrami', 'm5', 'Üç hissənin məntiqi', '15:18', 1
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'ielts-e-hazirliq-proqrami', 'm5', 'Cavabın genişləndirilməsi', '16:19', 2
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'ielts-e-hazirliq-proqrami', 'm5', 'Tələffüz və axıcılıq', '7:20', 3
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm5-l3');

insert into modules (id, course_id, title, position)
select 'm6', 'ielts-e-hazirliq-proqrami', 'Sınaq və Təhlil', 6
where not exists (select 1 from modules where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm6');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l1', 'ielts-e-hazirliq-proqrami', 'm6', 'Tam sınaq imtahanı', '16:49', 1
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm6-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l2', 'ielts-e-hazirliq-proqrami', 'm6', 'Səhvlərin təhlili', '7:50', 2
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm6-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l3', 'ielts-e-hazirliq-proqrami', 'm6', 'Son həftə strategiyası', '8:51', 3
where not exists (select 1 from lessons where course_id = 'ielts-e-hazirliq-proqrami' and id = 'm6-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'ielts-e-hazirliq-proqrami', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'ielts-e-hazirliq-proqrami' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'ielts-e-hazirliq-proqrami', 'Sınaq imtahanı dəsti.pdf', 2
where not exists (select 1 from materials where course_id = 'ielts-e-hazirliq-proqrami' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'ielts-e-hazirliq-proqrami', 'Esse nümunələri.pdf', 3
where not exists (select 1 from materials where course_id = 'ielts-e-hazirliq-proqrami' and id = 'mat3');

-- ======================================================================
-- ingilis-dili-biznes
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Ceyhun Əliyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Biznes İngilis Dili Təlimçisi'),
  summary             = coalesce(nullif(summary, ''), 'İş mühitində işlənən ingilis dili: e-poçt, iclas, təqdimat və danışıqlar — hər mövzu hazır qəliblər və rollu məşqlərlə möhkəmləndirilir.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Peşəkar e-poçt yazmaq', 'İclasda fikir bildirmək və razılaşmamaq', 'Təqdimatı strukturla aparmaq', 'Danışıqlarda nəzakətli dil işlətmək', 'Telefon və onlayn görüşlərdə sərbəst olmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/ingilis-dili-biznes.jpg')
where id = 'ingilis-dili-biznes';

insert into modules (id, course_id, title, position)
select 'm1', 'ingilis-dili-biznes', 'Yazılı Kommunikasiya', 1
where not exists (select 1 from modules where course_id = 'ingilis-dili-biznes' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'ingilis-dili-biznes', 'm1', 'Peşəkar e-poçt yazmaq', '15:28', 1
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'ingilis-dili-biznes', 'm1', 'Hesabat və memo yazmaq', '16:29', 2
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'ingilis-dili-biznes', 'm1', 'Rəsmi və qeyri-rəsmi ifadələr', '7:30', 3
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'ingilis-dili-biznes', 'Şifahi Kommunikasiya', 2
where not exists (select 1 from modules where course_id = 'ingilis-dili-biznes' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'ingilis-dili-biznes', 'm2', 'Görüşlərdə danışıq', '16:59', 1
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'ingilis-dili-biznes', 'm2', 'Təqdimat bacarıqları', '7:00', 2
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'ingilis-dili-biznes', 'm2', 'Telefon və onlayn görüşlər', '8:01', 3
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'ingilis-dili-biznes', 'İclasları İdarə Etmək', 3
where not exists (select 1 from modules where course_id = 'ingilis-dili-biznes' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'ingilis-dili-biznes', 'm3', 'İclası aparmaq', '7:30', 1
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'ingilis-dili-biznes', 'm3', 'Fikir bildirmək və müdaxilə', '8:31', 2
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'ingilis-dili-biznes', 'm3', 'Razılaşmamaq və kompromis', '9:32', 3
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'ingilis-dili-biznes', 'Danışıqlar', 4
where not exists (select 1 from modules where course_id = 'ingilis-dili-biznes' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'ingilis-dili-biznes', 'm4', 'Nəzakətli təkid dili', '8:01', 1
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'ingilis-dili-biznes', 'm4', 'Şərt cümlələri', '9:02', 2
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'ingilis-dili-biznes', 'm4', 'Rollu məşq', '10:03', 3
where not exists (select 1 from lessons where course_id = 'ingilis-dili-biznes' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'ingilis-dili-biznes', 'Lüğət siyahısı.pdf', 1
where not exists (select 1 from materials where course_id = 'ingilis-dili-biznes' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'ingilis-dili-biznes', 'E-poçt şablonları.zip', 2
where not exists (select 1 from materials where course_id = 'ingilis-dili-biznes' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'ingilis-dili-biznes', 'İfadələr toplusu.pdf', 3
where not exists (select 1 from materials where course_id = 'ingilis-dili-biznes' and id = 'mat3');


commit;
