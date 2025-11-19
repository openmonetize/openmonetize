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
  event_id: 'evt_123',
  customer_id: 'cust_abc',
  user_id: 'user_456',
  feature_id: 'chat-completion',
  provider: 'openai',
  model: 'gpt-4-turbo',
  input_tokens: 1000,
  output_tokens: 500,
  timestamp: new Date()
});
```

### Tracking Image Generation

```typescript
await client.trackCustomEvent({
  event_id: 'evt_img_123',
  customer_id: 'cust_abc',
  user_id: 'user_456',
  event_type: 'IMAGE_GENERATION',
  feature_id: 'image-gen',
  provider: 'openai',
  model: 'dall-e-3',
  image_count: 1,
  image_size: '1024x1024',
  quality: 'hd',
  timestamp: new Date()
});
```

### Tracking Custom Events

```typescript
await client.trackCustomEvent({
  event_id: 'evt_custom_123',
  customer_id: 'cust_abc',
  user_id: 'user_456',
  event_type: 'CUSTOM',
  feature_id: 'pdf-processing',
  unit_type: 'pages',
  quantity: 10,
  timestamp: new Date()
});
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
