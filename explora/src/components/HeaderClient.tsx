import { IconMap2 } from '@tabler/icons-react';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200/50 bg-background/80 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <IconMap2 className="h-6 w-6 text-brand" />
          <span className="text-xl font-bold text-text">QueHacer.pe</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium text-secondary hover:text-brand transition-colors">
            Inicio
          </a>
          <a href="/mapa" className="text-sm font-medium text-secondary hover:text-brand transition-colors">
            Mapa
          </a>
          <ThemeToggle />
        </nav>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}