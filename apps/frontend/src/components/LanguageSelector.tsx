import { useState } from 'react';
import { IconLanguage, IconChevronDown } from '@tabler/icons-react';
import { useLanguageStore } from '../stores/languageStore';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
      >
        <IconLanguage className="w-4 h-4 text-secondary" />
        <span className="uppercase text-sm font-semibold text-text">
          {language}
        </span>
        <IconChevronDown 
          className={`w-4 h-4 text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic afuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full mt-2 right-0 bg-surface border border-border rounded-lg shadow-xl p-1 min-w-[120px] z-20">
            <button
              onClick={() => handleLanguageChange('es')}
              className={`w-full text-left px-4 py-2.5 text-sm rounded-md transition-all flex items-center justify-between ${
                language === 'es'
                  ? 'bg-primary text-white font-semibold'
                  : 'text-text hover:bg-background'
              }`}
            >
              <span>Español</span>
              {language === 'es' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full text-left px-4 py-2.5 text-sm rounded-md transition-all flex items-center justify-between ${
                language === 'en'
                  ? 'bg-primary text-white font-semibold'
                  : 'text-text hover:bg-background'
              }`}
            >
              <span>English</span>
              {language === 'en' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}