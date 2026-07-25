'use client';

import { useState } from 'react';

/* Shared building blocks used across the /profil dashboard's tabs (identity,
   bio, academic, career, wallet, game, settings) — one consistent "grouped
   panel" pattern instead of many separately-bordered/shadowed boxes. */

export function Panel({ children, className = '' }) {
  return (
    <div className={`bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function PanelSection({ title, desc, children, first = false, tint = false }) {
  return (
    <div className={`p-6 ${first ? '' : 'border-t border-[var(--border)]'} ${tint ? 'bg-[var(--bg-surface-2)]' : ''}`}>
      {title && (
        <div className="mb-4">
          <div className="text-base font-bold text-[var(--text-primary)]">{title}</div>
          {desc && <div className="text-sm text-[var(--text-secondary)] mt-0.5">{desc}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
        {desc && <div className="text-xs text-[var(--text-secondary)] mt-0.5">{desc}</div>}
      </div>
      {children}
    </div>
  );
}

export function Toggle({ label, desc, defaultChecked, checked, onChange }) {
  const isControlled = checked !== undefined;
  const [internalOn, setInternalOn] = useState(defaultChecked);
  const on = isControlled ? checked : internalOn;

  function toggle() {
    if (isControlled) onChange?.(!on);
    else setInternalOn(!on);
  }

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <div className="text-sm font-semibold text-[var(--text-primary)]">{label}</div>
        {desc && <div className="text-xs text-[var(--text-secondary)] mt-0.5">{desc}</div>}
      </div>
      <button
        onClick={toggle}
        aria-pressed={on}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${on ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

export function Tooltip({ text, children }) {
  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[160px] rounded-[var(--radius-sm)] bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] text-[11px] font-medium px-2.5 py-1.5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 shadow-[var(--shadow-md)]">
        {text}
      </div>
    </div>
  );
}

export function PageHeader({ children, sub }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">{children}</h1>
      {sub && <p className="text-[var(--text-secondary)] text-sm mt-1">{sub}</p>}
    </div>
  );
}

const STAT_TONES = {
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)]',
  success: 'bg-[var(--success-soft)] text-[var(--success)]',
  streak: 'bg-[var(--streak-soft)] text-[var(--streak)]',
  warm: 'bg-[var(--warm-soft)] text-[var(--accent-warm)]',
};
export function StatTile({ label, value, icon, tone = 'accent' }) {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl shadow-sm p-5 text-center">
      {icon && (
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg mx-auto mb-2.5 ${STAT_TONES[tone] || STAT_TONES.accent}`}>
          {icon}
        </div>
      )}
      <div className="text-xl font-extrabold text-[var(--text-primary)]">{value}</div>
      <div className="text-[11px] text-[var(--text-secondary)] mt-1 uppercase tracking-wide">{label}</div>
    </div>
  );
}

export function ProgressBar({ value, colorClass = 'bg-[var(--accent)]' }) {
  return (
    <div className="w-full h-3 rounded-full bg-[var(--border)] overflow-hidden">
      <div className={`h-full ${colorClass} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
    </div>
  );
}
