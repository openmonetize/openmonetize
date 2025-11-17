// Health check routes

import { FastifyPluginAsync } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';

const db = getPrismaClient();

export const healthRoutes: FastifyPluginAsync = async (app) => {
  // Basic health check
  app.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  });

  // Readiness check with database
  app.get('/ready', async (request, reply) => {
    try {
      await db.$queryRaw`SELECT 1`;

      return {
        status: 'ready',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected'
        }
      };
    } catch (error) {
      reply.code(503);
      return {
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        services: {
          database: 'disconnected'
        }
      };
    }
  });

  // Service info
  app.get('/v1/info', async (request, reply) => {
    return {
      service: 'rating-engine',
      version: '0.1.0',
      endpoints: {
        health: '/health',
        ready: '/ready',
        burnTables: '/v1/burn-tables',
        costCalculation: '/v1/rating/calculate',
        analytics: '/v1/analytics'
      }
    };
  });
};
