import { IconMenu2, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-full bg-brand/10 hover:bg-brand/20 border border-brand/20 transition-all duration-200"
        aria-label="Open menu"
      >
        <IconMenu2 size={20} className="text-brand" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-background shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
              <span className="text-lg font-bold text-text">Menú</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <IconX size={20} className="text-text" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              <a
                href="/"
                className="block py-2 text-secondary hover:text-brand transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </a>
              <a
                href="/mapa"
                className="block py-2 text-secondary hover:text-brand transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Mapa
              </a>
              <div className="pt-4 border-t border-gray-200/50 space-y-4">
                <ThemeToggle />
                <LanguageSelector />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}