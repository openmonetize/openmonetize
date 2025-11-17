import { z } from 'zod';
import { TransactionType } from '../types';
export declare const transactionTypeSchema: z.ZodEnum<typeof TransactionType>;
export declare const consumeCreditsRequestSchema: z.ZodObject<{
    customer_id: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    team_id: z.ZodOptional<z.ZodString>;
    wallet_id: z.ZodString;
    amount: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.core.$ZodRecordKey, z.core.SomeType>>;
    idempotency_key: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const purchaseCreditsRequestSchema: z.ZodObject<{
    customer_id: z.ZodString;
    amount: z.ZodNumber;
    payment_method: z.ZodOptional<z.ZodString>;
    idempotency_key: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const calculateCostRequestSchema: z.ZodObject<{
    customer_id: z.ZodString;
    provider: z.ZodString;
    model: z.ZodString;
    input_tokens: z.ZodNumber;
    output_tokens: z.ZodNumber;
}, z.core.$strip>;
export type ConsumeCreditsRequestInput = z.infer<typeof consumeCreditsRequestSchema>;
export type PurchaseCreditsRequestInput = z.infer<typeof purchaseCreditsRequestSchema>;
export type CalculateCostRequestInput = z.infer<typeof calculateCostRequestSchema>;
//# sourceMappingURL=credits.d.ts.map