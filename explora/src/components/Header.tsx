import { IconMap2 } from '@tabler/icons-react';
import { useLanguageStore } from '../stores/languageStore';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { t } = useLanguageStore();

  return (
    <header className="w-full border-b border-gray-200/50 bg-background/80 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <IconMap2 className="h-6 w-6 text-brand" />
          <span className="text-xl font-bold text-text">QueHacer.pe</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="/" className="text-sm font-medium text-secondary hover:text-brand transition-colors">
            {t('nav.home')}
          </a>
          <a href="/mapa" className="text-sm font-medium text-secondary hover:text-brand transition-colors">
            {t('nav.map')}
          </a>
          <ThemeToggle />
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
