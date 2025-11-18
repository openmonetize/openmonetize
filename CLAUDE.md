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

### Service Architecture

```
platform/packages/
├── common/              # Shared: Prisma client, types, validation schemas
├── api-gateway/         # Port 3000: Authentication, routing, rate limiting
├── ingestion-service/   # Port 8081: High-throughput event ingestion
├── rating-engine/       # Port 3001: Cost calculation, burn tables
└── sdk/                 # TypeScript client library
```

### Technology Stack

- **Language**: TypeScript 5.9+ with Node.js 20+
- **API Framework**: Fastify (chosen for performance: 40K+ req/sec)
- **Database**: PostgreSQL 15 via Prisma ORM
- **Cache**: Redis 7 (rate limiting, session management)
- **Validation**: Zod for runtime type checking
- **Build**: Turborepo for monorepo orchestration
- **Package Manager**: pnpm 8+ (required)

### Infrastructure Services

Docker Compose manages:
- PostgreSQL (port 5432)
- Redis (port 6379)
- PgAdmin (port 5050) - DB GUI
- Redis Commander (port 8001) - Redis GUI

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

### Credit System

The credit system is the financial core:
1. **BurnTable** defines pricing (e.g., 1.5 credits per 1K input tokens for GPT-4)
2. **UsageEvent** records consumption
3. **CreditTransaction** atomically deducts credits
4. **CreditWallet** maintains balance

**Transaction Flow**:
```typescript
// Atomic credit deduction
await prisma.$transaction([
  // Create usage event
  prisma.usageEvent.create({ ... }),
  // Create debit transaction
  prisma.creditTransaction.create({ ... }),
  // Update wallet balance
  prisma.creditWallet.update({ ... })
]);
```

### Idempotency

Event ingestion MUST be idempotent:
- Use `idempotency_key` field on UsageEvent
- Check for duplicates before processing
- Return cached response for duplicate requests

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
- **[PRIORITIES.md](PRIORITIES.md)** - Current sprint tasks and blockers
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and completed milestones
- **[QUICK_START.md](QUICK_START.md)** - Quick start guide for new developers
- **[Implementation Roadmap](docs/architecture/roadmap.md)** - Development roadmap and future plans

**Quick Summary** (as of November 18, 2024):
- **Phase**: Production Readiness (MVP 100% Complete) 🎉
- **Status**: All core services functional, comprehensive documentation complete
- **Services Running**: api-gateway (3000), ingestion-service (8081), rating-engine (3001)
- **Current Focus**: Community building, SDK expansion (Python, Go)

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
- **[PRIORITIES.md](PRIORITIES.md)**: Current sprint tasks and blockers

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
