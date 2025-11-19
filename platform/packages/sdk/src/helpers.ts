// OpenMonetize SDK Helper Functions
import type { OpenMonetize } from './client';
import type { Provider } from './types';

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
export async function withOpenAITracking<T extends {
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
}>(
  client: OpenMonetize,
  fn: () => Promise<T>,
  context: {
    customerId: string;
    userId: string;
    featureId: string;
    metadata?: Record<string, unknown>;
  }
): Promise<T> {
  const response = await fn();

  if (response.usage) {
    // Track usage (automatically batched)
    client.trackTokenUsage({
      user_id: context.userId,
      feature_id: context.featureId,
      provider: 'OPENAI',
      model: response.model,
      input_tokens: response.usage.prompt_tokens,
      output_tokens: response.usage.completion_tokens,
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
export async function withAnthropicTracking<T extends {
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
  model: string;
}>(
  client: OpenMonetize,
  fn: () => Promise<T>,
  context: {
    customerId: string;
    userId: string;
    featureId: string;
    metadata?: Record<string, unknown>;
  }
): Promise<T> {
  const response = await fn();

  // Track usage (automatically batched)
  client.trackTokenUsage({
    user_id: context.userId,
    feature_id: context.featureId,
    provider: 'ANTHROPIC',
    model: response.model,
    input_tokens: response.usage.input_tokens,
    output_tokens: response.usage.output_tokens,
    metadata: context.metadata,
  });

  return response;
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
  }
): Promise<T> {
  const response = await fn();

  // Track usage (automatically batched)
  client.trackTokenUsage({
    user_id: tracking.userId,
    feature_id: tracking.featureId,
    provider: tracking.provider as any,
    model: tracking.model,
    input_tokens: tracking.inputTokens,
    output_tokens: tracking.outputTokens,
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
      events: this.events.map(event => ({
        event_id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
        customer_id: event.customerId,
        user_id: event.userId,
        event_type: 'TOKEN_USAGE' as const,
        feature_id: event.featureId,
        provider: event.provider,
        model: event.model,
        input_tokens: event.inputTokens,
        output_tokens: event.outputTokens,
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
    return credits.toLocaleString('en-US');
  },

  /**
   * Format credits with label
   * @example formatCredits.withLabel(15000) // "15,000 credits"
   */
  withLabel(credits: number): string {
    return `${this.number(credits)} ${credits === 1 ? 'credit' : 'credits'}`;
  },

  /**
   * Format USD amount
   * @example formatCredits.usd(12.50) // "$12.50"
   */
  usd(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
      'OPENMONETIZE_API_KEY is required. Get your API key at https://app.openmonetize.io'
    );
  }

  if (!config.openaiKey && !config.anthropicKey) {
    console.warn(
      '[OpenMonetize] Warning: No AI provider API keys found. Make sure OPENAI_API_KEY or ANTHROPIC_API_KEY is set.'
    );
  }
}
