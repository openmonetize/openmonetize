/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// LLM Provider Types and Pricing

import { ProviderName, CostType } from '@prisma/client';

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
