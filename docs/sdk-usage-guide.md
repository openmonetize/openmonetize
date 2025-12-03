# Outcome-Based Metering with OpenMonetize SDKs

This guide demonstrates how to use the OpenMonetize SDKs to track outcome-based events beyond standard token usage.

## Node.js SDK

### Installation

```bash
npm install @openmonetize/sdk
```

### Initialization

```typescript
import { OpenMonetize } from '@openmonetize/sdk';

const client = new OpenMonetize({
  apiKey: process.env.OPENMONETIZE_API_KEY,
  baseUrl: 'https://api.openmonetize.io'
});
```

### Tracking Token Usage

```typescript
await client.trackTokenUsage({
  customer_id: 'cust_abc',
  user_id: 'user_456',
  feature_id: 'chat-completion',
  provider: 'OPENAI',
  model: 'gpt-4-turbo',
  input_tokens: 1000,
  output_tokens: 500
});
```

### Tracking Image Generation

```typescript
await client.trackImageGeneration({
  customer_id: 'cust_abc',
  user_id: 'user_456',
  feature_id: 'image-gen',
  provider: 'OPENAI',
  model: 'dall-e-3',
  image_count: 1,
  image_size: '1024x1024',
  quality: 'hd'
});
```

### Tracking Custom Events

```typescript
await client.trackCustomEvent({
  customer_id: 'cust_abc',
  user_id: 'user_456',
  feature_id: 'pdf-processing',
  unit_type: 'pages',
  quantity: 10
});
```

## Provider Integrations

The SDK provides helper functions to easily integrate with popular AI providers.

### OpenAI Integration

```typescript
import OpenAI from 'openai';
import { OpenMonetize, withOpenAITracking } from '@openmonetize/sdk';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });

// Wrap OpenAI calls with automatic tracking
const response = await withOpenAITracking(
  client,
  () => openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Write a legal brief' }]
  }),
  {
    customerId: 'cust_abc',
    userId: 'user_456',
    featureId: 'legal-research'
  }
);
```

### Anthropic Integration

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { OpenMonetize, withAnthropicTracking } from '@openmonetize/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const client = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });

const response = await withAnthropicTracking(
  client,
  () => anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Analyze this contract' }]
  }),
  {
    customerId: 'cust_abc',
    userId: 'user_456',
    featureId: 'contract-analysis'
  }
);
```

### Google (Gemini) Integration

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenMonetize, withGoogleTracking } from '@openmonetize/sdk';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const client = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });

const response = await withGoogleTracking(
  client,
  () => model.generateContent("Write a story"),
  {
    customerId: 'cust_abc',
    userId: 'user_456',
    featureId: 'story-generation',
    model: 'gemini-pro'
  }
);
```

### Generic Tracking Helper

For other providers or custom logic, use `trackUsage`:

```typescript
import { trackUsage } from '@openmonetize/sdk';

const response = await trackUsage(
  client,
  async () => {
    // Your custom AI call here
    return await myCustomAI.generate();
  },
  {
    customerId: 'cust_abc',
    userId: 'user_456',
    featureId: 'custom-feature',
    provider: 'CUSTOM_PROVIDER', // Will be uppercased automatically
    model: 'custom-model',
    inputTokens: 100,
    outputTokens: 50
  }
);
```

## Python SDK

### Installation

```bash
pip install openmonetize
```

### Initialization

```python
from openmonetize import ApiClient, EventsApi, CustomEvent, ImageGenerationEvent, TokenUsageEvent
from openmonetize.configuration import Configuration

config = Configuration()
config.api_key['bearerAuth'] = 'your-api-key'
config.host = 'https://api.openmonetize.io'

client = ApiClient(config)
events_api = EventsApi(client)
```

### Tracking Token Usage

```python
from datetime import datetime

event = TokenUsageEvent(
    event_id='evt_123',
    customer_id='cust_abc',
    user_id='user_456',
    feature_id='chat-completion',
    provider='openai',
    model='gpt-4-turbo',
    input_tokens=1000,
    output_tokens=500,
    timestamp=datetime.now().isoformat()
)

events_api.ingest(events=[event])
```

### Tracking Image Generation

```python
event = ImageGenerationEvent(
    event_id='evt_img_123',
    customer_id='cust_abc',
    user_id='user_456',
    feature_id='image-gen',
    provider='openai',
    model='dall-e-3',
    image_count=1,
    image_size='1024x1024',
    quality='hd',
    timestamp=datetime.now().isoformat()
)

events_api.ingest(events=[event])
```

### Tracking Custom Events

```python
event = CustomEvent(
    event_id='evt_custom_123',
    customer_id='cust_abc',
    user_id='user_456',
    feature_id='pdf-processing',
    unit_type='pages',
    quantity=10,
    timestamp=datetime.now().isoformat()
)

events_api.ingest(events=[event])
```

## Batch Event Ingestion

Both SDKs support batch ingestion for better performance:

### Node.js

```typescript
await client.flush(); // Flushes queued events
```

### Python

```python
events_api.ingest(events=[event1, event2, event3])
```

## Event Types

- **TOKEN_USAGE**: LLM token consumption
- **IMAGE_GENERATION**: Image generation (DALL-E, Midjourney, etc.)
- **CUSTOM**: Arbitrary metering units (pages, API calls, compute hours, etc.)

## Best Practices

1. **Use unique event IDs**: Prevent duplicate events with UUID or timestamp-based IDs
2. **Batch when possible**: Reduce API calls by batching events
3. **Set appropriate timestamps**: Use actual event occurrence time for accurate billing
4. **Track metadata**: Include context for debugging and analytics
