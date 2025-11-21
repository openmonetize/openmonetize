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

// Entitlement and Feature Access Types

import { LimitType, LimitPeriod } from '@prisma/client';

// Re-export for convenience
export { LimitType, LimitPeriod };

export interface EntitlementCheckRequest {
  customer_id: string;
  user_id?: string;
  team_id?: string;
  feature_id: string;
  action: {
    type: 'token_usage' | 'api_call' | 'custom';
    provider?: string;
    model?: string;
    estimated_input_tokens?: number;
    estimated_output_tokens?: number;
  };
  idempotency_key?: string;
}

export interface EntitlementCheckResponse {
  allowed: boolean;
  entitlement?: {
    feature_id: string;
    limit_remaining: number;
    limit_total: number;
    period: LimitPeriod;
    resets_at: Date;
  };
  credits?: {
    available: number;
    required: number;
    after_operation: number;
  };
  optimization?: {
    suggested_model?: string;
    potential_savings_percent?: number;
    cache_available?: boolean;
    cache_savings_percent?: number;
  };
  reason?: string;
  actions?: Array<{
    type: string;
    url: string;
  }>;
  metadata?: {
    request_id: string;
    latency_ms: number;
  };
}
