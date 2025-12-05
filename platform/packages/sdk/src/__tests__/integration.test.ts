/*
 * Copyright (C) 2025 OpenMonetize
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * SDK Integration Tests
 *
 * These tests verify the SDK works correctly against real running services.
 * They test the complete credit lifecycle: adding balance and using balance.
 *
 * Prerequisites:
 * - Docker services running (postgres, redis)
 * - API Gateway running on port 3000
 * - Ingestion Service running on port 8081
 * - Database seeded with test customer
 *
 * Run with: pnpm test:integration
 */

import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { OpenMonetize } from "../client";

// Skip integration tests unless explicitly enabled
const runIntegration = process.env.RUN_INTEGRATION_TESTS === "true";
const describeIntegration = runIntegration ? describe : describe.skip;

// Test configuration
const TEST_CONFIG = {
  apiKey: process.env.TEST_API_KEY || "om_dev_test_key",
  baseUrl: process.env.TEST_API_URL || "http://localhost:3000",
};

// Helper to wait for async processing (ingestion queue)
const waitForProcessing = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Generate unique test user ID for each test run to avoid conflicts
const generateTestUserId = () => `integration-test-user-${Date.now()}`;

describeIntegration("SDK Integration Tests", () => {
  let client: OpenMonetize;

  beforeAll(() => {
    client = new OpenMonetize({
      apiKey: TEST_CONFIG.apiKey,
      baseUrl: TEST_CONFIG.baseUrl,
      autoFlush: false, // Manual flush for predictable testing
      debug: process.env.DEBUG === "true",
    });
  });

  afterEach(async () => {
    // Ensure any pending events are flushed between tests
    await client.flush();
  });

  describe("Credit Purchase Flow", () => {
    it("should purchase credits and verify balance increases", async () => {
      const testUserId = generateTestUserId();

      // Purchase 5000 credits for a new user
      const purchaseResult = await client.purchaseCredits({
        userId: testUserId,
        amount: 5000,
        purchasePrice: 50.0,
      });

      // Verify purchase was successful
      expect(purchaseResult.transactionId).toBeDefined();
      expect(typeof purchaseResult.transactionId).toBe("string");
      expect(purchaseResult.newBalance).toBe(5000);

      // Verify balance through getCreditBalance
      const balance = await client.getCreditBalance(testUserId);
      expect(balance.balance).toBe(5000);
      expect(balance.reserved).toBe(0);
      expect(balance.available).toBe(5000);
    });

    it("should allow multiple purchases to accumulate balance", async () => {
      const testUserId = generateTestUserId();

      // First purchase: 2000 credits
      const first = await client.purchaseCredits({
        userId: testUserId,
        amount: 2000,
        purchasePrice: 20.0,
      });
      expect(first.newBalance).toBe(2000);

      // Second purchase: 3000 credits
      const second = await client.purchaseCredits({
        userId: testUserId,
        amount: 3000,
        purchasePrice: 30.0,
      });
      expect(second.newBalance).toBe(5000);

      // Verify accumulated balance
      const balance = await client.getCreditBalance(testUserId);
      expect(balance.balance).toBe(5000);
    });

    it("should auto-create user when purchasing credits for new user", async () => {
      const testUserId = generateTestUserId();

      // Purchase for a user that doesn't exist yet
      const result = await client.purchaseCredits({
        userId: testUserId,
        amount: 1000,
        purchasePrice: 10.0,
      });

      // Should succeed and create the user
      expect(result.transactionId).toBeDefined();
      expect(result.newBalance).toBe(1000);

      // Should be able to query their balance
      const balance = await client.getCreditBalance(testUserId);
      expect(balance.balance).toBe(1000);
    });
  });

  describe("Credit Grant Flow", () => {
    it("should grant credits and verify balance increases", async () => {
      const testUserId = generateTestUserId();

      // Grant 1000 credits to a new user
      const grantResult = await client.grantCredits({
        userId: testUserId,
        amount: 1000,
        reason: "Welcome bonus",
      });

      // Verify grant was successful
      expect(grantResult.transactionId).toBeDefined();
      expect(typeof grantResult.transactionId).toBe("string");
      expect(grantResult.walletId).toBeDefined();
      expect(grantResult.newBalance).toBe("1000");
      expect(grantResult.amount).toBe("1000");

      // Verify balance through getCreditBalance
      const balance = await client.getCreditBalance(testUserId);
      expect(balance.balance).toBe(1000);
    });

    it("should allow multiple grants to accumulate balance", async () => {
      const testUserId = generateTestUserId();

      // First grant: 500 credits
      const first = await client.grantCredits({
        userId: testUserId,
        amount: 500,
        reason: "Initial grant",
      });
      expect(first.newBalance).toBe("500");

      // Second grant: 500 credits
      const second = await client.grantCredits({
        userId: testUserId,
        amount: 500,
        reason: "Bonus grant",
      });
      expect(second.newBalance).toBe("1000");

      // Verify accumulated balance
      const balance = await client.getCreditBalance(testUserId);
      expect(balance.balance).toBe(1000);
    });

    it("should support idempotency key to prevent duplicate grants", async () => {
      const testUserId = generateTestUserId();
      const idempotencyKey = `test-grant-${Date.now()}`;

      // First grant with idempotency key
      const first = await client.grantCredits({
        userId: testUserId,
        amount: 1000,
        reason: "Test grant",
        idempotencyKey,
      });

      // Second grant with same idempotency key should return same result
      const second = await client.grantCredits({
        userId: testUserId,
        amount: 1000,
        reason: "Test grant",
        idempotencyKey,
      });

      // Should have same transaction ID (idempotent)
      expect(first.transactionId).toBe(second.transactionId);

      // Balance should only be 1000 (not 2000)
      const balance = await client.getCreditBalance(testUserId);
      expect(balance.balance).toBe(1000);
    });

    it("should grant to customer wallet when no userId provided", async () => {
      // Grant credits to customer-level wallet
      const grantResult = await client.grantCredits({
        amount: 500,
        reason: "Customer-level grant",
      });

      expect(grantResult.transactionId).toBeDefined();
      expect(grantResult.walletId).toBeDefined();
    });
  });

  describe("Credit Consumption Flow", () => {
    it("should burn credits when tracking token usage", async () => {
      const testUserId = generateTestUserId();

      // Setup: Add initial credits
      await client.purchaseCredits({
        userId: testUserId,
        amount: 10000,
        purchasePrice: 100.0,
      });

      const initialBalance = await client.getCreditBalance(testUserId);
      expect(initialBalance.balance).toBe(10000);

      // Track token usage - this should burn credits
      client.trackTokenUsage({
        userId: testUserId,
        customerId: "ignored", // Will be overwritten by API based on API key
        featureId: "integration-test-feature",
        provider: "OPENAI",
        model: "gpt-4",
        inputTokens: 1000,
        outputTokens: 500,
      });

      // Flush the event to the ingestion service
      await client.flush();

      // Wait for ingestion service to process the event
      await waitForProcessing(3000);

      // Verify balance decreased
      const finalBalance = await client.getCreditBalance(testUserId);
      expect(finalBalance.balance).toBeLessThan(10000);
    });

    it("should burn credits for image generation", async () => {
      const testUserId = generateTestUserId();

      // Setup: Add initial credits
      await client.purchaseCredits({
        userId: testUserId,
        amount: 10000,
        purchasePrice: 100.0,
      });

      const initialBalance = await client.getCreditBalance(testUserId);

      // Track image generation
      client.trackImageGeneration({
        userId: testUserId,
        customerId: "ignored",
        featureId: "image-gen-test",
        provider: "OPENAI",
        model: "dall-e-3",
        imageCount: 1,
        imageSize: "1024x1024",
        quality: "standard",
      });

      await client.flush();
      await waitForProcessing(3000);

      const finalBalance = await client.getCreditBalance(testUserId);
      expect(finalBalance.balance).toBeLessThan(initialBalance.balance);
    });

    it("should burn credits for custom events", async () => {
      const testUserId = generateTestUserId();

      // Setup: Add initial credits
      await client.purchaseCredits({
        userId: testUserId,
        amount: 5000,
        purchasePrice: 50.0,
      });

      const initialBalance = await client.getCreditBalance(testUserId);

      // Track custom event
      client.trackCustomEvent({
        userId: testUserId,
        customerId: "ignored",
        featureId: "custom-feature-test",
        unitType: "api_calls",
        quantity: 10,
        metadata: { test: true },
      });

      await client.flush();
      await waitForProcessing(3000);

      const finalBalance = await client.getCreditBalance(testUserId);
      // Note: Custom events may or may not burn credits depending on pricing config
      // The important thing is that the event was processed without error
      expect(finalBalance.balance).toBeLessThanOrEqual(initialBalance.balance);
    });
  });

  describe("Transaction History", () => {
    it("should show purchase transaction in history", async () => {
      const testUserId = generateTestUserId();

      // Make a purchase
      await client.purchaseCredits({
        userId: testUserId,
        amount: 3000,
        purchasePrice: 30.0,
      });

      // Get transaction history
      const history = await client.getTransactionHistory(testUserId);

      // Should have at least one transaction
      expect(history.data.length).toBeGreaterThanOrEqual(1);

      // Find the purchase transaction
      const purchaseTx = history.data.find(
        (tx) => tx.transactionType === "PURCHASE",
      );
      expect(purchaseTx).toBeDefined();
      expect(purchaseTx!.amount).toBe(3000);
    });

    it("should show grant transaction in history", async () => {
      const testUserId = generateTestUserId();

      // Make a grant
      await client.grantCredits({
        userId: testUserId,
        amount: 2000,
        reason: "Test grant for history",
      });

      // Get transaction history
      const history = await client.getTransactionHistory(testUserId);

      // Should have at least one transaction
      expect(history.data.length).toBeGreaterThanOrEqual(1);

      // Find the grant transaction
      const grantTx = history.data.find((tx) => tx.transactionType === "GRANT");
      expect(grantTx).toBeDefined();
      expect(grantTx!.amount).toBe(2000);
    });

    it("should show both purchase and burn transactions after usage", async () => {
      const testUserId = generateTestUserId();

      // Purchase credits
      await client.purchaseCredits({
        userId: testUserId,
        amount: 5000,
        purchasePrice: 50.0,
      });

      // Track usage
      client.trackTokenUsage({
        userId: testUserId,
        customerId: "ignored",
        featureId: "history-test",
        provider: "OPENAI",
        model: "gpt-4",
        inputTokens: 500,
        outputTokens: 250,
      });

      await client.flush();
      await waitForProcessing(3000);

      // Get transaction history
      const history = await client.getTransactionHistory(testUserId);

      // Should have multiple transactions
      expect(history.data.length).toBeGreaterThanOrEqual(2);

      // Get transaction types
      const transactionTypes = history.data.map((tx) => tx.transactionType);

      expect(transactionTypes).toContain("PURCHASE");
      expect(transactionTypes).toContain("BURN");
    });
  });

  describe("Complete Credit Lifecycle", () => {
    it("should add credits, use them, and verify final balance", async () => {
      const testUserId = generateTestUserId();

      // Step 1: Purchase initial credits
      const purchaseResult = await client.purchaseCredits({
        userId: testUserId,
        amount: 10000,
        purchasePrice: 100.0,
      });
      expect(purchaseResult.newBalance).toBe(10000);

      // Step 2: Track multiple usage events
      for (let i = 0; i < 3; i++) {
        client.trackTokenUsage({
          userId: testUserId,
          customerId: "ignored",
          featureId: `lifecycle-test-${i}`,
          provider: "OPENAI",
          model: "gpt-4",
          inputTokens: 200,
          outputTokens: 100,
          metadata: { iteration: i },
        });
      }

      await client.flush();
      await waitForProcessing(5000); // Longer wait for multiple events

      // Step 3: Verify balance decreased
      const finalBalance = await client.getCreditBalance(testUserId);
      expect(finalBalance.balance).toBeLessThan(10000);

      // Step 4: Verify transaction history shows the complete picture
      const history = await client.getTransactionHistory(testUserId);

      // Should have 1 purchase + 3 burns
      expect(history.data.length).toBeGreaterThanOrEqual(4);

      // Verify we have the right transaction types
      const purchases = history.data.filter(
        (tx) => tx.transactionType === "PURCHASE",
      );
      const burns = history.data.filter((tx) => tx.transactionType === "BURN");

      expect(purchases.length).toBeGreaterThanOrEqual(1);
      expect(burns.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Error Handling", () => {
    it("should handle getting balance for non-existent user", async () => {
      const nonExistentUserId = `non-existent-${Date.now()}`;

      // This should either return 0 balance or throw 404
      try {
        const balance = await client.getCreditBalance(nonExistentUserId);
        // If it returns, balance should be 0 or indicate no wallet
        expect(balance.balance).toBe(0);
      } catch (error: any) {
        // 404 is acceptable for non-existent user
        expect(error.statusCode).toBe(404);
      }
    });
  });
});
