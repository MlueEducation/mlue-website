# Mlue — Next.js sayt

Bu, əvvəlki tək-fayl statik saytın Next.js (App Router) versiyasıdır — hər bölmə öz ayrı səhifəsindədir.

## Səhifələr
- `/` — Ana səhifə
- `/platforma` — Bütün xüsusiyyətlər
- `/nece-isleyir` — Proses
- `/qiymetler` — Qiymətlər
- `/terefdasliq` — Tərəfdaşlıq planı
- `/haqqimizda` — Haqqımızda
- `/giris` — Giriş
- `/qeydiyyat` — Qeydiyyat
- `/erken-giris` — Erkən qeydiyyat (email siyahısı)
- `/profil` — Profil (yalnız giriş etmiş istifadəçilər üçün)

## Lokal işlətmək (istəyə bağlı)
Bunun üçün kompüterində Node.js quraşdırılmış olmalıdır (nodejs.org saytından).
```
npm install
npm run dev
```
Sonra brauzerdə `http://localhost:3000` aç.

## Vercel-ə deploy
Bu qovluğu GitHub repo-nuza push et (və ya köhnə faylları silib bunları yükləyin). Vercel `package.json`-u görüb avtomatik Next.js layihəsi kimi tanıyacaq — heç bir əlavə konfiqurasiya lazım deyil. `npm install` və build prosesini Vercel özü, öz serverində edir — sənin kompüterində Node.js olmasa belə işləyəcək.

## Qeyd
Supabase açarları `lib/supabaseClient.js` faylındadır (anon/public açar — brauzerdə görünməsi normaldır və təhlükəsizdir). Formspree linki `app/erken-giris/page.js` faylındadır.
