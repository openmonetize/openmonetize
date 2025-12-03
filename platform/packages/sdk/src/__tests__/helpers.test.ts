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

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OpenMonetize } from '../client';
import { withGoogleTracking, BatchTracker } from '../helpers';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('OpenMonetize SDK Helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('withGoogleTracking', () => {
    it('should track usage from Google response', async () => {
      const client = new OpenMonetize({ apiKey: 'test-key' });
      const trackSpy = vi.spyOn(client, 'trackTokenUsage');

      const mockGoogleResponse = {
        response: {
          usageMetadata: {
            promptTokenCount: 10,
            candidatesTokenCount: 20,
            totalTokenCount: 30,
          },
        },
      };

      const result = await withGoogleTracking(
        client,
        async () => mockGoogleResponse,
        {
          customerId: 'cust-1',
          userId: 'user-1',
          featureId: 'feat-1',
          model: 'gemini-pro',
        }
      );

      expect(result).toBe(mockGoogleResponse);
      expect(trackSpy).toHaveBeenCalledWith({
        user_id: 'user-1',
        feature_id: 'feat-1',
        provider: 'GOOGLE',
        model: 'gemini-pro',
        input_tokens: 10,
        output_tokens: 20,
        metadata: undefined,
      });
    });

    it('should handle missing usage metadata', async () => {
      const client = new OpenMonetize({ apiKey: 'test-key' });
      const trackSpy = vi.spyOn(client, 'trackTokenUsage');

      const mockGoogleResponse = {
        response: {},
      };

      await withGoogleTracking(
        client,
        async () => mockGoogleResponse,
        {
          customerId: 'cust-1',
          userId: 'user-1',
          featureId: 'feat-1',
          model: 'gemini-pro',
        }
      );

      expect(trackSpy).not.toHaveBeenCalled();
    });
  });

  describe('BatchTracker', () => {
    it('should generate valid UUIDs for batched events', async () => {
      const client = new OpenMonetize({ apiKey: 'test-key' });
      const tracker = new BatchTracker(client);

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      tracker.add({
        customerId: 'cust-1',
        userId: 'user-1',
        featureId: 'feat-1',
        provider: 'OPENAI',
        model: 'gpt-4',
        inputTokens: 10,
        outputTokens: 10,
      });

      await tracker.flush();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.events).toHaveLength(1);
      expect(body.events[0].event_id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });
  });
});
