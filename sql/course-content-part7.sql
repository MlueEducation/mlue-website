-- MLUE kurs məzmunu — hissə 7/7
-- Təkrar işə salmaq təhlükəsizdir: heç nə silinmir, dolu sahə üzərinə yazılmır.

begin;

-- ======================================================================
-- liderlik-bacariqlari
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Rauf Məmmədzadə'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Liderlik və Komanda Təlimçisi'),
  summary             = coalesce(nullif(summary, ''), 'Liderlik vəzifə deyil, davranışdır: etibar qurmaq, məsuliyyət paylamaq, geri bildirim vermək və komandanı çətin anda saxlamaq.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Öz liderlik üslubunu tanımaq', 'Komandada etibar və psixoloji təhlükəsizlik qurmaq', 'Effektiv delegasiya etmək', 'İnkişafetdirici geri bildirim vermək', 'Münaqişəni konstruktiv idarə etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/liderlik-bacariqlari.jpg')
where id = 'liderlik-bacariqlari';

insert into modules (id, course_id, title, position)
select 'm1', 'liderlik-bacariqlari', 'Liderlik Əsasları', 1
where not exists (select 1 from modules where course_id = 'liderlik-bacariqlari' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'liderlik-bacariqlari', 'm1', 'Lider kimi özünü tanımaq', '7:20', 1
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'liderlik-bacariqlari', 'm1', 'Komanda motivasiyası', '8:21', 2
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'liderlik-bacariqlari', 'm1', 'Menecer və lider fərqi', '9:22', 3
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'liderlik-bacariqlari', 'Praktik Vərdişlər', 2
where not exists (select 1 from modules where course_id = 'liderlik-bacariqlari' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'liderlik-bacariqlari', 'm2', 'Konflikt idarəetməsi', '8:51', 1
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'liderlik-bacariqlari', 'm2', 'Effektiv fikir bildirmə', '9:52', 2
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'liderlik-bacariqlari', 'm2', 'Birə-bir görüşlər', '10:53', 3
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'liderlik-bacariqlari', 'Komanda Qurmaq', 3
where not exists (select 1 from modules where course_id = 'liderlik-bacariqlari' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'liderlik-bacariqlari', 'm3', 'Etibarın təməli', '9:22', 1
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'liderlik-bacariqlari', 'm3', 'Psixoloji təhlükəsizlik', '10:23', 2
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'liderlik-bacariqlari', 'm3', 'Komanda mərhələləri', '11:24', 3
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'liderlik-bacariqlari', 'Çətin Anlar', 4
where not exists (select 1 from modules where course_id = 'liderlik-bacariqlari' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'liderlik-bacariqlari', 'm4', 'Çətin qərarlar', '10:53', 1
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'liderlik-bacariqlari', 'm4', 'Dəyişiklik dövründə liderlik', '11:54', 2
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'liderlik-bacariqlari', 'm4', 'Delegasiya', '12:55', 3
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'liderlik-bacariqlari', 'İnkişaf', 5
where not exists (select 1 from modules where course_id = 'liderlik-bacariqlari' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'liderlik-bacariqlari', 'm5', 'Komandanın inkişaf planı', '11:24', 1
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'liderlik-bacariqlari', 'm5', 'Uzunmüddətli motivasiya', '12:25', 2
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'liderlik-bacariqlari', 'm5', 'Yekun icmal', '13:26', 3
where not exists (select 1 from lessons where course_id = 'liderlik-bacariqlari' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'liderlik-bacariqlari', 'Öz-özünə qiymətləndirmə vərəqi.pdf', 1
where not exists (select 1 from materials where course_id = 'liderlik-bacariqlari' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'liderlik-bacariqlari', 'Birə-bir görüş şablonu.pdf', 2
where not exists (select 1 from materials where course_id = 'liderlik-bacariqlari' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'liderlik-bacariqlari', 'Geri bildirim bələdçisi.pdf', 3
where not exists (select 1 from materials where course_id = 'liderlik-bacariqlari' and id = 'mat3');

-- ======================================================================
-- karyera-planlamasi-ve-cv-hazirligi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Zeynəb Qurbanova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Karyera Məsləhətçisi'),
  summary             = coalesce(nullif(summary, ''), 'İşə qəbul prosesini anlayaraq hərəkət et: güclü tərəflərini müəyyən et, CV və LinkedIn profilini qur, müsahibəyə hazırlaş.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Güclü tərəf və karyera istiqamətini müəyyən etmək', 'Nəticəyönümlü CV yazmaq', 'Motivasiya məktubu hazırlamaq', 'LinkedIn profilini gücləndirmək', 'Müsahibə suallarına strukturla cavab vermək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/karyera-planlamasi-ve-cv-hazirligi.jpg')
where id = 'karyera-planlamasi-ve-cv-hazirligi';

insert into modules (id, course_id, title, position)
select 'm1', 'karyera-planlamasi-ve-cv-hazirligi', 'Özünüdərk', 1
where not exists (select 1 from modules where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'karyera-planlamasi-ve-cv-hazirligi', 'm1', 'Bacarıq inventarı', '11:44', 1
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'karyera-planlamasi-ve-cv-hazirligi', 'm1', 'Dəyərlər və prioritetlər', '12:45', 2
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'karyera-planlamasi-ve-cv-hazirligi', 'm1', 'Karyera istiqamətinin seçilməsi', '13:46', 3
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'karyera-planlamasi-ve-cv-hazirligi', 'CV və Məktub', 2
where not exists (select 1 from modules where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'karyera-planlamasi-ve-cv-hazirligi', 'm2', 'CV strukturu', '12:15', 1
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'karyera-planlamasi-ve-cv-hazirligi', 'm2', 'Nəticələrin yazılması', '13:16', 2
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'karyera-planlamasi-ve-cv-hazirligi', 'm2', 'Motivasiya məktubu', '14:17', 3
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'karyera-planlamasi-ve-cv-hazirligi', 'Rəqəmsal Mövcudluq', 3
where not exists (select 1 from modules where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'karyera-planlamasi-ve-cv-hazirligi', 'm3', 'LinkedIn profili', '13:46', 1
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'karyera-planlamasi-ve-cv-hazirligi', 'm3', 'Şəbəkələşmə', '14:47', 2
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'karyera-planlamasi-ve-cv-hazirligi', 'm3', 'Portfolio', '15:48', 3
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'karyera-planlamasi-ve-cv-hazirligi', 'Müsahibə', 4
where not exists (select 1 from modules where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'karyera-planlamasi-ve-cv-hazirligi', 'm4', 'Ən çox verilən suallar', '14:17', 1
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'karyera-planlamasi-ve-cv-hazirligi', 'm4', 'STAR metodu', '15:18', 2
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'karyera-planlamasi-ve-cv-hazirligi', 'm4', 'Əmək haqqı danışığı', '16:19', 3
where not exists (select 1 from lessons where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'karyera-planlamasi-ve-cv-hazirligi', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'karyera-planlamasi-ve-cv-hazirligi', 'CV şablonları.docx', 2
where not exists (select 1 from materials where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'karyera-planlamasi-ve-cv-hazirligi', 'Müsahibə sualları bankı.pdf', 3
where not exists (select 1 from materials where course_id = 'karyera-planlamasi-ve-cv-hazirligi' and id = 'mat3');

-- ======================================================================
-- xetti-cebre-giris
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Vüqar Nəbiyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Riyaziyyat Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Matrisləri düstur kimi yox, həndəsi çevrilmə kimi anla. Data elmi və mühəndislik üçün lazım olan xətti cəbr intuisiyası.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Vektor və matris əməliyyatlarını aparmaq', 'Xətti tənliklər sistemini həll etmək', 'Determinant və tərs matrisi hesablamaq', 'Xətti asılılıq və bazisi başa düşmək', 'Məxsusi qiymət və vektorları tapmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/xetti-cebre-giris.jpg')
where id = 'xetti-cebre-giris';

insert into modules (id, course_id, title, position)
select 'm1', 'xetti-cebre-giris', 'Vektorlar', 1
where not exists (select 1 from modules where course_id = 'xetti-cebre-giris' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'xetti-cebre-giris', 'm1', 'Vektor anlayışı', '14:27', 1
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'xetti-cebre-giris', 'm1', 'Skalyar hasil', '15:28', 2
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'xetti-cebre-giris', 'm1', 'Həndəsi şərh', '16:29', 3
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'xetti-cebre-giris', 'Matrislər', 2
where not exists (select 1 from modules where course_id = 'xetti-cebre-giris' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'xetti-cebre-giris', 'm2', 'Matris əməliyyatları', '15:58', 1
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'xetti-cebre-giris', 'm2', 'Matris kimi çevrilmə', '16:59', 2
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'xetti-cebre-giris', 'm2', 'Xüsusi matrislər', '7:00', 3
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'xetti-cebre-giris', 'Tənliklər Sistemi', 3
where not exists (select 1 from modules where course_id = 'xetti-cebre-giris' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'xetti-cebre-giris', 'm3', 'Qauss üsulu', '16:29', 1
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'xetti-cebre-giris', 'm3', 'Determinant', '7:30', 2
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'xetti-cebre-giris', 'm3', 'Tərs matris', '8:31', 3
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'xetti-cebre-giris', 'Fəza və Bazis', 4
where not exists (select 1 from modules where course_id = 'xetti-cebre-giris' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'xetti-cebre-giris', 'm4', 'Xətti asılılıq', '7:00', 1
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'xetti-cebre-giris', 'm4', 'Bazis və ölçü', '8:01', 2
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'xetti-cebre-giris', 'm4', 'Rütbə (rank)', '9:02', 3
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'xetti-cebre-giris', 'Məxsusi Qiymətlər', 5
where not exists (select 1 from modules where course_id = 'xetti-cebre-giris' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'xetti-cebre-giris', 'm5', 'Məxsusi qiymət və vektor', '8:31', 1
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'xetti-cebre-giris', 'm5', 'Diaqonallaşdırma', '9:32', 2
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'xetti-cebre-giris', 'm5', 'Tətbiq nümunələri', '10:33', 3
where not exists (select 1 from lessons where course_id = 'xetti-cebre-giris' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'xetti-cebre-giris', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'xetti-cebre-giris' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'xetti-cebre-giris', 'Məsələlər toplusu.pdf', 2
where not exists (select 1 from materials where course_id = 'xetti-cebre-giris' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'xetti-cebre-giris', 'Həll nümunələri.pdf', 3
where not exists (select 1 from materials where course_id = 'xetti-cebre-giris' and id = 'mat3');

-- ======================================================================
-- ehtimal-nezeriyyesi-ve-statistika
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Sevinc Abdullayeva'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Statistika Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Təsadüfü ölçməyi öyrən: ehtimaldan paylanmalara, oradan da hipotez yoxlamasına — data ilə işləyən hər kəs üçün təməl.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Ehtimalı düzgün hesablamaq', 'Şərti ehtimal və Bayes düsturunu tətbiq etmək', 'Əsas paylanmaları tanımaq', 'Etibarlılıq intervalı qurmaq', 'Hipotez yoxlaması aparmaq və p-dəyəri şərh etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/ehtimal-nezeriyyesi-ve-statistika.jpg')
where id = 'ehtimal-nezeriyyesi-ve-statistika';

insert into modules (id, course_id, title, position)
select 'm1', 'ehtimal-nezeriyyesi-ve-statistika', 'Ehtimalın Əsasları', 1
where not exists (select 1 from modules where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'ehtimal-nezeriyyesi-ve-statistika', 'm1', 'Hadisə və ehtimal', '14:27', 1
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'ehtimal-nezeriyyesi-ve-statistika', 'm1', 'Kombinatorika', '15:28', 2
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'ehtimal-nezeriyyesi-ve-statistika', 'm1', 'Şərti ehtimal və Bayes', '16:29', 3
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'ehtimal-nezeriyyesi-ve-statistika', 'Təsadüfi Kəmiyyətlər', 2
where not exists (select 1 from modules where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'ehtimal-nezeriyyesi-ve-statistika', 'm2', 'Diskret kəmiyyətlər', '15:58', 1
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'ehtimal-nezeriyyesi-ve-statistika', 'm2', 'Kəsilməz kəmiyyətlər', '16:59', 2
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'ehtimal-nezeriyyesi-ve-statistika', 'm2', 'Gözlənilən qiymət və dispersiya', '7:00', 3
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'ehtimal-nezeriyyesi-ve-statistika', 'Paylanmalar', 3
where not exists (select 1 from modules where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'ehtimal-nezeriyyesi-ve-statistika', 'm3', 'Binomial paylanma', '16:29', 1
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'ehtimal-nezeriyyesi-ve-statistika', 'm3', 'Normal paylanma', '7:30', 2
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'ehtimal-nezeriyyesi-ve-statistika', 'm3', 'Mərkəzi limit teoremi', '8:31', 3
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'ehtimal-nezeriyyesi-ve-statistika', 'Təsviri Statistika', 4
where not exists (select 1 from modules where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'ehtimal-nezeriyyesi-ve-statistika', 'm4', 'Mərkəzi meyl ölçüləri', '7:00', 1
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'ehtimal-nezeriyyesi-ve-statistika', 'm4', 'Yayılma ölçüləri', '8:01', 2
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'ehtimal-nezeriyyesi-ve-statistika', 'm4', 'Vizual təhlil', '9:02', 3
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'ehtimal-nezeriyyesi-ve-statistika', 'Nəticə Çıxarma', 5
where not exists (select 1 from modules where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'ehtimal-nezeriyyesi-ve-statistika', 'm5', 'Etibarlılıq intervalı', '8:31', 1
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'ehtimal-nezeriyyesi-ve-statistika', 'm5', 'Hipotez yoxlaması', '9:32', 2
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'ehtimal-nezeriyyesi-ve-statistika', 'm5', 'p-dəyərinin düzgün şərhi', '10:33', 3
where not exists (select 1 from lessons where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'ehtimal-nezeriyyesi-ve-statistika', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'ehtimal-nezeriyyesi-ve-statistika', 'Statistik cədvəllər.pdf', 2
where not exists (select 1 from materials where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'ehtimal-nezeriyyesi-ve-statistika', 'Məsələlər toplusu.pdf', 3
where not exists (select 1 from materials where course_id = 'ehtimal-nezeriyyesi-ve-statistika' and id = 'mat3');

-- ======================================================================
-- mentiqi-dusunce-ve-problem-helli
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Elmar Əliyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Məntiq və Analitik Düşüncə Təlimçisi'),
  summary             = coalesce(nullif(summary, ''), 'Arqumenti təhlil etməyi, məntiqi səhvləri görməyi və mürəkkəb problemi idarə oluna bilən hissələrə bölməyi öyrən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Arqumentin strukturunu ayırd etmək', 'Ən çox rast gəlinən məntiqi səhvləri tanımaq', 'Deduktiv və induktiv mühakiməni fərqləndirmək', 'Problemi strukturlu şəkildə parçalamaq', 'Qərar üçün meyar sistemi qurmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/mentiqi-dusunce-ve-problem-helli.jpg')
where id = 'mentiqi-dusunce-ve-problem-helli';

insert into modules (id, course_id, title, position)
select 'm1', 'mentiqi-dusunce-ve-problem-helli', 'Məntiqin Əsasları', 1
where not exists (select 1 from modules where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'mentiqi-dusunce-ve-problem-helli', 'm1', 'Müddəa və nəticə', '15:08', 1
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'mentiqi-dusunce-ve-problem-helli', 'm1', 'Deduksiya və induksiya', '16:09', 2
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'mentiqi-dusunce-ve-problem-helli', 'm1', 'Doğruluq cədvəlləri', '7:10', 3
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'mentiqi-dusunce-ve-problem-helli', 'Məntiqi Səhvlər', 2
where not exists (select 1 from modules where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'mentiqi-dusunce-ve-problem-helli', 'm2', 'Formal səhvlər', '16:39', 1
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'mentiqi-dusunce-ve-problem-helli', 'm2', 'Qeyri-formal səhvlər', '7:40', 2
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'mentiqi-dusunce-ve-problem-helli', 'm2', 'Mediada nümunələr', '8:41', 3
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'mentiqi-dusunce-ve-problem-helli', 'Problem Həlli', 3
where not exists (select 1 from modules where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'mentiqi-dusunce-ve-problem-helli', 'm3', 'Problemin dəqiq qoyuluşu', '7:10', 1
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'mentiqi-dusunce-ve-problem-helli', 'm3', 'Parçalama (dekompozisiya)', '8:11', 2
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'mentiqi-dusunce-ve-problem-helli', 'm3', 'Fərziyyələrin yoxlanması', '9:12', 3
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'mentiqi-dusunce-ve-problem-helli', 'Qərar Vermə', 4
where not exists (select 1 from modules where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'mentiqi-dusunce-ve-problem-helli', 'm4', 'Meyar matrisi', '8:41', 1
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'mentiqi-dusunce-ve-problem-helli', 'm4', 'Qeyri-müəyyənlikdə qərar', '9:42', 2
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'mentiqi-dusunce-ve-problem-helli', 'm4', 'Yekun məşq', '10:43', 3
where not exists (select 1 from lessons where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'mentiqi-dusunce-ve-problem-helli', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'mentiqi-dusunce-ve-problem-helli', 'Məntiq məşqləri.pdf', 2
where not exists (select 1 from materials where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'mentiqi-dusunce-ve-problem-helli', 'Nümunə təhlillər.pdf', 3
where not exists (select 1 from materials where course_id = 'mentiqi-dusunce-ve-problem-helli' and id = 'mat3');

-- ======================================================================
-- kalkulusun-esaslari
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Fuad Həsənov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Riyazi Analiz Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Törəmə və inteqralın nə demək olduğunu həqiqətən anla: dəyişmə sürəti və toplam kəmiyyət — həndəsi intuisiya ilə, quru düsturla deyil.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Limit anlayışını başa düşmək', 'Törəməni hesablamaq və şərh etmək', 'Funksiyanı törəmə ilə tədqiq etmək', 'Müəyyən və qeyri-müəyyən inteqralı hesablamaq', 'Tətbiqi məsələlər həll etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/kalkulusun-esaslari.jpg')
where id = 'kalkulusun-esaslari';

insert into modules (id, course_id, title, position)
select 'm1', 'kalkulusun-esaslari', 'Limit', 1
where not exists (select 1 from modules where course_id = 'kalkulusun-esaslari' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'kalkulusun-esaslari', 'm1', 'Limit anlayışı', '9:52', 1
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'kalkulusun-esaslari', 'm1', 'Limitin hesablanması', '10:53', 2
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'kalkulusun-esaslari', 'm1', 'Kəsilməzlik', '11:54', 3
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'kalkulusun-esaslari', 'Törəmə', 2
where not exists (select 1 from modules where course_id = 'kalkulusun-esaslari' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'kalkulusun-esaslari', 'm2', 'Törəmənin mənası', '10:23', 1
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'kalkulusun-esaslari', 'm2', 'Törəmə qaydaları', '11:24', 2
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'kalkulusun-esaslari', 'm2', 'Mürəkkəb funksiyanın törəməsi', '12:25', 3
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'kalkulusun-esaslari', 'Törəmənin Tətbiqi', 3
where not exists (select 1 from modules where course_id = 'kalkulusun-esaslari' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'kalkulusun-esaslari', 'm3', 'Ekstremumlar', '11:54', 1
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'kalkulusun-esaslari', 'm3', 'Funksiyanın tədqiqi', '12:55', 2
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'kalkulusun-esaslari', 'm3', 'Optimallaşdırma məsələləri', '13:56', 3
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'kalkulusun-esaslari', 'İnteqral', 4
where not exists (select 1 from modules where course_id = 'kalkulusun-esaslari' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'kalkulusun-esaslari', 'm4', 'İbtidai funksiya', '12:25', 1
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'kalkulusun-esaslari', 'm4', 'Müəyyən inteqral', '13:26', 2
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'kalkulusun-esaslari', 'm4', 'Nyuton-Leybnis düsturu', '14:27', 3
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'kalkulusun-esaslari', 'İnteqralın Tətbiqi', 5
where not exists (select 1 from modules where course_id = 'kalkulusun-esaslari' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'kalkulusun-esaslari', 'm5', 'Sahənin hesablanması', '13:56', 1
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'kalkulusun-esaslari', 'm5', 'Həcm', '14:57', 2
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'kalkulusun-esaslari', 'm5', 'Yekun məsələlər', '15:58', 3
where not exists (select 1 from lessons where course_id = 'kalkulusun-esaslari' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'kalkulusun-esaslari', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'kalkulusun-esaslari' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'kalkulusun-esaslari', 'Düsturlar vərəqi.pdf', 2
where not exists (select 1 from materials where course_id = 'kalkulusun-esaslari' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'kalkulusun-esaslari', 'Məsələlər toplusu.pdf', 3
where not exists (select 1 from materials where course_id = 'kalkulusun-esaslari' and id = 'mat3');

commit;
