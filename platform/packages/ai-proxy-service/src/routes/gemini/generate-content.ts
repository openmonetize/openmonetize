/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
  billingAuthMiddleware,
  getBillingContext,
} from "../../middleware/billing-auth";
import {
  proxyGeminiGenerateContent,
  extractGeminiApiKey,
} from "../../services/gemini-proxy-handler";
import { trackUsage } from "../../services/usage-tracker";
import type { GeminiGenerateContentRequest } from "../../types";

interface GenerateContentBody extends GeminiGenerateContentRequest {}

export async function generateContentRoute(
  app: FastifyInstance,
): Promise<void> {
  // Single route handler for both generateContent and streamGenerateContent
  // Using a wildcard pattern to match: /v1beta/models/<model>:<action>
  app.post<{ Body: GenerateContentBody; Params: { "*": string } }>(
    "/v1beta/models/*",
    {
      preHandler: billingAuthMiddleware,
    },
    async (
      request: FastifyRequest<{
        Body: GenerateContentBody;
        Params: { "*": string };
      }>,
      reply: FastifyReply,
    ) => {
      const billingContext = getBillingContext(request);
      const geminiApiKey = extractGeminiApiKey(
        request.headers as Record<string, string | string[] | undefined>,
        request.query as Record<string, string | undefined>,
      );

      if (!geminiApiKey) {
        return reply.status(401).send({
          error: {
            code: 401,
            message:
              "Missing API key. Expected: x-goog-api-key header or key query parameter",
            status: "UNAUTHENTICATED",
          },
        });
      }

      // Parse the wildcard path: "gemini-1.5-flash:generateContent" or "gemini-1.5-flash:streamGenerateContent"
      const wildcardPath = request.params["*"] || "";
      const colonIndex = wildcardPath.lastIndexOf(":");

      if (colonIndex === -1) {
        return reply.status(400).send({
          error: {
            code: 400,
            message:
              "Invalid request path. Expected: /v1beta/models/<model>:<action>",
            status: "INVALID_ARGUMENT",
          },
        });
      }

      const model = wildcardPath.substring(0, colonIndex);
      const action = wildcardPath.substring(colonIndex + 1);

      // Validate action
      if (action !== "generateContent" && action !== "streamGenerateContent") {
        return reply.status(400).send({
          error: {
            code: 400,
            message: `Unknown action: ${action}. Expected: generateContent or streamGenerateContent`,
            status: "INVALID_ARGUMENT",
          },
        });
      }

      const isStreaming = action === "streamGenerateContent";

      try {
        app.log.info(
          {
            customerId: billingContext.customerId,
            userId: billingContext.userId,
            model,
            streaming: isStreaming,
          },
          `Proxying Gemini ${action} request`,
        );

        const result = await proxyGeminiGenerateContent(
          request.body,
          model,
          geminiApiKey,
          isStreaming,
        );

        // Track usage asynchronously
        if (result.inputTokens > 0 || result.outputTokens > 0) {
          trackUsage(
            billingContext,
            "GOOGLE",
            result.model,
            result.inputTokens,
            result.outputTokens,
          ).catch((err) => {
            app.log.error({ err }, "Failed to track usage");
          });
        }

        const body = await result.response.text();

        if (isStreaming) {
          reply.header("Content-Type", "text/event-stream");
          reply.header("Cache-Control", "no-cache");
          reply.header("Connection", "keep-alive");
        } else {
          reply.header("Content-Type", "application/json");
        }

        return reply.status(result.response.status).send(body);
      } catch (error: any) {
        app.log.error({ err: error }, "Gemini proxy request failed");

        if (error.name === "TimeoutError" || error.name === "AbortError") {
          return reply.status(504).send({
            error: {
              code: 504,
              message: "Request to Gemini timed out",
              status: "DEADLINE_EXCEEDED",
            },
          });
        }

        if (error instanceof TypeError) {
          return reply.status(502).send({
            error: {
              code: 502,
              message: "Failed to connect to Gemini",
              status: "UNAVAILABLE",
            },
          });
        }

        return reply.status(500).send({
          error: {
            code: 500,
            message: "Internal proxy error",
            status: "INTERNAL",
          },
        });
      }
    },
  );
}
