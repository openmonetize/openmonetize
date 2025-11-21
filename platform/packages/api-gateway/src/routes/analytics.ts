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

// Analytics routes
import { FastifyInstance } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { authenticate } from '../middleware/auth';
import { logger } from '../logger';
import { withCommonResponses } from '../types/schemas';

const db = getPrismaClient();

// Note: Query parameter schemas defined inline in route handlers for Fastify compatibility

export async function analyticsRoutes(app: FastifyInstance) {
  // Register authentication for all analytics routes
  app.addHook('preHandler', authenticate);

  // Usage Analytics - Get usage by feature
  app.get(
    '/v1/analytics/usage',
    {
      schema: {
        tags: ['Analytics'],
        description: 'Get usage analytics by feature for a customer',
        querystring: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            groupBy: { type: 'string', enum: ['day', 'week', 'month'] },
          },
        },

        response: withCommonResponses({
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  summary: {
                    type: 'object',
                    properties: {
                      totalEvents: { type: 'number' },
                      totalInputTokens: { type: 'string' },
                      totalOutputTokens: { type: 'string' },
                      totalCreditsBurned: { type: 'string' },
                      totalCostUsd: { type: 'string' },
                    },
                  },
                  byFeature: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        featureId: { type: 'string' },
                        eventCount: { type: 'number' },
                        creditsBurned: { type: 'string' },
                        costUsd: { type: 'string' },
                      },
                    },
                  },
                  byProvider: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        provider: { type: 'string' },
                        model: { type: 'string' },
                        eventCount: { type: 'number' },
                        inputTokens: { type: 'string' },
                        outputTokens: { type: 'string' },
                      },
                    },
                  },
                  byEventType: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        eventType: { type: 'string' },
                        eventCount: { type: 'number' },
                        creditsBurned: { type: 'string' },
                        costUsd: { type: 'string' },
                      },
                    },
                  },
                  timeline: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        date: { type: 'string' },
                        events: { type: 'number' },
                        creditsBurned: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        }, [403, 500]),
      },
    },
    async (request: any, reply) => {
      try {
        const { customerId, startDate, endDate } = request.query;

        // Use authenticated customer's ID if customerId not provided
        const targetCustomerId = customerId || request.customer!.id;

        // Verify customer access
        if (targetCustomerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Date range defaults
        const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        const end = endDate ? new Date(endDate as string) : new Date();

        // Get usage events
        const events = await db.usageEvent.findMany({
          where: {
            customerId: targetCustomerId,
            timestamp: {
              gte: start,
              lte: end,
            },
          },
          select: {
            featureId: true,
            eventType: true,
            provider: true,
            model: true,
            inputTokens: true,
            outputTokens: true,
            creditsBurned: true,
            costUsd: true,
            timestamp: true,
          },
          orderBy: {
            timestamp: 'asc',
          },
        });

        // Calculate summary
        const summary = {
          totalEvents: events.length,
          totalInputTokens: events.reduce((sum, e) => sum + Number(e.inputTokens || 0), 0).toString(),
          totalOutputTokens: events.reduce((sum, e) => sum + Number(e.outputTokens || 0), 0).toString(),
          totalCreditsBurned: events.reduce((sum, e) => sum + Number(e.creditsBurned || 0), 0).toString(),
          totalCostUsd: events.reduce((sum, e) => sum + Number(e.costUsd || 0), 0).toFixed(4),
        };

        // Group by feature
        const featureMap = new Map<string, { count: number; credits: bigint; cost: number }>();
        events.forEach((event) => {
          const existing = featureMap.get(event.featureId) || { count: 0, credits: BigInt(0), cost: 0 };
          featureMap.set(event.featureId, {
            count: existing.count + 1,
            credits: existing.credits + (event.creditsBurned || BigInt(0)),
            cost: existing.cost + Number(event.costUsd || 0),
          });
        });

        const byFeature = Array.from(featureMap.entries()).map(([featureId, stats]) => ({
          featureId,
          eventCount: stats.count,
          creditsBurned: stats.credits.toString(),
          costUsd: stats.cost.toFixed(4),
        }));

        // Group by provider
        const providerMap = new Map<string, { count: number; inputTokens: bigint; outputTokens: bigint }>();
        events.forEach((event) => {
          if (event.provider && event.model) {
            const key = `${String(event.provider)}:${event.model}`;
            const existing = providerMap.get(key) || { count: 0, inputTokens: BigInt(0), outputTokens: BigInt(0) };
            providerMap.set(key, {
              count: existing.count + 1,
              inputTokens: existing.inputTokens + (event.inputTokens || BigInt(0)),
              outputTokens: existing.outputTokens + (event.outputTokens || BigInt(0)),
            });
          }
        });

        const byProvider = Array.from(providerMap.entries()).map(([key, stats]) => {
          const [provider = 'UNKNOWN', model = 'unknown'] = key.split(':');
          return {
            provider,
            model,
            eventCount: stats.count,
            inputTokens: stats.inputTokens.toString(),
            outputTokens: stats.outputTokens.toString(),
          };
        });

        // Group by event type
        const eventTypeMap = new Map<string, { count: number; credits: bigint; cost: number }>();
        events.forEach((event) => {
          const key = String(event.eventType || 'UNKNOWN');
          const existing = eventTypeMap.get(key) || { count: 0, credits: BigInt(0), cost: 0 };
          eventTypeMap.set(key, {
            count: existing.count + 1,
            credits: existing.credits + (event.creditsBurned || BigInt(0)),
            cost: existing.cost + Number(event.costUsd || 0),
          });
        });

        const byEventType = Array.from(eventTypeMap.entries()).map(([eventType, stats]) => ({
          eventType,
          eventCount: stats.count,
          creditsBurned: stats.credits.toString(),
          costUsd: stats.cost.toFixed(4),
        }));

        // Create timeline (daily aggregation)
        const timelineMap = new Map<string, { events: number; credits: bigint }>();
        events.forEach((event) => {
          const dateKey = event.timestamp.toISOString().split('T')[0] as string; // YYYY-MM-DD
          const existing = timelineMap.get(dateKey) || { events: 0, credits: BigInt(0) };
          timelineMap.set(dateKey, {
            events: existing.events + 1,
            credits: existing.credits + (event.creditsBurned || BigInt(0)),
          });
        });

        const timeline = Array.from(timelineMap.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([date, stats]) => ({
            date,
            events: stats.events,
            creditsBurned: stats.credits.toString(),
          }));

        return reply.send({
          data: {
            summary,
            byFeature,
            byProvider,
            byEventType,
            timeline,
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching usage analytics');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch usage analytics',
        });
      }
    }
  );

  // Cost Analytics - Get cost breakdown
  app.get(
    '/v1/analytics/costs',
    {
      schema: {
        tags: ['Analytics'],
        description: 'Get cost breakdown and margin analysis',
        querystring: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
          },
        },
        response: withCommonResponses({
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  summary: {
                    type: 'object',
                    properties: {
                      totalRevenue: { type: 'string' },
                      totalProviderCost: { type: 'string' },
                      totalMargin: { type: 'string' },
                      marginPercent: { type: 'number' },
                    },
                  },
                  byProvider: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        provider: { type: 'string' },
                        model: { type: 'string' },
                        providerCost: { type: 'string' },
                        revenue: { type: 'string' },
                        margin: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        }, [403, 500]),
      },
    },
    async (request: any, reply) => {
      try {
        const { customerId, startDate, endDate } = request.query;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Date range defaults
        const start = startDate ? new Date(startDate as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const end = endDate ? new Date(endDate as string) : new Date();

        // Get usage events with costs
        const events = await db.usageEvent.findMany({
          where: {
            customerId,
            timestamp: {
              gte: start,
              lte: end,
            },
          },
          select: {
            provider: true,
            model: true,
            costUsd: true,
            creditsBurned: true,
          },
        });

        // Calculate totals (assuming 1000 credits = 1 USD revenue)
        const totalProviderCost = events.reduce((sum, e) => sum + Number(e.costUsd || 0), 0);
        const totalRevenue = events.reduce((sum, e) => sum + Number(e.creditsBurned || 0) / 1000, 0);
        const totalMargin = totalRevenue - totalProviderCost;
        const marginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

        // Group by provider
        const providerMap = new Map<string, { providerCost: number; revenue: number }>();
        events.forEach((event) => {
          if (event.provider && event.model) {
            const key = `${event.provider}:${event.model}`;
            const existing = providerMap.get(key) || { providerCost: 0, revenue: 0 };
            providerMap.set(key, {
              providerCost: existing.providerCost + Number(event.costUsd || 0),
              revenue: existing.revenue + Number(event.creditsBurned || 0) / 1000,
            });
          }
        });

        const byProvider = Array.from(providerMap.entries()).map(([key, stats]) => {
          const [provider, model] = key.split(':');
          const margin = stats.revenue - stats.providerCost;
          return {
            provider,
            model,
            providerCost: stats.providerCost.toFixed(4),
            revenue: stats.revenue.toFixed(4),
            margin: margin.toFixed(4),
          };
        });

        return reply.send({
          data: {
            summary: {
              totalRevenue: totalRevenue.toFixed(4),
              totalProviderCost: totalProviderCost.toFixed(4),
              totalMargin: totalMargin.toFixed(4),
              marginPercent: parseFloat(marginPercent.toFixed(2)),
            },
            byProvider,
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching cost analytics');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch cost analytics',
        });
      }
    }
  );

  // Burn Rate Analytics - Get credit consumption rate
  app.get(
    '/v1/analytics/burn-rate',
    {
      schema: {
        tags: ['Analytics'],
        description: 'Get credit burn rate and consumption trends',
        querystring: {
          type: 'object',
          properties: {
            customerId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
          },
        },
        response: withCommonResponses({
          200: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  currentBalance: { type: 'string' },
                  last7Days: {
                    type: 'object',
                    properties: {
                      creditsBurned: { type: 'string' },
                      averagePerDay: { type: 'string' },
                    },
                  },
                  last30Days: {
                    type: 'object',
                    properties: {
                      creditsBurned: { type: 'string' },
                      averagePerDay: { type: 'string' },
                    },
                  },
                  projectedRunout: {
                    type: 'object',
                    properties: {
                      daysRemaining: { type: 'number' },
                      estimatedRunoutDate: { type: 'string', nullable: true },
                    },
                  },
                  recommendations: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        type: { type: 'string' },
                        message: { type: 'string' },
                        action: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        }, [403, 404, 500]),
      },
    },
    async (request: any, reply) => {
      try {
        const { customerId, userId } = request.query;

        // Verify customer access
        if (customerId !== request.customer!.id) {
          return reply.status(403).send({
            error: 'Forbidden',
            message: 'Access denied to this customer',
          });
        }

        // Get credit wallet
        const walletQuery: any = { customerId };
        if (userId) {
          walletQuery.userId = userId;
        } else {
          walletQuery.userId = null;
          walletQuery.teamId = null;
        }

        const wallet = await db.creditWallet.findFirst({
          where: walletQuery,
        });

        if (!wallet) {
          return reply.status(404).send({
            error: 'Not Found',
            message: 'Credit wallet not found',
          });
        }

        const currentBalance = Number(wallet.balance) - Number(wallet.reservedBalance);

        // Get burn transactions for last 30 days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const [transactions30Days, transactions7Days] = await Promise.all([
          db.creditTransaction.findMany({
            where: {
              walletId: wallet.id,
              transactionType: 'BURN',
              createdAt: { gte: thirtyDaysAgo },
            },
            select: {
              amount: true,
              createdAt: true,
            },
          }),
          db.creditTransaction.findMany({
            where: {
              walletId: wallet.id,
              transactionType: 'BURN',
              createdAt: { gte: sevenDaysAgo },
            },
            select: {
              amount: true,
            },
          }),
        ]);

        // Calculate burn rates
        const burned7Days = transactions7Days.reduce((sum, tx) => sum + Number(tx.amount), 0);
        const burned30Days = transactions30Days.reduce((sum, tx) => sum + Number(tx.amount), 0);

        const avgPerDay7 = burned7Days / 7;
        const avgPerDay30 = burned30Days / 30;

        // Project runout date (using 7-day average as more recent)
        let daysRemaining = avgPerDay7 > 0 ? currentBalance / avgPerDay7 : null;
        let runoutDate = null;

        if (daysRemaining !== null && daysRemaining > 0) {
          runoutDate = new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000).toISOString();
          daysRemaining = Math.floor(daysRemaining);
        }

        // Generate recommendations
        const recommendations: Array<{ type: string; message: string; action: string }> = [];

        if (daysRemaining !== null && daysRemaining < 7) {
          recommendations.push({
            type: 'urgent',
            message: `Credits will run out in ${daysRemaining} days. Purchase more to avoid service interruption.`,
            action: 'purchase_credits',
          });
        } else if (daysRemaining !== null && daysRemaining < 14) {
          recommendations.push({
            type: 'warning',
            message: `Credits will run out in ${daysRemaining} days. Consider purchasing more soon.`,
            action: 'purchase_credits',
          });
        }

        if (avgPerDay7 > avgPerDay30 * 1.5) {
          recommendations.push({
            type: 'alert',
            message: 'Your burn rate has increased 50% in the last 7 days. Review usage patterns.',
            action: 'review_usage',
          });
        }

        return reply.send({
          data: {
            currentBalance: currentBalance.toString(),
            last7Days: {
              creditsBurned: burned7Days.toString(),
              averagePerDay: avgPerDay7.toFixed(2),
            },
            last30Days: {
              creditsBurned: burned30Days.toString(),
              averagePerDay: avgPerDay30.toFixed(2),
            },
            projectedRunout: {
              daysRemaining: daysRemaining !== null ? daysRemaining : null,
              estimatedRunoutDate: runoutDate,
            },
            recommendations,
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching burn rate analytics');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch burn rate analytics',
        });
      }
    }
  );
}
