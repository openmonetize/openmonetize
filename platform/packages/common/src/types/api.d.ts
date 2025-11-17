export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
    };
    metadata?: {
        request_id: string;
        timestamp: Date;
        latency_ms?: number;
    };
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        per_page: number;
        total: number;
        total_pages: number;
    };
}
export interface ApiError {
    code: string;
    message: string;
    status: number;
    details?: Record<string, unknown>;
}
export declare enum ErrorCode {
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    INSUFFICIENT_CREDITS = "INSUFFICIENT_CREDITS",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"
}
//# sourceMappingURL=api.d.ts.map