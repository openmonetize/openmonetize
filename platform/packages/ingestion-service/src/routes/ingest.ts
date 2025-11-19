import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { validateApiKey } from '../middleware/auth';
import { checkIdempotency } from '../middleware/idempotency';
import { enqueueEvents } from '../services/event-processor';
import { logger } from '../logger';

// Event schema for validation
const eventSchema = z.object({
  event_id: z.string().uuid(),
  customer_id: z.string(),
  user_id: z.string().optional(),
  team_id: z.string().optional(),
  event_type: z.enum(['TOKEN_USAGE', 'API_CALL', 'FEATURE_ACCESS', 'IMAGE_GENERATION', 'CUSTOM']),
  feature_id: z.string(),
  provider: z.enum(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'COHERE', 'MISTRAL']).optional(),
  model: z.string().optional(),
  input_tokens: z.number().int().nonnegative().optional(),
  output_tokens: z.number().int().nonnegative().optional(),
  // Image generation fields
  image_count: z.number().int().positive().optional(),
  image_size: z.string().optional(),
  quality: z.string().optional(),
  // Custom event fields
  unit_type: z.string().optional(),
  quantity: z.number().positive().optional(),
  timestamp: z.string().datetime().or(z.date()),
  metadata: z.record(z.unknown()).optional(),
  idempotency_key: z.string().optional()
});

const batchSchema = z.object({
  events: z.array(eventSchema).min(1).max(1000)
});

interface IngestRequest {
  Body: {
    events: Array<any>;
  };
  Headers: {
    'x-api-key'?: string;
  };
}

export async function ingestEvents(
  request: FastifyRequest<IngestRequest>,
  reply: FastifyReply
) {
  const startTime = Date.now();

  try {
    // 1. Validate API key and get customer
    const apiKey = request.headers['x-api-key'];
    const customer = await validateApiKey(apiKey);

    if (!customer) {
      return reply.code(401).send({
        error: 'UNAUTHORIZED',
        message: 'Invalid or missing API key'
      });
    }

    // 2. Validate event batch schema
    const validation = batchSchema.safeParse(request.body);
    if (!validation.success) {
      logger.warn({ errors: validation.error.format() }, 'Validation failed');
      return reply.code(400).send({
        error: 'VALIDATION_ERROR',
        message: 'Invalid event batch format',
        details: validation.error.format()
      });
    }

    const { events } = validation.data;

    // 3. Verify all events belong to the authenticated customer
    const invalidEvents = events.filter(e => e.customer_id !== customer.id);
    if (invalidEvents.length > 0) {
      logger.warn(
        {
          customerId: customer.id,
          invalidCount: invalidEvents.length
        },
        'Events contain invalid customer_id'
      );
      return reply.code(403).send({
        error: 'FORBIDDEN',
        message: 'Events contain invalid customer_id. All events must belong to the authenticated customer.'
      });
    }

    // 4. Check idempotency
    const { newEvents, duplicateEvents } = await checkIdempotency(events);

    if (newEvents.length === 0) {
      return reply.code(200).send({
        accepted: 0,
        rejected: 0,
        duplicates: duplicateEvents.length,
        batch_id: null,
        status: 'all_duplicates',
        message: 'All events were duplicates'
      });
    }

    // 5. Enqueue events for processing
    const batchId = await enqueueEvents(newEvents, customer.id);

    const processingTime = Date.now() - startTime;

    logger.info({
      customerId: customer.id,
      batchId,
      accepted: newEvents.length,
      duplicates: duplicateEvents.length,
      processingTimeMs: processingTime
    }, 'Events ingested successfully');

    // 6. Return response
    return reply.code(202).send({
      accepted: newEvents.length,
      rejected: 0,
      duplicates: duplicateEvents.length,
      batch_id: batchId,
      status: 'processing',
      processing_time_ms: processingTime
    });
  } catch (error) {
    logger.error({ error }, 'Failed to ingest events');
    return reply.code(500).send({
      error: 'INTERNAL_ERROR',
      message: 'Failed to process events. Please try again later.'
    });
  }
}
