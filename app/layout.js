import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { AuthProvider } from '@/components/AuthProvider';
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

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
