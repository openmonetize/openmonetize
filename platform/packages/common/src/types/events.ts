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

// Event Types for Usage Tracking

import { EventType, ProviderName } from '../generated/client';

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
