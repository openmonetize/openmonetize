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

// Health check routes
import { FastifyInstance } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { logger } from '../logger';
import { config } from '../config';
import { withCommonResponses } from '../types/schemas';

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
  }, async (_request, reply) => {
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
      response: withCommonResponses({
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            checks: { type: 'object' },
            timestamp: { type: 'string' },
          },
        },
        503: {
          description: 'Service Unavailable - One or more dependencies are down',
          type: 'object',
          properties: {
            status: { type: 'string' },
            checks: { type: 'object' },
            timestamp: { type: 'string' },
          },
        },
      }, []),
    },
  }, async (_request, reply) => {
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
  }, async (_request, reply) => {
    return reply.send({
      service: 'api-gateway',
      version: '0.1.0',
      environment: config.nodeEnv,
      uptime: process.uptime(),
    });
  });
}
