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
  proxyAnthropicMessages,
  extractAnthropicApiKey,
} from "../../services/anthropic-proxy-handler";
import { trackUsage } from "../../services/usage-tracker";
import type { AnthropicMessageRequest } from "../../types";

interface MessagesBody extends AnthropicMessageRequest {}

export async function messagesRoute(app: FastifyInstance): Promise<void> {
  // Anthropic-compatible messages endpoint
  app.post<{ Body: MessagesBody }>(
    "/v1/messages",
    {
      preHandler: billingAuthMiddleware,
    },
    async (
      request: FastifyRequest<{ Body: MessagesBody }>,
      reply: FastifyReply,
    ) => {
      const billingContext = getBillingContext(request);
      const anthropicApiKey = extractAnthropicApiKey(
        request.headers as Record<string, string | string[] | undefined>,
      );

      if (!anthropicApiKey) {
        return reply.status(401).send({
          type: "error",
          error: {
            type: "authentication_error",
            message:
              "Missing x-api-key header. Expected: x-api-key: <ANTHROPIC_API_KEY>",
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
          "Proxying Anthropic message request",
        );

        const result = await proxyAnthropicMessages(
          request.body,
          anthropicApiKey,
          isStreaming,
        );

        // Track usage asynchronously (don't await to avoid blocking response)
        if (result.inputTokens > 0 || result.outputTokens > 0) {
          trackUsage(
            billingContext,
            "ANTHROPIC",
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
        app.log.error({ err: error }, "Anthropic proxy request failed");

        // Handle timeout errors
        if (error.name === "TimeoutError" || error.name === "AbortError") {
          return reply.status(504).send({
            type: "error",
            error: {
              type: "timeout_error",
              message: "Request to Anthropic timed out",
            },
          });
        }

        // Handle network errors
        if (error instanceof TypeError) {
          return reply.status(502).send({
            type: "error",
            error: {
              type: "connection_error",
              message: "Failed to connect to Anthropic",
            },
          });
        }

        return reply.status(500).send({
          type: "error",
          error: {
            type: "internal_error",
            message: "Internal proxy error",
          },
        });
      }
    },
  );
}
