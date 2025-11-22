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

// Zod Validation Schemas for Entitlements

import { z } from 'zod';
import { LimitType, LimitPeriod } from '../generated/client';

export const limitTypeSchema = z.nativeEnum(LimitType);
export const limitPeriodSchema = z.nativeEnum(LimitPeriod);

export const entitlementCheckRequestSchema = z.object({
  customer_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  team_id: z.string().uuid().optional(),
  feature_id: z.string().min(1),
  action: z.object({
    type: z.enum(['token_usage', 'api_call', 'custom']),
    provider: z.string().optional(),
    model: z.string().optional(),
    estimated_input_tokens: z.number().int().nonnegative().optional(),
    estimated_output_tokens: z.number().int().nonnegative().optional()
  }),
  idempotency_key: z.string().optional()
});

export type EntitlementCheckRequestInput = z.infer<typeof entitlementCheckRequestSchema>;
