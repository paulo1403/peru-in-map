import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';
import type { Language } from '@shared/types';

const translations: Record<Language, Translation> = {
  es: esTranslations,
  en: enTranslations,
};

interface Translation {
  nav: {
    home: string;
    map: string;
    places: string;
    about: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    save: string;
    cancel: string;
    search: string;
    filter: string;
    sort: string;
    view: string;
    edit: string;
    delete: string;
  };
  places: {
    categories: Record<string, string>;
    filters: Record<string, string>;
    details: Record<string, string>;
  };
  home: {
    title: string;
    subtitle: string;
    explore: string;
    featured: string;
    nearby: string;
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
    filters: Record<string, string>;
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