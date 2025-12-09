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

// User management routes
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getPrismaClient } from "@openmonetize/common";
import { authenticate } from "../middleware/auth";
import { logger } from "../logger";
import { withCommonResponses } from "../types/schemas";

const db = getPrismaClient();

// Request schemas
const CreateUserSchema = z.object({
  externalUserId: z.string().min(1).max(255),
  email: z.string().email().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

const UserIdParamSchema = z.object({
  userId: z.string().min(1),
});

const ListUsersQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  search: z.string().optional(),
});

export const usersRoutes: FastifyPluginAsyncZod = async (app) => {
  // Register authentication for all user routes
  app.addHook("preHandler", authenticate);

  // List all users for the authenticated customer
  app.get(
    "/v1/users",
    {
      schema: {
        tags: ["Users"],
        "x-visibility": "internal",
        description: "List all users for the authenticated customer",
        security: [{ bearerAuth: [] }],
        querystring: ListUsersQuerySchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.array(
                z.object({
                  id: z.string(),
                  externalUserId: z.string(),
                  email: z.string().nullable(),
                  metadata: z.any().nullable(),
                  createdAt: z.string(),
                  updatedAt: z.string(),
                  creditBalance: z.number(),
                  totalEvents: z.number(),
                }),
              ),
              pagination: z.object({
                limit: z.number(),
                offset: z.number(),
                total: z.number(),
              }),
            }),
          },
          [401, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        if (!request.customer) {
          return reply.status(401).send({
            error: "Unauthorized",
            message: "Authentication required",
          });
        }

        const { limit, offset, search } = request.query;
        const customerId = request.customer.id;

        // Build search filter
        const searchFilter = search
          ? {
              OR: [
                {
                  externalUserId: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
                { email: { contains: search, mode: "insensitive" as const } },
              ],
            }
          : {};

        // Get users with credit balance and event count
        const [users, total] = await Promise.all([
          db.user.findMany({
            where: {
              customerId,
              ...searchFilter,
            },
            include: {
              creditWallets: {
                select: {
                  balance: true,
                },
              },
              _count: {
                select: {
                  usageEvents: true,
                },
              },
            },
            orderBy: { createdAt: "desc" },
            take: limit,
            skip: offset,
          }),
          db.user.count({
            where: {
              customerId,
              ...searchFilter,
            },
          }),
        ]);

        return reply.send({
          data: users.map((user) => ({
            id: user.id,
            externalUserId: user.externalUserId,
            email: user.email,
            metadata: user.metadata,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            creditBalance: user.creditWallets.reduce(
              (sum, w) => sum + Number(w.balance),
              0,
            ),
            totalEvents: user._count.usageEvents,
          })),
          pagination: {
            limit,
            offset,
            total,
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error listing users");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to list users",
        });
      }
    },
  );

  // Get a specific user by ID
  app.get(
    "/v1/users/:userId",
    {
      schema: {
        tags: ["Users"],
        "x-visibility": "internal",
        description: "Get a specific user by ID",
        security: [{ bearerAuth: [] }],
        params: UserIdParamSchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.object({
                id: z.string(),
                externalUserId: z.string(),
                email: z.string().nullable(),
                metadata: z.any().nullable(),
                createdAt: z.string(),
                updatedAt: z.string(),
                creditBalance: z.number(),
                reservedBalance: z.number(),
                totalEvents: z.number(),
                totalCreditsBurned: z.number(),
                recentEvents: z.array(
                  z.object({
                    id: z.string(),
                    eventType: z.string(),
                    featureId: z.string(),
                    provider: z.string().nullable(),
                    model: z.string().nullable(),
                    creditsBurned: z.number(),
                    timestamp: z.string(),
                  }),
                ),
              }),
            }),
          },
          [401, 404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        if (!request.customer) {
          return reply.status(401).send({
            error: "Unauthorized",
            message: "Authentication required",
          });
        }

        const { userId } = request.params;
        const customerId = request.customer.id;

        // Get user with credit balance and recent events
        const user = await db.user.findFirst({
          where: {
            id: userId,
            customerId,
          },
          include: {
            creditWallets: {
              select: {
                balance: true,
                reservedBalance: true,
              },
            },
            usageEvents: {
              orderBy: { timestamp: "desc" },
              take: 10,
              select: {
                id: true,
                eventType: true,
                featureId: true,
                provider: true,
                model: true,
                creditsBurned: true,
                timestamp: true,
              },
            },
            _count: {
              select: {
                usageEvents: true,
              },
            },
          },
        });

        if (!user) {
          return reply.status(404).send({
            error: "Not Found",
            message: "User not found",
          });
        }

        // Calculate total credits burned
        const totalCreditsBurned = await db.usageEvent.aggregate({
          where: {
            userId: user.id,
            customerId,
          },
          _sum: {
            creditsBurned: true,
          },
        });

        return reply.send({
          data: {
            id: user.id,
            externalUserId: user.externalUserId,
            email: user.email,
            metadata: user.metadata,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            creditBalance: user.creditWallets.reduce(
              (sum, w) => sum + Number(w.balance),
              0,
            ),
            reservedBalance: user.creditWallets.reduce(
              (sum, w) => sum + Number(w.reservedBalance),
              0,
            ),
            totalEvents: user._count.usageEvents,
            totalCreditsBurned: Number(
              totalCreditsBurned._sum.creditsBurned || 0,
            ),
            recentEvents: user.usageEvents.map((event) => ({
              id: event.id,
              eventType: event.eventType,
              featureId: event.featureId,
              provider: event.provider,
              model: event.model,
              creditsBurned: Number(event.creditsBurned),
              timestamp: event.timestamp.toISOString(),
            })),
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error fetching user");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to fetch user",
        });
      }
    },
  );

  // Create a new user
  app.post(
    "/v1/users",
    {
      schema: {
        tags: ["Users"],
        "x-visibility": "internal",
        description: "Create a new user for the authenticated customer",
        security: [{ bearerAuth: [] }],
        body: CreateUserSchema,
        response: withCommonResponses(
          {
            201: z.object({
              data: z.object({
                id: z.string(),
                externalUserId: z.string(),
                email: z.string().nullable(),
                metadata: z.any().nullable(),
                createdAt: z.string(),
              }),
            }),
          },
          [400, 401, 409, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        if (!request.customer) {
          return reply.status(401).send({
            error: "Unauthorized",
            message: "Authentication required",
          });
        }

        const { externalUserId, email, metadata } = request.body;
        const customerId = request.customer.id;

        // Check if user with this externalUserId already exists
        const existingUser = await db.user.findFirst({
          where: {
            customerId,
            externalUserId,
          },
        });

        if (existingUser) {
          return reply.status(409).send({
            error: "Conflict",
            message: "A user with this external ID already exists",
          });
        }

        // Create user
        const user = await db.user.create({
          data: {
            customerId,
            externalUserId,
            email,
            metadata: metadata || {},
          },
        });

        logger.info(
          { userId: user.id, customerId, externalUserId },
          "User created",
        );

        return reply.status(201).send({
          data: {
            id: user.id,
            externalUserId: user.externalUserId,
            email: user.email,
            metadata: user.metadata,
            createdAt: user.createdAt.toISOString(),
          },
        });
      } catch (error) {
        logger.error({ err: error }, "Error creating user");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to create user",
        });
      }
    },
  );
};
