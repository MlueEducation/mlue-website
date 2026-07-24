'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

/* Both wordmark PNGs have a soft, low-alpha glow baked into their canvas
   margins, and the dark variant uses a much larger canvas relative to its
   actual glyphs than the light one (~52% vs ~92% width fill) — cropping it
   down to header-logo size via plain CSS forces such an aggressive scale
   reduction that the real page's image compositor sometimes rasterizes it
   at visibly degraded quality (verified: identical CSS crop renders crisp
   in isolation but blurs on the live page). Cropping once via <canvas> at
   mount time sidesteps that — it's a fixed, explicit high-quality resample
   instead of relying on the browser's on-the-fly scaling of a live layer. */
const WORDMARK_CROP = {
  light: { src: '/mlue-wordmark-light.png', x: 21, y: 13, w: 483, h: 63 },
  dark: { src: '/mlue-wordmark.png', x: 198, y: 26, w: 490, h: 133 },
};
const TARGET_HEIGHT = 14;

function useCroppedWordmark(theme) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const cfg = WORDMARK_CROP[theme] || WORDMARK_CROP.dark;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const scale = (TARGET_HEIGHT / cfg.h) * dpr;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(cfg.w * scale);
      canvas.height = Math.round(cfg.h * scale);
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, cfg.x, cfg.y, cfg.w, cfg.h, 0, 0, canvas.width, canvas.height);
      setDataUrl(canvas.toDataURL('image/png'));
    };
    img.src = cfg.src;
    return () => {
      cancelled = true;
    };
  }, [theme]);

  return dataUrl;
}

export default function BrandLogo() {
  const { theme } = useTheme();
  const icon = theme === 'light' ? '/mlue-icon-light.png' : '/mlue-icon.png';
  const wordSrc = useCroppedWordmark(theme);

  return (
    <>
      <img src={icon} alt="" className="brand-icon" />
      <span className="brand-word-wrap">
        {wordSrc && <img src={wordSrc} alt="Mlue" className="brand-word-img" />}
      </span>
    </>
  );
}
