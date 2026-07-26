'use client';

import { useParams } from 'next/navigation';
import CourseBuilder from '@/components/studio/CourseBuilder';

export default function EditCoursePage() {
  const { courseId } = useParams();
  return <CourseBuilder courseId={courseId} />;
}
