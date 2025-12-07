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
  ChatCompletionRequest,
  ChatCompletionResponse,
  ChatCompletionChunk,
} from "../types";

export interface ProxyResult {
  response: Response;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Forwards a chat completion request to OpenAI and returns the response with usage data
 */
export async function proxyOpenAIChatCompletion(
  request: ChatCompletionRequest,
  openaiApiKey: string,
  isStreaming: boolean,
): Promise<ProxyResult> {
  const upstreamUrl = `${config.openai.baseUrl}/v1/chat/completions`;

  // For streaming, we need to enable stream_options to get usage in final chunk
  const modifiedRequest = { ...request };
  if (isStreaming) {
    modifiedRequest.stream_options = { include_usage: true };
  }

  const response = await fetch(upstreamUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedRequest),
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
    // For streaming, we need to parse the stream to get final usage
    return handleStreamingResponse(response, request.model);
  } else {
    // For non-streaming, parse the JSON response
    return handleNonStreamingResponse(response, request.model);
  }
}

async function handleNonStreamingResponse(
  response: Response,
  model: string,
): Promise<ProxyResult> {
  const data = (await response.json()) as ChatCompletionResponse;

  return {
    response: new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    }),
    model: data.model || model,
    inputTokens: data.usage?.prompt_tokens || 0,
    outputTokens: data.usage?.completion_tokens || 0,
  };
}

async function handleStreamingResponse(
  response: Response,
  model: string,
): Promise<ProxyResult> {
  // We need to intercept the stream to extract usage from the final chunk
  // while still forwarding the stream to the client

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

    // Parse SSE events to find usage in final chunk
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ") && line !== "data: [DONE]") {
        try {
          const data = JSON.parse(line.slice(6)) as ChatCompletionChunk;
          if (data.model) {
            actualModel = data.model;
          }
          // OpenAI includes usage in the final chunk when stream_options.include_usage is true
          if (data.usage) {
            inputTokens = data.usage.prompt_tokens || 0;
            outputTokens = data.usage.completion_tokens || 0;
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
 * Extract OpenAI API key from Authorization header
 */
export function extractOpenAIApiKey(
  authHeader: string | undefined,
): string | null {
  if (!authHeader) return null;

  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}
