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

import { FastifyRequest, FastifyReply } from 'fastify';
import Redis from 'ioredis';
import { config } from '../config';
import { logger } from '../logger';

export async function getDLQItems(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const redis = new Redis(config.redisUrl);
  try {
    // Get items from DLQ stream
    const messages = await redis.xrange(config.dlqStreamKey, '-', '+', 'COUNT', 100);
    const count = await redis.xlen(config.dlqStreamKey);

    const items = messages.map(([id, fields]) => {
      // Parse fields
      const data: Record<string, any> = {};
      for (let i = 0; i < fields.length; i += 2) {
        const key = fields[i] as string;
        const value = fields[i + 1];
        data[key] = value;
      }
      
      // Try to parse nested data
      let parsedData = data;
      if (data.data && typeof data.data === 'string') {
        try {
          parsedData = JSON.parse(data.data);
        } catch {}
      }

      return {
        id,
        name: 'dlq-event',
        data: parsedData,
        timestamp: parseInt(id.split('-')[0] || '0'),
        failedReason: 'Poison message'
      };
    });

    await redis.quit();

    return reply.send({
      counts: { active: count },
      items
    });
  } catch (error) {
    logger.error({ error }, 'Failed to get DLQ items');
    if (redis) await redis.quit();
    return reply.code(500).send({ error: 'Failed to retrieve DLQ items' });
  }
}

export async function replayDLQ(
  request: FastifyRequest<{ Body: { jobIds?: string[] } }>,
  reply: FastifyReply
) {
  const redis = new Redis(config.redisUrl);
  try {
    const { jobIds } = request.body || {};
    let messages: [string, string[]][] = [];

    if (jobIds && jobIds.length > 0) {
      // Fetch specific messages (XRANGE for each)
      // Redis doesn't have MGET for streams, so we loop or pipeline
      // But XRANGE needs start/end. If we have IDs, we use ID ID.
      const pipeline = redis.pipeline();
      jobIds.forEach(id => pipeline.xrange(config.dlqStreamKey, id, id));
      const results = await pipeline.exec();
      
      if (results) {
        results.forEach(res => {
           if (!res[0] && res[1]) {
               const rangeRes = res[1] as [string, string[]][];
               if (rangeRes && rangeRes.length > 0 && rangeRes[0]) {
                   messages.push(rangeRes[0]);
               }
           }
        });
      }
    } else {
      // Replay all (up to 1000)
      messages = await redis.xrange(config.dlqStreamKey, '-', '+', 'COUNT', 1000) as [string, string[]][];
    }
    
    if (messages.length === 0) {
      await redis.quit();
      return reply.send({ message: 'No jobs to replay', count: 0 });
    }

    const pipeline = redis.pipeline();
    
    for (const [id, fields] of messages) {
      // Add back to main stream
      pipeline.xadd(config.streamKey, '*', ...fields);
      // Remove from DLQ
      pipeline.xdel(config.dlqStreamKey, id);
    }

    await pipeline.exec();
    await redis.quit();

    logger.info({ count: messages.length }, 'Replayed DLQ jobs');

    return reply.send({ 
      message: 'Jobs replayed successfully', 
      count: messages.length 
    });

  } catch (error) {
    logger.error({ error }, 'Failed to replay DLQ jobs');
    if (redis) await redis.quit();
    return reply.code(500).send({ error: 'Failed to replay jobs' });
  }
}
