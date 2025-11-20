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

// Customer Registration Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Use vi.hoisted() for mock setup
const {
  mockCustomerFindUnique,
  mockCustomerCreate,
  mockGenerateApiKey,
  mockHashApiKey,
} = vi.hoisted(() => ({
  mockCustomerFindUnique: vi.fn(),
  mockCustomerCreate: vi.fn(),
  mockGenerateApiKey: vi.fn(),
  mockHashApiKey: vi.fn(),
}));

// Mock dependencies
vi.mock('@openmonetize/common', () => ({
  getPrismaClient: () => ({
    customer: {
      findUnique: mockCustomerFindUnique,
      create: mockCustomerCreate,
    },
  }),
  generateApiKey: mockGenerateApiKey,
  hashApiKey: mockHashApiKey,
}));

vi.mock('../../logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

import Fastify, { FastifyInstance } from 'fastify';
import { customersRoutes } from '../customers';

describe('Customer Registration', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();

    // Create fresh Fastify instance
    app = Fastify();
    await app.register(customersRoutes);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /v1/customers/register', () => {
    describe('Successful Registration', () => {
      it('should register a new customer with valid data', async () => {
        const mockApiKey = 'om_live_abc123xyz';
        const mockApiKeyHash = 'hashed_abc123xyz';
        const mockCustomer = {
          id: 'cust_new123',
          name: 'Acme AI',
          email: 'admin@acme-ai.com',
          tier: 'STARTER',
          status: 'ACTIVE',
          apiKeyHash: mockApiKeyHash,
          createdAt: new Date('2024-11-18T12:00:00Z'),
        };

        mockCustomerFindUnique.mockResolvedValue(null); // Email doesn't exist
        mockGenerateApiKey.mockReturnValue(mockApiKey);
        mockHashApiKey.mockReturnValue(mockApiKeyHash);
        mockCustomerCreate.mockResolvedValue(mockCustomer);

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Acme AI',
            email: 'admin@acme-ai.com',
          },
        });

        expect(response.statusCode).toBe(201);

        const body = JSON.parse(response.body);
        expect(body.data).toMatchObject({
          customerId: 'cust_new123',
          apiKey: mockApiKey,
          name: 'Acme AI',
          email: 'admin@acme-ai.com',
          tier: 'STARTER',
        });

        expect(body.data.createdAt).toBe('2024-11-18T12:00:00.000Z');
      });

      it('should register customer with specified tier', async () => {
        mockCustomerFindUnique.mockResolvedValue(null);
        mockGenerateApiKey.mockReturnValue('om_live_enterprise');
        mockHashApiKey.mockReturnValue('hashed_enterprise');
        mockCustomerCreate.mockResolvedValue({
          id: 'cust_ent456',
          name: 'Enterprise Corp',
          email: 'billing@enterprise.com',
          tier: 'ENTERPRISE',
          status: 'ACTIVE',
          apiKeyHash: 'hashed_enterprise',
          createdAt: new Date(),
        });

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Enterprise Corp',
            email: 'billing@enterprise.com',
            tier: 'ENTERPRISE',
          },
        });

        expect(response.statusCode).toBe(201);

        const body = JSON.parse(response.body);
        expect(body.data.tier).toBe('ENTERPRISE');
      });

      it('should default to STARTER tier when not specified', async () => {
        mockCustomerFindUnique.mockResolvedValue(null);
        mockGenerateApiKey.mockReturnValue('om_live_starter');
        mockHashApiKey.mockReturnValue('hashed_starter');
        mockCustomerCreate.mockResolvedValue({
          id: 'cust_start789',
          name: 'Startup Inc',
          email: 'info@startup.com',
          tier: 'STARTER',
          status: 'ACTIVE',
          apiKeyHash: 'hashed_starter',
          createdAt: new Date(),
        });

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Startup Inc',
            email: 'info@startup.com',
            // tier not specified
          },
        });

        expect(response.statusCode).toBe(201);

        const body = JSON.parse(response.body);
        expect(body.data.tier).toBe('STARTER');
      });

      it('should generate API key with om_live prefix', async () => {
        mockCustomerFindUnique.mockResolvedValue(null);
        mockGenerateApiKey.mockReturnValue('om_live_generated123');
        mockHashApiKey.mockReturnValue('hashed_generated');
        mockCustomerCreate.mockResolvedValue({
          id: 'cust_999',
          name: 'Test Co',
          email: 'test@example.com',
          tier: 'STARTER',
          status: 'ACTIVE',
          apiKeyHash: 'hashed_generated',
          createdAt: new Date(),
        });

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Test Co',
            email: 'test@example.com',
          },
        });

        expect(mockGenerateApiKey).toHaveBeenCalledWith('om_live');
        expect(response.statusCode).toBe(201);

        const body = JSON.parse(response.body);
        expect(body.data.apiKey).toBe('om_live_generated123');
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 when name is missing', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            email: 'test@example.com',
          },
        });

        expect(response.statusCode).toBe(400);

        const body = JSON.parse(response.body);
        expect(body.error).toBe('Bad Request');
      });

      it('should return 400 when email is missing', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Test Company',
          },
        });

        expect(response.statusCode).toBe(400);
      });

      it('should return 400 when email is invalid', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Test Company',
            email: 'not-an-email',
          },
        });

        expect(response.statusCode).toBe(400);

        const body = JSON.parse(response.body);
        expect(body.error).toBe('Bad Request');
      });

      it('should return 400 when name is empty string', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: '',
            email: 'test@example.com',
          },
        });

        expect(response.statusCode).toBe(400);
      });

      it('should return 400 when name exceeds 255 characters', async () => {
        const longName = 'a'.repeat(256);

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: longName,
            email: 'test@example.com',
          },
        });

        expect(response.statusCode).toBe(400);
      });

      it('should return 400 when tier is invalid', async () => {
        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Test Company',
            email: 'test@example.com',
            tier: 'INVALID_TIER',
          },
        });

        expect(response.statusCode).toBe(400);
      });
    });

    describe('Duplicate Email', () => {
      it('should return 409 when email already exists', async () => {
        const existingCustomer = {
          id: 'cust_existing',
          email: 'existing@example.com',
          name: 'Existing Customer',
        };

        mockCustomerFindUnique.mockResolvedValue(existingCustomer);

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'New Customer',
            email: 'existing@example.com',
          },
        });

        expect(response.statusCode).toBe(409);

        const body = JSON.parse(response.body);
        expect(body.error).toBe('Conflict');
        expect(body.message).toContain('email already exists');
      });

      it('should check email case-insensitively', async () => {
        const existingCustomer = {
          id: 'cust_existing',
          email: 'TEST@example.com',
          name: 'Existing Customer',
        };

        mockCustomerFindUnique.mockResolvedValue(existingCustomer);

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'New Customer',
            email: 'test@example.com', // Different case
          },
        });

        expect(mockCustomerFindUnique).toHaveBeenCalledWith({
          where: { email: 'test@example.com' },
        });

        expect(response.statusCode).toBe(409);
      });
    });

    describe('Error Handling', () => {
      it('should return 500 when database create fails', async () => {
        mockCustomerFindUnique.mockResolvedValue(null);
        mockGenerateApiKey.mockReturnValue('om_live_test');
        mockHashApiKey.mockReturnValue('hashed_test');
        mockCustomerCreate.mockRejectedValue(new Error('Database error'));

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Test Company',
            email: 'test@example.com',
          },
        });

        expect(response.statusCode).toBe(500);

        const body = JSON.parse(response.body);
        expect(body.error).toBe('Internal Server Error');
        expect(body.message).toContain('Failed to register customer');
      });

      it('should return 500 when API key generation fails', async () => {
        mockCustomerFindUnique.mockResolvedValue(null);
        mockGenerateApiKey.mockImplementation(() => {
          throw new Error('Key generation error');
        });

        const response = await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Test Company',
            email: 'test@example.com',
          },
        });

        expect(response.statusCode).toBe(500);
      });
    });

    describe('Database Operations', () => {
      it('should create customer with correct data structure', async () => {
        const expectedApiKeyHash = 'hashed_correct';

        mockCustomerFindUnique.mockResolvedValue(null);
        mockGenerateApiKey.mockReturnValue('om_live_correct');
        mockHashApiKey.mockReturnValue(expectedApiKeyHash);
        mockCustomerCreate.mockResolvedValue({
          id: 'cust_123',
          name: 'Test Co',
          email: 'test@example.com',
          tier: 'GROWTH',
          status: 'ACTIVE',
          apiKeyHash: expectedApiKeyHash,
          createdAt: new Date(),
        });

        await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Test Co',
            email: 'test@example.com',
            tier: 'GROWTH',
          },
        });

        expect(mockCustomerCreate).toHaveBeenCalledWith({
          data: {
            name: 'Test Co',
            email: 'test@example.com',
            tier: 'GROWTH',
            apiKeyHash: expectedApiKeyHash,
            status: 'ACTIVE',
          },
        });
      });

      it('should hash API key before storing', async () => {
        const plainApiKey = 'om_live_plain123';
        const hashedApiKey = 'sha256_hashed_plain123';

        mockCustomerFindUnique.mockResolvedValue(null);
        mockGenerateApiKey.mockReturnValue(plainApiKey);
        mockHashApiKey.mockReturnValue(hashedApiKey);
        mockCustomerCreate.mockResolvedValue({
          id: 'cust_456',
          name: 'Secure Co',
          email: 'secure@example.com',
          tier: 'STARTER',
          status: 'ACTIVE',
          apiKeyHash: hashedApiKey,
          createdAt: new Date(),
        });

        await app.inject({
          method: 'POST',
          url: '/v1/customers/register',
          payload: {
            name: 'Secure Co',
            email: 'secure@example.com',
          },
        });

        expect(mockHashApiKey).toHaveBeenCalledWith(plainApiKey);
        expect(mockCustomerCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              apiKeyHash: hashedApiKey,
            }),
          })
        );
      });
    });
  });
});
