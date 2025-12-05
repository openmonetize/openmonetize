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

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { OpenMonetize } from "../client";
import { OpenMonetizeError } from "../types";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("OpenMonetize SDK Flow Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("String ID Support (Non-UUID)", () => {
    it("should accept arbitrary string customerId and userId in trackTokenUsage", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        flushInterval: 100,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, processed: 1, failed: 0 }),
      });

      // Use non-UUID string IDs (the fix allows any string, not just UUIDs)
      client.trackTokenUsage({
        userId: "my-custom-user-id-123",
        customerId: "legalai-corp",
        featureId: "legal-research",
        provider: "OPENAI",
        model: "gpt-4",
        inputTokens: 100,
        outputTokens: 50,
      });

      await vi.advanceTimersByTimeAsync(200);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);

      expect(body.events).toHaveLength(1);
      expect(body.events[0].customerId).toBe("legalai-corp");
      expect(body.events[0].userId).toBe("my-custom-user-id-123");
      expect(body.events[0].eventType).toBe("TOKEN_USAGE");
    });

    it("should accept hyphenated string IDs", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        flushInterval: 100,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      client.trackImageGeneration({
        userId: "org-abc-user-xyz",
        customerId: "company-name-with-dashes",
        featureId: "image-gen",
        provider: "OPENAI",
        model: "dall-e-3",
        imageCount: 1,
        imageSize: "1024x1024",
      });

      await vi.advanceTimersByTimeAsync(200);

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.events[0].customerId).toBe("company-name-with-dashes");
      expect(body.events[0].userId).toBe("org-abc-user-xyz");
    });

    it("should accept email-style customer IDs", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        flushInterval: 100,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      client.trackCustomEvent({
        userId: "user@company.com",
        customerId: "tenant@domain.io",
        featureId: "custom-feature",
        unitType: "api_calls",
        quantity: 5,
      });

      await vi.advanceTimersByTimeAsync(200);

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.events[0].customerId).toBe("tenant@domain.io");
      expect(body.events[0].userId).toBe("user@company.com");
    });

    it("should still accept valid UUID IDs", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        flushInterval: 100,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      const validUuidCustomer = "123e4567-e89b-12d3-a456-426614174000";
      const validUuidUser = "987fcdeb-51a2-3bc4-d567-890123456789";

      client.trackTokenUsage({
        userId: validUuidUser,
        customerId: validUuidCustomer,
        featureId: "feature",
        provider: "ANTHROPIC",
        model: "claude-3-opus",
        inputTokens: 50,
        outputTokens: 25,
      });

      await vi.advanceTimersByTimeAsync(200);

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.events[0].customerId).toBe(validUuidCustomer);
      expect(body.events[0].userId).toBe(validUuidUser);
    });
  });

  describe("getCreditBalance with String IDs", () => {
    it("should correctly call API with string user ID", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        autoFlush: false,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          data: {
            balance: 10000,
            reserved: 500,
            available: 9500,
            expiresAt: null,
          },
        }),
      });

      const balance = await client.getCreditBalance("law-firm-a");

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch.mock.calls[0][0]).toContain(
        "/v1/users/law-firm-a/credits",
      );
      expect(balance.balance).toBe(10000);
      expect(balance.available).toBe(9500);
    });
  });

  describe("calculateCost API", () => {
    it("should make correct API call", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        autoFlush: false,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          credits: 150,
          costBreakdown: {
            inputCostUsd: 0.003,
            outputCostUsd: 0.006,
            totalCostUsd: 0.009,
          },
          providerCostUsd: 0.008,
          marginUsd: 0.001,
          marginPercent: 11.11,
        }),
      });

      const cost = await client.calculateCost({
        provider: "OPENAI",
        model: "gpt-4",
        inputTokens: 100,
        outputTokens: 50,
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Verify the request body uses camelCase
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.provider).toBe("OPENAI");
      expect(body.model).toBe("gpt-4");
      expect(body.inputTokens).toBe(100);
      expect(body.outputTokens).toBe(50);

      expect(cost.credits).toBe(150);
    });

    it("should accept any provider string", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        autoFlush: false,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          credits: 100,
          costBreakdown: { totalCostUsd: 0.01 },
        }),
      });

      await client.calculateCost({
        provider: "ANTHROPIC",
        model: "claude-3-sonnet",
        inputTokens: 50,
        outputTokens: 25,
      });

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.provider).toBe("ANTHROPIC");
    });
  });

  describe("getUsageAnalytics API", () => {
    it("should call API with date range parameters", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        autoFlush: false,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          totalCredits: 5000,
          totalCostUsd: 5.0,
          byProvider: {},
          byModel: {},
          byFeature: {},
        }),
      });

      await client.getUsageAnalytics({
        startDate: "2025-01-01T00:00:00Z",
        endDate: "2025-01-31T23:59:59Z",
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const url = mockFetch.mock.calls[0][0];
      expect(url).toContain("/v1/analytics/usage?");
      expect(url).toContain("start_date=");
      expect(url).toContain("end_date=");
    });

    it("should include userId in query when provided", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        autoFlush: false,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ totalCredits: 1000 }),
      });

      await client.getUsageAnalytics({
        startDate: "2025-01-01T00:00:00Z",
        endDate: "2025-01-31T23:59:59Z",
        userId: "specific-user",
      });

      const url = mockFetch.mock.calls[0][0];
      expect(url).toContain("user_id=specific-user");
    });
  });

  describe("Complete Tracking Flow", () => {
    it("should track event, flush, and verify eventId is UUID", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        flushInterval: 100,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, processed: 1, failed: 0 }),
      });

      client.trackTokenUsage({
        userId: "end-user-abc",
        customerId: "saas-company-xyz",
        featureId: "chat-completion",
        provider: "GOOGLE",
        model: "gemini-pro",
        inputTokens: 200,
        outputTokens: 100,
        metadata: {
          sessionId: "sess-12345",
          conversationId: "conv-67890",
        },
      });

      await vi.advanceTimersByTimeAsync(200);

      expect(mockFetch).toHaveBeenCalledTimes(1);

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      const event = body.events[0];

      // Verify event structure
      expect(event.eventId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
      expect(event.customerId).toBe("saas-company-xyz");
      expect(event.userId).toBe("end-user-abc");
      expect(event.eventType).toBe("TOKEN_USAGE");
      expect(event.featureId).toBe("chat-completion");
      expect(event.provider).toBe("GOOGLE");
      expect(event.model).toBe("gemini-pro");
      expect(event.inputTokens).toBe(200);
      expect(event.outputTokens).toBe(100);
      expect(event.metadata).toEqual({
        sessionId: "sess-12345",
        conversationId: "conv-67890",
      });
      expect(event.timestamp).toBeDefined();
    });

    it("should track custom event with arbitrary unit type", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        flushInterval: 100,
      });

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      client.trackCustomEvent({
        userId: "user-1",
        customerId: "customer-1",
        featureId: "video-processing",
        unitType: "minutes_processed",
        quantity: 15.5,
        metadata: { videoId: "vid_abc123" },
      });

      await vi.advanceTimersByTimeAsync(200);

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.events[0].eventType).toBe("CUSTOM");
      expect(body.events[0].unitType).toBe("minutes_processed");
      expect(body.events[0].quantity).toBe(15.5);
    });
  });

  describe("Error Handling", () => {
    it("should throw OpenMonetizeError on API error", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        autoFlush: false,
        maxRetries: 1,
      });

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          error: "VALIDATION_ERROR",
          message: "Invalid input: customerId is required",
        }),
      });

      await expect(
        client.calculateCost({
          provider: "OPENAI",
          model: "gpt-4",
          inputTokens: 100,
          outputTokens: 50,
        }),
      ).rejects.toThrow(OpenMonetizeError);
    });

    it("should include error details in OpenMonetizeError", async () => {
      const client = new OpenMonetize({
        apiKey: "test-key",
        autoFlush: false,
        maxRetries: 1,
      });

      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({
          error: "NOT_FOUND",
          message: "Customer not found",
        }),
      });

      try {
        await client.getCreditBalance("user");
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(OpenMonetizeError);
        const ome = error as OpenMonetizeError;
        expect(ome.statusCode).toBe(404);
        expect(ome.response?.message).toBe("Customer not found");
      }
    });
  });
});
