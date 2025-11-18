// API Gateway - Unified entry point for OpenMonetize Platform
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { config } from './config';
import { logger } from './logger';
import { getPrismaClient } from '@openmonetize/common';
import Redis from 'ioredis';

// Import routes
import { healthRoutes } from './routes/health';
import { customersRoutes } from './routes/customers';
import { ingestionRoutes } from './routes/ingestion';
import { ratingRoutes } from './routes/rating';
import { creditsRoutes } from './routes/credits';
import { entitlementsRoutes } from './routes/entitlements';
import { analyticsRoutes } from './routes/analytics';

const db = getPrismaClient();
const redis = new Redis(config.redis.url);

async function start() {
  const app = Fastify({
    logger: {
      level: 'info'
    },
    requestIdLogLabel: 'reqId',
    disableRequestLogging: false,
    requestIdHeader: 'x-request-id',
    bodyLimit: 10485760, // 10MB
  });

  // Register CORS
  await app.register(cors, {
    origin: config.cors.origin,
    credentials: true,
  });

  // Register security headers
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  // Register rate limiting (Redis-backed)
  await app.register(rateLimit, {
    max: config.rateLimit.max,
    timeWindow: config.rateLimit.timeWindow,
    redis,
    keyGenerator: (request) => {
      // Rate limit by API key (customer ID)
      // Try Authorization: Bearer header first
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
      }
      // Try X-API-Key header
      const apiKeyHeader = request.headers['x-api-key'];
      if (typeof apiKeyHeader === 'string') {
        return apiKeyHeader;
      }
      // Fallback to IP address
      return request.ip;
    },
  });

  // Register Swagger documentation
  await app.register(swagger, {
    openapi: {
      info: {
        title: config.swagger.title,
        description: config.swagger.description,
        version: config.swagger.version,
      },
      servers: [
        {
          url: `http://localhost:${config.port}`,
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'Health', description: 'Health check endpoints' },
        { name: 'Events', description: 'Event ingestion (proxied to ingestion service)' },
        { name: 'Rating', description: 'Cost calculation (proxied to rating engine)' },
        { name: 'Burn Tables', description: 'Pricing configuration (proxied to rating engine)' },
        { name: 'Analytics', description: 'Usage analytics (proxied to rating engine)' },
        { name: 'Credits', description: 'Credit management' },
        { name: 'Entitlements', description: 'Feature access control' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'API Key',
            description: 'API key authentication (Format: Bearer <your-api-key>)',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });

  // Register Swagger UI
  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  // Register routes (order matters for proxies)
  await app.register(healthRoutes); // No prefix - health routes
  await app.register(customersRoutes); // Customer management (registration is public)
  await app.register(creditsRoutes); // Direct routes
  await app.register(entitlementsRoutes); // Direct routes
  await app.register(analyticsRoutes); // Direct routes
  await app.register(ingestionRoutes); // Proxy routes (must be after direct routes)
  await app.register(ratingRoutes); // Proxy routes (must be after direct routes)

  // Global error handler
  app.setErrorHandler((error, request, reply) => {
    logger.error({ err: error, reqId: request.id }, 'Request error');

    // Handle rate limit errors
    if (error.statusCode === 429) {
      return reply.status(429).send({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
      });
    }

    // Handle Fastify validation errors
    if (error.validation) {
      return reply.status(400).send({
        error: 'Validation Error',
        message: error.message,
        details: error.validation,
      });
    }

    // Generic error
    return reply.status(error.statusCode || 500).send({
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    });
  });

  // Graceful shutdown
  const signals = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      logger.info(`Received ${signal}, shutting down gracefully...`);
      await app.close();
      await db.$disconnect();
      await redis.quit();
      process.exit(0);
    });
  }

  try {
    // Test database connection
    await db.$queryRaw`SELECT 1`;
    logger.info('Database connection established');

    // Test Redis connection
    await redis.ping();
    logger.info('Redis connection established');

    // Start server
    await app.listen({
      port: config.port,
      host: config.host,
    });

    logger.info(`🚀 API Gateway running on ${config.host}:${config.port}`);
    logger.info(`📖 API Documentation: http://${config.host}:${config.port}/docs`);
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
}

start();
