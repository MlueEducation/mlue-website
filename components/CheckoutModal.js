'use client';

import { useEffect, useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { savePaymentMethod } from '@/lib/wallet';
import { Toggle } from '@/components/ProfileUI';

const PRESET_AMOUNTS = [10, 25, 50, 100];

function detectBrand(number) {
  const digits = number.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'Visa';
  if (/^5/.test(digits)) return 'Mastercard';
  return 'Kart';
}

export default function CheckoutModal({ open, onClose, user, savedMethod, onSuccess }) {
  const [mode, setMode] = useState(savedMethod ? 'quick' : 'form');
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) setMode(savedMethod ? 'quick' : 'form');
  }, [open, savedMethod]);

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

  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit() {
    setError(null);
    if (!finalAmount || finalAmount <= 0) {
      setError('Düzgün məbləğ daxil et.');
      return;
    }
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
        const tokenId = 'demo_tok_' + crypto.randomUUID();
        const digits = cardNumber.replace(/\D/g, '');
        await savePaymentMethod({
          provider: 'demo',
          cardLastFour: digits.slice(-4),
          cardBrand: detectBrand(cardNumber),
          tokenId,
        });
      }
      const { error: txErr } = await supabase.from('wallet_transactions').insert({
        user_id: user.id,
        amount: finalAmount,
        description: 'Balans artırma (demo ödəniş)',
      });
      if (txErr) throw txErr;
      onSuccess?.(finalAmount);
      onClose();
    } catch (err) {
      setError(err.message || 'Ödəniş uğursuz oldu.');
    } finally {
      setSubmitting(false);
    }
  }

  const amountPicker = (
    <div>
      <div className="text-xs font-bold text-[var(--text-secondary)] mb-2">Məbləği seç</div>
      <div className="flex flex-wrap gap-2 mb-3">
        {PRESET_AMOUNTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => { setAmount(a); setCustomAmount(''); }}
            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
              !customAmount && amount === a
                ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                : 'bg-[var(--bg-surface-2)] border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {a} ₼
          </button>
        ))}
      </div>
      <input
        type="number"
        min="1"
        placeholder="Fərqli məbləğ"
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
        className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
      />
    </div>
  );

  return (
    <>
      <div className={`mlue-modal-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`mlue-modal-panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        {open && (
          <>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4.5 h-4.5 text-[var(--accent)]" />
                <span className="text-base font-extrabold text-[var(--text-primary)]">Balansı artır</span>
              </div>
              <button type="button" onClick={onClose} className="ai-chat-close" aria-label="Bağla">
                <X className="w-4 h-4" />
              </button>
            </div>

            {mode === 'quick' && savedMethod ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3 bg-[var(--bg-surface-2)] rounded-xl p-3.5">
                  <span className="text-lg">💳</span>
                  <span className="text-sm text-[var(--text-primary)]">{savedMethod.card_brand} •••• {savedMethod.card_last_four}</span>
                </div>
                {amountPicker}
                {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {submitting ? 'Emal olunur...' : `1-Kliklə Al — ${finalAmount || 0} ₼`}
                </button>
                <button type="button" onClick={() => setMode('form')} className="w-full text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Başqa kartla ödə
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-[11px] font-bold text-[var(--warning)] bg-[var(--warning-soft)] rounded-lg px-3 py-2">
                  DEMO ÖDƏNİŞ — real ödəniş şlüzü qoşulmayıb, kart nömrəniz saxlanılmır.
                </div>
                {amountPicker}
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
                <Toggle
                  label="Kartı gələcək ödənişlər üçün yadda saxla"
                  checked={saveCard}
                  onChange={setSaveCard}
                />
                {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  {submitting ? 'Emal olunur...' : `Ödə — ${finalAmount || 0} ₼`}
                </button>
                {savedMethod && (
                  <button type="button" onClick={() => setMode('quick')} className="w-full text-center text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    Saxlanılan kartla ödə
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
