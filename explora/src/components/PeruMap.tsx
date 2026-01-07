import {
  IconBuildingMonument,
  IconCoffee,
  IconGlassFull,
  IconMapPin,
  IconTrees,
} from '@tabler/icons-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix for default marker icon in React Leaflet
// @ts-expect-error - Required for Leaflet default icon fix in Webpack/Vite environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Coordenadas de Lima (Miraflores/Barranco como centro más relevante para cafés)
const LIMA_CENTER: [number, number] = [-12.121876, -77.029837];
const LIMA_ZOOM = 13;

interface Place {
  id: string;
  name: string;
  description: string;
  category: 'cafe' | 'bar' | 'food' | 'culture' | 'park';
  position: [number, number];
  city: string;
}

const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: IconMapPin },
  { id: 'cafe', label: 'Cafés', icon: IconCoffee },
  { id: 'culture', label: 'Cultura', icon: IconBuildingMonument },
  { id: 'park', label: 'Parques', icon: IconTrees },
  { id: 'bar', label: 'Bares', icon: IconGlassFull },
] as const;

export default function LimaMap() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/places.json')
      .then((res) => res.json())
      .then((data) => setPlaces(data));
  }, []);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === 'all') return places;
    return places.filter((p) => p.category === activeCategory);
  }, [places, activeCategory]);

  return (
    <div className="flex flex-col gap-4">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              type="button"
            >
              <Icon size={16} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Mapa */}
      <div className="h-[600px] w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg">
        <MapContainer
          center={LIMA_CENTER}
          zoom={LIMA_ZOOM}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredPlaces.map((place) => (
            <Marker key={place.id} position={place.position}>
              <Popup>
                <div className="text-center min-w-[200px]">
                  <strong className="block text-base font-bold text-gray-900">{place.name}</strong>
                  <span className="mb-2 block text-xs font-semibold text-red-600 uppercase tracking-wider">
                    {CATEGORIES.find((c) => c.id === place.category)?.label || place.category}
                  </span>
                  <p className="m-0 text-sm text-gray-600 leading-relaxed">{place.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
