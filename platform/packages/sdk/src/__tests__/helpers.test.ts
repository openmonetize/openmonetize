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

import { describe, it, expect, vi, beforeEach } from "vitest";
import { OpenMonetize } from "../client";
import {
  withGoogleTracking,
  withOpenAITracking,
  withAnthropicTracking,
  BatchTracker,
} from "../helpers";

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("OpenMonetize SDK Helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("withOpenAITracking", () => {
    it("should track usage from OpenAI response", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockOpenAIResponse = {
        model: "gpt-4",
        usage: {
          prompt_tokens: 100,
          completion_tokens: 50,
          total_tokens: 150,
        },
        choices: [{ message: { content: "Hello!" } }],
      };

      const result = await withOpenAITracking(
        client,
        async () => mockOpenAIResponse,
        {
          customerId: "cust-1",
          userId: "user-1",
          featureId: "feat-1",
        },
      );

      expect(result).toBe(mockOpenAIResponse);
      expect(trackSpy).toHaveBeenCalledWith({
        user_id: "user-1",
        customer_id: "cust-1",
        feature_id: "feat-1",
        provider: "OPENAI",
        model: "gpt-4",
        input_tokens: 100,
        output_tokens: 50,
        metadata: undefined,
      });
    });

    it("should handle missing usage gracefully", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockOpenAIResponse = {
        model: "gpt-4",
        choices: [{ message: { content: "Hello!" } }],
      };

      await withOpenAITracking(client, async () => mockOpenAIResponse, {
        customerId: "cust-1",
        userId: "user-1",
        featureId: "feat-1",
      });

      expect(trackSpy).not.toHaveBeenCalled();
    });
  });

  describe("withAnthropicTracking", () => {
    it("should track usage from Anthropic response", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockAnthropicResponse = {
        model: "claude-3-sonnet-20240229",
        usage: {
          input_tokens: 200,
          output_tokens: 100,
        },
        content: [{ text: "Hello!" }],
      };

      const result = await withAnthropicTracking(
        client,
        async () => mockAnthropicResponse,
        {
          customerId: "cust-1",
          userId: "user-1",
          featureId: "feat-1",
        },
      );

      expect(result).toBe(mockAnthropicResponse);
      expect(trackSpy).toHaveBeenCalledWith({
        user_id: "user-1",
        customer_id: "cust-1",
        feature_id: "feat-1",
        provider: "ANTHROPIC",
        model: "claude-3-sonnet-20240229",
        input_tokens: 200,
        output_tokens: 100,
        metadata: undefined,
      });
    });

    it("should pass through metadata", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockAnthropicResponse = {
        model: "claude-3-opus-20240229",
        usage: { input_tokens: 50, output_tokens: 25 },
      };

      await withAnthropicTracking(client, async () => mockAnthropicResponse, {
        customerId: "cust-1",
        userId: "user-1",
        featureId: "feat-1",
        metadata: { session_id: "sess-123" },
      });

      expect(trackSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: { session_id: "sess-123" },
        }),
      );
    });
  });

  describe("withGoogleTracking", () => {
    it("should track usage from Google response (v0.1.0+ structure)", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockGoogleResponse = {
        usageMetadata: {
          promptTokenCount: 10,
          candidatesTokenCount: 20,
          totalTokenCount: 30,
        },
      };

      const result = await withGoogleTracking(
        client,
        async () => mockGoogleResponse,
        {
          customerId: "cust-1",
          userId: "user-1",
          featureId: "feat-1",
          model: "gemini-pro",
        },
      );

      expect(result).toBe(mockGoogleResponse);
      expect(trackSpy).toHaveBeenCalledWith({
        user_id: "user-1",
        customer_id: "cust-1",
        feature_id: "feat-1",
        provider: "GOOGLE",
        model: "gemini-pro",
        input_tokens: 10,
        output_tokens: 20,
        metadata: undefined,
      });
    });

    it("should track usage from Google response (nested response structure)", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockGoogleResponse = {
        response: {
          usageMetadata: {
            promptTokenCount: 15,
            candidatesTokenCount: 25,
            totalTokenCount: 40,
          },
        },
      };

      const result = await withGoogleTracking(
        client,
        async () => mockGoogleResponse,
        {
          customerId: "cust-1",
          userId: "user-1",
          featureId: "feat-1",
          model: "gemini-pro",
        },
      );

      expect(result).toBe(mockGoogleResponse);
      expect(trackSpy).toHaveBeenCalledWith({
        user_id: "user-1",
        customer_id: "cust-1",
        feature_id: "feat-1",
        provider: "GOOGLE",
        model: "gemini-pro",
        input_tokens: 15,
        output_tokens: 25,
        metadata: undefined,
      });
    });

    it("should track usage from Google response (legacy usage structure)", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockGoogleResponse = {
        usage: {
          promptTokens: 5,
          completionTokens: 8,
        },
      };

      const result = await withGoogleTracking(
        client,
        async () => mockGoogleResponse,
        {
          customerId: "cust-1",
          userId: "user-1",
          featureId: "feat-1",
          model: "gemini-pro",
        },
      );

      expect(result).toBe(mockGoogleResponse);
      expect(trackSpy).toHaveBeenCalledWith({
        user_id: "user-1",
        customer_id: "cust-1",
        feature_id: "feat-1",
        provider: "GOOGLE",
        model: "gemini-pro",
        input_tokens: 5,
        output_tokens: 8,
        metadata: undefined,
      });
    });

    it("should handle missing usage metadata gracefully", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const trackSpy = vi.spyOn(client, "trackTokenUsage");

      const mockGoogleResponse = {
        response: {},
      };

      await withGoogleTracking(client, async () => mockGoogleResponse, {
        customerId: "cust-1",
        userId: "user-1",
        featureId: "feat-1",
        model: "gemini-pro",
      });

      expect(trackSpy).not.toHaveBeenCalled();
    });
  });

  describe("BatchTracker", () => {
    it("should generate valid UUIDs for batched events", async () => {
      const client = new OpenMonetize({ apiKey: "test-key" });
      const tracker = new BatchTracker(client);

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      tracker.add({
        customerId: "cust-1",
        userId: "user-1",
        featureId: "feat-1",
        provider: "OPENAI",
        model: "gpt-4",
        inputTokens: 10,
        outputTokens: 10,
      });

      await tracker.flush();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.events).toHaveLength(1);
      expect(body.events[0].event_id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });
  });
});
