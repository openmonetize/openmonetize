/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * Custom headers for OpenMonetize billing context
 */
export interface BillingContext {
  customerId: string;
  userId: string;
  featureId: string;
  apiKey: string;
  metadata?: Record<string, unknown>;
}

/**
 * OpenAI Chat Completion Request (subset of fields we care about)
 */
export interface ChatCompletionRequest {
  model: string;
  messages: Array<{
    role: "system" | "user" | "assistant" | "function" | "tool";
    content: string | null;
    name?: string;
  }>;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  [key: string]: unknown;
}

/**
 * OpenAI Chat Completion Response
 */
export interface ChatCompletionResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string | null;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Streaming chunk from OpenAI
 */
export interface ChatCompletionChunk {
  id: string;
  object: "chat.completion.chunk";
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Usage event to send to ingestion service
 */
export interface UsageEvent {
  event_id: string;
  customer_id: string;
  user_id: string;
  event_type: "TOKEN_USAGE";
  feature_id: string;
  provider: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ============================================
// Anthropic Types
// ============================================

/**
 * Anthropic Message Request
 */
export interface AnthropicMessageRequest {
  model: string;
  messages: Array<{
    role: "user" | "assistant";
    content:
      | string
      | Array<{ type: string; text?: string; [key: string]: unknown }>;
  }>;
  max_tokens: number;
  system?: string;
  stream?: boolean;
  temperature?: number;
  [key: string]: unknown;
}

/**
 * Anthropic Message Response
 */
export interface AnthropicMessageResponse {
  id: string;
  type: "message";
  role: "assistant";
  content: Array<{
    type: "text";
    text: string;
  }>;
  model: string;
  stop_reason: string | null;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Anthropic Streaming Event
 */
export interface AnthropicStreamEvent {
  type:
    | "message_start"
    | "content_block_start"
    | "content_block_delta"
    | "content_block_stop"
    | "message_delta"
    | "message_stop";
  message?: AnthropicMessageResponse;
  index?: number;
  content_block?: { type: string; text: string };
  delta?: { type: string; text?: string; stop_reason?: string };
  usage?: { output_tokens: number };
}

// ============================================
// Google Gemini Types
// ============================================

/**
 * Gemini Generate Content Request
 */
export interface GeminiGenerateContentRequest {
  contents: Array<{
    role?: "user" | "model";
    parts: Array<{
      text?: string;
      [key: string]: unknown;
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
    [key: string]: unknown;
  };
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
  [key: string]: unknown;
}

/**
 * Gemini Generate Content Response
 */
export interface GeminiGenerateContentResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason: string;
    index: number;
  }>;
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  modelVersion?: string;
}

/**
 * Gemini Streaming Chunk
 */
export interface GeminiStreamChunk {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason?: string;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}
