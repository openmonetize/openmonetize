// OpenMonetize SDK
// Official TypeScript SDK for AI usage tracking and billing

export { OpenMonetize } from './client';
export {
  withOpenAITracking,
  withAnthropicTracking,
  trackUsage,
  BatchTracker,
  formatCredits,
  validateConfig,
} from './helpers';

export type {
  OpenMonetizeConfig,
  Provider,
  EventType,
  TokenUsageEvent,
  ImageGenerationEvent,
  CustomEvent,
  UsageEvent,
  IngestEventsRequest,
  IngestEventsResponse,
  CreditBalance,
  PurchaseCreditsRequest,
  PurchaseCreditsResponse,
  CreditTransaction,
  TransactionHistoryResponse,
  EntitlementCheckRequest,
  EntitlementCheckResponse,
  CalculateCostRequest,
  CalculateCostResponse,
  UsageAnalyticsRequest,
  UsageAnalyticsResponse,
  ApiErrorResponse,
} from './types';

export { OpenMonetizeError } from './types';

// Version
export const VERSION = '0.1.0';
