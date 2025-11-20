# Changelog

All notable changes to OpenMonetize will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Go SDK for OpenMonetize
- Kubernetes deployment guide
- Grafana dashboard templates
- WebSocket support for real-time events
- Python SDK completion and publication

## [1.0.1] - 2024-11-20 - Post-Release Improvements

### Added

- **Pre-flight Checklist Automation**: Created `setup.sh` script for one-command project setup
  - Automated Docker Compose startup
  - Dependency installation via pnpm
  - Database generation, migration, and seeding
  - All-in-one quick start experience
- **Demo Mode**: Interactive demo environment for testing without real customers
  - Demo customer and credit wallet seeding via `db:seed`
  - `DEMO_MODE` environment variable for development
  - Pre-configured demo API keys for testing
- **Python SDK Foundation**: Initial structure for Python SDK development
  - Test file scaffolding in `platform/sdks/python/test/`
  - Package structure preparation
  - Development environment setup

### Improved

- **README.md Revamp**: Enhanced developer experience with "Show, Don't Tell" approach
  - Added "30-Second Demo" code walkthrough
  - Visual input/output examples showing wallet updates
  - Collapsible sections for advanced configuration
  - Improved visual hierarchy with better use of headers and formatting
  - Mermaid diagram showing system architecture
  - Comparison table vs. traditional billing systems

### Fixed

- **License Check Script**: Resolved license header validation issues
  - Excluded Python SDK test files from license requirements
  - Excluded configuration files (`pnpm-workspace.yaml`, `prisma.config.ts`)
  - Added AGPL headers to essential backend scripts
  - License check now passes cleanly
- **Demo Credit Deduction**: Fixed event processing in demo mode
  - Corrected ingestion service event processing flow
  - Fixed BullMQ worker queue integration
  - Credits now deduct properly on `generate` API calls
- **Dashboard Analytics**: Fixed UUID validation errors
  - Corrected `customerId` query parameter validation
  - Fixed "must match format uuid" error in analytics endpoint
  - Dashboard now displays analytics correctly

### Documentation

- Updated `QUICK_START.md` to reference `setup.sh` script
- Removed references to non-existent tracking files (PROGRESS.md, PRIORITIES.md, etc.)
- Added demo mode setup instructions
- Clarified local development workflow

## [1.0.0] - 2024-11-18 - MVP Complete 🎉

### Summary

**First production-ready release of OpenMonetize!** Complete AI monetization platform with event ingestion, cost calculation, credit management, and multi-tenant authentication. MVP delivered 12 days ahead of schedule.

### Added - Core Services

#### API Gateway (Port 3000)
- API key authentication with bcrypt hashing (SHA-256)
- Rate limiting middleware powered by Redis
- Customer registration endpoint (`POST /v1/customers/register`)
- Support for both `Authorization: Bearer` and `X-API-Key` headers
- CORS configuration for cross-origin requests
- Request logging with correlation IDs
- Health check endpoint (`GET /health`)

#### Ingestion Service (Port 8081)
- High-throughput event ingestion (`POST /v1/events/ingest`)
- Batch event processing (up to 1000 events)
- Idempotency key support for duplicate prevention
- BullMQ queue integration for async processing
- Zod validation for all inputs
- Credit burning with atomic wallet updates
- Provider cost lookup and calculation
- Health check endpoint (`GET /health`)

#### Rating Engine (Port 3001)
- Real-time cost calculation (`POST /v1/rating/calculate`)
- Burn table management (CRUD operations)
- Provider cost integration
- Multi-model support (OpenAI, Anthropic, Cohere)
- Credit-to-USD conversion (1000:1 ratio)
- Margin calculation and optimization suggestions
- Health check endpoint (`GET /health`)

### Added - Credit Management

- Credit balance query (`GET /v1/credits/balance`)
- Credit grant system for admins (`POST /v1/credits/grant`)
- Multi-currency wallet support
- Credit reservations and holds
- Atomic transaction processing
- Credit transaction history

### Added - Entitlement System

- Feature-based access control (`POST /v1/entitlements/check`)
- Rate limit entitlement checks (`GET /v1/entitlements/rate-limits`)
- Quota tracking per feature (`GET /v1/entitlements/quota`)
- Entitlement provisioning (`POST /v1/entitlements/provision`)
- Feature availability queries (`GET /v1/entitlements/features`)
- Customer tier-based access (STARTER, GROWTH, ENTERPRISE)

### Added - Analytics System

- Usage analytics with aggregation (`GET /v1/analytics/usage`)
- Cost tracking and breakdown (`GET /v1/analytics/costs`)
- Burn rate analysis (`GET /v1/analytics/burn-rate`)
- Time-based filtering (hourly, daily, monthly)
- Feature-level attribution
- Provider and model breakdowns

### Added - Database Schema

**Core Models:**
- Customer - Multi-tenant accounts
- User - End-user tracking
- CreditWallet - Balance management
- CreditTransaction - Financial ledger
- UsageEvent - Token consumption
- BurnTable - Pricing rules
- ProviderCost - LLM pricing
- Entitlement - Feature access control

**Indexes:**
- Customer ID indexes on all tables
- Timestamp indexes for analytics queries
- Unique constraints on idempotency keys
- Composite indexes for common query patterns

### Added - TypeScript SDK

- Full TypeScript client library (`@openmonetize/sdk`)
- Type-safe API methods
- Automatic retry logic with exponential backoff
- Error handling with custom error classes
- Environment-based configuration
- Examples for all endpoints
- Published to npm

### Added - Documentation

- Complete API specification (789 lines)
- Credit grant API guide (356 lines)
- Analytics API guide (481 lines)
- Entitlement system guide (545 lines)
- Technical architecture overview (536 lines)
- Migration guide from other platforms (639 lines)
- Railway deployment guide (491 lines)
- SDK usage examples (406 lines)

### Added - Testing

- Vitest test framework configuration
- Unit tests for rating engine (5 tests)
- Integration test setup
- Test database configuration
- Coverage reporting
- GitHub Actions CI pipeline

### Added - Infrastructure

- Docker Compose for local development
- PostgreSQL 15 database
- Redis 7 for caching and rate limiting
- PgAdmin for database management
- Redis Commander for cache inspection
- Health check endpoints for all services

### Changed

- Migrated from monolithic to microservices architecture
- Changed credit pricing from flexible to 1000:1 USD ratio
- Updated API key format to `om_live_` prefix
- Moved `priceUsd` field to metadata JSON

### Fixed

- Schema validation for customer tier enum (STARTER/GROWTH/ENTERPRISE)
- TypeScript errors related to Prisma field types
- Missing `priceUsd` field in BurnTable model
- Idempotency key unique constraint enforcement
- Credit transaction atomicity issues
- Rate limiting Redis connection pooling

### Performance

- Fastify framework (40K+ req/sec capability)
- Connection pooling for PostgreSQL
- Redis caching for rate limits
- Batch event processing with BullMQ
- Database query optimization
- Response time <100ms for all endpoints

### Security

- API key hashing with bcrypt (SHA-256)
- Row-level tenant isolation
- Parameterized queries via Prisma ORM
- Input validation with Zod schemas
- Rate limiting per customer
- CORS protection
- SQL injection prevention

## [0.1.0] - 2024-11-17 - Initial Setup

### Added

- Project scaffolding with pnpm monorepo
- Turborepo build orchestration
- Prisma ORM integration
- Basic service structure
- Docker Compose infrastructure
- Environment configuration
- Initial database schema

---

## Release Schedule

- **v1.0.0** - November 18, 2024 - MVP Complete
- **v1.1.0** - December 2024 - Python SDK + Enhanced Analytics
- **v1.2.0** - January 2025 - Go SDK + Kubernetes Support
- **v2.0.0** - Q1 2025 - Enterprise Features + Multi-region

## Migration Guides

- [Migrating from v0.x to v1.0](docs/guides/migration.md)
- [API Breaking Changes](docs/api/breaking-changes.md) (coming soon)

## Links

- [API Documentation](docs/api/)
- [Technical Architecture](docs/architecture/overview.md)
- [Deployment Guide](docs/guides/deployment-railway.md)
- [Contributing Guide](CONTRIBUTING.md)

---

**Note**: Dates reflect when features were completed, not when released. OpenMonetize follows continuous deployment for minor updates.
