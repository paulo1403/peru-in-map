import { useEffect, useState } from 'react';
import { useLocationStore } from '../stores/locationStore';
import PullToRefresh from './PullToRefresh';
import ShareButton from './ShareButton';
import { 
  IconCurrentLocation, 
  IconMapPin, 
  IconStar,
  IconLoader2,
  IconAlertCircle,
  IconNavigation
} from '@tabler/icons-react';

interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  district: string;
  latitude: number;
  longitude: number;
  rating?: number;
  distance?: number;
}

export default function NearbyPlaces() {
  const { latitude, longitude, loading, error, permission, getLocation, clearError } = useLocationStore();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [radius, setRadius] = useState(5); // km

  useEffect(() => {
    if (latitude && longitude) {
      fetchNearbyPlaces();
    }
  }, [latitude, longitude, radius]);

  const fetchNearbyPlaces = async () => {
    setLoadingPlaces(true);
    try {
      const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(
        `${API_URL}/api/places?lat=${latitude}&lng=${longitude}&radius=${radius}`
      );
      
      if (!response.ok) throw new Error('Error al cargar lugares');
      
      const data = await response.json();
      setPlaces(data.items || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingPlaces(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const openInMaps = (place: Place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, '_blank');
  };

  const handleRefresh = async () => {
    await getLocation();
    if (latitude && longitude) {
      await fetchNearbyPlaces();
    }
  };

  const placesWithDistance = places.map(place => ({
    .PullToRefresh onRefresh={handleRefresh}>
      <..place,
    distance: latitude && longitude 
      ? calculateDistance(latitude, longitude, place.latitude, place.longitude)
      : 0
  })).sort((a, b) => a.distance! - b.distance!);

  return (
    <div className="min-h-[100dvh] bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-8 safe-top">
        <div className="flex items-center gap-3 mb-4">
          <IconCurrentLocation className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Lugares Cerca de Ti</h1>
            <p className="text-purple-100 text-sm">
              Descubre qué hay cerca de tu ubicación
            </p>
          </div>
        </div>

        {/* Location Button */}
        {!latitude && !loading && (
          <button
            onClick={getLocation}
            className="w-full flex items-center justify-center gap-2 bg-white text-purple-600 py-3 px-4 rounded-xl font-semibold hover:bg-purple-50 transition-all shadow-lg"
          >
            <IconNavigation className="w-5 h-5" />
            Activar mi ubicación
          </button>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-white py-3">
            <IconLoader2 className="w-5 h-5 animate-spin" />
            <span>Obteniendo tu ubicación...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-300 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <IconAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">{error}</p>
                <button
                  onClick={() => {
                    clearError();
                    getLocation();
                  }}
                  className="text-sm underline hover:no-underline"
                >
                  Intentar nuevamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Radius Selector */}
        {latitude && longitude && (
          <div className="mt-4">
            <label className="text-sm text-purple-100 mb-2 block">
              Radio de búsqueda: <span className="font-bold text-white">{radius} km</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="flex justify-between text-xs text-purple-100 mt-1">
              <span>1 km</span>
              <span>20 km</span>
            </div>
          </div>
        )}
      </div>

      {/* Places List */}
      {latitude && longitude && (
        <div className="px-4 py-6">
          {loadingPlaces ? (
            <div className="flex items-center justify-center py-12">
              <IconLoader2 className="w-8 h-8 text-purple-600 animate-spin" />
            </div>
          ) : placesWithDistance.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                {placesWithDistance.length} lugares encontrados
              </p>
              {placesWithDistance.map((place) => (
                <div
                  key={place.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Distance Badge */}
                    <div className="flex flex-col items-center justify-center bg-purple-100 text-purple-700 rounded-xl px-3 py-2 min-w-[70px]">
                      <span className="text-lg font-bold">
                        {place.distance! < 1 
                          ? `${Math.round(place.distance! * 1000)}m`
                          : `${place.distance!.toFixed(1)}km`
                        }
                      </span>
                      <span className="text-xs">distancia</span>
                    </div>

                    {/* Place Info */}
                    <div className="flex-1 min-w-0">
                      <a
                        href={`/lugares/${place.id}`}
                        className="font-bold text-gray-900 hover:text-purple-600 transition mb-1 block"
                      >
                        {place.name}
                      </a>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {place.description}
                      </p>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <IconMapPin className="w-3.5 h-3.5" />
                          {place.district}
                        </span>
                        {place.rating && (
                          <span className="flex items-center gap-1">
                            <IconStar className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            {place.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Button */}
                  <button
                    onClick={() => openInMaps(place)}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm"
                  >
                    <IconNavigation className="w-4 h-4" />
                    Cómo llegar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <IconMapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No hay lugares cerca</p>
              <p className="text-sm text-gray-500">
                Intenta aumentar el radio de búsqueda
              </p>
            </div>
          )}
        </div>
      )}
    </PullToRefresh>
    </div>
  );
}
