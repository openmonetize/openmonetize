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

// Zod Validation Schemas for Events

import { z } from 'zod';
import { EventType, ProviderName } from '../generated/prisma';

export const providerNameSchema = z.nativeEnum(ProviderName);
export const eventTypeSchema = z.nativeEnum(EventType);

export const tokenUsageEventSchema = z.object({
  event_id: z.string().uuid(),
  customer_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  team_id: z.string().uuid().optional(),
  event_type: z.literal(EventType.TOKEN_USAGE),
  feature_id: z.string().min(1),
  provider: providerNameSchema,
  model: z.string().min(1),
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  timestamp: z.date().or(z.string().datetime()),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string().optional()
});

export const imageGenerationEventSchema = z.object({
  event_id: z.string().uuid(),
  customer_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  team_id: z.string().uuid().optional(),
  event_type: z.literal(EventType.IMAGE_GENERATION),
  feature_id: z.string().min(1),
  provider: providerNameSchema,
  model: z.string().min(1),
  resolution: z.string().optional(),
  count: z.number().int().positive().optional().default(1),
  timestamp: z.date().or(z.string().datetime()),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string().optional()
});

export const customEventSchema = z.object({
  event_id: z.string().uuid(),
  customer_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  team_id: z.string().uuid().optional(),
  event_type: z.literal(EventType.CUSTOM),
  feature_id: z.string().min(1),
  timestamp: z.date().or(z.string().datetime()),
  metadata: z.record(z.string(), z.unknown()),
  idempotency_key: z.string().optional()
});

export const usageEventSchema = z.discriminatedUnion('event_type', [
  tokenUsageEventSchema,
  imageGenerationEventSchema,
  customEventSchema
]);

export const usageEventBatchSchema = z.object({
  events: z.array(usageEventSchema).min(1).max(1000)
});

export type TokenUsageEventInput = z.infer<typeof tokenUsageEventSchema>;
export type ImageGenerationEventInput = z.infer<typeof imageGenerationEventSchema>;
export type CustomEventInput = z.infer<typeof customEventSchema>;
export type UsageEventInput = z.infer<typeof usageEventSchema>;
export type UsageEventBatchInput = z.infer<typeof usageEventBatchSchema>;
