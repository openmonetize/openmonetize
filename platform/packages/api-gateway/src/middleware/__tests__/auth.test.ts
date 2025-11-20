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

// Authentication Middleware Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FastifyReply } from 'fastify';

// Use vi.hoisted() to ensure mocks are available during initialization
const { mockCustomerFindFirst, mockHashApiKey } = vi.hoisted(() => ({
  mockCustomerFindFirst: vi.fn(),
  mockHashApiKey: vi.fn(),
}));

// Mock dependencies
vi.mock('@openmonetize/common', () => ({
  getPrismaClient: () => ({
    customer: {
      findFirst: mockCustomerFindFirst,
    },
  }),
  hashApiKey: mockHashApiKey,
}));

vi.mock('../../logger', () => ({
  logger: {
    warn: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
  },
}));

// Import after mocking
import { authenticate, AuthenticatedRequest } from '../auth';

describe('Authentication Middleware', () => {
  let mockRequest: Partial<AuthenticatedRequest>;
  let mockReply: Partial<FastifyReply>;
  let statusFn: ReturnType<typeof vi.fn>;
  let sendFn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Setup reply mock
    sendFn = vi.fn();
    statusFn = vi.fn().mockReturnValue({ send: sendFn });
    mockReply = {
      status: statusFn,
    } as any;

    // Setup request mock
    mockRequest = {
      headers: {},
    };
  });

  describe('API Key Extraction', () => {
    it('should extract API key from Authorization Bearer header', async () => {
      mockRequest.headers = {
        authorization: 'Bearer om_live_test123',
      };

      mockHashApiKey.mockReturnValue('hashed_key');
      mockCustomerFindFirst.mockResolvedValue({
        id: 'customer-1',
        name: 'Test Customer',
        tier: 'STARTER',
      });

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(mockHashApiKey).toHaveBeenCalledWith('om_live_test123');
      expect(mockRequest.customer).toEqual({
        id: 'customer-1',
        name: 'Test Customer',
        tier: 'STARTER',
      });
    });

    it('should extract API key from X-API-Key header', async () => {
      mockRequest.headers = {
        'x-api-key': 'om_live_test456',
      };

      mockHashApiKey.mockReturnValue('hashed_key');
      mockCustomerFindFirst.mockResolvedValue({
        id: 'customer-2',
        name: 'Another Customer',
        tier: 'GROWTH',
      });

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(mockHashApiKey).toHaveBeenCalledWith('om_live_test456');
      expect(mockRequest.customer).toEqual({
        id: 'customer-2',
        name: 'Another Customer',
        tier: 'GROWTH',
      });
    });

    it('should prefer Authorization header over X-API-Key', async () => {
      mockRequest.headers = {
        authorization: 'Bearer om_live_priority',
        'x-api-key': 'om_live_fallback',
      };

      mockHashApiKey.mockReturnValue('hashed_priority');
      mockCustomerFindFirst.mockResolvedValue({
        id: 'customer-3',
        name: 'Priority Customer',
        tier: 'ENTERPRISE',
      });

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(mockHashApiKey).toHaveBeenCalledWith('om_live_priority');
    });
  });

  describe('Missing API Key', () => {
    it('should return 401 when no API key provided', async () => {
      mockRequest.headers = {};

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(statusFn).toHaveBeenCalledWith(401);
      expect(sendFn).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Missing API key. Provide via Authorization: Bearer or X-API-Key header',
      });
    });

    it('should return 401 when Authorization header is malformed', async () => {
      mockRequest.headers = {
        authorization: 'Basic some-other-auth',
      };

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(statusFn).toHaveBeenCalledWith(401);
      expect(sendFn).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Missing API key. Provide via Authorization: Bearer or X-API-Key header',
      });
    });
  });

  describe('Invalid API Key', () => {
    it('should return 401 when API key is not found', async () => {
      mockRequest.headers = {
        'x-api-key': 'om_live_invalid',
      };

      mockHashApiKey.mockReturnValue('invalid_hash');
      mockCustomerFindFirst.mockResolvedValue(null);

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(statusFn).toHaveBeenCalledWith(401);
      expect(sendFn).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid or missing API key',
      });
    });

    it('should return 401 when customer is inactive', async () => {
      mockRequest.headers = {
        'x-api-key': 'om_live_inactive',
      };

      mockHashApiKey.mockReturnValue('inactive_hash');
      mockCustomerFindFirst.mockResolvedValue(null); // Query filters by status: ACTIVE

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(mockCustomerFindFirst).toHaveBeenCalledWith({
        where: {
          apiKeyHash: 'inactive_hash',
          status: 'ACTIVE',
        },
        select: {
          id: true,
          name: true,
          tier: true,
        },
      });

      expect(statusFn).toHaveBeenCalledWith(401);
      expect(sendFn).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid or missing API key',
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 500 when database query fails', async () => {
      mockRequest.headers = {
        'x-api-key': 'om_live_test',
      };

      mockHashApiKey.mockReturnValue('hashed_key');
      mockCustomerFindFirst.mockRejectedValue(new Error('Database error'));

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(statusFn).toHaveBeenCalledWith(500);
      expect(sendFn).toHaveBeenCalledWith({
        error: 'Internal Server Error',
        message: 'Authentication failed',
      });
    });

    it('should return 500 when hashing fails', async () => {
      mockRequest.headers = {
        'x-api-key': 'om_live_test',
      };

      mockHashApiKey.mockImplementation(() => {
        throw new Error('Hash error');
      });

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(statusFn).toHaveBeenCalledWith(500);
      expect(sendFn).toHaveBeenCalledWith({
        error: 'Internal Server Error',
        message: 'Authentication failed',
      });
    });
  });

  describe('Successful Authentication', () => {
    it('should attach customer to request on successful auth', async () => {
      const mockCustomer = {
        id: 'cust_123',
        name: 'Acme Corp',
        tier: 'ENTERPRISE',
      };

      mockRequest.headers = {
        'x-api-key': 'om_live_valid',
      };

      mockHashApiKey.mockReturnValue('valid_hash');
      mockCustomerFindFirst.mockResolvedValue(mockCustomer);

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(mockRequest.customer).toEqual(mockCustomer);
      expect(statusFn).not.toHaveBeenCalled();
      expect(sendFn).not.toHaveBeenCalled();
    });

    it('should query database with correct parameters', async () => {
      mockRequest.headers = {
        authorization: 'Bearer om_live_test',
      };

      mockHashApiKey.mockReturnValue('test_hash');
      mockCustomerFindFirst.mockResolvedValue({
        id: 'cust_456',
        name: 'Test Inc',
        tier: 'GROWTH',
      });

      await authenticate(
        mockRequest as AuthenticatedRequest,
        mockReply as FastifyReply
      );

      expect(mockCustomerFindFirst).toHaveBeenCalledWith({
        where: {
          apiKeyHash: 'test_hash',
          status: 'ACTIVE',
        },
        select: {
          id: true,
          name: true,
          tier: true,
        },
      });
    });
  });
});
