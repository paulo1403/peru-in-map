import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';

const translations: Record<Language, Translation> = {
  es: esTranslations,
  en: enTranslations,
};

type Language = 'es' | 'en';

interface Translation {
  nav: {
    home: string;
    map: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  footer: {
    copyright: string;
    madeWith: string;
    inPeru: string;
  };
  map: {
    filters: {
      all: string;
      cafe: string;
      culture: string;
      park: string;
      bar: string;
    };
  };
  theme: {
    toggle: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    const initialLang = savedLang || browserLang;
    setLanguageState(initialLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}