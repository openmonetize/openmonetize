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

import { FastifyInstance } from 'fastify';
import { ingestEvents } from './ingest';
import { getDLQItems, replayDLQ } from './dlq';

export async function registerRoutes(server: FastifyInstance) {
  // Event ingestion endpoint
  server.post('/v1/events/ingest', ingestEvents);

  // DLQ Management
  server.get('/v1/events/dlq', getDLQItems);
  server.post('/v1/events/dlq/replay', replayDLQ);

  // API version info
  server.get('/v1/info', async () => {
    return {
      service: 'ingestion-service',
      version: '0.1.0',
      endpoints: {
        health: '/health',
        ready: '/ready',
        ingest: '/v1/events/ingest',
        dlq: '/v1/events/dlq'
      }
    };
  });
}
