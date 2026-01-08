import { useState } from 'react';
import { IconMapPin, IconMenu2, IconX } from '@tabler/icons-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguageStore } from '../stores/languageStore';
import { useAuthStore } from '../stores/authStore';

export function Header() {
  const { language } = useLanguageStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const nav = {
    es: {
      home: 'Inicio',
      places: 'Lugares',
      map: 'Mapa',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      myProfile: 'Mi Perfil'
    },
    en: {
      home: 'Home',
      places: 'Places',
      map: 'Map',
      login: 'Log In',
      logout: 'Log Out',
      myProfile: 'My Profile'
    }
  };

  const t = nav[language];

  return (
    <>
      <header className="w-full border-b border-border bg-surface/95 backdrop-blur-md py-3 md:py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            <IconMapPin className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            <span className="text-lg md:text-xl font-bold text-text">QueHacer.pe</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary/20 transition"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </button>

                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-xl z-20 py-2">
                      <a
                        href="/perfil"
                        className="block w-full px-4 py-2 text-left text-text hover:bg-background transition"
                      >
                        {t.myProfile}
                      </a>
                      {user.role === 'ADMIN' && (
                        <a
                          href="/admin/lugares"
                          className="block w-full px-4 py-2 text-left text-text hover:bg-background transition font-medium text-purple-600"
                        >
                          Panel Admin
                        </a>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-text hover:bg-background transition"
                      >
                        {t.logout}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                {t.login}
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {isAuthenticated && user && (
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                {user.name[0].toUpperCase()}
              </div>
            )}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-text hover:text-primary transition"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <IconX className="w-6 h-6" />
              ) : (
                <IconMenu2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <div className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-50 md:hidden">
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                <a
                  href="/"
                  className="px-4 py-3 text-text hover:bg-background rounded-lg font-medium transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t.home}
                </a>
                <a
                  href="/lugares"
                  className="px-4 py-3 text-text hover:bg-background rounded-lg font-medium transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t.places}
                </a>
                <a
                  href="/mapa"
                  className="px-4 py-3 text-text hover:bg-background rounded-lg font-medium transition"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t.map}
                </a>

                <div className="border-t border-border my-2" />

                <div className="px-4 py-2">
                  <LanguageSelector />
                </div>

                {isAuthenticated && user ? (
                  <>
                    <a
                      href="/perfil"
                      className="px-4 py-3 text-text hover:bg-background rounded-lg font-medium transition"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {t.myProfile}
                    </a>
                    {user.role === 'ADMIN' && (
                      <a
                        href="/admin/lugares"
                        className="px-4 py-3 text-purple-600 hover:bg-purple-50 rounded-lg font-semibold transition"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Panel Admin
                      </a>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                      className="px-4 py-3 text-left text-text hover:bg-background rounded-lg font-medium transition"
                    >
                      {t.logout}
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="mx-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition text-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t.login}
                  </a>
                )}
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}