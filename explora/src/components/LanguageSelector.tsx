import { IconLanguage } from '@tabler/icons-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-gray-200/50 hover:bg-accent transition-all duration-200"
        aria-label={t('theme.toggle')}
      >
        <IconLanguage size={20} className="text-text" />
        <span className="text-sm font-medium text-text uppercase">{language}</span>
      </button>

      <div className="absolute top-full mt-2 right-0 bg-background/95 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-lg p-1 min-w-[80px]">
        <button
          onClick={() => setLanguage('es')}
          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
            language === 'es' ? 'bg-brand text-white' : 'text-text hover:bg-accent'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
            language === 'en' ? 'bg-brand text-white' : 'text-text hover:bg-accent'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}