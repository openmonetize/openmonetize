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

// Rating Engine proxy routes
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { config } from "../config";
import { authenticate } from "../middleware/auth";
import { logger } from "../logger";
import { withCommonResponses } from "../types/schemas";

// Shared Schemas
const ProviderEnum = z.enum([
  "OPENAI",
  "ANTHROPIC",
  "GOOGLE",
  "COHERE",
  "MISTRAL",
]);

const CalculateCostSchema = z.object({
  provider: ProviderEnum,
  model: z.string().min(1),
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative(),
});

const BulkCalculateSchema = z.object({
  calculations: z
    .array(
      z.object({
        provider: ProviderEnum,
        model: z.string().min(1),
        inputTokens: z.number().int().nonnegative(),
        outputTokens: z.number().int().nonnegative(),
      }),
    )
    .min(1)
    .max(100),
});

const CreateBurnTableSchema = z.object({
  name: z.string().min(1).max(255),
  rules: z.record(
    z.string(),
    z.object({
      inputTokens: z.number().nonnegative(),
      outputTokens: z.number().nonnegative(),
      perUnit: z.number().positive().default(1000),
    }),
  ),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
});

const UpdateBurnTableSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  rules: z
    .record(
      z.string(),
      z.object({
        inputTokens: z.number().nonnegative(),
        outputTokens: z.number().nonnegative(),
        perUnit: z.number().positive().default(1000),
      }),
    )
    .optional(),
  isActive: z.boolean().optional(),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
});

const AnalyticsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(["day", "week", "month"]).optional().default("day"),
});

export const ratingRoutes: FastifyPluginAsyncZod = async (app) => {
  // Register authentication for all rating routes
  app.addHook("preHandler", authenticate);

  // --- Rating Routes ---

  app.post(
    "/v1/rating/calculate",
    {
      schema: {
        tags: ["Rating"],
        "x-visibility": "public",
        description: "Calculate cost for a single operation",
        body: CalculateCostSchema,
        response: withCommonResponses(
          {
            200: z.object({
              cost: z.number(),
              currency: z.string(),
              credits: z.number(),
            }),
          },
          [400, 404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        // Inject customerId from authenticated customer
        const body = { ...request.body, customerId: request.customer!.id };
        const response = await fetch(
          `${config.services.rating.url}/calculate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.post(
    "/v1/rating/calculate/bulk",
    {
      schema: {
        tags: ["Rating"],
        "x-visibility": "public",
        description: "Bulk cost calculation",
        body: BulkCalculateSchema,
        response: withCommonResponses(
          {
            200: z.object({
              customerId: z.string(),
              results: z.array(z.any()), // Simplified for now
              total: z.number(),
            }),
          },
          [400, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        // Inject customerId from authenticated customer
        const body = { ...request.body, customerId: request.customer!.id };
        const response = await fetch(
          `${config.services.rating.url}/calculate/bulk`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.get(
    "/v1/rating/pricing",
    {
      schema: {
        tags: ["Rating"],
        "x-visibility": "public",
        description: "Get all provider pricing",
        response: withCommonResponses(
          {
            200: z.object({
              data: z.array(z.any()),
              total: z.number(),
            }),
          },
          [500],
        ),
      },
    },
    async (_request, reply) => {
      try {
        const response = await fetch(`${config.services.rating.url}/pricing`);
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  // --- Burn Table Routes ---

  app.get(
    "/v1/burn-tables",
    {
      schema: {
        tags: ["Burn Tables"],
        "x-visibility": "public",
        description: "List all burn tables",
        querystring: z.object({
          isActive: z.string().optional(), // Query params are strings
        }),
        response: withCommonResponses(
          {
            200: z.object({
              data: z.array(z.any()),
              total: z.number(),
            }),
          },
          [500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const params = new URLSearchParams(request.query as any);
        params.set("customerId", request.customer!.id);
        const response = await fetch(
          `${config.services.rating.url}/burn-tables?${params.toString()}`,
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.get(
    "/v1/burn-tables/:id",
    {
      schema: {
        tags: ["Burn Tables"],
        "x-visibility": "public",
        description: "Get a specific burn table",
        params: z.object({ id: z.string().uuid() }),
        response: withCommonResponses(
          {
            200: z.object({ data: z.any() }),
          },
          [404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const response = await fetch(
          `${config.services.rating.url}/burn-tables/${id}`,
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.post(
    "/v1/burn-tables",
    {
      schema: {
        tags: ["Burn Tables"],
        "x-visibility": "public",
        description: "Create a new burn table",
        body: CreateBurnTableSchema,
        response: withCommonResponses(
          {
            201: z.object({ data: z.any() }),
          },
          [400, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const response = await fetch(
          `${config.services.rating.url}/burn-tables`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request.body),
          },
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.patch(
    "/v1/burn-tables/:id",
    {
      schema: {
        tags: ["Burn Tables"],
        "x-visibility": "public",
        description: "Update a burn table",
        params: z.object({ id: z.string().uuid() }),
        body: UpdateBurnTableSchema,
        response: withCommonResponses(
          {
            200: z.object({ data: z.any() }),
          },
          [400, 404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const response = await fetch(
          `${config.services.rating.url}/burn-tables/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request.body),
          },
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.delete(
    "/v1/burn-tables/:id",
    {
      schema: {
        tags: ["Burn Tables"],
        "x-visibility": "public",
        description: "Delete (deactivate) a burn table",
        params: z.object({ id: z.string().uuid() }),
        response: withCommonResponses(
          {
            200: z.object({ message: z.string() }),
          },
          [404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const response = await fetch(
          `${config.services.rating.url}/burn-tables/${id}`,
          {
            method: "DELETE",
          },
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.get(
    "/v1/burn-tables/active",
    {
      schema: {
        tags: ["Burn Tables"],
        "x-visibility": "public",
        description: "Get active burn table for the authenticated customer",
        response: withCommonResponses(
          {
            200: z.object({
              data: z.any(),
              isDefault: z.boolean(),
            }),
          },
          [404, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const customerId = request.customer!.id;
        const response = await fetch(
          `${config.services.rating.url}/burn-tables/customer/${customerId}/active`,
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  // --- Analytics Routes ---

  app.get(
    "/v1/analytics/cost-breakdown",
    {
      schema: {
        tags: ["Analytics"],
        "x-visibility": "public",
        description: "Get cost breakdown by provider/model",
        querystring: AnalyticsQuerySchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.array(z.any()),
              totals: z.any(),
              period: z.any(),
            }),
          },
          [400, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const params = new URLSearchParams(request.query as any);
        params.set("customerId", request.customer!.id);
        const response = await fetch(
          `${config.services.rating.url}/analytics/cost-breakdown?${params.toString()}`,
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.get(
    "/v1/analytics/usage-trends",
    {
      schema: {
        tags: ["Analytics"],
        "x-visibility": "public",
        description: "Get usage trends over time",
        querystring: AnalyticsQuerySchema,
        response: withCommonResponses(
          {
            200: z.object({
              data: z.array(z.any()),
              period: z.any(),
            }),
          },
          [400, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const params = new URLSearchParams(request.query as any);
        params.set("customerId", request.customer!.id);
        const response = await fetch(
          `${config.services.rating.url}/analytics/usage-trends?${params.toString()}`,
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.get(
    "/v1/analytics/burn-forecast",
    {
      schema: {
        tags: ["Analytics"],
        "x-visibility": "public",
        description: "Credit burn forecasting",
        querystring: z.object({
          days: z.string().optional(), // Query params are strings
        }),
        response: withCommonResponses(
          {
            200: z.object({
              currentBalance: z.number(),
              averageDailyBurn: z.number(),
              forecast: z.array(z.any()),
              projections: z.any(),
            }),
          },
          [400, 500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const params = new URLSearchParams(request.query as any);
        params.set("customerId", request.customer!.id);
        const response = await fetch(
          `${config.services.rating.url}/analytics/burn-forecast?${params.toString()}`,
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );

  app.get(
    "/v1/analytics/summary",
    {
      schema: {
        tags: ["Analytics"],
        "x-visibility": "public",
        description: "Get customer summary statistics",
        response: withCommonResponses(
          {
            200: z.object({
              creditBalance: z.any(),
              lifetime: z.any(),
              last30Days: z.any(),
              recentActivity: z.array(z.any()),
            }),
          },
          [500],
        ),
      },
    },
    async (request, reply) => {
      try {
        const customerId = request.customer!.id;
        const response = await fetch(
          `${config.services.rating.url}/analytics/summary/${customerId}`,
        );
        const data = await response.json();
        return reply.status(response.status).send(data);
      } catch (error) {
        logger.error({ err: error }, "Error proxying to rating service");
        return reply.status(500).send({ error: "Internal Server Error" });
      }
    },
  );
};
