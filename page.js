'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';

export default function ErkenGirisPage() {
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xnjejjyp', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setMsg({ text: 'Təşəkkürlər! Sənə erkən çıxış barədə xəbər verəcəyik.', type: 'success' });
        form.reset();
      } else {
        setMsg({ text: 'Xəta baş verdi, zəhmət olmasa yenidən cəhd et.', type: 'error' });
      }
    } catch (err) {
      setMsg({ text: 'Xəta baş verdi, internet bağlantını yoxla.', type: 'error' });
    }
    setLoading(false);
  }

  return (
    <section className="hero" style={{ paddingBottom: 120 }}>
      <div className="orb"></div>
      <div className="hero-inner">
        <div className="badge"><span className="dot"></span>İlk bilən sən ol</div>
        <h1 className="hero-title">Öyrənmənin yeni <span className="accent">dövrünə</span> erkən qoşul</h1>
        <p>Platforma açılanda ilk bilənlərdən ol və erkən qeydiyyat endirimindən yararlan. Hesab yaratmaq istəyirsənsə, birbaşa <a href="/qeydiyyat" style={{ color: 'var(--brand-purple-hover)', fontWeight: 600 }}>qeydiyyat</a> səhifəsinə keçə bilərsən.</p>
        <Reveal>
          <form className="form-row" onSubmit={handleSubmit} style={{ maxWidth: 460, margin: '0 auto' }}>
            <input type="email" name="email" placeholder="Email ünvanın" required />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Göndərilir...' : 'Qeydiyyatdan keç'}
            </button>
          </form>
          {msg.text && <div className={`form-msg show ${msg.type}`} style={{ textAlign: 'center' }}>{msg.text}</div>}
        </Reveal>
      </div>
    </section>
  );
}
