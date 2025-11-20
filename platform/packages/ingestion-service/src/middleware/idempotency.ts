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

import { getPrismaClient } from '@openmonetize/common';
import { logger } from '../logger';

const db = getPrismaClient();

interface EventWithIdempotency {
  event_id: string;
  idempotency_key?: string;
  [key: string]: any;
}

export async function checkIdempotency(events: EventWithIdempotency[]) {
  const eventsWithKeys = events.filter(e => e.idempotency_key);

  if (eventsWithKeys.length === 0) {
    return {
      newEvents: events,
      duplicateEvents: []
    };
  }

  try {
    // Check for existing events with same idempotency keys
    const existingEvents = await db.usageEvent.findMany({
      where: {
        idempotencyKey: {
          in: eventsWithKeys.map(e => e.idempotency_key!)
        }
      },
      select: {
        idempotencyKey: true
      }
    });

    const existingKeys = new Set(
      existingEvents.map(e => e.idempotencyKey).filter(Boolean)
    );

    const newEvents = events.filter(
      e => !e.idempotency_key || !existingKeys.has(e.idempotency_key)
    );

    const duplicateEvents = events.filter(
      e => e.idempotency_key && existingKeys.has(e.idempotency_key)
    );

    if (duplicateEvents.length > 0) {
      logger.info(
        { count: duplicateEvents.length },
        'Duplicate events detected'
      );
    }

    return { newEvents, duplicateEvents };
  } catch (error) {
    logger.error({ error }, 'Idempotency check failed');
    // On error, process all events (fail open)
    return {
      newEvents: events,
      duplicateEvents: []
    };
  }
}
