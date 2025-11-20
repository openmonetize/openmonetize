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

import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';
import { config } from './config';
import { processEvent } from './services/event-processor';
import { logger } from './logger';

let eventQueue: Queue;
let dlqQueue: Queue;
let eventWorker: Worker;
let queueEvents: QueueEvents;

const redisConnection = new Redis(config.redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false
});

export async function initializeQueue(): Promise<void> {
  try {
    // Create queue for event processing
    eventQueue = new Queue('events', {
      connection: redisConnection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        },
        removeOnComplete: {
          count: 1000, // Keep last 1000 completed jobs
          age: 24 * 3600 // 24 hours
        },
        removeOnFail: {
          count: 5000 // Keep last 5000 failed jobs for debugging
        }
      }
    });

    // Create DLQ for dead letters
    dlqQueue = new Queue('events-dlq', {
      connection: redisConnection,
      defaultJobOptions: {
        removeOnComplete: false, // Keep until manually handled
        removeOnFail: false
      }
    });

    // Create worker to process events
    eventWorker = new Worker(
      'events',
      async (job) => {
        logger.debug({ jobId: job.id, eventId: job.data.event_id }, 'Processing event');
        await processEvent(job.data);
      },
      {
        connection: redisConnection,
        concurrency: config.queueConcurrency || 10,
        limiter: {
          max: 100, // Max 100 jobs
          duration: 1000 // per second
        }
      }
    );

    // Queue events for monitoring
    queueEvents = new QueueEvents('events', {
      connection: redisConnection
    });

    // Event listeners
    eventWorker.on('completed', (job) => {
      logger.info(
        { jobId: job.id, eventId: job.data?.event_id },
        'Event processed successfully'
      );
    });

    eventWorker.on('failed', async (job, err) => {
      logger.error(
        {
          jobId: job?.id,
          eventId: job?.data?.event_id,
          error: err.message,
          attempts: job?.attemptsMade
        },
        'Event processing failed'
      );

      // Move to DLQ if retries exhausted
      if (job && job.attemptsMade >= (job.opts.attempts || 3)) {
        try {
          logger.warn(
            { jobId: job.id, eventId: job.data.event_id },
            'Job exhausted retries, moving to DLQ'
          );
          
          await dlqQueue.add(job.name, {
            ...job.data,
            _original_error: err.message,
            _failed_at: new Date().toISOString(),
            _original_job_id: job.id
          }, {
            jobId: `dlq-${job.id}` // Preserve ID lineage
          });
        } catch (dlqError) {
          logger.error({ error: dlqError, originalJobId: job.id }, 'Failed to move job to DLQ');
        }
      }
    });

    eventWorker.on('error', (err) => {
      logger.error({ error: err }, 'Worker error');
    });

    queueEvents.on('waiting', ({ jobId }) => {
      logger.debug({ jobId }, 'Job is waiting');
    });

    queueEvents.on('active', ({ jobId }) => {
      logger.debug({ jobId }, 'Job is active');
    });

    logger.info('Event queue initialized successfully');
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

export function getDLQ(): Queue {
  if (!dlqQueue) {
    throw new Error('DLQ not initialized. Call initializeQueue() first.');
  }
  return dlqQueue;
}

export function getWorker(): Worker {
  if (!eventWorker) {
    throw new Error('Worker not initialized. Call initializeQueue() first.');
  }
  return eventWorker;
}

export async function closeQueue(): Promise<void> {
  logger.info('Closing queue and worker...');

  try {
    if (eventWorker) {
      await eventWorker.close();
      logger.info('Worker closed');
    }

    if (queueEvents) {
      await queueEvents.close();
      logger.info('Queue events closed');
    }

    if (eventQueue) {
      await eventQueue.close();
      logger.info('Queue closed');
    }

    if (dlqQueue) {
      await dlqQueue.close();
      logger.info('DLQ closed');
    }

    await redisConnection.quit();
    logger.info('Redis connection closed');
  } catch (error) {
    logger.error({ error }, 'Error closing queue');
    throw error;
  }
}

export async function getQueueMetrics() {
  if (!eventQueue || !dlqQueue) {
    return null;
  }

  const [waiting, active, completed, failed, delayed] = await Promise.all([
    eventQueue.getWaitingCount(),
    eventQueue.getActiveCount(),
    eventQueue.getCompletedCount(),
    eventQueue.getFailedCount(),
    eventQueue.getDelayedCount()
  ]);

  const dlqCount = await dlqQueue.getWaitingCount();

  return {
    waiting,
    active,
    completed,
    failed,
    delayed,
    dlq: dlqCount,
    total: waiting + active + completed + failed + delayed
  };
}
