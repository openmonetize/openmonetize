/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Shared route type definitions for type-safe Fastify handlers
 *
 * These interfaces define the shape of request parameters, querystrings, and bodies
 * for use with fastify-type-provider-zod to ensure compile-time type safety.
 */

// ============================================================================
// Analytics Routes
// ============================================================================

export interface GetEventsRoute {
  Querystring: {
    customerId?: string;
    limit?: number;
    offset?: number;
  };
}

export interface GetUsageAnalyticsRoute {
  Querystring: {
    customerId?: string;
    startDate?: string;
    endDate?: string;
    groupBy?: "day" | "week" | "month";
    provider?: string; // Comma-separated list of providers
    model?: string; // Comma-separated list of models
  };
}

export interface GetCostAnalyticsRoute {
  Querystring: {
    customerId?: string;
    startDate?: string;
    endDate?: string;
  };
}

export interface GetBurnRateAnalyticsRoute {
  Querystring: {
    customerId?: string;
    userId?: string;
  };
}

// ============================================================================
// Credit Routes
// ============================================================================

export interface GetUserCreditBalanceRoute {
  Params: {
    customerId: string;
    userId: string;
  };
}

export interface PurchaseCreditsRoute {
  Body: {
    customerId: string;
    userId: string;
    amount: number;
    purchasePrice: number;
    expiresAt?: string;
  };
}

export interface GrantCreditsRoute {
  Body: {
    customerId: string;
    userId?: string;
    teamId?: string;
    amount: number;
    reason?: string;
    metadata?: Record<string, any>;
    idempotencyKey?: string;
    expiresAt?: string;
  };
}

export interface GetCreditTransactionsRoute {
  Params: {
    customerId: string;
    userId: string;
  };
  Querystring: {
    limit: number;
    offset: number;
  };
}

// ============================================================================
// Customer Routes
// ============================================================================

export interface RegisterCustomerRoute {
  Body: {
    name: string;
    email: string;
    tier: "STARTER" | "GROWTH" | "ENTERPRISE";
  };
}

// ============================================================================
// Ingestion Routes
// ============================================================================

export interface IngestEventsRoute {
  Body: {
    events: Array<{
      event_id: string;
      customer_id: string;
      user_id?: string;
      team_id?: string;
      event_type:
        | "TOKEN_USAGE"
        | "API_CALL"
        | "FEATURE_ACCESS"
        | "IMAGE_GENERATION"
        | "CUSTOM";
      feature_id: string;
      provider?: "OPENAI" | "ANTHROPIC" | "GOOGLE" | "COHERE" | "MISTRAL";
      model?: string;
      input_tokens?: number;
      output_tokens?: number;
      image_count?: number;
      image_size?: string;
      quality?: string;
      unit_type?: string;
      quantity?: number;
      timestamp: string | Date;
      metadata?: Record<string, unknown>;
      idempotency_key?: string;
    }>;
  };
}

export interface ReplayDLQRoute {
  Body: {
    jobIds?: string[];
  };
}
