'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { RELEASE_SECTIONS, formatReleaseDate } from '@/lib/news';

export default function NewsReleaseModal({ group, visibleItems, onClose }) {
  const open = !!group;

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const items = visibleItems || group?.items || [];

  return (
    <>
      <div className={`news-modal-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`news-modal-panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        {group && (
          <>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold bg-[var(--accent-soft)] text-[var(--accent)] px-3 py-1 rounded-full">{group.versionTag}</span>
                <span className="text-sm text-[var(--text-tertiary)]">{formatReleaseDate(group.releaseDate)}</span>
              </div>
              <button type="button" onClick={onClose} className="ai-chat-close" aria-label="Bağla">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-7">
              {RELEASE_SECTIONS.map((section) => {
                const sectionItems = items.filter((i) => section.categories.includes(i.category));
                if (sectionItems.length === 0) return null;
                return (
                  <div key={section.key}>
                    <h3 className="text-base font-extrabold text-[var(--text-primary)] mb-3">
                      {section.emoji} {section.heading}
                    </h3>
                    <div className="space-y-5">
                      {sectionItems.map((item) => (
                        <div key={item.id}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <h4 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h4>
                            <span className="news-platform-badge">[{item.platform}]</span>
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                          {item.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image_url}
                              alt=""
                              loading="lazy"
                              className="rounded-xl w-full max-h-64 object-cover mt-3"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {items.length === 0 && (
                <p className="text-sm text-[var(--text-tertiary)] text-center py-6">Bu filtrə uyğun element yoxdur.</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
