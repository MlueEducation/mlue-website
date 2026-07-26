'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, Trash2 } from 'lucide-react';
import { PageHeader, Panel, PanelSection } from '@/components/ProfileUI';
import { useStudio } from '@/components/studio/StudioContext';
import {
  createEmptyCourseState, fetchCourseForBuilder, saveCourse,
  fetchEnrollmentCount, deleteCourse,
} from '@/lib/studioCourses';
import CourseMetaPanel from './builder/CourseMetaPanel';
import CurriculumPanel from './builder/CurriculumPanel';
import LessonEditorPanel from './builder/LessonEditorPanel';
import EconomyPanel from './builder/EconomyPanel';
import MaterialsPanel from './builder/MaterialsPanel';
import PublishToggle from './builder/PublishToggle';
import PreviewModal from './PreviewModal';

export default function CourseBuilder({ courseId }) {
  const router = useRouter();
  const { user } = useStudio();

  const [loading, setLoading] = useState(!!courseId);
  const [notFound, setNotFound] = useState(false);
  const [initialSnapshot, setInitialSnapshot] = useState(courseId ? null : createEmptyCourseState());
  const [course, setCourse] = useState(courseId ? null : createEmptyCourseState());
  const [editingLesson, setEditingLesson] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    if (!courseId) return;
    let cancelled = false;
    setLoading(true);
    fetchCourseForBuilder(courseId)
      .then((data) => {
        if (cancelled) return;
        if (!data) { setNotFound(true); setLoading(false); return; }
        setInitialSnapshot(data);
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Course fetch failed:', err);
        if (!cancelled) { setNotFound(true); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;
    fetchEnrollmentCount(courseId).then(setEnrollmentCount).catch(() => {});
  }, [courseId]);

  function patchCourse(patch) {
    setCourse((c) => ({ ...c, ...patch }));
  }

  function addModule() {
    setCourse((c) => ({
      ...c,
      modules: [...c.modules, { id: crypto.randomUUID(), isNew: true, title: 'Yeni Modul', position: c.modules.length, lessons: [] }],
    }));
  }

  function updateModuleTitle(moduleId, title) {
    setCourse((c) => ({ ...c, modules: c.modules.map((m) => (m.id === moduleId ? { ...m, title } : m)) }));
  }

  function deleteModule(moduleId) {
    setCourse((c) => {
      const target = c.modules.find((m) => m.id === moduleId);
      const deleted = target && !target.isNew ? [...c._deletedModuleIds, moduleId] : c._deletedModuleIds;
      return { ...c, modules: c.modules.filter((m) => m.id !== moduleId), _deletedModuleIds: deleted };
    });
  }

  function reorderModules(newModules) {
    setCourse((c) => ({ ...c, modules: newModules }));
  }

  function addLesson(moduleId) {
    setCourse((c) => ({
      ...c,
      modules: c.modules.map((m) => (m.id !== moduleId ? m : {
        ...m,
        lessons: [...m.lessons, { id: crypto.randomUUID(), isNew: true, title: 'Yeni Dərs', duration: '', videoUrl: '', description: '', position: m.lessons.length }],
      })),
    }));
  }

  function updateLesson(moduleId, lessonId, patch) {
    setCourse((c) => ({
      ...c,
      modules: c.modules.map((m) => (m.id !== moduleId ? m : {
        ...m,
        lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)),
      })),
    }));
  }

  function deleteLesson(moduleId, lessonId) {
    setCourse((c) => {
      const mod = c.modules.find((m) => m.id === moduleId);
      const target = mod?.lessons.find((l) => l.id === lessonId);
      const deleted = target && !target.isNew ? [...c._deletedLessonIds, lessonId] : c._deletedLessonIds;
      return {
        ...c,
        modules: c.modules.map((m) => (m.id !== moduleId ? m : { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) })),
        _deletedLessonIds: deleted,
      };
    });
    setEditingLesson((cur) => (cur?.moduleId === moduleId && cur?.lessonId === lessonId ? null : cur));
  }

  function reorderLessons(moduleId, newLessons) {
    setCourse((c) => ({ ...c, modules: c.modules.map((m) => (m.id === moduleId ? { ...m, lessons: newLessons } : m)) }));
  }

  function addMaterial() {
    setCourse((c) => ({
      ...c,
      materials: [...c.materials, { id: crypto.randomUUID(), isNew: true, name: '', fileUrl: null, position: c.materials.length }],
    }));
  }

  function updateMaterial(materialId, patch) {
    setCourse((c) => ({ ...c, materials: c.materials.map((m) => (m.id === materialId ? { ...m, ...patch } : m)) }));
  }

  function deleteMaterial(materialId) {
    setCourse((c) => {
      const target = c.materials.find((m) => m.id === materialId);
      const deleted = target && !target.isNew ? [...c._deletedMaterialIds, materialId] : c._deletedMaterialIds;
      return { ...c, materials: c.materials.filter((m) => m.id !== materialId), _deletedMaterialIds: deleted };
    });
  }

  function reorderMaterials(newMaterials) {
    setCourse((c) => ({ ...c, materials: newMaterials }));
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    setSaveMessage(null);
    try {
      const saved = await saveCourse(initialSnapshot, course, user.id);
      setInitialSnapshot(saved);
      setCourse(saved);
      setSaveMessage('Kurs uğurla yadda saxlanıldı.');
      if (!courseId) router.replace(`/studio/courses/${saved.id}`);
    } catch (err) {
      console.error('Course save failed:', err);
      setSaveError('Yadda saxlanılmadı: ' + (err.message || 'naməlum xəta'));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!course.id || deleteConfirm.trim() !== 'SİL') return;
    setDeleting(true);
    try {
      await deleteCourse(course.id);
      router.push('/studio');
    } catch (err) {
      console.error('Course delete failed:', err);
      alert('Silinmə uğursuz oldu: ' + err.message);
      setDeleting(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--text-secondary)]">Yüklənir...</p>;
  }
  if (notFound) {
    return <p className="text-sm text-[var(--danger)]">Kurs tapılmadı.</p>;
  }

  const editingLessonObj = editingLesson
    ? course.modules.find((m) => m.id === editingLesson.moduleId)?.lessons.find((l) => l.id === editingLesson.lessonId)
    : null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <PageHeader sub={courseId ? 'Kurs məzmununu redaktə et' : 'Yeni kurs yarat'}>
          {courseId ? course.title || 'Adsız kurs' : 'Yeni Kurs'}
        </PageHeader>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-2 bg-[var(--bg-surface-2)] hover:bg-[var(--border)] text-[var(--text-primary)] font-bold px-4 py-2.5 rounded-2xl transition-colors"
          >
            <Eye className="w-4 h-4" /> Tələbə Gözü ilə
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold px-6 py-2.5 rounded-2xl transition-colors"
          >
            {saving ? 'Saxlanılır...' : 'Yadda saxla'}
          </button>
        </div>
      </div>

      {saveError && <p className="text-sm text-[var(--danger)] mb-4">{saveError}</p>}
      {saveMessage && !saveError && <p className="text-sm text-[var(--success)] mb-4">{saveMessage}</p>}

      <div className="space-y-5">
        <Panel>
          <PanelSection first title="Ümumi məlumat">
            <CourseMetaPanel course={course} onChange={patchCourse} courseId={course.id} />
          </PanelSection>
        </Panel>

        <Panel>
          <PanelSection first title="Mündəricat" desc="Modullar və dərslər — sürüşdürərək sırala">
            <CurriculumPanel
              modules={course.modules}
              onAddModule={addModule}
              onUpdateModuleTitle={updateModuleTitle}
              onDeleteModule={deleteModule}
              onReorderModules={reorderModules}
              onAddLesson={addLesson}
              onEditLesson={(moduleId, lessonId) => setEditingLesson({ moduleId, lessonId })}
              onDeleteLesson={deleteLesson}
              onReorderLessons={reorderLessons}
            />
          </PanelSection>
        </Panel>

        <Panel>
          <PanelSection first title="Gamification və İqtisadiyyat" desc="Kursu bitirən tələbəyə verilən mükafatlar">
            <EconomyPanel course={course} onChange={patchCourse} />
          </PanelSection>
        </Panel>

        <Panel>
          <PanelSection first title="Resurslar" desc="Dərs materialları — PDF, kod, xarici keçidlər">
            <MaterialsPanel
              materials={course.materials}
              courseId={course.id}
              onAdd={addMaterial}
              onUpdate={updateMaterial}
              onDelete={deleteMaterial}
              onReorder={reorderMaterials}
            />
          </PanelSection>
        </Panel>

        <Panel>
          <PanelSection first title="Nəşr">
            <PublishToggle course={course} onChange={patchCourse} />
          </PanelSection>
        </Panel>

        {course.id && (
          <Panel className="border-[var(--danger-30)] bg-[var(--danger-10)]">
            <PanelSection first title="Təhlükəli zona" desc="Kursu silmək geri qaytarıla bilməz">
              {enrollmentCount > 0 ? (
                <p className="text-sm text-[var(--text-secondary)]">
                  Bu kursda {enrollmentCount} tələbə qeydiyyatdan keçib — silmək üçün əvvəlcə kursu qaralamaya keçir.
                </p>
              ) : (
                <div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">Silmək üçün aşağıya <b>SİL</b> yaz.</p>
                  <div className="flex items-center gap-3">
                    <input
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      placeholder="SİL"
                      className="w-32 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--danger)]"
                    />
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleteConfirm.trim() !== 'SİL' || deleting}
                      className="flex items-center gap-2 bg-[var(--danger)] hover:opacity-90 disabled:opacity-40 text-white font-bold px-4 py-2 rounded-xl transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" /> {deleting ? 'Silinir...' : 'Kursu sil'}
                    </button>
                  </div>
                </div>
              )}
            </PanelSection>
          </Panel>
        )}
      </div>

      <LessonEditorPanel
        lesson={editingLessonObj}
        onChange={(patch) => editingLesson && updateLesson(editingLesson.moduleId, editingLesson.lessonId, patch)}
        onClose={() => setEditingLesson(null)}
      />

      {previewOpen && <PreviewModal course={course} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}
