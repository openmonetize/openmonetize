// Event Types for Usage Tracking

import { EventType, ProviderName } from '../generated/prisma';

// Re-export for convenience
export { EventType, ProviderName };

export interface TokenUsageEvent {
  event_id: string;
  customer_id: string;
  user_id?: string;
  team_id?: string;
  event_type: EventType;
  feature_id: string;
  provider: ProviderName;
  model: string;
  input_tokens: number;
  output_tokens: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
  idempotency_key?: string;
}

export interface ImageGenerationEvent {
  event_id: string;
  customer_id: string;
  user_id?: string;
  team_id?: string;
  event_type: EventType;
  feature_id: string;
  provider: ProviderName;
  model: string;
  resolution?: string;
  count?: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
  idempotency_key?: string;
}

export interface CustomEvent {
  event_id: string;
  customer_id: string;
  user_id?: string;
  team_id?: string;
  event_type: EventType;
  feature_id: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
  idempotency_key?: string;
}

export type UsageEventPayload = 
  | TokenUsageEvent 
  | ImageGenerationEvent 
  | CustomEvent;

export interface UsageEventBatch {
  events: UsageEventPayload[];
}

export interface ProcessedEvent {
  event_id: string;
  credits_burned: number;
  cost_usd: number;
  processed_at: Date;
}
