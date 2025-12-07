/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { FastifyRequest, FastifyReply } from "fastify";
import type { BillingContext } from "../types";

/**
 * Custom headers used for billing context
 */
const HEADERS = {
  CUSTOMER_ID: "x-om-customer-id",
  USER_ID: "x-om-user-id",
  FEATURE_ID: "x-om-feature-id",
  API_KEY: "x-om-api-key",
  METADATA: "x-om-metadata",
} as const;

/**
 * Extracts billing context from request headers
 */
export function extractBillingContext(
  request: FastifyRequest,
): BillingContext | null {
  const customerId = request.headers[HEADERS.CUSTOMER_ID];
  const userId = request.headers[HEADERS.USER_ID];
  const featureId = request.headers[HEADERS.FEATURE_ID];
  const apiKey = request.headers[HEADERS.API_KEY];

  // All required fields must be present
  if (!customerId || !userId || !featureId || !apiKey) {
    return null;
  }

  // Parse optional metadata
  let metadata: Record<string, unknown> | undefined;
  const metadataHeader = request.headers[HEADERS.METADATA];
  if (metadataHeader && typeof metadataHeader === "string") {
    try {
      metadata = JSON.parse(metadataHeader);
    } catch {
      // Ignore invalid JSON in metadata
    }
  }

  return {
    customerId: String(Array.isArray(customerId) ? customerId[0] : customerId),
    userId: String(Array.isArray(userId) ? userId[0] : userId),
    featureId: String(Array.isArray(featureId) ? featureId[0] : featureId),
    apiKey: String(Array.isArray(apiKey) ? apiKey[0] : apiKey),
    metadata,
  };
}

/**
 * Middleware to validate billing headers are present
 */
export async function billingAuthMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const context = extractBillingContext(request);

  if (!context) {
    reply.status(400).send({
      error: {
        message:
          "Missing required OpenMonetize headers. Required: X-OM-Customer-Id, X-OM-User-Id, X-OM-Feature-Id, X-OM-Api-Key",
        type: "invalid_request_error",
        code: "missing_billing_headers",
      },
    });
    return;
  }

  // Attach context to request for downstream use
  (request as any).billingContext = context;
}

/**
 * Get billing context from request (after middleware has run)
 */
export function getBillingContext(request: FastifyRequest): BillingContext {
  return (request as any).billingContext;
}
