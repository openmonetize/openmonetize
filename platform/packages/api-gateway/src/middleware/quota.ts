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
import { getRedisClient } from '../utils/redis';
import { logger } from '../logger';
import { AuthenticatedRequest } from './auth';

const QUOTA_LIMITS = {
  STARTER: 10000, // 10k events per month
  GROWTH: 100000, // 100k events per month
  ENTERPRISE: Infinity,
};

export async function checkQuota(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const authRequest = request as AuthenticatedRequest;
  
  // Skip if no customer attached (should be handled by auth middleware, but safety first)
  if (!authRequest.customer) {
    return;
  }

  const { id: customerId, tier } = authRequest.customer;
  const limit = QUOTA_LIMITS[tier as keyof typeof QUOTA_LIMITS] || QUOTA_LIMITS.STARTER;

  // If unlimited, skip check
  if (limit === Infinity) {
    return;
  }

  const redis = getRedisClient();
  const date = new Date();
  const key = `quota:${customerId}:${date.getFullYear()}-${date.getMonth() + 1}`;

  try {
    // Get current usage
    const usage = await redis.get(key);
    const currentCount = usage ? parseInt(usage, 10) : 0;

    // Check if we are ingesting a batch
    const body = request.body as { events?: any[] };
    const eventCount = Array.isArray(body?.events) ? body.events.length : 1;

    if (currentCount + eventCount > limit) {
      logger.warn(
        { customerId, tier, currentCount, eventCount, limit },
        'Quota exceeded'
      );
      
      return reply.status(402).send({
        error: 'Payment Required',
        message: `Monthly quota exceeded (${limit} events). Please upgrade your plan.`,
        details: {
          currentUsage: currentCount,
          limit: limit,
          period: `${date.getFullYear()}-${date.getMonth() + 1}`
        }
      });
    }

    // Increment usage
    // We increment AFTER the check. Ideally this should be atomic (INCR), but for a check-then-act pattern
    // in a distributed system, we might over-count slightly or allow a slight burst, which is fine for soft quotas.
    // To be stricter, we can INCR first and then check, but we don't want to increment if the request fails validation later?
    // Actually, for rate limiting/quotas, usually you count attempts or successful ingests.
    // Let's count attempts that pass this middleware.
    
    // We will use INCRBY to be atomic
    const newCount = await redis.incrby(key, eventCount);
    
    // Set expiry to 40 days (ensure it covers the month + buffer) if it's a new key
    if (newCount === eventCount) {
      await redis.expire(key, 60 * 60 * 24 * 40);
    }

    // Double check after increment (in case of race condition)
    if (newCount > limit) {
       // We technically allowed it by incrementing, but we can block now.
       // Or we can decr back.
       // For simplicity, if it's over, we block. The user might have gone slightly over.
       return reply.status(402).send({
        error: 'Payment Required',
        message: `Monthly quota exceeded (${limit} events). Please upgrade your plan.`,
      });
    }

    // Add header for visibility
    reply.header('X-Monthly-Quota-Remaining', Math.max(0, limit - newCount));
    
  } catch (error) {
    logger.error({ err: error }, 'Error checking quota');
    // Fail open or closed?
    // Fail open for MVP to avoid blocking users if Redis blips
    return;
  }
}
