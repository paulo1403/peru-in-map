import { create } from 'zustand';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  permission: 'granted' | 'denied' | 'prompt' | null;
  getLocation: () => Promise<void>;
  clearError: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
  permission: null,

  getLocation: async () => {
    set({ loading: true, error: null });

    if (!navigator.geolocation) {
      set({
        loading: false,
        error: 'La geolocalización no está disponible en tu navegador',
      });
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      set({ permission: permission.state });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
            error: null,
          });
        },
        (error) => {
          let errorMessage = 'No se pudo obtener tu ubicación';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso de ubicación denegado. Actívalo en configuración.';
              set({ permission: 'denied' });
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Ubicación no disponible';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado';
              break;
          }

          set({
            loading: false,
            error: errorMessage,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutos
        }
      );
    } catch (error) {
      set({
        loading: false,
        error: 'Error al verificar permisos de ubicación',
      });
    }
  },

  clearError: () => set({ error: null }),
}));
