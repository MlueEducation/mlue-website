'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import az from '@/locales/az.json';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

/* Hand-rolled i18n context, deliberately not react-i18next — mirrors the
   existing ThemeProvider pattern (localStorage-backed React context) rather
   than adding a new dependency for what's currently a small translated
   surface (sidebar nav + Settings, see locales/*.json). See locales/README
   for how to add more translated strings. */

const DICTIONARIES = { az, en, ru };

export const LANGUAGES = [
  { code: 'az', label: 'AZ', name: 'Azərbaycan' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

const LanguageContext = createContext({
  lang: 'az',
  setLang: () => {},
  t: (key, fallback) => fallback ?? key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('az');

  useEffect(() => {
    const stored = window.localStorage.getItem('mlue-lang');
    if (stored && DICTIONARIES[stored]) setLangState(stored);
  }, []);

  function setLang(code) {
    if (!DICTIONARIES[code]) return;
    setLangState(code);
    window.localStorage.setItem('mlue-lang', code);
  }

  function t(key, fallback) {
    return DICTIONARIES[lang]?.[key] ?? DICTIONARIES.az[key] ?? fallback ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
