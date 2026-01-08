import type { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { db } from '../lib/db';

type Variables = {
  userId: string;
};

/**
 * Middleware para verificar que el usuario autenticado es admin
 */
export async function requireAdmin(
  c: Context<{ Variables: Variables }>,
  next: Next,
) {
  const userId = c.get('userId');

  if (!userId) {
    throw new HTTPException(401, {
      message: 'No autenticado',
    });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user || user.role !== 'ADMIN') {
    throw new HTTPException(403, {
      message: 'No autorizado. Se requieren permisos de administrador',
    });
  }

  await next();
}
