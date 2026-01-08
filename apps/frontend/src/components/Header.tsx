import { useState } from 'react';
import { IconMapPin } from '@tabler/icons-react';
import { LanguageSelector } from './LanguageSelector';
import { AuthModal } from './AuthModal';
import { useLanguageStore } from '../stores/languageStore';
import { useAuthStore } from '../stores/authStore';

export function Header() {
  const { language } = useLanguageStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary/20 transition"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="hidden md:inline">{user.name}</span>
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
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                {t.login}
              </button>
            )}
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}