import { z } from 'zod';
import { LimitType, LimitPeriod } from '../types';
export declare const limitTypeSchema: z.ZodEnum<typeof LimitType>;
export declare const limitPeriodSchema: z.ZodEnum<typeof LimitPeriod>;
export declare const entitlementCheckRequestSchema: z.ZodObject<{
    customer_id: z.ZodString;
    user_id: z.ZodOptional<z.ZodString>;
    team_id: z.ZodOptional<z.ZodString>;
    feature_id: z.ZodString;
    action: z.ZodObject<{
        type: z.ZodEnum<{
            token_usage: "token_usage";
            api_call: "api_call";
            custom: "custom";
        }>;
        provider: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        estimated_input_tokens: z.ZodOptional<z.ZodNumber>;
        estimated_output_tokens: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    idempotency_key: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type EntitlementCheckRequestInput = z.infer<typeof entitlementCheckRequestSchema>;
//# sourceMappingURL=entitlements.d.ts.map