import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OpenMonetize } from '../client';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('OpenMonetize SDK Batching', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should batch events and flush after interval', async () => {
    const client = new OpenMonetize({
      apiKey: 'test-key',
      flushInterval: 1000,
      maxBatchSize: 10,
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Track 3 events
    client.trackTokenUsage({
      user_id: 'user-1',
      feature_id: 'feat-1',
      provider: 'OPENAI',
      model: 'gpt-4',
      input_tokens: 10,
      output_tokens: 10,
    });
    client.trackTokenUsage({
      user_id: 'user-2',
      feature_id: 'feat-1',
      provider: 'OPENAI',
      model: 'gpt-4',
      input_tokens: 10,
      output_tokens: 10,
    });
    client.trackTokenUsage({
      user_id: 'user-3',
      feature_id: 'feat-1',
      provider: 'OPENAI',
      model: 'gpt-4',
      input_tokens: 10,
      output_tokens: 10,
    });

    // Should not have called fetch yet
    expect(mockFetch).not.toHaveBeenCalled();

    // Advance time
    await vi.advanceTimersByTimeAsync(1100);

    // Should have called fetch once with 3 events
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.events).toHaveLength(3);
    expect(body.events[0].user_id).toBe('user-1');
    expect(body.events[2].user_id).toBe('user-3');
  });

  it('should flush immediately when maxBatchSize is reached', async () => {
    const client = new OpenMonetize({
      apiKey: 'test-key',
      flushInterval: 10000,
      maxBatchSize: 2, // Small batch size
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    // Track 1st event
    client.trackTokenUsage({
      user_id: 'user-1',
      feature_id: 'feat-1',
      provider: 'OPENAI',
      model: 'gpt-4',
      input_tokens: 10,
      output_tokens: 10,
    });
    expect(mockFetch).not.toHaveBeenCalled();

    // Track 2nd event (hits maxBatchSize)
    client.trackTokenUsage({
      user_id: 'user-2',
      feature_id: 'feat-1',
      provider: 'OPENAI',
      model: 'gpt-4',
      input_tokens: 10,
      output_tokens: 10,
    });

    // Should flush immediately (async)
    // We need to wait a tick for the promise to resolve
    await vi.waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.events).toHaveLength(2);
  });

  it('should retry on 500 errors', async () => {
    const client = new OpenMonetize({
      apiKey: 'test-key',
      maxRetries: 3,
      autoFlush: false, // Manual flush for control
    });

    // Mock failure then success
    mockFetch
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server Error' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

    client.trackTokenUsage({
      user_id: 'user-1',
      feature_id: 'feat-1',
      provider: 'OPENAI',
      model: 'gpt-4',
      input_tokens: 10,
      output_tokens: 10,
    });

    // Flush manually
    const flushPromise = client.flush();

    // Advance time for backoff (2s + buffer)
    await vi.advanceTimersByTimeAsync(2100);

    await flushPromise;

    expect(mockFetch).toHaveBeenCalledTimes(2);
  }, 10000); // Increase timeout
});
