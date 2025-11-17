export declare enum EventType {
    TOKEN_USAGE = "TOKEN_USAGE",
    API_CALL = "API_CALL",
    IMAGE_GENERATION = "IMAGE_GENERATION",
    AUDIO_PROCESSING = "AUDIO_PROCESSING",
    CUSTOM = "CUSTOM"
}
export declare enum ProviderName {
    OPENAI = "OPENAI",
    ANTHROPIC = "ANTHROPIC",
    GOOGLE = "GOOGLE",
    COHERE = "COHERE",
    MISTRAL = "MISTRAL"
}
export interface TokenUsageEvent {
    event_id: string;
    customer_id: string;
    user_id?: string;
    team_id?: string;
    event_type: EventType.TOKEN_USAGE;
    feature_id: string;
    provider: ProviderName;
    model: string;
    input_tokens: number;
    output_tokens: number;
    timestamp: Date;
    metadata?: Record<string, unknown>;
    idempotency_key?: string;
}
export interface ImageGenerationEvent {
    event_id: string;
    customer_id: string;
    user_id?: string;
    team_id?: string;
    event_type: EventType.IMAGE_GENERATION;
    feature_id: string;
    provider: ProviderName;
    model: string;
    resolution?: string;
    count?: number;
    timestamp: Date;
    metadata?: Record<string, unknown>;
    idempotency_key?: string;
}
export interface CustomEvent {
    event_id: string;
    customer_id: string;
    user_id?: string;
    team_id?: string;
    event_type: EventType.CUSTOM;
    feature_id: string;
    timestamp: Date;
    metadata: Record<string, unknown>;
    idempotency_key?: string;
}
export type UsageEventPayload = TokenUsageEvent | ImageGenerationEvent | CustomEvent;
export interface UsageEventBatch {
    events: UsageEventPayload[];
}
export interface ProcessedEvent {
    event_id: string;
    credits_burned: number;
    cost_usd: number;
    processed_at: Date;
}
//# sourceMappingURL=events.d.ts.map