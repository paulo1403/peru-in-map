import { z } from 'zod';

export const placeCategorySchema = z.enum([
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
]);

export const createPlaceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: placeCategorySchema,
  district: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  position: z.tuple([z.number(), z.number()]), // [lat, lng]
  tags: z.array(z.string()).optional(),
  isSponsored: z.boolean().optional(),
});

export const updatePlaceSchema = createPlaceSchema.partial();

export const placeFiltersSchema = z.object({
  category: placeCategorySchema.optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  hasReviews: z.boolean().optional(),
  isSponsored: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const searchParamsSchema = z.object({
  query: z.string().optional(),
  filters: placeFiltersSchema.optional(),
  sortBy: z.enum(['relevance', 'rating', 'distance', 'newest']).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
});

export type CreatePlaceInput = z.infer<typeof createPlaceSchema>;
export type UpdatePlaceInput = z.infer<typeof updatePlaceSchema>;
export type PlaceFiltersInput = z.infer<typeof placeFiltersSchema>;
export type SearchParamsInput = z.infer<typeof searchParamsSchema>;