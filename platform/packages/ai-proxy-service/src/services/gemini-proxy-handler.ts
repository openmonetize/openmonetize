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
  GeminiGenerateContentRequest,
  GeminiGenerateContentResponse,
  GeminiStreamChunk,
} from "../types";

export interface GeminiProxyResult {
  response: Response;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Forwards a generateContent request to Gemini and returns the response with usage data
 */
export async function proxyGeminiGenerateContent(
  request: GeminiGenerateContentRequest,
  model: string,
  geminiApiKey: string,
  isStreaming: boolean,
): Promise<GeminiProxyResult> {
  // Gemini uses ?key= query param for authentication
  const action = isStreaming ? ":streamGenerateContent" : ":generateContent";
  const queryParams = isStreaming
    ? `?alt=sse&key=${geminiApiKey}`
    : `?key=${geminiApiKey}`;
  const upstreamUrl = `${config.gemini.baseUrl}/v1beta/models/${model}${action}${queryParams}`;

  const response = await fetch(upstreamUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(config.timeout.upstream),
  });

  if (!response.ok) {
    return {
      response,
      model,
      inputTokens: 0,
      outputTokens: 0,
    };
  }

  if (isStreaming) {
    return handleGeminiStreamingResponse(response, model);
  } else {
    return handleGeminiNonStreamingResponse(response, model);
  }
}

async function handleGeminiNonStreamingResponse(
  response: Response,
  model: string,
): Promise<GeminiProxyResult> {
  const data = (await response.json()) as GeminiGenerateContentResponse;

  return {
    response: new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    model,
    inputTokens: data.usageMetadata?.promptTokenCount || 0,
    outputTokens: data.usageMetadata?.candidatesTokenCount || 0,
  };
}

async function handleGeminiStreamingResponse(
  response: Response,
  model: string,
): Promise<GeminiProxyResult> {
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
  let accumulatedChunks: string[] = [];

  const reader = originalBody.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    accumulatedChunks.push(chunk);

    // Parse SSE events to extract usage from final chunk
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.slice(6)) as GeminiStreamChunk;
          // Gemini includes usage in each chunk, we want the final values
          if (data.usageMetadata) {
            inputTokens = data.usageMetadata.promptTokenCount || 0;
            outputTokens = data.usageMetadata.candidatesTokenCount || 0;
          }
        } catch {
          // Ignore parsing errors
        }
      }
    }
  }

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
    model,
    inputTokens,
    outputTokens,
  };
}

/**
 * Extract Gemini API key from x-goog-api-key header or query param
 */
export function extractGeminiApiKey(
  headers: Record<string, string | string[] | undefined>,
  query: Record<string, string | undefined>,
): string | null {
  // Check header first
  const headerKey = headers["x-goog-api-key"];
  if (headerKey) {
    return Array.isArray(headerKey) ? (headerKey[0] ?? null) : headerKey;
  }

  // Check query param
  if (query.key) {
    return query.key;
  }

  return null;
}
