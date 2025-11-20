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

// Rating Engine Service
// Handles burn table management, cost calculations, and analytics

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { config } from './config';
import { logger } from './logger';
import { getPrismaClient } from '@openmonetize/common';

// Import routes
import { burnTableRoutes } from './routes/burn-tables';
import { costCalculationRoutes } from './routes/cost-calculation';
import { analyticsRoutes } from './routes/analytics';
import { healthRoutes } from './routes/health';
import { creditsRoutes } from './routes/credits';

const db = getPrismaClient();

async function start() {
  const app = Fastify({
    logger: true,
    requestIdLogLabel: 'reqId',
    disableRequestLogging: false,
    requestIdHeader: 'x-request-id'
  });

  // Register plugins
  await app.register(cors, {
    origin: config.cors.origin,
    credentials: true
  });

  await app.register(helmet, {
    contentSecurityPolicy: false
  });

  // Register routes
  await app.register(healthRoutes);
  await app.register(burnTableRoutes, { prefix: '/v1/burn-tables' });
  await app.register(costCalculationRoutes, { prefix: '/v1/rating' });
  await app.register(analyticsRoutes, { prefix: '/v1/analytics' });
  await app.register(creditsRoutes, { prefix: '/v1/credits' });

  // Graceful shutdown
  const signals = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      logger.info(`Received ${signal}, shutting down gracefully...`);
      await app.close();
      await db.$disconnect();
      process.exit(0);
    });
  }

  try {
    // Test database connection
    await db.$queryRaw`SELECT 1`;
    logger.info('Database connection established');

    // Start server
    await app.listen({
      port: config.port,
      host: config.host
    });

    logger.info(`🚀 Rating Engine running on ${config.host}:${config.port}`);
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
}

start();
