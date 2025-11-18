// Entitlement check routes
import { FastifyInstance } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { authenticate } from '../middleware/auth';
import { logger } from '../logger';
import { z } from 'zod';

const db = getPrismaClient();

// Request schema
const EntitlementCheckSchema = z.object({
  customerId: z.string().uuid(),
  userId: z.string().uuid(),
  featureId: z.string(),
  action: z.object({
    type: z.enum(['token_usage', 'image_generation', 'api_call', 'custom']),
    provider: z.string().optional(),
    model: z.string().optional(),
    estimated_input_tokens: z.number().optional(),
    estimated_output_tokens: z.number().optional(),
  }),
});

type EntitlementCheckRequest = z.infer<typeof EntitlementCheckSchema>;

export async function entitlementsRoutes(app: FastifyInstance) {
  // Register authentication for all entitlement routes
  app.addHook('preHandler', authenticate);

  // Check entitlement - Real-time access control
  app.post<{ Body: EntitlementCheckRequest }>(
    '/v1/entitlements/check',
    {
      schema: {
        tags: ['Entitlements'],
        description: 'Check if a user is entitled to perform an action (sub-10ms latency)',
        body: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            featureId: { type: 'string' },
            action: {
              type: 'object',
              properties: {
                type: { type: 'string', enum: ['token_usage', 'image_generation', 'api_call', 'custom'] },
                provider: { type: 'string' },
                model: { type: 'string' },
                estimated_input_tokens: { type: 'number' },
                estimated_output_tokens: { type: 'number' },
              },
              required: ['type'],
            },
          },
          required: ['customerId', 'userId', 'featureId', 'action'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              allowed: { type: 'boolean' },
              reason: { type: 'string', nullable: true },
              estimatedCostCredits: { type: 'number', nullable: true },
              estimatedCostUsd: { type: 'number', nullable: true },
              currentBalance: { type: 'number', nullable: true },
              actions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string' },
                    label: { type: 'string' },
                    url: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const startTime = Date.now();
      try {
        const { customerId, userId, featureId, action } = request.body;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // 1. Check if feature is enabled for customer
        const entitlement = await db.entitlement.findFirst({
          where: {
            customerId,
            featureId,
          },
        });

        if (!entitlement) {
          return reply.send({
            allowed: false,
            reason: 'Feature not enabled for this customer',
            estimatedCostCredits: null,
            estimatedCostUsd: null,
            currentBalance: null,
            actions: [
              {
                type: 'upgrade',
                label: 'Upgrade Plan',
                url: '/upgrade',
              },
            ],
          });
        }

        // 2. Get credit wallet
        const wallet = await db.creditWallet.findFirst({
          where: {
            userId,
            customerId,
          },
        });

        if (!wallet) {
          return reply.send({
            allowed: false,
            reason: 'No credit wallet found',
            estimatedCostCredits: null,
            estimatedCostUsd: null,
            currentBalance: null,
            actions: [
              {
                type: 'create_wallet',
                label: 'Create Credit Wallet',
                url: '/credits/wallet',
              },
            ],
          });
        }

        // 3. Check if credits are expired
        if (wallet.expiresAt && wallet.expiresAt < new Date()) {
          return reply.send({
            allowed: false,
            reason: 'Credits have expired',
            estimatedCostCredits: null,
            estimatedCostUsd: null,
            currentBalance: wallet.balance,
            actions: [
              {
                type: 'purchase',
                label: 'Purchase New Credits',
                url: '/credits/purchase',
              },
            ],
          });
        }

        // 4. Estimate cost for token usage
        let estimatedCostCredits = 0;
        let estimatedCostUsd = 0;

        if (action.type === 'token_usage' && action.provider && action.model) {
          // Get provider costs for input and output tokens
          const [inputCost, outputCost] = await Promise.all([
            db.providerCost.findFirst({
              where: {
                provider: action.provider as any,
                model: action.model,
                costType: 'INPUT_TOKEN',
                validFrom: { lte: new Date() },
                OR: [
                  { validUntil: null },
                  { validUntil: { gte: new Date() } },
                ],
              },
              orderBy: { validFrom: 'desc' },
            }),
            db.providerCost.findFirst({
              where: {
                provider: action.provider as any,
                model: action.model,
                costType: 'OUTPUT_TOKEN',
                validFrom: { lte: new Date() },
                OR: [
                  { validUntil: null },
                  { validUntil: { gte: new Date() } },
                ],
              },
              orderBy: { validFrom: 'desc' },
            }),
          ]);

          if (inputCost || outputCost) {
            const inputCostUsd = inputCost
              ? ((action.estimated_input_tokens || 0) / inputCost.unitSize) * Number(inputCost.costPerUnit)
              : 0;
            const outputCostUsd = outputCost
              ? ((action.estimated_output_tokens || 0) / outputCost.unitSize) * Number(outputCost.costPerUnit)
              : 0;

            estimatedCostUsd = inputCostUsd + outputCostUsd;

            // Apply burn table markup (default: 1000 credits per USD)
            estimatedCostCredits = Math.ceil(estimatedCostUsd * 1000);
          }
        }

        // 5. Check available balance
        const available = Number(wallet.balance) - Number(wallet.reservedBalance);

        // 6. Apply limit type logic
        let allowed = true;
        let reason = null;
        const actions: Array<{ type: string; label: string; url: string }> = [];

        if (entitlement.limitType === 'HARD' && entitlement.limitValue !== null) {
          // Hard limit - strictly enforce
          if (available < estimatedCostCredits) {
            allowed = false;
            reason = 'Insufficient credits';
            actions.push({
              type: 'purchase',
              label: 'Purchase Credits',
              url: '/credits/purchase',
            });
          }
        } else if (entitlement.limitType === 'SOFT' && entitlement.limitValue !== null) {
          // Soft limit - warn but allow
          if (available < estimatedCostCredits) {
            allowed = true;
            reason = 'Low credits - consider purchasing more';
            actions.push({
              type: 'purchase',
              label: 'Purchase Credits',
              url: '/credits/purchase',
            });
          }
        } else if (entitlement.limitType === 'NONE') {
          // No limit - always allow (postpaid)
          allowed = true;
        }

        const duration = Date.now() - startTime;
        logger.debug({ duration, userId, featureId, allowed }, 'Entitlement check completed');

        return reply.send({
          allowed,
          reason,
          estimatedCostCredits: estimatedCostCredits > 0 ? estimatedCostCredits : null,
          estimatedCostUsd: estimatedCostUsd > 0 ? estimatedCostUsd : null,
          currentBalance: available,
          actions,
        });
      } catch (error) {
        const duration = Date.now() - startTime;
        logger.error({ err: error, duration }, 'Error checking entitlement');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to check entitlement',
        });
      }
    }
  );

  // Create new entitlement
  app.post(
    '/v1/entitlements',
    {
      schema: {
        tags: ['Entitlements'],
        description: 'Create a new entitlement for a customer or user',
        body: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            featureId: { type: 'string' },
            limitType: { type: 'string', enum: ['HARD', 'SOFT', 'NONE'] },
            limitValue: { type: 'number', nullable: true },
            period: { type: 'string', enum: ['DAILY', 'MONTHLY', 'TOTAL'], nullable: true },
            metadata: { type: 'object' },
          },
          required: ['customerId', 'featureId', 'limitType'],
        },
        response: {
          201: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  featureId: { type: 'string' },
                  limitType: { type: 'string' },
                  limitValue: { type: 'number', nullable: true },
                },
              },
            },
          },
        },
      },
    },
    async (request: any, reply) => {
      try {
        const { customerId, userId, featureId, limitType, limitValue, period, metadata } = request.body;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Create entitlement
        const entitlement = await db.entitlement.create({
          data: {
            customerId,
            userId: userId || null,
            featureId,
            limitType,
            limitValue: limitValue !== undefined ? BigInt(limitValue) : null,
            period: period || null,
            metadata: metadata || null,
          },
        });

        logger.info({ entitlementId: entitlement.id, featureId }, 'Entitlement created');

        return reply.status(201).send({
          data: {
            id: entitlement.id,
            featureId: entitlement.featureId,
            limitType: entitlement.limitType,
            limitValue: entitlement.limitValue ? Number(entitlement.limitValue) : null,
          },
        });
      } catch (error: any) {
        logger.error({ err: error }, 'Error creating entitlement');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to create entitlement',
        });
      }
    }
  );

  // Update entitlement
  app.put<{ Params: { id: string } }>(
    '/v1/entitlements/:id',
    {
      schema: {
        tags: ['Entitlements'],
        description: 'Update an existing entitlement',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            limitType: { type: 'string', enum: ['HARD', 'SOFT', 'NONE'] },
            limitValue: { type: 'number', nullable: true },
            period: { type: 'string', enum: ['DAILY', 'MONTHLY', 'TOTAL'], nullable: true },
            metadata: { type: 'object' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  featureId: { type: 'string' },
                  limitType: { type: 'string' },
                  limitValue: { type: 'number', nullable: true },
                },
              },
            },
          },
        },
      },
    },
    async (request: any, reply) => {
      try {
        const { id } = request.params;
        const { limitType, limitValue, period, metadata } = request.body;

        // Get existing entitlement to verify ownership
        const existing = await db.entitlement.findUnique({
          where: { id },
        });

        if (!existing) {
          return reply.status(404).send({
            error: 'Not Found',
            message: 'Entitlement not found',
          });
        }

        // Verify customer access
        if (existing.customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this entitlement',
          });
        }

        // Update entitlement
        const updated = await db.entitlement.update({
          where: { id },
          data: {
            ...(limitType && { limitType }),
            ...(limitValue !== undefined && { limitValue: limitValue !== null ? BigInt(limitValue) : null }),
            ...(period && { period }),
            ...(metadata && { metadata }),
          },
        });

        logger.info({ entitlementId: id, featureId: updated.featureId }, 'Entitlement updated');

        return reply.send({
          data: {
            id: updated.id,
            featureId: updated.featureId,
            limitType: updated.limitType,
            limitValue: updated.limitValue ? Number(updated.limitValue) : null,
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error updating entitlement');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to update entitlement',
        });
      }
    }
  );

  // Delete entitlement
  app.delete<{ Params: { id: string } }>(
    '/v1/entitlements/:id',
    {
      schema: {
        tags: ['Entitlements'],
        description: 'Delete an entitlement',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        response: {
          204: {
            type: 'null',
            description: 'Entitlement deleted successfully',
          },
        },
      },
    },
    async (request: any, reply) => {
      try {
        const { id } = request.params;

        // Get existing entitlement to verify ownership
        const existing = await db.entitlement.findUnique({
          where: { id },
        });

        if (!existing) {
          return reply.status(404).send({
            error: 'Not Found',
            message: 'Entitlement not found',
          });
        }

        // Verify customer access
        if (existing.customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this entitlement',
          });
        }

        // Delete entitlement
        await db.entitlement.delete({
          where: { id },
        });

        logger.info({ entitlementId: id, featureId: existing.featureId }, 'Entitlement deleted');

        return reply.status(204).send();
      } catch (error) {
        logger.error({ err: error }, 'Error deleting entitlement');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to delete entitlement',
        });
      }
    }
  );

  // List entitlements for a customer
  app.get<{ Params: { customerId: string } }>(
    '/v1/customers/:customerId/entitlements',
    {
      schema: {
        tags: ['Entitlements'],
        description: 'List all entitlements for a customer',
        params: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
          },
          required: ['customerId'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    featureId: { type: 'string' },
                    isEnabled: { type: 'boolean' },
                    limitType: { type: 'string' },
                    limitValue: { type: 'number', nullable: true },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { customerId } = request.params;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        const entitlements = await db.entitlement.findMany({
          where: {
            customerId,
          },
          select: {
            featureId: true,
            limitType: true,
            limitValue: true,
            period: true,
            metadata: true,
          },
        });

        return reply.send({
          data: entitlements,
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching entitlements');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch entitlements',
        });
      }
    }
  );
}
