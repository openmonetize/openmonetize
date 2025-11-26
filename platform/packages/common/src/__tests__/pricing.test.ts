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

// Pricing Service Tests
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Use vi.hoisted() for mock setup
const {
  mockBurnTableFindMany,
  mockBurnTableFindUnique,
  mockBurnTableFindFirst,
  mockBurnTableCreate,
  mockBurnTableUpdate,
  mockBurnTableUpdateMany,
  mockProviderCostFindFirst,
  mockTransaction,
} = vi.hoisted(() => ({
  mockBurnTableFindMany: vi.fn(),
  mockBurnTableFindUnique: vi.fn(),
  mockBurnTableFindFirst: vi.fn(),
  mockBurnTableCreate: vi.fn(),
  mockBurnTableUpdate: vi.fn(),
  mockBurnTableUpdateMany: vi.fn(),
  mockProviderCostFindFirst: vi.fn(),
  mockTransaction: vi.fn(),
}));

// Mock dependencies
vi.mock('../database', () => ({
  getPrismaClient: () => ({
    burnTable: {
      findMany: mockBurnTableFindMany,
      findUnique: mockBurnTableFindUnique,
      findFirst: mockBurnTableFindFirst,
      create: mockBurnTableCreate,
      update: mockBurnTableUpdate,
      updateMany: mockBurnTableUpdateMany,
    },
    providerCost: {
      findFirst: mockProviderCostFindFirst,
    },
    $transaction: mockTransaction,
  }),
  ProviderName: {
    OPENAI: 'OPENAI',
    ANTHROPIC: 'ANTHROPIC',
    GOOGLE: 'GOOGLE'
  }
}));

// Import after mocking
import { PricingService } from '../services/pricing';

describe('PricingService', () => {
  let service: PricingService;

  beforeEach(() => {
    service = new PricingService();
    // Reset mocks completely (clears implementation and call history)
    vi.resetAllMocks();
  });

  describe('Burn Table Management', () => {
    describe('listBurnTables', () => {
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

        const result = await service.listBurnTables();

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

        await service.listBurnTables({ customerId: 'cust-456' });

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

        await service.listBurnTables({ isActive: true });

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

    describe('getBurnTableById', () => {
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

        const result = await service.getBurnTableById('bt-123');

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

        await expect(service.getBurnTableById('bt-nonexistent')).rejects.toThrow(
          'Burn table not found: bt-nonexistent'
        );
      });
    });

    describe('getActiveBurnTable', () => {
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

        const result = await service.getActiveBurnTable('cust-123');

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

        const result = await service.getActiveBurnTable('cust-456');

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

        const result = await service.getActiveBurnTable('cust-789');

        expect(result).toBeNull();
        expect(mockBurnTableFindFirst).toHaveBeenCalledTimes(2);
      });
    });

    describe('createBurnTable', () => {
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

        const result = await service.createBurnTable(input);

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

        await service.createBurnTable(input);

        expect(mockBurnTableCreate).toHaveBeenCalledWith({
          data: expect.objectContaining({
            version: 6,
          }),
          include: {
            customer: {
              select: { id: true, name: true },
            },
          },
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

        await service.createBurnTable(input);

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

        await service.createBurnTable(input);

        expect(mockBurnTableFindFirst).toHaveBeenCalledWith({
          where: { customerId: null },
          orderBy: { version: 'desc' },
          select: { version: true },
        });
      });
    });

    describe('updateBurnTable', () => {
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

        const result = await service.updateBurnTable('bt-update', updateInput);

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

    describe('deactivateBurnTable', () => {
      it('should deactivate burn table', async () => {
        const mockDeactivatedBurnTable = {
          id: 'bt-deactivate',
          isActive: false,
          validUntil: expect.any(Date),
        };

        mockBurnTableUpdate.mockResolvedValue(mockDeactivatedBurnTable);

        const result = await service.deactivateBurnTable('bt-deactivate');

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
    });
  });

  describe('Cost Calculation', () => {
    describe('calculateCost', () => {
      it('should calculate cost for GPT-4o correctly', async () => {
        // Mock provider costs
        mockProviderCostFindFirst
          .mockResolvedValueOnce({
            // Input cost
            costPerUnit: 2.5,
            unitSize: 1000000,
            costType: 'INPUT_TOKEN'
          })
          .mockResolvedValueOnce({
            // Output cost
            costPerUnit: 10.0,
            unitSize: 1000000,
            costType: 'OUTPUT_TOKEN'
          });

        // Mock no custom burn table (first call to findFirst in getActiveBurnTable)
        mockBurnTableFindFirst.mockResolvedValue(null);
        // Mock no default burn table (second call to findFirst in getActiveBurnTable)
        mockBurnTableFindFirst.mockResolvedValue(null);

        const result = await service.calculateCost({
          customerId: 'test-customer',
          provider: 'OPENAI',
          model: 'gpt-4o',
          inputTokens: 1000,
          outputTokens: 500
        });

        expect(result.providerCostUsd).toBe(0.0075);
        expect(result.credits).toBeGreaterThan(0);
        expect(result.pricingSource).toBe('default');
        expect(result.costBreakdown.input.tokens).toBe(1000);
        expect(result.costBreakdown.output.tokens).toBe(500);
      });

      it('should apply customer burn table when available', async () => {
        // Mock provider costs
        mockProviderCostFindFirst
          .mockResolvedValueOnce({
            costPerUnit: 2.5,
            unitSize: 1000000
          })
          .mockResolvedValueOnce({
            costPerUnit: 10.0,
            unitSize: 1000000
          });

        // Mock custom burn table
        mockBurnTableFindFirst.mockResolvedValue({
          customerId: 'test-customer',
          rules: {
            'gpt-4o': {
              input_tokens: 5,
              output_tokens: 10,
              per_unit: 1000
            }
          }
        });

        const result = await service.calculateCost({
          customerId: 'test-customer',
          provider: 'OPENAI',
          model: 'gpt-4o',
          inputTokens: 1000,
          outputTokens: 500
        });

        expect(result.pricingSource).toBe('customer_burn_table');
        expect(result.credits).toBe(10); // (1000/1000)*5 + (500/1000)*10 = 5 + 5 = 10
      });

      it('should throw error when provider costs not found', async () => {
        // Mock missing provider costs
        mockProviderCostFindFirst
          .mockResolvedValueOnce(null)
          .mockResolvedValueOnce(null);

        await expect(
          service.calculateCost({
            customerId: 'test-customer',
            provider: 'OPENAI',
            model: 'invalid-model',
            inputTokens: 1000,
            outputTokens: 500
          })
        ).rejects.toThrow('No cost data found');
      });

      it('should handle zero tokens', async () => {
        // Mock provider costs
        mockProviderCostFindFirst
          .mockResolvedValueOnce({
            costPerUnit: 2.5,
            unitSize: 1000000
          })
          .mockResolvedValueOnce({
            costPerUnit: 10.0,
            unitSize: 1000000
          });

        mockBurnTableFindFirst.mockResolvedValue(null);

        const result = await service.calculateCost({
          customerId: 'test-customer',
          provider: 'OPENAI',
          model: 'gpt-4o',
          inputTokens: 0,
          outputTokens: 0
        });

        expect(result.providerCostUsd).toBe(0);
        expect(result.credits).toBe(0);
      });
    });

    describe('calculateBulk', () => {
      it('should calculate costs for multiple requests', async () => {
        // Mock provider costs
        mockProviderCostFindFirst.mockResolvedValue({
          costPerUnit: 2.5,
          unitSize: 1000000
        });

        mockBurnTableFindFirst.mockResolvedValue(null);

        const results = await service.calculateBulk('test-customer', [
          {
            provider: 'OPENAI',
            model: 'gpt-4o',
            inputTokens: 1000,
            outputTokens: 500
          },
          {
            provider: 'OPENAI',
            model: 'gpt-4o',
            inputTokens: 2000,
            outputTokens: 1000
          }
        ]);

        expect(results).toHaveLength(2);
        expect(results[0]).toBeDefined();
        expect(results[1]).toBeDefined();
        expect(results[0]!.credits).toBeGreaterThan(0);
        expect(results[1]!.credits).toBeGreaterThan(0);
        // Second calculation should have roughly 2x the credits of first
        expect(results[1]!.credits).toBeGreaterThanOrEqual(results[0]!.credits);
      });
    });
  });
});
