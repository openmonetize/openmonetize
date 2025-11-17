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
