import { Hono } from 'hono';
import { PlaceService } from '../services/place.service';
import { ReviewService } from '../services/review.service';
import { createPlaceSchema, updatePlaceSchema, searchParamsSchema } from '../schemas/place.schema';
import { createReviewSchema, updateReviewSchema } from '../schemas/review.schema';
import { authMiddleware } from './auth';
import type { ApiResponse, PaginatedResponse } from '@shared/types';

const places = new Hono();
const placeService = new PlaceService();
const reviewService = new ReviewService();

// GET /places - List places with pagination and filters
places.get('/', async (c) => {
  try {
    const query = c.req.query();
    const params = searchParamsSchema.parse({
      query: query.q,
      filters: {
        category: query.category,
        district: query.district,
        city: query.city,
        rating: query.rating ? parseFloat(query.rating) : undefined,
        hasReviews: query.hasReviews === 'true',
        isSponsored: query.isSponsored === 'true',
        tags: query.tags ? query.tags.split(',') : undefined,
      },
      sortBy: query.sortBy,
      limit: query.limit ? parseInt(query.limit) : undefined,
      offset: query.offset ? parseInt(query.offset) : undefined,
    });

    const result = await placeService.findAll(params);

    return c.json<ApiResponse<PaginatedResponse<any>>>({
      success: true,
      data: result,
    });
  } catch (error) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Invalid query parameters',
    }, 400);
  }
});

// GET /places/:id - Get place by ID
places.get('/:id', async (c) => {
  const id = c.req.param('id');
  const place = await placeService.findById(id);

  if (!place) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Place not found',
    }, 404);
  }

  return c.json<ApiResponse<any>>({
    success: true,
    data: place,
  });
});

// GET /places/nearby - Find places nearby
places.get('/nearby', async (c) => {
  try {
    const lat = parseFloat(c.req.query('lat') || '0');
    const lng = parseFloat(c.req.query('lng') || '0');
    const radius = parseFloat(c.req.query('radius') || '5');

    if (!lat || !lng) {
      return c.json<ApiResponse<null>>({
        success: false,
        error: 'Latitude and longitude are required',
      }, 400);
    }

    const places = await placeService.findNearby(lat, lng, radius);

    return c.json<ApiResponse<any[]>>({
      success: true,
      data: places,
    });
  } catch (error) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Invalid parameters',
    }, 400);
  }
});

// POST /places - Create new place (admin only)
places.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const data = createPlaceSchema.parse(body);

    const place = await placeService.create(data);

    return c.json<ApiResponse<any>>({
      success: true,
      data: place,
    }, 201);
  } catch (error) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Invalid place data',
    }, 400);
  }
});

// PUT /places/:id - Update place (admin only)
places.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const data = updatePlaceSchema.parse(body);

    const place = await placeService.update(id, data);

    if (!place) {
      return c.json<ApiResponse<null>>({
        success: false,
        error: 'Place not found',
      }, 404);
    }

    return c.json<ApiResponse<any>>({
      success: true,
      data: place,
    });
  } catch (error) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Invalid place data',
    }, 400);
  }
});

// DELETE /places/:id - Delete place (admin only)
places.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const success = await placeService.delete(id);

  if (!success) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Place not found',
    }, 404);
  }

  return c.json<ApiResponse<null>>({
    success: true,
    message: 'Place deleted successfully',
  });
});

// GET /places/:id/reviews - Get reviews for a place
places.get('/:id/reviews', async (c) => {
  const placeId = c.req.param('id');
  const reviews = await reviewService.findByPlaceId(placeId);

  return c.json<ApiResponse<any[]>>({
    success: true,
    data: reviews,
  });
});

// POST /places/:id/reviews - Create review for a place (requires authentication)
places.post('/:id/reviews', authMiddleware, async (c) => {
  try {
    const placeId = c.req.param('id');
    const userId = c.get('userId'); // From authMiddleware
    const body = await c.req.json();
    const data = createReviewSchema.parse({ ...body, placeId, userId });

    const review = await reviewService.create(data);

    return c.json<ApiResponse<any>>({
      success: true,
      data: review,
    }, 201);
  } catch (error) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Invalid review data',
    }, 400);
  }
});

// PUT /places/:id/reviews/:reviewId - Update review
places.put('/:id/reviews/:reviewId', async (c) => {
  try {
    const reviewId = c.req.param('reviewId');
    const body = await c.req.json();
    const data = updateReviewSchema.parse(body);

    const review = await reviewService.update(reviewId, data);

    if (!review) {
      return c.json<ApiResponse<null>>({
        success: false,
        error: 'Review not found',
      }, 404);
    }

    return c.json<ApiResponse<any>>({
      success: true,
      data: review,
    });
  } catch (error) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Invalid review data',
    }, 400);
  }
});

// DELETE /places/:id/reviews/:reviewId - Delete review
places.delete('/:id/reviews/:reviewId', async (c) => {
  const reviewId = c.req.param('reviewId');
  const success = await reviewService.delete(reviewId);

  if (!success) {
    return c.json<ApiResponse<null>>({
      success: false,
      error: 'Review not found',
    }, 404);
  }

  return c.json<ApiResponse<null>>({
    success: true,
    message: 'Review deleted successfully',
  });
});

export { places };