import { supabase } from '@/lib/supabaseClient';

/* All read/write queries for MLUE Studio live here, separate from the
   public-facing lib/courses.js, so that file's contract (used by the real
   student-facing pages) stays untouched and easy to audit. */

/* Mirrors CATEGORIES in components/CoursesHome.js (ids + labels only —
   that file's icons are irrelevant here) so Studio's category picker and
   dashboard badges use the exact same taxonomy as the public catalog. */
export const CATEGORY_OPTIONS = [
  { id: 'data', label: 'Data Elmi' },
  { id: 'business', label: 'Biznes' },
  { id: 'cs', label: 'Kompüter Elmləri' },
  { id: 'it', label: 'İnformasiya Texnologiyaları' },
  { id: 'health', label: 'Səhiyyə' },
  { id: 'physics', label: 'Fizika Elmləri və Mühəndislik' },
  { id: 'social', label: 'Sosial Elmlər' },
  { id: 'language', label: 'Dil Öyrənmə' },
  { id: 'arts', label: 'İncəsənət və Humanitar Elmlər' },
  { id: 'personal', label: 'Şəxsi İnkişaf' },
  { id: 'math', label: 'Riyaziyyat və Məntiq' },
];

const TRANSLIT = {
  'ə': 'e', 'ı': 'i', 'ö': 'o', 'ğ': 'g', 'ş': 's', 'ç': 'c', 'ü': 'u',
  'Ə': 'e', 'I': 'i', 'İ': 'i', 'Ö': 'o', 'Ğ': 'g', 'Ş': 's', 'Ç': 'c', 'Ü': 'u',
};

export function slugify(title) {
  const transliterated = (title || '').split('').map((ch) => TRANSLIT[ch] || ch).join('');
  return transliterated
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'kurs';
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function maxNumericSuffix(ids, prefix) {
  let max = 0;
  const re = new RegExp(`^${escapeRegExp(prefix)}(\\d+)$`);
  (ids || []).forEach((id) => {
    const m = id.match(re);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return max;
}

export function createEmptyCourseState() {
  return {
    id: null,
    categoryId: 'data',
    title: '',
    level: 'Başlanğıc',
    duration: '',
    mentor: '',
    mentorTitle: '',
    summary: '',
    whatYouWillLearn: [],
    thumbnailUrl: null,
    status: 'draft',
    xpReward: 100,
    tokenReward: 0,
    createdBy: null,
    modules: [],
    materials: [],
    _deletedModuleIds: [],
    _deletedLessonIds: [],
    _deletedMaterialIds: [],
  };
}

/* Studio's own course-list read — RLS already scopes this to "all courses"
   for admins and "only created_by = me" for instructors, so no client-side
   role branching is needed here, only for labeling. */
export async function fetchStudioCourseList() {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, category_id, level, status, xp_reward, token_reward, created_by, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((c) => ({
    id: c.id,
    title: c.title,
    categoryId: c.category_id,
    level: c.level,
    status: c.status,
    xpReward: c.xp_reward,
    tokenReward: c.token_reward,
    createdBy: c.created_by,
    createdAt: c.created_at,
  }));
}

/* One batched query for enrollment counts across every visible course,
   tallied client-side — same batching idiom as lib/courses.js's
   getCoursesByIds, avoids an N+1 count-per-row query. */
export async function fetchEnrollmentCounts(courseIds) {
  const ids = Array.from(new Set((courseIds || []).filter(Boolean)));
  if (ids.length === 0) return {};
  const { data, error } = await supabase.from('user_courses').select('course_id').in('course_id', ids);
  if (error) throw error;
  const counts = {};
  (data || []).forEach((r) => { counts[r.course_id] = (counts[r.course_id] || 0) + 1; });
  return counts;
}

export async function fetchEnrollmentCount(courseId) {
  const { count, error } = await supabase
    .from('user_courses')
    .select('id', { count: 'exact', head: true })
    .eq('course_id', courseId);
  if (error) throw error;
  return count || 0;
}

/* Like lib/courses.js's getCourseById, but unfiltered by status (Studio must
   see drafts) and mapped to the CourseBuilder's local editing shape:
   camelCase, isNew:false on every persisted row, empty bookkeeping arrays. */
export async function fetchCourseForBuilder(courseId) {
  const { data: courseRow, error } = await supabase.from('courses').select('*').eq('id', courseId).maybeSingle();
  if (error) throw error;
  if (!courseRow) return null;

  const [{ data: moduleRows, error: modulesError }, { data: lessonRows, error: lessonsError }, { data: materialRows, error: materialsError }] =
    await Promise.all([
      supabase.from('modules').select('*').eq('course_id', courseId).order('position'),
      supabase.from('lessons').select('*').eq('course_id', courseId).order('position'),
      supabase.from('materials').select('*').eq('course_id', courseId).order('position'),
    ]);
  if (modulesError) throw modulesError;
  if (lessonsError) throw lessonsError;
  if (materialsError) throw materialsError;

  const lessonsByModule = new Map();
  (lessonRows || []).forEach((l) => {
    if (!lessonsByModule.has(l.module_id)) lessonsByModule.set(l.module_id, []);
    lessonsByModule.get(l.module_id).push({
      id: l.id, isNew: false, title: l.title, duration: l.duration || '', videoUrl: l.video_url || '',
      description: l.description || '', position: l.position,
    });
  });

  return {
    id: courseRow.id,
    categoryId: courseRow.category_id,
    title: courseRow.title,
    level: courseRow.level,
    duration: courseRow.duration,
    mentor: courseRow.mentor || '',
    mentorTitle: courseRow.mentor_title || '',
    summary: courseRow.summary || '',
    whatYouWillLearn: courseRow.what_you_will_learn || [],
    thumbnailUrl: courseRow.thumbnail_url,
    status: courseRow.status,
    xpReward: courseRow.xp_reward,
    tokenReward: courseRow.token_reward,
    createdBy: courseRow.created_by,
    modules: (moduleRows || []).map((m) => ({
      id: m.id, isNew: false, title: m.title, position: m.position,
      lessons: lessonsByModule.get(m.id) || [],
    })),
    materials: (materialRows || []).map((m) => ({
      id: m.id, isNew: false, name: m.name, fileUrl: m.file_url || null, position: m.position,
    })),
    _deletedModuleIds: [],
    _deletedLessonIds: [],
    _deletedMaterialIds: [],
  };
}

async function insertCourseWithUniqueId(currentState, userId) {
  const baseSlug = slugify(currentState.title);
  let candidate = baseSlug;
  let attempt = 0;
  while (attempt < 25) {
    const { data, error } = await supabase
      .from('courses')
      .insert({
        id: candidate,
        category_id: currentState.categoryId,
        title: currentState.title,
        level: currentState.level,
        duration: currentState.duration,
        mentor: currentState.mentor || null,
        mentor_title: currentState.mentorTitle || null,
        summary: currentState.summary || null,
        what_you_will_learn: currentState.whatYouWillLearn || [],
        thumbnail_url: currentState.thumbnailUrl || null,
        status: currentState.status || 'draft',
        xp_reward: currentState.xpReward ?? 100,
        token_reward: currentState.tokenReward ?? 0,
        created_by: userId,
      })
      .select()
      .single();
    if (!error) return data;
    if (error.code !== '23505') throw error;
    attempt += 1;
    candidate = `${baseSlug}-${attempt + 1}`;
  }
  throw new Error('Kurs üçün unikal ID tapılmadı, zəhmət olmasa başlığı dəyişib yenidən cəhd et.');
}

/* Diff-based batch save: courses row, then modules, then lessons, then
   materials, each insert/update/delete against the last-loaded snapshot.
   New rows get a crypto.randomUUID() client-side temp id (see CourseBuilder)
   which is replaced here with a real, course-scoped sequential id
   ('m3', 'm3-l2', 'mat4') derived from the highest existing numeric suffix
   already persisted for that course — never from array length, which breaks
   after a delete. On any error nothing already-committed is rolled back
   (no cross-table transaction exists client-side), but local state in the
   caller is left untouched so a retry safely re-diffs and self-heals. */
export async function saveCourse(initialSnapshot, currentState, userId) {
  let courseId = currentState.id;

  if (!courseId) {
    const inserted = await insertCourseWithUniqueId(currentState, userId);
    courseId = inserted.id;
  } else {
    const fieldMap = {
      categoryId: 'category_id', title: 'title', level: 'level', duration: 'duration',
      mentor: 'mentor', mentorTitle: 'mentor_title', summary: 'summary',
      thumbnailUrl: 'thumbnail_url', status: 'status', xpReward: 'xp_reward', tokenReward: 'token_reward',
    };
    const patch = {};
    Object.entries(fieldMap).forEach(([localKey, dbKey]) => {
      if (currentState[localKey] !== initialSnapshot[localKey]) patch[dbKey] = currentState[localKey];
    });
    if (JSON.stringify(currentState.whatYouWillLearn) !== JSON.stringify(initialSnapshot.whatYouWillLearn)) {
      patch.what_you_will_learn = currentState.whatYouWillLearn;
    }
    if (Object.keys(patch).length > 0) {
      const { error } = await supabase.from('courses').update(patch).eq('id', courseId);
      if (error) throw error;
    }
  }

  // Modules
  const existingModules = initialSnapshot.modules || [];
  const moduleIdMap = {};
  let moduleCounter = maxNumericSuffix(existingModules.map((m) => m.id), 'm');
  const moduleInserts = [];
  const moduleUpdates = [];

  currentState.modules.forEach((m) => {
    if (m.isNew) {
      moduleCounter += 1;
      const realId = `m${moduleCounter}`;
      moduleIdMap[m.id] = realId;
      moduleInserts.push({ id: realId, course_id: courseId, title: m.title, position: m.position });
    } else {
      moduleIdMap[m.id] = m.id;
      const before = existingModules.find((im) => im.id === m.id);
      if (!before || before.title !== m.title || before.position !== m.position) {
        moduleUpdates.push({ id: m.id, title: m.title, position: m.position });
      }
    }
  });

  if (moduleInserts.length) {
    const { error } = await supabase.from('modules').insert(moduleInserts);
    if (error) throw error;
  }
  await Promise.all(moduleUpdates.map((u) =>
    supabase.from('modules').update({ title: u.title, position: u.position }).eq('course_id', courseId).eq('id', u.id)
  ));
  if ((currentState._deletedModuleIds || []).length) {
    const { error } = await supabase.from('modules').delete().eq('course_id', courseId).in('id', currentState._deletedModuleIds);
    if (error) throw error;
  }

  // Lessons (scoped per module, using moduleIdMap to resolve newly-inserted module ids)
  const lessonInserts = [];
  const lessonUpdates = [];

  currentState.modules.forEach((m) => {
    const realModuleId = moduleIdMap[m.id];
    const beforeModule = existingModules.find((im) => im.id === m.id);
    const existingLessonIds = (beforeModule?.lessons || []).map((l) => l.id);
    let lessonCounter = maxNumericSuffix(existingLessonIds, `${m.id}-l`);

    m.lessons.forEach((l) => {
      if (l.isNew) {
        lessonCounter += 1;
        const realId = `${realModuleId}-l${lessonCounter}`;
        lessonInserts.push({
          id: realId, course_id: courseId, module_id: realModuleId,
          title: l.title, duration: l.duration || null, video_url: l.videoUrl || null,
          description: l.description || null, position: l.position,
        });
      } else {
        const before = beforeModule?.lessons?.find((il) => il.id === l.id);
        if (!before || before.title !== l.title || before.duration !== l.duration ||
            before.videoUrl !== l.videoUrl || before.description !== l.description || before.position !== l.position) {
          lessonUpdates.push({
            id: l.id, title: l.title, duration: l.duration || null, video_url: l.videoUrl || null,
            description: l.description || null, position: l.position,
          });
        }
      }
    });
  });

  if (lessonInserts.length) {
    const { error } = await supabase.from('lessons').insert(lessonInserts);
    if (error) throw error;
  }
  await Promise.all(lessonUpdates.map((u) =>
    supabase.from('lessons')
      .update({ title: u.title, duration: u.duration, video_url: u.video_url, description: u.description, position: u.position })
      .eq('course_id', courseId).eq('id', u.id)
  ));
  if ((currentState._deletedLessonIds || []).length) {
    const { error } = await supabase.from('lessons').delete().eq('course_id', courseId).in('id', currentState._deletedLessonIds);
    if (error) throw error;
  }

  // Materials
  const existingMaterials = initialSnapshot.materials || [];
  let materialCounter = maxNumericSuffix(existingMaterials.map((m) => m.id), 'mat');
  const materialInserts = [];
  const materialUpdates = [];

  currentState.materials.forEach((mm) => {
    if (mm.isNew) {
      materialCounter += 1;
      const realId = `mat${materialCounter}`;
      materialInserts.push({ id: realId, course_id: courseId, name: mm.name, file_url: mm.fileUrl || null, position: mm.position });
    } else {
      const before = existingMaterials.find((im) => im.id === mm.id);
      if (!before || before.name !== mm.name || before.fileUrl !== mm.fileUrl || before.position !== mm.position) {
        materialUpdates.push({ id: mm.id, name: mm.name, file_url: mm.fileUrl || null, position: mm.position });
      }
    }
  });

  if (materialInserts.length) {
    const { error } = await supabase.from('materials').insert(materialInserts);
    if (error) throw error;
  }
  await Promise.all(materialUpdates.map((u) =>
    supabase.from('materials').update({ name: u.name, file_url: u.file_url, position: u.position }).eq('course_id', courseId).eq('id', u.id)
  ));
  if ((currentState._deletedMaterialIds || []).length) {
    const { error } = await supabase.from('materials').delete().eq('course_id', courseId).in('id', currentState._deletedMaterialIds);
    if (error) throw error;
  }

  return fetchCourseForBuilder(courseId);
}

/* Cascades to modules/lessons/materials via their existing FKs. Callers must
   check fetchEnrollmentCount() first and get explicit confirmation — this
   function does no safety checks of its own. */
export async function deleteCourse(courseId) {
  const { error } = await supabase.from('courses').delete().eq('id', courseId);
  if (error) throw error;
}
