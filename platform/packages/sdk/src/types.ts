/*
 * Copyright (C) 2025 OpenMonetize
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// OpenMonetize SDK Type Definitions

/**
 * SDK Configuration
 */
export interface OpenMonetizeConfig {
  /** Your OpenMonetize API key */
  apiKey: string;
  /** API base URL (default: https://api.openmonetize.io) */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Enable debug logging (default: false) */
  debug?: boolean;
  /** Enable automatic batching (default: true) */
  autoFlush?: boolean;
  /** Flush interval in milliseconds (default: 500) */
  flushInterval?: number;
  /** Maximum batch size before flushing (default: 100) */
  maxBatchSize?: number;
  /** Maximum number of retries for failed requests (default: 3) */
  maxRetries?: number;
}

/**
 * AI Provider Types
 */
export type Provider =
  | "OPENAI"
  | "ANTHROPIC"
  | "GOOGLE"
  | "COHERE"
  | "MISTRAL"
  | "CUSTOM";

/**
 * Event Types
 */
export type EventType =
  | "TOKEN_USAGE" // LLM token consumption
  | "IMAGE_GENERATION" // Image generation (DALL-E, Midjourney, etc.)
  | "EMBEDDING_GENERATION" // Embedding generation
  | "AUDIO_TRANSCRIPTION" // Audio/video transcription
  | "CUSTOM"; // Custom event type

/**
 * Token Usage Event
 */
export interface TokenUsageEvent {
  /** Unique event ID (for idempotency) */
  event_id: string;
  /** Your customer ID (AI SaaS company) */
  customer_id: string;
  /** End user ID (your customer) */
  user_id: string;
  /** Event type */
  event_type: "TOKEN_USAGE";
  /** Feature identifier */
  feature_id: string;
  /** AI provider */
  provider: Provider;
  /** Model identifier */
  model: string;
  /** Input tokens consumed */
  input_tokens: number;
  /** Output tokens generated */
  output_tokens: number;
  /** Event timestamp (ISO 8601) */
  timestamp: string;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Image Generation Event
 */
export interface ImageGenerationEvent {
  event_id: string;
  customer_id: string;
  user_id: string;
  event_type: "IMAGE_GENERATION";
  feature_id: string;
  provider: Provider;
  model: string;
  /** Number of images generated */
  image_count: number;
  /** Image size (e.g., "1024x1024") */
  image_size?: string;
  /** Image quality (e.g., "standard", "hd") */
  quality?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Custom Event
 */
export interface CustomEvent {
  event_id: string;
  customer_id: string;
  user_id: string;
  event_type: "CUSTOM";
  feature_id: string;
  /** Custom unit of measurement */
  unit_type: string;
  /** Number of units consumed */
  quantity: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Union type for all event types
 */
export type UsageEvent = TokenUsageEvent | ImageGenerationEvent | CustomEvent;

/**
 * Batch event ingestion request
 */
export interface IngestEventsRequest {
  events: UsageEvent[];
}

/**
 * Event ingestion response
 */
export interface IngestEventsResponse {
  success: boolean;
  processed: number;
  failed: number;
  errors?: Array<{
    event_id: string;
    error: string;
  }>;
}

/**
 * Credit balance information
 */
export interface CreditBalance {
  /** Total credit balance */
  balance: number;
  /** Reserved credits (pending transactions) */
  reserved: number;
  /** Available credits */
  available: number;
  /** Expiration date (ISO 8601) */
  expiresAt: string | null;
}

/**
 * Credit purchase request
 */
export interface PurchaseCreditsRequest {
  /** End user ID */
  user_id: string;
  /** Number of credits to purchase */
  amount: number;
  /** Purchase price in USD */
  purchase_price: number;
  /** Optional expiration date (ISO 8601) */
  expires_at?: string;
}

/**
 * Credit purchase response
 */
export interface PurchaseCreditsResponse {
  /** Transaction ID */
  transaction_id: string;
  /** New balance after purchase */
  new_balance: number;
}

/**
 * Credit transaction
 */
export interface CreditTransaction {
  id: string;
  transaction_type: "PURCHASE" | "BURN" | "REFUND" | "EXPIRATION";
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string | null;
  created_at: string;
}

/**
 * Transaction history response
 */
export interface TransactionHistoryResponse {
  data: CreditTransaction[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

/**
 * Entitlement check request
 */
export interface EntitlementCheckRequest {
  /** End user ID */
  user_id: string;
  /** Feature identifier */
  feature_id: string;
  /** Action to perform */
  action: {
    type: "token_usage" | "image_generation" | "api_call" | "custom";
    provider?: string;
    model?: string;
    estimated_input_tokens?: number;
    estimated_output_tokens?: number;
  };
}

/**
 * Entitlement check response
 */
export interface EntitlementCheckResponse {
  /** Whether the action is allowed */
  allowed: boolean;
  /** Reason if not allowed */
  reason: string | null;
  /** Estimated cost in credits */
  estimated_cost_credits: number | null;
  /** Estimated cost in USD */
  estimated_cost_usd: number | null;
  /** Current credit balance */
  current_balance: number | null;
  /** Suggested actions */
  actions: Array<{
    type: string;
    label: string;
    url: string;
  }>;
}

/**
 * Cost calculation request
 */
export interface CalculateCostRequest {
  /** Your customer ID */
  customerId: string;
  provider: Provider;
  model: string;
  input_tokens: number;
  output_tokens: number;
}

/**
 * Cost calculation response
 */
export interface CalculateCostResponse {
  credits: number;
  cost_breakdown: {
    input_cost_usd: number;
    output_cost_usd: number;
    total_cost_usd: number;
  };
  provider_cost_usd: number;
  margin_usd: number;
  margin_percent: number;
}

/**
 * Usage analytics request
 */
export interface UsageAnalyticsRequest {
  /** End user ID */
  user_id?: string;
  /** Start date (ISO 8601) */
  start_date: string;
  /** End date (ISO 8601) */
  end_date: string;
}

/**
 * Usage analytics response
 */
export interface UsageAnalyticsResponse {
  total_credits: number;
  total_cost_usd: number;
  by_provider: Record<
    string,
    {
      credits: number;
      cost_usd: number;
      percentage: number;
    }
  >;
  by_model: Record<
    string,
    {
      credits: number;
      cost_usd: number;
      percentage: number;
    }
  >;
  by_feature: Record<
    string,
    {
      credits: number;
      cost_usd: number;
      percentage: number;
    }
  >;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  details?: unknown;
}

/**
 * SDK Error
 */
export class OpenMonetizeError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: ApiErrorResponse,
  ) {
    super(message);
    this.name = "OpenMonetizeError";
  }
}
