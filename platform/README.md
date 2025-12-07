# OpenMonetize Platform

**Open-source AI monetization infrastructure for the post-SaaS era**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](../LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)

## Overview

OpenMonetize is a comprehensive, open-source platform for AI-driven consumption-based billing. It solves the fundamental problem that flat-rate SaaS pricing no longer works for AI products with high variable costs.

### 🎯 Who This Is For

**You are an AI SaaS company** (e.g., AI legal assistant, AI coding tool, AI sales platform) and:

- ✅ You pay OpenAI/Anthropic directly for API usage
- ✅ You need to track which of YOUR customers uses what
- ✅ You want to bill YOUR customers accurately
- ✅ You need to maintain healthy profit margins

**We provide the "smart meter" software** to help you:

- Track consumption at the end-user level
- Calculate costs and credits automatically
- Generate accurate invoices
- Optimize AI spending

**📖 Read This First**: [Architecture Overview](../docs/architecture/overview.md) - Understand the system design
**📖 Quick Start**: [5-Minute Setup Guide](../QUICK_START.md) - Get up and running quickly

### Key Features

- ✅ **Real-time Metering**: 10M+ events/second throughput
- ✅ **Multi-Provider Cost Tracking**: OpenAI, Anthropic, Google, Cohere, Mistral
- ✅ **Flexible Credit System**: Prepaid credits with burn tables
- ✅ **Hybrid Pricing Models**: Seats + credits, overages, top-ups, pooling
- ✅ **Entitlement Engine**: Real-time feature gating with sub-10ms latency
- ✅ **Financial Compliance**: ASC 606/IFRS 15 revenue recognition
- ✅ **AI Cost Optimization**: 40-60% savings through intelligent routing

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/openmonetize-platform.git
cd openmonetize-platform/platform

# Install dependencies
npm install

# Start Docker services (PostgreSQL, Redis)
docker compose up -d

# Generate Prisma client
cd packages/common && npx prisma generate

# Run database migrations
DATABASE_URL="postgresql://admin:dev_password_change_in_production@localhost:5432/monetization?schema=public" \
  npx prisma migrate dev

# Seed the database
npm run db:seed

# Start development
# Start development (Backend + Dashboard)
npm run dev

# Dashboard will be available at http://localhost:3002
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL="postgresql://admin:dev_password_change_in_production@localhost:5432/monetization?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# API Keys for provider cost tracking
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
```

## Architecture

### Monorepo Structure

```
platform/
├── apps/
│   └── dashboard/           # Customer Dashboard & Sandbox
├── packages/
│   ├── common/              # Shared types, DB client, utilities
│   ├── api-gateway/         # Fastify API gateway
│   ├── ingestion-service/   # High-throughput event processing
│   ├── rating-engine/       # Credit calculation & burn tables
│   ├── ai-proxy-service/    # OpenAI/Anthropic/Gemini proxy (port 8082)
│   └── sdk/                 # TypeScript SDK
├── services/
│   ├── postgres/            # Database configuration
│   └── redis/               # Cache configuration
├── scripts/                 # Utility scripts (seed, deploy)
└── docs/                    # Documentation
```

### Tech Stack

| Component         | Technology     | Why                               |
| ----------------- | -------------- | --------------------------------- |
| **Language**      | TypeScript 5.9 | Type safety, developer experience |
| **Runtime**       | Node.js 20+    | Async I/O, large ecosystem        |
| **API Framework** | Fastify        | 40K req/sec, plugin ecosystem     |
| **Database**      | PostgreSQL 15  | ACID, JSON support, reliability   |
| **ORM**           | Prisma         | Type-safe queries, migrations     |
| **Cache**         | Redis 7        | Sub-ms latency, data structures   |
| **Validation**    | Zod            | Runtime type checking             |
| **Build**         | Turborepo      | Fast, efficient monorepo builds   |

## Dashboard & Sandbox

OpenMonetize comes with a built-in **Customer Dashboard** (`apps/dashboard`) that serves two purposes:

1.  **Customer Portal**: A full-featured dashboard for your users to view their usage, manage API keys, and check their credit balance.
2.  **Developer Sandbox**: A powerful testing tool that visualizes the entire flow of an API request—from the app, through the gateway, ingestion, rating engine, and finally to the database.

### Using the Sandbox

When running locally, visit `http://localhost:3002/sandbox` to access the Sandbox. It allows you to:

- Simulate API requests (Text Generation, Image Generation).
- See real-time logs from all system components.
- View the exact code snippets needed to integrate the SDK.

## Features

### 🚀 AI Proxy (Zero-Code Integration)

**The fastest way to add billing—just change your `baseURL`!**

Instead of manually instrumenting every AI call, use our proxy to automatically track usage:

```typescript
import OpenAI from "openai";

// Before: Calling OpenAI directly (no billing)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// After: Route through OpenMonetize Proxy (automatic billing!)
// Cloud: Uses https://proxy.openmonetize.io by default
// Local: Use baseURL: 'http://localhost:8082/v1'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://proxy.openmonetize.io/v1", // Default SaaS URL
  defaultHeaders: {
    "X-OM-Customer-Id": "your-customer",
    "X-OM-User-Id": "user-123",
    "X-OM-Feature-Id": "ai-chat",
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY,
  },
});

// Use OpenAI normally - billing is automatic!
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello!" }],
});
```

**Supported Providers:**
| Provider | Endpoint | Status |
|----------|----------|--------|
| OpenAI | `POST /v1/chat/completions` | ✅ |
| Anthropic | `POST /v1/messages` | ✅ |
| Gemini | `POST /v1beta/models/:model:generateContent` | ✅ |

Start the proxy: `pnpm --filter @openmonetize/ai-proxy-service dev` (port 8082)

---

### 1. Event Ingestion (SDK Method)

**Scenario**: Your AI SaaS company (e.g., "LegalAI") tracks when your customer (e.g., "Law Firm A") uses AI features.

```typescript
import { client } from "@openmonetize/sdk";

// Initialize with YOUR API key to our platform
const openmonetize = new OpenMonetizeClient({
  apiKey: process.env.OPENMONETIZE_API_KEY, // Your key
});

// When Law Firm A uses your AI feature
async function handleAIRequest(lawFirmId, prompt) {
  // You call OpenAI with YOUR API key
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  // You report usage to our platform
  await openmonetize.events.track({
    event_id: "evt_123",
    customer_id: "legalai-company", // Your company
    user_id: "law-firm-a", // Your customer
    event_type: "TOKEN_USAGE",
    feature_id: "legal-research",
    provider: "OPENAI",
    model: "gpt-4-turbo",
    input_tokens: response.usage.prompt_tokens,
    output_tokens: response.usage.completion_tokens,
    timestamp: new Date(),
  });

  return response;
}

// Example: Tracking Image Generation
await openmonetize.trackCustomEvent({
  event_id: "evt_img_123",
  customer_id: "legalai-company",
  user_id: "law-firm-a",
  event_type: "IMAGE_GENERATION",
  feature_id: "logo-creator",
  provider: "OPENAI",
  model: "dall-e-3",
  image_count: 1,
  image_size: "1024x1024",
  quality: "hd",
  timestamp: new Date(),
});

// Example: Tracking Custom Units
await openmonetize.trackCustomEvent({
  event_id: "evt_custom_123",
  customer_id: "legalai-company",
  user_id: "law-firm-a",
  event_type: "CUSTOM",
  feature_id: "pdf-processing",
  unit_type: "pages",
  quantity: 5,
  timestamp: new Date(),
});
```

### 2. Real-Time Entitlement Checks

Sub-10ms latency for access control:

```typescript
const entitlement = await client.entitlements.check({
  customer_id: "cust_abc",
  user_id: "user_456",
  feature_id: "ai-text-generation",
  action: {
    type: "token_usage",
    provider: "openai",
    model: "gpt-4-turbo",
    estimated_input_tokens: 1000,
    estimated_output_tokens: 500,
  },
});

if (!entitlement.allowed) {
  // Handle insufficient credits
  console.log(entitlement.reason);
  console.log(entitlement.actions); // Upgrade options
}
```

### 3. Cost Calculation

Real-time cost preview before execution:

```typescript
const cost = await client.rating.calculate({
  provider: "openai",
  model: "gpt-4-turbo",
  input_tokens: 1000,
  output_tokens: 500,
});

console.log(`Credits: ${cost.credits}`);
console.log(`USD Cost: $${cost.usd_cost}`);
console.log(`Margin: ${cost.margin_percent}%`);
```

### 4. Flexible Pricing Models

Configure burn tables via API:

```typescript
await client.burnTables.create({
  name: "Premium Tier Pricing",
  rules: {
    "gpt-4-turbo": {
      input_tokens: 1.5,
      output_tokens: 10.0,
      per_unit: 1000,
    },
    "claude-3.5-sonnet": {
      input_tokens: 0.8,
      output_tokens: 4.0,
      per_unit: 1000,
    },
  },
});
```

## Database Schema

### Core Models

- **Customer**: Multi-tenant customer accounts with tiers
- **User**: End-users of customer applications
- **Team**: B2B team-based credit pooling
- **CreditWallet**: Balance tracking with reservations
- **CreditTransaction**: Immutable financial ledger
- **BurnTable**: Configurable pricing rules
- **ProviderCost**: Real LLM provider pricing
- **UsageEvent**: Token usage with cost attribution
- **Entitlement**: Feature access control
- **Subscription & Plan**: Billing models

See [`packages/common/prisma/schema.prisma`](packages/common/prisma/schema.prisma) for complete schema.

## API Endpoints

### Event Ingestion

```
POST /v1/events/ingest
```

Batch event ingestion with deduplication.

### Entitlement Check

```
POST /v1/entitlements/check
```

Real-time access control with cost preview.

### Credit Management

```
GET    /v1/customers/:id/credits
POST   /v1/credits/consume
POST   /v1/credits/purchase
```

### Cost Preview

```
POST /v1/rating/calculate
```

Calculate credit cost before execution.

### Provider Pricing

```
GET /v1/providers/pricing
```

Current LLM provider pricing data.

## Development

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

### Database Migrations

```bash
# Create new migration
cd packages/common && npx prisma migrate dev --name my_migration

# Deploy migrations
npx prisma migrate deploy
```

### Database Studio

```bash
cd packages/common && npx prisma studio
```

Opens visual database editor at http://localhost:5555

## Deployment

### Railway (Recommended for Quick Start)

Deploy to Railway in 5 minutes with managed PostgreSQL and Redis:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

**Quick Start**: [RAILWAY_QUICKSTART.md](RAILWAY_QUICKSTART.md) - 5-minute deployment guide

**Full Guide**: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - Comprehensive Railway documentation

**Features**:

- One-click deployment from GitHub
- Managed PostgreSQL + Redis
- Automatic SSL certificates
- Built-in monitoring and logs
- Auto-deploy on git push

### Docker Production Build

```bash
# Build images
docker build -t openmonetize/api-gateway -f packages/api-gateway/Dockerfile .
docker build -t openmonetize/ingestion-service -f packages/ingestion-service/Dockerfile .
docker build -t openmonetize/rating-engine -f packages/rating-engine/Dockerfile .

# Run with Docker Compose
docker compose -f docker-compose.prod.yml up -d
```

### Kubernetes

```bash
# Apply manifests
kubectl apply -f k8s/

# Check status
kubectl get pods -n openmonetize
```

See [`k8s/README.md`](k8s/README.md) for detailed Kubernetes documentation.

## Monitoring

- **Metrics**: Prometheus (port 9090)
- **Logs**: Structured JSON to stdout
- **Tracing**: OpenTelemetry compatible
- **Health**: `/health` and `/ready` endpoints

## Documentation

- **[Quick Start Guide](../QUICK_START.md)** - 5-minute setup guide
- **[API Documentation](../docs/api/)** - Complete API reference
- **[Architecture Deep Dive](../docs/architecture/overview.md)** - System design
- **[Deployment Guide](../docs/guides/deployment-railway.md)** - Railway deployment
- **[CHANGELOG.md](../CHANGELOG.md)** - Version history

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

## License

Apache 2.0 - See [LICENSE](../LICENSE) for details.

## Support

- **Documentation**: https://docs.openmonetize.io
- **Discord**: https://discord.gg/openmonetize
- **GitHub Issues**: https://github.com/yourusername/openmonetize/issues
- **Email**: hello@openmonetize.io

## Roadmap

### Phase 1: Foundation (Complete ✅)

- [x] Monorepo setup with Turborepo
- [x] Complete database schema
- [x] Type definitions and validation
- [x] Docker Compose environment
- [x] Provider cost seeding

### Phase 2: Core Services (Complete ✅)

- [x] Event ingestion service
- [x] Rating engine
- [x] API gateway
- [x] TypeScript SDK
- [x] Demo mode implementation
- [x] License management system

### Phase 3: SDK Expansion (In Progress)

- [/] Python SDK
- [ ] Go SDK
- [ ] Analytics dashboard
- [ ] Admin UI

### Phase 4: Enterprise

- [ ] White-label support
- [ ] SOC 2 compliance
- [ ] Advanced security
- [ ] Multi-region deployment

## Acknowledgments

Built with inspiration from:

- Stripe Billing
- Metronome
- Orb
- Lago

---

**Status**: v1.0.1 Released | **Last Updated**: 2024-11-20
