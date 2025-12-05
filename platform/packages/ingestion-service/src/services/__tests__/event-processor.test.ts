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

// Event Processor Tests
import { describe, it, expect, beforeEach, vi } from "vitest";

// Use vi.hoisted() for mock setup
const {
  mockUsageEventCreate,
  mockCreditWalletFindFirst,
  mockCreditWalletUpdate,
  mockCreditTransactionCreate,
  mockTransaction,
  mockCalculateCost,
  mockUuidv4,
  mockXadd,
  mockPipelineExec,
  mockQuit,
} = vi.hoisted(() => ({
  mockUsageEventCreate: vi.fn(),
  mockCreditWalletFindFirst: vi.fn(),
  mockCreditWalletUpdate: vi.fn(),
  mockCreditTransactionCreate: vi.fn(),
  mockTransaction: vi.fn(),
  mockCalculateCost: vi.fn(),
  mockUuidv4: vi.fn(),
  mockXadd: vi.fn(),
  mockPipelineExec: vi.fn(),
  mockQuit: vi.fn(),
}));

// Mock dependencies
vi.mock("@openmonetize/common", () => ({
  getPrismaClient: () => ({
    $transaction: mockTransaction,
    usageEvent: {
      create: mockUsageEventCreate,
    },
    creditWallet: {
      findFirst: mockCreditWalletFindFirst,
      update: mockCreditWalletUpdate,
    },
    creditTransaction: {
      create: mockCreditTransactionCreate,
    },
  }),
}));

vi.mock("../cost-calculator", () => ({
  calculateCost: mockCalculateCost,
}));

// Mock ioredis - the event-processor creates Redis instances directly
// Need a class mock since the code uses `new Redis()`
vi.mock("ioredis", () => {
  const MockRedis = class {
    pipeline() {
      return {
        xadd: mockXadd.mockReturnThis(),
        exec: mockPipelineExec,
      };
    }
    quit() {
      return mockQuit();
    }
  };
  return { default: MockRedis };
});

vi.mock("uuid", () => ({
  v4: mockUuidv4,
}));

vi.mock("../../logger", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../config", () => ({
  config: {
    redisUrl: "redis://localhost:6379",
    streamKey: "test-stream",
  },
}));

// Import after mocking
import { enqueueEvents, processEvent } from "../event-processor";

describe("Event Processor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("enqueueEvents", () => {
    beforeEach(() => {
      mockPipelineExec.mockResolvedValue([]);
      mockQuit.mockResolvedValue("OK");
    });

    it("should enqueue events with batch ID", async () => {
      const batchId = "batch-123";
      mockUuidv4.mockReturnValue(batchId);

      const events = [
        { event_id: "evt-1", customer_id: "cust-1", event_type: "TOKEN_USAGE" },
        { event_id: "evt-2", customer_id: "cust-1", event_type: "API_CALL" },
      ];

      const result = await enqueueEvents(events, "cust-1");

      expect(result).toBe(batchId);
      expect(mockXadd).toHaveBeenCalledTimes(2);
      expect(mockPipelineExec).toHaveBeenCalled();
      expect(mockQuit).toHaveBeenCalled();
    });

    it("should add batch_id and enqueued_at to events", async () => {
      mockUuidv4.mockReturnValue("batch-456");

      const events = [{ event_id: "evt-unique-1", customer_id: "cust-1" }];

      await enqueueEvents(events, "cust-1");

      // Verify xadd was called with the event data including batch_id
      expect(mockXadd).toHaveBeenCalled();
    });

    it("should throw error when pipeline exec fails", async () => {
      mockUuidv4.mockReturnValue("batch-789");
      mockPipelineExec.mockRejectedValue(new Error("Pipeline error"));

      const events = [{ event_id: "evt-1", customer_id: "cust-1" }];

      await expect(enqueueEvents(events, "cust-1")).rejects.toThrow(
        "Pipeline error",
      );
    });
  });

  describe("processEvent", () => {
    describe("Successful Processing", () => {
      it("should process event and burn credits", async () => {
        const mockEvent = {
          event_id: "evt-123",
          customer_id: "cust-123",
          user_id: "user-456",
          event_type: "TOKEN_USAGE",
          feature_id: "ai-chat",
          provider: "OPENAI",
          model: "gpt-4",
          input_tokens: 1000,
          output_tokens: 500,
          timestamp: "2024-11-18T12:00:00Z",
        };

        const mockCost = {
          credits: BigInt(15),
          usd: 0.015,
        };

        const mockWallet = {
          id: "wallet-789",
          customerId: "cust-123",
          balance: BigInt(1000),
        };

        const mockUpdatedWallet = {
          ...mockWallet,
          balance: BigInt(985),
        };

        mockCalculateCost.mockResolvedValue(mockCost);

        // Mock transaction callback
        mockTransaction.mockImplementation(async (callback) => {
          const tx = {
            usageEvent: { create: mockUsageEventCreate },
            creditWallet: {
              findFirst: mockCreditWalletFindFirst,
              update: mockCreditWalletUpdate,
            },
            creditTransaction: { create: mockCreditTransactionCreate },
          };

          mockUsageEventCreate.mockResolvedValue({});
          mockCreditWalletFindFirst.mockResolvedValue(mockWallet);
          mockCreditWalletUpdate.mockResolvedValue(mockUpdatedWallet);
          mockCreditTransactionCreate.mockResolvedValue({});

          return callback(tx);
        });

        await processEvent(mockEvent);

        expect(mockCalculateCost).toHaveBeenCalledWith(mockEvent);
        expect(mockUsageEventCreate).toHaveBeenCalledWith({
          data: expect.objectContaining({
            id: "evt-123",
            customerId: "cust-123",
            userId: "user-456",
            eventType: "TOKEN_USAGE",
            featureId: "ai-chat",
            provider: "OPENAI",
            model: "gpt-4",
            inputTokens: BigInt(1000),
            outputTokens: BigInt(500),
            creditsBurned: BigInt(15),
            costUsd: 0.015,
          }),
        });
      });

      it("should skip credit burn when credits are zero", async () => {
        const mockEvent = {
          event_id: "evt-456",
          customer_id: "cust-456",
          event_type: "FEATURE_ACCESS",
          feature_id: "dashboard",
          timestamp: "2024-11-18T12:00:00Z",
        };

        const mockCost = {
          credits: BigInt(0),
          usd: 0,
        };

        mockCalculateCost.mockResolvedValue(mockCost);

        mockTransaction.mockImplementation(async (callback) => {
          const tx = {
            usageEvent: { create: mockUsageEventCreate },
            creditWallet: {
              findFirst: mockCreditWalletFindFirst,
              update: mockCreditWalletUpdate,
            },
            creditTransaction: { create: mockCreditTransactionCreate },
          };

          mockUsageEventCreate.mockResolvedValue({});

          return callback(tx);
        });

        await processEvent(mockEvent);

        expect(mockUsageEventCreate).toHaveBeenCalled();
        expect(mockCreditWalletFindFirst).not.toHaveBeenCalled();
        expect(mockCreditWalletUpdate).not.toHaveBeenCalled();
        expect(mockCreditTransactionCreate).not.toHaveBeenCalled();
      });
    });

    describe("Credit Wallet Selection", () => {
      it("should prioritize team wallet over user wallet", async () => {
        const mockEvent = {
          event_id: "evt-789",
          customer_id: "cust-789",
          user_id: "user-123",
          team_id: "team-456",
          event_type: "TOKEN_USAGE",
          timestamp: "2024-11-18T12:00:00Z",
        };

        mockCalculateCost.mockResolvedValue({
          credits: BigInt(10),
          usd: 0.01,
        });

        mockTransaction.mockImplementation(async (callback) => {
          const tx = {
            usageEvent: { create: mockUsageEventCreate },
            creditWallet: {
              findFirst: mockCreditWalletFindFirst,
              update: mockCreditWalletUpdate,
            },
            creditTransaction: { create: mockCreditTransactionCreate },
          };

          mockUsageEventCreate.mockResolvedValue({});
          mockCreditWalletFindFirst.mockResolvedValue({
            id: "team-wallet",
            teamId: "team-456",
            balance: BigInt(500),
          });
          mockCreditWalletUpdate.mockResolvedValue({
            id: "team-wallet",
            balance: BigInt(490),
          });
          mockCreditTransactionCreate.mockResolvedValue({});

          return callback(tx);
        });

        await processEvent(mockEvent);

        expect(mockCreditWalletFindFirst).toHaveBeenCalledWith({
          where: {
            customerId: "cust-789",
            teamId: "team-456",
          },
          orderBy: { createdAt: "asc" },
        });
      });

      it("should use user wallet when no team_id", async () => {
        const mockEvent = {
          event_id: "evt-user",
          customer_id: "cust-user",
          user_id: "user-only",
          event_type: "TOKEN_USAGE",
          timestamp: "2024-11-18T12:00:00Z",
        };

        mockCalculateCost.mockResolvedValue({
          credits: BigInt(5),
          usd: 0.005,
        });

        mockTransaction.mockImplementation(async (callback) => {
          const tx = {
            usageEvent: { create: mockUsageEventCreate },
            creditWallet: {
              findFirst: mockCreditWalletFindFirst,
              update: mockCreditWalletUpdate,
            },
            creditTransaction: { create: mockCreditTransactionCreate },
          };

          mockUsageEventCreate.mockResolvedValue({});
          mockCreditWalletFindFirst.mockResolvedValue({
            id: "user-wallet",
            userId: "user-only",
            balance: BigInt(100),
          });
          mockCreditWalletUpdate.mockResolvedValue({
            id: "user-wallet",
            balance: BigInt(95),
          });
          mockCreditTransactionCreate.mockResolvedValue({});

          return callback(tx);
        });

        await processEvent(mockEvent);

        expect(mockCreditWalletFindFirst).toHaveBeenCalledWith({
          where: {
            customerId: "cust-user",
            userId: "user-only",
            teamId: null,
          },
          orderBy: { createdAt: "asc" },
        });
      });

      it("should use customer wallet when no user_id or team_id", async () => {
        const mockEvent = {
          event_id: "evt-customer",
          customer_id: "cust-only",
          event_type: "API_CALL",
          timestamp: "2024-11-18T12:00:00Z",
        };

        mockCalculateCost.mockResolvedValue({
          credits: BigInt(8),
          usd: 0.008,
        });

        mockTransaction.mockImplementation(async (callback) => {
          const tx = {
            usageEvent: { create: mockUsageEventCreate },
            creditWallet: {
              findFirst: mockCreditWalletFindFirst,
              update: mockCreditWalletUpdate,
            },
            creditTransaction: { create: mockCreditTransactionCreate },
          };

          mockUsageEventCreate.mockResolvedValue({});
          mockCreditWalletFindFirst.mockResolvedValue({
            id: "customer-wallet",
            customerId: "cust-only",
            balance: BigInt(5000),
          });
          mockCreditWalletUpdate.mockResolvedValue({
            id: "customer-wallet",
            balance: BigInt(4992),
          });
          mockCreditTransactionCreate.mockResolvedValue({});

          return callback(tx);
        });

        await processEvent(mockEvent);

        expect(mockCreditWalletFindFirst).toHaveBeenCalledWith({
          where: {
            customerId: "cust-only",
            userId: null,
            teamId: null,
          },
          orderBy: { createdAt: "asc" },
        });
      });
    });

    describe("Insufficient Balance", () => {
      it("should log warning but continue processing when balance is insufficient", async () => {
        const mockEvent = {
          event_id: "evt-insufficient",
          customer_id: "cust-low-balance",
          event_type: "TOKEN_USAGE",
          timestamp: "2024-11-18T12:00:00Z",
        };

        mockCalculateCost.mockResolvedValue({
          credits: BigInt(100),
          usd: 0.1,
        });

        mockTransaction.mockImplementation(async (callback) => {
          const tx = {
            usageEvent: { create: mockUsageEventCreate },
            creditWallet: {
              findFirst: mockCreditWalletFindFirst,
              update: mockCreditWalletUpdate,
            },
            creditTransaction: { create: mockCreditTransactionCreate },
          };

          mockUsageEventCreate.mockResolvedValue({});
          mockCreditWalletFindFirst.mockResolvedValue({
            id: "low-wallet",
            balance: BigInt(10), // Less than required
          });
          mockCreditWalletUpdate.mockResolvedValue({
            id: "low-wallet",
            balance: BigInt(-90), // Negative balance allowed
          });
          mockCreditTransactionCreate.mockResolvedValue({});

          return callback(tx);
        });

        await processEvent(mockEvent);

        expect(mockUsageEventCreate).toHaveBeenCalled();
        expect(mockCreditWalletUpdate).toHaveBeenCalled();
        expect(mockCreditTransactionCreate).toHaveBeenCalled();
      });
    });

    describe("Error Handling", () => {
      it("should throw error when cost calculation fails", async () => {
        const mockEvent = {
          event_id: "evt-error",
          customer_id: "cust-error",
          event_type: "TOKEN_USAGE",
          timestamp: "2024-11-18T12:00:00Z",
        };

        mockCalculateCost.mockRejectedValue(
          new Error("Cost calculation failed"),
        );

        await expect(processEvent(mockEvent)).rejects.toThrow(
          "Cost calculation failed",
        );
      });

      it("should throw error when transaction fails", async () => {
        const mockEvent = {
          event_id: "evt-tx-error",
          customer_id: "cust-tx-error",
          event_type: "TOKEN_USAGE",
          timestamp: "2024-11-18T12:00:00Z",
        };

        mockCalculateCost.mockResolvedValue({
          credits: BigInt(10),
          usd: 0.01,
        });

        mockTransaction.mockRejectedValue(new Error("Transaction failed"));

        await expect(processEvent(mockEvent)).rejects.toThrow(
          "Transaction failed",
        );
      });
    });

    describe("Credit Transaction Record", () => {
      it("should create transaction record with correct data", async () => {
        const mockEvent = {
          event_id: "evt-tx-record",
          customer_id: "cust-tx",
          event_type: "TOKEN_USAGE",
          timestamp: "2024-11-18T12:00:00Z",
        };

        const mockWallet = {
          id: "wallet-tx",
          customerId: "cust-tx",
          balance: BigInt(1000),
        };

        const mockUpdatedWallet = {
          id: "wallet-tx",
          balance: BigInt(980),
        };

        mockCalculateCost.mockResolvedValue({
          credits: BigInt(20),
          usd: 0.02,
        });

        mockTransaction.mockImplementation(async (callback) => {
          const tx = {
            usageEvent: { create: mockUsageEventCreate },
            creditWallet: {
              findFirst: mockCreditWalletFindFirst,
              update: mockCreditWalletUpdate,
            },
            creditTransaction: { create: mockCreditTransactionCreate },
          };

          mockUsageEventCreate.mockResolvedValue({});
          mockCreditWalletFindFirst.mockResolvedValue(mockWallet);
          mockCreditWalletUpdate.mockResolvedValue(mockUpdatedWallet);
          mockCreditTransactionCreate.mockResolvedValue({});

          return callback(tx);
        });

        await processEvent(mockEvent);

        expect(mockCreditTransactionCreate).toHaveBeenCalledWith({
          data: {
            walletId: "wallet-tx",
            customerId: "cust-tx",
            transactionType: "BURN",
            amount: BigInt(-20),
            balanceBefore: BigInt(1000),
            balanceAfter: BigInt(980),
            description: "AI usage credit burn",
            metadata: {},
          },
        });
      });
    });
  });
});
