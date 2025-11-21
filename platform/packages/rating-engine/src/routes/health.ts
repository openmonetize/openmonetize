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

import { FastifyPluginAsync } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';

const db = getPrismaClient();

export const healthRoutes: FastifyPluginAsync = async (app) => {
  // Basic health check
  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  });

  // Readiness check with database
  app.get('/ready', async (_request, reply) => {
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
  app.get('/v1/info', async () => {
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
