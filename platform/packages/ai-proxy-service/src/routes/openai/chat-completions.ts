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
  proxyOpenAIChatCompletion,
  extractOpenAIApiKey,
} from "../../services/proxy-handler";
import { trackUsage } from "../../services/usage-tracker";
import type { ChatCompletionRequest } from "../../types";

interface ChatCompletionBody extends ChatCompletionRequest {}

export async function chatCompletionsRoute(
  app: FastifyInstance,
): Promise<void> {
  // OpenAI-compatible chat completions endpoint
  app.post<{ Body: ChatCompletionBody }>(
    "/v1/chat/completions",
    {
      preHandler: billingAuthMiddleware,
    },
    async (
      request: FastifyRequest<{ Body: ChatCompletionBody }>,
      reply: FastifyReply,
    ) => {
      const billingContext = getBillingContext(request);
      const openaiApiKey = extractOpenAIApiKey(request.headers.authorization);

      if (!openaiApiKey) {
        return reply.status(401).send({
          error: {
            message:
              "Missing or invalid Authorization header. Expected: Bearer <OPENAI_API_KEY>",
            type: "authentication_error",
            code: "missing_api_key",
          },
        });
      }

      const isStreaming = request.body.stream === true;

      try {
        app.log.info(
          {
            customerId: billingContext.customerId,
            userId: billingContext.userId,
            model: request.body.model,
            streaming: isStreaming,
          },
          "Proxying chat completion request",
        );

        const result = await proxyOpenAIChatCompletion(
          request.body,
          openaiApiKey,
          isStreaming,
        );

        // Track usage asynchronously (don't await to avoid blocking response)
        if (result.inputTokens > 0 || result.outputTokens > 0) {
          trackUsage(
            billingContext,
            "OPENAI",
            result.model,
            result.inputTokens,
            result.outputTokens,
          ).catch((err) => {
            app.log.error({ err }, "Failed to track usage");
          });
        }

        // Get the response body
        const body = await result.response.text();

        // Set appropriate headers and return
        if (isStreaming) {
          reply.header("Content-Type", "text/event-stream");
          reply.header("Cache-Control", "no-cache");
          reply.header("Connection", "keep-alive");
        } else {
          reply.header("Content-Type", "application/json");
        }

        return reply.status(result.response.status).send(body);
      } catch (error: any) {
        app.log.error({ err: error }, "Proxy request failed");

        // Handle timeout errors
        if (error.name === "TimeoutError" || error.name === "AbortError") {
          return reply.status(504).send({
            error: {
              message: "Request to upstream provider timed out",
              type: "timeout_error",
              code: "upstream_timeout",
            },
          });
        }

        // Handle network errors
        if (error instanceof TypeError) {
          return reply.status(502).send({
            error: {
              message: "Failed to connect to upstream provider",
              type: "connection_error",
              code: "upstream_unreachable",
            },
          });
        }

        return reply.status(500).send({
          error: {
            message: "Internal proxy error",
            type: "internal_error",
            code: "proxy_error",
          },
        });
      }
    },
  );
}
