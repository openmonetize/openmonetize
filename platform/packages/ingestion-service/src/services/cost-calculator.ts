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

import { getPrismaClient } from '@openmonetize/common';
import { logger } from '../logger';
import { Decimal } from '@prisma/client/runtime/library';

const db = getPrismaClient();

interface CostResult {
  credits: bigint;
  usd: Decimal;
  breakdown?: {
    inputCost: number;
    outputCost: number;
    inputTokens: number;
    outputTokens: number;
  };
}

export async function calculateCost(event: any): Promise<CostResult> {
  try {
    // For token usage events with provider and model
    if (event.event_type === 'TOKEN_USAGE' && event.provider && event.model) {
      const inputTokens = Number(event.input_tokens) || 0;
      const outputTokens = Number(event.output_tokens) || 0;

      if (inputTokens === 0 && outputTokens === 0) {
        return {
          credits: BigInt(0),
          usd: new Decimal(0)
        };
      }

      // Fetch provider costs from database
      const [inputCost, outputCost] = await Promise.all([
        db.providerCost.findFirst({
          where: {
            provider: event.provider,
            model: event.model,
            costType: 'INPUT_TOKEN',
            validFrom: { lte: new Date() },
            OR: [
              { validUntil: null },
              { validUntil: { gte: new Date() } }
            ]
          }
        }),
        db.providerCost.findFirst({
          where: {
            provider: event.provider,
            model: event.model,
            costType: 'OUTPUT_TOKEN',
            validFrom: { lte: new Date() },
            OR: [
              { validUntil: null },
              { validUntil: { gte: new Date() } }
            ]
          }
        })
      ]);

      if (!inputCost || !outputCost) {
        logger.warn({
          provider: event.provider,
          model: event.model
        }, 'Provider cost not found in database');

        logger.warn({
          provider: event.provider,
          model: event.model
        }, 'Provider cost not found in database, using default fallback');

        // Fallback: Use standard pricing based on model family
        // o1-preview: $15.00 / 1M input, $60.00 / 1M output
        // gpt-4o: $2.50 / 1M input, $10.00 / 1M output
        
        const isO1 = event.model?.includes('o1');
        
        const fallbackInputRate = isO1 ? 15.00 : 2.50;
        const fallbackOutputRate = isO1 ? 60.00 : 10.00;
        const unitSize = 1000000;

        const inputUsd = (inputTokens / unitSize) * fallbackInputRate;
        const outputUsd = (outputTokens / unitSize) * fallbackOutputRate;
        const totalUsd = inputUsd + outputUsd;

        const creditsPerDollar = 1000;
        const credits = BigInt(Math.ceil(totalUsd * creditsPerDollar));

        return {
          credits,
          usd: new Decimal(totalUsd),
          breakdown: {
            inputCost: inputUsd,
            outputCost: outputUsd,
            inputTokens,
            outputTokens
          }
        };
      }

      // Calculate USD cost
      // Formula: (tokens / unitSize) * costPerUnit
      const inputUsd = (inputTokens / Number(inputCost.unitSize)) * Number(inputCost.costPerUnit);
      const outputUsd = (outputTokens / Number(outputCost.unitSize)) * Number(outputCost.costPerUnit);
      const totalUsd = inputUsd + outputUsd;

      // Get burn table for customer (if exists)
      // TODO: Enhance with actual burn table rules for custom pricing
      // const burnTable = await db.burnTable.findFirst({
      //   where: {
      //     customerId: event.customer_id,
      //     isActive: true
      //   }
      // });

      // Calculate credits based on burn table or default conversion
      // Default: 1 credit = $0.001 USD (so multiply USD by 1000)
      // BurnTable has 'rules' field that should contain pricing logic
      const creditsPerDollar = 1000; // Default: 1000 credits per dollar

      const credits = BigInt(Math.ceil(totalUsd * creditsPerDollar));

      logger.debug({
        eventId: event.event_id,
        provider: event.provider,
        model: event.model,
        inputTokens,
        outputTokens,
        inputUsd,
        outputUsd,
        totalUsd,
        credits: credits.toString()
      }, 'Cost calculated');

      return {
        credits,
        usd: new Decimal(totalUsd),
        breakdown: {
          inputCost: inputUsd,
          outputCost: outputUsd,
          inputTokens,
          outputTokens
        }
      };
    }

    // For IMAGE_GENERATION events
    if (event.event_type === 'IMAGE_GENERATION' && event.provider && event.model) {
      // Fetch image generation cost from database
      const imageCost = await db.providerCost.findFirst({
        where: {
          provider: event.provider,
          model: event.model,
          costType: 'IMAGE',
          validFrom: { lte: new Date() },
          OR: [
            { validUntil: null },
            { validUntil: { gte: new Date() } }
          ]
        }
      });

      if (!imageCost) {
        logger.warn({
          provider: event.provider,
          model: event.model,
          eventType: 'IMAGE_GENERATION'
        }, 'Image generation cost not found, using default');
        
        // Default: $0.04 per image (DALL-E 3 standard pricing)
        const defaultImageCost = 0.04;
        const imageCount = Number(event.image_count) || 1;
        const totalUsd = defaultImageCost * imageCount;
        const creditsPerDollar = 1000;
        const credits = BigInt(Math.ceil(totalUsd * creditsPerDollar));

        return {
          credits,
          usd: new Decimal(totalUsd)
        };
      }

      const imageCount = Number(event.image_count) || 1;
      const totalUsd = (imageCount / Number(imageCost.unitSize)) * Number(imageCost.costPerUnit);
      const creditsPerDollar = 1000;
      const credits = BigInt(Math.ceil(totalUsd * creditsPerDollar));

      logger.debug({
        eventId: event.event_id,
        provider: event.provider,
        model: event.model,
        imageCount,
        totalUsd,
        credits: credits.toString()
      }, 'Image generation cost calculated');

      return {
        credits,
        usd: new Decimal(totalUsd)
      };
    }

    // For CUSTOM events with quantity-based pricing
    if (event.event_type === 'CUSTOM' && event.unit_type && event.quantity) {
      // For custom events, use a simple per-unit pricing
      // Default: 1 credit per unit (e.g., 1 credit per page, per API call, etc.)
      const defaultCreditsPerUnit = 10; // 10 credits per unit (0.01 cents)
      const quantity = Number(event.quantity) || 1;
      const credits = BigInt(quantity * defaultCreditsPerUnit);
      const creditsPerDollar = 1000;
      const totalUsd = Number(credits) / creditsPerDollar;

      logger.debug({
        eventId: event.event_id,
        unitType: event.unit_type,
        quantity,
        creditsPerUnit: defaultCreditsPerUnit,
        credits: credits.toString()
      }, 'Custom event cost calculated');

      return {
        credits,
        usd: new Decimal(totalUsd)
      };
    }

    // For other event types (API_CALL, FEATURE_ACCESS), return zero cost
    // These might have fixed costs defined in entitlements
    return {
      credits: BigInt(0),
      usd: new Decimal(0)
    };

  } catch (error) {
    logger.error({ error, eventId: event.event_id }, 'Cost calculation failed');
    // Return zero cost on error to not block event processing
    return {
      credits: BigInt(0),
      usd: new Decimal(0)
    };
  }
}
