// Shared types for QueHacer.pe platform

export type Language = 'es' | 'en';

export interface Place {
  id: string;
  name: string;
  description: string;
  category: PlaceCategory;
  district: string;
  city: string;
  position: [number, number]; // [lat, lng]
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  isSponsored?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PlaceCategory =
  | 'cafe'
  | 'restaurant'
  | 'bar'
  | 'park'
  | 'museum'
  | 'theater'
  | 'market'
  | 'shopping'
  | 'sports'
  | 'other';

export interface Review {
  id: string;
  placeId: string;
  userId?: string; // Optional for anonymous reviews
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  isVerified?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  places: Place[];
  tags: string[];
  isSponsored?: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email?: string;
  name?: string;
  preferences?: UserPreferences;
  savedPlaces: string[]; // Place IDs
  savedPlans: string[]; // Plan IDs
}

export interface UserPreferences {
  language: Language;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export interface Business {
  id: string;
  name: string;
  email: string;
  places: string[]; // Place IDs they manage
  subscription?: BusinessSubscription;
}

export interface BusinessSubscription {
  type: 'free' | 'premium' | 'enterprise';
  expiresAt?: Date;
  features: string[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Search and filter types
export interface PlaceFilters {
  category?: PlaceCategory;
  district?: string;
  city?: string;
  rating?: number;
  hasReviews?: boolean;
  isSponsored?: boolean;
  tags?: string[];
}

export interface SearchParams {
  query?: string;
  filters?: PlaceFilters;
  sortBy?: 'relevance' | 'rating' | 'distance' | 'newest';
  limit?: number;
  offset?: number;
}