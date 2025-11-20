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
import { z } from 'zod';
import { creditService } from '../services/credit.service';

const deductSchema = z.object({
  customerId: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
  metadata: z.any().optional()
});

export async function creditsRoutes(fastify: FastifyInstance) {
  fastify.post('/deduct', async (request, reply) => {
    try {
      const body = deductSchema.parse(request.body);
      const result = await creditService.deductCredits(
        body.customerId,
        body.amount,
        body.description,
        body.metadata
      );
      return result;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: error.errors });
      } else if (error.message === 'Insufficient credits') {
        return reply.status(402).send({ error: 'Insufficient credits' });
      } else if (error.message.includes('not found')) {
        return reply.status(404).send({ error: error.message });
      } else {
        return reply.status(500).send({ error: error.message });
      }
    }
  });
}
