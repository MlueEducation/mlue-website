'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useNotifications, markNotificationRead } from '@/hooks/useNotifications';

function relativeTime(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'indicə';
  if (mins < 60) return `${mins} dəq əvvəl`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} saat əvvəl`;
  const days = Math.floor(hours / 24);
  return `${days} gün əvvəl`;
}

export default function NotificationBell() {
  const { user } = useAuth();
  const { data: notifications = [] } = useNotifications(user?.id);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  if (!user) return null;

  function handleRowClick(n) {
    if (!n.read_at) markNotificationRead(n.id);
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Bildirişlər"
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors"
      >
        <Bell className="w-4.5 h-4.5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border)] shadow-[var(--shadow-lg)] overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <span className="text-sm font-bold text-[var(--text-primary)]">Bildirişlər</span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--text-tertiary)]">Bildirişin yoxdur.</div>
            ) : (
              notifications.map((n) => {
                const row = (
                  <div className={`px-4 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-surface-2)] transition-colors ${!n.read_at ? 'bg-[var(--accent-soft)]' : ''}`}>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">{n.title}</div>
                    {n.body && <div className="text-xs text-[var(--text-secondary)] mt-0.5">{n.body}</div>}
                    <div className="text-[11px] text-[var(--text-tertiary)] mt-1">{relativeTime(n.created_at)}</div>
                  </div>
                );
                return n.link ? (
                  <Link key={n.id} href={n.link} onClick={() => handleRowClick(n)} className="block">
                    {row}
                  </Link>
                ) : (
                  <button key={n.id} type="button" onClick={() => handleRowClick(n)} className="block w-full text-left">
                    {row}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
