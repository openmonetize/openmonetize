"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usageEventBatchSchema = exports.usageEventSchema = exports.customEventSchema = exports.imageGenerationEventSchema = exports.tokenUsageEventSchema = exports.eventTypeSchema = exports.providerNameSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../types");
exports.providerNameSchema = zod_1.z.nativeEnum(types_1.ProviderName);
exports.eventTypeSchema = zod_1.z.nativeEnum(types_1.EventType);
exports.tokenUsageEventSchema = zod_1.z.object({
    event_id: zod_1.z.string().uuid(),
    customer_id: zod_1.z.string().uuid(),
    user_id: zod_1.z.string().uuid().optional(),
    team_id: zod_1.z.string().uuid().optional(),
    event_type: zod_1.z.literal(types_1.EventType.TOKEN_USAGE),
    feature_id: zod_1.z.string().min(1),
    provider: exports.providerNameSchema,
    model: zod_1.z.string().min(1),
    input_tokens: zod_1.z.number().int().nonnegative(),
    output_tokens: zod_1.z.number().int().nonnegative(),
    timestamp: zod_1.z.date().or(zod_1.z.string().datetime()),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
    idempotency_key: zod_1.z.string().optional()
});
exports.imageGenerationEventSchema = zod_1.z.object({
    event_id: zod_1.z.string().uuid(),
    customer_id: zod_1.z.string().uuid(),
    user_id: zod_1.z.string().uuid().optional(),
    team_id: zod_1.z.string().uuid().optional(),
    event_type: zod_1.z.literal(types_1.EventType.IMAGE_GENERATION),
    feature_id: zod_1.z.string().min(1),
    provider: exports.providerNameSchema,
    model: zod_1.z.string().min(1),
    resolution: zod_1.z.string().optional(),
    count: zod_1.z.number().int().positive().optional().default(1),
    timestamp: zod_1.z.date().or(zod_1.z.string().datetime()),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
    idempotency_key: zod_1.z.string().optional()
});
exports.customEventSchema = zod_1.z.object({
    event_id: zod_1.z.string().uuid(),
    customer_id: zod_1.z.string().uuid(),
    user_id: zod_1.z.string().uuid().optional(),
    team_id: zod_1.z.string().uuid().optional(),
    event_type: zod_1.z.literal(types_1.EventType.CUSTOM),
    feature_id: zod_1.z.string().min(1),
    timestamp: zod_1.z.date().or(zod_1.z.string().datetime()),
    metadata: zod_1.z.record(zod_1.z.unknown()),
    idempotency_key: zod_1.z.string().optional()
});
exports.usageEventSchema = zod_1.z.discriminatedUnion('event_type', [
    exports.tokenUsageEventSchema,
    exports.imageGenerationEventSchema,
    exports.customEventSchema
]);
exports.usageEventBatchSchema = zod_1.z.object({
    events: zod_1.z.array(exports.usageEventSchema).min(1).max(1000)
});
//# sourceMappingURL=events.js.map