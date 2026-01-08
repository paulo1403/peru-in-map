import { IconMapPin } from '@tabler/icons-react';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  return (
    <header className="w-full border-b border-border bg-surface/80 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <IconMapPin className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-text-primary">QueHacer.pe</span>
        </div>

        <nav className="flex items-center gap-4">
          <a
            href="/"
            className="text-text-secondary hover:text-primary transition-colors font-medium"
          >
            Inicio
          </a>
          <a
            href="/mapa"
            className="text-text-secondary hover:text-primary transition-colors font-medium"
          >
            Mapa
          </a>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}