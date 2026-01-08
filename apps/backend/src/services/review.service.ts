import { prisma } from '../lib/db';
import { logger } from '../lib/logger';
import type { Review } from '@shared/types';
import type { CreateReviewInput, UpdateReviewInput } from '../schemas/review.schema';

export class ReviewService {
  async findByPlaceId(placeId: string): Promise<Review[]> {
    return prisma.review.findMany({
      where: { placeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateReviewInput): Promise<Review> {
    logger.info('Creating new review', { placeId: data.placeId, rating: data.rating });

    const review = await prisma.review.create({
      data,
    });

    // Update place rating after creating review
    await this.updatePlaceRating(data.placeId);

    return review;
  }

  async update(id: string, data: UpdateReviewInput): Promise<Review | null> {
    try {
      const review = await prisma.review.update({
        where: { id },
        data,
      });

      // Update place rating after updating review
      await this.updatePlaceRating(review.placeId);

      return review;
    } catch (error) {
      logger.error('Failed to update review', { id, error });
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const review = await prisma.review.findUnique({
        where: { id },
        select: { placeId: true },
      });

      if (!review) return false;

      await prisma.review.delete({
        where: { id },
      });

      // Update place rating after deleting review
      await this.updatePlaceRating(review.placeId);

      logger.info('Review deleted', { id });
      return true;
    } catch (error) {
      logger.error('Failed to delete review', { id, error });
      return false;
    }
  }

  private async updatePlaceRating(placeId: string): Promise<void> {
    const avgRating = await prisma.review.aggregate({
      where: { placeId },
      _avg: { rating: true },
    });

    await prisma.place.update({
      where: { id: placeId },
      data: {
        rating: avgRating._avg.rating || 0,
      },
    });
  }
}