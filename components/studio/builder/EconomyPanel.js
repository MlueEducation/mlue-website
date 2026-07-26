'use client';

import { SettingRow } from '@/components/ProfileUI';

const numberInputClass = 'w-24 bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] text-right focus:outline-none focus:border-[var(--accent)]';

export default function EconomyPanel({ course, onChange }) {
  return (
    <div className="divide-y divide-[var(--border)]">
      <SettingRow label="Tamamlama XP-si" desc="Kursu bitirən tələbəyə verilən təcrübə xalı">
        <input
          type="number"
          min={0}
          value={course.xpReward}
          onChange={(e) => onChange({ xpReward: parseInt(e.target.value, 10) || 0 })}
          className={numberInputClass}
        />
      </SettingRow>
      <SettingRow label="Tamamlama Tokeni" desc="Kursu bitirən tələbəyə verilən MLUE Token miqdarı">
        <input
          type="number"
          min={0}
          value={course.tokenReward}
          onChange={(e) => onChange({ tokenReward: parseInt(e.target.value, 10) || 0 })}
          className={numberInputClass}
        />
      </SettingRow>
    </div>
  );
}
