-- MLUE kurs məzmunu — hissə 1/7
-- Təkrar işə salmaq təhlükəsizdir: heç nə silinmir, dolu sahə üzərinə yazılmır.

begin;

-- ======================================================================
-- masin-oyrenmesine-giris
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Rəşad Əliyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Maşın Öyrənməsi Mühəndisi'),
  summary             = coalesce(nullif(summary, ''), 'Maşın öyrənməsinin necə işlədiyini sıfırdan anla: məlumatdan modelə, modeldən qiymətləndirməyə qədər. Riyazi intuisiyanı sadə dildə izah edir, hər mövzunu Python-da praktiki nümunə ilə möhkəmləndiririk.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Nəzarətli və nəzarətsiz öyrənmə arasındakı fərqi ayırd etmək', 'Reqressiya və təsnifat modellərini scikit-learn ilə qurmaq', 'Modelin dəqiqliyini düzgün metriklərlə ölçmək', 'Overfitting-i tanımaq və qarşısını almaq', 'Real datasetdə uçdan-uca kiçik layihə tamamlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/masin-oyrenmesine-giris.jpg')
where id = 'masin-oyrenmesine-giris';

insert into modules (id, course_id, title, position)
select 'm1', 'masin-oyrenmesine-giris', 'Maşın Öyrənməsinə Baxış', 1
where not exists (select 1 from modules where course_id = 'masin-oyrenmesine-giris' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'masin-oyrenmesine-giris', 'm1', 'Maşın öyrənməsi nədir və nə vaxt lazımdır', '9:32', 1
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'masin-oyrenmesine-giris', 'm1', 'Nəzarətli, nəzarətsiz və gücləndirilmiş öyrənmə', '10:33', 2
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'masin-oyrenmesine-giris', 'm1', 'İş axını: məlumatdan modelə', '11:34', 3
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'masin-oyrenmesine-giris', 'Məlumatın Hazırlanması', 2
where not exists (select 1 from modules where course_id = 'masin-oyrenmesine-giris' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'masin-oyrenmesine-giris', 'm2', 'Datasetin araşdırılması və təmizlənməsi', '10:03', 1
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'masin-oyrenmesine-giris', 'm2', 'Əlamətlərin (feature) seçilməsi', '11:04', 2
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'masin-oyrenmesine-giris', 'm2', 'Train/test bölgüsü və niyə vacibdir', '12:05', 3
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'masin-oyrenmesine-giris', 'Reqressiya Modelləri', 3
where not exists (select 1 from modules where course_id = 'masin-oyrenmesine-giris' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'masin-oyrenmesine-giris', 'm3', 'Xətti reqressiya intuisiyası', '11:34', 1
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'masin-oyrenmesine-giris', 'm3', 'Çoxdəyişənli reqressiya', '12:35', 2
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'masin-oyrenmesine-giris', 'm3', 'Xəta funksiyaları və qradiyent enişi', '13:36', 3
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'masin-oyrenmesine-giris', 'Təsnifat Modelləri', 4
where not exists (select 1 from modules where course_id = 'masin-oyrenmesine-giris' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'masin-oyrenmesine-giris', 'm4', 'Logistik reqressiya', '12:05', 1
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'masin-oyrenmesine-giris', 'm4', 'Qərar ağacları və random forest', '13:06', 2
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'masin-oyrenmesine-giris', 'm4', 'k-NN alqoritmi', '14:07', 3
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'masin-oyrenmesine-giris', 'Modelin Qiymətləndirilməsi', 5
where not exists (select 1 from modules where course_id = 'masin-oyrenmesine-giris' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'masin-oyrenmesine-giris', 'm5', 'Dəqiqlik, precision, recall və F1', '13:36', 1
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'masin-oyrenmesine-giris', 'm5', 'Confusion matrix oxumaq', '14:37', 2
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'masin-oyrenmesine-giris', 'm5', 'Cross-validation', '15:38', 3
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm5-l3');

insert into modules (id, course_id, title, position)
select 'm6', 'masin-oyrenmesine-giris', 'Yekun Layihə', 6
where not exists (select 1 from modules where course_id = 'masin-oyrenmesine-giris' and id = 'm6');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l1', 'masin-oyrenmesine-giris', 'm6', 'Məsələnin qoyulması', '14:07', 1
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm6-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l2', 'masin-oyrenmesine-giris', 'm6', 'Modelin qurulması və tənzimlənməsi', '15:08', 2
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm6-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l3', 'masin-oyrenmesine-giris', 'm6', 'Nəticələrin təqdimatı', '16:09', 3
where not exists (select 1 from lessons where course_id = 'masin-oyrenmesine-giris' and id = 'm6-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'masin-oyrenmesine-giris', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'masin-oyrenmesine-giris' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'masin-oyrenmesine-giris', 'Nümunə datasetlər.zip', 2
where not exists (select 1 from materials where course_id = 'masin-oyrenmesine-giris' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'masin-oyrenmesine-giris', 'Python notebook şablonları.zip', 3
where not exists (select 1 from materials where course_id = 'masin-oyrenmesine-giris' and id = 'mat3');

-- ======================================================================
-- power-bi-ile-biznes-analitikasi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Günel Həsənova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Biznes Analitik'),
  summary             = coalesce(nullif(summary, ''), 'Xam cədvəldən idarəetmə panelinə qədər: Power BI ilə məlumatı birləşdirməyi, DAX ilə hesablamağı və qərar verməyə kömək edən vizual hesabatlar qurmağı öyrən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Müxtəlif mənbələrdən məlumatı Power BI-a yükləmək', 'Power Query ilə məlumatı təmizləmək və çevirmək', 'Data modeli və cədvəllər arası əlaqələr qurmaq', 'DAX ilə ölçülər (measures) yazmaq', 'İnteraktiv dashboard hazırlamaq və paylaşmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/power-bi-ile-biznes-analitikasi.jpg')
where id = 'power-bi-ile-biznes-analitikasi';

insert into modules (id, course_id, title, position)
select 'm1', 'power-bi-ile-biznes-analitikasi', 'Power BI ilə Tanışlıq', 1
where not exists (select 1 from modules where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'power-bi-ile-biznes-analitikasi', 'm1', 'İnterfeys və əsas anlayışlar', '16:39', 1
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'power-bi-ile-biznes-analitikasi', 'm1', 'Məlumat mənbələrinə qoşulma', '7:40', 2
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'power-bi-ile-biznes-analitikasi', 'm1', 'İlk hesabatın qurulması', '8:41', 3
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'power-bi-ile-biznes-analitikasi', 'Məlumatın Çevrilməsi', 2
where not exists (select 1 from modules where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'power-bi-ile-biznes-analitikasi', 'm2', 'Power Query redaktoru', '7:10', 1
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'power-bi-ile-biznes-analitikasi', 'm2', 'Sütunların təmizlənməsi və birləşdirilməsi', '8:11', 2
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'power-bi-ile-biznes-analitikasi', 'm2', 'Təkrarlanan addımların avtomatlaşdırılması', '9:12', 3
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'power-bi-ile-biznes-analitikasi', 'Data Modeli və DAX', 3
where not exists (select 1 from modules where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'power-bi-ile-biznes-analitikasi', 'm3', 'Cədvəllər arası əlaqələr', '8:41', 1
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'power-bi-ile-biznes-analitikasi', 'm3', 'Hesablanmış sütunlar və ölçülər', '9:42', 2
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'power-bi-ile-biznes-analitikasi', 'm3', 'Ən çox işlənən DAX funksiyaları', '10:43', 3
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'power-bi-ile-biznes-analitikasi', 'Vizuallaşdırma və Paylaşım', 4
where not exists (select 1 from modules where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'power-bi-ile-biznes-analitikasi', 'm4', 'Düzgün qrafik növünün seçilməsi', '9:12', 1
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'power-bi-ile-biznes-analitikasi', 'm4', 'Filtrlər, slicer və drill-down', '10:13', 2
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'power-bi-ile-biznes-analitikasi', 'm4', 'Hesabatın dərci və paylaşılması', '11:14', 3
where not exists (select 1 from lessons where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'power-bi-ile-biznes-analitikasi', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'power-bi-ile-biznes-analitikasi', 'Nümunə satış datası.xlsx', 2
where not exists (select 1 from materials where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'power-bi-ile-biznes-analitikasi', 'DAX sorğu kitabçası.pdf', 3
where not exists (select 1 from materials where course_id = 'power-bi-ile-biznes-analitikasi' and id = 'mat3');

-- ======================================================================
-- python-data-analitikasi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Aysel Məmmədova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Data Analitik'),
  summary             = coalesce(nullif(summary, ''), 'Python-un əsaslarından tutmuş real data ilə işləməyə qədər — pandas və NumPy kitabxanaları ilə məlumatları təmizləməyi, təhlil etməyi və vizuallaşdırmağı öyrənəcəksən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Python-da dəyişənlər, siyahılar və funksiyalarla işləmək', 'Pandas ilə cədvəl formatlı məlumatları oxumaq və təmizləmək', 'NumPy ilə ədədi hesablamalar aparmaq', 'Matplotlib ilə sadə qrafiklər qurmaq', 'Kiçik analitik hesabatı uçdan-uca hazırlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/python-data-analitikasi.jpg')
where id = 'python-data-analitikasi';

insert into modules (id, course_id, title, position)
select 'm1', 'python-data-analitikasi', 'Giriş və Quraşdırma', 1
where not exists (select 1 from modules where course_id = 'python-data-analitikasi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'python-data-analitikasi', 'm1', 'Python-a giriş', '13:46', 1
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'python-data-analitikasi', 'm1', 'Mühitin qurulması (Anaconda)', '14:47', 2
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'python-data-analitikasi', 'm1', 'Jupyter Notebook ilə işləmək', '15:48', 3
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'python-data-analitikasi', 'Data ilə İşləmək', 2
where not exists (select 1 from modules where course_id = 'python-data-analitikasi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'python-data-analitikasi', 'm2', 'Pandas ilə cədvəllər', '14:17', 1
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'python-data-analitikasi', 'm2', 'Məlumatların təmizlənməsi', '15:18', 2
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'python-data-analitikasi', 'm2', 'Qruplaşdırma və aqreqasiya', '16:19', 3
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'python-data-analitikasi', 'Python Əsasları', 3
where not exists (select 1 from modules where course_id = 'python-data-analitikasi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'python-data-analitikasi', 'm3', 'Dəyişənlər və məlumat tipləri', '15:48', 1
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'python-data-analitikasi', 'm3', 'Siyahılar, lüğətlər və dövrlər', '16:49', 2
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'python-data-analitikasi', 'm3', 'Funksiyalar və modullar', '7:50', 3
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'python-data-analitikasi', 'Vizuallaşdırma', 4
where not exists (select 1 from modules where course_id = 'python-data-analitikasi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'python-data-analitikasi', 'm4', 'Matplotlib əsasları', '16:19', 1
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'python-data-analitikasi', 'm4', 'Qrafik növünün seçilməsi', '7:20', 2
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'python-data-analitikasi', 'm4', 'Nəticələrin şərh edilməsi', '8:21', 3
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'python-data-analitikasi', 'Yekun Layihə', 5
where not exists (select 1 from modules where course_id = 'python-data-analitikasi' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'python-data-analitikasi', 'm5', 'Datasetin seçilməsi', '7:50', 1
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'python-data-analitikasi', 'm5', 'Analizin aparılması', '8:51', 2
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'python-data-analitikasi', 'm5', 'Hesabatın təqdimatı', '9:52', 3
where not exists (select 1 from lessons where course_id = 'python-data-analitikasi' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'python-data-analitikasi', 'Dərs 1 – Slaydlar.pdf', 1
where not exists (select 1 from materials where course_id = 'python-data-analitikasi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'python-data-analitikasi', 'Nümunə kodlar.zip', 2
where not exists (select 1 from materials where course_id = 'python-data-analitikasi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'python-data-analitikasi', 'Məşq datasetləri.zip', 3
where not exists (select 1 from materials where course_id = 'python-data-analitikasi' and id = 'mat3');

-- ======================================================================
-- python-proqramlasdirmaya-giris
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Tural Quliyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Proqram Təminatı Mühəndisi'),
  summary             = coalesce(nullif(summary, ''), 'Heç bir proqramlaşdırma təcrübəsi tələb olunmur. Sadə hesablamalardan başlayıb öz kiçik proqramlarını yazacaq səviyyəyə çatırsan — hər mövzu kod yazaraq möhkəmləndirilir.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Python sintaksisini və əsas məlumat tiplərini mənimsəmək', 'Şərtlər və dövrlərlə proqram məntiqi qurmaq', 'Funksiyalar yazmaq və kodu təkrar istifadə etmək', 'Fayllarla işləmək və səhvləri idarə etmək', 'Kiçik konsol tətbiqi hazırlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/python-proqramlasdirmaya-giris.jpg')
where id = 'python-proqramlasdirmaya-giris';

insert into modules (id, course_id, title, position)
select 'm1', 'python-proqramlasdirmaya-giris', 'İlk Addımlar', 1
where not exists (select 1 from modules where course_id = 'python-proqramlasdirmaya-giris' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'python-proqramlasdirmaya-giris', 'm1', 'Proqramlaşdırma nədir', '10:13', 1
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'python-proqramlasdirmaya-giris', 'm1', 'Python-un quraşdırılması', '11:14', 2
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'python-proqramlasdirmaya-giris', 'm1', 'İlk proqram: "Salam, dünya"', '12:15', 3
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'python-proqramlasdirmaya-giris', 'Məlumat Tipləri', 2
where not exists (select 1 from modules where course_id = 'python-proqramlasdirmaya-giris' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'python-proqramlasdirmaya-giris', 'm2', 'Ədədlər və mətnlər', '11:44', 1
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'python-proqramlasdirmaya-giris', 'm2', 'Siyahılar və tuple-lar', '12:45', 2
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'python-proqramlasdirmaya-giris', 'm2', 'Lüğətlər və çoxluqlar', '13:46', 3
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'python-proqramlasdirmaya-giris', 'Məntiq və Dövrlər', 3
where not exists (select 1 from modules where course_id = 'python-proqramlasdirmaya-giris' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'python-proqramlasdirmaya-giris', 'm3', 'Şərt operatorları', '12:15', 1
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'python-proqramlasdirmaya-giris', 'm3', 'for və while dövrləri', '13:16', 2
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'python-proqramlasdirmaya-giris', 'm3', 'Məşq: rəqəm tapma oyunu', '14:17', 3
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'python-proqramlasdirmaya-giris', 'Funksiyalar', 4
where not exists (select 1 from modules where course_id = 'python-proqramlasdirmaya-giris' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'python-proqramlasdirmaya-giris', 'm4', 'Funksiya yazmaq və çağırmaq', '13:46', 1
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'python-proqramlasdirmaya-giris', 'm4', 'Parametrlər və qaytarılan dəyər', '14:47', 2
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'python-proqramlasdirmaya-giris', 'm4', 'Modullara bölmək', '15:48', 3
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'python-proqramlasdirmaya-giris', 'Fayllar və Səhvlər', 5
where not exists (select 1 from modules where course_id = 'python-proqramlasdirmaya-giris' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'python-proqramlasdirmaya-giris', 'm5', 'Fayl oxumaq və yazmaq', '14:17', 1
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'python-proqramlasdirmaya-giris', 'm5', 'try/except ilə səhv idarəsi', '15:18', 2
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'python-proqramlasdirmaya-giris', 'm5', 'Sadə jurnal (log) qurmaq', '16:19', 3
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm5-l3');

insert into modules (id, course_id, title, position)
select 'm6', 'python-proqramlasdirmaya-giris', 'Yekun Layihə', 6
where not exists (select 1 from modules where course_id = 'python-proqramlasdirmaya-giris' and id = 'm6');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l1', 'python-proqramlasdirmaya-giris', 'm6', 'Layihənin planlaşdırılması', '15:48', 1
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm6-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l2', 'python-proqramlasdirmaya-giris', 'm6', 'Kodun yazılması', '16:49', 2
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm6-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l3', 'python-proqramlasdirmaya-giris', 'm6', 'Təkmilləşdirmə və təqdimat', '7:50', 3
where not exists (select 1 from lessons where course_id = 'python-proqramlasdirmaya-giris' and id = 'm6-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'python-proqramlasdirmaya-giris', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'python-proqramlasdirmaya-giris' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'python-proqramlasdirmaya-giris', 'Məşq tapşırıqları.pdf', 2
where not exists (select 1 from materials where course_id = 'python-proqramlasdirmaya-giris' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'python-proqramlasdirmaya-giris', 'Nümunə kodlar.zip', 3
where not exists (select 1 from materials where course_id = 'python-proqramlasdirmaya-giris' and id = 'mat3');

-- ======================================================================
-- obyekt-yonumlu-proqramlasdirma-java
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Elvin Nəsirov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Backend Proqramçı'),
  summary             = coalesce(nullif(summary, ''), 'Java üzərindən obyekt yönümlü düşünməyi öyrən: sinif, varislik, interfeys və dizayn prinsipləri — hamısı praktik nümunələrlə və kiçik layihə ilə möhkəmləndirilir.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Sinif və obyekt anlayışlarını dəqiq ayırd etmək', 'İnkapsulyasiya, varislik və polimorfizmi tətbiq etmək', 'İnterfeys və abstrakt siniflərdən düzgün istifadə etmək', 'İstisnaları (exception) idarə etmək', 'Kolleksiyalarla işləmək və sadə layihə qurmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/obyekt-yonumlu-proqramlasdirma-java.jpg')
where id = 'obyekt-yonumlu-proqramlasdirma-java';

insert into modules (id, course_id, title, position)
select 'm1', 'obyekt-yonumlu-proqramlasdirma-java', 'Java ilə Tanışlıq', 1
where not exists (select 1 from modules where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'obyekt-yonumlu-proqramlasdirma-java', 'm1', 'Java mühitinin qurulması', '14:47', 1
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'obyekt-yonumlu-proqramlasdirma-java', 'm1', 'Sintaksis və əsas tiplər', '15:48', 2
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'obyekt-yonumlu-proqramlasdirma-java', 'm1', 'İlk sinifin yazılması', '16:49', 3
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'obyekt-yonumlu-proqramlasdirma-java', 'Sinif və Obyekt', 2
where not exists (select 1 from modules where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'obyekt-yonumlu-proqramlasdirma-java', 'm2', 'Sahələr və metodlar', '15:18', 1
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'obyekt-yonumlu-proqramlasdirma-java', 'm2', 'Konstruktorlar', '16:19', 2
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'obyekt-yonumlu-proqramlasdirma-java', 'm2', 'İnkapsulyasiya və getter/setter', '7:20', 3
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'obyekt-yonumlu-proqramlasdirma-java', 'Varislik və Polimorfizm', 3
where not exists (select 1 from modules where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'obyekt-yonumlu-proqramlasdirma-java', 'm3', 'extends ilə varislik', '16:49', 1
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'obyekt-yonumlu-proqramlasdirma-java', 'm3', 'Metodun üzərinə yazılması', '7:50', 2
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'obyekt-yonumlu-proqramlasdirma-java', 'm3', 'Polimorfizmin praktik faydası', '8:51', 3
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'obyekt-yonumlu-proqramlasdirma-java', 'Abstraksiya', 4
where not exists (select 1 from modules where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'obyekt-yonumlu-proqramlasdirma-java', 'm4', 'Abstrakt siniflər', '7:20', 1
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'obyekt-yonumlu-proqramlasdirma-java', 'm4', 'İnterfeyslər', '8:21', 2
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'obyekt-yonumlu-proqramlasdirma-java', 'm4', 'Nə vaxt hansını seçməli', '9:22', 3
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'obyekt-yonumlu-proqramlasdirma-java', 'Kolleksiyalar və İstisnalar', 5
where not exists (select 1 from modules where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'obyekt-yonumlu-proqramlasdirma-java', 'm5', 'List, Set və Map', '8:51', 1
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'obyekt-yonumlu-proqramlasdirma-java', 'm5', 'try/catch və özəl istisnalar', '9:52', 2
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'obyekt-yonumlu-proqramlasdirma-java', 'm5', 'Kolleksiyalarla məşqlər', '10:53', 3
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm5-l3');

insert into modules (id, course_id, title, position)
select 'm6', 'obyekt-yonumlu-proqramlasdirma-java', 'Yekun Layihə', 6
where not exists (select 1 from modules where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm6');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l1', 'obyekt-yonumlu-proqramlasdirma-java', 'm6', 'Domen modelinin qurulması', '9:22', 1
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm6-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l2', 'obyekt-yonumlu-proqramlasdirma-java', 'm6', 'Məntiqin yazılması', '10:23', 2
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm6-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l3', 'obyekt-yonumlu-proqramlasdirma-java', 'm6', 'Kodun təmizlənməsi', '11:24', 3
where not exists (select 1 from lessons where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'm6-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'obyekt-yonumlu-proqramlasdirma-java', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'obyekt-yonumlu-proqramlasdirma-java', 'Nümunə layihə.zip', 2
where not exists (select 1 from materials where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'obyekt-yonumlu-proqramlasdirma-java', 'OOP prinsipləri xülasəsi.pdf', 3
where not exists (select 1 from materials where course_id = 'obyekt-yonumlu-proqramlasdirma-java' and id = 'mat3');

-- ======================================================================
-- komputer-elmlerinin-esaslari
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Nigar Səfərova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Kompüter Elmləri Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Kompüterin arxasında nə baş verdiyini anla: ikilik say sistemindən alqoritmlərə, yaddaşdan şəbəkəyə qədər. Bu kurs bütün digər texniki kursların möhkəm təməlidir.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['İkilik və onaltılıq say sistemlərini oxumaq', 'Kompüterin əsas komponentlərinin rolunu izah etmək', 'Alqoritm və mürəkkəblik anlayışını mənimsəmək', 'Əsas məlumat strukturlarını tanımaq', 'Əməliyyat sistemi və şəbəkənin iş prinsipini başa düşmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/komputer-elmlerinin-esaslari.jpg')
where id = 'komputer-elmlerinin-esaslari';

insert into modules (id, course_id, title, position)
select 'm1', 'komputer-elmlerinin-esaslari', 'Məlumatın Təsviri', 1
where not exists (select 1 from modules where course_id = 'komputer-elmlerinin-esaslari' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'komputer-elmlerinin-esaslari', 'm1', 'İkilik say sistemi', '15:28', 1
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'komputer-elmlerinin-esaslari', 'm1', 'Mətn və şəkillərin kodlaşdırılması', '16:29', 2
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'komputer-elmlerinin-esaslari', 'm1', 'Məlumat ölçü vahidləri', '7:30', 3
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'komputer-elmlerinin-esaslari', 'Kompüterin Quruluşu', 2
where not exists (select 1 from modules where course_id = 'komputer-elmlerinin-esaslari' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'komputer-elmlerinin-esaslari', 'm2', 'Prosessor və yaddaş', '16:59', 1
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'komputer-elmlerinin-esaslari', 'm2', 'Giriş-çıxış qurğuları', '7:00', 2
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'komputer-elmlerinin-esaslari', 'm2', 'Proqram necə icra olunur', '8:01', 3
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'komputer-elmlerinin-esaslari', 'Alqoritmlər', 3
where not exists (select 1 from modules where course_id = 'komputer-elmlerinin-esaslari' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'komputer-elmlerinin-esaslari', 'm3', 'Alqoritm nədir', '7:30', 1
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'komputer-elmlerinin-esaslari', 'm3', 'Axtarış və çeşidləmə', '8:31', 2
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'komputer-elmlerinin-esaslari', 'm3', 'Mürəkkəbliyə giriş (Big-O)', '9:32', 3
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'komputer-elmlerinin-esaslari', 'Məlumat Strukturları', 4
where not exists (select 1 from modules where course_id = 'komputer-elmlerinin-esaslari' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'komputer-elmlerinin-esaslari', 'm4', 'Massiv və siyahılar', '8:01', 1
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'komputer-elmlerinin-esaslari', 'm4', 'Stek və növbə', '9:02', 2
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'komputer-elmlerinin-esaslari', 'm4', 'Ağaclar haqqında ilkin təsəvvür', '10:03', 3
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'komputer-elmlerinin-esaslari', 'Sistem və Şəbəkə', 5
where not exists (select 1 from modules where course_id = 'komputer-elmlerinin-esaslari' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'komputer-elmlerinin-esaslari', 'm5', 'Əməliyyat sisteminin vəzifələri', '9:32', 1
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'komputer-elmlerinin-esaslari', 'm5', 'Fayl sistemi', '10:33', 2
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'komputer-elmlerinin-esaslari', 'm5', 'İnternet necə işləyir', '11:34', 3
where not exists (select 1 from lessons where course_id = 'komputer-elmlerinin-esaslari' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'komputer-elmlerinin-esaslari', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'komputer-elmlerinin-esaslari' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'komputer-elmlerinin-esaslari', 'Alqoritm məşqləri.pdf', 2
where not exists (select 1 from materials where course_id = 'komputer-elmlerinin-esaslari' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'komputer-elmlerinin-esaslari', 'Terminlər lüğəti.pdf', 3
where not exists (select 1 from materials where course_id = 'komputer-elmlerinin-esaslari' and id = 'mat3');


commit;
