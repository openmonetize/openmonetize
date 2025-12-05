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

// Credits Routes Tests
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// Use vi.hoisted() for mock setup
const {
  mockUserUpsert,
  mockCreditWalletFindFirst,
  mockCreditWalletCreate,
  mockCreditWalletUpdate,
  mockCreditTransactionCreate,
  mockCreditTransactionFindUnique,
  mockTransaction,
} = vi.hoisted(() => ({
  mockUserUpsert: vi.fn(),
  mockCreditWalletFindFirst: vi.fn(),
  mockCreditWalletCreate: vi.fn(),
  mockCreditWalletUpdate: vi.fn(),
  mockCreditTransactionCreate: vi.fn(),
  mockCreditTransactionFindUnique: vi.fn(),
  mockTransaction: vi.fn(),
}));

// Mock dependencies
vi.mock("@openmonetize/common", () => ({
  getPrismaClient: () => ({
    user: {
      upsert: mockUserUpsert,
    },
    creditWallet: {
      findFirst: mockCreditWalletFindFirst,
      create: mockCreditWalletCreate,
      update: mockCreditWalletUpdate,
    },
    creditTransaction: {
      create: mockCreditTransactionCreate,
      findUnique: mockCreditTransactionFindUnique,
    },
    $transaction: mockTransaction,
  }),
}));

vi.mock("../../logger", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../middleware/auth", () => ({
  authenticate: vi.fn().mockImplementation(async (request, _reply) => {
    // Default mock: set customer on request
    request.customer = {
      id: "test-customer-id",
      name: "Test Customer",
      email: "test@example.com",
      tier: "STARTER",
      status: "ACTIVE",
    };
  }),
}));

import Fastify, { FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { creditsRoutes } from "../credits";

describe("Credits Routes", () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();

    // Create fresh Fastify instance
    app = Fastify();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);
    await app.register(creditsRoutes);
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /v1/credits/purchase", () => {
    const validPurchasePayload = {
      userId: "user-123",
      amount: 1000,
      purchasePrice: 10.0,
    };

    describe("User Auto-Creation (upsert)", () => {
      it("should create user if not exists before creating wallet", async () => {
        const mockWallet = {
          id: "wallet-123",
          customerId: "test-customer-id",
          userId: "user-123",
          balance: BigInt(0),
          reservedBalance: BigInt(0),
        };

        mockUserUpsert.mockResolvedValue({
          id: "user-123",
          customerId: "test-customer-id",
          externalUserId: "user-123",
        });
        mockCreditWalletFindFirst.mockResolvedValue(null);
        mockCreditWalletCreate.mockResolvedValue(mockWallet);
        mockTransaction.mockImplementation(async (fn: any) => {
          return fn({
            creditTransaction: { create: mockCreditTransactionCreate },
            creditWallet: { update: mockCreditWalletUpdate },
          });
        });
        mockCreditTransactionCreate.mockResolvedValue({
          id: "tx-123",
        });

        const response = await app.inject({
          method: "POST",
          url: "/v1/credits/purchase",
          payload: validPurchasePayload,
        });

        // Verify user upsert was called with correct parameters
        expect(mockUserUpsert).toHaveBeenCalledWith({
          where: {
            customerId_externalUserId: {
              customerId: "test-customer-id",
              externalUserId: "user-123",
            },
          },
          create: {
            id: "user-123",
            customerId: "test-customer-id",
            externalUserId: "user-123",
          },
          update: {},
        });

        expect(response.statusCode).toBe(200);
      });

      it("should not fail if user already exists (upsert is idempotent)", async () => {
        const mockWallet = {
          id: "wallet-123",
          customerId: "test-customer-id",
          userId: "user-123",
          balance: BigInt(500),
          reservedBalance: BigInt(0),
        };

        // User already exists, upsert returns existing user
        mockUserUpsert.mockResolvedValue({
          id: "user-123",
          customerId: "test-customer-id",
          externalUserId: "user-123",
        });
        mockCreditWalletFindFirst.mockResolvedValue(mockWallet);
        mockTransaction.mockImplementation(async (fn: any) => {
          return fn({
            creditTransaction: { create: mockCreditTransactionCreate },
            creditWallet: { update: mockCreditWalletUpdate },
          });
        });
        mockCreditTransactionCreate.mockResolvedValue({
          id: "tx-456",
        });

        const response = await app.inject({
          method: "POST",
          url: "/v1/credits/purchase",
          payload: validPurchasePayload,
        });

        expect(mockUserUpsert).toHaveBeenCalled();
        expect(response.statusCode).toBe(200);
      });
    });

    describe("Wallet Creation", () => {
      it("should create wallet if not exists after user upsert", async () => {
        mockUserUpsert.mockResolvedValue({
          id: "user-123",
          customerId: "test-customer-id",
          externalUserId: "user-123",
        });
        mockCreditWalletFindFirst.mockResolvedValue(null);
        mockCreditWalletCreate.mockResolvedValue({
          id: "wallet-new",
          customerId: "test-customer-id",
          userId: "user-123",
          balance: BigInt(0),
          reservedBalance: BigInt(0),
        });
        mockTransaction.mockImplementation(async (fn: any) => {
          return fn({
            creditTransaction: { create: mockCreditTransactionCreate },
            creditWallet: { update: mockCreditWalletUpdate },
          });
        });
        mockCreditTransactionCreate.mockResolvedValue({ id: "tx-789" });

        await app.inject({
          method: "POST",
          url: "/v1/credits/purchase",
          payload: validPurchasePayload,
        });

        expect(mockCreditWalletCreate).toHaveBeenCalledWith({
          data: {
            customerId: "test-customer-id",
            userId: "user-123",
            balance: 0,
            reservedBalance: 0,
          },
        });
      });

      it("should use existing wallet if present", async () => {
        const existingWallet = {
          id: "wallet-existing",
          customerId: "test-customer-id",
          userId: "user-123",
          balance: BigInt(1000),
          reservedBalance: BigInt(0),
        };

        mockUserUpsert.mockResolvedValue({
          id: "user-123",
          customerId: "test-customer-id",
          externalUserId: "user-123",
        });
        mockCreditWalletFindFirst.mockResolvedValue(existingWallet);
        mockTransaction.mockImplementation(async (fn: any) => {
          return fn({
            creditTransaction: { create: mockCreditTransactionCreate },
            creditWallet: { update: mockCreditWalletUpdate },
          });
        });
        mockCreditTransactionCreate.mockResolvedValue({ id: "tx-existing" });

        await app.inject({
          method: "POST",
          url: "/v1/credits/purchase",
          payload: validPurchasePayload,
        });

        // Wallet create should not be called since wallet exists
        expect(mockCreditWalletCreate).not.toHaveBeenCalled();
      });
    });

    describe("Error Handling", () => {
      it("should return 500 when user upsert fails", async () => {
        mockUserUpsert.mockRejectedValue(new Error("Database error"));

        const response = await app.inject({
          method: "POST",
          url: "/v1/credits/purchase",
          payload: validPurchasePayload,
        });

        expect(response.statusCode).toBe(500);
        const body = JSON.parse(response.body);
        expect(body.error).toBe("Internal Server Error");
      });
    });
  });

  describe("POST /v1/credits/grant", () => {
    const validGrantPayload = {
      userId: "user-456",
      amount: 500,
      reason: "Promotional credits",
    };

    describe("User Auto-Creation (upsert)", () => {
      it("should create user if not exists when granting to specific user", async () => {
        const mockWallet = {
          id: "wallet-grant",
          customerId: "test-customer-id",
          userId: "user-456",
          balance: BigInt(0),
          reservedBalance: BigInt(0),
        };

        mockUserUpsert.mockResolvedValue({
          id: "user-456",
          customerId: "test-customer-id",
          externalUserId: "user-456",
        });
        mockCreditTransactionFindUnique.mockResolvedValue(null);
        mockCreditWalletFindFirst.mockResolvedValue(null);
        mockCreditWalletCreate.mockResolvedValue(mockWallet);
        mockTransaction.mockImplementation(async (fn: any) => {
          return fn({
            creditTransaction: { create: mockCreditTransactionCreate },
            creditWallet: { update: mockCreditWalletUpdate },
          });
        });
        mockCreditTransactionCreate.mockResolvedValue({
          id: "tx-grant-123",
        });

        const response = await app.inject({
          method: "POST",
          url: "/v1/credits/grant",
          payload: validGrantPayload,
        });

        // Verify user upsert was called
        expect(mockUserUpsert).toHaveBeenCalledWith({
          where: {
            customerId_externalUserId: {
              customerId: "test-customer-id",
              externalUserId: "user-456",
            },
          },
          create: {
            id: "user-456",
            customerId: "test-customer-id",
            externalUserId: "user-456",
          },
          update: {},
        });

        expect(response.statusCode).toBe(200);
      });

      it("should NOT call user upsert when granting to customer-level wallet", async () => {
        const customerGrantPayload = {
          amount: 500,
          reason: "Customer-level grant",
        };

        const mockWallet = {
          id: "wallet-customer",
          customerId: "test-customer-id",
          userId: null,
          teamId: null,
          balance: BigInt(0),
          reservedBalance: BigInt(0),
        };

        mockCreditTransactionFindUnique.mockResolvedValue(null);
        mockCreditWalletFindFirst.mockResolvedValue(null);
        mockCreditWalletCreate.mockResolvedValue(mockWallet);
        mockTransaction.mockImplementation(async (fn: any) => {
          return fn({
            creditTransaction: { create: mockCreditTransactionCreate },
            creditWallet: { update: mockCreditWalletUpdate },
          });
        });
        mockCreditTransactionCreate.mockResolvedValue({
          id: "tx-customer-grant",
        });

        await app.inject({
          method: "POST",
          url: "/v1/credits/grant",
          payload: customerGrantPayload,
        });

        // User upsert should NOT be called for customer-level grants
        expect(mockUserUpsert).not.toHaveBeenCalled();
      });
    });

    describe("Idempotency", () => {
      it("should return existing transaction when idempotency key matches", async () => {
        const existingTransaction = {
          id: "tx-existing",
          walletId: "wallet-existing",
          amount: BigInt(500),
          balanceAfter: BigInt(500),
          wallet: {
            id: "wallet-existing",
            balance: BigInt(500),
          },
        };

        mockCreditTransactionFindUnique.mockResolvedValue(existingTransaction);

        const response = await app.inject({
          method: "POST",
          url: "/v1/credits/grant",
          payload: {
            ...validGrantPayload,
            idempotencyKey: "unique-key-123",
          },
        });

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.data.transactionId).toBe("tx-existing");

        // Should not call user upsert or wallet operations
        expect(mockUserUpsert).not.toHaveBeenCalled();
        expect(mockCreditWalletCreate).not.toHaveBeenCalled();
      });
    });
  });

  describe("GET /v1/credits/balance", () => {
    it("should return balance for authenticated customer", async () => {
      const mockWallet = {
        id: "wallet-balance",
        customerId: "test-customer-id",
        userId: null,
        teamId: null,
        balance: BigInt(5000),
        reservedBalance: BigInt(500),
        currency: "USD",
      };

      mockCreditWalletFindFirst.mockResolvedValue(mockWallet);

      const response = await app.inject({
        method: "GET",
        url: "/v1/credits/balance",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.data).toEqual({
        balance: "5000",
        reservedBalance: "500",
        availableBalance: "4500",
        currency: "USD",
      });
    });

    it("should return zero balance when no wallet exists", async () => {
      mockCreditWalletFindFirst.mockResolvedValue(null);

      const response = await app.inject({
        method: "GET",
        url: "/v1/credits/balance",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.data).toEqual({
        balance: "0",
        reservedBalance: "0",
        availableBalance: "0",
        currency: "USD",
      });
    });
  });
});
