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

// Events routes
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getPrismaClient } from '@openmonetize/common';
import { authenticate } from '../middleware/auth';
import { logger } from '../logger';
import { withCommonResponses } from '../types/schemas';
import type { GetEventsRoute } from '../types/routes';

const db = getPrismaClient();

export const eventsRoutes: FastifyPluginAsyncZod = async (app) => {
  // Register authentication for all events routes
  app.addHook('preHandler', authenticate);

  // Get events
  app.get<GetEventsRoute>(
    '/v1/events',
    {
      schema: {
        tags: ['Events'],
        'x-visibility': 'public',
        description: 'Get usage events history',
        querystring: z.object({
          customerId: z.string().uuid().optional(),
          limit: z.coerce.number().min(1).max(100).default(50),
          offset: z.coerce.number().min(0).default(0),
        }),
        response: withCommonResponses({
          200: z.object({
            data: z.array(
              z.object({
                id: z.string(),
                eventType: z.string(),
                featureId: z.string(),
                provider: z.string().nullable(),
                model: z.string().nullable(),
                inputTokens: z.string().nullable(),
                outputTokens: z.string().nullable(),
                creditsBurned: z.string(),
                costUsd: z.string().nullable(),
                timestamp: z.string(),
                metadata: z.record(z.string(), z.unknown()).nullable(),
              })
            ),
            pagination: z.object({
              total: z.number(),
              limit: z.number(),
              offset: z.number(),
            }),
          }),
        }, [403, 500]),
      },
    },
    async (request, reply) => {
      try {
        const { customerId, limit, offset } = request.query;

        // Use authenticated customer's ID if customerId not provided
        const targetCustomerId = customerId || request.customer!.id;

        // Verify customer access
        if (targetCustomerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Get total count
        const total = await db.usageEvent.count({
          where: {
            customerId: targetCustomerId,
          },
        });

        // Get events
        const events = await db.usageEvent.findMany({
          where: {
            customerId: targetCustomerId,
          },
          orderBy: {
            timestamp: 'desc',
          },
          take: limit,
          skip: offset,
        });

        return reply.send({
          data: events.map((event) => ({
            id: event.id,
            eventType: event.eventType,
            featureId: event.featureId,
            provider: event.provider,
            model: event.model,
            inputTokens: event.inputTokens?.toString() ?? null,
            outputTokens: event.outputTokens?.toString() ?? null,
            creditsBurned: event.creditsBurned.toString(),
            costUsd: event.costUsd?.toFixed(10) ?? null,
            timestamp: event.timestamp.toISOString(),
            metadata: (event.metadata as Record<string, unknown>) ?? null,
          })),
          pagination: {
            total,
            limit,
            offset,
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching events');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch events',
        });
      }
    }
  );
};
