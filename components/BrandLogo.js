'use client';

import { useTheme } from './ThemeProvider';

export default function BrandLogo() {
  const { theme } = useTheme();
  const icon = theme === 'light' ? '/mlue-icon-light-cropped.png' : '/mlue-icon-cropped.png';

  return (
    <>
      <img src={icon} alt="" className="brand-icon" />
      <span className="brand-word" aria-label="Mlue" role="img" />
    </>
  );
}
