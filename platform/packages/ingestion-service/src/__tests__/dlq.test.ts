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

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initializeQueue, getQueue, getDLQ, closeQueue } from '../queue';

// Mock dependencies
const mockAdd = vi.fn();
const mockClose = vi.fn();
const mockOn = vi.fn();

vi.mock('bullmq', () => {
  return {
    Queue: vi.fn().mockImplementation(() => ({
      add: mockAdd,
      close: mockClose,
      getWaitingCount: vi.fn().mockResolvedValue(0),
      getActiveCount: vi.fn().mockResolvedValue(0),
      getCompletedCount: vi.fn().mockResolvedValue(0),
      getFailedCount: vi.fn().mockResolvedValue(0),
      getDelayedCount: vi.fn().mockResolvedValue(0),
    })),
    Worker: vi.fn().mockImplementation(() => ({
      on: mockOn,
      close: mockClose,
    })),
    QueueEvents: vi.fn().mockImplementation(() => ({
      on: vi.fn(),
      close: mockClose,
    })),
  };
});

vi.mock('ioredis', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      quit: vi.fn(),
    })),
  };
});

vi.mock('../config', () => ({
  config: {
    redisUrl: 'redis://localhost:6379',
    queueConcurrency: 1,
  },
}));

vi.mock('../logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('DLQ Logic', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // We need to reset the module state because queue.ts has top-level variables
    // But since we can't easily reset module state in ESM/Vitest without isolation,
    // we rely on closeQueue to clean up if possible, or just re-init.
    // However, initializeQueue throws if already initialized? No, it just overwrites variables.
    await initializeQueue();
  });

  afterEach(async () => {
    await closeQueue();
  });

  it('should initialize main queue and DLQ', () => {
    const queue = getQueue();
    const dlq = getDLQ();
    expect(queue).toBeDefined();
    expect(dlq).toBeDefined();
  });

  it('should move job to DLQ when retries are exhausted', async () => {
    // Get the 'failed' handler registered on the worker
    const calls = mockOn.mock.calls;
    const failedHandler = calls.find((call) => call[0] === 'failed')?.[1];
    
    expect(failedHandler).toBeDefined();

    // Simulate a failed job with exhausted retries
    const mockJob = {
      id: 'job-123',
      name: 'test-job',
      data: { event_id: 'evt-1' },
      attemptsMade: 3,
      opts: { attempts: 3 },
    };

    const mockError = new Error('Processing failed');

    // Call the handler
    await failedHandler(mockJob, mockError);

    // Verify it was added to DLQ
    expect(mockAdd).toHaveBeenCalledWith(
      'test-job',
      expect.objectContaining({
        event_id: 'evt-1',
        _original_error: 'Processing failed',
        _original_job_id: 'job-123'
      }),
      expect.objectContaining({
        jobId: 'dlq-job-123'
      })
    );
  });

  it('should NOT move job to DLQ if retries are NOT exhausted', async () => {
    const calls = mockOn.mock.calls;
    const failedHandler = calls.find((call) => call[0] === 'failed')?.[1];
    
    const mockJob = {
      id: 'job-123',
      name: 'test-job',
      data: { event_id: 'evt-1' },
      attemptsMade: 1, // Less than 3
      opts: { attempts: 3 },
    };

    const mockError = new Error('Processing failed');

    await failedHandler(mockJob, mockError);

    expect(mockAdd).not.toHaveBeenCalled();
  });
});
