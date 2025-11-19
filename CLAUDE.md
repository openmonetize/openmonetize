# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenMonetize is an open-source AI monetization platform for consumption-based billing. It provides infrastructure for AI SaaS companies to track usage, calculate costs, manage credits, and bill customers based on actual AI consumption (tokens, API calls, etc.).

**Business Model**: AI SaaS companies (customers) use OpenMonetize to track their end-users' AI usage and bill accordingly. Think "smart meter for AI consumption."

**Key Terminology**:
- **Customer**: Your SaaS company using OpenMonetize
- **User**: Your customer's end-users
- **Provider**: AI providers (OpenAI, Anthropic, etc.)

## 📖 Documentation Structure

**Start Here**:
- **[README.md](README.md)** - Project introduction and high-level overview
- **[QUICK_START.md](QUICK_START.md)** - 5-minute setup guide with complete walkthrough
- **[platform/README.md](platform/README.md)** - Development setup and monorepo structure

**Architecture**:
- **[docs/architecture/overview.md](docs/architecture/overview.md)** - Complete system architecture
- **[docs/architecture/roadmap.md](docs/architecture/roadmap.md)** - Development roadmap

**API Documentation**:
- **[docs/api/overview.md](docs/api/overview.md)** - REST API reference
- **[docs/api/credits.md](docs/api/credits.md)** - Credit management
- **[docs/api/entitlements.md](docs/api/entitlements.md)** - Feature gating
- **[docs/api/analytics.md](docs/api/analytics.md)** - Usage analytics

**Deployment & Operations**:
- **[docs/guides/deployment-railway.md](docs/guides/deployment-railway.md)** - Railway deployment
- **[docs/guides/migration.md](docs/guides/migration.md)** - Migration from other platforms

## Architecture Quick Reference

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

**📖 Full Architecture Details**: See [docs/architecture/overview.md](docs/architecture/overview.md)

### Service Architecture

```
platform/packages/
├── common/              # Shared: Prisma client, types, validation schemas
├── api-gateway/         # Port 3000: Authentication, routing, rate limiting
├── ingestion-service/   # Port 8081: Event ingestion + BullMQ worker
├── rating-engine/       # Port 3001: Cost calculation, burn tables
└── sdk/                 # TypeScript client library

platform/sdks/
└── python/              # Python SDK (auto-generated from OpenAPI)
```

### Core Services

| Service | Port | Execution | Purpose |
|---------|------|-----------|---------|
| **API Gateway** | 3000 | Native `pnpm dev` | Authentication, routing, direct endpoints (credits, entitlements, analytics) |
| **Ingestion Service** | 8081 | Dockerized | Event ingestion, BullMQ worker, async processing |
| **Rating Engine** | 3001 | Native `pnpm dev` | Cost calculation, burn tables, analytics |

**Why Ingestion is Dockerized**: Complex BullMQ worker lifecycle, persistent queue connections, matches production. API Gateway and Rating Engine use hot reload for fast development iteration.

**📖 Detailed Service Docs**: See [platform/README.md](platform/README.md#architecture)

### Technology Stack

- **Language**: TypeScript 5.9+ with Node.js 20+
- **API Framework**: Fastify (40K+ req/sec)
- **Database**: PostgreSQL 15 via Prisma ORM
- **Queue System**: BullMQ (async job processing with retries and DLQ)
- **Cache/Queue Storage**: Redis 7
- **Validation**: Zod runtime type checking
- **Build**: Turborepo monorepo orchestration
- **Package Manager**: pnpm 8+ (required)

**📖 Infrastructure Details**: See [QUICK_START.md](QUICK_START.md#step-1-start-infrastructure-30-seconds)

## Database Architecture

**Core Concept**: Multi-tenant platform where each Customer has Users, CreditWallets, and usage tracking.

**Key Models**:
- `Customer` - Multi-tenant accounts with API keys
- `User` - End-users of customer applications
- `CreditWallet` - Balance tracking (team/user/customer levels)
- `CreditTransaction` - Immutable financial ledger
- `UsageEvent` - Token consumption records
- `BurnTable` - Pricing rules (credits per 1K tokens)
- `ProviderCost` - Real LLM provider pricing
- `Entitlement` - Feature access control

**📖 Complete Schema**: See [platform/packages/common/prisma/schema.prisma](platform/packages/common/prisma/schema.prisma)

**Wallet Hierarchy** (priority order):
1. Team Wallet → 2. User Wallet → 3. Customer Wallet

## Development Quick Reference

### Initial Setup

**📖 Full Instructions**: See [QUICK_START.md](QUICK_START.md)

```bash
cd platform
pnpm install
docker compose up -d
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

### Common Commands

```bash
# Start all services
pnpm dev

# Start individual service
pnpm --filter @openmonetize/api-gateway dev
pnpm --filter @openmonetize/ingestion-service dev  # (in Docker)
pnpm --filter @openmonetize/rating-engine dev

# Run tests
pnpm test
pnpm --filter @openmonetize/rating-engine test

# Database operations (from packages/common/)
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Create migration
npx prisma studio        # Visual editor (http://localhost:5555)

# Build for production
pnpm build
```

**📖 Complete Commands**: See [platform/README.md](platform/README.md) and [QUICK_START.md](QUICK_START.md)

## Critical Code Patterns

### Database Access

```typescript
import { getPrismaClient } from '@openmonetize/common';

const prisma = getPrismaClient();

// Always use transactions for multi-step operations
await prisma.$transaction([
  prisma.usageEvent.create({ ... }),
  prisma.creditWallet.update({ ... }),
  prisma.creditTransaction.create({ ... })
]);
```

### Event Processing Flow

**See Complete Flow**: [Ingestion service event-processor.ts](platform/packages/ingestion-service/src/services/event-processor.ts)

Key points:
- Events go to BullMQ queue (idempotent via `event_id` as `jobId`)
- Worker processes with 3 retries + exponential backoff
- Failed events → Dead Letter Queue (DLQ)
- Atomic transaction: UsageEvent + CreditTransaction + Wallet update

### BullMQ Queue (Ingestion Service Only)

**See Implementation**: [Ingestion service queue.ts](platform/packages/ingestion-service/src/queue.ts)

```typescript
import { getQueue, getDLQ, getQueueMetrics } from './queue';

// Enqueue event (automatic idempotency)
await queue.add('event', eventData, {
  jobId: event.event_id  // Duplicate events automatically ignored
});

// Check metrics
const metrics = await getQueueMetrics();
// { waiting, active, completed, failed, delayed, dlq, total }
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

### API Authentication

Services use Bearer token authentication:
- Header: `Authorization: Bearer om_live_xxxx`
- Hashed in `Customer.apiKeyHash`
- Rate limiting via Redis (per customer or IP fallback)

**See Implementation**: [API Gateway middleware](platform/packages/api-gateway/src/middleware/)

## Important Implementation Notes

### Multi-Tenancy
- **ALL** data is isolated by `customerId`
- Always filter queries by customer
- Index all `customerId` foreign keys
- Use row-level security patterns

### Idempotency
- BullMQ automatically enforces idempotency via `jobId`
- Each `event_id` processes exactly once
- Duplicate submissions ignored by queue

### Atomic Transactions
- Credit deductions wrapped in `prisma.$transaction()`
- Ensures: UsageEvent + CreditTransaction + Wallet update = all-or-nothing
- Prevents: Inconsistent balances, lost events, double charging

### Credit System
- Wallet hierarchy: Team → User → Customer (automatic fallback)
- BurnTable defines pricing rules
- ProviderCost tracks real USD costs
- Both credit cost AND USD cost recorded in UsageEvent

**📖 Credit API Details**: See [docs/api/credits.md](docs/api/credits.md)

## Health Checks

All services expose health endpoints:
```bash
curl http://localhost:3000/health    # API Gateway
curl http://localhost:8081/health    # Ingestion Service
curl http://localhost:3001/health    # Rating Engine
```

## API Documentation

**Interactive Swagger UI**: http://localhost:3000/docs

**REST API Reference**:
- [API Overview](docs/api/overview.md)
- [Credits API](docs/api/credits.md)
- [Entitlements API](docs/api/entitlements.md)
- [Analytics API](docs/api/analytics.md)

## Troubleshooting

**See Full Guide**: [QUICK_START.md - Troubleshooting](QUICK_START.md#-troubleshooting)

Quick fixes:
```bash
# Prisma client not generated
cd platform/packages/common && npx prisma generate

# Port already in use
lsof -i :3000 && kill -9 <PID>

# Database connection failed
docker compose restart postgres

# TypeScript errors after pulling
pnpm clean && pnpm build && pnpm db:generate
```

## Current Status (November 19, 2024)

- **Phase**: Production Readiness (MVP Complete) 🎉
- **Services**: All 3 services functional with BullMQ async processing
- **Queue System**: Automatic retries, Dead Letter Queue, idempotent processing
- **SDKs**: TypeScript (✅), Python (✅), Go (📋 planned)
- **Documentation**: Comprehensive guides and API reference

**📖 Full Status**: See [CHANGELOG.md](CHANGELOG.md)

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://admin:dev_password_change_in_production@localhost:5432/monetization?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# Service ports (auto-configured in dev)
PORT=3000          # API Gateway
INGESTION_PORT=8081
RATING_PORT=3001

# Environment
NODE_ENV=development
```

**📖 Complete Configuration**: See [platform/.env.example](platform/.env.example)

## Contributing

**📖 Contribution Guide**: See [CONTRIBUTING.md](CONTRIBUTING.md)

**Security Issues**: See [SECURITY.md](SECURITY.md) for vulnerability reporting

## License

- **Platform Services**: AGPLv3 (see [LICENSE](LICENSE))
- **SDKs**: MIT (see [platform/packages/sdk/LICENSE](platform/packages/sdk/LICENSE))
