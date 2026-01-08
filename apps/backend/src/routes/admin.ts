import { Hono } from 'hono';
import { z } from 'zod';
import { db } from '../lib/db';
import { requireAuth } from '../middleware/auth';
import { requireAdmin } from '../middleware/admin';

type Variables = {
  userId: string;
};

const admin = new Hono<{ Variables: Variables }>();

// Middleware: todas las rutas admin requieren autenticación y rol admin
admin.use('*', requireAuth, requireAdmin);

// Schema de validación para lugares
const placeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  category: z.enum([
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
  ]),
  district: z.string().min(1, 'El distrito es requerido'),
  city: z.string().min(1, 'La ciudad es requerida'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  tags: z.array(z.string()).default([]),
  isSponsored: z.boolean().default(false),
});

// GET /admin/places - Listar todos los lugares (con paginación)
admin.get('/places', async (c) => {
  const page = Number.parseInt(c.req.query('page') || '1');
  const limit = Number.parseInt(c.req.query('limit') || '20');
  const search = c.req.query('search') || '';
  const category = c.req.query('category');

  const skip = (page - 1) * limit;

  const where = {
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            {
              description: { contains: search, mode: 'insensitive' as const },
            },
          ],
        }
      : {}),
    ...(category ? { category } : {}),
  };

  const [places, total] = await Promise.all([
    db.place.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { reviews: true },
        },
      },
    }),
    db.place.count({ where }),
  ]);

  return c.json({
    places,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// GET /admin/places/:id - Obtener un lugar específico
admin.get('/places/:id', async (c) => {
  const { id } = c.req.param();

  const place = await db.place.findUnique({
    where: { id },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: { reviews: true },
      },
    },
  });

  if (!place) {
    return c.json({ error: 'Lugar no encontrado' }, 404);
  }

  return c.json(place);
});

// POST /admin/places - Crear un nuevo lugar
admin.post('/places', async (c) => {
  const body = await c.req.json();
  const result = placeSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      {
        error: 'Datos inválidos',
        details: result.error.flatten(),
      },
      400,
    );
  }

  const { latitude, longitude, ...data } = result.data;

  const place = await db.place.create({
    data: {
      ...data,
      position: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    },
  });

  return c.json(place, 201);
});

// PUT /admin/places/:id - Actualizar un lugar
admin.put('/places/:id', async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();
  const result = placeSchema.partial().safeParse(body);

  if (!result.success) {
    return c.json(
      {
        error: 'Datos inválidos',
        details: result.error.flatten(),
      },
      400,
    );
  }

  const existingPlace = await db.place.findUnique({
    where: { id },
  });

  if (!existingPlace) {
    return c.json({ error: 'Lugar no encontrado' }, 404);
  }

  const { latitude, longitude, ...data } = result.data;

  const updateData: {
    name?: string;
    description?: string;
    category?: string;
    district?: string;
    city?: string;
    tags?: string[];
    isSponsored?: boolean;
    position?: { type: string; coordinates: [number, number] };
  } = { ...data };

  if (latitude !== undefined && longitude !== undefined) {
    updateData.position = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
  }

  const place = await db.place.update({
    where: { id },
    data: updateData,
  });

  return c.json(place);
});

// DELETE /admin/places/:id - Eliminar un lugar
admin.delete('/places/:id', async (c) => {
  const { id } = c.req.param();

  const existingPlace = await db.place.findUnique({
    where: { id },
  });

  if (!existingPlace) {
    return c.json({ error: 'Lugar no encontrado' }, 404);
  }

  await db.place.delete({
    where: { id },
  });

  return c.json({ message: 'Lugar eliminado correctamente' });
});

// GET /admin/stats - Estadísticas del panel admin
admin.get('/stats', async (c) => {
  const [totalPlaces, totalUsers, totalReviews, sponsoredPlaces] =
    await Promise.all([
      db.place.count(),
      db.user.count(),
      db.review.count(),
      db.place.count({ where: { isSponsored: true } }),
    ]);

  return c.json({
    totalPlaces,
    totalUsers,
    totalReviews,
    sponsoredPlaces,
  });
});

export { admin };