import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const API_URL = 'http://localhost:3000/api';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

export const useAuthStore = isBrowser
  ? create<AuthState>()(
      persist(
        (set) => ({
          user: null,
          token: null,
          isAuthenticated: false,
          
          login: async (email: string, password: string) => {
            try {
              const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
              });

              const data = await response.json();

              if (data.success && data.data) {
                set({
                  user: data.data.user,
                  token: data.data.token,
                  isAuthenticated: true,
                });
                return { success: true };
              }
              
              return { success: false, error: data.error || 'Error al iniciar sesión' };
            } catch (error) {
              console.error('Login error:', error);
              return { success: false, error: 'Error de conexión' };
            }
          },
          
          register: async (name: string, email: string, password: string) => {
            try {
              const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
              });

              const data = await response.json();

              if (data.success && data.data) {
                set({
                  user: data.data.user,
                  token: data.data.token,
                  isAuthenticated: true,
                });
                return { success: true };
              }
              
              return { success: false, error: data.error || 'Error al registrar usuario' };
            } catch (error) {
              console.error('Register error:', error);
              return { success: false, error: 'Error de conexión' };
            }
          },
          
          logout: () => {
            set({ user: null, token: null, isAuthenticated: false });
          },
        }),
        {
          name: 'auth-storage',
        }
      )
    )
  : create<AuthState>((set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async () => ({ success: false, error: 'SSR mode' }),
      register: async () => ({ success: false, error: 'SSR mode' }),
      logout: () => {},
    }));
