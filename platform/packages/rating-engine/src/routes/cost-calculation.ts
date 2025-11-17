// Cost Calculation Routes

import { FastifyPluginAsync } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { z } from 'zod';
import { logger } from '../logger';
import { config } from '../config';

const db = getPrismaClient();

// Validation schemas
const calculateCostSchema = z.object({
  customerId: z.string().uuid(),
  provider: z.string().min(1),
  model: z.string().min(1),
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative()
});

const bulkCalculateSchema = z.object({
  customerId: z.string().uuid(),
  calculations: z.array(z.object({
    provider: z.string().min(1),
    model: z.string().min(1),
    inputTokens: z.number().int().nonnegative(),
    outputTokens: z.number().int().nonnegative()
  })).min(1).max(100)
});

export const costCalculationRoutes: FastifyPluginAsync = async (app) => {
  // Calculate cost for a single operation
  app.post('/calculate', async (request, reply) => {
    try {
      const body = calculateCostSchema.parse(request.body);

      // Get provider costs
      const [inputCost, outputCost] = await Promise.all([
        db.providerCost.findFirst({
          where: {
            provider: body.provider,
            model: body.model,
            costType: 'INPUT_TOKEN',
            OR: [
              { validUntil: null },
              { validUntil: { gte: new Date() } }
            ]
          },
          orderBy: { validFrom: 'desc' }
        }),
        db.providerCost.findFirst({
          where: {
            provider: body.provider,
            model: body.model,
            costType: 'OUTPUT_TOKEN',
            OR: [
              { validUntil: null },
              { validUntil: { gte: new Date() } }
            ]
          },
          orderBy: { validFrom: 'desc' }
        })
      ]);

      if (!inputCost || !outputCost) {
        reply.code(404);
        return {
          error: 'PROVIDER_NOT_FOUND',
          message: `No cost data found for ${body.provider}/${body.model}`
        };
      }

      // Calculate USD cost
      const inputUsd = (body.inputTokens / Number(inputCost.unitSize)) * Number(inputCost.costPerUnit);
      const outputUsd = (body.outputTokens / Number(outputCost.unitSize)) * Number(outputCost.costPerUnit);
      const totalUsd = inputUsd + outputUsd;

      // Get burn table for customer
      const burnTable = await db.burnTable.findFirst({
        where: {
          customerId: body.customerId,
          isActive: true
        }
      });

      // Calculate credits
      let credits: number;
      let pricingSource: string;

      if (burnTable && burnTable.rules) {
        // Use customer-specific burn table
        const rules = burnTable.rules as any;
        const modelRules = rules[body.model] || rules['default'];

        if (modelRules) {
          const inputCredits = (body.inputTokens / modelRules.perUnit) * modelRules.inputTokens;
          const outputCredits = (body.outputTokens / modelRules.perUnit) * modelRules.outputTokens;
          credits = Math.ceil(inputCredits + outputCredits);
          pricingSource = 'customer_burn_table';
        } else {
          credits = Math.ceil(totalUsd * config.defaultCreditsPerDollar);
          pricingSource = 'default';
        }
      } else {
        // Use default conversion
        credits = Math.ceil(totalUsd * config.defaultCreditsPerDollar);
        pricingSource = 'default';
      }

      // Calculate margin
      const revenueUsd = credits / config.defaultCreditsPerDollar;
      const marginUsd = revenueUsd - totalUsd;
      const marginPercent = totalUsd > 0 ? (marginUsd / totalUsd) * 100 : 0;

      logger.debug({
        customerId: body.customerId,
        provider: body.provider,
        model: body.model,
        inputTokens: body.inputTokens,
        outputTokens: body.outputTokens,
        totalUsd,
        credits,
        marginPercent
      }, 'Cost calculated');

      return {
        credits,
        costBreakdown: {
          input: {
            tokens: body.inputTokens,
            credits: Math.ceil((body.inputTokens / Number(inputCost.unitSize)) * Number(inputCost.costPerUnit) * config.defaultCreditsPerDollar),
            usd: inputUsd,
            ratePerUnit: Number(inputCost.costPerUnit),
            unitSize: Number(inputCost.unitSize)
          },
          output: {
            tokens: body.outputTokens,
            credits: Math.ceil((body.outputTokens / Number(outputCost.unitSize)) * Number(outputCost.costPerUnit) * config.defaultCreditsPerDollar),
            usd: outputUsd,
            ratePerUnit: Number(outputCost.costPerUnit),
            unitSize: Number(outputCost.unitSize)
          }
        },
        providerCostUsd: totalUsd,
        revenueUsd,
        marginUsd,
        marginPercent: Math.round(marginPercent * 100) / 100,
        pricingSource
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

      const results = await Promise.all(
        body.calculations.map(async (calc) => {
          try {
            // This is a simplified version - in production, optimize with batch queries
            const [inputCost, outputCost] = await Promise.all([
              db.providerCost.findFirst({
                where: {
                  provider: calc.provider,
                  model: calc.model,
                  costType: 'INPUT_TOKEN',
                  OR: [
                    { validUntil: null },
                    { validUntil: { gte: new Date() } }
                  ]
                },
                orderBy: { validFrom: 'desc' }
              }),
              db.providerCost.findFirst({
                where: {
                  provider: calc.provider,
                  model: calc.model,
                  costType: 'OUTPUT_TOKEN',
                  OR: [
                    { validUntil: null },
                    { validUntil: { gte: new Date() } }
                  ]
                },
                orderBy: { validFrom: 'desc' }
              })
            ]);

            if (!inputCost || !outputCost) {
              return {
                provider: calc.provider,
                model: calc.model,
                error: 'PROVIDER_NOT_FOUND'
              };
            }

            const inputUsd = (calc.inputTokens / Number(inputCost.unitSize)) * Number(inputCost.costPerUnit);
            const outputUsd = (calc.outputTokens / Number(outputCost.unitSize)) * Number(outputCost.costPerUnit);
            const totalUsd = inputUsd + outputUsd;
            const credits = Math.ceil(totalUsd * config.defaultCreditsPerDollar);

            return {
              provider: calc.provider,
              model: calc.model,
              inputTokens: calc.inputTokens,
              outputTokens: calc.outputTokens,
              credits,
              costUsd: totalUsd
            };
          } catch (err) {
            return {
              provider: calc.provider,
              model: calc.model,
              error: 'CALCULATION_FAILED'
            };
          }
        })
      );

      const totalCredits = results
        .filter(r => !r.error)
        .reduce((sum, r) => sum + ((r as any).credits || 0), 0);

      const totalCostUsd = results
        .filter(r => !r.error)
        .reduce((sum, r) => sum + ((r as any).costUsd || 0), 0);

      return {
        results,
        summary: {
          totalCalculations: body.calculations.length,
          successful: results.filter(r => !r.error).length,
          failed: results.filter(r => r.error).length,
          totalCredits,
          totalCostUsd: Math.round(totalCostUsd * 1000000) / 1000000 // 6 decimal places
        }
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

  // Get pricing for all available models
  app.get('/pricing', async (request, reply) => {
    const { provider } = request.query as { provider?: string };

    const costs = await db.providerCost.findMany({
      where: {
        ...(provider && { provider }),
        OR: [
          { validUntil: null },
          { validUntil: { gte: new Date() } }
        ]
      },
      orderBy: [
        { provider: 'asc' },
        { model: 'asc' },
        { costType: 'asc' }
      ]
    });

    // Group by provider and model
    const grouped = costs.reduce((acc: any, cost) => {
      const key = `${cost.provider}/${cost.model}`;
      if (!acc[key]) {
        acc[key] = {
          provider: cost.provider,
          model: cost.model,
          pricing: {}
        };
      }

      acc[key].pricing[cost.costType.toLowerCase()] = {
        costPerUnit: Number(cost.costPerUnit),
        unitSize: Number(cost.unitSize),
        currency: cost.currency
      };

      return acc;
    }, {});

    return {
      data: Object.values(grouped),
      total: Object.keys(grouped).length
    };
  });
};
