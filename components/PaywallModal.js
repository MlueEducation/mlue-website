'use client';

import { useEffect, useState } from 'react';
import { X, Lock } from 'lucide-react';
import { purchaseCourse } from '@/lib/purchases';

/* Fires when an 'audit' user clicks "Kurs tamamlandı" — this app's only
   real "beyond video" action (there is no separate certificate-claim
   button; completing the course IS claiming the certificate). A single
   1-click purchase of just this course, not routed through the cart —
   a paywall interrupt is a one-item decision. */
export default function PaywallModal({ open, onClose, course, onUnlocked }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) setError(null);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  async function handleUpgrade() {
    setSubmitting(true);
    setError(null);
    try {
      await purchaseCourse(course.id);
      onUnlocked();
    } catch (err) {
      setError(err.message || 'Alış uğursuz oldu.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={`mlue-modal-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`mlue-modal-panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        {open && (
          <div className="text-center">
            <button type="button" onClick={onClose} className="ai-chat-close ml-auto mb-2" aria-label="Bağla">
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)] mb-2">
              Sertifikat və tapşırıqlar üçün kursu tam əldə edin
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Dinləyici kimi bütün dərsləri izləyə bilirsən — sertifikat almaq üçün kursu tam əldə etməlisən.
            </p>
            {error && <p className="text-sm text-[var(--danger)] mb-4">{error}</p>}
            <button
              type="button"
              onClick={handleUpgrade}
              disabled={submitting}
              className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              {submitting ? 'Emal olunur...' : `Kursu tam əldə et — ₼${Number(course.price || 0).toFixed(2)}`}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
