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
  eventId: string;
  /** Your customer ID (AI SaaS company) */
  customerId: string;
  /** End user ID (your customer) */
  userId: string;
  /** Event type */
  eventType: "TOKEN_USAGE";
  /** Feature identifier */
  featureId: string;
  /** AI provider */
  provider: Provider;
  /** Model identifier */
  model: string;
  /** Input tokens consumed */
  inputTokens: number;
  /** Output tokens generated */
  outputTokens: number;
  /** Event timestamp (ISO 8601) */
  timestamp: string;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Image Generation Event
 */
export interface ImageGenerationEvent {
  eventId: string;
  customerId: string;
  userId: string;
  eventType: "IMAGE_GENERATION";
  featureId: string;
  provider: Provider;
  model: string;
  /** Number of images generated */
  imageCount: number;
  /** Image size (e.g., "1024x1024") */
  imageSize?: string;
  /** Image quality (e.g., "standard", "hd") */
  quality?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Custom Event
 */
export interface CustomEvent {
  eventId: string;
  customerId: string;
  userId: string;
  eventType: "CUSTOM";
  featureId: string;
  /** Custom unit of measurement */
  unitType: string;
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
    eventId: string;
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
  userId: string;
  /** Number of credits to purchase */
  amount: number;
  /** Purchase price in USD */
  purchasePrice: number;
  /** Optional expiration date (ISO 8601) */
  expiresAt?: string;
}

/**
 * Credit purchase response
 */
export interface PurchaseCreditsResponse {
  /** Transaction ID */
  transactionId: string;
  /** New balance after purchase */
  newBalance: number;
}

/**
 * Credit grant request (admin operation)
 */
export interface GrantCreditsRequest {
  /** End user ID (optional - grants to customer wallet if not provided) */
  userId?: string;
  /** Team ID (optional) */
  teamId?: string;
  /** Number of credits to grant */
  amount: number;
  /** Reason for the grant */
  reason?: string;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
  /** Idempotency key to prevent duplicate grants */
  idempotencyKey?: string;
  /** Optional expiration date (ISO 8601) */
  expiresAt?: string;
}

/**
 * Credit grant response
 */
export interface GrantCreditsResponse {
  /** Transaction ID */
  transactionId: string;
  /** Wallet ID */
  walletId: string;
  /** New balance after grant */
  newBalance: string;
  /** Amount granted */
  amount: string;
}

/**
 * Credit transaction
 */
export interface CreditTransaction {
  id: string;
  transactionType: "PURCHASE" | "BURN" | "REFUND" | "EXPIRATION" | "GRANT";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string | null;
  createdAt: string;
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
  userId: string;
  /** Feature identifier */
  featureId: string;
  /** Action to perform */
  action: {
    type: "token_usage" | "image_generation" | "api_call" | "custom";
    provider?: string;
    model?: string;
    estimatedInputTokens?: number;
    estimatedOutputTokens?: number;
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
  estimatedCostCredits: number | null;
  /** Estimated cost in USD */
  estimatedCostUsd: number | null;
  /** Current credit balance */
  currentBalance: number | null;
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
  provider: Provider;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

/**
 * Cost calculation response
 */
export interface CalculateCostResponse {
  credits: number;
  costBreakdown: {
    inputCostUsd: number;
    outputCostUsd: number;
    totalCostUsd: number;
  };
  providerCostUsd: number;
  marginUsd: number;
  marginPercent: number;
}

/**
 * Usage analytics request
 */
export interface UsageAnalyticsRequest {
  /** End user ID */
  userId?: string;
  /** Start date (ISO 8601) */
  startDate: string;
  /** End date (ISO 8601) */
  endDate: string;
}

/**
 * Usage analytics response
 */
export interface UsageAnalyticsResponse {
  totalCredits: number;
  totalCostUsd: number;
  byProvider: Record<
    string,
    {
      credits: number;
      costUsd: number;
      percentage: number;
    }
  >;
  byModel: Record<
    string,
    {
      credits: number;
      costUsd: number;
      percentage: number;
    }
  >;
  byFeature: Record<
    string,
    {
      credits: number;
      costUsd: number;
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
