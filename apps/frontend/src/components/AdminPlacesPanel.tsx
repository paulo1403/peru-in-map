import { useEffect, useState } from 'react';
import {
  IconPlus,
  IconPencil,
  IconTrash,
  IconSearch,
  IconFilter,
  IconMapPin,
  IconStar,
  IconUsers,
} from '@tabler/icons-react';
import { useAuthStore } from '../stores/authStore';
import PlaceFormModal from './PlaceFormModal';

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
  rating: number;
  isSponsored: boolean;
  createdAt: string;
  _count: {
    reviews: number;
  };
}

interface AdminStats {
  totalPlaces: number;
  totalUsers: number;
  totalReviews: number;
  sponsoredPlaces: number;
}

export default function AdminPlacesPanel() {
  const { token, user } = useAuthStore();
  const [places, setPlaces] = useState<Place[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';

  // Esperar a que Zustand se hidrate
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && token) {
      loadStats();
      loadPlaces();
    }
  }, [page, search, category, hydrated, token]);

  const loadStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadPlaces = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(category && { category }),
      });

      const response = await fetch(`${API_URL}/api/admin/places?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPlaces(data.places || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error loading places:', error);
      setPlaces([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este lugar?')) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/places/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        loadPlaces();
        loadStats();
      }
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handleEdit = (place: Place) => {
    setSelectedPlace(place);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedPlace(null);
    setShowModal(true);
  };

  const handleModalClose = (updated: boolean) => {
    setShowModal(false);
    setSelectedPlace(null);
    if (updated) {
      loadPlaces();
      loadStats();
    }
  };

  const categories = [
    'cafe',
    'restaurant',
    'bar',
    'park',
    'museum',
    'theater',
    'market',
    'shopping',
    'sports',
    'other',
  ];

  const categoryLabels: Record<string, string> = {
    cafe: 'Café',
    restaurant: 'Restaurante',
    bar: 'Bar',
    park: 'Parque',
    museum: 'Museo',
    theater: 'Teatro',
    market: 'Mercado',
    shopping: 'Tienda',
    sports: 'Deportes',
    other: 'Otro',
  };

  // Check if user is admin
  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Acceso Denegado
          </h1>
          <p className="text-gray-600">
            No tienes permisos para acceder a esta página
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Título de la sección */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Lugares
          </h1>
          <p className="text-gray-600 mt-1">
            Crea, edita y administra todos los lugares de la plataforma
          </p>
        </div>>
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Lugares</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.totalPlaces}
                  </p>
                </div>
                <IconMapPin className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Usuarios</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.totalUsers}
                  </p>
                </div>
                <IconUsers className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Reviews</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.totalReviews}
                  </p>
                </div>
                <IconStar className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Destacados</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.sponsoredPlaces}
                  </p>
                </div>
                <IconStar className="w-10 h-10 text-purple-500" />
              </div>
            </div>
          </div>
        )}

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar lugares..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <IconFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabels[cat]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <IconPlus className="w-5 h-5" />
              Crear Lugar
            </button>
          </div>
        </div>

        {/* Places Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              <p className="text-gray-600 mt-4">Cargando lugares...</p>
            </div>
          ) : places.length === 0 ? (
            <div className="p-12 text-center">
              <IconMapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron lugares</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lugar
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Distrito
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reviews
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {places.map((place) => (
                      <tr key={place.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {place.name}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {place.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {categoryLabels[place.category]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {place.district}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <IconStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium text-gray-900">
                              {place.rating.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {place._count.reviews}
                        </td>
                        <td className="px-6 py-4">
                          {place.isSponsored && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                              Destacado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(place)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <IconPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(place.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <IconTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Página {page} de {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <PlaceFormModal
          place={selectedPlace}
          onClose={handleModalClose}
          token={token}
          apiUrl={API_URL}
        />
      )}
    </div>
  );
}
