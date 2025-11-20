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

// Cost Calculation Routes (Refactored with Service Layer)

import { FastifyPluginAsync } from 'fastify';
import { getPrismaClient, ProviderName } from '@openmonetize/common';
import { z } from 'zod';
import { logger } from '../logger';
import { costCalculatorService } from '../services';

const db = getPrismaClient();

// Validation schemas
const calculateCostSchema = z.object({
  customerId: z.string().uuid(),
  provider: z.nativeEnum(ProviderName),
  model: z.string().min(1),
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative()
});

const bulkCalculateSchema = z.object({
  customerId: z.string().uuid(),
  calculations: z
    .array(
      z.object({
        provider: z.nativeEnum(ProviderName),
        model: z.string().min(1),
        inputTokens: z.number().int().nonnegative(),
        outputTokens: z.number().int().nonnegative()
      })
    )
    .min(1)
    .max(100)
});

export const costCalculationRoutes: FastifyPluginAsync = async (app) => {
  // Calculate cost for a single operation
  app.post('/calculate', async (request, reply) => {
    try {
      const body = calculateCostSchema.parse(request.body);

      const result = await costCalculatorService.calculateCost(body);

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400);
        return {
          error: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: error.errors
        };
      }

      if (error instanceof Error && error.message.includes('No cost data found')) {
        reply.code(404);
        return {
          error: 'PROVIDER_NOT_FOUND',
          message: error.message
        };
      }

      logger.error({ error }, 'Failed to calculate cost');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to calculate cost'
      };
    }
  });

  // Bulk cost calculation
  app.post('/calculate/bulk', async (request, reply) => {
    try {
      const body = bulkCalculateSchema.parse(request.body);

      const results = await costCalculatorService.calculateBulk(
        body.customerId,
        body.calculations
      );

      return {
        customerId: body.customerId,
        results,
        total: results.length
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400);
        return {
          error: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: error.errors
        };
      }

      logger.error({ error }, 'Failed to calculate bulk costs');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to calculate bulk costs'
      };
    }
  });

  // Get all provider pricing
  app.get('/pricing', async (request, reply) => {
    try {
      const providers = await db.providerCost.findMany({
        where: {
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
        },
        orderBy: [{ provider: 'asc' }, { model: 'asc' }, { costType: 'asc' }]
      });

      // Group by provider and model
      const grouped = providers.reduce((acc, cost) => {
        const key = `${cost.provider}:${cost.model}`;
        if (!acc[key]) {
          acc[key] = {
            provider: cost.provider,
            model: cost.model,
            pricing: {}
          };
        }

        const costTypeKey =
          cost.costType === 'INPUT_TOKEN'
            ? 'input_token'
            : cost.costType === 'OUTPUT_TOKEN'
            ? 'output_token'
            : cost.costType.toLowerCase();

        acc[key].pricing[costTypeKey] = {
          costPerUnit: Number(cost.costPerUnit),
          unitSize: Number(cost.unitSize),
          currency: cost.currency
        };

        return acc;
      }, {} as Record<string, any>);

      const data = Object.values(grouped);

      return {
        data,
        total: data.length
      };
    } catch (error) {
      logger.error({ error }, 'Failed to get pricing');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to get pricing'
      };
    }
  });
};
