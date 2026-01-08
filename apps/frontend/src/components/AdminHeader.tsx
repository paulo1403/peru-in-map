import { useAuthStore } from '../stores/authStore';
import { 
  IconLayoutDashboard, 
  IconMapPin, 
  IconUsers, 
  IconStar,
  IconSettings,
  IconLogout,
  IconChevronDown
} from '@tabler/icons-react';
import { useState } from 'react';

export default function AdminHeader() {
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Título */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 group">
              <IconMapPin className="w-7 h-7 text-blue-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">QueHacer.pe</div>
                <div className="text-xs text-gray-500">Panel de Administración</div>
              </div>
            </a>
          </div>

          {/* Navegación Admin */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/admin/lugares"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              <IconMapPin className="w-5 h-5" />
              Lugares
            </a>
            <a
              href="/admin/usuarios"
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors font-medium cursor-not-allowed"
              title="Próximamente"
            >
              <IconUsers className="w-5 h-5" />
              Usuarios
            </a>
            <a
              href="/admin/reviews"
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors font-medium cursor-not-allowed"
              title="Próximamente"
            >
              <IconStar className="w-5 h-5" />
              Reviews
            </a>
          </nav>

          {/* Usuario y acciones */}
          <div className="flex items-center gap-3">
            {/* Botón volver al sitio */}
            <a
              href="/"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
            >
              Ver sitio web
            </a>

            {/* Menú de usuario */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {user?.name?.[0]?.toUpperCase() || 'A'}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name || 'Admin'}
                </span>
                <IconChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        Administrador
                      </span>
                    </div>
                    
                    <a
                      href="/perfil"
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      <IconSettings className="w-4 h-4" />
                      Mi perfil
                    </a>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <IconLogout className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
