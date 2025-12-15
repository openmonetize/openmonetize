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

// Super Admin Routes - Platform-wide management for super admins
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getPrismaClient } from "@openmonetize/common";
import {
  authenticateSuperAdmin,
  SuperAdminRequest,
} from "../middleware/super-admin-auth";
import { withCommonResponses } from "../types/schemas";
import { logger } from "../logger";

const db = getPrismaClient();

const ListCustomersQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  search: z.string().optional(),
  tier: z.enum(["STARTER", "GROWTH", "ENTERPRISE"]).optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "CHURNED"]).optional(),
});

const CustomerIdParamSchema = z.object({
  customerId: z.string().uuid(),
});

export const superAdminRoutes: FastifyPluginAsyncZod = async (app) => {
  // Register super admin authentication for all routes
  app.addHook("preHandler", authenticateSuperAdmin as any);

  // ============================================================================
  // PLATFORM STATS
  // ============================================================================

  app.get(
    "/v1/admin/stats",
    {
      schema: {
        tags: ["Super Admin"],
        "x-visibility": "admin",
        description: "Get platform-wide statistics (super admin only)",
        security: [{ bearerAuth: [] }],
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                totalCustomers: z.number(),
                totalUsers: z.number(),
                totalCredits: z.number(),
                customersByTier: z.object({
                  STARTER: z.number(),
                  GROWTH: z.number(),
                  ENTERPRISE: z.number(),
                }),
                customersByStatus: z.object({
                  ACTIVE: z.number(),
                  SUSPENDED: z.number(),
                  CHURNED: z.number(),
                }),
                recentCustomers: z.array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                    tier: z.string(),
                    createdAt: z.string(),
                  }),
                ),
              }),
            }),
          },
          [401, 403, 500],
        ),
      },
    },
    async (_request, reply) => {
      try {
        // Get total counts
        const [
          totalCustomers,
          totalUsers,
          creditWallets,
          starterCount,
          growthCount,
          enterpriseCount,
          activeCount,
          suspendedCount,
          churnedCount,
          recentCustomers,
        ] = await Promise.all([
          db.customer.count(),
          db.user.count(),
          db.creditWallet.aggregate({
            _sum: { balance: true },
          }),
          db.customer.count({ where: { tier: "STARTER" } }),
          db.customer.count({ where: { tier: "GROWTH" } }),
          db.customer.count({ where: { tier: "ENTERPRISE" } }),
          db.customer.count({ where: { status: "ACTIVE" } }),
          db.customer.count({ where: { status: "SUSPENDED" } }),
          db.customer.count({ where: { status: "CHURNED" } }),
          db.customer.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              name: true,
              email: true,
              tier: true,
              createdAt: true,
            },
          }),
        ]);

        return reply.status(200).send({
          data: {
            totalCustomers,
            totalUsers,
            totalCredits: Number(creditWallets._sum.balance || 0),
            customersByTier: {
              STARTER: starterCount,
              GROWTH: growthCount,
              ENTERPRISE: enterpriseCount,
            },
            customersByStatus: {
              ACTIVE: activeCount,
              SUSPENDED: suspendedCount,
              CHURNED: churnedCount,
            },
            recentCustomers: recentCustomers.map((c) => ({
              id: c.id,
              name: c.name,
              email: c.email,
              tier: c.tier,
              createdAt: c.createdAt.toISOString(),
            })),
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error fetching platform stats");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to fetch platform statistics",
        });
      }
    },
  );

  // ============================================================================
  // LIST ALL CUSTOMERS (SDK USERS)
  // ============================================================================

  app.get(
    "/v1/admin/customers",
    {
      schema: {
        tags: ["Super Admin"],
        "x-visibility": "admin",
        description: "List all customers/SDK users (super admin only)",
        security: [{ bearerAuth: [] }],
        querystring: ListCustomersQuerySchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  email: z.string(),
                  tier: z.string(),
                  status: z.string(),
                  createdAt: z.string(),
                  updatedAt: z.string(),
                  userCount: z.number(),
                  creditBalance: z.number(),
                }),
              ),
              pagination: z.object({
                limit: z.number(),
                offset: z.number(),
                total: z.number(),
              }),
            }),
          },
          [401, 403, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { limit, offset, search, tier, status } = request.query;

        // Build where clause
        const where: {
          tier?: "STARTER" | "GROWTH" | "ENTERPRISE";
          status?: "ACTIVE" | "SUSPENDED" | "CHURNED";
          OR?: Array<{
            name?: { contains: string; mode: "insensitive" };
            email?: { contains: string; mode: "insensitive" };
          }>;
        } = {};

        if (tier) {
          where.tier = tier;
        }
        if (status) {
          where.status = status;
        }
        if (search) {
          where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ];
        }

        // Get customers with aggregated data
        const [customers, total] = await Promise.all([
          db.customer.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              name: true,
              email: true,
              tier: true,
              status: true,
              createdAt: true,
              updatedAt: true,
              _count: {
                select: { users: true },
              },
              creditWallets: {
                select: { balance: true },
              },
            },
          }),
          db.customer.count({ where }),
        ]);

        const data = customers.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          tier: c.tier,
          status: c.status,
          createdAt: c.createdAt.toISOString(),
          updatedAt: c.updatedAt.toISOString(),
          userCount: c._count.users,
          creditBalance: c.creditWallets.reduce(
            (sum, w) => sum + Number(w.balance),
            0,
          ),
        }));

        return reply.status(200).send({
          data,
          pagination: {
            limit,
            offset,
            total,
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error listing customers");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to list customers",
        });
      }
    },
  );

  // ============================================================================
  // GET SINGLE CUSTOMER DETAILS
  // ============================================================================

  app.get(
    "/v1/admin/customers/:customerId",
    {
      schema: {
        tags: ["Super Admin"],
        "x-visibility": "admin",
        description:
          "Get detailed information about a specific customer (super admin only)",
        security: [{ bearerAuth: [] }],
        params: CustomerIdParamSchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                tier: z.string(),
                status: z.string(),
                createdAt: z.string(),
                updatedAt: z.string(),
                userCount: z.number(),
                creditBalance: z.number(),
                totalUsageEvents: z.number(),
                recentUsers: z.array(
                  z.object({
                    id: z.string(),
                    externalUserId: z.string(),
                    email: z.string().nullable(),
                    createdAt: z.string(),
                  }),
                ),
                recentTransactions: z.array(
                  z.object({
                    id: z.string(),
                    transactionType: z.string(),
                    amount: z.number(),
                    createdAt: z.string(),
                  }),
                ),
              }),
            }),
          },
          [401, 403, 404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { customerId } = request.params;

        const customer = await db.customer.findUnique({
          where: { id: customerId },
          select: {
            id: true,
            name: true,
            email: true,
            tier: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: { users: true, usageEvents: true },
            },
            creditWallets: {
              select: { balance: true },
            },
            users: {
              take: 10,
              orderBy: { createdAt: "desc" },
              select: {
                id: true,
                externalUserId: true,
                email: true,
                createdAt: true,
              },
            },
            creditTransactions: {
              take: 10,
              orderBy: { createdAt: "desc" },
              select: {
                id: true,
                transactionType: true,
                amount: true,
                createdAt: true,
              },
            },
          },
        });

        if (!customer) {
          return reply.status(404).send({
            error: "Not Found",
            message: "Customer not found",
          });
        }

        return reply.status(200).send({
          data: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            tier: customer.tier,
            status: customer.status,
            createdAt: customer.createdAt.toISOString(),
            updatedAt: customer.updatedAt.toISOString(),
            userCount: customer._count.users,
            creditBalance: customer.creditWallets.reduce(
              (sum, w) => sum + Number(w.balance),
              0,
            ),
            totalUsageEvents: customer._count.usageEvents,
            recentUsers: customer.users.map((u) => ({
              id: u.id,
              externalUserId: u.externalUserId,
              email: u.email,
              createdAt: u.createdAt.toISOString(),
            })),
            recentTransactions: customer.creditTransactions.map((t) => ({
              id: t.id,
              transactionType: t.transactionType,
              amount: Number(t.amount),
              createdAt: t.createdAt.toISOString(),
            })),
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error fetching customer details");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to fetch customer details",
        });
      }
    },
  );

  // ============================================================================
  // CHECK SUPER ADMIN STATUS
  // ============================================================================

  app.get(
    "/v1/admin/me",
    {
      schema: {
        tags: ["Super Admin"],
        "x-visibility": "admin",
        description: "Check if current user is a super admin",
        security: [{ bearerAuth: [] }],
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                isSuperAdmin: z.boolean(),
                email: z.string(),
                name: z.string(),
              }),
            }),
          },
          [401, 403, 500],
        ),
      },
    },
    async (request, reply) => {
      const req = request as unknown as SuperAdminRequest;
      try {
        return reply.status(200).send({
          data: {
            isSuperAdmin: req.isSuperAdmin,
            email: req.customer?.email || "",
            name: req.customer?.name || "",
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error checking super admin status");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to check admin status",
        });
      }
    },
  );
};
