// Burn Table Management Routes

import { FastifyPluginAsync } from 'fastify';
import { getPrismaClient } from '@openmonetize/common';
import { z } from 'zod';
import { logger } from '../logger';

const db = getPrismaClient();

// Validation schemas
const createBurnTableSchema = z.object({
  customerId: z.string().uuid().optional(),
  name: z.string().min(1).max(255),
  rules: z.record(z.string(), z.object({
    inputTokens: z.number().nonnegative(),
    outputTokens: z.number().nonnegative(),
    perUnit: z.number().positive().default(1000)
  })),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional()
});

const updateBurnTableSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  rules: z.record(z.string(), z.object({
    inputTokens: z.number().nonnegative(),
    outputTokens: z.number().nonnegative(),
    perUnit: z.number().positive().default(1000)
  })).optional(),
  isActive: z.boolean().optional(),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional()
});

export const burnTableRoutes: FastifyPluginAsync = async (app) => {
  // List all burn tables
  app.get('/', async (request, reply) => {
    const { customerId, isActive } = request.query as {
      customerId?: string;
      isActive?: string;
    };

    const burnTables = await db.burnTable.findMany({
      where: {
        ...(customerId && { customerId }),
        ...(isActive !== undefined && { isActive: isActive === 'true' })
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      data: burnTables,
      total: burnTables.length
    };
  });

  // Get a specific burn table
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const burnTable = await db.burnTable.findUnique({
      where: { id }
    });

    if (!burnTable) {
      reply.code(404);
      return {
        error: 'NOT_FOUND',
        message: 'Burn table not found'
      };
    }

    return { data: burnTable };
  });

  // Create a new burn table
  app.post('/', async (request, reply) => {
    try {
      const body = createBurnTableSchema.parse(request.body);

      // If creating customer-specific burn table, deactivate previous versions
      if (body.customerId) {
        await db.burnTable.updateMany({
          where: {
            customerId: body.customerId,
            isActive: true
          },
          data: {
            isActive: false
          }
        });
      }

      const burnTable = await db.burnTable.create({
        data: {
          customerId: body.customerId || null,
          name: body.name,
          rules: body.rules as any,
          validFrom: body.validFrom ? new Date(body.validFrom) : new Date(),
          validUntil: body.validUntil ? new Date(body.validUntil) : null,
          isActive: true,
          version: 1
        }
      });

      logger.info({ burnTableId: burnTable.id, customerId: body.customerId }, 'Burn table created');

      reply.code(201);
      return { data: burnTable };
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400);
        return {
          error: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: error.errors
        };
      }

      logger.error({ error }, 'Failed to create burn table');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to create burn table'
      };
    }
  });

  // Update a burn table
  app.patch('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const body = updateBurnTableSchema.parse(request.body);

      const existingTable = await db.burnTable.findUnique({
        where: { id }
      });

      if (!existingTable) {
        reply.code(404);
        return {
          error: 'NOT_FOUND',
          message: 'Burn table not found'
        };
      }

      const burnTable = await db.burnTable.update({
        where: { id },
        data: {
          ...(body.name && { name: body.name }),
          ...(body.rules && { rules: body.rules as any }),
          ...(body.isActive !== undefined && { isActive: body.isActive }),
          ...(body.validFrom && { validFrom: new Date(body.validFrom) }),
          ...(body.validUntil && { validUntil: new Date(body.validUntil) }),
          updatedAt: new Date()
        }
      });

      logger.info({ burnTableId: id }, 'Burn table updated');

      return { data: burnTable };
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.code(400);
        return {
          error: 'VALIDATION_ERROR',
          message: 'Invalid request body',
          details: error.errors
        };
      }

      logger.error({ error }, 'Failed to update burn table');
      reply.code(500);
      return {
        error: 'INTERNAL_ERROR',
        message: 'Failed to update burn table'
      };
    }
  });

  // Delete (deactivate) a burn table
  app.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const existingTable = await db.burnTable.findUnique({
      where: { id }
    });

    if (!existingTable) {
      reply.code(404);
      return {
        error: 'NOT_FOUND',
        message: 'Burn table not found'
      };
    }

    // Soft delete by marking as inactive
    await db.burnTable.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    });

    logger.info({ burnTableId: id }, 'Burn table deactivated');

    return {
      message: 'Burn table deactivated successfully'
    };
  });

  // Get active burn table for a customer
  app.get('/customer/:customerId/active', async (request, reply) => {
    const { customerId } = request.params as { customerId: string };

    const burnTable = await db.burnTable.findFirst({
      where: {
        customerId,
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!burnTable) {
      // Return default burn table if customer doesn't have one
      const defaultTable = await db.burnTable.findFirst({
        where: {
          customerId: null,
          isActive: true
        }
      });

      if (!defaultTable) {
        reply.code(404);
        return {
          error: 'NOT_FOUND',
          message: 'No burn table found'
        };
      }

      return { data: defaultTable, isDefault: true };
    }

    return { data: burnTable, isDefault: false };
  });
};
