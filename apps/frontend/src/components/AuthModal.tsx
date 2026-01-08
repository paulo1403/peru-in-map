import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, mode: initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuthStore();
  const { language } = useLanguageStore();

  const content = {
    es: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      name: 'Nombre',
      email: 'Correo electrónico',
      password: 'Contraseña',
      loginButton: 'Entrar',
      registerButton: 'Crear cuenta',
      switchToRegister: '¿No tienes cuenta?',
      switchToLogin: '¿Ya tienes cuenta?',
      registerLink: 'Regístrate',
      loginLink: 'Inicia sesión',
      required: 'Este campo es obligatorio',
      invalidEmail: 'Correo electrónico inválido',
      close: 'Cerrar'
    },
    en: {
      login: 'Log In',
      register: 'Sign Up',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      loginButton: 'Log In',
      registerButton: 'Create Account',
      switchToRegister: "Don't have an account?",
      switchToLogin: 'Already have an account?',
      registerLink: 'Sign up',
      loginLink: 'Log in',
      required: 'This field is required',
      invalidEmail: 'Invalid email',
      close: 'Close'
    }
  };

  const t = content[language];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(email, password);
        if (result.success) {
          onClose();
          window.location.reload();
        } else {
          setError(result.error || 'Error al iniciar sesión');
        }
      } else {
        if (!name) {
          setError(t.required);
          setLoading(false);
          return;
        }
        const result = await register(name, email, password);
        if (result.success) {
          onClose();
          window.location.reload();
        } else {
          setError(result.error || 'Error al registrar usuario');
        }
      }
    } catch (err) {
      setError('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-text transition"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-text mb-6">
          {mode === 'login' ? t.login : t.register}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                {t.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? '...' : mode === 'login' ? t.loginButton : t.registerButton}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary">
          {mode === 'login' ? t.switchToRegister : t.switchToLogin}{' '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-primary font-semibold hover:text-primary/80"
          >
            {mode === 'login' ? t.registerLink : t.loginLink}
          </button>
        </div>
      </div>
    </div>
  );
}
