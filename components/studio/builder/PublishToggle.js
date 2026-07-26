'use client';

import { Toggle } from '@/components/ProfileUI';

export default function PublishToggle({ course, onChange }) {
  const isLive = course.status === 'live';
  return (
    <Toggle
      label={isLive ? 'Kurs canlıdır' : 'Kurs qaralamadır'}
      desc={isLive ? 'Bu kurs tələbələr üçün ictimai kataloqda görünür.' : 'Bu kurs yalnız Studio-da görünür, tələbələr görə bilməz.'}
      checked={isLive}
      onChange={(on) => onChange({ status: on ? 'live' : 'draft' })}
    />
  );
}
