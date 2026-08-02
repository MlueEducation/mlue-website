'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { X, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { savePaymentMethod } from '@/lib/wallet';
import { purchaseCart } from '@/lib/purchases';
import { useCart } from '@/components/CartProvider';
import { Toggle } from '@/components/ProfileUI';

function detectBrand(number) {
  const digits = number.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'Visa';
  if (/^5/.test(digits)) return 'Mastercard';
  return 'Kart';
}

/* Same card-form/saved-card UI as components/CheckoutModal.js (wallet
   top-up), but the final action debits the wallet balance for the cart's
   real total via the purchase_cart RPC instead of inserting a top-up row. */
export default function CartCheckoutModal({ open, onClose, user }) {
  const queryClient = useQueryClient();
  const { items, total, courseIds, bundleIds, clear } = useCart();
  const [savedMethod, setSavedMethod] = useState(null);
  const [mode, setMode] = useState('form');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open || !user) return;
    supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        const list = data || [];
        const def = list.find((m) => m.is_default) || list[0] || null;
        setSavedMethod(def);
        setMode(def ? 'quick' : 'form');
      });
  }, [open, user]);

  useEffect(() => {
    if (open) { setError(null); setSuccess(false); }
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  async function handleSubmit() {
    setError(null);
    if (mode === 'form') {
      const digits = cardNumber.replace(/\D/g, '');
      if (digits.length < 12 || !expiry || !cvc) {
        setError('Kart məlumatlarını tam doldur.');
        return;
      }
    }
    setSubmitting(true);
    try {
      if (mode === 'form' && saveCard) {
        const digits = cardNumber.replace(/\D/g, '');
        await savePaymentMethod({
          provider: 'demo',
          cardLastFour: digits.slice(-4),
          cardBrand: detectBrand(cardNumber),
          tokenId: 'demo_tok_' + crypto.randomUUID(),
        });
      }
      await purchaseCart(courseIds, bundleIds);
      courseIds.forEach((id) => queryClient.invalidateQueries({ queryKey: ['course', id] }));
      // A bundle purchase grants access to courses beyond what's in
      // courseIds (the bundle's own member courses), and the catalog/bundle
      // "already owned" badges both read from these two caches — without
      // this, they'd only refresh on a hard reload.
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['owned-course-ids'], exact: false });
      clear();
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Ödəniş uğursuz oldu.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className={`mlue-modal-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`mlue-modal-panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        {open && (
          <>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4.5 h-4.5 text-[var(--accent)]" />
                <span className="text-base font-extrabold text-[var(--text-primary)]">Səbəti ödə</span>
              </div>
              <button type="button" onClick={onClose} className="ai-chat-close" aria-label="Bağla">
                <X className="w-4 h-4" />
              </button>
            </div>

            {success ? (
              <div className="text-center py-6">
                <p className="text-sm text-[var(--success)] font-bold mb-2">Alış uğurla tamamlandı ✅</p>
                <p className="text-xs text-[var(--text-secondary)] mb-5">Aldığın kurslar artıq profilində əlçatandır.</p>
                <button type="button" onClick={onClose} className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-xl transition-colors">
                  Bağla
                </button>
              </div>
            ) : items.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Səbətin boşdur.</p>
            ) : (
              <div className="space-y-4">
                <div className="text-[11px] font-bold text-[var(--warning)] bg-[var(--warning-soft)] rounded-lg px-3 py-2">
                  DEMO ÖDƏNİŞ — real ödəniş şlüzü qoşulmayıb, kart nömrəniz saxlanılmır.
                </div>

                <div className="bg-[var(--bg-surface-2)] rounded-xl p-3.5 space-y-1.5">
                  {items.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                      <span className="truncate mr-3">{item.title}</span>
                      <span className="flex-shrink-0">₼{Number(item.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-sm font-bold text-[var(--text-primary)] pt-1.5 border-t border-[var(--border)] mt-1.5">
                    <span>Cəmi</span>
                    <span>₼{total.toFixed(2)}</span>
                  </div>
                </div>

                {mode === 'quick' && savedMethod ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl p-3.5">
                      <span className="text-lg">💳</span>
                      <span className="text-sm text-[var(--text-primary)]">{savedMethod.card_brand} •••• {savedMethod.card_last_four}</span>
                    </div>
                    {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      {submitting ? 'Emal olunur...' : `1-Kliklə Al — ₼${total.toFixed(2)}`}
                    </button>
                    <button type="button" onClick={() => setMode('form')} className="w-full text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                      Başqa kartla ödə
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input
                      placeholder="Kart nömrəsi"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                      className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <div className="flex gap-3">
                      <input
                        placeholder="AA/İİ"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        maxLength={5}
                        className="w-1/2 bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                      <input
                        placeholder="CVC"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        maxLength={4}
                        className="w-1/2 bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                    <input
                      placeholder="Kart üzərindəki ad"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <Toggle label="Kartı gələcək ödənişlər üçün yadda saxla" checked={saveCard} onChange={setSaveCard} />
                    {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      {submitting ? 'Emal olunur...' : `Ödə — ₼${total.toFixed(2)}`}
                    </button>
                    {savedMethod && (
                      <button type="button" onClick={() => setMode('quick')} className="w-full text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                        Saxlanılan kartla ödə
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
