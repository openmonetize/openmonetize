import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import Redis from 'ioredis';
import { config } from './config';
import { registerRoutes } from './routes';
import { initializeQueue, closeQueue } from './queue';
import { logger } from './logger';
import { getPrismaClient } from '@openmonetize/common';

const db = getPrismaClient();

export async function buildServer() {
  const server = Fastify({
    logger: {
      level: config.nodeEnv === 'production' ? 'info' : 'debug',
      transport: config.nodeEnv === 'development' ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      } : undefined
    },
    requestIdHeader: 'x-request-id',
    requestIdLogLabel: 'reqId'
  });

  // Security & CORS
  await server.register(helmet, {
    contentSecurityPolicy: false // Allow flexibility for API usage
  });

  await server.register(cors, {
    origin: true,
    credentials: true
  });

  // Rate limiting with Redis
  const redisClient = new Redis(config.redisUrl);
  await server.register(rateLimit, {
    max: config.rateLimitMax,
    timeWindow: config.rateLimitWindow,
    redis: redisClient
  });

  // Health checks
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  server.get('/ready', async () => {
    try {
      // Check database connectivity
      await db.$queryRaw`SELECT 1`;

      return {
        status: 'ready',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected',
          queue: 'connected'
        }
      };
    } catch (error) {
      logger.error({ error }, 'Readiness check failed');
      return {
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        error: 'Service dependencies unavailable'
      };
    }
  });

  // Register API routes
  await registerRoutes(server);

  // Graceful shutdown
  const gracefulShutdown = async () => {
    logger.info('Shutting down gracefully...');
    await server.close();
    await closeQueue();
    await db.$disconnect();
    process.exit(0);
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  return server;
}

async function start() {
  try {
    // Initialize queue
    await initializeQueue();

    // Build and start server
    const server = await buildServer();
    await server.listen({
      port: config.port,
      host: config.host
    });

    logger.info(`🚀 Ingestion service running on ${config.host}:${config.port}`);
  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(1);
  }
}

// Only start if run directly (not imported)
if (require.main === module) {
  start();
}
