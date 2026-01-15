import { useEffect, useState } from 'react';
import { IconHome, IconMapPin, IconHeart, IconUser, IconSearch } from '@tabler/icons-react';

export default function BottomNav() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    {
      path: '/',
      icon: IconHome,
      label: 'Inicio',
    },
    {
      path: '/descubre',
      icon: IconSearch,
      label: 'Descubre',
    },
    {
      path: '/cerca',
      icon: IconMapPin,
      label: 'Cerca',
    },
    {
      path: '/favoritos',
      icon: IconHeart,
      label: 'Favoritos',
    },
    {
      path: '/perfil',
      icon: IconUser,
      label: 'Perfil',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-bottom md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                active
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform ${
                  active ? 'scale-110' : ''
                }`}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className={`text-xs font-medium ${
                  active ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
