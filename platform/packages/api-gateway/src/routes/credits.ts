// Credit management routes
import { FastifyInstance } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { logger } from '../logger';
import { z } from 'zod';

const db = getPrismaClient();

// Request schemas
const CreditBalanceSchema = z.object({
  customerId: z.string().uuid(),
  userId: z.string().uuid(),
});

const CreditPurchaseSchema = z.object({
  customerId: z.string().uuid(),
  userId: z.string().uuid(),
  amount: z.number().positive(),
  purchasePrice: z.number().positive(),
  expiresAt: z.string().datetime().optional(),
});

export async function creditsRoutes(app: FastifyInstance) {
  // Register authentication for all credit routes
  app.addHook('preHandler', authenticate);

  // Get credit balance for a user
  app.get<{ Params: z.infer<typeof CreditBalanceSchema> }>(
    '/v1/customers/:customerId/users/:userId/credits',
    {
      schema: {
        tags: ['Credits'],
        description: 'Get credit balance for a specific user',
        params: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
          },
          required: ['customerId', 'userId'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  balance: { type: 'number' },
                  reserved: { type: 'number' },
                  available: { type: 'number' },
                  expiresAt: { type: 'string', nullable: true },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { customerId, userId } = request.params;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Get credit wallet
        const wallet = await db.creditWallet.findFirst({
          where: {
            userId,
          },
          select: {
            balance: true,
            reservedBalance: true,
            expiresAt: true,
          },
        });

        if (!wallet) {
          return reply.status(404).send({
            error: 'Not Found',
            message: 'Credit wallet not found',
          });
        }

        const available = Number(wallet.balance) - Number(wallet.reservedBalance);

        return reply.send({
          data: {
            balance: Number(wallet.balance),
            reserved: Number(wallet.reservedBalance),
            available,
            expiresAt: wallet.expiresAt?.toISOString() || null,
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching credit balance');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch credit balance',
        });
      }
    }
  );

  // Purchase credits (top-up)
  app.post<{ Body: z.infer<typeof CreditPurchaseSchema> }>(
    '/v1/credits/purchase',
    {
      schema: {
        tags: ['Credits'],
        description: 'Purchase credits for a user (top-up)',
        body: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            amount: { type: 'number', minimum: 1 },
            purchasePrice: { type: 'number', minimum: 0 },
            expiresAt: { type: 'string', format: 'date-time' },
          },
          required: ['customerId', 'userId', 'amount', 'purchasePrice'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  transactionId: { type: 'string' },
                  newBalance: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { customerId, userId, amount, purchasePrice, expiresAt } = request.body;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Find or create credit wallet
        let wallet = await db.creditWallet.findFirst({
          where: {
            userId,
          },
        });

        if (!wallet) {
          // Create new wallet
          wallet = await db.creditWallet.create({
            data: {
              customerId,
              userId,
              balance: 0,
              reservedBalance: 0,
            },
          });
        }

        // Create credit purchase transaction
        const result = await db.$transaction(async (tx) => {
          // Create transaction record
          const transaction = await tx.creditTransaction.create({
            data: {
              walletId: wallet.id,
              customerId,
              userId,
              transactionType: 'PURCHASE',
              amount: BigInt(amount),
              balanceBefore: wallet.balance,
              balanceAfter: BigInt(Number(wallet.balance) + amount),
              priceUsd: purchasePrice,
              description: `Credit purchase: ${amount} credits`,
            },
          });

          // Update wallet balance
          await tx.creditWallet.update({
            where: { id: wallet.id },
            data: {
              balance: BigInt(Number(wallet.balance) + amount),
              ...(expiresAt ? { expiresAt: new Date(expiresAt) } : {}),
            },
          });

          return {
            transactionId: transaction.id,
            newBalance: Number(wallet.balance) + amount,
          };
        });

        return reply.send({
          data: result,
        });
      } catch (error) {
        logger.error({ err: error }, 'Error purchasing credits');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to purchase credits',
        });
      }
    }
  );

  // Get credit transaction history
  app.get<{ Params: { customerId: string; userId: string }; Querystring: { limit?: number; offset?: number } }>(
    '/v1/customers/:customerId/users/:userId/transactions',
    {
      schema: {
        tags: ['Credits'],
        description: 'Get credit transaction history for a user',
        params: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
          },
          required: ['customerId', 'userId'],
        },
        querystring: {
          type: 'object',
          properties: {
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 50 },
            offset: { type: 'integer', minimum: 0, default: 0 },
          },
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
                    id: { type: 'string' },
                    transactionType: { type: 'string' },
                    amount: { type: 'number' },
                    balanceBefore: { type: 'number' },
                    balanceAfter: { type: 'number' },
                    description: { type: 'string', nullable: true },
                    createdAt: { type: 'string' },
                  },
                },
              },
              pagination: {
                type: 'object',
                properties: {
                  limit: { type: 'integer' },
                  offset: { type: 'integer' },
                  total: { type: 'integer' },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { customerId, userId } = request.params;
        const { limit = 50, offset = 0 } = request.query;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Get transactions
        const [transactions, total] = await Promise.all([
          db.creditTransaction.findMany({
            where: {
              userId,
              customerId,
            },
            select: {
              id: true,
              transactionType: true,
              amount: true,
              balanceBefore: true,
              balanceAfter: true,
              description: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset,
          }),
          db.creditTransaction.count({
            where: {
              userId,
              customerId,
            },
          }),
        ]);

        return reply.send({
          data: transactions.map(tx => ({
            ...tx,
            createdAt: tx.createdAt.toISOString(),
          })),
          pagination: {
            limit,
            offset,
            total,
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching transaction history');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch transaction history',
        });
      }
    }
  );
}
