// Zod Validation Schemas for Entitlements

import { z } from 'zod';
import { LimitType, LimitPeriod } from '../generated/prisma';

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
