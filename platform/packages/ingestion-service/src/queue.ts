import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';
import { config } from './config';
import { processEvent } from './services/event-processor';
import { logger } from './logger';

let eventQueue: Queue;
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

    eventWorker.on('failed', (job, err) => {
      logger.error(
        {
          jobId: job?.id,
          eventId: job?.data?.event_id,
          error: err.message,
          attempts: job?.attemptsMade
        },
        'Event processing failed'
      );
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

    await redisConnection.quit();
    logger.info('Redis connection closed');
  } catch (error) {
    logger.error({ error }, 'Error closing queue');
    throw error;
  }
}

export async function getQueueMetrics() {
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
