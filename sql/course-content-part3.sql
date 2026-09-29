-- MLUE kurs məzmunu — hissə 3/7
-- Təkrar işə salmaq təhlükəsizdir: heç nə silinmir, dolu sahə üzərinə yazılmır.

begin;

-- ======================================================================
-- saglamliq-sistemlerinin-idare-edilmesi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Dr. Ramil Əsgərov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Səhiyyə Menecmenti üzrə Mütəxəssis'),
  summary             = coalesce(nullif(summary, ''), 'Xəstəxana və klinikaların idarəolunması: resurs planlaması, keyfiyyət göstəriciləri, xəstə axınının optimallaşdırılması və maliyyə idarəçiliyi.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Səhiyyə təşkilatının strukturunu təhlil etmək', 'Xəstə axınını və növbələri optimallaşdırmaq', 'Keyfiyyət və təhlükəsizlik göstəricilərini ölçmək', 'Büdcə və resursları planlamaq', 'Dəyişiklik idarəetməsini tətbiq etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/saglamliq-sistemlerinin-idare-edilmesi.jpg')
where id = 'saglamliq-sistemlerinin-idare-edilmesi';

insert into modules (id, course_id, title, position)
select 'm1', 'saglamliq-sistemlerinin-idare-edilmesi', 'Səhiyyə Menecmentinə Giriş', 1
where not exists (select 1 from modules where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'saglamliq-sistemlerinin-idare-edilmesi', 'm1', 'Təşkilati struktur', '10:53', 1
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'saglamliq-sistemlerinin-idare-edilmesi', 'm1', 'Maraqlı tərəflər', '11:54', 2
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'saglamliq-sistemlerinin-idare-edilmesi', 'm1', 'Əsas idarəetmə funksiyaları', '12:55', 3
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'saglamliq-sistemlerinin-idare-edilmesi', 'Əməliyyat İdarəetməsi', 2
where not exists (select 1 from modules where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'saglamliq-sistemlerinin-idare-edilmesi', 'm2', 'Xəstə axınının modelləşdirilməsi', '11:24', 1
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'saglamliq-sistemlerinin-idare-edilmesi', 'm2', 'Növbə və gözləmə vaxtı', '12:25', 2
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'saglamliq-sistemlerinin-idare-edilmesi', 'm2', 'Resursların planlaşdırılması', '13:26', 3
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'saglamliq-sistemlerinin-idare-edilmesi', 'Keyfiyyət və Təhlükəsizlik', 3
where not exists (select 1 from modules where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'saglamliq-sistemlerinin-idare-edilmesi', 'm3', 'Keyfiyyət göstəriciləri', '12:55', 1
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'saglamliq-sistemlerinin-idare-edilmesi', 'm3', 'Xəstə təhlükəsizliyi', '13:56', 2
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'saglamliq-sistemlerinin-idare-edilmesi', 'm3', 'Akkreditasiya standartları', '14:57', 3
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'saglamliq-sistemlerinin-idare-edilmesi', 'Maliyyə və İnsan Resursları', 4
where not exists (select 1 from modules where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'saglamliq-sistemlerinin-idare-edilmesi', 'm4', 'Büdcələmə əsasları', '13:26', 1
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'saglamliq-sistemlerinin-idare-edilmesi', 'm4', 'Xərc-fayda təhlili', '14:27', 2
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'saglamliq-sistemlerinin-idare-edilmesi', 'm4', 'Komandanın idarə olunması', '15:28', 3
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'saglamliq-sistemlerinin-idare-edilmesi', 'Dəyişiklik İdarəetməsi', 5
where not exists (select 1 from modules where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'saglamliq-sistemlerinin-idare-edilmesi', 'm5', 'Təkmilləşdirmə metodikaları', '14:57', 1
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'saglamliq-sistemlerinin-idare-edilmesi', 'm5', 'Rəqəmsallaşma', '15:58', 2
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'saglamliq-sistemlerinin-idare-edilmesi', 'm5', 'Nümunə hal təhlili', '16:59', 3
where not exists (select 1 from lessons where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'saglamliq-sistemlerinin-idare-edilmesi', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'saglamliq-sistemlerinin-idare-edilmesi', 'Göstəricilər paneli şablonu.xlsx', 2
where not exists (select 1 from materials where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'saglamliq-sistemlerinin-idare-edilmesi', 'Nümunə hallar.pdf', 3
where not exists (select 1 from materials where course_id = 'saglamliq-sistemlerinin-idare-edilmesi' and id = 'mat3');

-- ======================================================================
-- zehni-saglamliq-ve-stress-idareetmesi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Nərmin Allahverdiyeva'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Psixoloq'),
  summary             = coalesce(nullif(summary, ''), 'Stressin bədəndə və zehində necə işlədiyini anla, sübuta əsaslanan texnikalarla onu idarə etməyi öyrən. Kurs maarifləndirmə məqsədi daşıyır, müalicəni əvəz etmir.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Stressin fizioloji mexanizmini izah etmək', 'Tükənmişlik əlamətlərini erkən tanımaq', 'Nəfəs və diqqətlilik texnikalarını tətbiq etmək', 'Sağlam sərhədlər qurmaq', 'Peşəkar yardımın nə vaxt lazım olduğunu bilmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/zehni-saglamliq-ve-stress-idareetmesi.jpg')
where id = 'zehni-saglamliq-ve-stress-idareetmesi';

insert into modules (id, course_id, title, position)
select 'm1', 'zehni-saglamliq-ve-stress-idareetmesi', 'Stress Nədir', 1
where not exists (select 1 from modules where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'zehni-saglamliq-ve-stress-idareetmesi', 'm1', 'Stress reaksiyasının fiziologiyası', '11:24', 1
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'zehni-saglamliq-ve-stress-idareetmesi', 'm1', 'Kəskin və xroniki stress', '12:25', 2
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'zehni-saglamliq-ve-stress-idareetmesi', 'm1', 'Stressin bədənə təsiri', '13:26', 3
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'zehni-saglamliq-ve-stress-idareetmesi', 'Tanıma və Ölçmə', 2
where not exists (select 1 from modules where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'zehni-saglamliq-ve-stress-idareetmesi', 'm2', 'Tükənmişlik sindromu', '12:55', 1
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'zehni-saglamliq-ve-stress-idareetmesi', 'm2', 'Narahatlıq əlamətləri', '13:56', 2
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'zehni-saglamliq-ve-stress-idareetmesi', 'm2', 'Özünümüşahidə gündəliyi', '14:57', 3
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'zehni-saglamliq-ve-stress-idareetmesi', 'İdarəetmə Texnikaları', 3
where not exists (select 1 from modules where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'zehni-saglamliq-ve-stress-idareetmesi', 'm3', 'Nəfəs və relaksasiya', '13:26', 1
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'zehni-saglamliq-ve-stress-idareetmesi', 'm3', 'Diqqətlilik (mindfulness) məşqləri', '14:27', 2
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'zehni-saglamliq-ve-stress-idareetmesi', 'm3', 'Koqnitiv yenidənqiymətləndirmə', '15:28', 3
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'zehni-saglamliq-ve-stress-idareetmesi', 'Dayanıqlıq Qurmaq', 4
where not exists (select 1 from modules where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'zehni-saglamliq-ve-stress-idareetmesi', 'm4', 'Yuxu, hərəkət və qidalanma', '14:57', 1
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'zehni-saglamliq-ve-stress-idareetmesi', 'm4', 'Sərhədlər və "yox" demək', '15:58', 2
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'zehni-saglamliq-ve-stress-idareetmesi', 'm4', 'Dəstək şəbəkəsi və peşəkar yardım', '16:59', 3
where not exists (select 1 from lessons where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'zehni-saglamliq-ve-stress-idareetmesi', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'zehni-saglamliq-ve-stress-idareetmesi', 'Nəfəs məşqləri bələdçisi.pdf', 2
where not exists (select 1 from materials where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'zehni-saglamliq-ve-stress-idareetmesi', 'Özünümüşahidə gündəliyi.pdf', 3
where not exists (select 1 from materials where course_id = 'zehni-saglamliq-ve-stress-idareetmesi' and id = 'mat3');

-- ======================================================================
-- muhendislik-mexanikasinin-esaslari
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Emin Vəliyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'İnşaat Mühəndisi'),
  summary             = coalesce(nullif(summary, ''), 'Statika və materiallar müqavimətinin təməli: qüvvələrin necə paylandığını, konstruksiyaların niyə dayandığını və hesablamaların necə aparıldığını öyrən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Qüvvə və momentləri vektor şəklində hesablamaq', 'Sərbəst cisim diaqramı qurmaq', 'Fermaların daxili qüvvələrini təyin etmək', 'Gərginlik və deformasiyanı hesablamaq', 'Sadə tir hesabatını aparmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/muhendislik-mexanikasinin-esaslari.jpg')
where id = 'muhendislik-mexanikasinin-esaslari';

insert into modules (id, course_id, title, position)
select 'm1', 'muhendislik-mexanikasinin-esaslari', 'Statikanın Əsasları', 1
where not exists (select 1 from modules where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'muhendislik-mexanikasinin-esaslari', 'm1', 'Qüvvə və vektorlar', '7:20', 1
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'muhendislik-mexanikasinin-esaslari', 'm1', 'Moment anlayışı', '8:21', 2
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'muhendislik-mexanikasinin-esaslari', 'm1', 'Tarazlıq şərtləri', '9:22', 3
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'muhendislik-mexanikasinin-esaslari', 'Konstruksiyaların Təhlili', 2
where not exists (select 1 from modules where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'muhendislik-mexanikasinin-esaslari', 'm2', 'Sərbəst cisim diaqramı', '8:51', 1
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'muhendislik-mexanikasinin-esaslari', 'm2', 'Ferma hesabatı', '9:52', 2
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'muhendislik-mexanikasinin-esaslari', 'm2', 'Dayaq reaksiyaları', '10:53', 3
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'muhendislik-mexanikasinin-esaslari', 'Materiallar Müqaviməti', 3
where not exists (select 1 from modules where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'muhendislik-mexanikasinin-esaslari', 'm3', 'Gərginlik və deformasiya', '9:22', 1
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'muhendislik-mexanikasinin-esaslari', 'm3', 'Elastiklik modulu', '10:23', 2
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'muhendislik-mexanikasinin-esaslari', 'm3', 'Təhlükəsizlik əmsalı', '11:24', 3
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'muhendislik-mexanikasinin-esaslari', 'Tirlər və Yüklər', 4
where not exists (select 1 from modules where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'muhendislik-mexanikasinin-esaslari', 'm4', 'Kəsici qüvvə diaqramı', '10:53', 1
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'muhendislik-mexanikasinin-esaslari', 'm4', 'Əyici moment diaqramı', '11:54', 2
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'muhendislik-mexanikasinin-esaslari', 'm4', 'Praktik hesablama nümunəsi', '12:55', 3
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'muhendislik-mexanikasinin-esaslari', 'Tətbiq', 5
where not exists (select 1 from modules where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'muhendislik-mexanikasinin-esaslari', 'm5', 'Real konstruksiya təhlili', '11:24', 1
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'muhendislik-mexanikasinin-esaslari', 'm5', 'Hesablama səhvləri', '12:25', 2
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'muhendislik-mexanikasinin-esaslari', 'm5', 'Yekun məsələ həlli', '13:26', 3
where not exists (select 1 from lessons where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'muhendislik-mexanikasinin-esaslari', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'muhendislik-mexanikasinin-esaslari', 'Düsturlar kitabçası.pdf', 2
where not exists (select 1 from materials where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'muhendislik-mexanikasinin-esaslari', 'Məsələlər toplusu.pdf', 3
where not exists (select 1 from materials where course_id = 'muhendislik-mexanikasinin-esaslari' and id = 'mat3');

-- ======================================================================
-- yenilene-bilen-enerji-menbeleri
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Şəhla Muradova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Enerji Sistemləri Mühəndisi'),
  summary             = coalesce(nullif(summary, ''), 'Günəş, külək, su və geotermal enerjinin necə işlədiyi, hansı şəraitdə səmərəli olduğu və enerji keçidinin qarşısındakı real maneələr.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Əsas bərpaolunan enerji növlərini müqayisə etmək', 'Günəş və külək sistemlərinin iş prinsipini izah etmək', 'Enerji səmərəliliyini hesablamaq', 'Enerjinin saxlanması məsələsini anlamaq', 'Kiçik sistem üçün ilkin hesablama aparmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/yenilene-bilen-enerji-menbeleri.jpg')
where id = 'yenilene-bilen-enerji-menbeleri';

insert into modules (id, course_id, title, position)
select 'm1', 'yenilene-bilen-enerji-menbeleri', 'Enerjiyə Baxış', 1
where not exists (select 1 from modules where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'yenilene-bilen-enerji-menbeleri', 'm1', 'Enerji mənbələrinin təsnifatı', '15:28', 1
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'yenilene-bilen-enerji-menbeleri', 'm1', 'Enerji keçidi və iqlim', '16:29', 2
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'yenilene-bilen-enerji-menbeleri', 'm1', 'Əsas anlayış və vahidlər', '7:30', 3
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'yenilene-bilen-enerji-menbeleri', 'Günəş Enerjisi', 2
where not exists (select 1 from modules where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'yenilene-bilen-enerji-menbeleri', 'm2', 'Fotoelektrik effekt', '16:59', 1
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'yenilene-bilen-enerji-menbeleri', 'm2', 'Panel sistemlərinin quruluşu', '7:00', 2
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'yenilene-bilen-enerji-menbeleri', 'm2', 'Məhsuldarlığa təsir edən amillər', '8:01', 3
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'yenilene-bilen-enerji-menbeleri', 'Külək və Su', 3
where not exists (select 1 from modules where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'yenilene-bilen-enerji-menbeleri', 'm3', 'Külək turbinlərinin iş prinsipi', '7:30', 1
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'yenilene-bilen-enerji-menbeleri', 'm3', 'Hidroenerji', '8:31', 2
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'yenilene-bilen-enerji-menbeleri', 'm3', 'Yerləşdirmə kriteriyaları', '9:32', 3
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'yenilene-bilen-enerji-menbeleri', 'Saxlama və Şəbəkə', 4
where not exists (select 1 from modules where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'yenilene-bilen-enerji-menbeleri', 'm4', 'Akkumulyator texnologiyaları', '8:01', 1
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'yenilene-bilen-enerji-menbeleri', 'm4', 'Şəbəkəyə inteqrasiya', '9:02', 2
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'yenilene-bilen-enerji-menbeleri', 'm4', 'Balanslaşdırma problemi', '10:03', 3
where not exists (select 1 from lessons where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'yenilene-bilen-enerji-menbeleri', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'yenilene-bilen-enerji-menbeleri', 'Hesablama cədvəli.xlsx', 2
where not exists (select 1 from materials where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'yenilene-bilen-enerji-menbeleri', 'Müqayisəli analiz.pdf', 3
where not exists (select 1 from materials where course_id = 'yenilene-bilen-enerji-menbeleri' and id = 'mat3');

-- ======================================================================
-- fizikaya-giris-klassik-mexanika
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Anar Salmanov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Fizika Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'Nyuton mexanikasını düsturları əzbərləmədən anla: hərəkət, qüvvə, enerji və impuls — hər anlayış gündəlik həyatdan nümunələrlə izah olunur.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Hərəkəti kinematik tənliklərlə təsvir etmək', 'Nyutonun üç qanununu tətbiq etmək', 'İş, enerji və gücü hesablamaq', 'İmpulsun saxlanması qanunundan istifadə etmək', 'Fiziki məsələləri sistemli həll etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/fizikaya-giris-klassik-mexanika.jpg')
where id = 'fizikaya-giris-klassik-mexanika';

insert into modules (id, course_id, title, position)
select 'm1', 'fizikaya-giris-klassik-mexanika', 'Kinematika', 1
where not exists (select 1 from modules where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'fizikaya-giris-klassik-mexanika', 'm1', 'Yerdəyişmə, sürət və təcil', '10:33', 1
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'fizikaya-giris-klassik-mexanika', 'm1', 'Düzxətli bərabərtəcilli hərəkət', '11:34', 2
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'fizikaya-giris-klassik-mexanika', 'm1', 'Qravitasiya sahəsində hərəkət', '12:35', 3
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'fizikaya-giris-klassik-mexanika', 'Dinamika', 2
where not exists (select 1 from modules where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'fizikaya-giris-klassik-mexanika', 'm2', 'Nyutonun birinci qanunu', '11:04', 1
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'fizikaya-giris-klassik-mexanika', 'm2', 'İkinci və üçüncü qanunlar', '12:05', 2
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'fizikaya-giris-klassik-mexanika', 'm2', 'Sürtünmə qüvvəsi', '13:06', 3
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'fizikaya-giris-klassik-mexanika', 'İş və Enerji', 3
where not exists (select 1 from modules where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'fizikaya-giris-klassik-mexanika', 'm3', 'İş və kinetik enerji', '12:35', 1
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'fizikaya-giris-klassik-mexanika', 'm3', 'Potensial enerji', '13:36', 2
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'fizikaya-giris-klassik-mexanika', 'm3', 'Enerjinin saxlanması', '14:37', 3
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'fizikaya-giris-klassik-mexanika', 'İmpuls', 4
where not exists (select 1 from modules where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'fizikaya-giris-klassik-mexanika', 'm4', 'İmpuls və toqquşmalar', '13:06', 1
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'fizikaya-giris-klassik-mexanika', 'm4', 'Elastik və qeyri-elastik toqquşma', '14:07', 2
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'fizikaya-giris-klassik-mexanika', 'm4', 'Praktik nümunələr', '15:08', 3
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'fizikaya-giris-klassik-mexanika', 'Məsələ Həlli', 5
where not exists (select 1 from modules where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'fizikaya-giris-klassik-mexanika', 'm5', 'Məsələ həllinin metodikası', '14:37', 1
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'fizikaya-giris-klassik-mexanika', 'm5', 'Qarışıq məsələlər', '15:38', 2
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'fizikaya-giris-klassik-mexanika', 'm5', 'Yekun təkrar', '16:39', 3
where not exists (select 1 from lessons where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'fizikaya-giris-klassik-mexanika', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'fizikaya-giris-klassik-mexanika', 'Məsələlər toplusu.pdf', 2
where not exists (select 1 from materials where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'fizikaya-giris-klassik-mexanika', 'Düsturlar vərəqi.pdf', 3
where not exists (select 1 from materials where course_id = 'fizikaya-giris-klassik-mexanika' and id = 'mat3');

-- ======================================================================
-- cad-ile-3d-modellesdirme
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Rüfət İsmayılov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Mexanika Dizayn Mühəndisi'),
  summary             = coalesce(nullif(summary, ''), 'Eskizdən hazır 3D modelə və texniki çertyoja qədər: parametrik modelləşdirmənin məntiqini öyrən və öz detalını yaradıb yığ.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Parametrik eskiz çəkmək və məhdudiyyətlər qoymaq', '2D eskizdən 3D həcm yaratmaq', 'Detalları yığma (assembly) halına gətirmək', 'Texniki çertyoj hazırlamaq', 'Modeli çap və istehsal üçün ixrac etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/cad-ile-3d-modellesdirme.jpg')
where id = 'cad-ile-3d-modellesdirme';

insert into modules (id, course_id, title, position)
select 'm1', 'cad-ile-3d-modellesdirme', 'CAD-ə Giriş', 1
where not exists (select 1 from modules where course_id = 'cad-ile-3d-modellesdirme' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'cad-ile-3d-modellesdirme', 'm1', 'İnterfeys və iş axını', '11:24', 1
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'cad-ile-3d-modellesdirme', 'm1', 'Koordinat sistemləri', '12:25', 2
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'cad-ile-3d-modellesdirme', 'm1', 'İlk eskiz', '13:26', 3
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'cad-ile-3d-modellesdirme', 'Eskiz və Məhdudiyyətlər', 2
where not exists (select 1 from modules where course_id = 'cad-ile-3d-modellesdirme' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'cad-ile-3d-modellesdirme', 'm2', 'Həndəsi məhdudiyyətlər', '12:55', 1
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'cad-ile-3d-modellesdirme', 'm2', 'Ölçü məhdudiyyətləri', '13:56', 2
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'cad-ile-3d-modellesdirme', 'm2', 'Parametrik düşüncə', '14:57', 3
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'cad-ile-3d-modellesdirme', '3D Modelləşdirmə', 3
where not exists (select 1 from modules where course_id = 'cad-ile-3d-modellesdirme' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'cad-ile-3d-modellesdirme', 'm3', 'Extrude və revolve', '13:26', 1
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'cad-ile-3d-modellesdirme', 'm3', 'Fillet, chamfer və pattern', '14:27', 2
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'cad-ile-3d-modellesdirme', 'm3', 'Mürəkkəb detalın qurulması', '15:28', 3
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'cad-ile-3d-modellesdirme', 'Yığma', 4
where not exists (select 1 from modules where course_id = 'cad-ile-3d-modellesdirme' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'cad-ile-3d-modellesdirme', 'm4', 'Detalların əlaqələndirilməsi', '14:57', 1
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'cad-ile-3d-modellesdirme', 'm4', 'Hərəkət və toqquşma yoxlaması', '15:58', 2
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'cad-ile-3d-modellesdirme', 'm4', 'Yığma sənədləşdirmə', '16:59', 3
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'cad-ile-3d-modellesdirme', 'Çertyoj və İxrac', 5
where not exists (select 1 from modules where course_id = 'cad-ile-3d-modellesdirme' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'cad-ile-3d-modellesdirme', 'm5', 'Texniki çertyojun qurulması', '15:28', 1
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'cad-ile-3d-modellesdirme', 'm5', 'Ölçü və tolerans', '16:29', 2
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'cad-ile-3d-modellesdirme', 'm5', 'STL və PDF ixracı', '7:30', 3
where not exists (select 1 from lessons where course_id = 'cad-ile-3d-modellesdirme' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'cad-ile-3d-modellesdirme', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'cad-ile-3d-modellesdirme' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'cad-ile-3d-modellesdirme', 'Məşq faylları.zip', 2
where not exists (select 1 from materials where course_id = 'cad-ile-3d-modellesdirme' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'cad-ile-3d-modellesdirme', 'Çertyoj standartları.pdf', 3
where not exists (select 1 from materials where course_id = 'cad-ile-3d-modellesdirme' and id = 'mat3');


commit;
