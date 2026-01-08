import { describe, expect, it } from 'vitest';
import { useLanguageStore } from '../stores/languageStore';

describe('Basic Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});

describe('Language Store', () => {
  it('should have initial language as es', () => {
    const { language } = useLanguageStore.getState();
    expect(language).toBe('es');
  });

  it('should translate correctly', () => {
    const { t } = useLanguageStore.getState();
    expect(t('nav.home')).toBe('Inicio');
  });

  it('should change language', () => {
    const store = useLanguageStore.getState();
    store.setLanguage('en');
    expect(useLanguageStore.getState().language).toBe('en');
    expect(useLanguageStore.getState().t('nav.home')).toBe('Home');
  });
});
