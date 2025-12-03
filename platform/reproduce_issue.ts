
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// --- Gateway Schema (from platform/packages/api-gateway/src/routes/ingestion.ts) ---

const EventSchema = z.object({
  event_id: z.string().uuid(),
  customer_id: z.string().optional(),
  user_id: z.string().optional(),
  team_id: z.string().optional(),
  event_type: z.enum(['TOKEN_USAGE', 'API_CALL', 'FEATURE_ACCESS', 'IMAGE_GENERATION', 'CUSTOM']),
  feature_id: z.string(),
  provider: z.enum(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'COHERE', 'MISTRAL']).optional(),
  model: z.string().optional(),
  input_tokens: z.number().int().nonnegative().optional(),
  output_tokens: z.number().int().nonnegative().optional(),
  image_count: z.number().int().positive().optional(),
  image_size: z.string().optional(),
  quality: z.string().optional(),
  unit_type: z.string().optional(),
  quantity: z.number().positive().optional(),
  timestamp: z.string().datetime().or(z.date()),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string().optional(),
});

const BatchSchema = z.object({
  events: z.array(EventSchema).min(1).max(1000),
});

// --- SDK Event Construction (mimicking platform/packages/sdk/src/client.ts) ---

function createSdkEvent() {
  const params = {
    user_id: 'test-user',
    feature_id: 'test-feature',
    provider: 'OPENAI' as const,
    model: 'gpt-4',
    input_tokens: 100,
    output_tokens: 50,
    metadata: { foo: 'bar' }
  };

  return {
    event_id: uuidv4(),
    customer_id: 'CUSTOMER_ID_REQUIRED',
    user_id: params.user_id,
    event_type: 'TOKEN_USAGE',
    feature_id: params.feature_id,
    provider: params.provider,
    model: params.model,
    input_tokens: params.input_tokens,
    output_tokens: params.output_tokens,
    timestamp: new Date().toISOString(),
    metadata: params.metadata,
  };
}

// --- Validation ---

async function run() {
  const event = createSdkEvent();
  const batch = { events: [event] };

  console.log('Testing payload:', JSON.stringify(batch, null, 2));

  const result = BatchSchema.safeParse(batch);

  if (result.success) {
    console.log('✅ Validation Passed');
  } else {
    console.error('❌ Validation Failed');
    console.error(JSON.stringify(result.error.format(), null, 2));
  }
}

run();
