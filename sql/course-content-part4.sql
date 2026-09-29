-- MLUE kurs məzmunu — hissə 4/7
-- Təkrar işə salmaq təhlükəsizdir: heç nə silinmir, dolu sahə üzərinə yazılmır.

begin;

-- ======================================================================
-- psixologiyaya-giris
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Lamiyə Cəfərova'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Psixologiya Müəllimi'),
  summary             = coalesce(nullif(summary, ''), 'İnsan davranışının arxasındakı elmi izahlar: qavrayış, yaddaş, motivasiya, şəxsiyyət və sosial təsir — klassik tədqiqatlar üzərindən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Psixologiyanın əsas istiqamətlərini fərqləndirmək', 'Yaddaş və öyrənmə mexanizmlərini izah etmək', 'Motivasiya nəzəriyyələrini müqayisə etmək', 'Koqnitiv təhrifləri tanımaq', 'Psixoloji tədqiqatı tənqidi oxumaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/psixologiyaya-giris.jpg')
where id = 'psixologiyaya-giris';

insert into modules (id, course_id, title, position)
select 'm1', 'psixologiyaya-giris', 'Psixologiyaya Baxış', 1
where not exists (select 1 from modules where course_id = 'psixologiyaya-giris' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'psixologiyaya-giris', 'm1', 'Elm kimi psixologiya', '10:03', 1
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'psixologiyaya-giris', 'm1', 'Əsas məktəblər', '11:04', 2
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'psixologiyaya-giris', 'm1', 'Tədqiqat metodları', '12:05', 3
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'psixologiyaya-giris', 'Qavrayış və Yaddaş', 2
where not exists (select 1 from modules where course_id = 'psixologiyaya-giris' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'psixologiyaya-giris', 'm2', 'Hisslər və qavrayış', '11:34', 1
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'psixologiyaya-giris', 'm2', 'Yaddaşın modelləri', '12:35', 2
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'psixologiyaya-giris', 'm2', 'Unutma və xatırlama', '13:36', 3
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'psixologiyaya-giris', 'Öyrənmə və Motivasiya', 3
where not exists (select 1 from modules where course_id = 'psixologiyaya-giris' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'psixologiyaya-giris', 'm3', 'Şərtləndirmə', '12:05', 1
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'psixologiyaya-giris', 'm3', 'Motivasiya nəzəriyyələri', '13:06', 2
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'psixologiyaya-giris', 'm3', 'Emosiyalar', '14:07', 3
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'psixologiyaya-giris', 'Şəxsiyyət və Sosial Təsir', 4
where not exists (select 1 from modules where course_id = 'psixologiyaya-giris' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'psixologiyaya-giris', 'm4', 'Şəxsiyyət nəzəriyyələri', '13:36', 1
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'psixologiyaya-giris', 'm4', 'Qrup təzyiqi və itaət', '14:37', 2
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'psixologiyaya-giris', 'm4', 'Stereotiplər və qərəz', '15:38', 3
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'psixologiyaya-giris', 'Tətbiqi Psixologiya', 5
where not exists (select 1 from modules where course_id = 'psixologiyaya-giris' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'psixologiyaya-giris', 'm5', 'Gündəlik həyatda tətbiq', '14:07', 1
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'psixologiyaya-giris', 'm5', 'Koqnitiv təhriflər', '15:08', 2
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'psixologiyaya-giris', 'm5', 'Yekun icmal', '16:09', 3
where not exists (select 1 from lessons where course_id = 'psixologiyaya-giris' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'psixologiyaya-giris', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'psixologiyaya-giris' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'psixologiyaya-giris', 'Klassik tədqiqatlar xülasəsi.pdf', 2
where not exists (select 1 from materials where course_id = 'psixologiyaya-giris' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'psixologiyaya-giris', 'Məşq sualları.pdf', 3
where not exists (select 1 from materials where course_id = 'psixologiyaya-giris' and id = 'mat3');

-- ======================================================================
-- sosiologiya-cemiyyeti-anlamaq
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Kamil Bayramov'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Sosioloq'),
  summary             = coalesce(nullif(summary, ''), 'Cəmiyyətin necə qurulduğunu və dəyişdiyini sosioloji baxışla təhlil et: institutlar, təbəqələşmə, mədəniyyət və sosial dəyişiklik.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Sosioloji təxəyyülü tətbiq etmək', 'Əsas sosioloji nəzəriyyələri müqayisə etmək', 'Sosial təbəqələşməni təhlil etmək', 'Mədəniyyət və sosiallaşmanı izah etmək', 'Sadə sosioloji müşahidə aparmaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/sosiologiya-cemiyyeti-anlamaq.jpg')
where id = 'sosiologiya-cemiyyeti-anlamaq';

insert into modules (id, course_id, title, position)
select 'm1', 'sosiologiya-cemiyyeti-anlamaq', 'Sosioloji Baxış', 1
where not exists (select 1 from modules where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'sosiologiya-cemiyyeti-anlamaq', 'm1', 'Sosiologiya nədir', '10:43', 1
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'sosiologiya-cemiyyeti-anlamaq', 'm1', 'Sosioloji təxəyyül', '11:44', 2
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'sosiologiya-cemiyyeti-anlamaq', 'm1', 'Tədqiqat metodları', '12:45', 3
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'sosiologiya-cemiyyeti-anlamaq', 'Mədəniyyət və Sosiallaşma', 2
where not exists (select 1 from modules where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'sosiologiya-cemiyyeti-anlamaq', 'm2', 'Mədəniyyətin elementləri', '11:14', 1
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'sosiologiya-cemiyyeti-anlamaq', 'm2', 'Sosiallaşma prosesi', '12:15', 2
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'sosiologiya-cemiyyeti-anlamaq', 'm2', 'Normalar və dəyərlər', '13:16', 3
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'sosiologiya-cemiyyeti-anlamaq', 'Struktur və Təbəqələşmə', 3
where not exists (select 1 from modules where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'sosiologiya-cemiyyeti-anlamaq', 'm3', 'Sosial institutlar', '12:45', 1
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'sosiologiya-cemiyyeti-anlamaq', 'm3', 'Sinif və bərabərsizlik', '13:46', 2
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'sosiologiya-cemiyyeti-anlamaq', 'm3', 'Sosial mobillik', '14:47', 3
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'sosiologiya-cemiyyeti-anlamaq', 'Dəyişiklik', 4
where not exists (select 1 from modules where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'sosiologiya-cemiyyeti-anlamaq', 'm4', 'Urbanizasiya və miqrasiya', '13:16', 1
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'sosiologiya-cemiyyeti-anlamaq', 'm4', 'Texnologiya və cəmiyyət', '14:17', 2
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'sosiologiya-cemiyyeti-anlamaq', 'm4', 'Sosial hərəkatlar', '15:18', 3
where not exists (select 1 from lessons where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'sosiologiya-cemiyyeti-anlamaq', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'sosiologiya-cemiyyeti-anlamaq', 'Mətn seçmələri.pdf', 2
where not exists (select 1 from materials where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'sosiologiya-cemiyyeti-anlamaq', 'Müşahidə tapşırığı.pdf', 3
where not exists (select 1 from materials where course_id = 'sosiologiya-cemiyyeti-anlamaq' and id = 'mat3');

-- ======================================================================
-- beynelxalq-munasibetlere-giris
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Nihad Rzayev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Beynəlxalq Münasibətlər üzrə Tədqiqatçı'),
  summary             = coalesce(nullif(summary, ''), 'Dövlətlərin bir-biri ilə niyə belə davrandığını anla: əsas nəzəriyyələr, beynəlxalq təşkilatlar, diplomatiya və qlobal problemlər.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Realizm, liberalizm və konstruktivizmi fərqləndirmək', 'Beynəlxalq təşkilatların rolunu izah etmək', 'Diplomatiya və danışıqların məntiqini anlamaq', 'Qlobal münaqişələri çərçivəyə salmaq', 'Xəbərləri analitik oxumaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/beynelxalq-munasibetlere-giris.jpg')
where id = 'beynelxalq-munasibetlere-giris';

insert into modules (id, course_id, title, position)
select 'm1', 'beynelxalq-munasibetlere-giris', 'Əsas Anlayışlar', 1
where not exists (select 1 from modules where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'beynelxalq-munasibetlere-giris', 'm1', 'Dövlət, suverenlik və güc', '14:37', 1
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'beynelxalq-munasibetlere-giris', 'm1', 'Beynəlxalq sistem', '15:38', 2
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'beynelxalq-munasibetlere-giris', 'm1', 'Tarixi arxa plan', '16:39', 3
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'beynelxalq-munasibetlere-giris', 'Nəzəriyyələr', 2
where not exists (select 1 from modules where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'beynelxalq-munasibetlere-giris', 'm2', 'Realizm', '15:08', 1
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'beynelxalq-munasibetlere-giris', 'm2', 'Liberalizm', '16:09', 2
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'beynelxalq-munasibetlere-giris', 'm2', 'Konstruktivizm', '7:10', 3
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'beynelxalq-munasibetlere-giris', 'Aktorlar və İnstitutlar', 3
where not exists (select 1 from modules where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'beynelxalq-munasibetlere-giris', 'm3', 'BMT və regional təşkilatlar', '16:39', 1
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'beynelxalq-munasibetlere-giris', 'm3', 'Qeyri-dövlət aktorları', '7:40', 2
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'beynelxalq-munasibetlere-giris', 'm3', 'Beynəlxalq hüquq', '8:41', 3
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'beynelxalq-munasibetlere-giris', 'Təhlükəsizlik və İqtisadiyyat', 4
where not exists (select 1 from modules where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'beynelxalq-munasibetlere-giris', 'm4', 'Münaqişə və sülh', '7:10', 1
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'beynelxalq-munasibetlere-giris', 'm4', 'Beynəlxalq ticarət', '8:11', 2
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'beynelxalq-munasibetlere-giris', 'm4', 'Enerji və resurslar', '9:12', 3
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'beynelxalq-munasibetlere-giris', 'Qlobal Problemlər', 5
where not exists (select 1 from modules where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'beynelxalq-munasibetlere-giris', 'm5', 'İqlim diplomatiyası', '8:41', 1
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'beynelxalq-munasibetlere-giris', 'm5', 'Miqrasiya', '9:42', 2
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'beynelxalq-munasibetlere-giris', 'm5', 'Yekun təhlil', '10:43', 3
where not exists (select 1 from lessons where course_id = 'beynelxalq-munasibetlere-giris' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'beynelxalq-munasibetlere-giris', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'beynelxalq-munasibetlere-giris' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'beynelxalq-munasibetlere-giris', 'Xəritə və sxemlər.pdf', 2
where not exists (select 1 from materials where course_id = 'beynelxalq-munasibetlere-giris' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'beynelxalq-munasibetlere-giris', 'Nümunə hallar.pdf', 3
where not exists (select 1 from materials where course_id = 'beynelxalq-munasibetlere-giris' and id = 'mat3');

-- ======================================================================
-- davranis-iqtisadiyyati
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Ülviyyə Əliyeva'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'İqtisadçı'),
  summary             = coalesce(nullif(summary, ''), 'İnsanlar niyə həmişə "rasional" qərar vermir? Davranış iqtisadiyyatı klassik nəzəriyyənin boşluqlarını psixologiya ilə doldurur — real eksperimentlər üzərindən.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Rasional aktor modelinin məhdudiyyətlərini izah etmək', 'Əsas koqnitiv qərəzləri tanımaq', 'Perspektiv nəzəriyyəsini başa düşmək', '"Nudge" yanaşmasını tətbiq etmək', 'Qərar mühitini yenidən dizayn etmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/davranis-iqtisadiyyati.jpg')
where id = 'davranis-iqtisadiyyati';

insert into modules (id, course_id, title, position)
select 'm1', 'davranis-iqtisadiyyati', 'Klassikadan Davranışa', 1
where not exists (select 1 from modules where course_id = 'davranis-iqtisadiyyati' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'davranis-iqtisadiyyati', 'm1', 'Homo economicus fərziyyəsi', '14:17', 1
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'davranis-iqtisadiyyati', 'm1', 'Məhdud rasionallıq', '15:18', 2
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'davranis-iqtisadiyyati', 'm1', 'Eksperimental iqtisadiyyat', '16:19', 3
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'davranis-iqtisadiyyati', 'Qərəzlər', 2
where not exists (select 1 from modules where course_id = 'davranis-iqtisadiyyati' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'davranis-iqtisadiyyati', 'm2', 'Lövbər effekti və çərçivələmə', '15:48', 1
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'davranis-iqtisadiyyati', 'm2', 'Mövcudluq və təsdiq qərəzi', '16:49', 2
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'davranis-iqtisadiyyati', 'm2', 'Status-kvo meyli', '7:50', 3
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'davranis-iqtisadiyyati', 'Risk və Zaman', 3
where not exists (select 1 from modules where course_id = 'davranis-iqtisadiyyati' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'davranis-iqtisadiyyati', 'm3', 'Perspektiv nəzəriyyəsi', '16:19', 1
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'davranis-iqtisadiyyati', 'm3', 'İtki qorxusu', '7:20', 2
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'davranis-iqtisadiyyati', 'm3', 'Vaxta görə diskontlaşdırma', '8:21', 3
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'davranis-iqtisadiyyati', 'Tətbiq', 4
where not exists (select 1 from modules where course_id = 'davranis-iqtisadiyyati' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'davranis-iqtisadiyyati', 'm4', 'Nudge və seçim memarlığı', '7:50', 1
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'davranis-iqtisadiyyati', 'm4', 'Siyasətdə tətbiqlər', '8:51', 2
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'davranis-iqtisadiyyati', 'm4', 'Etik məhdudiyyətlər', '9:52', 3
where not exists (select 1 from lessons where course_id = 'davranis-iqtisadiyyati' and id = 'm4-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'davranis-iqtisadiyyati', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'davranis-iqtisadiyyati' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'davranis-iqtisadiyyati', 'Eksperiment xülasələri.pdf', 2
where not exists (select 1 from materials where course_id = 'davranis-iqtisadiyyati' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'davranis-iqtisadiyyati', 'Məşq ssenariləri.pdf', 3
where not exists (select 1 from materials where course_id = 'davranis-iqtisadiyyati' and id = 'mat3');

-- ======================================================================
-- sahibkarliq-esaslari-fikirden-mehsula
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Orxan Kərimli'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Startap Məsləhətçisi'),
  summary             = coalesce(nullif(summary, ''), 'Bir fikri işləyən biznesə çevirməyin yolu: problemi doğrulamaq, minimal məhsul qurmaq, müştəri tapmaq və maliyyəni planlamaq.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Biznes fikrini müştəri ilə doğrulamaq', 'Dəyər təklifini aydın formalaşdırmaq', 'Minimal işlək məhsul (MVP) planlamaq', 'Sadə maliyyə modeli qurmaq', 'İnvestora təqdimat hazırlamaq']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/sahibkarliq-esaslari-fikirden-mehsula.jpg')
where id = 'sahibkarliq-esaslari-fikirden-mehsula';

insert into modules (id, course_id, title, position)
select 'm1', 'sahibkarliq-esaslari-fikirden-mehsula', 'Fikirdən Problemə', 1
where not exists (select 1 from modules where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'sahibkarliq-esaslari-fikirden-mehsula', 'm1', 'Problemin müəyyən edilməsi', '16:29', 1
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'sahibkarliq-esaslari-fikirden-mehsula', 'm1', 'Müştəri müsahibələri', '7:30', 2
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'sahibkarliq-esaslari-fikirden-mehsula', 'm1', 'Bazar araşdırması', '8:31', 3
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'sahibkarliq-esaslari-fikirden-mehsula', 'Dəyər Təklifi', 2
where not exists (select 1 from modules where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'sahibkarliq-esaslari-fikirden-mehsula', 'm2', 'Hədəf seqmentin seçilməsi', '7:00', 1
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'sahibkarliq-esaslari-fikirden-mehsula', 'm2', 'Dəyər təklifi kətanı', '8:01', 2
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'sahibkarliq-esaslari-fikirden-mehsula', 'm2', 'Rəqabət təhlili', '9:02', 3
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'sahibkarliq-esaslari-fikirden-mehsula', 'Məhsulun Qurulması', 3
where not exists (select 1 from modules where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'sahibkarliq-esaslari-fikirden-mehsula', 'm3', 'MVP anlayışı', '8:31', 1
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'sahibkarliq-esaslari-fikirden-mehsula', 'm3', 'Sınaq və geri bildirim', '9:32', 2
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'sahibkarliq-esaslari-fikirden-mehsula', 'm3', 'Təkrarlanan inkişaf', '10:33', 3
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'sahibkarliq-esaslari-fikirden-mehsula', 'Biznes Modeli', 4
where not exists (select 1 from modules where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'sahibkarliq-esaslari-fikirden-mehsula', 'm4', 'Gəlir modelləri', '9:02', 1
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'sahibkarliq-esaslari-fikirden-mehsula', 'm4', 'Xərc strukturu', '10:03', 2
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'sahibkarliq-esaslari-fikirden-mehsula', 'm4', 'Biznes modeli kətanı', '11:04', 3
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'sahibkarliq-esaslari-fikirden-mehsula', 'Maliyyə', 5
where not exists (select 1 from modules where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'sahibkarliq-esaslari-fikirden-mehsula', 'm5', 'Sadə maliyyə proqnozu', '10:33', 1
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'sahibkarliq-esaslari-fikirden-mehsula', 'm5', 'Zərərsizlik nöqtəsi', '11:34', 2
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'sahibkarliq-esaslari-fikirden-mehsula', 'm5', 'Maliyyələşmə mənbələri', '12:35', 3
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm5-l3');

insert into modules (id, course_id, title, position)
select 'm6', 'sahibkarliq-esaslari-fikirden-mehsula', 'Təqdimat', 6
where not exists (select 1 from modules where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm6');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l1', 'sahibkarliq-esaslari-fikirden-mehsula', 'm6', 'Pitch strukturu', '11:04', 1
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm6-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l2', 'sahibkarliq-esaslari-fikirden-mehsula', 'm6', 'Slaydların hazırlanması', '12:05', 2
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm6-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm6-l3', 'sahibkarliq-esaslari-fikirden-mehsula', 'm6', 'Suallara hazırlıq', '13:06', 3
where not exists (select 1 from lessons where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'm6-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'sahibkarliq-esaslari-fikirden-mehsula', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'sahibkarliq-esaslari-fikirden-mehsula', 'Biznes modeli kətanı.pdf', 2
where not exists (select 1 from materials where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'sahibkarliq-esaslari-fikirden-mehsula', 'Pitch şablonu.pptx', 3
where not exists (select 1 from materials where course_id = 'sahibkarliq-esaslari-fikirden-mehsula' and id = 'mat3');

-- ======================================================================
-- maliyye-analizi-ve-budcelme
-- ======================================================================
update courses set
  mentor              = coalesce(nullif(mentor, ''), 'Samir Hacıyev'),
  mentor_title        = coalesce(nullif(mentor_title, ''), 'Maliyyə Analitiki'),
  summary             = coalesce(nullif(summary, ''), 'Maliyyə hesabatlarını oxumağı, şirkətin sağlamlığını qiymətləndirməyi və işlək büdcə qurmağı öyrən — hamısı Excel üzərində praktik nümunələrlə.'),
  what_you_will_learn = case
                          when what_you_will_learn is null or cardinality(what_you_will_learn) = 0
                          then ARRAY['Balans, mənfəət-zərər və pul axını hesabatlarını oxumaq', 'Əsas maliyyə əmsallarını hesablamaq və şərh etmək', 'Büdcə hazırlamaq və plan-fakt təhlili aparmaq', 'Pul axını proqnozu qurmaq', 'İnvestisiya qərarını qiymətləndirmək']::text[]
                          else what_you_will_learn
                        end,
  thumbnail_url       = coalesce(nullif(thumbnail_url, ''), '/course-covers/maliyye-analizi-ve-budcelme.jpg')
where id = 'maliyye-analizi-ve-budcelme';

insert into modules (id, course_id, title, position)
select 'm1', 'maliyye-analizi-ve-budcelme', 'Maliyyə Hesabatları', 1
where not exists (select 1 from modules where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l1', 'maliyye-analizi-ve-budcelme', 'm1', 'Balans hesabatı', '8:21', 1
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm1-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l2', 'maliyye-analizi-ve-budcelme', 'm1', 'Mənfəət və zərər hesabatı', '9:22', 2
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm1-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm1-l3', 'maliyye-analizi-ve-budcelme', 'm1', 'Pul vəsaitlərinin hərəkəti', '10:23', 3
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm1-l3');

insert into modules (id, course_id, title, position)
select 'm2', 'maliyye-analizi-ve-budcelme', 'Əmsal Təhlili', 2
where not exists (select 1 from modules where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l1', 'maliyye-analizi-ve-budcelme', 'm2', 'Likvidlik əmsalları', '9:52', 1
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm2-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l2', 'maliyye-analizi-ve-budcelme', 'm2', 'Rentabellik əmsalları', '10:53', 2
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm2-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm2-l3', 'maliyye-analizi-ve-budcelme', 'm2', 'Borc və dayanıqlıq', '11:54', 3
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm2-l3');

insert into modules (id, course_id, title, position)
select 'm3', 'maliyye-analizi-ve-budcelme', 'Büdcələmə', 3
where not exists (select 1 from modules where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm3');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l1', 'maliyye-analizi-ve-budcelme', 'm3', 'Büdcə növləri', '10:23', 1
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm3-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l2', 'maliyye-analizi-ve-budcelme', 'm3', 'Büdcənin qurulması', '11:24', 2
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm3-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm3-l3', 'maliyye-analizi-ve-budcelme', 'm3', 'Plan-fakt təhlili', '12:25', 3
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm3-l3');

insert into modules (id, course_id, title, position)
select 'm4', 'maliyye-analizi-ve-budcelme', 'Proqnozlaşdırma', 4
where not exists (select 1 from modules where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm4');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l1', 'maliyye-analizi-ve-budcelme', 'm4', 'Gəlir proqnozu', '11:54', 1
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm4-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l2', 'maliyye-analizi-ve-budcelme', 'm4', 'Pul axını proqnozu', '12:55', 2
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm4-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm4-l3', 'maliyye-analizi-ve-budcelme', 'm4', 'Ssenari təhlili', '13:56', 3
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm4-l3');

insert into modules (id, course_id, title, position)
select 'm5', 'maliyye-analizi-ve-budcelme', 'İnvestisiya Qərarları', 5
where not exists (select 1 from modules where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm5');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l1', 'maliyye-analizi-ve-budcelme', 'm5', 'Pulun zaman dəyəri', '12:25', 1
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm5-l1');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l2', 'maliyye-analizi-ve-budcelme', 'm5', 'NPV və IRR', '13:26', 2
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm5-l2');
insert into lessons (id, course_id, module_id, title, duration, position)
select 'm5-l3', 'maliyye-analizi-ve-budcelme', 'm5', 'Qərar nümunəsi', '14:27', 3
where not exists (select 1 from lessons where course_id = 'maliyye-analizi-ve-budcelme' and id = 'm5-l3');

insert into materials (id, course_id, name, position)
select 'mat1', 'maliyye-analizi-ve-budcelme', 'Kurs slaydları.pdf', 1
where not exists (select 1 from materials where course_id = 'maliyye-analizi-ve-budcelme' and id = 'mat1');
insert into materials (id, course_id, name, position)
select 'mat2', 'maliyye-analizi-ve-budcelme', 'Büdcə şablonu.xlsx', 2
where not exists (select 1 from materials where course_id = 'maliyye-analizi-ve-budcelme' and id = 'mat2');
insert into materials (id, course_id, name, position)
select 'mat3', 'maliyye-analizi-ve-budcelme', 'Nümunə hesabatlar.xlsx', 3
where not exists (select 1 from materials where course_id = 'maliyye-analizi-ve-budcelme' and id = 'mat3');


commit;
