import { IconLanguage } from '@tabler/icons-react';
import { useLanguageStore } from '../stores/languageStore';
import { Button } from './ui/Button';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguageStore();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
      >
        <IconLanguage className="w-4 h-4" />
        <span className="uppercase text-sm font-medium">
          {language}
        </span>
      </Button>

      <div className="absolute top-full mt-2 right-0 bg-surface border border-border rounded-lg shadow-lg p-1 min-w-[80px] z-10">
        <button
          onClick={() => setLanguage('es')}
          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
            language === 'es'
              ? 'bg-primary text-white'
              : 'text-text-primary hover:bg-background'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
            language === 'en'
              ? 'bg-primary text-white'
              : 'text-text-primary hover:bg-background'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}