'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* MLUE Studio (/studio/**) is its own full-screen workspace, not a page of
   the marketing site — it renders without the public Header/Footer. Every
   other route is completely unaffected. */
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) return <main>{children}</main>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
