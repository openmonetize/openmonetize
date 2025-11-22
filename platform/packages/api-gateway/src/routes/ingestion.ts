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

// Ingestion Service proxy routes
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { config } from '../config';
import { authenticate } from '../middleware/auth';
import { logger } from '../logger';
import { withCommonResponses } from '../types/schemas';
import type { IngestEventsRoute, ReplayDLQRoute } from '../types/routes';

// Event schema matching Ingestion Service
const EventSchema = z.object({
  event_id: z.string().uuid(),
  customer_id: z.string(),
  user_id: z.string().optional(),
  team_id: z.string().optional(),
  event_type: z.enum(['TOKEN_USAGE', 'API_CALL', 'FEATURE_ACCESS', 'IMAGE_GENERATION', 'CUSTOM']),
  feature_id: z.string(),
  provider: z.enum(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'COHERE', 'MISTRAL']).optional(),
  model: z.string().optional(),
  input_tokens: z.number().int().nonnegative().optional(),
  output_tokens: z.number().int().nonnegative().optional(),
  image_count: z.number().int().positive().optional(),
  image_size: z.string().optional(),
  quality: z.string().optional(),
  unit_type: z.string().optional(),
  quantity: z.number().positive().optional(),
  timestamp: z.string().datetime().or(z.date()),
  metadata: z.record(z.unknown()).optional(),
  idempotency_key: z.string().optional(),
});

const BatchSchema = z.object({
  events: z.array(EventSchema).min(1).max(1000),
});

export const ingestionRoutes: FastifyPluginAsyncZod = async (app) => {
  // Register authentication for all ingestion routes
  app.addHook('preHandler', authenticate);

  // Ingest events
  app.post<IngestEventsRoute>(
    '/v1/events/ingest',
    {
      schema: {
        tags: ['Events'],
        description: 'Ingest a batch of usage events',
        body: BatchSchema,
        response: withCommonResponses({
          202: z.object({
            accepted: z.number(),
            rejected: z.number(),
            duplicates: z.number(),
            batch_id: z.string().nullable(),
            status: z.string(),
            processing_time_ms: z.number(),
          }),
          200: z.object({
            accepted: z.number(),
            rejected: z.number(),
            duplicates: z.number(),
            batch_id: z.string().nullable(),
            status: z.string(),
            message: z.string(),
          }),
        }, [400, 401, 403, 500]),
      },
    },
    async (request, reply) => {
      try {
        // Forward to Ingestion Service
        // We use the internal service URL
        const response = await fetch(`${config.services.ingestion.url}/v1/events/ingest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': request.headers['x-api-key'] as string || '', // Pass original API key if present
            // Or we could pass the customer ID if the service trusted us, but it validates API key.
            // Since we are authenticated here, we know the API key is valid (if Bearer).
            // If Bearer, we might need to extract the key or rely on internal trust.
            // The ingestion service checks 'x-api-key'.
            // If the user used Bearer token, we don't have the raw API key easily unless we stored it.
            // But wait, `authenticate` middleware attaches `request.customer`.
            // Does it attach the key? No, usually just the customer object.
            // However, for the demo/proxy to work, we might need to pass the key.
            // If the user authenticated with `x-api-key`, we have it.
            // If they used Bearer, we might not have the raw key if it was a JWT (but here it's likely the API key itself as Bearer).
            // Let's assume we pass what we have.
            ...(request.headers['authorization'] ? { 'Authorization': request.headers['authorization'] } : {}),
          },
          body: JSON.stringify(request.body),
        });

        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, 'Error proxying to ingestion service');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to ingest events',
        });
      }
    }
  );

  // Get DLQ items
  app.get(
    '/v1/events/dlq',
    {
      schema: {
        tags: ['Events'],
        description: 'Get Dead Letter Queue items (failed events)',
        response: withCommonResponses({
          200: z.object({
            counts: z.record(z.number()),
            items: z.array(
              z.object({
                id: z.string().optional(),
                name: z.string().optional(),
                data: z.any(),
                timestamp: z.number().optional(),
                failedReason: z.string().optional(),
              })
            ),
          }),
        }, [403, 500]),
      },
    },
    async (_request, reply) => {
      try {
        const response = await fetch(`${config.services.ingestion.url}/v1/events/dlq`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, 'Error proxying to ingestion service DLQ');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to get DLQ items',
        });
      }
    }
  );

  // Replay DLQ items
  app.post<ReplayDLQRoute>(
    '/v1/events/dlq/replay',
    {
      schema: {
        tags: ['Events'],
        description: 'Replay failed events from DLQ',
        body: z.object({
          jobIds: z.array(z.string()).optional(),
        }),
        response: withCommonResponses({
          200: z.object({
            message: z.string(),
            count: z.number(),
          }),
        }, [403, 500]),
      },
    },
    async (request, reply) => {
      try {
        const response = await fetch(`${config.services.ingestion.url}/v1/events/dlq/replay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request.body),
        });

        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, 'Error proxying to ingestion service replay');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to replay DLQ items',
        });
      }
    }
  );

  // Service Info
  app.get(
    '/v1/events/info',
    {
      schema: {
        tags: ['Events'],
        description: 'Get ingestion service information',
        response: withCommonResponses({
          200: z.object({
            status: z.string(),
            timestamp: z.string(),
            services: z.record(z.string()).optional(),
          }),
        }, [403, 500]),
      },
    },
    async (_request, reply) => {
      try {
        // Mapping to /ready of ingestion service which returns status info
        const response = await fetch(`${config.services.ingestion.url}/ready`, {
          method: 'GET',
        });

        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, 'Error proxying to ingestion service info');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to get service info',
        });
      }
    }
  );
};
