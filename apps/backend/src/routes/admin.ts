import { Hono } from 'hono';
import { PlaceService } from '../services/place.service';
import { createPlaceSchema, updatePlaceSchema } from '../schemas/place.schema';
import type { ApiResponse } from '@shared/types';

const admin = new Hono();
const placeService = new PlaceService();

// POST /admin/places - Create new place
admin.post('/places', async (c) => {
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

// PUT /admin/places/:id - Update place
admin.put('/places/:id', async (c) => {
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

// DELETE /admin/places/:id - Delete place
admin.delete('/places/:id', async (c) => {
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

// POST /admin/places/:id/feature - Mark place as featured
admin.post('/places/:id/feature', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { featured } = body;

    const place = await placeService.update(id, { isSponsored: featured });

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
      error: 'Invalid request',
    }, 400);
  }
});

export { admin };