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

// Credit management routes
import { FastifyInstance } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { authenticate } from '../middleware/auth';
import { logger } from '../logger';
import { z } from 'zod';
import { withCommonResponses } from '../types/schemas';

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

  // Get credit balance for authenticated customer (simple endpoint)
  app.get(
    '/v1/credits/balance',
    {
      schema: {
        tags: ['Credits'],
        description: 'Get credit balance for the authenticated customer',
        security: [{ bearerAuth: [] }],
        response: withCommonResponses({
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  balance: { type: 'string', description: 'Total balance' },
                  reservedBalance: { type: 'string', description: 'Reserved credits' },
                  availableBalance: { type: 'string', description: 'Available credits' },
                  currency: { type: 'string' },
                },
              },
            },
          },
        }, [401, 404, 500]),
      },
    },
    async (request: any, reply) => {
      try {
        if (!request.customer) {
          return reply.status(401).send({
            error: 'Unauthorized',
            message: 'Authentication required',
          });
        }

        // Get customer-level wallet (no userId, no teamId)
        const wallet = await db.creditWallet.findFirst({
          where: {
            customerId: request.customer.id,
            userId: null,
            teamId: null,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

        if (!wallet) {
          return reply.status(404).send({
            error: 'Not Found',
            message: 'Credit wallet not found',
          });
        }

        const balance = wallet.balance.toString();
        const reservedBalance = wallet.reservedBalance.toString();
        const availableBalance = (
          wallet.balance - wallet.reservedBalance
        ).toString();

        return reply.send({
          data: {
            balance,
            reservedBalance,
            availableBalance,
            currency: wallet.currency,
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
        response: withCommonResponses({
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
        }, [403, 404, 500]),
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
        response: withCommonResponses({
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
        }, [403, 500]),
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
        const result = await db.$transaction(async (tx: any) => {
          // Create transaction record
          const transaction = await tx.creditTransaction.create({
            data: {
              walletId: wallet.id,
              customerId,
              transactionType: 'PURCHASE',
              amount: BigInt(amount),
              balanceBefore: wallet.balance,
              balanceAfter: BigInt(Number(wallet.balance) + amount),
              description: `Credit purchase: ${amount} credits`,
              metadata: {
                userId,
                priceUsd: purchasePrice.toString(),
              },
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

  // Grant credits (admin operation - no payment required)
  app.post(
    '/v1/credits/grant',
    {
      schema: {
        tags: ['Credits'],
        description: 'Grant credits to a customer, user, or team (admin operation)',
        body: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            teamId: { type: 'string', format: 'uuid' },
            amount: { type: 'number', minimum: 1 },
            reason: { type: 'string' },
            metadata: { type: 'object' },
            idempotencyKey: { type: 'string' },
            expiresAt: { type: 'string', format: 'date-time' },
          },
          required: ['customerId', 'amount'],
        },
        response: withCommonResponses({
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  transactionId: { type: 'string' },
                  walletId: { type: 'string' },
                  newBalance: { type: 'string' },
                  amount: { type: 'string' },
                },
              },
            },
          },
        }, [403, 409, 500]),
      },
    },
    async (request: any, reply) => {
      try {
        const {
          customerId,
          userId,
          teamId,
          amount,
          reason,
          metadata,
          idempotencyKey,
          expiresAt,
        } = request.body;

        // Verify customer access (must be same customer or admin)
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Check for duplicate grant using idempotency key
        if (idempotencyKey) {
          const existingTransaction = await db.creditTransaction.findUnique({
            where: { idempotencyKey },
            include: {
              wallet: {
                select: {
                  id: true,
                  balance: true,
                },
              },
            },
          });

          if (existingTransaction) {
            // Return existing transaction (idempotent response)
            return reply.status(200).send({
              data: {
                transactionId: existingTransaction.id,
                walletId: existingTransaction.walletId,
                newBalance: existingTransaction.balanceAfter.toString(),
                amount: existingTransaction.amount.toString(),
              },
            });
          }
        }

        // Determine wallet level (customer, user, or team)
        const walletQuery: any = {
          customerId,
        };

        if (userId) {
          walletQuery.userId = userId;
          walletQuery.teamId = null;
        } else if (teamId) {
          walletQuery.teamId = teamId;
          walletQuery.userId = null;
        } else {
          // Customer-level wallet
          walletQuery.userId = null;
          walletQuery.teamId = null;
        }

        // Find or create wallet
        let wallet = await db.creditWallet.findFirst({
          where: walletQuery,
        });

        if (!wallet) {
          // Create new wallet
          wallet = await db.creditWallet.create({
            data: {
              ...walletQuery,
              balance: 0,
              reservedBalance: 0,
            },
          });

          logger.info(
            { walletId: wallet.id, customerId, userId, teamId },
            'Created new credit wallet'
          );
        }

        // Create grant transaction atomically
        const result = await db.$transaction(async (tx: any) => {
          const newBalance = BigInt(Number(wallet.balance) + amount);

          // Create transaction record
          const transaction = await tx.creditTransaction.create({
            data: {
              walletId: wallet.id,
              customerId,
              transactionType: 'GRANT',
              amount: BigInt(amount),
              balanceBefore: wallet.balance,
              balanceAfter: newBalance,
              description: reason || `Credit grant: ${amount} credits`,
              metadata: {
                ...metadata,
                grantedBy: request.customer!.id,
                userId: userId || null,
                teamId: teamId || null,
              },
              idempotencyKey: idempotencyKey || undefined,
            },
          });

          // Update wallet balance
          await tx.creditWallet.update({
            where: { id: wallet.id },
            data: {
              balance: newBalance,
              ...(expiresAt ? { expiresAt: new Date(expiresAt) } : {}),
            },
          });

          logger.info(
            {
              transactionId: transaction.id,
              walletId: wallet.id,
              amount,
              newBalance: newBalance.toString(),
            },
            'Credits granted successfully'
          );

          return {
            transactionId: transaction.id,
            walletId: wallet.id,
            newBalance: newBalance.toString(),
            amount: amount.toString(),
          };
        });

        return reply.send({
          data: result,
        });
      } catch (error: any) {
        logger.error({ err: error }, 'Error granting credits');

        // Handle unique constraint violation for idempotency key
        if (error.code === 'P2002' && error.meta?.target?.includes('idempotencyKey')) {
          return reply.status(409).send({
            error: 'Conflict',
            message: 'Duplicate grant operation detected',
          });
        }

        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to grant credits',
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
        response: withCommonResponses({
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
        }, [403, 500]),
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
              customerId,
              wallet: {
                userId,
              },
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
              customerId,
              wallet: {
                userId,
              },
            },
          }),
        ]);

        return reply.send({
          data: transactions.map((tx: typeof transactions[number]) => ({
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
