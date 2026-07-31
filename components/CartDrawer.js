'use client';

import { useState } from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useCart } from '@/components/CartProvider';
import CartCheckoutModal from '@/components/CartCheckoutModal';

export default function CartDrawer() {
  const { user } = useAuth();
  const { items, total, drawerOpen, setDrawerOpen, remove } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <div className={`cart-backdrop ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className={`cart-drawer ${drawerOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!drawerOpen}>
        <div className="ai-chat-header">
          <div className="ai-chat-header-title"><ShoppingCart className="w-4.5 h-4.5" /> Səbət</div>
          <button type="button" onClick={() => setDrawerOpen(false)} className="ai-chat-close" aria-label="Bağla">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="ai-chat-messages">
          {items.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">Səbətin boşdur.</p>
          ) : (
            items.map((item) => (
              <div key={`${item.type}-${item.id}`} className="cart-item">
                <div className="flex-1 min-w-0">
                  <div className="cart-item-title truncate">{item.title}</div>
                  <div className="cart-item-meta">{item.type === 'bundle' ? 'Paket' : 'Kurs'} · ₼{Number(item.price).toFixed(2)}</div>
                </div>
                <button type="button" onClick={() => remove(item.type, item.id)} className="text-[var(--text-tertiary)] hover:text-[var(--danger)] flex-shrink-0" aria-label="Sil">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[var(--border)] flex-shrink-0 space-y-3">
          <div className="flex items-center justify-between text-sm font-bold text-[var(--text-primary)]">
            <span>Cəmi</span>
            <span>₼{total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => setCheckoutOpen(true)}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Ödənişə keç
          </button>
        </div>
      </div>

      <CartCheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} user={user} />
    </>
  );
}
