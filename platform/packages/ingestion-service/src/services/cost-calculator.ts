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

        return {
          credits: BigInt(0),
          usd: new Decimal(0)
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
