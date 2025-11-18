// Cost Calculator Service Tests

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Use vi.hoisted() to ensure these are available during mock initialization
const { mockProviderCostFindFirst, mockBurnTableFindFirst } = vi.hoisted(() => ({
  mockProviderCostFindFirst: vi.fn(),
  mockBurnTableFindFirst: vi.fn()
}));

// Mock Prisma client with hoisted functions
vi.mock('@openmonetize/common', () => ({
  getPrismaClient: () => ({
    providerCost: {
      findFirst: mockProviderCostFindFirst
    },
    burnTable: {
      findFirst: mockBurnTableFindFirst
    }
  }),
  ProviderName: {
    OPENAI: 'OPENAI',
    ANTHROPIC: 'ANTHROPIC',
    GOOGLE: 'GOOGLE'
  }
}));

// Import AFTER mock setup
import { CostCalculatorService } from '../services/cost-calculator';

describe('CostCalculatorService', () => {
  let service: CostCalculatorService;

  beforeEach(() => {
    service = new CostCalculatorService();
    vi.clearAllMocks();
  });

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

      // Mock no custom burn table
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
      expect(results[0].credits).toBeGreaterThan(0);
      expect(results[1].credits).toBeGreaterThan(0);
      // Second calculation should have roughly 2x the credits of first
      expect(results[1].credits).toBeGreaterThanOrEqual(results[0].credits);
    });
  });
});
