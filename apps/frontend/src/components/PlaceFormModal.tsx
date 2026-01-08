import { useState, useEffect } from 'react';
import { IconX, IconMapPin, IconLoader } from '@tabler/icons-react';

interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  district: string;
  city: string;
  position: {
    type: string;
    coordinates: [number, number];
  };
  tags: string[];
  isSponsored: boolean;
}

interface PlaceFormModalProps {
  place: Place | null;
  onClose: (updated: boolean) => void;
  token: string;
  apiUrl: string;
}

export default function PlaceFormModal({
  place,
  onClose,
  token,
  apiUrl,
}: PlaceFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'cafe',
    district: '',
    city: 'Lima',
    latitude: -12.0464,
    longitude: -77.0428,
    tags: '',
    isSponsored: false,
  });

  useEffect(() => {
    if (place) {
      setFormData({
        name: place.name,
        description: place.description,
        category: place.category,
        district: place.district,
        city: place.city,
        latitude: place.position.coordinates[1],
        longitude: place.position.coordinates[0],
        tags: place.tags.join(', '),
        isSponsored: place.isSponsored,
      });
    }
  }, [place]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);

      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        district: formData.district,
        city: formData.city,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        tags,
        isSponsored: formData.isSponsored,
      };

      const url = place
        ? `${apiUrl}/api/admin/places/${place.id}`
        : `${apiUrl}/api/admin/places`;

      const method = place ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar el lugar');
      }

      onClose(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'cafe', label: 'Café' },
    { value: 'restaurant', label: 'Restaurante' },
    { value: 'bar', label: 'Bar' },
    { value: 'park', label: 'Parque' },
    { value: 'museum', label: 'Museo' },
    { value: 'theater', label: 'Teatro' },
    { value: 'market', label: 'Mercado' },
    { value: 'shopping', label: 'Tienda' },
    { value: 'sports', label: 'Deportes' },
    { value: 'other', label: 'Otro' },
  ];

  const districts = [
    'Miraflores',
    'San Isidro',
    'Barranco',
    'Surco',
    'La Molina',
    'San Borja',
    'Jesús María',
    'Lince',
    'Magdalena',
    'Pueblo Libre',
    'San Miguel',
    'Chorrillos',
    'Surquillo',
    'Cercado de Lima',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {place ? 'Editar Lugar' : 'Crear Nuevo Lugar'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IconX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del lugar *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Café Central"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe el lugar..."
              />
            </div>

            {/* Category and District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distrito *
                </label>
                <select
                  required
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un distrito</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <IconMapPin className="w-4 h-4" />
                Ubicación (coordenadas)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Latitud"
                  />
                  <p className="text-xs text-gray-500 mt-1">Latitud</p>
                </div>
                <div>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Longitud"
                  />
                  <p className="text-xs text-gray-500 mt-1">Longitud</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Puedes obtener las coordenadas desde Google Maps
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etiquetas
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tranquilo, romántico, barato (separadas por comas)"
              />
            </div>

            {/* Sponsored */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isSponsored"
                checked={formData.isSponsored}
                onChange={(e) =>
                  setFormData({ ...formData, isSponsored: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isSponsored" className="text-sm text-gray-700">
                Marcar como lugar destacado/patrocinado
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <IconLoader className="w-5 h-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>{place ? 'Actualizar' : 'Crear'} Lugar</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
