// Burn Table Service
// Business logic for managing burn tables (pricing markup rules)

import { getPrismaClient } from '@openmonetize/common';
import { logger } from '../logger';

const db = getPrismaClient();

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

export class BurnTableService {
  /**
   * Get all burn tables with optional filtering
   */
  async list(filter?: BurnTableFilter) {
    try {
      const burnTables = await db.burnTable.findMany({
        where: filter,
        orderBy: [{ customerId: 'asc' }, { version: 'desc' }],
        include: {
          customer: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      logger.debug({ count: burnTables.length, filter }, 'Listed burn tables');

      return burnTables;
    } catch (error) {
      logger.error({ error, filter }, 'Failed to list burn tables');
      throw error;
    }
  }

  /**
   * Get a specific burn table by ID
   */
  async getById(id: string) {
    try {
      const burnTable = await db.burnTable.findUnique({
        where: { id },
        include: {
          customer: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      if (!burnTable) {
        throw new Error(`Burn table not found: ${id}`);
      }

      logger.debug({ id }, 'Retrieved burn table');

      return burnTable;
    } catch (error) {
      logger.error({ error, id }, 'Failed to get burn table');
      throw error;
    }
  }

  /**
   * Get active burn table for a customer (or default)
   */
  async getActiveForCustomer(customerId: string) {
    try {
      // Try customer-specific burn table first
      let burnTable = await db.burnTable.findFirst({
        where: {
          customerId,
          isActive: true
        },
        orderBy: { version: 'desc' }
      });

      // Fall back to default burn table
      if (!burnTable) {
        burnTable = await db.burnTable.findFirst({
          where: {
            customerId: null,
            isActive: true
          },
          orderBy: { version: 'desc' }
        });
      }

      logger.debug(
        {
          customerId,
          found: !!burnTable,
          isDefault: !burnTable?.customerId
        },
        'Retrieved active burn table for customer'
      );

      return burnTable;
    } catch (error) {
      logger.error({ error, customerId }, 'Failed to get active burn table');
      throw error;
    }
  }

  /**
   * Create a new burn table
   */
  async create(input: BurnTableCreateInput) {
    try {
      // Get next version number for this customer
      const latestVersion = await db.burnTable.findFirst({
        where: { customerId: input.customerId || null },
        orderBy: { version: 'desc' },
        select: { version: true }
      });

      const nextVersion = (latestVersion?.version || 0) + 1;

      // If this is being set as active, deactivate previous versions
      const updates = await db.$transaction(async (tx) => {
        // Deactivate previous active burn tables for this customer
        await tx.burnTable.updateMany({
          where: {
            customerId: input.customerId || null,
            isActive: true
          },
          data: {
            isActive: false,
            validUntil: new Date()
          }
        });

        // Create new burn table
        const burnTable = await tx.burnTable.create({
          data: {
            customerId: input.customerId || null,
            name: input.name,
            version: nextVersion,
            rules: input.rules,
            isActive: true,
            validFrom: input.validFrom || new Date(),
            validUntil: input.validUntil || null
          },
          include: {
            customer: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });

        return burnTable;
      });

      logger.info(
        {
          id: updates.id,
          customerId: input.customerId,
          version: nextVersion
        },
        'Created burn table'
      );

      return updates;
    } catch (error) {
      logger.error({ error, input }, 'Failed to create burn table');
      throw error;
    }
  }

  /**
   * Update an existing burn table
   */
  async update(id: string, input: BurnTableUpdateInput) {
    try {
      const burnTable = await db.burnTable.update({
        where: { id },
        data: input,
        include: {
          customer: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      logger.info({ id, input }, 'Updated burn table');

      return burnTable;
    } catch (error) {
      logger.error({ error, id, input }, 'Failed to update burn table');
      throw error;
    }
  }

  /**
   * Soft delete (deactivate) a burn table
   */
  async deactivate(id: string) {
    try {
      const burnTable = await db.burnTable.update({
        where: { id },
        data: {
          isActive: false,
          validUntil: new Date()
        }
      });

      logger.info({ id }, 'Deactivated burn table');

      return burnTable;
    } catch (error) {
      logger.error({ error, id }, 'Failed to deactivate burn table');
      throw error;
    }
  }

  /**
   * Validate burn table rules structure
   */
  validateRules(rules: Record<string, any>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!rules || typeof rules !== 'object') {
      errors.push('Rules must be an object');
      return { valid: false, errors };
    }

    // Check each model's rules
    for (const [model, modelRules] of Object.entries(rules)) {
      if (typeof modelRules !== 'object') {
        errors.push(`Rules for model "${model}" must be an object`);
        continue;
      }

      // Check required fields
      if (!('per_unit' in modelRules)) {
        errors.push(`Rules for model "${model}" missing "per_unit" field`);
      }

      // For token-based pricing
      if ('input_tokens' in modelRules || 'output_tokens' in modelRules) {
        if (typeof modelRules.input_tokens !== 'number') {
          errors.push(`Rules for model "${model}" has invalid "input_tokens"`);
        }
        if (typeof modelRules.output_tokens !== 'number') {
          errors.push(`Rules for model "${model}" has invalid "output_tokens"`);
        }
      }

      // For flat-rate pricing
      if ('flat_rate' in modelRules) {
        if (typeof modelRules.flat_rate !== 'number') {
          errors.push(`Rules for model "${model}" has invalid "flat_rate"`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const burnTableService = new BurnTableService();
