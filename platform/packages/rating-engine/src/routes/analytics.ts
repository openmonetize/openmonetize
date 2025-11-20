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

// Analytics Routes

import { FastifyPluginAsync } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { z } from 'zod';
import { logger } from '../logger';
import { config } from '../config';

const db = getPrismaClient();

// Validation schemas
const analyticsQuerySchema = z.object({
  customerId: z.string().uuid(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(['day', 'week', 'month']).optional().default('day')
});

export const analyticsRoutes: FastifyPluginAsync = async (app) => {
  // Get cost breakdown by provider/model
  app.get('/cost-breakdown', async (request, reply) => {
    try {
      const query = analyticsQuerySchema.parse(request.query);

      const startDate = query.startDate
        ? new Date(query.startDate)
        : new Date(Date.now() - config.analytics.defaultTimeRange * 24 * 60 * 60 * 1000);

      const endDate = query.endDate ? new Date(query.endDate) : new Date();

      // Get usage events for the period
      const usageEvents = await db.usageEvent.findMany({
        where: {
          customerId: query.customerId,
          timestamp: {
            gte: startDate,
            lte: endDate
          }
        },
        select: {
          provider: true,
          model: true,
          inputTokens: true,
          outputTokens: true,
          creditsBurned: true,
          costUsd: true
        }
      });

      // Group by provider and model
      const breakdown = usageEvents.reduce((acc: any, event) => {
        const key = `${event.provider}/${event.model}`;
        if (!acc[key]) {
          acc[key] = {
            provider: event.provider,
            model: event.model,
            totalInputTokens: 0,
            totalOutputTokens: 0,
            totalCreditsBurned: 0,
            totalCostUsd: 0,
            eventCount: 0
          };
        }

        acc[key].totalInputTokens += event.inputTokens || 0;
        acc[key].totalOutputTokens += event.outputTokens || 0;
        acc[key].totalCreditsBurned += Number(event.creditsBurned);
        acc[key].totalCostUsd += Number(event.costUsd);
        acc[key].eventCount += 1;

        return acc;
      }, {});

      const data = Object.values(breakdown).sort((a: any, b: any) => b.totalCostUsd - a.totalCostUsd);

      // Calculate totals
      const totals = data.reduce(
        (acc: any, item: any) => ({
          totalInputTokens: acc.totalInputTokens + item.totalInputTokens,
          totalOutputTokens: acc.totalOutputTokens + item.totalOutputTokens,
          totalCreditsBurned: acc.totalCreditsBurned + item.totalCreditsBurned,
          totalCostUsd: acc.totalCostUsd + item.totalCostUsd,
          totalEvents: acc.totalEvents + item.eventCount
        }),
        {
          totalInputTokens: 0,
          totalOutputTokens: 0,
          totalCreditsBurned: 0,
          totalCostUsd: 0,
          totalEvents: 0
        }
      );

      return {
        data,
        totals,
        period: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          days: Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
        }
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400);
        return {
          error: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: error.errors
        };
      }

      logger.error({ error }, 'Failed to get cost breakdown');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to get cost breakdown'
      };
    }
  });

  // Get usage trends over time
  app.get('/usage-trends', async (request, reply) => {
    try {
      const query = analyticsQuerySchema.parse(request.query);

      const startDate = query.startDate
        ? new Date(query.startDate)
        : new Date(Date.now() - config.analytics.defaultTimeRange * 24 * 60 * 60 * 1000);

      const endDate = query.endDate ? new Date(query.endDate) : new Date();

      // Get usage events
      const usageEvents = await db.usageEvent.findMany({
        where: {
          customerId: query.customerId,
          timestamp: {
            gte: startDate,
            lte: endDate
          }
        },
        select: {
          timestamp: true,
          inputTokens: true,
          outputTokens: true,
          creditsBurned: true,
          costUsd: true
        },
        orderBy: {
          timestamp: 'asc'
        }
      });

      // Group by time period
      const groupByFn = (date: Date) => {
        switch (query.groupBy) {
          case 'week':
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            return weekStart.toISOString().split('T')[0];
          case 'month':
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          default: // day
            return date.toISOString().split('T')[0];
        }
      };

      const trends = usageEvents.reduce((acc: any, event) => {
        const key = groupByFn(new Date(event.timestamp));
        if (!acc[key]) {
          acc[key] = {
            period: key,
            totalInputTokens: 0,
            totalOutputTokens: 0,
            totalCreditsBurned: 0,
            totalCostUsd: 0,
            eventCount: 0
          };
        }

        acc[key].totalInputTokens += event.inputTokens || 0;
        acc[key].totalOutputTokens += event.outputTokens || 0;
        acc[key].totalCreditsBurned += Number(event.creditsBurned);
        acc[key].totalCostUsd += Number(event.costUsd);
        acc[key].eventCount += 1;

        return acc;
      }, {});

      const data = Object.values(trends).sort((a: any, b: any) => a.period.localeCompare(b.period));

      return {
        data,
        period: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          groupBy: query.groupBy
        }
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400);
        return {
          error: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: error.errors
        };
      }

      logger.error({ error }, 'Failed to get usage trends');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to get usage trends'
      };
    }
  });

  // Credit burn forecasting
  app.get('/burn-forecast', async (request, reply) => {
    try {
      const { customerId, days = 30 } = request.query as {
        customerId: string;
        days?: number;
      };

      if (!customerId) {
        reply.code(400);
        return {
          error: 'VALIDATION_ERROR',
          message: 'customerId is required'
        };
      }

      const forecastDays = Math.min(Number(days), 90);

      // Get historical data for the last 30 days
      const historicalStartDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const historicalEvents = await db.usageEvent.findMany({
        where: {
          customerId,
          timestamp: {
            gte: historicalStartDate
          }
        },
        select: {
          creditsBurned: true,
          timestamp: true
        }
      });

      if (historicalEvents.length === 0) {
        return {
          forecast: [],
          averageDailyBurn: 0,
          message: 'Insufficient historical data for forecasting'
        };
      }

      // Calculate average daily burn rate
      const totalBurn = historicalEvents.reduce((sum, event) => sum + Number(event.creditsBurned), 0);
      const averageDailyBurn = Math.ceil(totalBurn / 30);

      // Generate forecast
      const forecast = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 1; i <= forecastDays; i++) {
        const forecastDate = new Date(today);
        forecastDate.setDate(today.getDate() + i);

        forecast.push({
          date: forecastDate.toISOString().split('T')[0],
          predictedBurn: averageDailyBurn,
          cumulativeBurn: averageDailyBurn * i
        });
      }

      // Get current credit balance
      const wallet = await db.creditWallet.findFirst({
        where: { customerId },
        select: { balance: true }
      });

      const currentBalance = wallet ? Number(wallet.balance) : 0;
      const projectedBalance = currentBalance - (averageDailyBurn * forecastDays);
      const daysUntilDepleted = currentBalance > 0 ? Math.floor(currentBalance / averageDailyBurn) : 0;

      return {
        currentBalance,
        averageDailyBurn,
        forecast,
        projections: {
          balanceAfterPeriod: Math.max(0, projectedBalance),
          daysUntilDepleted,
          willDeplete: projectedBalance < 0
        }
      };
    } catch (error) {
      logger.error({ error }, 'Failed to generate burn forecast');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to generate burn forecast'
      };
    }
  });

  // Get customer summary statistics
  app.get('/summary/:customerId', async (request, reply) => {
    try {
      const { customerId } = request.params as { customerId: string };

      const [
        wallet,
        totalEvents,
        totalTransactions,
        recentEvents
      ] = await Promise.all([
        db.creditWallet.findFirst({
          where: { customerId },
          select: { balance: true, reservedBalance: true }
        }),
        db.usageEvent.count({
          where: { customerId }
        }),
        db.creditTransaction.count({
          where: { customerId }
        }),
        db.usageEvent.findMany({
          where: { customerId },
          orderBy: { timestamp: 'desc' },
          take: 10,
          select: {
            timestamp: true,
            provider: true,
            model: true,
            creditsBurned: true,
            costUsd: true
          }
        })
      ]);

      // Get last 30 days stats
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const recentStats = await db.usageEvent.aggregate({
        where: {
          customerId,
          timestamp: {
            gte: thirtyDaysAgo
          }
        },
        _sum: {
          inputTokens: true,
          outputTokens: true,
          creditsBurned: true,
          costUsd: true
        },
        _count: true
      });

      return {
        creditBalance: {
          available: wallet ? Number(wallet.balance) : 0,
          reserved: wallet ? Number(wallet.reservedBalance) : 0
        },
        lifetime: {
          totalEvents,
          totalTransactions
        },
        last30Days: {
          eventCount: recentStats._count,
          totalInputTokens: recentStats._sum.inputTokens || 0,
          totalOutputTokens: recentStats._sum.outputTokens || 0,
          totalCreditsBurned: recentStats._sum.creditsBurned ? Number(recentStats._sum.creditsBurned) : 0,
          totalCostUsd: recentStats._sum.costUsd ? Number(recentStats._sum.costUsd) : 0
        },
        recentActivity: recentEvents
      };
    } catch (error) {
      logger.error({ error }, 'Failed to get summary');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to get customer summary'
      };
    }
  });
};
