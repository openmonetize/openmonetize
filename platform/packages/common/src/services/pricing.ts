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

// Pricing Service
// Shared business logic for pricing, burn tables, and cost calculation

import { getPrismaClient, ProviderName } from "../database";

const db = getPrismaClient();

// Constants
const DEFAULT_CREDITS_PER_DOLLAR = 1000;

// Types
export interface BurnTableCreateInput {
  customerId?: string;
  name: string;
  rules: Record<string, any>;
  validFrom?: Date;
  validUntil?: Date;
}

export interface BurnTableUpdateInput {
  name?: string;
  rules?: Record<string, any>;
  validUntil?: Date;
}

export interface BurnTableFilter {
  customerId?: string;
  isActive?: boolean;
}

export interface CostCalculationInput {
  customerId: string;
  provider: string;
  model: string;
  type?: "text" | "image" | "video";
  inputTokens?: number;
  outputTokens?: number;
  count?: number;
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
  pricingSource: "customer_burn_table" | "default_burn_table" | "default";
}

export class PricingService {
  // ===========================================================================
  // Burn Table Management
  // ===========================================================================

  /**
   * Get all burn tables with optional filtering
   */
  async listBurnTables(filter?: BurnTableFilter) {
    return db.burnTable.findMany({
      where: filter,
      orderBy: [{ customerId: "asc" }, { version: "desc" }],
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Get a specific burn table by ID
   */
  async getBurnTableById(id: string) {
    const burnTable = await db.burnTable.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!burnTable) {
      throw new Error(`Burn table not found: ${id}`);
    }

    return burnTable;
  }

  /**
   * Get active burn table for a customer (or default)
   */
  async getActiveBurnTable(customerId: string) {
    // Try customer-specific burn table first
    let burnTable = await db.burnTable.findFirst({
      where: {
        customerId,
        isActive: true,
      },
      orderBy: { version: "desc" },
    });

    // Fall back to default burn table
    if (!burnTable) {
      burnTable = await db.burnTable.findFirst({
        where: {
          customerId: null,
          isActive: true,
        },
        orderBy: { version: "desc" },
      });
    }

    return burnTable;
  }

  /**
   * Create a new burn table
   */
  async createBurnTable(input: BurnTableCreateInput) {
    // Get next version number for this customer
    const latestVersion = await db.burnTable.findFirst({
      where: { customerId: input.customerId || null },
      orderBy: { version: "desc" },
      select: { version: true },
    });

    const nextVersion = (latestVersion?.version || 0) + 1;

    // If this is being set as active, deactivate previous versions
    return db.$transaction(async (tx: any) => {
      // Deactivate previous active burn tables for this customer
      await tx.burnTable.updateMany({
        where: {
          customerId: input.customerId || null,
          isActive: true,
        },
        data: {
          isActive: false,
          validUntil: new Date(),
        },
      });

      // Create new burn table
      return tx.burnTable.create({
        data: {
          customerId: input.customerId || null,
          name: input.name,
          version: nextVersion,
          rules: input.rules,
          isActive: true,
          validFrom: input.validFrom || new Date(),
          validUntil: input.validUntil || null,
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    });
  }

  /**
   * Update an existing burn table
   */
  async updateBurnTable(id: string, input: BurnTableUpdateInput) {
    return db.burnTable.update({
      where: { id },
      data: input,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  /**
   * Soft delete (deactivate) a burn table
   */
  async deactivateBurnTable(id: string) {
    return db.burnTable.update({
      where: { id },
      data: {
        isActive: false,
        validUntil: new Date(),
      },
    });
  }

  /**
   * Validate burn table rules structure
   */
  validateRules(rules: Record<string, any>): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!rules || typeof rules !== "object") {
      errors.push("Rules must be an object");
      return { valid: false, errors };
    }

    // Check each model's rules
    for (const [model, modelRules] of Object.entries(rules)) {
      if (typeof modelRules !== "object") {
        errors.push(`Rules for model "${model}" must be an object`);
        continue;
      }

      // Check required fields
      if (!("per_unit" in modelRules)) {
        errors.push(`Rules for model "${model}" missing "per_unit" field`);
      }

      // For token-based pricing
      if ("input_tokens" in modelRules || "output_tokens" in modelRules) {
        if (typeof modelRules.input_tokens !== "number") {
          errors.push(`Rules for model "${model}" has invalid "input_tokens"`);
        }
        if (typeof modelRules.output_tokens !== "number") {
          errors.push(`Rules for model "${model}" has invalid "output_tokens"`);
        }
      }

      // For flat-rate pricing
      if ("flat_rate" in modelRules) {
        if (typeof modelRules.flat_rate !== "number") {
          errors.push(`Rules for model "${model}" has invalid "flat_rate"`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // ===========================================================================
  // Cost Calculation
  // ===========================================================================

  /**
   * Calculate cost for a single usage event
   */
  async calculateCost(
    input: CostCalculationInput,
  ): Promise<CostCalculationResult> {
    const type = input.type || "text";

    // 1. Get provider costs
    let costs: any[] = [];

    if (type === "image" || type === "video") {
      const costType = type === "image" ? "IMAGE" : "VIDEO";
      const cost = await db.providerCost.findFirst({
        where: {
          provider: input.provider as ProviderName,
          model: input.model,
          costType: costType,
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }],
        },
        orderBy: { validFrom: "desc" },
      });
      costs = [cost, null]; // Treat as single unit cost
    } else {
      costs = await this.getProviderCosts(input.provider, input.model);
    }

    const [inputCost, outputCost] = costs;

    // For Image/Video, we use inputCost as the cost per unit/generation
    if (
      (type === "text" && (!inputCost || !outputCost)) ||
      ((type === "image" || type === "video") && !inputCost)
    ) {
      throw new Error(
        `No cost data found for ${input.provider}/${input.model} (Type: ${type})`,
      );
    }

    let inputUsd = 0;
    let outputUsd = 0;
    let totalUsd = 0;

    // 2. Calculate USD cost from provider
    if (type === "text") {
      inputUsd =
        ((input.inputTokens || 0) / Number(inputCost.unitSize)) *
        Number(inputCost.costPerUnit);
      outputUsd =
        ((input.outputTokens || 0) / Number(outputCost.unitSize)) *
        Number(outputCost.costPerUnit);
      totalUsd = inputUsd + outputUsd;
    } else {
      // Image/Video: Cost = count * unit cost
      const count = input.count || 1;
      totalUsd =
        (count / Number(inputCost.unitSize)) * Number(inputCost.costPerUnit);
      inputUsd = totalUsd; // Attribute all to "input" slot effectively, or just total
    }

    // 3. Get burn table for customer (or default)
    const burnTable = await this.getActiveBurnTable(input.customerId);

    // 4. Calculate credits based on burn table
    const { credits, inputCredits, outputCredits, pricingSource } =
      this.calculateCredits(input, totalUsd, inputUsd, outputUsd, burnTable);

    // 5. Calculate revenue and margin
    const revenueUsd = credits / DEFAULT_CREDITS_PER_DOLLAR;
    const marginUsd = revenueUsd - totalUsd;
    const marginPercent = totalUsd > 0 ? (marginUsd / totalUsd) * 100 : 0;

    return {
      credits,
      costBreakdown: {
        input: {
          tokens: input.inputTokens || 0,
          credits: inputCredits,
          usd: inputUsd,
          ratePerUnit: inputCost ? Number(inputCost.costPerUnit) : 0,
          unitSize: inputCost ? Number(inputCost.unitSize) : 1,
        },
        output: {
          tokens: input.outputTokens || 0,
          credits: outputCredits,
          usd: outputUsd,
          ratePerUnit: outputCost ? Number(outputCost.costPerUnit) : 0,
          unitSize: outputCost ? Number(outputCost.unitSize) : 1,
        },
      },
      providerCostUsd: totalUsd,
      revenueUsd,
      marginUsd,
      marginPercent: Math.round(marginPercent * 100) / 100,
      pricingSource,
    };
  }

  /**
   * Calculate costs for multiple events in bulk
   */
  async calculateBulk(
    customerId: string,
    calculations: Array<Omit<CostCalculationInput, "customerId">>,
  ): Promise<CostCalculationResult[]> {
    return Promise.all(
      calculations.map((calc) =>
        this.calculateCost({
          customerId,
          ...calc,
        }),
      ),
    );
  }

  /**
   * Get provider costs for a specific model
   */
  async getProviderCosts(provider: string, model: string) {
    return Promise.all([
      db.providerCost.findFirst({
        where: {
          provider: provider as ProviderName,
          model,
          costType: "INPUT_TOKEN",
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }],
        },
        orderBy: { validFrom: "desc" },
      }),
      db.providerCost.findFirst({
        where: {
          provider: provider as ProviderName,
          model,
          costType: "OUTPUT_TOKEN",
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }],
        },
        orderBy: { validFrom: "desc" },
      }),
    ]);
  }

  /**
   * Calculate credits based on burn table rules
   */
  private calculateCredits(
    input: CostCalculationInput,
    totalUsd: number,
    inputUsd: number,
    outputUsd: number,
    burnTable: any,
  ) {
    let credits: number;
    let inputCredits: number;
    let outputCredits: number;
    let pricingSource: "customer_burn_table" | "default_burn_table" | "default";

    if (burnTable) {
      const rules = burnTable.rules as any;
      const modelRules = rules[input.model] || rules["default"];

      if (modelRules) {
        // Use burn table rules for credit calculation
        if (input.type === "text" || !input.type) {
          inputCredits =
            ((input.inputTokens || 0) / modelRules.per_unit) *
            modelRules.input_tokens;
          outputCredits =
            ((input.outputTokens || 0) / modelRules.per_unit) *
            modelRules.output_tokens;
          credits = Math.ceil(inputCredits + outputCredits);
        } else {
          // For image/video, check for flat rate or specific pricing in rules
          // Assuming flat_rate for now for simplicity if token rules don't ensure
          if (modelRules.flat_rate) {
            const count = input.count || 1;
            credits = Math.ceil(count * modelRules.flat_rate);
            inputCredits = credits;
            outputCredits = 0;
          } else {
            // Fallback to USD based for image/video if no specific rules
            credits = Math.ceil(totalUsd * DEFAULT_CREDITS_PER_DOLLAR);
            inputCredits = credits;
            outputCredits = 0;
          }
        }

        pricingSource = burnTable.customerId
          ? "customer_burn_table"
          : "default_burn_table";
      } else {
        // Fall back to default conversion
        credits = Math.ceil(totalUsd * DEFAULT_CREDITS_PER_DOLLAR);
        inputCredits = Math.ceil(inputUsd * DEFAULT_CREDITS_PER_DOLLAR);
        outputCredits = Math.ceil(outputUsd * DEFAULT_CREDITS_PER_DOLLAR);
        pricingSource = "default";
      }
    } else {
      // No burn table found, use default conversion
      credits = Math.ceil(totalUsd * DEFAULT_CREDITS_PER_DOLLAR);
      inputCredits = Math.ceil(inputUsd * DEFAULT_CREDITS_PER_DOLLAR);
      outputCredits = Math.ceil(outputUsd * DEFAULT_CREDITS_PER_DOLLAR);
      pricingSource = "default";
    }

    return { credits, inputCredits, outputCredits, pricingSource };
  }
}

// Export singleton instance
export const pricingService = new PricingService();
