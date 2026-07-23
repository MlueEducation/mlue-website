'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', style = {}, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mergedStyle = delay ? { ...style, transitionDelay: `${delay}ms` } : style;

  return (
    <div ref={ref} className={`reveal ${visible ? 'in' : ''} ${className}`} style={mergedStyle}>
      {children}
    </div>
  );
}
