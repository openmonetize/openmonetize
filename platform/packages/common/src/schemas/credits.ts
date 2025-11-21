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

// Zod Validation Schemas for Credits

import { z } from 'zod';
import { TransactionType } from '@prisma/client';

export const transactionTypeSchema = z.nativeEnum(TransactionType);

export const consumeCreditsRequestSchema = z.object({
  customer_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  team_id: z.string().uuid().optional(),
  wallet_id: z.string().uuid(),
  amount: z.number().int().positive(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string().optional()
});

export const purchaseCreditsRequestSchema = z.object({
  customer_id: z.string().uuid(),
  amount: z.number().int().positive(),
  payment_method: z.string().optional(),
  idempotency_key: z.string().optional()
});

export const calculateCostRequestSchema = z.object({
  customer_id: z.string().uuid(),
  provider: z.string(),
  model: z.string(),
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative()
});

export const grantCreditsRequestSchema = z.object({
  customer_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  team_id: z.string().uuid().optional(),
  amount: z.number().int().positive(),
  reason: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string().optional(),
  expires_at: z.string().datetime().optional()
});

export type ConsumeCreditsRequestInput = z.infer<typeof consumeCreditsRequestSchema>;
export type PurchaseCreditsRequestInput = z.infer<typeof purchaseCreditsRequestSchema>;
export type CalculateCostRequestInput = z.infer<typeof calculateCostRequestSchema>;
export type GrantCreditsRequestInput = z.infer<typeof grantCreditsRequestSchema>;
