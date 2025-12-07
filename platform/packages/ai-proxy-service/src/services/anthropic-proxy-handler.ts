/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { config } from "../config";
import type {
  AnthropicMessageRequest,
  AnthropicMessageResponse,
  AnthropicStreamEvent,
} from "../types";

export interface AnthropicProxyResult {
  response: Response;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Forwards a message request to Anthropic and returns the response with usage data
 */
export async function proxyAnthropicMessages(
  request: AnthropicMessageRequest,
  anthropicApiKey: string,
  isStreaming: boolean,
): Promise<AnthropicProxyResult> {
  const upstreamUrl = `${config.anthropic.baseUrl}/v1/messages`;

  const response = await fetch(upstreamUrl, {
    method: "POST",
    headers: {
      "x-api-key": anthropicApiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(config.timeout.upstream),
  });

  if (!response.ok) {
    // Pass through the error response as-is
    return {
      response,
      model: request.model,
      inputTokens: 0,
      outputTokens: 0,
    };
  }

  if (isStreaming) {
    return handleAnthropicStreamingResponse(response, request.model);
  } else {
    return handleAnthropicNonStreamingResponse(response, request.model);
  }
}

async function handleAnthropicNonStreamingResponse(
  response: Response,
  model: string,
): Promise<AnthropicProxyResult> {
  const data = (await response.json()) as AnthropicMessageResponse;

  return {
    response: new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    model: data.model || model,
    inputTokens: data.usage?.input_tokens || 0,
    outputTokens: data.usage?.output_tokens || 0,
  };
}

async function handleAnthropicStreamingResponse(
  response: Response,
  model: string,
): Promise<AnthropicProxyResult> {
  const originalBody = response.body;
  if (!originalBody) {
    return {
      response,
      model,
      inputTokens: 0,
      outputTokens: 0,
    };
  }

  let inputTokens = 0;
  let outputTokens = 0;
  let actualModel = model;
  let accumulatedChunks: string[] = [];

  const reader = originalBody.getReader();
  const decoder = new TextDecoder();

  // Read and process all chunks
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    accumulatedChunks.push(chunk);

    // Parse SSE events to extract usage
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.slice(6)) as AnthropicStreamEvent;

          // message_start contains the model and initial usage
          if (data.type === "message_start" && data.message) {
            actualModel = data.message.model || model;
            inputTokens = data.message.usage?.input_tokens || 0;
          }

          // message_delta contains final output token count
          if (data.type === "message_delta" && data.usage) {
            outputTokens = data.usage.output_tokens || 0;
          }
        } catch {
          // Ignore parsing errors for incomplete chunks
        }
      }
    }
  }

  // Reconstruct the response with the accumulated stream
  const fullBody = accumulatedChunks.join("");

  return {
    response: new Response(fullBody, {
      status: response.status,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }),
    model: actualModel,
    inputTokens,
    outputTokens,
  };
}

/**
 * Extract Anthropic API key from headers
 * Anthropic uses x-api-key header instead of Bearer token
 */
export function extractAnthropicApiKey(
  headers: Record<string, string | string[] | undefined>,
): string | null {
  const apiKey = headers["x-api-key"];
  if (!apiKey) return null;
  if (Array.isArray(apiKey)) {
    return apiKey[0] ?? null;
  }
  return apiKey;
}
