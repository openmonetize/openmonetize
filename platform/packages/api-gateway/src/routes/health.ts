// Health check routes
import { FastifyInstance } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { logger } from '../logger';
import { config } from '../config';

const db = getPrismaClient();

export async function healthRoutes(app: FastifyInstance) {
  // Basic health check
  app.get('/health', {
    schema: {
      tags: ['Health'],
      description: 'Basic health check endpoint',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });

  // Readiness check (includes dependencies)
  app.get('/ready', {
    schema: {
      tags: ['Health'],
      description: 'Readiness check including database connectivity',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            checks: { type: 'object' },
            timestamp: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const checks: Record<string, boolean> = {};

    // Check database
    try {
      await db.$queryRaw`SELECT 1`;
      checks.database = true;
    } catch (error) {
      logger.error({ err: error }, 'Database health check failed');
      checks.database = false;
    }

    // Check Ingestion Service
    try {
      const response = await fetch(`${config.services.ingestion.url}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      checks.ingestionService = response.ok;
    } catch (error) {
      logger.error({ err: error }, 'Ingestion service health check failed');
      checks.ingestionService = false;
    }

    // Check Rating Engine
    try {
      const response = await fetch(`${config.services.rating.url}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      checks.ratingEngine = response.ok;
    } catch (error) {
      logger.error({ err: error }, 'Rating engine health check failed');
      checks.ratingEngine = false;
    }

    const allHealthy = Object.values(checks).every((check) => check === true);

    return reply.status(allHealthy ? 200 : 503).send({
      status: allHealthy ? 'ready' : 'degraded',
      checks,
      timestamp: new Date().toISOString(),
    });
  });

  // Service information
  app.get('/v1/info', {
    schema: {
      tags: ['Health'],
      description: 'API Gateway information and version',
      response: {
        200: {
          type: 'object',
          properties: {
            service: { type: 'string' },
            version: { type: 'string' },
            environment: { type: 'string' },
            uptime: { type: 'number' },
          },
        },
      },
    },
  }, async (request, reply) => {
    return reply.send({
      service: 'api-gateway',
      version: '0.1.0',
      environment: config.nodeEnv,
      uptime: process.uptime(),
    });
  });
}
