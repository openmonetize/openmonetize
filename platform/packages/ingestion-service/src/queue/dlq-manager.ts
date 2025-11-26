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
import { logger } from '../logger';

let redis: Redis;
let checkInterval: NodeJS.Timeout;

const DLQ_CHECK_INTERVAL = 60000; // 1 minute
const MAX_DELIVERY_ATTEMPTS = 5;
const MIN_IDLE_TIME = 60000; // 1 minute

export async function startDlqManager() {
  redis = new Redis(config.redisUrl);
  
  checkInterval = setInterval(checkPendingMessages, DLQ_CHECK_INTERVAL);
  logger.info('DLQ Manager started');
}

export async function stopDlqManager() {
  if (checkInterval) {
    clearInterval(checkInterval);
  }
  if (redis) {
    await redis.quit();
  }
}

async function checkPendingMessages() {
  try {
    // Check PEL
    const pending = await redis.xpending(
      config.streamKey,
      config.consumerGroup,
      '-',
      '+',
      100
    );

    for (const [id, , idle, count] of pending as any[]) {
      if (idle > MIN_IDLE_TIME) {
        // Claim message
        const claimed = await redis.xautoclaim(
            config.streamKey,
            config.consumerGroup,
            'dlq-worker',
            MIN_IDLE_TIME,
            id,
            'COUNT',
            1
        ) as any[];
        
        // claimed format: [nextId, [[id, fields]]]
        const messages = claimed[1] as any[];
        
        if (messages && messages.length > 0) {
            const [msgId, fields] = messages[0];
            
            if (count >= MAX_DELIVERY_ATTEMPTS) {
                logger.warn({ msgId, count }, 'Message exceeded max retries, moving to DLQ');
                
                // Move to DLQ
                await redis.xadd(config.dlqStreamKey, '*', ...fields);
                
                // ACK in main stream
                await redis.xack(config.streamKey, config.consumerGroup, msgId);
            }
        }
      }
    }
    
    // Refined implementation for Poison Messages ONLY
    const pendingPoison = (pending as any[]).filter(([, , , count]) => count >= MAX_DELIVERY_ATTEMPTS);
    
    for (const [id, , , count] of pendingPoison) {
        // Claim to get payload
        const claimed = await redis.xclaim(
            config.streamKey,
            config.consumerGroup,
            'dlq-manager',
            MIN_IDLE_TIME,
            id
        ) as any[];
        
        if (claimed && claimed.length > 0) {
            const [msgId, fields] = claimed[0];
            logger.warn({ msgId, count }, 'Moving poison message to DLQ');
            await redis.xadd(config.dlqStreamKey, '*', ...fields);
            await redis.xack(config.streamKey, config.consumerGroup, msgId);
        }
    }

  } catch (error) {
    logger.error({ error }, 'DLQ check failed');
  }
}
