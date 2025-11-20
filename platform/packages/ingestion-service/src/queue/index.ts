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

import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { config } from '../config';
import { processEvent } from '../services/event-processor';
import { logger } from '../logger';

let eventQueue: Queue;
let eventWorker: Worker;

const connection = new Redis(config.redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

export async function initializeQueue() {
  try {
    // Create queue
    eventQueue = new Queue(config.queueName, {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        },
        removeOnComplete: {
          count: 1000,
          age: 24 * 3600 // 24 hours
        },
        removeOnFail: {
          count: 5000,
          age: 7 * 24 * 3600 // 7 days
        }
      }
    });

    // Create worker
    eventWorker = new Worker(
      config.queueName,
      async (job: Job) => {
        try {
          await processEvent(job.data);
          logger.debug({ eventId: job.data.event_id, jobId: job.id }, 'Event processed');
          return { success: true, eventId: job.data.event_id };
        } catch (error) {
          logger.error(
            { error, eventId: job.data.event_id, jobId: job.id },
            'Event processing failed'
          );
          throw error;
        }
      },
      {
        connection: connection.duplicate(),
        concurrency: config.queueConcurrency,
        limiter: {
          max: 100,
          duration: 1000 // Max 100 jobs per second
        }
      }
    );

    // Event handlers
    eventWorker.on('completed', (job) => {
      logger.info({ jobId: job.id }, 'Job completed successfully');
    });

    eventWorker.on('failed', (job, error) => {
      logger.error(
        { jobId: job?.id, error: error.message },
        'Job failed after retries'
      );
    });

    eventWorker.on('error', (error) => {
      logger.error({ error }, 'Worker error');
    });

    logger.info({
      queueName: config.queueName,
      concurrency: config.queueConcurrency
    }, 'Queue initialized successfully');

  } catch (error) {
    logger.error({ error }, 'Failed to initialize queue');
    throw error;
  }
}

export function getQueue(): Queue {
  if (!eventQueue) {
    throw new Error('Queue not initialized. Call initializeQueue() first.');
  }
  return eventQueue;
}

export async function closeQueue() {
  try {
    if (eventWorker) {
      await eventWorker.close();
      logger.info('Worker closed');
    }
    if (eventQueue) {
      await eventQueue.close();
      logger.info('Queue closed');
    }
    await connection.quit();
    logger.info('Redis connection closed');
  } catch (error) {
    logger.error({ error }, 'Error closing queue');
  }
}

// Get queue statistics
export async function getQueueStats() {
  if (!eventQueue) {
    return null;
  }

  const [waiting, active, completed, failed, delayed] = await Promise.all([
    eventQueue.getWaitingCount(),
    eventQueue.getActiveCount(),
    eventQueue.getCompletedCount(),
    eventQueue.getFailedCount(),
    eventQueue.getDelayedCount()
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    delayed,
    total: waiting + active + completed + failed + delayed
  };
}
