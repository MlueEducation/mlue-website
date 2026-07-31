import { supabase } from '@/lib/supabaseClient';

/* Async, DB-backed replacement for the old lib/courseCatalog.js. Shape-
   compatible with the previous synchronous getCourseById() (same field
   names: categoryId, mentorTitle, whatYouWillLearn, curriculum[].lessons[],
   materials[]) so components/course/CoursePlayerSidebar.js and VideoPlayer.js
   need no changes at all. */

export async function getCourseById(id) {
  const { data: courseRow, error } = await supabase.from('courses').select('*').eq('id', id).eq('status', 'live').maybeSingle();
  if (error) throw error;
  if (!courseRow) return null;

  const [{ data: moduleRows, error: modulesError }, { data: lessonRows, error: lessonsError }, { data: materialRows, error: materialsError }] =
    await Promise.all([
      supabase.from('modules').select('*').eq('course_id', id).order('position'),
      supabase.from('lessons').select('*').eq('course_id', id).order('position'),
      supabase.from('materials').select('*').eq('course_id', id).order('position'),
    ]);
  if (modulesError) throw modulesError;
  if (lessonsError) throw lessonsError;
  if (materialsError) throw materialsError;

  // Reads the narrow public_instructor_profiles mirror table (never
  // `profiles` directly — that table also holds staff_blocked/xp_points/etc.
  // which must never reach an anon/student client, whether via a plain
  // select or a Realtime payload). null for the legacy seed courses with no
  // created_by, or if the referenced instructor was demoted since publishing.
  let instructor = null;
  if (courseRow.created_by) {
    const { data: instructorRow, error: instructorError } = await supabase
      .from('public_instructor_profiles')
      .select('id, full_name, avatar_url, bio, specialty_title, linkedin_url, facebook_url, instagram_url')
      .eq('id', courseRow.created_by)
      .maybeSingle();
    if (instructorError) throw instructorError;
    if (instructorRow) {
      instructor = {
        id: instructorRow.id,
        fullName: instructorRow.full_name,
        avatarUrl: instructorRow.avatar_url,
        bio: instructorRow.bio,
        specialtyTitle: instructorRow.specialty_title,
        linkedinUrl: instructorRow.linkedin_url,
        facebookUrl: instructorRow.facebook_url,
        instagramUrl: instructorRow.instagram_url,
      };
    }
  }

  const lessonsByModule = new Map();
  (lessonRows || []).forEach((l) => {
    if (!lessonsByModule.has(l.module_id)) lessonsByModule.set(l.module_id, []);
    lessonsByModule.get(l.module_id).push({ id: l.id, title: l.title, duration: l.duration, videoUrl: l.video_url });
  });

  return {
    id: courseRow.id,
    instructor,
    categoryId: courseRow.category_id,
    title: courseRow.title,
    level: courseRow.level,
    duration: courseRow.duration,
    mentor: courseRow.mentor,
    mentorTitle: courseRow.mentor_title,
    summary: courseRow.summary,
    whatYouWillLearn: courseRow.what_you_will_learn || [],
    thumbnailUrl: courseRow.thumbnail_url || null,
    xpReward: courseRow.xp_reward ?? 100,
    tokenReward: courseRow.token_reward ?? 0,
    curriculum: (moduleRows || []).map((m) => ({
      id: m.id,
      title: m.title,
      lessons: lessonsByModule.get(m.id) || [],
    })),
    materials: (materialRows || []).map((m) => ({ id: m.id, name: m.name })),
  };
}

/* All courses (id/categoryId/title/level/duration only) for CoursesHome's
   catalog grid — no curriculum needed there. */
export async function getAllCourses() {
  const { data, error } = await supabase.from('courses').select('id, category_id, title, level, duration, thumbnail_url').eq('status', 'live');
  if (error) throw error;
  return (data || []).map((c) => ({
    id: c.id,
    categoryId: c.category_id,
    title: c.title,
    level: c.level,
    duration: c.duration,
    thumbnailUrl: c.thumbnail_url || null,
  }));
}

/* Atomic, server-enforced course completion — replaces 4 separate,
   unguarded client writes (mark completed, insert certificate, award XP,
   award tokens). The complete_course() RPC re-reads xp_reward/token_reward
   from the courses row itself (never trusts a client-supplied amount) and
   its UPDATE only succeeds once per (user, course) via a `completed_at is
   null` guard, so a double-click or two open tabs can't double-award. */
export async function completeCourse(courseId) {
  const { data, error } = await supabase.rpc('complete_course', { p_course_id: courseId });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

/* Batched title/level/duration lookup for MyCoursesPanel/MyNotesPanel,
   which otherwise would need one query per enrolled course / note group. */
export async function getCoursesByIds(ids) {
  const uniqueIds = Array.from(new Set((ids || []).filter(Boolean)));
  if (uniqueIds.length === 0) return new Map();
  const { data, error } = await supabase.from('courses').select('id, title, level, duration').in('id', uniqueIds);
  if (error) throw error;
  const map = new Map();
  (data || []).forEach((c) => map.set(c.id, c));
  return map;
}
