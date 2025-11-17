// Entitlement and Feature Access Types

export enum LimitType {
  HARD = 'HARD',
  SOFT = 'SOFT',
  NONE = 'NONE'
}

export enum LimitPeriod {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  TOTAL = 'TOTAL'
}

export interface Entitlement {
  id: string;
  customer_id: string;
  user_id?: string;
  feature_id: string;
  limit_type?: LimitType;
  limit_value?: number;
  period?: LimitPeriod;
  metadata?: Record<string, unknown>;
}

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
