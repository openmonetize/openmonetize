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
