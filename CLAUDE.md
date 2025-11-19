# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenMonetize is an open-source AI monetization platform for consumption-based billing. It provides infrastructure for AI SaaS companies to track usage, calculate costs, manage credits, and bill customers based on actual AI consumption (tokens, API calls, etc.).

**Business Model**: AI SaaS companies (customers) use OpenMonetize to track their end-users' AI usage and bill accordingly. Think "smart meter for AI consumption."

**Key Terminology**:
- **Customer**: Your SaaS company using OpenMonetize
- **User**: Your customer's end-users
- **Provider**: AI providers (OpenAI, Anthropic, etc.)

## Architecture

This is a **pnpm monorepo** using **Turborepo** for build orchestration.

### High-Level Data Flow

```
Your App → SDK → API Gateway (3000)
              ↓
         Ingestion Service (8081)
              ↓
         BullMQ Queue (Redis)
              ↓
         Background Worker
              ↓
    ┌─────────┴─────────┐
    ↓                   ↓
Cost Calculator    Rating Engine (3001)
    ↓                   ↓
PostgreSQL (atomic transaction)
```

### Service Architecture

```
platform/packages/
├── common/              # Shared: Prisma client, types, validation schemas
├── api-gateway/         # Port 3000: Authentication, routing, rate limiting
├── ingestion-service/   # Port 8081: Event ingestion + BullMQ worker
├── rating-engine/       # Port 3001: Cost calculation, burn tables
└── sdk/                 # TypeScript client library
```

### Detailed Service Descriptions

#### 1. API Gateway (Port 3000)
**Execution**: Native `pnpm dev` (hot reload with `tsx watch`)

**Responsibilities**:
- **Authentication**: Bearer token validation (`Authorization: Bearer <key>`)
- **Rate Limiting**: Redis-backed (per customer or IP fallback)
- **Direct Routes**:
  - `/v1/credits/*` - Wallet management and credit operations
  - `/v1/entitlements/*` - Feature gates and access control
  - `/v1/analytics/*` - Usage, costs, and burn-rate analytics
  - `/v1/customers/*` - Customer registration and management
  - `/v1/demo/*` - Demo endpoints
- **Proxy Routes**: Forwards requests to ingestion-service and rating-engine
- **Swagger Documentation**: Interactive API docs at `http://localhost:3000/docs`

#### 2. Ingestion Service (Port 8081)
**Execution**: Dockerized (only service in docker-compose.yml)

**Why Dockerized?**: Complex BullMQ worker lifecycle, persistent queue connections, matches production behavior

**Responsibilities**:
- **Event Ingestion**: Accept usage event batches
- **Queue Management**: BullMQ with Redis backend
  - Queue: `events` (active processing)
  - DLQ: `events-dlq` (failed jobs after retries)
- **Background Worker**:
  - Concurrency: 10 jobs/second (configurable)
  - Retries: 3 attempts with exponential backoff (1s, 2s, 4s)
  - Idempotency: Uses `event_id` as BullMQ job ID
- **Event Processing**:
  1. Calculate cost (via cost-calculator service)
  2. Store `UsageEvent` in PostgreSQL
  3. Atomically burn credits from `CreditWallet`
  4. Create `CreditTransaction` audit record

**Key Routes**:
- `POST /v1/events/ingest` - Ingest event batches (returns batch_id)
- `GET /v1/events/dlq` - View Dead Letter Queue
- `POST /v1/events/dlq/replay` - Retry failed events
- `GET /v1/events/info` - Service information and queue metrics

#### 3. Rating Engine (Port 3001)
**Execution**: Native `pnpm dev` (hot reload with `tsx watch`)

**Responsibilities**:
- **Burn Tables**: CRUD operations for pricing rules
- **Cost Calculation**:
  - Query `BurnTable` for model pricing
  - Query `ProviderCost` for real provider rates
  - Calculate: `(tokens × burn_rate) × provider_cost = credits`
- **Analytics**: Cost breakdown, usage trends, top users
- **Credits Management**: Credit operations (NEW feature)

**Key Routes**:
- `/v1/burn-tables/*` - Manage pricing rules (CRUD)
- `/v1/rating/calculate` - Single cost calculation
- `/v1/rating/bulk-calculate` - Batch calculations
- `/v1/analytics/*` - Cost analytics and usage trends
- `/v1/credits/*` - Credit management

### Technology Stack

- **Language**: TypeScript 5.9+ with Node.js 20+
- **API Framework**: Fastify (chosen for performance: 40K+ req/sec)
- **Database**: PostgreSQL 15 via Prisma ORM
- **Cache/Queue**: Redis 7 (rate limiting, BullMQ storage)
- **Queue System**: BullMQ (async job processing with retries and DLQ)
- **Validation**: Zod for runtime type checking
- **Build**: Turborepo for monorepo orchestration
- **Package Manager**: pnpm 8+ (required)
- **Hot Reload**: tsx watch (api-gateway and rating-engine only)

### Infrastructure Services

Docker Compose manages:
- **PostgreSQL** (port 5432) - Primary database
- **Redis** (port 6379) - Cache + BullMQ queue storage
- **PgAdmin** (port 5050) - DB GUI
- **Redis Commander** (port 8001) - Redis GUI
- **Ingestion Service** (port 8081) - Containerized worker service

**Note**: API Gateway and Rating Engine run via `pnpm dev` for fast iteration with hot reload.

### SDKs

#### TypeScript SDK (`@openmonetize/sdk`)
- **Location**: `platform/packages/sdk/`
- **License**: MIT (permissive for client apps)
- **Methods**: Event ingestion, credit management, analytics queries
- **Status**: ✅ Production-ready

#### Python SDK
- **Location**: `platform/sdks/python/`
- **License**: MIT (permissive for client apps)
- **Auto-generated**: From OpenAPI spec via openapi-generator
- **Status**: ✅ Available and functional

#### Go SDK
- **Status**: 📋 Planned for future release

## Database Architecture

**Core Concept**: Multi-tenant platform where each Customer has Users, CreditWallets, and usage tracking.

**Key Models** (see `platform/packages/common/prisma/schema.prisma`):
- `Customer`: Multi-tenant accounts with API keys and tier levels
- `User`: End-users of customer applications
- `CreditWallet`: Balance tracking with reservations and multi-currency
- `CreditTransaction`: Immutable financial ledger
- `BurnTable`: Configurable pricing rules (credits per 1K tokens)
- `ProviderCost`: Real LLM provider pricing (OpenAI, Anthropic, etc.)
- `UsageEvent`: Token usage with cost attribution
- `Entitlement`: Feature access control and limits

**Important**: All database operations use Prisma. The client is instantiated via `getPrismaClient()` from `@openmonetize/common`.

## Development Commands

### Initial Setup

```bash
# From repository root
cd platform

# Install dependencies (use pnpm, not npm)
pnpm install

# Start infrastructure
docker compose up -d

# Wait for health checks (check with: docker compose ps)
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed initial data (provider costs, sample customer)
pnpm db:seed
```

### Development

```bash
# Start all services in development mode
pnpm dev

# Start individual service
pnpm --filter @openmonetize/api-gateway dev
pnpm --filter @openmonetize/ingestion-service dev
pnpm --filter @openmonetize/rating-engine dev

# Run tests
pnpm test

# Run tests for specific package
pnpm --filter @openmonetize/rating-engine test

# Run tests in watch mode
pnpm test --watch

# Lint code
pnpm lint

# Build all packages
pnpm build
```

### Database Operations

```bash
# All database commands run from packages/common directory
cd platform/packages/common

# Generate Prisma client after schema changes
npx prisma generate

# Create new migration
npx prisma migrate dev --name add_new_field

# Deploy migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (visual database editor)
npx prisma studio
# Opens at http://localhost:5555

# Reset database (DANGEROUS - deletes all data)
npx prisma migrate reset
```

**Important**: Always run Prisma commands with the DATABASE_URL environment variable. The seed script uses:
```bash
DATABASE_URL="postgresql://admin:dev_password_change_in_production@localhost:5432/monetization?schema=public"
```

### Docker Management

```bash
# View logs
docker compose logs -f postgres
docker compose logs -f redis

# Restart service
docker compose restart postgres

# Stop all services
docker compose down

# Stop and remove volumes (DANGEROUS - deletes data)
docker compose down -v

# Check service health
docker compose ps
```

## Code Organization Patterns

### Shared Code (`@openmonetize/common`)

The `common` package exports:
- Prisma client and generated types
- Zod validation schemas
- Shared utilities and constants
- Database connection management

**Import pattern**:
```typescript
import { getPrismaClient, ProviderName, EventType } from '@openmonetize/common';
```

### Service Structure

Each service follows this pattern:
```
src/
├── index.ts           # Fastify app initialization
├── config.ts          # Environment configuration
├── logger.ts          # Pino logger setup
├── routes/            # Route handlers by feature
│   ├── health.ts
│   └── [feature].ts
├── services/          # Business logic
└── middleware/        # Fastify middleware
```

### Route Handlers

Fastify routes use async/await with TypeScript:

```typescript
export async function myRoutes(app: FastifyInstance) {
  app.post('/endpoint', async (request, reply) => {
    // Validation with Zod
    const schema = z.object({ ... });
    const data = schema.parse(request.body);

    // Business logic
    const result = await someOperation(data);

    return reply.code(200).send(result);
  });
}
```

### Error Handling

Services use structured error handling:
- Return proper HTTP status codes
- Include error messages in response body
- Log errors with context using Pino logger

## Testing Strategy

- **Framework**: Vitest (configured in `@openmonetize/common`)
- **Test Location**: `src/__tests__/` or co-located `*.test.ts` files
- **Coverage Target**: >80% for critical business logic

Run tests with: `pnpm test` or `pnpm --filter <package> test`

## Important Implementation Notes

### Complete Event Processing Flow

**Scenario**: Track GPT-4 usage

```typescript
// 1. Your App → SDK → API Gateway (3000) → Ingestion Service (8081)
await sdk.events.ingest([{
  event_id: "evt_123",
  customer_id: "cust_1",
  user_id: "user_1",
  event_type: "TOKEN_USAGE",
  feature_id: "chat_completion",
  provider: "openai",
  model: "gpt-4-turbo",
  input_tokens: 1500,
  output_tokens: 500,
  timestamp: "2024-11-19T10:00:00Z"
}]);

// 2. Ingestion Service:
//    - Validates idempotency_key
//    - Adds to BullMQ queue with jobId = event_id
//    - Returns 202 Accepted { batch_id: "..." }

// 3. Background Worker (in ingestion-service):
//    - Picks job from Redis queue
//    - Calls cost-calculator:
//        a) Query BurnTable for gpt-4-turbo pricing
//        b) Calculate: (1500 × input_rate) + (500 × output_rate) = credits
//        c) Query ProviderCost for real USD cost

// 4. Atomic Transaction (PostgreSQL):
await db.$transaction([
  // Insert UsageEvent
  db.usageEvent.create({
    id: "evt_123",
    customerId: "cust_1",
    inputTokens: 1500,
    outputTokens: 500,
    creditsBurned: 25,  // Calculated credits
    costUsd: 0.0375     // Real USD cost
  }),

  // Find wallet (priority: team → user → customer)
  db.creditWallet.findFirst({
    where: {
      customerId: "cust_1",
      // Tries: teamId → userId → customer-level
    }
  }),

  // Burn credits
  db.creditWallet.update({
    where: { id: wallet.id },
    data: { balance: { decrement: 25 } }
  }),

  // Audit log
  db.creditTransaction.create({
    walletId: wallet.id,
    transactionType: "BURN",
    amount: -25,
    balanceBefore: 100,
    balanceAfter: 75
  })
]);

// 5. On Success: Worker logs completion, job removed from queue
// 6. On Failure: Auto-retry up to 3 times → then move to DLQ
```

### Credit System

The credit system is the financial core:
1. **BurnTable** defines pricing (e.g., 1.5 credits per 1K input tokens for GPT-4)
2. **ProviderCost** stores real provider pricing (OpenAI/Anthropic rates)
3. **UsageEvent** records consumption with both credit cost and USD cost
4. **CreditTransaction** atomically deducts credits (immutable audit log)
5. **CreditWallet** maintains balance with multi-level hierarchy

**Wallet Hierarchy** (priority order):
1. **Team Wallet** - If `teamId` provided, use team's wallet
2. **User Wallet** - If `userId` provided (no team), use user's wallet
3. **Customer Wallet** - Fallback to customer-level wallet

**Atomic Transaction Flow**:
- All operations wrapped in `prisma.$transaction()`
- Ensures: UsageEvent + CreditTransaction + Wallet update = all-or-nothing
- Prevents: Inconsistent balances, lost events, double charging

### Idempotency

Event ingestion is idempotent via BullMQ:
- Uses `event_id` as BullMQ `jobId`
- Duplicate submissions with same `event_id` are automatically ignored by BullMQ
- Each event processes exactly once
- Optional `idempotency_key` field in UsageEvent for additional tracking

**How it works**:
```typescript
// BullMQ automatically enforces idempotency
await queue.add('event', eventData, {
  jobId: event.event_id  // If job with this ID exists, it's skipped
});
```

### API Authentication

Services use API key authentication:
- Header: `X-API-Key: om_live_xxxx`
- Hashed and stored in `Customer.apiKeyHash`
- Rate limiting by customer_id via Redis

### Multi-Tenancy

All data is isolated by `customerId`:
- Always filter queries by customer
- Index all `customerId` foreign keys
- Use row-level security patterns

## Environment Variables

Copy `.env.example` to `.env` in the `platform/` directory:

```bash
# Database
DATABASE_URL="postgresql://admin:dev_password_change_in_production@localhost:5432/monetization?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# Service ports
PORT=3000          # API Gateway
INGESTION_PORT=8081
RATING_PORT=3001

# Environment
NODE_ENV=development
```

## Current Development Status

**For detailed status, see:**
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and completed milestones
- **[QUICK_START.md](QUICK_START.md)** - Quick start guide for new developers
- **[Implementation Roadmap](docs/architecture/roadmap.md)** - Development roadmap and future plans

**Quick Summary** (as of November 19, 2024):
- **Phase**: Production Readiness (MVP Complete) 🎉
- **Status**: All core services functional with BullMQ async processing
- **Services Running**:
  - api-gateway (3000) - Native execution with hot reload
  - ingestion-service (8081) - Dockerized with BullMQ worker
  - rating-engine (3001) - Native execution with hot reload
- **Queue System**: BullMQ with automatic retries and Dead Letter Queue
- **SDKs Available**: TypeScript (✅), Python (✅), Go (📋 planned)
- **Current Focus**: Community building, SDK expansion

## Health Checks

All services expose health endpoints:
```bash
curl http://localhost:3000/health    # API Gateway
curl http://localhost:8081/health    # Ingestion Service
curl http://localhost:3001/health    # Rating Engine

# Response: {"status": "healthy"}
```

## Common Patterns

### Accessing Database

```typescript
import { getPrismaClient } from '@openmonetize/common';

const prisma = getPrismaClient();

// Always use transactions for multi-step operations
await prisma.$transaction([
  prisma.model1.create({ ... }),
  prisma.model2.update({ ... })
]);
```

### Validation

```typescript
import { z } from 'zod';
import { ProviderName, EventType } from '@openmonetize/common';

const schema = z.object({
  provider: z.nativeEnum(ProviderName),
  eventType: z.nativeEnum(EventType),
  inputTokens: z.number().int().positive()
});

const validated = schema.parse(input);
```

### Logging

```typescript
import { logger } from './logger';

logger.info({ customerId, eventId }, 'Processing usage event');
logger.error({ err: error, context }, 'Operation failed');
```

### BullMQ Queue Management

**Queue Access** (ingestion-service only):
```typescript
import { getQueue, getDLQ, getQueueMetrics } from './queue';

// Add job to queue
const queue = getQueue();
await queue.add('event', eventData, {
  jobId: event.event_id,  // Ensures idempotency
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 1000
  }
});

// Check queue metrics
const metrics = await getQueueMetrics();
// Returns: { waiting, active, completed, failed, delayed, dlq, total }

// Access Dead Letter Queue
const dlq = getDLQ();
const failedJobs = await dlq.getJobs(['waiting']);

// Replay failed job
await dlq.getJob(jobId);
await queue.add('event', job.data);  // Re-add to main queue
```

**Worker Event Handlers**:
```typescript
// In queue.ts
eventWorker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Event processed successfully');
});

eventWorker.on('failed', async (job, err) => {
  logger.error({ jobId: job.id, error: err }, 'Event processing failed');

  // If retries exhausted, move to DLQ
  if (job.attemptsMade >= 3) {
    await dlqQueue.add(job.name, {
      ...job.data,
      _original_error: err.message,
      _failed_at: new Date().toISOString()
    });
  }
});
```

**Background Worker Architecture**:
- **Concurrency**: Processes multiple jobs in parallel (default: 10)
- **Rate Limiting**: Max 100 jobs per second
- **Retry Strategy**: Exponential backoff (1s → 2s → 4s)
- **Job Retention**:
  - Completed: Keep last 1000 jobs for 24 hours
  - Failed: Keep last 5000 jobs indefinitely (DLQ)

## Development Workflow

### Why is Only Ingestion Service Containerized?

**Design Decision**: Optimize for development speed while maintaining production parity where it matters.

**Ingestion Service (Dockerized)**:
- ✅ Complex BullMQ worker lifecycle (queue initialization, worker management, graceful shutdown)
- ✅ Persistent Redis queue connections
- ✅ Background processing isolation
- ✅ Matches production deployment behavior
- ✅ Automatic container restart on failure

**API Gateway & Rating Engine (Native `pnpm dev`)**:
- ✅ **Instant hot reload** with `tsx watch` (edit → save → instant restart)
- ✅ Fast iteration cycles (no Docker build overhead)
- ✅ Easier debugging (direct process access, native debugger)
- ✅ Simple HTTP servers (no complex worker lifecycle)
- ✅ ~5 second startup vs ~30 second Docker build

**Trade-offs**:

| Aspect | Dockerized | Native (pnpm dev) |
|--------|-----------|-------------------|
| **Hot reload** | ❌ Requires rebuild | ✅ Instant (<1s) |
| **Startup time** | ❌ ~30s build | ✅ <5s |
| **Consistency** | ✅ Matches production | ⚠️ Dev environment |
| **Debugging** | ⚠️ Attach debugger | ✅ Native tools |
| **Background jobs** | ✅ Isolated workers | ⚠️ Can interfere |
| **Resource isolation** | ✅ CPU/memory limits | ❌ Shares host |

**When to Fully Containerize**:
- Production deployments
- CI/CD pipeline testing
- Integration testing
- Staging environments

**Note**: All services have Dockerfiles and can be containerized if needed. The current setup prioritizes developer experience during active development.

## Troubleshooting

### "Prisma client not generated"
```bash
cd platform/packages/common
npx prisma generate
```

### Port already in use
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database connection failed
```bash
# Check PostgreSQL is running
docker compose ps postgres

# Should show "healthy"
# Restart if needed
docker compose restart postgres
```

### TypeScript errors after pulling
```bash
pnpm clean
pnpm build
pnpm db:generate
```

## Documentation

### Root Documentation
- **[README.md](README.md)**: Project introduction and overview
- **[QUICK_START.md](QUICK_START.md)**: 5-minute setup guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Contribution guidelines
- **[SECURITY.md](SECURITY.md)**: Security policy and vulnerability reporting
- **[CHANGELOG.md](CHANGELOG.md)**: Version history and release notes

### API Documentation
- **[API Overview](docs/api/overview.md)**: Complete REST API reference
- **[Credits API](docs/api/credits.md)**: Credit management and grants
- **[Entitlements API](docs/api/entitlements.md)**: Feature gating and access control
- **[Analytics API](docs/api/analytics.md)**: Usage tracking and cost reporting

### Guides
- **[Migration Guide](docs/guides/migration.md)**: Migrate from other platforms
- **[Railway Deployment](docs/guides/deployment-railway.md)**: Deploy to Railway

### Architecture
- **[Architecture Overview](docs/architecture/overview.md)**: System design and components
- **[Implementation Roadmap](docs/architecture/roadmap.md)**: Development roadmap

### Platform Development
- **[Platform README](platform/README.md)**: Development setup
- **[Common Package](platform/packages/common/README.md)**: Shared utilities
- **[SDK Package](platform/packages/sdk/README.md)**: TypeScript SDK
