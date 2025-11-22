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

// Customer registration and management routes
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getPrismaClient, generateApiKey, hashApiKey } from '@openmonetize/common';
import { logger } from '../logger';
import { z } from 'zod';
import { authenticate } from '../middleware/auth';
import { withCommonResponses } from '../types/schemas';
import type { RegisterCustomerRoute } from '../types/routes';

const db = getPrismaClient();

// Request schemas
const CustomerRegistrationSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  tier: z.enum(['STARTER', 'GROWTH', 'ENTERPRISE']).default('STARTER'),
});

export const customersRoutes: FastifyPluginAsyncZod = async (app) => {
  // Customer registration (no auth required)
  app.post<RegisterCustomerRoute>(
    '/v1/customers/register',
    {
      schema: {
        tags: ['Customers'],
        'x-visibility': 'public',
        description: 'Register a new customer account',
        body: CustomerRegistrationSchema,
        response: withCommonResponses({
          201: z.object({
            data: z.object({
              customerId: z.string().uuid(),
              apiKey: z.string().describe('API key - only shown once! Save it securely.'),
              name: z.string(),
              email: z.string(),
              tier: z.string(),
              createdAt: z.string().datetime(),
            }),
          }),
        }, [400, 409, 500]),
      },
    },
    async (request, reply) => {
      try {
        // Validate request body
        const { name, email, tier } = request.body;

        // Check if email already exists
        const existingCustomer = await db.customer.findUnique({
          where: { email },
        });

        if (existingCustomer) {
          return reply.status(409).send({
            error: 'Conflict',
            message: 'A customer with this email already exists',
          });
        }

        // Generate API key
        const apiKey = generateApiKey('om_live');
        const apiKeyHash = hashApiKey(apiKey);

        // Create customer
        const customer = await db.customer.create({
          data: {
            name,
            email,
            tier: tier as any, // Cast to Prisma enum
            apiKeyHash,
            status: 'ACTIVE' as any, // Cast to Prisma enum
          },
        });

        logger.info(
          { customerId: customer.id, email },
          'New customer registered'
        );

        return reply.status(201).send({
          data: {
            customerId: customer.id,
            apiKey, // Only shown once!
            name: customer.name,
            email: customer.email,
            tier: customer.tier,
            createdAt: customer.createdAt.toISOString(),
          },
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation Error',
            message: 'Invalid request data',
            details: error.errors,
          });
        }

        logger.error({ err: error }, 'Error registering customer');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to register customer',
        });
      }
    }
  );

  // Get customer profile (authenticated)
  app.get(
    '/v1/customers/me',
    {
      preHandler: authenticate,
      schema: {
        tags: ['Customers'],
        'x-visibility': 'internal',
        description: 'Get current customer profile',
        security: [{ bearerAuth: [] }],
        response: withCommonResponses({
          200: z.object({
            data: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string(),
              tier: z.string(),
              status: z.string(),
              createdAt: z.string().datetime(),
            }),
          }),
        }, [401, 404, 500]),
      },
    },
    async (request, reply) => {
      try {
        // Customer is attached by auth middleware
        if (!request.customer) {
          return reply.status(401).send({
            error: 'Unauthorized',
            message: 'Authentication required',
          });
        }

        const customer = await db.customer.findUnique({
          where: { id: request.customer.id },
          select: {
            id: true,
            name: true,
            email: true,
            tier: true,
            status: true,
            createdAt: true,
          },
        });

        if (!customer) {
          return reply.status(404).send({
            error: 'Not Found',
            message: 'Customer not found',
          });
        }

        return reply.send({
          data: {
            ...customer,
            createdAt: customer.createdAt.toISOString(),
          },
        });
      } catch (error) {
        logger.error({ err: error }, 'Error fetching customer profile');
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Failed to fetch customer profile',
        });
      }
    }
  );
};
