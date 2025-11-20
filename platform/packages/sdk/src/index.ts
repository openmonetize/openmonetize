/*
 * Copyright (C) 2025 OpenMonetize
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
