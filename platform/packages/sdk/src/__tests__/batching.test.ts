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

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("OpenMonetize SDK Batching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should batch events and flush after interval", async () => {
    const client = new OpenMonetize({
      apiKey: "test-key",
      flushInterval: 1000,
      maxBatchSize: 10,
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Track 3 events
    client.trackTokenUsage({
      userId: "user-1",
      customerId: "cust-1",
      featureId: "feat-1",
      provider: "OPENAI",
      model: "gpt-4",
      inputTokens: 10,
      outputTokens: 10,
    });
    client.trackTokenUsage({
      userId: "user-2",
      customerId: "cust-1",
      featureId: "feat-1",
      provider: "OPENAI",
      model: "gpt-4",
      inputTokens: 10,
      outputTokens: 10,
    });
    client.trackTokenUsage({
      userId: "user-3",
      customerId: "cust-1",
      featureId: "feat-1",
      provider: "OPENAI",
      model: "gpt-4",
      inputTokens: 10,
      outputTokens: 10,
    });

    // Should not have called fetch yet
    expect(mockFetch).not.toHaveBeenCalled();

    // Advance time
    await vi.advanceTimersByTimeAsync(1100);

    // Should have called fetch once with 3 events
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.events).toHaveLength(3);
    expect(body.events[0].userId).toBe("user-1");
    expect(body.events[0].eventId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(body.events[2].userId).toBe("user-3");
  });

  it("should flush immediately when maxBatchSize is reached", async () => {
    const client = new OpenMonetize({
      apiKey: "test-key",
      flushInterval: 10000,
      maxBatchSize: 2, // Small batch size
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Track 1st event
    client.trackTokenUsage({
      userId: "user-1",
      customerId: "cust-1",
      featureId: "feat-1",
      provider: "OPENAI",
      model: "gpt-4",
      inputTokens: 10,
      outputTokens: 10,
    });
    expect(mockFetch).not.toHaveBeenCalled();

    // Track 2nd event (hits maxBatchSize)
    client.trackTokenUsage({
      userId: "user-2",
      customerId: "cust-1",
      featureId: "feat-1",
      provider: "OPENAI",
      model: "gpt-4",
      inputTokens: 10,
      outputTokens: 10,
    });

    // Should flush immediately (async)
    // We need to wait a tick for the promise to resolve
    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.events).toHaveLength(2);
  });

  it("should retry on 500 errors", async () => {
    const client = new OpenMonetize({
      apiKey: "test-key",
      maxRetries: 3,
      autoFlush: false, // Manual flush for control
    });

    // Mock failure then success
    mockFetch
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server Error" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

    client.trackTokenUsage({
      userId: "user-1",
      customerId: "cust-1",
      featureId: "feat-1",
      provider: "OPENAI",
      model: "gpt-4",
      inputTokens: 10,
      outputTokens: 10,
    });

    // Flush manually
    const flushPromise = client.flush();

    // Advance time for backoff (2s + buffer + jitter max 1s)
    await vi.advanceTimersByTimeAsync(3100);

    await flushPromise;

    expect(mockFetch).toHaveBeenCalledTimes(2);
  }, 10000); // Increase timeout
});
