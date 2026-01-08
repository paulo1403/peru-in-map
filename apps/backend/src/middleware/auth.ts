import type { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

type Variables = {
  userId: string;
  userEmail: string;
};

/**
 * Middleware para verificar que el usuario está autenticado
 */
export async function requireAuth(
  c: Context<{ Variables: Variables }>,
  next: Next,
) {
  try {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HTTPException(401, {
        message: 'No autorizado. Token requerido',
      });
    }

    const token = authHeader.substring(7);
    const decoded = verify(token, JWT_SECRET) as { userId: string; email: string };

    // Attach user info to context
    c.set('userId', decoded.userId);
    c.set('userEmail', decoded.email);

    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw new HTTPException(401, {
      message: 'Token inválido o expirado',
    });
  }
}
