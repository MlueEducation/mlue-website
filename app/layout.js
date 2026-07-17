import './globals.css';
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

const themeInitScript = `
  try {
    var t = localStorage.getItem('mlue-theme');
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
