// Ingestion Service proxy routes
import { FastifyInstance } from 'fastify';
import proxy from '@fastify/http-proxy';
import { config } from '../config';
import { authenticate } from '../middleware/auth';

export async function ingestionRoutes(app: FastifyInstance) {
  // Register authentication for all ingestion routes
  app.addHook('preHandler', authenticate);

  // Proxy all /v1/events/* requests to ingestion service
  await app.register(proxy, {
    upstream: config.services.ingestion.url,
    prefix: '/v1/events',
    http2: false,
    rewritePrefix: '/v1/events',
    proxyPayloads: true,
  });
}
