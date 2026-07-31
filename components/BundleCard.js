'use client';

import { Package } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { computeDiscountPercent } from '@/lib/bundles';

export default function BundleCard({ bundle, ownedCourseIds = new Set() }) {
  const cart = useCart();
  const componentTotal = bundle.courses.reduce((sum, c) => sum + Number(c.price || 0), 0);
  const discountPercent = computeDiscountPercent(componentTotal, bundle.discountedPrice);
  const fullyOwned = bundle.courses.length > 0 && bundle.courses.every((c) => ownedCourseIds.has(c.id));

  return (
    <div className="course-card" style={{ cursor: 'default' }}>
      <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-warm)] flex items-center justify-center mb-3">
        <Package className="w-8 h-8 text-white" />
      </div>
      <span className="course-tag">Paket · {bundle.courses.length} kurs</span>
      <h3>{bundle.title}</h3>
      {bundle.description && <p className="text-sm text-[var(--text-secondary)] mb-2">{bundle.description}</p>}
      <div className="flex items-center gap-2 mb-3">
        {componentTotal > bundle.discountedPrice && (
          <span className="text-xs text-[var(--text-tertiary)] line-through">₼{componentTotal.toFixed(2)}</span>
        )}
        <span className="text-base font-extrabold text-[var(--text-primary)]">₼{Number(bundle.discountedPrice).toFixed(2)}</span>
        {discountPercent > 0 && (
          <span className="text-[10px] font-bold uppercase text-[var(--success)] bg-[var(--success-soft)] px-2 py-0.5 rounded-full">
            {discountPercent}% endirim
          </span>
        )}
      </div>
      {fullyOwned ? (
        <button
          type="button"
          disabled
          className="w-full bg-[var(--success-soft)] text-[var(--success)] font-bold py-2.5 rounded-lg cursor-default text-sm"
        >
          ✅ Artıq sahibsən
        </button>
      ) : (
        <button
          type="button"
          onClick={() => cart.addBundle(bundle)}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
        >
          Səbətə əlavə et
        </button>
      )}
    </div>
  );
}
