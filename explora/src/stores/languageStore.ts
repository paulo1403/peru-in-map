import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export const useLanguageStore = isBrowser
  ? create<LanguageState>()(
      persist(
        (set, get) => ({
          language: 'es',
          setLanguage: (lang: Language) => set({ language: lang }),
          t: (key: string): string => {
            const keys = key.split('.');
            let value: any = translations[get().language];

            for (const k of keys) {
              value = value?.[k];
            }

            return value || key;
          },
        }),
        {
          name: 'language-storage',
        }
      )
    )
  : create<LanguageState>((set, get) => ({
      language: 'es',
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[get().language];

        for (const k of keys) {
          value = value?.[k];
        }

        return value || key;
      },
    }));