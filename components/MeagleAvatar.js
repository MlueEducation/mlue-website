'use client';

import { useEffect, useState } from 'react';

/* Crop rectangles (source-image pixels) against public/meagle-sprite.png.
   TODO: recalibrate once the real sprite sheet is saved to that path — these
   are placeholder estimates. Cropped via <canvas> (not CSS background-position)
   because the crop-to-display downscale ratio here is even more extreme than
   the wordmark case in BrandLogo.js, which already proved plain CSS scaling
   visibly degrades on the live page at aggressive ratios. */
const SPRITE_SRC = '/meagle-sprite.png';
const MEAGLE_SPRITE = {
  neutral: { x: 520, y: 8, w: 190, h: 210 },
  cheerful: { x: 268, y: 494, w: 140, h: 150 },
  love: { x: 8, y: 494, w: 140, h: 150 },
  question: { x: 138, y: 494, w: 140, h: 150 },
  laptop: { x: 398, y: 494, w: 140, h: 150 },
  meditating: { x: 528, y: 494, w: 140, h: 150 },
};

function useMeagleCrop(expression, targetSize) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const cfg = MEAGLE_SPRITE[expression] || MEAGLE_SPRITE.neutral;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const size = Math.round(targetSize * dpr);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, cfg.x, cfg.y, cfg.w, cfg.h, 0, 0, size, size);
      setDataUrl(canvas.toDataURL('image/png'));
    };
    img.onerror = () => setDataUrl(null);
    img.src = SPRITE_SRC;
    return () => {
      cancelled = true;
    };
  }, [expression, targetSize]);

  return dataUrl;
}

export default function MeagleAvatar({ expression = 'neutral', size = 28, className = '' }) {
  const src = useMeagleCrop(expression, size);
  return (
    <span className={`meagle-avatar ${className}`} style={{ width: size, height: size }}>
      {src && <img src={src} alt="" width={size} height={size} />}
    </span>
  );
}
