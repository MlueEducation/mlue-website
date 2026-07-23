import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Mlue — Yeni Nəsil Rəqəmsal Təhsil və Karyera Platforması',
  description: 'Mlue — Azərbaycan gəncləri üçün Azərbaycan, Türk və Rus dillərində video dərslər, mentor dəstəyi, süni intellekt əsaslı fərdiləşdirmə və karyera hazırlığı bir arada.',
  openGraph: {
    title: 'Mlue — Yeni Nəsil Rəqəmsal Təhsil və Karyera Platforması',
    description: 'Öyrən, praktika et, sertifikat al, işə hazırlaş — hamısı bir platformada.',
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('mlue-theme');var t=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="az" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
