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

// Burn Table Service Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Use vi.hoisted() for mock setup
const {
  mockBurnTableFindMany,
  mockBurnTableFindUnique,
  mockBurnTableFindFirst,
  mockBurnTableCreate,
  mockBurnTableUpdate,
  mockBurnTableUpdateMany,
  mockTransaction,
} = vi.hoisted(() => ({
  mockBurnTableFindMany: vi.fn(),
  mockBurnTableFindUnique: vi.fn(),
  mockBurnTableFindFirst: vi.fn(),
  mockBurnTableCreate: vi.fn(),
  mockBurnTableUpdate: vi.fn(),
  mockBurnTableUpdateMany: vi.fn(),
  mockTransaction: vi.fn(),
}));

// Mock dependencies
vi.mock('@openmonetize/common', () => ({
  getPrismaClient: () => ({
    burnTable: {
      findMany: mockBurnTableFindMany,
      findUnique: mockBurnTableFindUnique,
      findFirst: mockBurnTableFindFirst,
      create: mockBurnTableCreate,
      update: mockBurnTableUpdate,
      updateMany: mockBurnTableUpdateMany,
    },
    $transaction: mockTransaction,
  }),
}));

vi.mock('../../logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
  },
}));

// Import after mocking
import { BurnTableService } from '../burn-table';

describe('BurnTableService', () => {
  let service: BurnTableService;

  beforeEach(() => {
    service = new BurnTableService();
    // Reset mocks completely (clears implementation and call history)
    mockBurnTableFindMany.mockReset();
    mockBurnTableFindUnique.mockReset();
    mockBurnTableFindFirst.mockReset();
    mockBurnTableCreate.mockReset();
    mockBurnTableUpdate.mockReset();
    mockBurnTableUpdateMany.mockReset();
    mockTransaction.mockReset();
  });

  describe('list', () => {
    it('should list all burn tables', async () => {
      const mockBurnTables = [
        {
          id: 'bt-1',
          name: 'Default Pricing',
          customerId: null,
          version: 1,
          isActive: true,
          rules: { 'gpt-4': { input_tokens: 5, output_tokens: 10, per_unit: 1000 } },
          customer: null,
        },
        {
          id: 'bt-2',
          name: 'Custom Pricing',
          customerId: 'cust-123',
          version: 1,
          isActive: true,
          rules: { 'gpt-4': { input_tokens: 3, output_tokens: 8, per_unit: 1000 } },
          customer: { id: 'cust-123', name: 'Acme Corp' },
        },
      ];

      mockBurnTableFindMany.mockResolvedValue(mockBurnTables);

      const result = await service.list();

      expect(result).toEqual(mockBurnTables);
      expect(mockBurnTableFindMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: [{ customerId: 'asc' }, { version: 'desc' }],
        include: {
          customer: {
            select: { id: true, name: true },
          },
        },
      });
    });

    it('should filter by customerId', async () => {
      mockBurnTableFindMany.mockResolvedValue([]);

      await service.list({ customerId: 'cust-456' });

      expect(mockBurnTableFindMany).toHaveBeenCalledWith({
        where: { customerId: 'cust-456' },
        orderBy: [{ customerId: 'asc' }, { version: 'desc' }],
        include: {
          customer: {
            select: { id: true, name: true },
          },
        },
      });
    });

    it('should filter by isActive', async () => {
      mockBurnTableFindMany.mockResolvedValue([]);

      await service.list({ isActive: true });

      expect(mockBurnTableFindMany).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: [{ customerId: 'asc' }, { version: 'desc' }],
        include: {
          customer: {
            select: { id: true, name: true },
          },
        },
      });
    });
  });

  describe('getById', () => {
    it('should get burn table by ID', async () => {
      const mockBurnTable = {
        id: 'bt-123',
        name: 'Enterprise Pricing',
        customerId: 'cust-ent',
        version: 2,
        isActive: true,
        rules: { 'gpt-4': { input_tokens: 2, output_tokens: 5, per_unit: 1000 } },
        customer: { id: 'cust-ent', name: 'Enterprise Inc' },
      };

      mockBurnTableFindUnique.mockResolvedValue(mockBurnTable);

      const result = await service.getById('bt-123');

      expect(result).toEqual(mockBurnTable);
      expect(mockBurnTableFindUnique).toHaveBeenCalledWith({
        where: { id: 'bt-123' },
        include: {
          customer: {
            select: { id: true, name: true },
          },
        },
      });
    });

    it('should throw error when burn table not found', async () => {
      mockBurnTableFindUnique.mockResolvedValue(null);

      await expect(service.getById('bt-nonexistent')).rejects.toThrow(
        'Burn table not found: bt-nonexistent'
      );
    });
  });

  describe('getActiveForCustomer', () => {
    it('should return customer-specific burn table when available', async () => {
      const mockCustomerBurnTable = {
        id: 'bt-custom',
        customerId: 'cust-123',
        version: 3,
        isActive: true,
        rules: { 'gpt-4': { input_tokens: 1, output_tokens: 3, per_unit: 1000 } },
      };

      mockBurnTableFindFirst
        .mockResolvedValueOnce(mockCustomerBurnTable) // First call for customer-specific
        .mockResolvedValueOnce(null); // Second call (not reached)

      const result = await service.getActiveForCustomer('cust-123');

      expect(result).toEqual(mockCustomerBurnTable);
      expect(mockBurnTableFindFirst).toHaveBeenCalledTimes(1);
      expect(mockBurnTableFindFirst).toHaveBeenCalledWith({
        where: { customerId: 'cust-123', isActive: true },
        orderBy: { version: 'desc' },
      });
    });

    it('should fall back to default burn table when no customer-specific table exists', async () => {
      const mockDefaultBurnTable = {
        id: 'bt-default',
        customerId: null,
        version: 1,
        isActive: true,
        rules: { 'gpt-4': { input_tokens: 5, output_tokens: 10, per_unit: 1000 } },
      };

      mockBurnTableFindFirst
        .mockResolvedValueOnce(null) // Customer-specific not found
        .mockResolvedValueOnce(mockDefaultBurnTable); // Default found

      const result = await service.getActiveForCustomer('cust-456');

      expect(result).toEqual(mockDefaultBurnTable);
      expect(mockBurnTableFindFirst).toHaveBeenCalledTimes(2);
      expect(mockBurnTableFindFirst).toHaveBeenNthCalledWith(2, {
        where: { customerId: null, isActive: true },
        orderBy: { version: 'desc' },
      });
    });

    it('should return null when no burn table exists', async () => {
      mockBurnTableFindFirst
        .mockResolvedValueOnce(null) // Customer-specific not found
        .mockResolvedValueOnce(null); // Default also not found

      const result = await service.getActiveForCustomer('cust-789');

      expect(result).toBeNull();
      expect(mockBurnTableFindFirst).toHaveBeenCalledTimes(2);
    });
  });

  describe('create', () => {
    it('should create new burn table with version 1', async () => {
      const input = {
        customerId: 'cust-new',
        name: 'New Pricing',
        rules: { 'gpt-4': { input_tokens: 4, output_tokens: 9, per_unit: 1000 } },
      };

      const mockCreatedBurnTable = {
        id: 'bt-new',
        ...input,
        version: 1,
        isActive: true,
        validFrom: expect.any(Date),
        validUntil: null,
        customer: { id: 'cust-new', name: 'New Customer' },
      };

      mockBurnTableFindFirst.mockResolvedValue(null); // No previous version

      mockTransaction.mockImplementation(async (callback) => {
        const tx = {
          burnTable: {
            updateMany: mockBurnTableUpdateMany,
            create: mockBurnTableCreate,
          },
        };

        mockBurnTableUpdateMany.mockResolvedValue({ count: 0 });
        mockBurnTableCreate.mockResolvedValue(mockCreatedBurnTable);

        return callback(tx);
      });

      const result = await service.create(input);

      expect(result).toEqual(mockCreatedBurnTable);
      expect(mockBurnTableCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          customerId: 'cust-new',
          name: 'New Pricing',
          version: 1,
          rules: input.rules,
          isActive: true,
        }),
        include: {
          customer: {
            select: { id: true, name: true },
          },
        },
      });
    });

    it('should increment version number', async () => {
      const input = {
        customerId: 'cust-existing',
        name: 'Updated Pricing',
        rules: { 'gpt-4': { input_tokens: 2, output_tokens: 6, per_unit: 1000 } },
      };

      mockBurnTableFindFirst.mockResolvedValue({ version: 5 }); // Existing version 5

      mockTransaction.mockImplementation(async (callback) => {
        const tx = {
          burnTable: {
            updateMany: mockBurnTableUpdateMany,
            create: mockBurnTableCreate,
          },
        };

        mockBurnTableUpdateMany.mockResolvedValue({ count: 1 });
        mockBurnTableCreate.mockResolvedValue({
          id: 'bt-v6',
          ...input,
          version: 6,
          isActive: true,
        });

        return callback(tx);
      });

      await service.create(input);

      expect(mockBurnTableCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          version: 6,
        }),
        include: expect.any(Object),
      });
    });

    it('should deactivate previous active burn tables', async () => {
      const input = {
        customerId: 'cust-123',
        name: 'New Active Pricing',
        rules: { 'gpt-4': { input_tokens: 3, output_tokens: 7, per_unit: 1000 } },
      };

      mockBurnTableFindFirst.mockResolvedValue({ version: 2 });

      mockTransaction.mockImplementation(async (callback) => {
        const tx = {
          burnTable: {
            updateMany: mockBurnTableUpdateMany,
            create: mockBurnTableCreate,
          },
        };

        mockBurnTableUpdateMany.mockResolvedValue({ count: 1 });
        mockBurnTableCreate.mockResolvedValue({
          id: 'bt-new',
          version: 3,
        });

        return callback(tx);
      });

      await service.create(input);

      expect(mockBurnTableUpdateMany).toHaveBeenCalledWith({
        where: {
          customerId: 'cust-123',
          isActive: true,
        },
        data: {
          isActive: false,
          validUntil: expect.any(Date),
        },
      });
    });

    it('should handle default burn table creation (null customerId)', async () => {
      const input = {
        name: 'Default Pricing',
        rules: { 'gpt-4': { input_tokens: 5, output_tokens: 10, per_unit: 1000 } },
      };

      mockBurnTableFindFirst.mockResolvedValue(null);

      mockTransaction.mockImplementation(async (callback) => {
        const tx = {
          burnTable: {
            updateMany: mockBurnTableUpdateMany,
            create: mockBurnTableCreate,
          },
        };

        mockBurnTableUpdateMany.mockResolvedValue({ count: 0 });
        mockBurnTableCreate.mockResolvedValue({
          id: 'bt-default',
          customerId: null,
          version: 1,
        });

        return callback(tx);
      });

      await service.create(input);

      expect(mockBurnTableFindFirst).toHaveBeenCalledWith({
        where: { customerId: null },
        orderBy: { version: 'desc' },
        select: { version: true },
      });
    });
  });

  describe('update', () => {
    it('should update burn table', async () => {
      const updateInput = {
        name: 'Updated Name',
        rules: { 'gpt-4': { input_tokens: 6, output_tokens: 12, per_unit: 1000 } },
      };

      const mockUpdatedBurnTable = {
        id: 'bt-update',
        ...updateInput,
        version: 2,
        customer: { id: 'cust-123', name: 'Test Customer' },
      };

      mockBurnTableUpdate.mockResolvedValue(mockUpdatedBurnTable);

      const result = await service.update('bt-update', updateInput);

      expect(result).toEqual(mockUpdatedBurnTable);
      expect(mockBurnTableUpdate).toHaveBeenCalledWith({
        where: { id: 'bt-update' },
        data: updateInput,
        include: {
          customer: {
            select: { id: true, name: true },
          },
        },
      });
    });
  });

  describe('deactivate', () => {
    it('should deactivate burn table', async () => {
      const mockDeactivatedBurnTable = {
        id: 'bt-deactivate',
        isActive: false,
        validUntil: expect.any(Date),
      };

      mockBurnTableUpdate.mockResolvedValue(mockDeactivatedBurnTable);

      const result = await service.deactivate('bt-deactivate');

      expect(result).toEqual(mockDeactivatedBurnTable);
      expect(mockBurnTableUpdate).toHaveBeenCalledWith({
        where: { id: 'bt-deactivate' },
        data: {
          isActive: false,
          validUntil: expect.any(Date),
        },
      });
    });
  });

  describe('validateRules', () => {
    it('should validate correct token-based rules', () => {
      const validRules = {
        'gpt-4': {
          input_tokens: 5,
          output_tokens: 10,
          per_unit: 1000,
        },
      };

      const result = service.validateRules(validRules);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate correct flat-rate rules', () => {
      const validRules = {
        'api-call': {
          flat_rate: 1,
          per_unit: 1,
        },
      };

      const result = service.validateRules(validRules);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject non-object rules', () => {
      const result = service.validateRules(null as any);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Rules must be an object');
    });

    it('should reject missing per_unit field', () => {
      const invalidRules = {
        'gpt-4': {
          input_tokens: 5,
          output_tokens: 10,
          // Missing per_unit
        },
      };

      const result = service.validateRules(invalidRules);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Rules for model "gpt-4" missing "per_unit" field');
    });

    it('should reject invalid input_tokens type', () => {
      const invalidRules = {
        'gpt-4': {
          input_tokens: 'not-a-number',
          output_tokens: 10,
          per_unit: 1000,
        },
      };

      const result = service.validateRules(invalidRules);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Rules for model "gpt-4" has invalid "input_tokens"');
    });

    it('should reject invalid output_tokens type', () => {
      const invalidRules = {
        'gpt-4': {
          input_tokens: 5,
          output_tokens: 'not-a-number',
          per_unit: 1000,
        },
      };

      const result = service.validateRules(invalidRules);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Rules for model "gpt-4" has invalid "output_tokens"');
    });

    it('should reject invalid flat_rate type', () => {
      const invalidRules = {
        'api-call': {
          flat_rate: 'not-a-number',
          per_unit: 1,
        },
      };

      const result = service.validateRules(invalidRules);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Rules for model "api-call" has invalid "flat_rate"');
    });

    it('should validate multiple models', () => {
      const rules = {
        'gpt-4': {
          input_tokens: 5,
          output_tokens: 10,
          per_unit: 1000,
        },
        'gpt-3.5-turbo': {
          input_tokens: 1,
          output_tokens: 2,
          per_unit: 1000,
        },
      };

      const result = service.validateRules(rules);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should collect multiple errors', () => {
      const invalidRules = {
        'gpt-4': {
          // Missing per_unit
          input_tokens: 'invalid',
          output_tokens: 'also-invalid',
        },
      };

      const result = service.validateRules(invalidRules);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});
