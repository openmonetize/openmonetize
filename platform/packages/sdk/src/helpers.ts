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

// OpenMonetize SDK Helper Functions
import type { OpenMonetize } from "./client";
import type { Provider } from "./types";
import { v4 as uuidv4 } from "uuid";

/**
 * OpenAI Integration Helper
 *
 * @example
 * ```typescript
 * import OpenAI from 'openai';
 * import { OpenMonetize, withOpenAITracking } from '@openmonetize/sdk';
 *
 * const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 * const monitor = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });
 *
 * // Wrap OpenAI calls with tracking
 * const response = await withOpenAITracking(
 *   monitor,
 *   () => openai.chat.completions.create({
 *     model: 'gpt-4',
 *     messages: [{ role: 'user', content: 'Hello' }]
 *   }),
 *   {
 *     customerId: 'legalai-corp',
 *     userId: 'law-firm-a',
 *     featureId: 'legal-research'
 *   }
 * );
 * ```
 */
export async function withOpenAITracking<
  T extends {
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    model: string;
  },
>(
  client: OpenMonetize,
  fn: () => Promise<T>,
  context: {
    customerId: string;
    userId: string;
    featureId: string;
    metadata?: Record<string, unknown>;
  },
): Promise<T> {
  const response = await fn();

  if (response.usage) {
    // Track usage (automatically batched)
    client.trackTokenUsage({
      userId: context.userId,
      customerId: context.customerId,
      featureId: context.featureId,
      provider: "OPENAI",
      model: response.model,
      inputTokens: response.usage.prompt_tokens,
      outputTokens: response.usage.completion_tokens,
      metadata: context.metadata,
    });
  }

  return response;
}

/**
 * Anthropic Integration Helper
 *
 * @example
 * ```typescript
 * import Anthropic from '@anthropic-ai/sdk';
 * import { OpenMonetize, withAnthropicTracking } from '@openmonetize/sdk';
 *
 * const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 * const monitor = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });
 *
 * const response = await withAnthropicTracking(
 *   monitor,
 *   () => anthropic.messages.create({
 *     model: 'claude-3-sonnet-20240229',
 *     max_tokens: 1024,
 *     messages: [{ role: 'user', content: 'Hello' }]
 *   }),
 *   {
 *     customerId: 'legalai-corp',
 *     userId: 'law-firm-a',
 *     featureId: 'legal-research'
 *   }
 * );
 * ```
 */
export async function withAnthropicTracking<
  T extends {
    usage: {
      input_tokens: number;
      output_tokens: number;
    };
    model: string;
  },
>(
  client: OpenMonetize,
  fn: () => Promise<T>,
  context: {
    customerId: string;
    userId: string;
    featureId: string;
    metadata?: Record<string, unknown>;
  },
): Promise<T> {
  const response = await fn();

  // Track usage (automatically batched)
  client.trackTokenUsage({
    userId: context.userId,
    customerId: context.customerId,
    featureId: context.featureId,
    provider: "ANTHROPIC",
    model: response.model,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
    metadata: context.metadata,
  });

  return response;
}

/**
 * Google (Gemini) Integration Helper
 *
 * @example
 * ```typescript
 * import { GoogleGenerativeAI } from '@google/generative-ai';
 * import { OpenMonetize, withGoogleTracking } from '@openmonetize/sdk';
 *
 * const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
 * const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
 * const monitor = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });
 *
 * const result = await withGoogleTracking(
 *   monitor,
 *   () => model.generateContent('Hello'),
 *   {
 *     customerId: 'legalai-corp',
 *     userId: 'law-firm-a',
 *     featureId: 'legal-research',
 *     model: 'gemini-pro'
 *   }
 * );
 * ```
 */
export async function withGoogleTracking<T>(
  client: OpenMonetize,
  fn: () => Promise<T>,
  context: {
    customerId: string;
    userId: string;
    featureId: string;
    model: string;
    metadata?: Record<string, unknown>;
  },
): Promise<T> {
  const result = await fn();

  let inputTokens = 0;
  let outputTokens = 0;
  let hasUsage = false;

  try {
    const response = result as any;

    // Handle @google/genai response structure (v0.1.0+)
    if (response?.usageMetadata) {
      inputTokens = response.usageMetadata.promptTokenCount || 0;
      outputTokens = response.usageMetadata.candidatesTokenCount || 0;
      hasUsage = true;
    }
    // Handle @google/generative-ai response structure (v0.1.0+)
    else if (response?.response?.usageMetadata) {
      inputTokens = response.response.usageMetadata.promptTokenCount || 0;
      outputTokens = response.response.usageMetadata.candidatesTokenCount || 0;
      hasUsage = true;
    }
    // Handle older/legacy response structures
    else if (response?.usage) {
      inputTokens = response.usage.promptTokens || 0;
      outputTokens = response.usage.completionTokens || 0;
      hasUsage = true;
    }
  } catch (e) {
    // Ignore extraction errors
  }

  if (hasUsage) {
    // Track usage (automatically batched)
    client.trackTokenUsage({
      userId: context.userId,
      customerId: context.customerId,
      featureId: context.featureId,
      provider: "GOOGLE",
      model: context.model,
      inputTokens: inputTokens,
      outputTokens: outputTokens,
      metadata: context.metadata,
    });
  }

  return result;
}

/**
 * Generic tracking helper for any AI provider
 *
 * @example
 * ```typescript
 * const response = await trackUsage(
 *   monitor,
 *   () => callSomeAIService(),
 *   {
 *     customerId: 'company-123',
 *     userId: 'user-456',
 *     featureId: 'feature-xyz',
 *     provider: 'OPENAI',
 *     model: 'gpt-4',
 *     inputTokens: 1000,
 *     outputTokens: 500
 *   }
 * );
 * ```
 */
export async function trackUsage<T>(
  client: OpenMonetize,
  fn: () => Promise<T>,
  tracking: {
    customerId: string;
    userId: string;
    featureId: string;
    provider: Provider;
    model: string;
    inputTokens: number;
    outputTokens: number;
    metadata?: Record<string, unknown>;
  },
): Promise<T> {
  const response = await fn();

  // Track usage (automatically batched)
  client.trackTokenUsage({
    userId: tracking.userId,
    customerId: tracking.customerId,
    featureId: tracking.featureId,
    provider: tracking.provider.toUpperCase() as any,
    model: tracking.model,
    inputTokens: tracking.inputTokens,
    outputTokens: tracking.outputTokens,
    metadata: tracking.metadata,
  });

  return response;
}

/**
 * Batch tracking helper for multiple events
 *
 * Useful when you need to track multiple operations at once
 */
export class BatchTracker {
  private events: Array<{
    customerId: string;
    userId: string;
    featureId: string;
    provider: Provider;
    model: string;
    inputTokens: number;
    outputTokens: number;
    metadata?: Record<string, unknown>;
  }> = [];

  constructor(private client: OpenMonetize) {}

  /**
   * Add an event to the batch
   */
  add(event: {
    customerId: string;
    userId: string;
    featureId: string;
    provider: Provider;
    model: string;
    inputTokens: number;
    outputTokens: number;
    metadata?: Record<string, unknown>;
  }): void {
    this.events.push(event);
  }

  /**
   * Flush all events to OpenMonetize
   */
  async flush(): Promise<void> {
    if (this.events.length === 0) {
      return;
    }

    await this.client.ingestEvents({
      events: this.events.map((event) => ({
        eventId: uuidv4(),
        customerId: event.customerId,
        userId: event.userId,
        eventType: "TOKEN_USAGE" as const,
        featureId: event.featureId,
        provider: event.provider,
        model: event.model,
        inputTokens: event.inputTokens,
        outputTokens: event.outputTokens,
        timestamp: new Date().toISOString(),
        metadata: event.metadata,
      })),
    });

    // Clear events after successful flush
    this.events = [];
  }

  /**
   * Get number of pending events
   */
  get pending(): number {
    return this.events.length;
  }
}

/**
 * Credit formatter utilities
 */
export const formatCredits = {
  /**
   * Format credits with commas
   * @example formatCredits.number(15000) // "15,000"
   */
  number(credits: number): string {
    return credits.toLocaleString("en-US");
  },

  /**
   * Format credits with label
   * @example formatCredits.withLabel(15000) // "15,000 credits"
   */
  withLabel(credits: number): string {
    return `${this.number(credits)} ${credits === 1 ? "credit" : "credits"}`;
  },

  /**
   * Format USD amount
   * @example formatCredits.usd(12.50) // "$12.50"
   */
  usd(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  },
};

/**
 * Validate environment configuration
 */
export function validateConfig(config: {
  apiKey?: string;
  openaiKey?: string;
  anthropicKey?: string;
}): void {
  if (!config.apiKey) {
    throw new Error(
      "OPENMONETIZE_API_KEY is required. Get your API key at https://app.openmonetize.io",
    );
  }

  if (!config.openaiKey && !config.anthropicKey) {
    console.warn(
      "[OpenMonetize] Warning: No AI provider API keys found. Make sure OPENAI_API_KEY or ANTHROPIC_API_KEY is set.",
    );
  }
}
