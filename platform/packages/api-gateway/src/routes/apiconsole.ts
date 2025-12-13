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

import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { config } from "../config";
import { logger } from "../logger";
import { randomUUID } from "crypto";
import { withCommonResponses } from "../types/schemas";
import { authenticate } from "../middleware/auth";
import { getPrismaClient, pricingService } from "@openmonetize/common";

const db = getPrismaClient();

export const sandboxRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/v1/apiconsole/generate",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Sandbox"],
        description:
          "Generate AI response (Sandbox Mode - Authenticated & Metered)",
        body: z.object({
          type: z.enum(["text", "image", "video"]).default("text"),
          prompt: z.string(),
          model: z.string().optional(),
          provider: z.string().optional(),
          // Image/Video specific
          size: z.string().optional(),
          quality: z.string().optional(),
          count: z.number().optional().default(1),
          duration: z.number().optional(),
        }),
        response: withCommonResponses(
          {
            200: z.object({
              id: z.string(),
              object: z.string(),
              created: z.number(),
              model: z.string(),
              // Common response fields
              choices: z.array(
                z.object({
                  index: z.number(),
                  message: z
                    .object({
                      role: z.string(),
                      content: z.string(),
                    })
                    .optional(),
                  url: z.string().optional(), // For images/videos
                  finish_reason: z.string().optional(),
                }),
              ),
              usage: z
                .object({
                  prompt_tokens: z.number().optional(),
                  completion_tokens: z.number().optional(),
                  total_tokens: z.number().optional(),
                  image_count: z.number().optional(),
                  video_count: z.number().optional(),
                  estimated_cost_credits: z.number().optional(),
                  estimated_cost_usd: z.number().optional(),
                })
                .optional(),
            }),
          },
          [402, 404, 500],
        ),
      },
    },
    async (request, reply) => {
      // 1. Verify Credit Balance
      const customerId = request.customer!.id;

      const wallet = await db.creditWallet.findFirst({
        where: { customerId },
      });

      if (!wallet || wallet.balance <= 0) {
        return reply.status(402).send({
          error: "Payment Required",
          message:
            "Insufficient credits. Please top up your wallet to continue using the sandbox.",
        });
      }

      const {
        type = "text",
        prompt,
        model = type === "text"
          ? "o1-preview"
          : type === "video"
            ? "veo-3-video"
            : "dall-e-3",
        provider = type === "video" || model?.includes("veo")
          ? "GOOGLE"
          : "OPENAI",
        size = "1024x1024",
        quality = "hd",
        count = 1,
      } = request.body;

      // Generate IDs
      const completionId = `chatcmpl-${randomUUID()}`;
      const created = Math.floor(Date.now() / 1000);

      let event: any;
      let calculatedCost: any;

      if (type === "text") {
        // Calculate tokens (Approximation)
        const inputTokens = Math.ceil(prompt.length / 4);
        const outputTokens = 150; // Estimated output length

        // Calculate cost using shared pricing service
        calculatedCost = await pricingService.calculateCost({
          customerId,
          provider,
          model,
          type: "text",
          inputTokens,
          outputTokens,
        });

        event = {
          event_id: randomUUID(),
          event_type: "TOKEN_USAGE",
          customer_id: customerId,
          feature_id: "sandbox-llm",
          provider,
          model,
          input_tokens: inputTokens,
          output_tokens: outputTokens,
          timestamp: new Date().toISOString(),
          metadata: {
            completionId,
            sandbox: true,
            calculatedCredits: calculatedCost.credits,
          },
        };
      } else {
        // Image/Video Generation

        // Calculate cost
        // We determine type based on input 'type' which is safer than inference
        const costType = type === "video" ? "video" : "image";

        calculatedCost = await pricingService.calculateCost({
          customerId,
          provider,
          model,
          type: costType,
          count,
        });

        event = {
          event_id: randomUUID(),
          event_type:
            type === "video" ? "VIDEO_GENERATION" : "IMAGE_GENERATION",
          customer_id: customerId,
          feature_id: type === "video" ? "sandbox-video" : "sandbox-image",
          provider,
          model,
          image_count: type === "image" ? count : undefined,
          video_count: type === "video" ? count : undefined,
          timestamp: new Date().toISOString(),
          metadata: {
            size,
            quality,
            completionId,
            sandbox: true,
            calculatedCredits: calculatedCost.credits,
          },
        };
      }

      // Send usage event to ingestion service
      try {
        const ingestionUrl = `${config.services.ingestion.url}/v1/events/ingest`;

        // Extract the user's API key to authenticate with the Ingestion Service
        let userApiKey = request.headers["x-api-key"] as string;
        const authHeader = request.headers.authorization;
        if (!userApiKey && authHeader && authHeader.startsWith("Bearer ")) {
          userApiKey = authHeader.substring(7);
        }

        if (!userApiKey) {
          throw new Error("User API key not found in request headers");
        }

        const ingestResponse = await fetch(ingestionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": userApiKey,
          },
          body: JSON.stringify({ events: [event] }),
        });

        if (!ingestResponse.ok) {
          logger.error(
            {
              status: ingestResponse.status,
              statusText: ingestResponse.statusText,
            },
            "Failed to send sandbox event to ingestion service",
          );
          // We still return success to the user, but log the error
        }
      } catch (error) {
        logger.error({ err: error }, "Failed to record sandbox usage");
      }

      // Return standardized simulation response with actual calculated usage
      return {
        id: completionId,
        object: type === "text" ? "chat.completion" : "image.generation",
        created,
        model,
        choices: [
          {
            index: 0,
            message:
              type === "text"
                ? {
                    role: "assistant",
                    content:
                      "Simulation Successful: Event metered and recorded based on active pricing.",
                  }
                : undefined,
            url:
              type === "image"
                ? "https://via.placeholder.com/1024x1024.png?text=Simulation+Successful"
                : undefined,
            finish_reason: "stop",
          },
        ],
        usage:
          type === "text"
            ? {
                prompt_tokens: event.input_tokens,
                completion_tokens: event.output_tokens,
                total_tokens: event.input_tokens + event.output_tokens,
                estimated_cost_credits: calculatedCost?.credits,
                estimated_cost_usd: calculatedCost?.providerCostUsd,
              }
            : {
                image_count: count,
              },
      };
    },
  );

  app.get(
    "/v1/apiconsole/pricing",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Sandbox"],
        description: "Get available models and pricing",
        response: withCommonResponses(
          {
            200: z.object({
              data: z.array(
                z.object({
                  provider: z.string(),
                  model: z.string(),
                  pricing: z.record(z.string(), z.any()),
                }),
              ),
            }),
          },
          [500],
        ),
      },
    },
    async (_request, reply) => {
      try {
        // Get all provider costs
        const costs = await db.providerCost.findMany({
          where: {
            OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }],
          },
          orderBy: [{ provider: "asc" }, { model: "asc" }],
        });

        // Group by provider and model
        const grouped = costs.reduce((acc: any, cost) => {
          const key = `${cost.provider}:${cost.model}`;
          if (!acc[key]) {
            acc[key] = {
              provider: cost.provider,
              model: cost.model,
              pricing: {},
            };
          }

          acc[key].pricing[cost.costType] = {
            costPerUnit: Number(cost.costPerUnit),
            unitSize: cost.unitSize,
            currency: cost.currency,
          };

          return acc;
        }, {});

        return {
          data: Object.values(grouped),
        };
      } catch (error) {
        logger.error({ err: error }, "Failed to fetch pricing");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to fetch pricing",
        });
      }
    },
  );

  app.post(
    "/v1/apiconsole/topup",
    {
      preHandler: authenticate,
      schema: {
        tags: ["Sandbox"],
        description: "Top up credits for sandbox testing",
        body: z.object({
          amount: z.number().positive().default(10000),
        }),
        response: withCommonResponses(
          {
            200: z.object({
              success: z.boolean(),
              newBalance: z.string(),
            }),
          },
          [402, 500],
        ),
      },
    },
    async (request, reply) => {
      const customerId = request.customer!.id;
      const { amount } = request.body;

      try {
        // Find wallet
        let wallet = await db.creditWallet.findFirst({
          where: { customerId },
        });

        if (!wallet) {
          // Create if not exists (should exist from seed, but for safety)
          wallet = await db.creditWallet.create({
            data: {
              customerId,
              balance: 0,
              reservedBalance: 0,
            },
          });
        }

        // Grant credits
        const newBalance = BigInt(Number(wallet.balance) + amount);

        await db.$transaction([
          db.creditWallet.update({
            where: { id: wallet.id },
            data: { balance: newBalance },
          }),
          db.creditTransaction.create({
            data: {
              walletId: wallet.id,
              customerId,
              transactionType: "PURCHASE", // Treat as purchase for sandbox
              amount: BigInt(amount),
              balanceBefore: wallet.balance,
              balanceAfter: newBalance,
              description: "Sandbox Top-Up",
            },
          }),
        ]);

        return {
          success: true,
          newBalance: newBalance.toString(),
        };
      } catch (error) {
        logger.error({ err: error }, "Failed to top up sandbox credits");
        return reply.status(500).send({
          error: "Internal Server Error",
          message: "Failed to top up credits",
        });
      }
    },
  );
};
