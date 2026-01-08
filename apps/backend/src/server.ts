import 'dotenv/config';
import { serve } from '@hono/node-server';
import app from './app';
import { validateEnv } from './config/env';
import { logger } from './lib/logger';

const env = validateEnv();

const port = env.PORT;

logger.info(`🚀 Starting QueHacer.pe API server on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

logger.info(`✅ Server running at http://localhost:${port}`);
logger.info(`📊 Health check at http://localhost:${port}/health`);