"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCostRequestSchema = exports.purchaseCreditsRequestSchema = exports.consumeCreditsRequestSchema = exports.transactionTypeSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.transactionTypeSchema = zod_1.z.nativeEnum(types_1.TransactionType);
exports.consumeCreditsRequestSchema = zod_1.z.object({
    customer_id: zod_1.z.string().uuid(),
    user_id: zod_1.z.string().uuid().optional(),
    team_id: zod_1.z.string().uuid().optional(),
    wallet_id: zod_1.z.string().uuid(),
    amount: zod_1.z.number().int().positive(),
    description: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
    idempotency_key: zod_1.z.string().optional()
});
exports.purchaseCreditsRequestSchema = zod_1.z.object({
    customer_id: zod_1.z.string().uuid(),
    amount: zod_1.z.number().int().positive(),
    payment_method: zod_1.z.string().optional(),
    idempotency_key: zod_1.z.string().optional()
});
exports.calculateCostRequestSchema = zod_1.z.object({
    customer_id: zod_1.z.string().uuid(),
    provider: zod_1.z.string(),
    model: zod_1.z.string(),
    input_tokens: zod_1.z.number().int().nonnegative(),
    output_tokens: zod_1.z.number().int().nonnegative()
});
//# sourceMappingURL=credits.js.map