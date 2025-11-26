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

import Redis from 'ioredis';
import { config } from '../config';
import { processEvent } from '../services/event-processor';
import { logger } from '../logger';

let redis: Redis;
let isRunning = false;

const CONSUMER_NAME = `consumer-${Math.random().toString(36).substring(7)}`;

export async function initializeQueue() {
  redis = new Redis(config.redisUrl);
  
  try {
    // Create consumer group if not exists
    await redis.xgroup('CREATE', config.streamKey, config.consumerGroup, '0', 'MKSTREAM');
    logger.info('Created consumer group', { group: config.consumerGroup });
  } catch (err: any) {
    if (!err.message.includes('BUSYGROUP')) {
      throw err;
    }
  }

  isRunning = true;
  consumeLoop().catch(err => {
    logger.error({ err }, 'Consumer loop failed');
  });
  
  logger.info({ 
    stream: config.streamKey, 
    group: config.consumerGroup,
    consumer: CONSUMER_NAME 
  }, 'Stream consumer initialized');
}

async function consumeLoop() {
  while (isRunning) {
    try {
      // Read from stream
      const response = await redis.xreadgroup(
        'GROUP',
        config.consumerGroup,
        CONSUMER_NAME,
        'COUNT',
        config.queueConcurrency,
        'BLOCK',
        2000,
        'STREAMS',
        config.streamKey,
        '>'
      );

      if (!response) {
        continue;
      }

      // response format: [[streamKey, [[id, [field, value, ...]], ...]]]
      const streamData = response[0][1] as any[];

      for (const [id, fields] of streamData) {
        await processMessage(id, fields);
      }

    } catch (error) {
      logger.error({ err: error }, 'Error in consume loop');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

async function processMessage(id: string, fields: string[]) {
  try {
    // Parse fields (flat array to object)
    const data: Record<string, any> = {};
    for (let i = 0; i < fields.length; i += 2) {
      const key = fields[i] as string;
      const value = fields[i + 1];
      data[key] = value;
    }

    // Parse nested JSON if needed (Redis Streams stores strings)
    // Assuming the payload is flattened or we need to parse specific fields
    // For now, let's assume the SDK sends a JSON string in a 'data' field or flattened fields.
    // Based on SDK client, it sends `ingestEvents` which is HTTP POST.
    // Wait, the API Gateway writes to Redis. We need to see how API Gateway writes.
    // Assuming API Gateway does XADD key * data JSON.stringify(event)
    
    let event = data;
    if (data.data && typeof data.data === 'string') {
        try {
            event = JSON.parse(data.data);
        } catch (e) {
            // ignore
        }
    }

    await processEvent(event as any);
    
    // ACK
    await redis.xack(config.streamKey, config.consumerGroup, id);
    
    logger.debug({ id, eventId: event.event_id }, 'Processed and ACKed message');

  } catch (error) {
    logger.error({ error, id }, 'Failed to process message');
    // We don't ACK here, so it stays in PEL for DLQ manager to handle
  }
}

export async function closeQueue() {
  isRunning = false;
  if (redis) {
    await redis.quit();
  }
}

export function getQueueStats() {
    return redis.xinfo('GROUPS', config.streamKey);
}
