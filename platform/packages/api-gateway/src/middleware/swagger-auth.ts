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

// Swagger authentication middleware
import { FastifyRequest, FastifyReply } from 'fastify';
import { config } from '../config';
import { authenticate } from './auth';
import { logger } from '../logger';

/**
 * Middleware to protect Swagger documentation endpoints
 * In production, requires API key authentication
 * In development, allows unrestricted access
 */
export async function swaggerAuth(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  // Skip auth in development or if not required
  if (!config.swagger.requireAuth) {
    logger.debug({ path: request.url }, 'Swagger auth not required, allowing access');
    return;
  }

  // In production, require authentication
  logger.debug({ path: request.url }, 'Swagger auth required, validating credentials');

  try {
    await authenticate(request, reply);
    logger.info(
      { customerId: (request as any).customer?.id, path: request.url },
      'Swagger access authenticated'
    );
  } catch (error) {
    logger.warn({ err: error, path: request.url }, 'Swagger auth failed');
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Authentication required to access API documentation. Provide valid API key via Authorization: Bearer <key> header.',
    });
  }
}
