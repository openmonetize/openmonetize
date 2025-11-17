// Zod Validation Schemas for Credits

import { z } from 'zod';
import { TransactionType } from '../types';

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

export type ConsumeCreditsRequestInput = z.infer<typeof consumeCreditsRequestSchema>;
export type PurchaseCreditsRequestInput = z.infer<typeof purchaseCreditsRequestSchema>;
export type CalculateCostRequestInput = z.infer<typeof calculateCostRequestSchema>;
