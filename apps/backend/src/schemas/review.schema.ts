import { z } from 'zod';

export const createReviewSchema = z.object({
  placeId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
  userId: z.string(), // Required - from auth middleware
});

export const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().max(500).optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;