// OpenMonetize SDK Client
import type {
  OpenMonetizeConfig,
  IngestEventsRequest,
  IngestEventsResponse,
  CreditBalance,
  PurchaseCreditsRequest,
  PurchaseCreditsResponse,
  TransactionHistoryResponse,
  EntitlementCheckRequest,
  EntitlementCheckResponse,
  CalculateCostRequest,
  CalculateCostResponse,
  UsageAnalyticsRequest,
  UsageAnalyticsResponse,
  ApiErrorResponse,
} from './types';
import { OpenMonetizeError } from './types';

/**
 * OpenMonetize SDK Client
 *
 * @example
 * ```typescript
 * import { OpenMonetize } from '@openmonetize/sdk';
 *
 * const client = new OpenMonetize({
 *   apiKey: process.env.OPENMONETIZE_API_KEY!
 * });
 *
 * // Track token usage
 * await client.trackTokenUsage({
 *   user_id: 'law-firm-a',
 *   feature_id: 'legal-research',
 *   provider: 'OPENAI',
 *   model: 'gpt-4',
 *   input_tokens: 1000,
 *   output_tokens: 500
 * });
 * ```
 */
export class OpenMonetize {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly debug: boolean;
  private readonly customerId: string | null = null;

  constructor(config: OpenMonetizeConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.openmonetize.io';
    this.timeout = config.timeout || 30000;
    this.debug = config.debug || false;

    // Extract customer ID from API key if needed (for validation)
    if (this.debug) {
      console.log('[OpenMonetize] Initialized with base URL:', this.baseUrl);
    }
  }

  /**
   * Make HTTP request to OpenMonetize API
   */
  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      if (this.debug) {
        console.log(`[OpenMonetize] ${method} ${path}`, body);
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': '@openmonetize/sdk/0.1.0',
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        throw new OpenMonetizeError(
          errorData.message || 'API request failed',
          response.status,
          errorData
        );
      }

      if (this.debug) {
        console.log(`[OpenMonetize] Response:`, data);
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof OpenMonetizeError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new OpenMonetizeError('Request timeout');
        }
        throw new OpenMonetizeError(error.message);
      }

      throw new OpenMonetizeError('Unknown error occurred');
    }
  }

  /**
   * Ingest usage events in batch
   */
  async ingestEvents(request: IngestEventsRequest): Promise<IngestEventsResponse> {
    return this.request<IngestEventsResponse>(
      'POST',
      '/v1/events/ingest',
      request
    );
  }

  /**
   * Track token usage (helper method)
   *
   * @example
   * ```typescript
   * await client.trackTokenUsage({
   *   user_id: 'user-123',
   *   feature_id: 'chat',
   *   provider: 'OPENAI',
   *   model: 'gpt-4',
   *   input_tokens: 1000,
   *   output_tokens: 500
   * });
   * ```
   */
  async trackTokenUsage(params: {
    user_id: string;
    feature_id: string;
    provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'COHERE' | 'MISTRAL';
    model: string;
    input_tokens: number;
    output_tokens: number;
    metadata?: Record<string, unknown>;
  }): Promise<IngestEventsResponse> {
    // Generate event ID
    const event_id = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Get customer ID from context or require it
    const customer_id = this.customerId || 'CUSTOMER_ID_REQUIRED';

    return this.ingestEvents({
      events: [{
        event_id,
        customer_id,
        user_id: params.user_id,
        event_type: 'TOKEN_USAGE',
        feature_id: params.feature_id,
        provider: params.provider,
        model: params.model,
        input_tokens: params.input_tokens,
        output_tokens: params.output_tokens,
        timestamp: new Date().toISOString(),
        metadata: params.metadata,
      }],
    });
  }

  /**
   * Get credit balance for a user
   */
  async getCreditBalance(
    customerId: string,
    userId: string
  ): Promise<CreditBalance> {
    const response = await this.request<{ data: CreditBalance }>(
      'GET',
      `/v1/customers/${customerId}/users/${userId}/credits`
    );
    return response.data;
  }

  /**
   * Purchase credits for a user (top-up)
   */
  async purchaseCredits(
    customerId: string,
    request: PurchaseCreditsRequest
  ): Promise<PurchaseCreditsResponse> {
    const response = await this.request<{ data: PurchaseCreditsResponse }>(
      'POST',
      '/v1/credits/purchase',
      {
        customerId,
        ...request,
      }
    );
    return response.data;
  }

  /**
   * Get transaction history for a user
   */
  async getTransactionHistory(
    customerId: string,
    userId: string,
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<TransactionHistoryResponse> {
    const params = new URLSearchParams();
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<TransactionHistoryResponse>(
      'GET',
      `/v1/customers/${customerId}/users/${userId}/transactions${query}`
    );
  }

  /**
   * Check if user is entitled to perform an action
   *
   * @example
   * ```typescript
   * const entitlement = await client.checkEntitlement({
   *   customerId: 'company-123',
   *   user_id: 'user-456',
   *   feature_id: 'ai-chat',
   *   action: {
   *     type: 'token_usage',
   *     provider: 'openai',
   *     model: 'gpt-4',
   *     estimated_input_tokens: 1000,
   *     estimated_output_tokens: 500
   *   }
   * });
   *
   * if (!entitlement.allowed) {
   *   console.log('Access denied:', entitlement.reason);
   * }
   * ```
   */
  async checkEntitlement(
    customerId: string,
    request: EntitlementCheckRequest
  ): Promise<EntitlementCheckResponse> {
    return this.request<EntitlementCheckResponse>(
      'POST',
      '/v1/entitlements/check',
      {
        customerId,
        ...request,
      }
    );
  }

  /**
   * Calculate cost for an operation
   */
  async calculateCost(
    request: CalculateCostRequest
  ): Promise<CalculateCostResponse> {
    return this.request<CalculateCostResponse>(
      'POST',
      '/v1/rating/calculate',
      request
    );
  }

  /**
   * Get usage analytics
   */
  async getUsageAnalytics(
    customerId: string,
    request: UsageAnalyticsRequest
  ): Promise<UsageAnalyticsResponse> {
    const params = new URLSearchParams({
      start_date: request.start_date,
      end_date: request.end_date,
    });
    if (request.user_id) {
      params.set('user_id', request.user_id);
    }

    return this.request<UsageAnalyticsResponse>(
      'GET',
      `/v1/analytics/usage/${customerId}?${params.toString()}`
    );
  }

  /**
   * Get cost breakdown analytics
   */
  async getCostBreakdown(
    customerId: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    });

    return this.request(
      'GET',
      `/v1/analytics/cost-breakdown?customer_id=${customerId}&${params.toString()}`
    );
  }
}
