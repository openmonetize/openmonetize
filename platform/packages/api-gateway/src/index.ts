/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// API Gateway - Unified entry point for OpenMonetize Platform
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { config } from './config';
import { logger } from './logger';
import { getPrismaClient } from '@openmonetize/common';
import Redis from 'ioredis';
import { getSwaggerServers, getSwaggerDescription } from './utils/swagger-config';
import { authenticate } from './middleware/auth';
import fs from 'fs/promises';
import path from 'path';

// Import routes
import { healthRoutes } from './routes/health';
import { customersRoutes } from './routes/customers';
import { ingestionRoutes } from './routes/ingestion';
import { ratingRoutes } from './routes/rating';
import { creditsRoutes } from './routes/credits';
import { entitlementsRoutes } from './routes/entitlements';
import { analyticsRoutes } from './routes/analytics';
import { sandboxRoutes } from './routes/apiconsole';
import { authRoutes } from './routes/auth';

const db = getPrismaClient();
const redis = new Redis(config.redis.url);

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: 'info'
    },
    requestIdLogLabel: 'reqId',
    disableRequestLogging: false,
    requestIdHeader: 'x-request-id',
    bodyLimit: 10485760, // 10MB
  }).withTypeProvider<ZodTypeProvider>();

  // Set validator and serializer compilers
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

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

  // Register documentation routes (environment-based)
  if (config.nodeEnv === 'production') {
    // Production: Serve internal Redoc docs with authentication
    logger.info('Production mode: Redirecting /docs to public CDN, serving /docs/internal with auth');

    // Redirect public docs to CDN
    app.get('/docs', async (_request, reply) => {
      const publicDocsUrl = process.env.PUBLIC_DOCS_URL || 'https://docs.openmonetize.io';
      return reply.redirect(publicDocsUrl, 301);
    });

    // Serve internal documentation (Redoc HTML) with authentication
    app.get('/docs/internal', { preHandler: authenticate }, async (_request, reply) => {
      try {
        const html = await fs.readFile(
          path.join(__dirname, 'docs', 'internal.html'),
          'utf-8'
        );
        return reply.type('text/html').send(html);
      } catch (error) {
        logger.error({ err: error }, 'Failed to serve internal docs');
        return reply.status(404).send({
          error: 'Not Found',
          message: 'Internal documentation not found. Run `pnpm build` to generate docs.',
        });
      }
    });

    // Serve internal OpenAPI spec JSON with authentication
    app.get('/docs/internal/spec', { preHandler: authenticate }, async (_request, reply) => {
      try {
        const spec = await fs.readFile(
          path.join(__dirname, 'docs', 'openapi-internal.json'),
          'utf-8'
        );
        return reply.type('application/json').send(spec);
      } catch (error) {
        logger.error({ err: error }, 'Failed to serve internal spec');
        return reply.status(404).send({
          error: 'Not Found',
          message: 'Internal API spec not found. Run `pnpm build` to generate docs.',
        });
      }
    });

    logger.info('Internal documentation available at /docs/internal (authenticated)');
  } else {
    // Development: Keep Swagger UI for interactive testing
    if (config.swagger.enabled) {
      try {
        logger.info('Development mode: Registering interactive Swagger UI at /docs');

        await app.register(swagger, {
          openapi: {
            info: {
              title: config.swagger.title,
              description: getSwaggerDescription(),
              version: config.swagger.version,
              contact: {
                name: 'OpenMonetize',
                url: 'https://github.com/openmonetize/openmonetize',
              },
              license: {
                name: 'AGPL-3.0',
                url: 'https://www.gnu.org/licenses/agpl-3.0.html',
              },
            },
            servers: getSwaggerServers(),
            tags: [
              {
                name: 'Health',
                description: 'System health and readiness checks',
              },
              {
                name: 'Customers',
                description: 'Customer account management and registration',
              },
              {
                name: 'Events',
                description: 'Usage event ingestion and tracking. Ingests AI consumption events (token usage, API calls, etc.) for billing and analytics.',
              },
              {
                name: 'Credits',
                description: 'Credit wallet management. Purchase, grant, and track credit balances for consumption-based billing.',
              },
              {
                name: 'Entitlements',
                description: 'Feature access control and entitlement management. Gate features based on customer tier or credit balance.',
              },
              {
                name: 'Analytics',
                description: 'Usage analytics and cost analysis. Track consumption patterns, burn rates, and cost breakdowns.',
              },
              {
                name: 'Rating',
                description: 'Cost calculation engine. Calculate credits and USD costs for AI operations based on pricing tables.',
              },
              {
                name: 'Burn Tables',
                description: 'Pricing configuration. Define credit costs per 1K tokens for different AI models and providers.',
              },
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
          transform: jsonSchemaTransform,
        });

        await app.register(swaggerUi, {
          routePrefix: '/docs',
          uiConfig: {
            docExpansion: 'list',
            deepLinking: true,
            persistAuthorization: true,
          },
          staticCSP: true,
          transformStaticCSP: (header) => header,
        });

        logger.info({ url: `http://localhost:${config.port}/docs` }, 'Swagger UI available (development)');
      } catch (error) {
        logger.error({ err: error }, 'Failed to register Swagger documentation');
      }
    } else {
      logger.info('Swagger documentation disabled');
    }
  }

  // Register routes (order matters for proxies)
  await app.register(healthRoutes); // No prefix - health routes
  await app.register(customersRoutes); // Customer management (registration is public)
  await app.register(authRoutes); // Authentication routes
  await app.register(creditsRoutes); // Direct routes
  await app.register(entitlementsRoutes); // Direct routes
  await app.register(analyticsRoutes); // Direct routes
  await app.register(ingestionRoutes); // Proxy routes (must be after direct routes)
  await app.register(ratingRoutes); // Proxy routes (must be after direct routes)
  await app.register(sandboxRoutes); // Sandbox routes

  // Global error handler
  app.setErrorHandler((error, request, reply) => {
    const err = error as any;
    logger.error({ err, reqId: request.id }, 'Request error');

    // Handle rate limit errors
    if (err.statusCode === 429) {
      return reply.status(429).send({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
      });
    }

    // Handle Fastify validation errors
    if (err.validation) {
      return reply.status(400).send({
        error: 'Validation Error',
        message: err.message,
        details: err.validation,
      });
    }

    // Generic error
    return reply.status(err.statusCode || 500).send({
      error: err.name || 'Internal Server Error',
      message: err.message || 'An unexpected error occurred',
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

  return app;
}

async function start() {
  try {
    const app = await buildApp();

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

// Only run start if this file is the main module
// In ES modules, we check import.meta.url or similar, but here we are using tsx/node
// CommonJS check: require.main === module
// ESM check: process.argv[1] === fileURLToPath(import.meta.url)
// Since we use tsx, let's check if it's being run directly.
// A simple way is to check if we are being imported.
// But for now, let's just call start() if not imported.
// However, in ESM, detecting main module is tricky.
// We can export start and call it in a separate entry point, or just call it here.
// If we import this file, it will run start(). That's bad.
// We should move start() to a separate file or use a check.
// Let's assume we are running with tsx which supports CJS-style require.main === module if configured, or just use a separate entry point.
// But to avoid breaking existing scripts, I'll use a check.

// CommonJS check
if (require.main === module) {
  start();
}
