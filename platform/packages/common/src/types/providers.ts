// LLM Provider Types and Pricing

import { ProviderName, CostType } from '../generated/prisma';

// Re-export for convenience
export { ProviderName, CostType };

export interface ProviderPricing {
  provider: ProviderName;
  model: string;
  input_cost_per_1k: number;
  output_cost_per_1k: number;
  currency: string;
  valid_from: Date;
  valid_until?: Date;
}

export interface CostCalculation {
  credits: number;
  usd_cost: number;
  breakdown: {
    input?: {
      tokens: number;
      credits: number;
      rate_per_1k: number;
    };
    output?: {
      tokens: number;
      credits: number;
      rate_per_1k: number;
    };
  };
  provider_cost_usd: number;
  margin_percent: number;
}

export interface ProviderConfig {
  provider: ProviderName;
  api_key?: string;
  base_url?: string;
  timeout_ms?: number;
  max_retries?: number;
}

export interface ModelCapability {
  provider: ProviderName;
  model: string;
  context_window: number;
  supports_streaming: boolean;
  supports_function_calling: boolean;
  max_output_tokens?: number;
}
