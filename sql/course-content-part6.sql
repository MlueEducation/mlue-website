-- MLUE kurs məzmunu — hissə 6/7
-- Təkrar işə salmaq təhlükəsizdir: heç nə silinmir, dolu sahə üzərinə yazılmır.

begin;

-- ======================================================================
-- fotoqrafiya-seneti
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Elçin Şirinov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Peşəkar Fotoqraf'),
  summary             = coalesce(nullif(summary, ''), 'Kameranı avtomatik rejimdən çıxar: işıq, ekspozisiya və kompozisiyanı anlayaraq istədiyin kadrı şüurlu şəkildə qur.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Diafraqma, sürət və ISO üçlüyünü idarə etmək', 'İşığı oxumaq və ondan istifadə etmək', 'Kompozisiya qaydalarını tətbiq etmək', 'Müxtəlif janrlarda çəkiliş aparmaq', 'Şəkilləri redaktə edib portfolio qurmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/fotoqrafiya-seneti.jpg')
where id = 'fotoqrafiya-seneti';

insert into modules (id, course_id, title, position)
select 'm1', 'fotoqrafiya-seneti', 'Kameranı Anlamaq', 1
where not exists (select 1 from modules where course_id = 'fotoqrafiya-seneti' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'fotoqrafiya-seneti', 'm1', 'Kameranın iş prinsipi', '15:58', 1
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'fotoqrafiya-seneti', 'm1', 'Ekspozisiya üçbucağı', '16:59', 2
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'fotoqrafiya-seneti', 'm1', 'Fokus və dərinlik', '7:00', 3
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'fotoqrafiya-seneti', 'İşıq', 2
where not exists (select 1 from modules where course_id = 'fotoqrafiya-seneti' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'fotoqrafiya-seneti', 'm2', 'Təbii işıq', '16:29', 1
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'fotoqrafiya-seneti', 'm2', 'İşığın istiqaməti və keyfiyyəti', '7:30', 2
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'fotoqrafiya-seneti', 'm2', 'Süni işıqla işləmək', '8:31', 3
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'fotoqrafiya-seneti', 'Kompozisiya', 3
where not exists (select 1 from modules where course_id = 'fotoqrafiya-seneti' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'fotoqrafiya-seneti', 'm3', 'Üçdəbir qaydası', '7:00', 1
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'fotoqrafiya-seneti', 'm3', 'Xətlər və çərçivələmə', '8:01', 2
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'fotoqrafiya-seneti', 'm3', 'Qaydaları nə vaxt pozmalı', '9:02', 3
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'fotoqrafiya-seneti', 'Janrlar', 4
where not exists (select 1 from modules where course_id = 'fotoqrafiya-seneti' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'fotoqrafiya-seneti', 'm4', 'Portret', '8:31', 1
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'fotoqrafiya-seneti', 'm4', 'Mənzərə', '9:32', 2
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'fotoqrafiya-seneti', 'm4', 'Küçə fotoqrafiyası', '10:33', 3
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'fotoqrafiya-seneti', 'Redaktə və Portfolio', 5
where not exists (select 1 from modules where course_id = 'fotoqrafiya-seneti' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'fotoqrafiya-seneti', 'm5', 'Əsas redaktə addımları', '9:02', 1
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'fotoqrafiya-seneti', 'm5', 'Rəng və ton', '10:03', 2
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'fotoqrafiya-seneti', 'm5', 'Portfolio seçimi', '11:04', 3
where not exists (select 1 from lessons where course_id = 'fotoqrafiya-seneti' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'fotoqrafiya-seneti', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'fotoqrafiya-seneti' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'fotoqrafiya-seneti', 'Çəkiliş tapşırıqları.pdf', 2
where not exists (select 1 from materials where course_id = 'fotoqrafiya-seneti' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'fotoqrafiya-seneti', 'Redaktə presetləri.zip', 3
where not exists (select 1 from materials where course_id = 'fotoqrafiya-seneti' and id = 'mat3');

-- ======================================================================
-- dunya-tarixine-seyahet
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Mahir Əliyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Tarix Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Tarixi tarix-ad yığını kimi yox, səbəb-nəticə zənciri kimi oxu: ilk sivilizasiyalardan müasir dünyaya qədər böyük dönüş nöqtələri.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Əsas tarixi dövrləri ardıcıllıqla yerləşdirmək', 'Sivilizasiyaların yüksəliş və süqut səbəblərini təhlil etmək', 'Mənbələrə tənqidi yanaşmaq', 'Tarixi hadisələri müasir dünya ilə əlaqələndirmək', 'Qısa tarixi esse yazmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/dunya-tarixine-seyahet.jpg')
where id = 'dunya-tarixine-seyahet';

insert into modules (id, course_id, title, position)
select 'm1', 'dunya-tarixine-seyahet', 'İlk Sivilizasiyalar', 1
where not exists (select 1 from modules where course_id = 'dunya-tarixine-seyahet' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'dunya-tarixine-seyahet', 'm1', 'Kənd təsərrüfatı inqilabı', '9:42', 1
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'dunya-tarixine-seyahet', 'm1', 'Mesopotamiya və Misir', '10:43', 2
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'dunya-tarixine-seyahet', 'm1', 'Yazının yaranması', '11:44', 3
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'dunya-tarixine-seyahet', 'Antik Dünya', 2
where not exists (select 1 from modules where course_id = 'dunya-tarixine-seyahet' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'dunya-tarixine-seyahet', 'm2', 'Yunanıstan', '10:13', 1
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'dunya-tarixine-seyahet', 'm2', 'Roma imperiyası', '11:14', 2
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'dunya-tarixine-seyahet', 'm2', 'Şərq sivilizasiyaları', '12:15', 3
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'dunya-tarixine-seyahet', 'Orta Əsrlər', 3
where not exists (select 1 from modules where course_id = 'dunya-tarixine-seyahet' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'dunya-tarixine-seyahet', 'm3', 'İslam dünyası', '11:44', 1
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'dunya-tarixine-seyahet', 'm3', 'Avropada feodalizm', '12:45', 2
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'dunya-tarixine-seyahet', 'm3', 'Ticarət yolları', '13:46', 3
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'dunya-tarixine-seyahet', 'Yeni Dövr', 4
where not exists (select 1 from modules where course_id = 'dunya-tarixine-seyahet' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'dunya-tarixine-seyahet', 'm4', 'Coğrafi kəşflər', '12:15', 1
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'dunya-tarixine-seyahet', 'm4', 'Sənaye inqilabı', '13:16', 2
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'dunya-tarixine-seyahet', 'm4', 'İnqilablar əsri', '14:17', 3
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'dunya-tarixine-seyahet', 'Müasir Dünya', 5
where not exists (select 1 from modules where course_id = 'dunya-tarixine-seyahet' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'dunya-tarixine-seyahet', 'm5', 'Dünya müharibələri', '13:46', 1
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'dunya-tarixine-seyahet', 'm5', 'Soyuq müharibə', '14:47', 2
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'dunya-tarixine-seyahet', 'm5', 'Qloballaşma', '15:48', 3
where not exists (select 1 from lessons where course_id = 'dunya-tarixine-seyahet' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'dunya-tarixine-seyahet', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'dunya-tarixine-seyahet' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'dunya-tarixine-seyahet', 'Xronoloji cədvəl.pdf', 2
where not exists (select 1 from materials where course_id = 'dunya-tarixine-seyahet' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'dunya-tarixine-seyahet', 'Mənbə seçmələri.pdf', 3
where not exists (select 1 from materials where course_id = 'dunya-tarixine-seyahet' and id = 'mat3');

-- ======================================================================
-- yaradici-yazi-seneti
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Günay Rzayeva'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Yazıçı və Redaktor'),
  summary             = coalesce(nullif(summary, ''), 'Ağ səhifə qorxusundan hazır hekayəyə: personaj, süjet, dialoq və redaktə — hər dərsdə yazırsan, sadəcə oxumursan.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['İdeyadan süjet qurmaq', 'İnandırıcı personaj yaratmaq', 'Təbii dialoq yazmaq', '"Göstər, demə" prinsipini tətbiq etmək', 'Öz mətnini redaktə etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/yaradici-yazi-seneti.jpg')
where id = 'yaradici-yazi-seneti';

insert into modules (id, course_id, title, position)
select 'm1', 'yaradici-yazi-seneti', 'Başlamaq', 1
where not exists (select 1 from modules where course_id = 'yaradici-yazi-seneti' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'yaradici-yazi-seneti', 'm1', 'Yazı vərdişi qurmaq', '14:17', 1
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'yaradici-yazi-seneti', 'm1', 'İdeyaların toplanması', '15:18', 2
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'yaradici-yazi-seneti', 'm1', 'Ağ səhifə ilə mübarizə', '16:19', 3
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'yaradici-yazi-seneti', 'Personaj', 2
where not exists (select 1 from modules where course_id = 'yaradici-yazi-seneti' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'yaradici-yazi-seneti', 'm2', 'Personajın motivasiyası', '15:48', 1
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'yaradici-yazi-seneti', 'm2', 'Daxili ziddiyyət', '16:49', 2
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'yaradici-yazi-seneti', 'm2', 'Personaj vərəqəsi', '7:50', 3
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'yaradici-yazi-seneti', 'Süjet', 3
where not exists (select 1 from modules where course_id = 'yaradici-yazi-seneti' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'yaradici-yazi-seneti', 'm3', 'Süjet strukturları', '16:19', 1
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'yaradici-yazi-seneti', 'm3', 'Gərginliyin qurulması', '7:20', 2
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'yaradici-yazi-seneti', 'm3', 'Final', '8:21', 3
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'yaradici-yazi-seneti', 'Səhnə və Dialoq', 4
where not exists (select 1 from modules where course_id = 'yaradici-yazi-seneti' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'yaradici-yazi-seneti', 'm4', 'Səhnənin qurulması', '7:50', 1
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'yaradici-yazi-seneti', 'm4', 'Dialoqun təbiiliyi', '8:51', 2
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'yaradici-yazi-seneti', 'm4', 'Göstər, demə', '9:52', 3
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'yaradici-yazi-seneti', 'Redaktə', 5
where not exists (select 1 from modules where course_id = 'yaradici-yazi-seneti' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'yaradici-yazi-seneti', 'm5', 'İlk qaralamadan sonra', '8:21', 1
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'yaradici-yazi-seneti', 'm5', 'Kəsmək sənəti', '9:22', 2
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'yaradici-yazi-seneti', 'm5', 'Geri bildirimlə işləmək', '10:23', 3
where not exists (select 1 from lessons where course_id = 'yaradici-yazi-seneti' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'yaradici-yazi-seneti', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'yaradici-yazi-seneti' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'yaradici-yazi-seneti', 'Yazı tapşırıqları.pdf', 2
where not exists (select 1 from materials where course_id = 'yaradici-yazi-seneti' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'yaradici-yazi-seneti', 'Redaktə yoxlama siyahısı.pdf', 3
where not exists (select 1 from materials where course_id = 'yaradici-yazi-seneti' and id = 'mat3');

-- ======================================================================
-- qrafik-dizayn-esaslari
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Səbuhi Nəbiyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Qrafik Dizayner'),
  summary             = coalesce(nullif(summary, ''), 'Dizaynı zövq məsələsi kimi deyil, qaydalar sistemi kimi öyrən: kompozisiya, tipoqrafiya, rəng və iyerarxiya — hər mövzu praktik tapşırıqla.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Kompozisiya və boşluqdan düzgün istifadə etmək', 'Şriftləri uyğunlaşdırmaq və oxunaqlılığı qorumaq', 'Rəng nəzəriyyəsini tətbiq etmək', 'Vizual iyerarxiya qurmaq', 'Hazır işi çap və rəqəmsal üçün hazırlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/qrafik-dizayn-esaslari.jpg')
where id = 'qrafik-dizayn-esaslari';

insert into modules (id, course_id, title, position)
select 'm1', 'qrafik-dizayn-esaslari', 'Dizayn Prinsipləri', 1
where not exists (select 1 from modules where course_id = 'qrafik-dizayn-esaslari' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'qrafik-dizayn-esaslari', 'm1', 'Rəng nəzəriyyəsi', '8:51', 1
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'qrafik-dizayn-esaslari', 'm1', 'Kompozisiya qaydaları', '9:52', 2
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'qrafik-dizayn-esaslari', 'm1', 'Boşluğun rolu', '10:53', 3
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'qrafik-dizayn-esaslari', 'Praktik Layihə', 2
where not exists (select 1 from modules where course_id = 'qrafik-dizayn-esaslari' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'qrafik-dizayn-esaslari', 'm2', 'Loqotip yaratmaq', '9:22', 1
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'qrafik-dizayn-esaslari', 'm2', 'Figma ilə iş', '10:23', 2
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'qrafik-dizayn-esaslari', 'm2', 'Yekun fayl hazırlığı', '11:24', 3
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'qrafik-dizayn-esaslari', 'Tipoqrafiya', 3
where not exists (select 1 from modules where course_id = 'qrafik-dizayn-esaslari' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'qrafik-dizayn-esaslari', 'm3', 'Şrift anatomiyası', '10:53', 1
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'qrafik-dizayn-esaslari', 'm3', 'Şrift cütləşdirmə', '11:54', 2
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'qrafik-dizayn-esaslari', 'm3', 'Oxunaqlılıq', '12:55', 3
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'qrafik-dizayn-esaslari', 'İyerarxiya və Şəbəkə', 4
where not exists (select 1 from modules where course_id = 'qrafik-dizayn-esaslari' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'qrafik-dizayn-esaslari', 'm4', 'Vizual iyerarxiya', '11:24', 1
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'qrafik-dizayn-esaslari', 'm4', 'Grid sistemi', '12:25', 2
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'qrafik-dizayn-esaslari', 'm4', 'Layout məşqi', '13:26', 3
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'qrafik-dizayn-esaslari', 'Rəng Sistemləri', 5
where not exists (select 1 from modules where course_id = 'qrafik-dizayn-esaslari' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'qrafik-dizayn-esaslari', 'm5', 'Rəng çarxı və harmoniya', '12:55', 1
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'qrafik-dizayn-esaslari', 'm5', 'Kontrast və əlçatanlıq', '13:56', 2
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'qrafik-dizayn-esaslari', 'm5', 'Palitranın qurulması', '14:57', 3
where not exists (select 1 from lessons where course_id = 'qrafik-dizayn-esaslari' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'qrafik-dizayn-esaslari', 'Rəng palitraları.pdf', 1
where not exists (select 1 from materials where course_id = 'qrafik-dizayn-esaslari' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'qrafik-dizayn-esaslari', 'Şablon fayllar.zip', 2
where not exists (select 1 from materials where course_id = 'qrafik-dizayn-esaslari' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'qrafik-dizayn-esaslari', 'Kurs slaydları.pdf', 3
where not exists (select 1 from materials where course_id = 'qrafik-dizayn-esaslari' and id = 'mat3');

-- ======================================================================
-- vaxt-idareetmesi-ve-mehsuldarliq
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'İlkin Hüseynli'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Məhsuldarlıq Təlimçisi'),
  summary             = coalesce(nullif(summary, ''), 'Daha çox işləmək yox, daha düzgün işləmək: prioritet qoymaq, diqqəti qorumaq və işləyən bir sistem qurmaq.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Tapşırıqları təsirə görə prioritetləşdirmək', 'Diqqəti dağıdan amilləri idarə etmək', 'Real planlama və vaxt bloklaması qurmaq', 'Təxirəsalmanın səbəbini aradan qaldırmaq', 'Həftəlik icmal vərdişi formalaşdırmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/vaxt-idareetmesi-ve-mehsuldarliq.jpg')
where id = 'vaxt-idareetmesi-ve-mehsuldarliq';

insert into modules (id, course_id, title, position)
select 'm1', 'vaxt-idareetmesi-ve-mehsuldarliq', 'Vaxtın Auditi', 1
where not exists (select 1 from modules where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm1', 'Vaxt nəyə gedir', '7:40', 1
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm1', 'Enerji və diqqət dövrləri', '8:41', 2
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm1', 'Real imkanın qiymətləndirilməsi', '9:42', 3
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'vaxt-idareetmesi-ve-mehsuldarliq', 'Prioritetləşdirmə', 2
where not exists (select 1 from modules where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm2', 'Vacib və təcili ayrımı', '8:11', 1
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm2', 'Tapşırıqların qruplaşdırılması', '9:12', 2
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm2', '"Yox" demək', '10:13', 3
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'vaxt-idareetmesi-ve-mehsuldarliq', 'Sistem Qurmaq', 3
where not exists (select 1 from modules where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm3', 'Tapşırıq sistemi seçimi', '9:42', 1
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm3', 'Vaxt bloklaması', '10:43', 2
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm3', 'Həftəlik icmal', '11:44', 3
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'vaxt-idareetmesi-ve-mehsuldarliq', 'Diqqət və Davamlılıq', 4
where not exists (select 1 from modules where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm4', 'Dərin iş rejimi', '10:13', 1
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm4', 'Təxirəsalma ilə iş', '11:14', 2
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'vaxt-idareetmesi-ve-mehsuldarliq', 'm4', 'Vərdişin qorunması', '12:15', 3
where not exists (select 1 from lessons where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'vaxt-idareetmesi-ve-mehsuldarliq', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'vaxt-idareetmesi-ve-mehsuldarliq', 'Həftəlik planlama şablonu.pdf', 2
where not exists (select 1 from materials where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'vaxt-idareetmesi-ve-mehsuldarliq', 'Vaxt auditi cədvəli.xlsx', 3
where not exists (select 1 from materials where course_id = 'vaxt-idareetmesi-ve-mehsuldarliq' and id = 'mat3');

-- ======================================================================
-- effektiv-unsiyyet-ve-natiqlik
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Aysel Şirinova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Ünsiyyət Təlimçisi'),
  summary             = coalesce(nullif(summary, ''), 'Fikri aydın çatdırmaq və auditoriya qarşısında özünü rahat hiss etmək — struktur, səs, bədən dili və hazırlıq üzərindən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Nitqi aydın strukturla qurmaq', 'Səs və bədən dilini idarə etmək', 'Çıxış həyəcanı ilə işləmək', 'Aktiv dinləmə tətbiq etmək', 'Çətin söhbətləri idarə etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/effektiv-unsiyyet-ve-natiqlik.jpg')
where id = 'effektiv-unsiyyet-ve-natiqlik';

insert into modules (id, course_id, title, position)
select 'm1', 'effektiv-unsiyyet-ve-natiqlik', 'Ünsiyyətin Əsasları', 1
where not exists (select 1 from modules where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'effektiv-unsiyyet-ve-natiqlik', 'm1', 'Mesajın aydınlığı', '16:19', 1
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'effektiv-unsiyyet-ve-natiqlik', 'm1', 'Aktiv dinləmə', '7:20', 2
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'effektiv-unsiyyet-ve-natiqlik', 'm1', 'Qeyri-verbal ünsiyyət', '8:21', 3
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'effektiv-unsiyyet-ve-natiqlik', 'Nitqin Qurulması', 2
where not exists (select 1 from modules where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'effektiv-unsiyyet-ve-natiqlik', 'm2', 'Giriş, əsas hissə, nəticə', '7:50', 1
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'effektiv-unsiyyet-ve-natiqlik', 'm2', 'Hekayə ilə təsir', '8:51', 2
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'effektiv-unsiyyet-ve-natiqlik', 'm2', 'Vaxtın idarə olunması', '9:52', 3
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'effektiv-unsiyyet-ve-natiqlik', 'Səhnə Bacarıqları', 3
where not exists (select 1 from modules where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'effektiv-unsiyyet-ve-natiqlik', 'm3', 'Səs və tempin idarəsi', '8:21', 1
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'effektiv-unsiyyet-ve-natiqlik', 'm3', 'Bədən dili və göz təması', '9:22', 2
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'effektiv-unsiyyet-ve-natiqlik', 'm3', 'Həyəcanla iş', '10:23', 3
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'effektiv-unsiyyet-ve-natiqlik', 'Çətin Vəziyyətlər', 4
where not exists (select 1 from modules where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'effektiv-unsiyyet-ve-natiqlik', 'm4', 'Gözlənilməz suallar', '9:52', 1
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'effektiv-unsiyyet-ve-natiqlik', 'm4', 'Fikir ayrılığının idarəsi', '10:53', 2
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'effektiv-unsiyyet-ve-natiqlik', 'm4', 'Geri bildirim vermək', '11:54', 3
where not exists (select 1 from lessons where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'effektiv-unsiyyet-ve-natiqlik', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'effektiv-unsiyyet-ve-natiqlik', 'Nitq hazırlıq şablonu.pdf', 2
where not exists (select 1 from materials where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'effektiv-unsiyyet-ve-natiqlik', 'Məşq tapşırıqları.pdf', 3
where not exists (select 1 from materials where course_id = 'effektiv-unsiyyet-ve-natiqlik' and id = 'mat3');


commit;
