// Rating Engine proxy routes
import { FastifyInstance } from 'fastify';
import proxy from '@fastify/http-proxy';
import { config } from '../config';
import { authenticate } from '../middleware/auth';

export async function ratingRoutes(app: FastifyInstance) {
  // Register authentication for all rating routes
  app.addHook('preHandler', authenticate);

  // Proxy all /v1/rating/* requests to rating engine
  await app.register(proxy, {
    upstream: config.services.rating.url,
    prefix: '/v1/rating',
    http2: false,
    rewritePrefix: '/v1/rating',
    proxyPayloads: true,
  });

  // Proxy all /v1/burn-tables/* requests to rating engine
  await app.register(proxy, {
    upstream: config.services.rating.url,
    prefix: '/v1/burn-tables',
    http2: false,
    rewritePrefix: '/v1/burn-tables',
    proxyPayloads: true,
  });

  // Proxy all /v1/analytics/* requests to rating engine
  await app.register(proxy, {
    upstream: config.services.rating.url,
    prefix: '/v1/analytics',
    http2: false,
    rewritePrefix: '/v1/analytics',
    proxyPayloads: true,
  });
}
