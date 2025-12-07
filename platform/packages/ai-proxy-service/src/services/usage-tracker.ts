/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import { config } from "../config";
import type { BillingContext, UsageEvent } from "../types";
import { randomUUID } from "crypto";

const logger = console; // Will be replaced with pino in index.ts

/**
 * Tracks usage by sending events to the ingestion service
 */
export async function trackUsage(
  context: BillingContext,
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number,
): Promise<void> {
  const event: UsageEvent = {
    event_id: randomUUID(),
    customer_id: context.customerId,
    user_id: context.userId,
    event_type: "TOKEN_USAGE",
    feature_id: context.featureId,
    provider: provider.toUpperCase(),
    model,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    timestamp: new Date().toISOString(),
    metadata: {
      ...context.metadata,
      source: "ai-proxy",
    },
  };

  try {
    const response = await fetch(
      `${config.ingestionService.url}/v1/events/ingest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": context.apiKey,
        },
        body: JSON.stringify({ events: [event] }),
        signal: AbortSignal.timeout(config.timeout.internal),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`Failed to track usage: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    // Don't fail the request if tracking fails - log and continue
    logger.error("Failed to track usage:", error);
  }
}
