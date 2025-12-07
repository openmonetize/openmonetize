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
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getPrismaClient, Prisma } from "@openmonetize/common";
import { authenticate } from "../middleware/auth";
import { logger } from "../logger";
import { withCommonResponses } from "../types/schemas";
import type {
  GetUsageAnalyticsRoute,
  GetCostAnalyticsRoute,
  GetBurnRateAnalyticsRoute,
} from "../types/routes";

const db = getPrismaClient();

const usageQuerySchema = z.object({
  customerId: z.string().min(1).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(["day", "week", "month"]).optional(),
  provider: z.string().optional(),
  model: z.string().optional(),
  featureId: z.string().optional(),
});

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Parse a comma-separated string into an array of trimmed, non-empty values
 */
function parseCommaSeparatedFilter(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * Get default date range (last 30 days)
 */
function getDefaultDateRange(startDate?: string, endDate?: string) {
  const start = startDate
    ? new Date(startDate)
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const end = endDate ? new Date(endDate) : new Date();
  return { start, end };
}

/**
 * Verify customer access and return target customer ID
 * Throws 403 error if access is denied
 */
function verifyCustomerAccess(
  customerId: string | undefined,
  authenticatedCustomerId: string,
  reply: any,
): string | null {
  const targetCustomerId = customerId || authenticatedCustomerId;
  if (targetCustomerId !== authenticatedCustomerId) {
    reply.status(403).send({
      error: "Forbidden",
      message: "Access denied to this customer",
    });
    return null;
  }
  return targetCustomerId;
}

export const analyticsRoutes: FastifyPluginAsyncZod = async (app) => {
  // Register authentication for all analytics routes
  app.addHook("preHandler", authenticate);

  // Usage Analytics - Get usage by feature
  app.get<GetUsageAnalyticsRoute>(
    "/v1/analytics/usage",
    {
      schema: {
        tags: ["Analytics"],
        "x-visibility": "public",
        description: "Get usage analytics by feature for a customer",
        querystring: usageQuerySchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                summary: z.object({
                  totalEvents: z.number(),
                  totalInputTokens: z.string(),
                  totalOutputTokens: z.string(),
                  totalCreditsBurned: z.string(),
                  totalCostUsd: z.string(),
                }),
                byFeature: z.array(
                  z.object({
                    featureId: z.string(),
                    eventCount: z.number(),
                    creditsBurned: z.string(),
                    costUsd: z.string(),
                  }),
                ),
                byProvider: z.array(
                  z.object({
                    provider: z.string(),
                    model: z.string(),
                    eventCount: z.number(),
                    inputTokens: z.string(),
                    outputTokens: z.string(),
                  }),
                ),
                byEventType: z.array(
                  z.object({
                    eventType: z.string(),
                    eventCount: z.number(),
                    creditsBurned: z.string(),
                    costUsd: z.string(),
                  }),
                ),
                timeline: z.array(
                  z.object({
                    date: z.string(),
                    events: z.number(),
                    creditsBurned: z.string(),
                  }),
                ),
              }),
            }),
          },
          [403, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { customerId, startDate, endDate, provider, model, featureId } =
          request.query;

        // Verify customer access
        const targetCustomerId = verifyCustomerAccess(
          customerId,
          request.customer!.id,
          reply,
        );
        if (!targetCustomerId) return;

        // Parse filters
        const providerFilters = parseCommaSeparatedFilter(provider);
        const modelFilters = parseCommaSeparatedFilter(model);
        const featureFilters = parseCommaSeparatedFilter(featureId);

        // Get date range
        const { start, end } = getDefaultDateRange(startDate, endDate);

        // Build where clause with type safety
        const whereClause: Prisma.UsageEventWhereInput = {
          customerId: targetCustomerId,
          timestamp: {
            gte: start,
            lte: end,
          },
          ...(providerFilters.length > 0 && {
            provider: {
              in: providerFilters as Prisma.EnumProviderNameNullableFilter<"UsageEvent">["in"],
            },
          }),
          ...(modelFilters.length > 0 && { model: { in: modelFilters } }),
          ...(featureFilters.length > 0 && {
            featureId: { in: featureFilters },
          }),
        };

        // Get usage events
        const events = await db.usageEvent.findMany({
          where: whereClause,
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
            timestamp: "asc",
          },
        });

        // Calculate summary
        const summary = {
          totalEvents: events.length,
          totalInputTokens: events
            .reduce(
              (sum: number, e: (typeof events)[number]) =>
                sum + Number(e.inputTokens || 0),
              0,
            )
            .toString(),
          totalOutputTokens: events
            .reduce(
              (sum: number, e: (typeof events)[number]) =>
                sum + Number(e.outputTokens || 0),
              0,
            )
            .toString(),
          totalCreditsBurned: events
            .reduce(
              (sum: number, e: (typeof events)[number]) =>
                sum + Number(e.creditsBurned || 0),
              0,
            )
            .toString(),
          totalCostUsd: events
            .reduce(
              (sum: number, e: (typeof events)[number]) =>
                sum + Number(e.costUsd || 0),
              0,
            )
            .toFixed(4),
        };

        // Group by feature
        const featureMap = new Map<
          string,
          { count: number; credits: bigint; cost: number }
        >();
        events.forEach((event: (typeof events)[number]) => {
          const existing = featureMap.get(event.featureId) || {
            count: 0,
            credits: BigInt(0),
            cost: 0,
          };
          featureMap.set(event.featureId, {
            count: existing.count + 1,
            credits: existing.credits + (event.creditsBurned || BigInt(0)),
            cost: existing.cost + Number(event.costUsd || 0),
          });
        });

        const byFeature = Array.from(featureMap.entries()).map(
          ([featureId, stats]) => ({
            featureId,
            eventCount: stats.count,
            creditsBurned: stats.credits.toString(),
            costUsd: stats.cost.toFixed(4),
          }),
        );

        // Group by provider
        const providerMap = new Map<
          string,
          { count: number; inputTokens: bigint; outputTokens: bigint }
        >();
        events.forEach((event: (typeof events)[number]) => {
          if (event.provider && event.model) {
            const key = `${String(event.provider)}:${event.model}`;
            const existing = providerMap.get(key) || {
              count: 0,
              inputTokens: BigInt(0),
              outputTokens: BigInt(0),
            };
            providerMap.set(key, {
              count: existing.count + 1,
              inputTokens:
                existing.inputTokens + (event.inputTokens || BigInt(0)),
              outputTokens:
                existing.outputTokens + (event.outputTokens || BigInt(0)),
            });
          }
        });

        const byProvider = Array.from(providerMap.entries()).map(
          ([key, stats]) => {
            const [provider = "UNKNOWN", model = "unknown"] = key.split(":");
            return {
              provider,
              model,
              eventCount: stats.count,
              inputTokens: stats.inputTokens.toString(),
              outputTokens: stats.outputTokens.toString(),
            };
          },
        );

        // Group by event type
        const eventTypeMap = new Map<
          string,
          { count: number; credits: bigint; cost: number }
        >();
        events.forEach((event: (typeof events)[number]) => {
          const key = String(event.eventType || "UNKNOWN");
          const existing = eventTypeMap.get(key) || {
            count: 0,
            credits: BigInt(0),
            cost: 0,
          };
          eventTypeMap.set(key, {
            count: existing.count + 1,
            credits: existing.credits + (event.creditsBurned || BigInt(0)),
            cost: existing.cost + Number(event.costUsd || 0),
          });
        });

        const byEventType = Array.from(eventTypeMap.entries()).map(
          ([eventType, stats]) => ({
            eventType,
            eventCount: stats.count,
            creditsBurned: stats.credits.toString(),
            costUsd: stats.cost.toFixed(4),
          }),
        );

        // Create timeline (daily aggregation)
        const timelineMap = new Map<
          string,
          { events: number; credits: bigint }
        >();
        events.forEach((event: (typeof events)[number]) => {
          const dateKey = event.timestamp.toISOString().split("T")[0] as string; // YYYY-MM-DD
          const existing = timelineMap.get(dateKey) || {
            events: 0,
            credits: BigInt(0),
          };
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
        logger.error({ err: error }, "Error fetching usage analytics");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to fetch usage analytics",
        });
      }
    },
  );

  // Cost Analytics - Get cost breakdown
  app.get<GetCostAnalyticsRoute>(
    "/v1/analytics/costs",
    {
      schema: {
        tags: ["Analytics"],
        "x-visibility": "public",
        description: "Get cost breakdown and margin analysis",
        querystring: z.object({
          customerId: z.string().min(1).optional(),
          startDate: z.string().datetime().optional(),
          endDate: z.string().datetime().optional(),
        }),
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                summary: z.object({
                  totalRevenue: z.string(),
                  totalProviderCost: z.string(),
                  totalMargin: z.string(),
                  marginPercent: z.number(),
                }),
                byProvider: z.array(
                  z.object({
                    provider: z.string(),
                    model: z.string(),
                    providerCost: z.string(),
                    revenue: z.string(),
                    margin: z.string(),
                  }),
                ),
              }),
            }),
          },
          [403, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { customerId, startDate, endDate } = request.query;

        // Verify customer access
        const targetCustomerId = verifyCustomerAccess(
          customerId,
          request.customer!.id,
          reply,
        );
        if (!targetCustomerId) return;

        // Get date range
        const { start, end } = getDefaultDateRange(startDate, endDate);

        // Get usage events with costs
        const events = await db.usageEvent.findMany({
          where: {
            customerId: targetCustomerId,
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
        const totalProviderCost = events.reduce(
          (sum: number, e: (typeof events)[number]) =>
            sum + Number(e.costUsd || 0),
          0,
        );
        const totalRevenue = events.reduce(
          (sum: number, e: (typeof events)[number]) =>
            sum + Number(e.creditsBurned || 0) / 1000,
          0,
        );
        const totalMargin = totalRevenue - totalProviderCost;
        const marginPercent =
          totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

        // Group by provider
        const providerMap = new Map<
          string,
          { providerCost: number; revenue: number }
        >();
        events.forEach((event: (typeof events)[number]) => {
          if (event.provider && event.model) {
            const key = `${event.provider}:${event.model}`;
            const existing = providerMap.get(key) || {
              providerCost: 0,
              revenue: 0,
            };
            providerMap.set(key, {
              providerCost: existing.providerCost + Number(event.costUsd || 0),
              revenue:
                existing.revenue + Number(event.creditsBurned || 0) / 1000,
            });
          }
        });

        const byProvider = Array.from(providerMap.entries()).map(
          ([key, stats]) => {
            const [provider, model] = key.split(":");
            const margin = stats.revenue - stats.providerCost;
            return {
              provider,
              model,
              providerCost: stats.providerCost.toFixed(4),
              revenue: stats.revenue.toFixed(4),
              margin: margin.toFixed(4),
            };
          },
        );

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
        logger.error({ err: error }, "Error fetching cost analytics");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to fetch cost analytics",
        });
      }
    },
  );

  // Burn Rate Analytics - Get credit consumption rate
  app.get<GetBurnRateAnalyticsRoute>(
    "/v1/analytics/burn-rate",
    {
      schema: {
        tags: ["Analytics"],
        "x-visibility": "public",
        description: "Get credit burn rate and consumption trends",
        querystring: z.object({
          customerId: z.string().min(1).optional(),
          userId: z.string().min(1).optional(),
        }),
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                currentBalance: z.string(),
                last7Days: z.object({
                  creditsBurned: z.string(),
                  averagePerDay: z.string(),
                }),
                last30Days: z.object({
                  creditsBurned: z.string(),
                  averagePerDay: z.string(),
                }),
                projectedRunout: z.object({
                  daysRemaining: z.number().nullable(),
                  estimatedRunoutDate: z.string().nullable(),
                }),
                recommendations: z.array(
                  z.object({
                    type: z.string(),
                    message: z.string(),
                    action: z.string(),
                  }),
                ),
              }),
            }),
          },
          [403, 404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { customerId, userId } = request.query;

        // Verify customer access
        const targetCustomerId = verifyCustomerAccess(
          customerId,
          request.customer!.id,
          reply,
        );
        if (!targetCustomerId) return;

        // Build wallet query with proper typing
        const walletQuery: Prisma.CreditWalletWhereInput = {
          customerId: targetCustomerId,
          userId: userId || null,
          teamId: null,
        };

        const wallet = await db.creditWallet.findFirst({
          where: walletQuery,
        });

        if (!wallet) {
          return reply.status(404).send({
            error: "Not Found",
            message: "Credit wallet not found",
          });
        }

        const currentBalance =
          Number(wallet.balance) - Number(wallet.reservedBalance);

        // Get burn transactions for last 30 days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const [transactions30Days, transactions7Days] = await Promise.all([
          db.creditTransaction.findMany({
            where: {
              walletId: wallet.id,
              transactionType: "BURN",
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
              transactionType: "BURN",
              createdAt: { gte: sevenDaysAgo },
            },
            select: {
              amount: true,
            },
          }),
        ]);

        // Calculate burn rates
        const burned7Days = transactions7Days.reduce(
          (sum: number, tx: (typeof transactions7Days)[number]) =>
            sum + Number(tx.amount),
          0,
        );
        const burned30Days = transactions30Days.reduce(
          (sum: number, tx: (typeof transactions30Days)[number]) =>
            sum + Number(tx.amount),
          0,
        );

        const avgPerDay7 = burned7Days / 7;
        const avgPerDay30 = burned30Days / 30;

        // Project runout date (using 7-day average as more recent)
        let daysRemaining = avgPerDay7 > 0 ? currentBalance / avgPerDay7 : null;
        let runoutDate = null;

        if (daysRemaining !== null && daysRemaining > 0) {
          runoutDate = new Date(
            Date.now() + daysRemaining * 24 * 60 * 60 * 1000,
          ).toISOString();
          daysRemaining = Math.floor(daysRemaining);
        }

        // Generate recommendations
        const recommendations: Array<{
          type: string;
          message: string;
          action: string;
        }> = [];

        if (daysRemaining !== null && daysRemaining < 7) {
          recommendations.push({
            type: "urgent",
            message: `Credits will run out in ${daysRemaining} days. Purchase more to avoid service interruption.`,
            action: "purchase_credits",
          });
        } else if (daysRemaining !== null && daysRemaining < 14) {
          recommendations.push({
            type: "warning",
            message: `Credits will run out in ${daysRemaining} days. Consider purchasing more soon.`,
            action: "purchase_credits",
          });
        }

        if (avgPerDay7 > avgPerDay30 * 1.5) {
          recommendations.push({
            type: "alert",
            message:
              "Your burn rate has increased 50% in the last 7 days. Review usage patterns.",
            action: "review_usage",
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
        logger.error({ err: error }, "Error fetching burn rate analytics");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to fetch burn rate analytics",
        });
      }
    },
  );
};
