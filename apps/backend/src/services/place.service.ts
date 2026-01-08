import { prisma } from '../lib/db';
import { logger } from '../lib/logger';
import type { Place, PlaceFilters, SearchParams } from '@shared/types';
import type { CreatePlaceInput, UpdatePlaceInput, PlaceFiltersInput, SearchParamsInput } from '../schemas/place.schema';

export class PlaceService {
  async findAll(params: SearchParamsInput = {}): Promise<{
    items: Place[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  }> {
    const { limit = 20, offset = 0, filters, sortBy = 'newest' } = params;

    const where = this.buildWhereClause(filters);

    const orderBy = this.buildOrderByClause(sortBy);

    const [places, total] = await Promise.all([
      prisma.place.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
        include: {
          _count: {
            select: { reviews: true },
          },
        },
      }),
      prisma.place.count({ where }),
    ]);

    // Calculate average rating
    const placesWithRating = await Promise.all(
      places.map(async (place) => {
        const avgRating = await prisma.review.aggregate({
          where: { placeId: place.id },
          _avg: { rating: true },
        });

        return {
          ...place,
          rating: avgRating._avg.rating || undefined,
          reviewCount: place._count.reviews,
        };
      })
    );

    return {
      items: placesWithRating,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      hasMore: offset + limit < total,
    };
  }

  async findById(id: string): Promise<Place | null> {
    const place = await prisma.place.findUnique({
      where: { id },
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!place) return null;

    const avgRating = await prisma.review.aggregate({
      where: { placeId: place.id },
      _avg: { rating: true },
    });

    return {
      ...place,
      rating: avgRating._avg.rating || undefined,
      reviewCount: place._count.reviews,
    };
  }

  async findNearby(lat: number, lng: number, radiusKm: number = 5): Promise<Place[]> {
    // Using PostGIS for geospatial queries
    const places = await prisma.$queryRaw<Place[]>`
      SELECT
        id, name, description, category, district, city,
        position, tags, "isSponsored", "createdAt", "updatedAt"
      FROM places
      WHERE ST_DWithin(
        position::geography,
        ST_MakePoint(${lng}, ${lat})::geography,
        ${radiusKm * 1000}
      )
      ORDER BY ST_Distance(
        position::geography,
        ST_MakePoint(${lng}, ${lat})::geography
      )
    `;

    return places;
  }

  async create(data: CreatePlaceInput): Promise<Place> {
    logger.info('Creating new place', { name: data.name });

    const place = await prisma.place.create({
      data: {
        ...data,
        position: { type: 'Point', coordinates: data.position },
      },
    });

    return {
      ...place,
      rating: undefined,
      reviewCount: 0,
    };
  }

  async update(id: string, data: UpdatePlaceInput): Promise<Place | null> {
    try {
      const place = await prisma.place.update({
        where: { id },
        data: {
          ...data,
          ...(data.position && {
            position: { type: 'Point', coordinates: data.position },
          }),
        },
        include: {
          _count: {
            select: { reviews: true },
          },
        },
      });

      const avgRating = await prisma.review.aggregate({
        where: { placeId: place.id },
        _avg: { rating: true },
      });

      return {
        ...place,
        rating: avgRating._avg.rating || undefined,
        reviewCount: place._count.reviews,
      };
    } catch (error) {
      logger.error('Failed to update place', { id, error });
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.place.delete({
        where: { id },
      });
      logger.info('Place deleted', { id });
      return true;
    } catch (error) {
      logger.error('Failed to delete place', { id, error });
      return false;
    }
  }

  private buildWhereClause(filters?: PlaceFiltersInput) {
    if (!filters) return {};

    const where: any = {};

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.district) {
      where.district = { contains: filters.district, mode: 'insensitive' };
    }

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.isSponsored !== undefined) {
      where.isSponsored = filters.isSponsored;
    }

    if (filters.tags && filters.tags.length > 0) {
      where.tags = { hasSome: filters.tags };
    }

    return where;
  }

  private buildOrderByClause(sortBy: string) {
    switch (sortBy) {
      case 'rating':
        return { rating: 'desc' as const };
      case 'newest':
        return { createdAt: 'desc' as const };
      case 'relevance':
      default:
        return { name: 'asc' as const };
    }
  }
}