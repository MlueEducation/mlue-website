-- MLUE kurs məzmunu — hissə 2/7
-- Təkrar işə salmaq təhlükəsizdir: heç nə silinmir, dolu sahə üzərinə yazılmır.

begin;

-- ======================================================================
-- nodejs-ve-expressjs-ile-backend-arxitekturasi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Kamran Əhmədov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Baş Backend Mühəndisi'),
  summary             = coalesce(nullif(summary, ''), 'Node.js və Express ilə real istehsalata uyğun backend qurmağı öyrən: layihə strukturu, autentifikasiya, verilənlər bazası və təhlükəsizlik — hamısı bir layihə üzərində addım-addım.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Express ilə REST API layihəsini düzgün strukturlaşdırmaq', 'Middleware zəncirini və səhv idarəsini qurmaq', 'Verilənlər bazası ilə təhlükəsiz işləmək', 'JWT əsaslı autentifikasiya və icazə sistemi tətbiq etmək', 'API-ni test etmək və istehsalata hazırlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/nodejs-ve-expressjs-ile-backend-arxitekturasi.jpg')
where id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi';

insert into modules (id, course_id, title, position)
select 'm1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'Node.js Təməlləri', 1
where not exists (select 1 from modules where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm1', 'Node.js necə işləyir', '9:52', 1
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm1', 'Asinxron proqramlaşdırma və Promise', '10:53', 2
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm1', 'npm və layihə strukturu', '11:54', 3
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'Express ilə API', 2
where not exists (select 1 from modules where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm2', 'Marşrutlar (routes) və nəzarətçilər', '10:23', 1
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm2', 'Middleware anlayışı', '11:24', 2
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm2', 'Mərkəzləşdirilmiş səhv idarəsi', '12:25', 3
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'Verilənlər Bazası', 3
where not exists (select 1 from modules where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm3', 'Bazaya qoşulma və modellər', '11:54', 1
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm3', 'CRUD əməliyyatları', '12:55', 2
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm3', 'Miqrasiyalar və seed məlumatı', '13:56', 3
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'Autentifikasiya', 4
where not exists (select 1 from modules where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm4', 'Parolların təhlükəsiz saxlanması', '12:25', 1
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm4', 'JWT ilə sessiya', '13:26', 2
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm4', 'Rol əsaslı icazələr', '14:27', 3
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'Təhlükəsizlik və Performans', 5
where not exists (select 1 from modules where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm5', 'Ən çox rast gəlinən zəifliklər', '13:56', 1
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm5', 'Rate limiting və validasiya', '14:57', 2
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm5', 'Keşləmə və optimallaşdırma', '15:58', 3
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm5-l3');

insert into modules (id, course_id, title, position)
select 'm6', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'İstehsalata Çıxış', 6
where not exists (select 1 from modules where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm6');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm6', 'Mühit dəyişənləri və konfiqurasiya', '14:27', 1
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm6-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm6', 'Loglama və monitorinq', '15:28', 2
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm6-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'm6', 'Deploy prosesi', '16:29', 3
where not exists (select 1 from lessons where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'm6-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'Başlanğıc layihə şablonu.zip', 2
where not exists (select 1 from materials where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'nodejs-ve-expressjs-ile-backend-arxitekturasi', 'API test kolleksiyası.json', 3
where not exists (select 1 from materials where course_id = 'nodejs-ve-expressjs-ile-backend-arxitekturasi' and id = 'mat3');

-- ======================================================================
-- sebeke-esaslari-ve-it-destek
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Orxan Babayev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Şəbəkə Administratoru'),
  summary             = coalesce(nullif(summary, ''), 'IT dəstək sahəsində işə başlamaq üçün lazım olan praktik bilik: şəbəkənin necə qurulduğu, problemin necə diaqnoz edildiyi və istifadəçiyə necə kömək edildiyi.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['IP ünvanlama və alt şəbəkələri başa düşmək', 'Şəbəkə avadanlıqlarının rolunu izah etmək', 'Əsas şəbəkə problemlərini addım-addım diaqnoz etmək', 'Əməliyyat sistemi səviyyəsində nasazlıqları aradan qaldırmaq', 'Dəstək müraciətlərini peşəkar idarə etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/sebeke-esaslari-ve-it-destek.jpg')
where id = 'sebeke-esaslari-ve-it-destek';

insert into modules (id, course_id, title, position)
select 'm1', 'sebeke-esaslari-ve-it-destek', 'Şəbəkənin Əsasları', 1
where not exists (select 1 from modules where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'sebeke-esaslari-ve-it-destek', 'm1', 'Şəbəkə növləri və topologiyalar', '10:43', 1
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'sebeke-esaslari-ve-it-destek', 'm1', 'OSI və TCP/IP modelləri', '11:44', 2
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'sebeke-esaslari-ve-it-destek', 'm1', 'IP ünvan və alt şəbəkə', '12:45', 3
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'sebeke-esaslari-ve-it-destek', 'Avadanlıq və Protokollar', 2
where not exists (select 1 from modules where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'sebeke-esaslari-ve-it-destek', 'm2', 'Router, switch və access point', '11:14', 1
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'sebeke-esaslari-ve-it-destek', 'm2', 'DNS, DHCP və NAT', '12:15', 2
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'sebeke-esaslari-ve-it-destek', 'm2', 'Wi-Fi konfiqurasiyası', '13:16', 3
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'sebeke-esaslari-ve-it-destek', 'Diaqnostika', 3
where not exists (select 1 from modules where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'sebeke-esaslari-ve-it-destek', 'm3', 'ping, tracert və nslookup', '12:45', 1
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'sebeke-esaslari-ve-it-destek', 'm3', 'Problemin təcrid edilməsi metodikası', '13:46', 2
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'sebeke-esaslari-ve-it-destek', 'm3', 'Ən çox rast gəlinən nasazlıqlar', '14:47', 3
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'sebeke-esaslari-ve-it-destek', 'İstifadəçi Dəstəyi', 4
where not exists (select 1 from modules where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'sebeke-esaslari-ve-it-destek', 'm4', 'Əməliyyat sistemi problemləri', '13:16', 1
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'sebeke-esaslari-ve-it-destek', 'm4', 'Printer və periferiya', '14:17', 2
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'sebeke-esaslari-ve-it-destek', 'm4', 'Dəstək bileti idarəetməsi', '15:18', 3
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'sebeke-esaslari-ve-it-destek', 'Təhlükəsizlik və Sənədləşmə', 5
where not exists (select 1 from modules where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'sebeke-esaslari-ve-it-destek', 'm5', 'Əsas təhlükəsizlik tədbirləri', '14:47', 1
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'sebeke-esaslari-ve-it-destek', 'm5', 'Ehtiyat nüsxələr', '15:48', 2
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'sebeke-esaslari-ve-it-destek', 'm5', 'Sənədləşdirmə vərdişləri', '16:49', 3
where not exists (select 1 from lessons where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'sebeke-esaslari-ve-it-destek', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'sebeke-esaslari-ve-it-destek', 'Diaqnostika yoxlama siyahısı.pdf', 2
where not exists (select 1 from materials where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'sebeke-esaslari-ve-it-destek', 'Şəbəkə sxemləri.pdf', 3
where not exists (select 1 from materials where course_id = 'sebeke-esaslari-ve-it-destek' and id = 'mat3');

-- ======================================================================
-- kibertehlukesizliye-giris
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Leyla Rəhimova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Kibertəhlükəsizlik Mütəxəssisi'),
  summary             = coalesce(nullif(summary, ''), 'Hücumların necə baş verdiyini anlayaraq müdafiəni öyrən. Kurs müdafiə yönümlüdür: risklərin qiymətləndirilməsi, sistemlərin möhkəmləndirilməsi və insidentə reaksiya.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Əsas təhdid növlərini və hücum vektorlarını tanımaq', 'Parol, şifrələmə və autentifikasiya prinsiplərini tətbiq etmək', 'Şəbəkə və sistem səviyyəsində müdafiə qurmaq', 'Sosial mühəndislik cəhdlərini aşkarlamaq', 'İnsidentə reaksiya planı hazırlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/kibertehlukesizliye-giris.jpg')
where id = 'kibertehlukesizliye-giris';

insert into modules (id, course_id, title, position)
select 'm1', 'kibertehlukesizliye-giris', 'Təhdid Mənzərəsi', 1
where not exists (select 1 from modules where course_id = 'kibertehlukesizliye-giris' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'kibertehlukesizliye-giris', 'm1', 'Kibertəhlükəsizlik nədir', '12:05', 1
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'kibertehlukesizliye-giris', 'm1', 'Hücum növləri və motivasiya', '13:06', 2
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'kibertehlukesizliye-giris', 'm1', 'Risklərin qiymətləndirilməsi', '14:07', 3
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'kibertehlukesizliye-giris', 'Kriptoqrafiyanın Əsasları', 2
where not exists (select 1 from modules where course_id = 'kibertehlukesizliye-giris' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'kibertehlukesizliye-giris', 'm2', 'Simmetrik və asimmetrik şifrələmə', '13:36', 1
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'kibertehlukesizliye-giris', 'm2', 'Heş funksiyaları', '14:37', 2
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'kibertehlukesizliye-giris', 'm2', 'Sertifikatlar və HTTPS', '15:38', 3
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'kibertehlukesizliye-giris', 'Sistemlərin Müdafiəsi', 3
where not exists (select 1 from modules where course_id = 'kibertehlukesizliye-giris' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'kibertehlukesizliye-giris', 'm3', 'Çoxfaktorlu autentifikasiya', '14:07', 1
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'kibertehlukesizliye-giris', 'm3', 'Təhlükəsiz konfiqurasiya', '15:08', 2
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'kibertehlukesizliye-giris', 'm3', 'Yeniləmə və zəiflik idarəsi', '16:09', 3
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'kibertehlukesizliye-giris', 'İnsan Amili', 4
where not exists (select 1 from modules where course_id = 'kibertehlukesizliye-giris' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'kibertehlukesizliye-giris', 'm4', 'Fişinq və sosial mühəndislik', '15:38', 1
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'kibertehlukesizliye-giris', 'm4', 'Təhlükəsiz iş vərdişləri', '16:39', 2
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'kibertehlukesizliye-giris', 'm4', 'Təhlükəsizlik mədəniyyəti', '7:40', 3
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'kibertehlukesizliye-giris', 'İnsidentə Reaksiya', 5
where not exists (select 1 from modules where course_id = 'kibertehlukesizliye-giris' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'kibertehlukesizliye-giris', 'm5', 'Aşkarlama və izolyasiya', '16:09', 1
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'kibertehlukesizliye-giris', 'm5', 'Bərpa prosesi', '7:10', 2
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'kibertehlukesizliye-giris', 'm5', 'İnsident hesabatı', '8:11', 3
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm5-l3');

insert into modules (id, course_id, title, position)
select 'm6', 'kibertehlukesizliye-giris', 'Praktik Tətbiq', 6
where not exists (select 1 from modules where course_id = 'kibertehlukesizliye-giris' and id = 'm6');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l1', 'kibertehlukesizliye-giris', 'm6', 'Sistemin möhkəmləndirilməsi', '7:40', 1
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm6-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l2', 'kibertehlukesizliye-giris', 'm6', 'Sadə audit aparmaq', '8:41', 2
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm6-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l3', 'kibertehlukesizliye-giris', 'm6', 'Təhlükəsizlik siyasətinin yazılması', '9:42', 3
where not exists (select 1 from lessons where course_id = 'kibertehlukesizliye-giris' and id = 'm6-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'kibertehlukesizliye-giris', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'kibertehlukesizliye-giris' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'kibertehlukesizliye-giris', 'Təhlükəsizlik yoxlama siyahısı.pdf', 2
where not exists (select 1 from materials where course_id = 'kibertehlukesizliye-giris' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'kibertehlukesizliye-giris', 'İnsident hesabat şablonu.docx', 3
where not exists (select 1 from materials where course_id = 'kibertehlukesizliye-giris' and id = 'mat3');

-- ======================================================================
-- bulud-texnologiyalari-aws-esaslari
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Fərid Məmmədli'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Bulud Həlləri Arxitektoru'),
  summary             = coalesce(nullif(summary, ''), 'Bulud texnologiyalarının məntiqini və AWS-in əsas xidmətlərini öyrən: server, yaddaş, şəbəkə və təhlükəsizlik — hər mövzu praktik ssenari ilə izah olunur.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Bulud modellərini (IaaS, PaaS, SaaS) fərqləndirmək', 'EC2 və S3 kimi əsas xidmətlərdən istifadə etmək', 'Bulud şəbəkəsi və təhlükəsizlik qruplarını konfiqurasiya etmək', 'İcazələri düzgün idarə etmək', 'Xərcləri planlamaq və optimallaşdırmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/bulud-texnologiyalari-aws-esaslari.jpg')
where id = 'bulud-texnologiyalari-aws-esaslari';

insert into modules (id, course_id, title, position)
select 'm1', 'bulud-texnologiyalari-aws-esaslari', 'Buluda Giriş', 1
where not exists (select 1 from modules where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'bulud-texnologiyalari-aws-esaslari', 'm1', 'Bulud nədir və nə üçün lazımdır', '16:09', 1
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'bulud-texnologiyalari-aws-esaslari', 'm1', 'Xidmət və yerləşdirmə modelləri', '7:10', 2
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'bulud-texnologiyalari-aws-esaslari', 'm1', 'Regionlar və əlçatanlıq zonaları', '8:11', 3
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'bulud-texnologiyalari-aws-esaslari', 'Hesablama və Yaddaş', 2
where not exists (select 1 from modules where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'bulud-texnologiyalari-aws-esaslari', 'm2', 'Virtual serverlər (EC2)', '7:40', 1
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'bulud-texnologiyalari-aws-esaslari', 'm2', 'Obyekt yaddaşı (S3)', '8:41', 2
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'bulud-texnologiyalari-aws-esaslari', 'm2', 'Verilənlər bazası xidmətləri', '9:42', 3
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'bulud-texnologiyalari-aws-esaslari', 'Şəbəkə və Təhlükəsizlik', 3
where not exists (select 1 from modules where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'bulud-texnologiyalari-aws-esaslari', 'm3', 'Virtual şəbəkə qurmaq', '8:11', 1
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'bulud-texnologiyalari-aws-esaslari', 'm3', 'Təhlükəsizlik qrupları', '9:12', 2
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'bulud-texnologiyalari-aws-esaslari', 'm3', 'İcazə idarəetməsi (IAM)', '10:13', 3
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'bulud-texnologiyalari-aws-esaslari', 'Etibarlılıq və Xərc', 4
where not exists (select 1 from modules where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'bulud-texnologiyalari-aws-esaslari', 'm4', 'Yedəkləmə və bərpa', '9:42', 1
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'bulud-texnologiyalari-aws-esaslari', 'm4', 'Miqyaslanma prinsipləri', '10:43', 2
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'bulud-texnologiyalari-aws-esaslari', 'm4', 'Xərclərin idarə olunması', '11:44', 3
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'bulud-texnologiyalari-aws-esaslari', 'Praktik Ssenari', 5
where not exists (select 1 from modules where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'bulud-texnologiyalari-aws-esaslari', 'm5', 'Sadə veb tətbiqin yerləşdirilməsi', '10:13', 1
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'bulud-texnologiyalari-aws-esaslari', 'm5', 'Monitorinqin qurulması', '11:14', 2
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'bulud-texnologiyalari-aws-esaslari', 'm5', 'Yekun icmal', '12:15', 3
where not exists (select 1 from lessons where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'bulud-texnologiyalari-aws-esaslari', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'bulud-texnologiyalari-aws-esaslari', 'Xidmətlər müqayisə cədvəli.pdf', 2
where not exists (select 1 from materials where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'bulud-texnologiyalari-aws-esaslari', 'Praktik tapşırıqlar.pdf', 3
where not exists (select 1 from materials where course_id = 'bulud-texnologiyalari-aws-esaslari' and id = 'mat3');

-- ======================================================================
-- ictimai-sehiyyeye-giris
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Dr. Səbinə Hüseynova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'İctimai Səhiyyə Mütəxəssisi'),
  summary             = coalesce(nullif(summary, ''), 'Səhiyyənin fərdi müalicədən kənar tərəfi: cəmiyyət səviyyəsində xəstəliklərin qarşısının alınması, epidemiologiyanın əsasları və sağlamlıq siyasətinin necə formalaşdığı.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['İctimai səhiyyənin əsas funksiyalarını izah etmək', 'Epidemiologiyanın təməl anlayışlarını mənimsəmək', 'Sağlamlıq göstəricilərini oxumaq və şərh etmək', 'Profilaktika səviyyələrini fərqləndirmək', 'Sağlamlıq maarifləndirmə kampaniyası planlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/ictimai-sehiyyeye-giris.jpg')
where id = 'ictimai-sehiyyeye-giris';

insert into modules (id, course_id, title, position)
select 'm1', 'ictimai-sehiyyeye-giris', 'İctimai Səhiyyə Nədir', 1
where not exists (select 1 from modules where course_id = 'ictimai-sehiyyeye-giris' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'ictimai-sehiyyeye-giris', 'm1', 'Tarixi inkişaf və əsas missiya', '9:22', 1
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'ictimai-sehiyyeye-giris', 'm1', 'Fərdi və ictimai yanaşma', '10:23', 2
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'ictimai-sehiyyeye-giris', 'm1', 'Səhiyyənin sosial təyinediciləri', '11:24', 3
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'ictimai-sehiyyeye-giris', 'Epidemiologiyanın Əsasları', 2
where not exists (select 1 from modules where course_id = 'ictimai-sehiyyeye-giris' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'ictimai-sehiyyeye-giris', 'm2', 'Xəstəliyin yayılma modelləri', '10:53', 1
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'ictimai-sehiyyeye-giris', 'm2', 'İnsidens və prevalens', '11:54', 2
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'ictimai-sehiyyeye-giris', 'm2', 'Tədqiqat növləri', '12:55', 3
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'ictimai-sehiyyeye-giris', 'Profilaktika', 3
where not exists (select 1 from modules where course_id = 'ictimai-sehiyyeye-giris' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'ictimai-sehiyyeye-giris', 'm3', 'İlkin, ikincili və üçüncülü profilaktika', '11:24', 1
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'ictimai-sehiyyeye-giris', 'm3', 'Peyvəndləmə proqramları', '12:25', 2
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'ictimai-sehiyyeye-giris', 'm3', 'Skrininq', '13:26', 3
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'ictimai-sehiyyeye-giris', 'Səhiyyə Siyasəti', 4
where not exists (select 1 from modules where course_id = 'ictimai-sehiyyeye-giris' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'ictimai-sehiyyeye-giris', 'm4', 'Səhiyyə sistemlərinin modelləri', '12:55', 1
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'ictimai-sehiyyeye-giris', 'm4', 'Resursların bölgüsü', '13:56', 2
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'ictimai-sehiyyeye-giris', 'm4', 'Etik məsələlər', '14:57', 3
where not exists (select 1 from lessons where course_id = 'ictimai-sehiyyeye-giris' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'ictimai-sehiyyeye-giris', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'ictimai-sehiyyeye-giris' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'ictimai-sehiyyeye-giris', 'Statistik göstəricilər bələdçisi.pdf', 2
where not exists (select 1 from materials where course_id = 'ictimai-sehiyyeye-giris' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'ictimai-sehiyyeye-giris', 'Nümunə hallar.pdf', 3
where not exists (select 1 from materials where course_id = 'ictimai-sehiyyeye-giris' and id = 'mat3');

-- ======================================================================
-- qidalanma-ve-saglam-heyat-terzi
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Aynur Qasımova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Klinik Dietoloq'),
  summary             = coalesce(nullif(summary, ''), 'Elmi əsaslı qidalanma bilikləri: makro və mikroelementlər, enerji balansı, etiket oxumaq və dəbdəki pəhrizlərin arxasındakı həqiqət.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Zülal, yağ və karbohidratların rolunu izah etmək', 'Gündəlik enerji tələbatını hesablamaq', 'Qida etiketlərini düzgün oxumaq', 'Balanslı həftəlik menyu qurmaq', 'Qidalanma haqqında yanlış məlumatı ayırd etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/qidalanma-ve-saglam-heyat-terzi.jpg')
where id = 'qidalanma-ve-saglam-heyat-terzi';

insert into modules (id, course_id, title, position)
select 'm1', 'qidalanma-ve-saglam-heyat-terzi', 'Qidalanmanın Əsasları', 1
where not exists (select 1 from modules where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'qidalanma-ve-saglam-heyat-terzi', 'm1', 'Makroelementlər', '10:33', 1
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'qidalanma-ve-saglam-heyat-terzi', 'm1', 'Vitamin və mineral', '11:34', 2
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'qidalanma-ve-saglam-heyat-terzi', 'm1', 'Su və hidratasiya', '12:35', 3
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'qidalanma-ve-saglam-heyat-terzi', 'Enerji Balansı', 2
where not exists (select 1 from modules where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'qidalanma-ve-saglam-heyat-terzi', 'm2', 'Kalori nədir', '11:04', 1
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'qidalanma-ve-saglam-heyat-terzi', 'm2', 'Metabolizm və aktivlik', '12:05', 2
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'qidalanma-ve-saglam-heyat-terzi', 'm2', 'Çəki idarəetməsinin prinsipləri', '13:06', 3
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'qidalanma-ve-saglam-heyat-terzi', 'Praktik Seçimlər', 3
where not exists (select 1 from modules where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'qidalanma-ve-saglam-heyat-terzi', 'm3', 'Qida etiketlərinin oxunması', '12:35', 1
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'qidalanma-ve-saglam-heyat-terzi', 'm3', 'Menyu planlaması', '13:36', 2
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'qidalanma-ve-saglam-heyat-terzi', 'm3', 'Kənar yeməklərdə seçim', '14:37', 3
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'qidalanma-ve-saglam-heyat-terzi', 'Mif və Həqiqət', 4
where not exists (select 1 from modules where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'qidalanma-ve-saglam-heyat-terzi', 'm4', 'Dəbdəki pəhrizlərin təhlili', '13:06', 1
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'qidalanma-ve-saglam-heyat-terzi', 'm4', 'Əlavələrə tənqidi baxış', '14:07', 2
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'qidalanma-ve-saglam-heyat-terzi', 'm4', 'Mənbənin etibarlılığını yoxlamaq', '15:08', 3
where not exists (select 1 from lessons where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'qidalanma-ve-saglam-heyat-terzi', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'qidalanma-ve-saglam-heyat-terzi', 'Həftəlik menyu şablonu.pdf', 2
where not exists (select 1 from materials where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'qidalanma-ve-saglam-heyat-terzi', 'Qida dəyəri cədvəli.pdf', 3
where not exists (select 1 from materials where course_id = 'qidalanma-ve-saglam-heyat-terzi' and id = 'mat3');


commit;
