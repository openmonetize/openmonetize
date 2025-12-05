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

// OpenMonetize SDK Client
import type {
  OpenMonetizeConfig,
  IngestEventsRequest,
  IngestEventsResponse,
  CreditBalance,
  PurchaseCreditsRequest,
  PurchaseCreditsResponse,
  GrantCreditsRequest,
  GrantCreditsResponse,
  TransactionHistoryResponse,
  EntitlementCheckRequest,
  EntitlementCheckResponse,
  CalculateCostRequest,
  CalculateCostResponse,
  UsageAnalyticsRequest,
  UsageAnalyticsResponse,
  ApiErrorResponse,
  UsageEvent,
  Provider,
} from "./types";
import { OpenMonetizeError } from "./types";
import { v4 as uuidv4 } from "uuid";

/** SDK version - keep in sync with package.json */
const SDK_VERSION = "0.7.0";

/**
 * OpenMonetize SDK Client
 *
 * @example
 * ```typescript
 * import { OpenMonetize } from '@openmonetize/sdk';
 *
 * const client = new OpenMonetize({
 *   apiKey: process.env.OPENMONETIZE_API_KEY!
 * });
 *
 * // Track token usage (automatically batched)
 * client.trackTokenUsage({
 *   userId: 'law-firm-a',
 *   customerId: 'legalai-corp',
 *   featureId: 'legal-research',
 *   provider: 'OPENAI',
 *   model: 'gpt-4',
 *   inputTokens: 1000,
 *   outputTokens: 500
 * });
 * ```
 */
export class OpenMonetize {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly debug: boolean;
  private readonly customerId: string | null = null;

  // Batching configuration
  private readonly autoFlush: boolean;
  private readonly flushInterval: number;
  private readonly maxBatchSize: number;
  private readonly maxRetries: number;

  // Internal state
  private eventBuffer: UsageEvent[] = [];
  private flushTimer: NodeJS.Timeout | null = null;
  private isFlushing = false;

  constructor(config: OpenMonetizeConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.openmonetize.io";
    this.timeout = config.timeout || 30000;
    this.debug = config.debug || false;

    this.autoFlush = config.autoFlush ?? true;
    this.flushInterval = config.flushInterval || 500;
    this.maxBatchSize = config.maxBatchSize || 100;
    this.maxRetries = config.maxRetries || 3;

    if (this.debug) {
      console.log("[OpenMonetize] Initialized with config:", {
        baseUrl: this.baseUrl,
        autoFlush: this.autoFlush,
        flushInterval: this.flushInterval,
        maxBatchSize: this.maxBatchSize,
      });
    }

    // Recover offline events
    this.recoverOfflineEvents();
  }

  /**
   * Make HTTP request to OpenMonetize API with retries
   */
  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    attempt = 1,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      if (this.debug) {
        console.log(
          `[OpenMonetize] ${method} ${path} (Attempt ${attempt})`,
          body,
        );
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "User-Agent": `@openmonetize/sdk/${SDK_VERSION}`,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        // Retry on 5xx errors or 429
        if (
          attempt < this.maxRetries &&
          (response.status >= 500 || response.status === 429)
        ) {
          const baseDelay = Math.pow(2, attempt) * 1000; // Exponential backoff
          const jitter = Math.random() * 1000; // Add 0-1000ms random jitter
          const delay = baseDelay + jitter;

          if (this.debug)
            console.log(
              `[OpenMonetize] Request failed, retrying in ${Math.round(delay)}ms...`,
            );
          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.request<T>(method, path, body, attempt + 1);
        }

        const errorData = data as ApiErrorResponse;
        throw new OpenMonetizeError(
          errorData.message || "API request failed",
          response.status,
          errorData,
        );
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      // Retry on network errors
      if (
        attempt < this.maxRetries &&
        (error instanceof TypeError || (error as any).name === "AbortError")
      ) {
        const baseDelay = Math.pow(2, attempt) * 1000;
        const jitter = Math.random() * 1000;
        const delay = baseDelay + jitter;

        if (this.debug)
          console.log(
            `[OpenMonetize] Network error, retrying in ${Math.round(delay)}ms...`,
          );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.request<T>(method, path, body, attempt + 1);
      }

      if (error instanceof OpenMonetizeError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new OpenMonetizeError("Request timeout");
        }
        throw new OpenMonetizeError(error.message);
      }

      throw new OpenMonetizeError("Unknown error occurred");
    }
  }

  /**
   * Add event to buffer and schedule flush
   */
  private enqueueEvent(event: UsageEvent): void {
    this.eventBuffer.push(event);

    if (this.autoFlush) {
      if (this.eventBuffer.length >= this.maxBatchSize) {
        this.flush().catch((err) => {
          if (this.debug)
            console.error("[OpenMonetize] Failed to flush batch:", err);
        });
      } else if (!this.flushTimer) {
        this.flushTimer = setTimeout(() => {
          this.flush().catch((err) => {
            if (this.debug)
              console.error("[OpenMonetize] Failed to flush batch:", err);
          });
        }, this.flushInterval);
        // Unref timer so it doesn't block process exit
        if (this.flushTimer.unref) {
          this.flushTimer.unref();
        }
      }
    }
  }

  /**
   * Flush pending events to API
   */
  async flush(): Promise<void> {
    if (this.eventBuffer.length === 0 || this.isFlushing) {
      return;
    }

    this.isFlushing = true;
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }

    const batch = [...this.eventBuffer];
    this.eventBuffer = [];

    try {
      await this.ingestEvents({ events: batch });
      if (this.debug) {
        console.log(`[OpenMonetize] Flushed ${batch.length} events`);
      }
    } catch (error) {
      // On failure, save to offline storage
      console.error(
        "[OpenMonetize] Failed to flush events, saving to offline storage:",
        error,
      );
      this.saveToStorage(batch);
    } finally {
      this.isFlushing = false;

      // If more events came in while flushing, schedule another flush
      if (this.eventBuffer.length > 0 && this.autoFlush) {
        this.flushTimer = setTimeout(() => this.flush(), this.flushInterval);
        if (this.flushTimer.unref) this.flushTimer.unref();
      }
    }
  }

  /**
   * Ingest usage events directly (bypasses buffer if called directly, but used by flush)
   */
  async ingestEvents(
    request: IngestEventsRequest,
  ): Promise<IngestEventsResponse> {
    return this.request<IngestEventsResponse>(
      "POST",
      "/v1/events/ingest",
      request,
    );
  }

  /**
   * Track token usage
   *
   * This method is now non-blocking by default (queues event).
   * To force immediate send, call flush() afterwards or configure autoFlush: false.
   */
  trackTokenUsage(params: {
    userId: string;
    customerId: string;
    featureId: string;
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    metadata?: Record<string, unknown>;
  }): void {
    const eventId = uuidv4();

    this.enqueueEvent({
      eventId,
      customerId: params.customerId,
      userId: params.userId,
      eventType: "TOKEN_USAGE",
      featureId: params.featureId,
      provider: params.provider.toUpperCase() as any,
      model: params.model,
      inputTokens: params.inputTokens,
      outputTokens: params.outputTokens,
      timestamp: new Date().toISOString(),
      metadata: params.metadata,
    });
  }

  /**
   * Track image generation usage
   */
  trackImageGeneration(params: {
    userId: string;
    customerId: string;
    featureId: string;
    provider: string;
    model: string;
    imageCount: number;
    imageSize?: string;
    quality?: string;
    metadata?: Record<string, unknown>;
  }): void {
    const eventId = uuidv4();

    this.enqueueEvent({
      eventId,
      customerId: params.customerId,
      userId: params.userId,
      eventType: "IMAGE_GENERATION",
      featureId: params.featureId,
      provider: params.provider.toUpperCase() as any,
      model: params.model,
      imageCount: params.imageCount,
      imageSize: params.imageSize,
      quality: params.quality,
      timestamp: new Date().toISOString(),
      metadata: params.metadata,
    });
  }

  /**
   * Track custom usage event (outcome-based metering)
   */
  trackCustomEvent(params: {
    userId: string;
    customerId: string;
    featureId: string;
    unitType: string;
    quantity: number;
    metadata?: Record<string, unknown>;
  }): void {
    const eventId = uuidv4();

    this.enqueueEvent({
      eventId,
      customerId: params.customerId,
      userId: params.userId,
      eventType: "CUSTOM",
      featureId: params.featureId,
      unitType: params.unitType,
      quantity: params.quantity,
      timestamp: new Date().toISOString(),
      metadata: params.metadata,
    });
  }

  /**
   * Get credit balance for a user
   */
  async getCreditBalance(userId: string): Promise<CreditBalance> {
    const response = await this.request<{ data: CreditBalance }>(
      "GET",
      `/v1/users/${userId}/credits`,
    );
    return response.data;
  }

  /**
   * Purchase credits for a user (top-up)
   */
  async purchaseCredits(
    request: PurchaseCreditsRequest,
  ): Promise<PurchaseCreditsResponse> {
    const response = await this.request<{ data: PurchaseCreditsResponse }>(
      "POST",
      "/v1/credits/purchase",
      {
        userId: request.userId,
        amount: request.amount,
        purchasePrice: request.purchasePrice,
        expiresAt: request.expiresAt,
      },
    );
    return response.data;
  }

  /**
   * Grant credits to a user (admin operation - no payment required)
   */
  async grantCredits(
    request: GrantCreditsRequest,
  ): Promise<GrantCreditsResponse> {
    const response = await this.request<{ data: GrantCreditsResponse }>(
      "POST",
      "/v1/credits/grant",
      {
        userId: request.userId,
        teamId: request.teamId,
        amount: request.amount,
        reason: request.reason,
        metadata: request.metadata,
        idempotencyKey: request.idempotencyKey,
        expiresAt: request.expiresAt,
      },
    );
    return response.data;
  }

  /**
   * Get transaction history for a user
   */
  async getTransactionHistory(
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    },
  ): Promise<TransactionHistoryResponse> {
    const params = new URLSearchParams();
    if (options?.limit) params.set("limit", options.limit.toString());
    if (options?.offset) params.set("offset", options.offset.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<TransactionHistoryResponse>(
      "GET",
      `/v1/users/${userId}/transactions${query}`,
    );
  }

  /**
   * Check if user is entitled to perform an action
   */
  async checkEntitlement(
    request: EntitlementCheckRequest,
  ): Promise<EntitlementCheckResponse> {
    return this.request<EntitlementCheckResponse>(
      "POST",
      "/v1/entitlements/check",
      request,
    );
  }

  /**
   * Calculate cost for an operation
   */
  async calculateCost(
    request: CalculateCostRequest,
  ): Promise<CalculateCostResponse> {
    return this.request<CalculateCostResponse>("POST", "/v1/rating/calculate", {
      provider: request.provider,
      model: request.model,
      inputTokens: request.inputTokens,
      outputTokens: request.outputTokens,
    });
  }

  /**
   * Get usage analytics
   */
  async getUsageAnalytics(
    request: UsageAnalyticsRequest,
  ): Promise<UsageAnalyticsResponse> {
    const params = new URLSearchParams({
      start_date: request.startDate,
      end_date: request.endDate,
    });
    if (request.userId) {
      params.set("user_id", request.userId);
    }

    return this.request<UsageAnalyticsResponse>(
      "GET",
      `/v1/analytics/usage?${params.toString()}`,
    );
  }

  /**
   * Get cost breakdown analytics
   */
  async getCostBreakdown(
    startDate: string,
    endDate: string,
  ): Promise<{
    totalCostUsd: number;
    byProvider: Record<string, { costUsd: number; percentage: number }>;
    byModel: Record<string, { costUsd: number; percentage: number }>;
  }> {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    });

    return this.request(
      "GET",
      `/v1/analytics/cost-breakdown?${params.toString()}`,
    );
  }

  /**
   * Helper to normalize usage from different AI providers
   */
  normalizeProviderResponse(
    provider: Provider,
    response: any,
  ): { inputTokens: number; outputTokens: number } {
    let inputTokens = 0;
    let outputTokens = 0;

    if (!response) {
      return { inputTokens, outputTokens };
    }

    switch (provider) {
      case "OPENAI":
        // OpenAI: usage: { prompt_tokens, completion_tokens }
        if (response.usage) {
          inputTokens = response.usage.prompt_tokens || 0;
          outputTokens = response.usage.completion_tokens || 0;
        }
        break;

      case "ANTHROPIC":
        // Anthropic: usage: { input_tokens, output_tokens }
        if (response.usage) {
          inputTokens = response.usage.input_tokens || 0;
          outputTokens = response.usage.output_tokens || 0;
        }
        break;

      case "GOOGLE":
        // Gemini: usageMetadata: { promptTokenCount, candidatesTokenCount }
        if (response.usageMetadata) {
          inputTokens = response.usageMetadata.promptTokenCount || 0;
          outputTokens = response.usageMetadata.candidatesTokenCount || 0;
        }
        break;

      case "COHERE":
        // Cohere: meta: { billed_units: { input_tokens, output_tokens } }
        if (response.meta?.billed_units) {
          inputTokens = response.meta.billed_units.input_tokens || 0;
          outputTokens = response.meta.billed_units.output_tokens || 0;
        }
        break;

      case "MISTRAL":
        // Mistral: usage: { prompt_tokens, completion_tokens }
        if (response.usage) {
          inputTokens = response.usage.prompt_tokens || 0;
          outputTokens = response.usage.completion_tokens || 0;
        }
        break;
    }

    return { inputTokens, outputTokens };
  }

  // Offline Durability
  private readonly storageKey = "openmonetize_offline_events";

  private recoverOfflineEvents(): void {
    if (typeof window === "undefined" || !window.localStorage) return;

    try {
      const stored = window.localStorage.getItem(this.storageKey);
      if (stored) {
        const events = JSON.parse(stored) as UsageEvent[];
        if (events.length > 0) {
          if (this.debug)
            console.log(
              `[OpenMonetize] Recovered ${events.length} offline events`,
            );
          this.eventBuffer.push(...events);
          window.localStorage.removeItem(this.storageKey);
        }
      }
    } catch (e) {
      console.error("[OpenMonetize] Failed to recover offline events:", e);
    }
  }

  private saveToStorage(events: UsageEvent[]): void {
    if (typeof window === "undefined" || !window.localStorage) return;

    try {
      // Get existing
      const stored = window.localStorage.getItem(this.storageKey);
      let allEvents = events;
      if (stored) {
        const existing = JSON.parse(stored) as UsageEvent[];
        allEvents = [...existing, ...events];
      }

      window.localStorage.setItem(this.storageKey, JSON.stringify(allEvents));
    } catch (e) {
      console.error("[OpenMonetize] Failed to save offline events:", e);
    }
  }
}
