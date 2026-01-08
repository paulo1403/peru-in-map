import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { places } from './routes/places';
import { admin } from './routes/admin';
import { auth } from './routes/auth';
import { profile } from './routes/profile';
import { validateEnv } from './config/env';

const env = validateEnv();

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: (origin) => {
    // En desarrollo, permitir cualquier puerto de localhost
    if (env.NODE_ENV === 'development' && origin?.startsWith('http://localhost:')) {
      return origin;
    }
    // En producción, usar CORS_ORIGIN específico
    return env.CORS_ORIGIN;
  },
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use('*', logger());

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.route('/api/auth', auth);
app.route('/api/profile', profile);
app.route('/api/places', places);
app.route('/api/admin', admin);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;