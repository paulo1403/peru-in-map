import { IconMapPin } from '@tabler/icons-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguageStore } from '../stores/languageStore';

export function Header() {
  const { language } = useLanguageStore();

  const nav = {
    es: {
      home: 'Inicio',
      places: 'Lugares',
      map: 'Mapa'
    },
    en: {
      home: 'Home',
      places: 'Places',
      map: 'Map'
    }
  };

  const t = nav[language];

  return (
    <header className="w-full border-b border-border bg-surface/80 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <IconMapPin className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-text">QueHacer.pe</span>
        </a>

        <nav className="flex items-center gap-4">
          <a
            href="/"
            className="text-secondary hover:text-primary transition-colors font-medium"
          >
            {t.home}
          </a>
          <a
            href="/lugares"
            className="text-secondary hover:text-primary transition-colors font-medium"
          >
            {t.places}
          </a>
          <a
            href="/mapa"
            className="text-secondary hover:text-primary transition-colors font-medium"
          >
            {t.map}
          </a>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}