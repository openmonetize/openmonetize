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

// Cost Calculator Service
// Business logic for calculating costs from token usage

import { getPrismaClient, ProviderName } from '@openmonetize/common';
import { logger } from '../logger';
import { config } from '../config';

const db = getPrismaClient();

export interface CostCalculationInput {
  customerId: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

export interface CostBreakdown {
  input: {
    tokens: number;
    credits: number;
    usd: number;
    ratePerUnit: number;
    unitSize: number;
  };
  output: {
    tokens: number;
    credits: number;
    usd: number;
    ratePerUnit: number;
    unitSize: number;
  };
}

export interface CostCalculationResult {
  credits: number;
  costBreakdown: CostBreakdown;
  providerCostUsd: number;
  revenueUsd: number;
  marginUsd: number;
  marginPercent: number;
  pricingSource: 'customer_burn_table' | 'default_burn_table' | 'default';
}

export class CostCalculatorService {
  /**
   * Calculate cost for a single usage event
   */
  async calculateCost(input: CostCalculationInput): Promise<CostCalculationResult> {
    try {
      // 1. Get provider costs
      const [inputCost, outputCost] = await this.getProviderCosts(
        input.provider,
        input.model
      );

      if (!inputCost || !outputCost) {
        throw new Error(
          `No cost data found for ${input.provider}/${input.model}`
        );
      }

      // 2. Calculate USD cost from provider
      const inputUsd =
        (input.inputTokens / Number(inputCost.unitSize)) *
        Number(inputCost.costPerUnit);
      const outputUsd =
        (input.outputTokens / Number(outputCost.unitSize)) *
        Number(outputCost.costPerUnit);
      const totalUsd = inputUsd + outputUsd;

      // 3. Get burn table for customer (or default)
      const burnTable = await this.getBurnTable(input.customerId);

      // 4. Calculate credits based on burn table
      const { credits, inputCredits, outputCredits, pricingSource } =
        await this.calculateCredits(
          input,
          totalUsd,
          inputUsd,
          outputUsd,
          burnTable
        );

      // 5. Calculate revenue and margin
      const revenueUsd = credits / config.defaultCreditsPerDollar;
      const marginUsd = revenueUsd - totalUsd;
      const marginPercent = totalUsd > 0 ? (marginUsd / totalUsd) * 100 : 0;

      logger.debug(
        {
          provider: input.provider,
          model: input.model,
          inputTokens: input.inputTokens,
          outputTokens: input.outputTokens,
          totalUsd,
          credits,
          pricingSource
        },
        'Cost calculated'
      );

      return {
        credits,
        costBreakdown: {
          input: {
            tokens: input.inputTokens,
            credits: inputCredits,
            usd: inputUsd,
            ratePerUnit: Number(inputCost.costPerUnit),
            unitSize: Number(inputCost.unitSize)
          },
          output: {
            tokens: input.outputTokens,
            credits: outputCredits,
            usd: outputUsd,
            ratePerUnit: Number(outputCost.costPerUnit),
            unitSize: Number(outputCost.unitSize)
          }
        },
        providerCostUsd: totalUsd,
        revenueUsd,
        marginUsd,
        marginPercent: Math.round(marginPercent * 100) / 100,
        pricingSource
      };
    } catch (error) {
      logger.error({ error, input }, 'Cost calculation failed');
      throw error;
    }
  }

  /**
   * Calculate costs for multiple events in bulk
   */
  async calculateBulk(
    customerId: string,
    calculations: Array<Omit<CostCalculationInput, 'customerId'>>
  ): Promise<CostCalculationResult[]> {
    try {
      const results = await Promise.all(
        calculations.map((calc) =>
          this.calculateCost({
            customerId,
            ...calc
          })
        )
      );

      logger.info(
        { customerId, count: calculations.length },
        'Bulk cost calculation completed'
      );

      return results;
    } catch (error) {
      logger.error({ error, customerId }, 'Bulk cost calculation failed');
      throw error;
    }
  }

  /**
   * Get provider costs for a specific model
   */
  private async getProviderCosts(provider: string, model: string) {
    return Promise.all([
      db.providerCost.findFirst({
        where: {
          provider: provider as ProviderName,
          model,
          costType: 'INPUT_TOKEN',
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
        },
        orderBy: { validFrom: 'desc' }
      }),
      db.providerCost.findFirst({
        where: {
          provider: provider as ProviderName,
          model,
          costType: 'OUTPUT_TOKEN',
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
        },
        orderBy: { validFrom: 'desc' }
      })
    ]);
  }

  /**
   * Get active burn table for customer (or default)
   */
  private async getBurnTable(customerId: string) {
    // Try customer-specific burn table first
    let burnTable = await db.burnTable.findFirst({
      where: {
        customerId,
        isActive: true
      }
    });

    // Fall back to default burn table if customer doesn't have one
    if (!burnTable) {
      burnTable = await db.burnTable.findFirst({
        where: {
          customerId: null, // null means default
          isActive: true
        }
      });
    }

    return burnTable;
  }

  /**
   * Calculate credits based on burn table rules
   */
  private async calculateCredits(
    input: CostCalculationInput,
    totalUsd: number,
    inputUsd: number,
    outputUsd: number,
    burnTable: any
  ) {
    let credits: number;
    let inputCredits: number;
    let outputCredits: number;
    let pricingSource: 'customer_burn_table' | 'default_burn_table' | 'default';

    if (burnTable) {
      const rules = burnTable.rules as any;
      const modelRules = rules[input.model] || rules['default'];

      if (modelRules) {
        // Use burn table rules for credit calculation
        inputCredits =
          (input.inputTokens / modelRules.per_unit) *
          modelRules.input_tokens;
        outputCredits =
          (input.outputTokens / modelRules.per_unit) *
          modelRules.output_tokens;
        credits = Math.ceil(inputCredits + outputCredits);
        pricingSource = burnTable.customerId
          ? 'customer_burn_table'
          : 'default_burn_table';
      } else {
        // Fall back to default conversion
        credits = Math.ceil(totalUsd * config.defaultCreditsPerDollar);
        inputCredits = Math.ceil(inputUsd * config.defaultCreditsPerDollar);
        outputCredits = Math.ceil(outputUsd * config.defaultCreditsPerDollar);
        pricingSource = 'default';
      }
    } else {
      // No burn table found, use default conversion
      credits = Math.ceil(totalUsd * config.defaultCreditsPerDollar);
      inputCredits = Math.ceil(inputUsd * config.defaultCreditsPerDollar);
      outputCredits = Math.ceil(outputUsd * config.defaultCreditsPerDollar);
      pricingSource = 'default';
    }

    return { credits, inputCredits, outputCredits, pricingSource };
  }
}

// Export singleton instance
export const costCalculatorService = new CostCalculatorService();
