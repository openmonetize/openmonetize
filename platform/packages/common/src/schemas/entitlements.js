"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entitlementCheckRequestSchema = exports.limitPeriodSchema = exports.limitTypeSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.limitTypeSchema = zod_1.z.nativeEnum(types_1.LimitType);
exports.limitPeriodSchema = zod_1.z.nativeEnum(types_1.LimitPeriod);
exports.entitlementCheckRequestSchema = zod_1.z.object({
    customer_id: zod_1.z.string().uuid(),
    user_id: zod_1.z.string().uuid().optional(),
    team_id: zod_1.z.string().uuid().optional(),
    feature_id: zod_1.z.string().min(1),
    action: zod_1.z.object({
        type: zod_1.z.enum(['token_usage', 'api_call', 'custom']),
        provider: zod_1.z.string().optional(),
        model: zod_1.z.string().optional(),
        estimated_input_tokens: zod_1.z.number().int().nonnegative().optional(),
        estimated_output_tokens: zod_1.z.number().int().nonnegative().optional()
    }),
    idempotency_key: zod_1.z.string().optional()
});
//# sourceMappingURL=entitlements.js.map