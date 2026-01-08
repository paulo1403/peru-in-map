import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { IconMail, IconLock, IconBrandGoogle, IconSparkles, IconMapPin } from '@tabler/icons-react';

export default function LoginForm() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      window.location.href = '/';
    } else {
      setError(result.error || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert('Próximamente: Login con Google');
  };

  const handleMagicLink = () => {
    alert('Próximamente: Magic Link');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      {/* Logo y Título */}
      <div className="text-center mb-8">
        <a href="/" className="inline-flex items-center gap-2 mb-4">
          <IconMapPin className="w-10 h-10 text-purple-600" />
          <span className="text-2xl font-bold text-gray-900">QueHacer.pe</span>
        </a>
        <h2 className="text-2xl font-bold text-gray-900">
          Bienvenido de nuevo
        </h2>
        <p className="text-gray-600 mt-2">
          Inicia sesión para continuar
        </p>
      </div>

      {/* Botones OAuth y Magic Link */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <IconBrandGoogle className="w-5 h-5" />
          Continuar con Google
        </button>
        
        <button
          type="button"
          onClick={handleMagicLink}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-purple-300 rounded-xl text-purple-700 font-medium hover:bg-purple-50 hover:border-purple-400 transition-all"
        >
          <IconSparkles className="w-5 h-5" />
          Magic Link (sin contraseña)
        </button>
      </div>

      {/* Divisor */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">O continúa con email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg transition-all transform hover:scale-[1.02]"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </div>
    </form>

      {/* Link a registro */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="font-semibold text-purple-600 hover:text-purple-700">
            Regístrate gratis
          </a>
        </p>
      </div>

      {/* Link a inicio */}
      <div className="mt-4 text-center">
        <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}
