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
