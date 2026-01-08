import { Hono } from 'hono';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { authMiddleware } from './auth';

type Variables = {
  userId: string;
};

export const profile = new Hono<{ Variables: Variables }>();

// Schema de actualización de perfil
const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  avatar: z.string().url().optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  birthDate: z.string().datetime().optional().nullable(),
  website: z.string().url().optional().nullable(),
  instagram: z.string().max(50).optional().nullable(),
  interests: z.array(z.string()).optional(),
});

// GET /profile/me - Obtener perfil del usuario autenticado
profile.get('/me', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!user) {
      return c.json({ error: 'Usuario no encontrado' }, 404);
    }

    // Excluir el password de la respuesta
    const { password, ...userWithoutPassword } = user;

    return c.json({
      success: true,
      data: {
        ...userWithoutPassword,
        reviewCount: user._count.reviews,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Error al obtener perfil' }, 500);
  }
});

// PUT /profile/me - Actualizar perfil del usuario autenticado
profile.put('/me', authMiddleware, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const data = updateProfileSchema.parse(body);

    // Convertir birthDate de string a Date si existe
    const updateData: any = { ...data };
    if (data.birthDate) {
      updateData.birthDate = new Date(data.birthDate);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Excluir el password de la respuesta
    const { password, ...userWithoutPassword } = user;

    return c.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Datos inválidos', details: error.errors }, 400);
    }
    console.error('Update profile error:', error);
    return c.json({ error: 'Error al actualizar perfil' }, 500);
  }
});

// GET /profile/:id - Obtener perfil público de un usuario
profile.get('/:id', async (c) => {
  try {
    const userId = c.req.param('id');

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            place: {
              select: {
                id: true,
                name: true,
                category: true,
                district: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10, // Últimas 10 reseñas
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!user) {
      return c.json({ error: 'Usuario no encontrado' }, 404);
    }

    // Excluir campos privados
    const { password, email, ...publicProfile } = user;

    return c.json({
      success: true,
      data: {
        ...publicProfile,
        reviewCount: user._count.reviews,
      },
    });
  } catch (error) {
    console.error('Get public profile error:', error);
    return c.json({ error: 'Error al obtener perfil' }, 500);
  }
});
