# Ingestion Service

High-throughput event ingestion service for the OpenMonetize platform. This service is the entry point for all AI usage events, handling validation, authentication, cost calculation, and async processing.

## Features

- **High Throughput**: Target 10,000+ events/second with async queue processing
- **Batch Ingestion**: Accept 1-1000 events per request
- **Multi-tenant Isolation**: Enforce customer data separation
- **Idempotency**: Prevent duplicate event processing with idempotency keys
- **API Key Authentication**: Secure access with customer API keys
- **Rate Limiting**: Protect service with Redis-backed rate limits
- **Cost Calculation**: Automatic provider cost lookup and credit burning
- **Queue Processing**: BullMQ-powered async event processing with retries
- **Observability**: Structured logging with Pino

## Architecture

```
Client → API Gateway → Ingestion Service → BullMQ Queue → Event Processor
                             ↓                                    ↓
                         PostgreSQL ←──────────────────────────────
                             ↓
                       Credit Wallet (Burn)
```

## API Endpoints

### POST /v1/events/ingest

Ingest usage events in batch.

**Headers:**
- `x-api-key`: Customer API key (required)
- `content-type`: application/json

**Request Body:**
```json
{
  "events": [
    {
      "event_id": "123e4567-e89b-12d3-a456-426614174000",
      "customer_id": "cust_abc123",
      "user_id": "user_xyz789",
      "team_id": "team_def456",
      "event_type": "TOKEN_USAGE",
      "feature_id": "ai-text-generation",
      "provider": "OPENAI",
      "model": "gpt-4-turbo",
      "input_tokens": 1000,
      "output_tokens": 500,
      "timestamp": "2025-01-17T14:23:45Z",
      "metadata": {
        "endpoint": "/v1/chat/completions",
        "temperature": 0.7
      },
      "idempotency_key": "unique-request-id-123"
    }
  ]
}
```

**Event Fields:**
- `event_id` (required): UUID for the event
- `customer_id` (required): Customer identifier (must match authenticated customer)
- `user_id` (optional): End-user identifier
- `team_id` (optional): Team identifier for multi-team customers
- `event_type` (required): One of `TOKEN_USAGE`, `API_CALL`, `FEATURE_ACCESS`
- `feature_id` (required): Feature identifier
- `provider` (optional): AI provider - `OPENAI`, `ANTHROPIC`, `GOOGLE`, `COHERE`, `MISTRAL`
- `model` (optional): Model identifier (e.g., `gpt-4-turbo`)
- `input_tokens` (optional): Number of input tokens consumed
- `output_tokens` (optional): Number of output tokens generated
- `timestamp` (required): ISO 8601 timestamp
- `metadata` (optional): Additional event metadata
- `idempotency_key` (optional): Unique key to prevent duplicate processing

**Response (202 Accepted):**
```json
{
  "accepted": 1,
  "rejected": 0,
  "duplicates": 0,
  "batch_id": "batch_xyz789",
  "status": "processing",
  "processing_time_ms": 45
}
```

**Response Fields:**
- `accepted`: Number of events accepted for processing
- `rejected`: Number of events rejected (validation failures)
- `duplicates`: Number of duplicate events (same idempotency key)
- `batch_id`: Unique identifier for this batch
- `status`: Processing status - `processing`, `all_duplicates`
- `processing_time_ms`: Time taken to validate and enqueue events

**Error Responses:**

**401 Unauthorized:**
```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

**400 Bad Request:**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid event batch format",
  "details": {
    "events": {
      "_errors": ["Array must contain at least 1 element(s)"]
    }
  }
}
```

**403 Forbidden:**
```json
{
  "error": "FORBIDDEN",
  "message": "Events contain invalid customer_id. All events must belong to the authenticated customer."
}
```

**500 Internal Server Error:**
```json
{
  "error": "INTERNAL_ERROR",
  "message": "Failed to process events. Please try again later."
}
```

### GET /health

Health check endpoint.

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2025-01-17T14:23:45Z"
}
```

### GET /ready

Readiness check endpoint.

**Response (200 OK):**
```json
{
  "status": "ready",
  "timestamp": "2025-01-17T14:23:45Z",
  "services": {
    "database": "connected",
    "queue": "connected"
  }
}
```

### GET /v1/info

Service information endpoint.

**Response (200 OK):**
```json
{
  "service": "ingestion-service",
  "version": "0.1.0",
  "endpoints": {
    "health": "/health",
    "ready": "/ready",
    "ingest": "/v1/events/ingest"
  }
}
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
NODE_ENV=development
PORT=8081
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://admin:dev_password_change_in_production@localhost:5432/monetization?schema=public

# Redis
REDIS_URL=redis://localhost:6379

# Rate Limiting
RATE_LIMIT_MAX=1000           # Max requests per window
RATE_LIMIT_WINDOW_MS=60000    # Window duration (60 seconds)

# Queue Configuration
QUEUE_NAME=usage-events       # BullMQ queue name
QUEUE_CONCURRENCY=10          # Parallel job processing
```

## Development

### Prerequisites
- Node.js 20+
- PostgreSQL 15+ (running via Docker Compose)
- Redis 7+ (running via Docker Compose)
- pnpm 8+

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Ensure database and Redis are running:
```bash
cd ../.. # Navigate to platform root
docker-compose up -d postgres redis
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
pnpm dev
```

The service will start on `http://localhost:8081`.

### Available Scripts

```bash
pnpm dev      # Start development server with hot reload
pnpm build    # Build TypeScript to JavaScript
pnpm start    # Start production server
pnpm test     # Run tests
pnpm lint     # Run ESLint
```

## Event Processing Flow

1. **Validation**: Request validated against Zod schema
2. **Authentication**: API key validated against database
3. **Authorization**: Verify all events belong to authenticated customer
4. **Idempotency Check**: Query database for duplicate idempotency keys
5. **Enqueue**: Add new events to BullMQ queue
6. **Response**: Return 202 Accepted with batch ID
7. **Async Processing** (in worker):
   - Calculate cost using provider pricing
   - Store event in `usage_event` table
   - Burn credits from appropriate wallet
   - Create credit transaction record

## Cost Calculation

The service automatically calculates costs for `TOKEN_USAGE` events:

1. **Lookup Provider Costs**: Query `provider_cost` table for current rates
2. **Calculate USD**: `(tokens / unitSize) * costPerUnit` for input and output
3. **Convert to Credits**: Apply burn table conversion rate (default: 1000 credits = $1)
4. **Burn Credits**: Deduct from wallet (team → user → customer priority)

## Queue Processing

BullMQ configuration:
- **Concurrency**: 10 parallel workers (configurable)
- **Retries**: 3 attempts with exponential backoff
- **Rate Limit**: 100 jobs per second max
- **Retention**: Completed jobs kept for 24 hours, failed jobs for 7 days

## Monitoring

### Key Metrics

- **Throughput**: Events ingested per second
- **Latency**: P50, P95, P99 response times
- **Error Rate**: Failed requests / total requests
- **Queue Depth**: Waiting, active, failed job counts
- **Credit Burns**: Total credits burned per customer

### Logs

Structured JSON logs (Pino):
```json
{
  "level": "info",
  "time": 1705500225000,
  "msg": "Events ingested successfully",
  "customerId": "cust_abc123",
  "batchId": "batch_xyz789",
  "accepted": 5,
  "duplicates": 0,
  "processingTimeMs": 45
}
```

## Testing

### Manual Testing

1. Get a test API key from database:
```bash
docker exec -it openmonetize-postgres psql -U admin -d monetization -c "SELECT id, api_key_hash FROM customer LIMIT 1;"
```

2. Test event ingestion:
```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: om_test_your_key_here" \
  -d '{
    "events": [
      {
        "event_id": "123e4567-e89b-12d3-a456-426614174000",
        "customer_id": "your-customer-id",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 1000,
        "output_tokens": 500,
        "timestamp": "2025-01-17T14:23:45Z"
      }
    ]
  }'
```

### Integration Testing

Run the test suite:
```bash
pnpm test
```

## Performance

**Target Performance:**
- Throughput: 10,000+ events/second
- Latency (P95): < 50ms
- Availability: 99.9%
- Error rate: < 0.1%

**Optimization Tips:**
- Use batch ingestion (max 1000 events per request)
- Include idempotency keys to prevent duplicates
- Monitor queue depth and adjust concurrency

## Troubleshooting

### Service won't start

**Issue**: Configuration validation errors
```
ZodError: Invalid configuration
```

**Solution**: Check `.env` file has all required variables:
```bash
cat .env
```

### Database connection failed

**Issue**: Can't connect to PostgreSQL
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**: Ensure PostgreSQL is running:
```bash
docker-compose ps postgres
docker-compose up -d postgres
```

### Queue not processing events

**Issue**: Redis connection failed
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```

**Solution**: Ensure Redis is running:
```bash
docker-compose ps redis
docker-compose up -d redis
```

### High queue depth

**Issue**: Events accumulating in queue

**Solution**: Increase worker concurrency:
```bash
# In .env
QUEUE_CONCURRENCY=20
```

## Security

- **API Key Authentication**: All requests require valid API key
- **Rate Limiting**: Redis-backed rate limiting per IP
- **Helmet**: Security headers (XSS, CSRF protection)
- **CORS**: Configurable origin restrictions
- **Input Validation**: Strict Zod schema validation
- **SQL Injection**: Protected by Prisma ORM

## Next Steps

1. **Load Testing**: Use k6 or Artillery to test 10k events/sec
2. **Metrics**: Add Prometheus metrics for monitoring
3. **Alerting**: Set up alerts for queue depth, error rates
4. **Rate Limiting**: Implement per-customer rate limits
5. **Webhooks**: Add event delivery webhooks for customers
6. **Batch Status**: Add endpoint to query batch processing status

## Related Services

- **Common Package**: Shared types, schemas, utilities
- **Rating Engine**: Advanced cost calculation and burn rules
- **API Gateway**: Unified API surface (future)
- **Dashboard**: Usage analytics and reporting (future)

## License

Proprietary - OpenMonetize Platform
