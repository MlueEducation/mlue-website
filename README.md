# Mlue — Sayt

Bu, Mlue (rəqəmsal təhsil və karyera platforması) üçün tək fayldan ibarət statik veb saytdır. Build addımı, framework və ya paket menecerinə ehtiyac yoxdur — sadəcə `index.html` faylı.

## Lokal önizləmə
`index.html` faylını istənilən brauzerdə birbaşa aç, və ya lokal server ilə:
```
npx serve .
```

## Vercel-ə deploy
Ən sadə yol — Vercel CLI:
```
npm i -g vercel
vercel login
vercel
```
Production üçün:
```
vercel --prod
```

GitHub üzərindən deploy etmək istəsən: bu qovluğu bir GitHub repo-suna push et, sonra vercel.com-da "Add New Project" → repo-nu seç → "Deploy" (Framework Preset: Other/Static, əlavə konfiqurasiya lazım deyil).

## Qeyd — Qeydiyyat forması
"Erkən Qeydiyyat" formu hazırda yalnız front-end simulyasiyadır (real email göndərmir/saxlamır). Real işləməsi üçün seçimlər:
- **Formspree / Getform** kimi no-code form xidməti (ən sürətli)
- Vercel Serverless Function + Google Sheets/Airtable/Postgres inteqrasiyası

Bunu quraşdırmaqda kömək lazım olsa, bildir.
