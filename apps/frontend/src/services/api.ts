import type { Place, Review, ApiResponse, PaginatedResponse, PlaceFilters, SearchParams } from '@shared/types';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const { state } = JSON.parse(authStorage);
        return state?.token || null;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return null;
  }

  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const token = this.getAuthToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options?.headers,
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Places endpoints
  async getPlaces(params?: Partial<SearchParams>): Promise<ApiResponse<PaginatedResponse<Place>>> {
    const queryParams = new URLSearchParams();

    if (params?.query) queryParams.append('q', params.query);
    if (params?.filters?.category) queryParams.append('category', params.filters.category);
    if (params?.filters?.district) queryParams.append('district', params.filters.district);
    if (params?.filters?.city) queryParams.append('city', params.filters.city);
    if (params?.filters?.isSponsored !== undefined) {
      queryParams.append('isSponsored', String(params.filters.isSponsored));
    }
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.offset) queryParams.append('offset', String(params.offset));

    const queryString = queryParams.toString();
    return this.fetchApi<PaginatedResponse<Place>>(
      `/places${queryString ? `?${queryString}` : ''}`
    );
  }

  async getPlaceById(id: string): Promise<ApiResponse<Place>> {
    return this.fetchApi<Place>(`/places/${id}`);
  }

  async getNearbyPlaces(lat: number, lng: number, radius: number = 5): Promise<ApiResponse<Place[]>> {
    return this.fetchApi<Place[]>(`/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  }

  async createPlace(data: Partial<Place>): Promise<ApiResponse<Place>> {
    return this.fetchApi<Place>('/admin/places', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePlace(id: string, data: Partial<Place>): Promise<ApiResponse<Place>> {
    return this.fetchApi<Place>(`/admin/places/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePlace(id: string): Promise<ApiResponse<null>> {
    return this.fetchApi<null>(`/admin/places/${id}`, {
      method: 'DELETE',
    });
  }

  // Reviews endpoints
  async getPlaceReviews(placeId: string): Promise<ApiResponse<Review[]>> {
    return this.fetchApi<Review[]>(`/places/${placeId}/reviews`);
  }

  async createReview(placeId: string, data: Partial<Review>): Promise<ApiResponse<Review>> {
    return this.fetchApi<Review>(`/places/${placeId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateReview(placeId: string, reviewId: string, data: Partial<Review>): Promise<ApiResponse<Review>> {
    return this.fetchApi<Review>(`/places/${placeId}/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteReview(placeId: string, reviewId: string): Promise<ApiResponse<null>> {
    return this.fetchApi<null>(`/places/${placeId}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();