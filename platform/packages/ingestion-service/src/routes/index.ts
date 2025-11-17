import { FastifyInstance } from 'fastify';
import { ingestEvents } from './ingest';

export async function registerRoutes(server: FastifyInstance) {
  // Event ingestion endpoint
  server.post('/v1/events/ingest', ingestEvents);

  // API version info
  server.get('/v1/info', async () => {
    return {
      service: 'ingestion-service',
      version: '0.1.0',
      endpoints: {
        health: '/health',
        ready: '/ready',
        ingest: '/v1/events/ingest'
      }
    };
  });
}
