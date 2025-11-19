# OpenMonetize

> **Open Source Pricing & Billing Infrastructure for AI.**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fopenmonetize%2Fopenmonetize)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-red)](https://redis.io/)

OpenMonetize is a production-ready platform for AI SaaS companies to track usage, calculate costs, manage credits, and bill customers based on actual AI consumption (tokens, API calls, compute time).

**Think "smart meter for AI consumption."**

## 🎯 Key Features

- **Real-time Usage Tracking** - Track AI consumption (tokens, API calls) with sub-second latency
- **Flexible Credit System** - Multi-currency wallet system with reservations and balance management
- **Cost Attribution** - Accurate cost calculation using configurable burn tables and provider pricing
- **Multi-tenant by Design** - Built-in tenant isolation with secure API key authentication
- **Entitlement Management** - Feature gating and usage limits per customer tier
- **High-throughput Ingestion** - Handle 10K+ events/sec with idempotent processing
- **Production-ready** - Comprehensive test coverage, observability, and deployment guides

## 🚀 Quick Start

Get OpenMonetize running locally in 5 minutes:

```bash
git clone https://github.com/openmonetize/openmonetize.git && cd openmonetize/platform && docker compose up -d
```

Services will be available at:
- **API Gateway**: http://localhost:3000
- **Ingestion Service**: http://localhost:8081
- **Rating Engine**: http://localhost:3001

📖 **[Complete Setup Guide](QUICK_START.md)** | 🏗️ **[Platform Documentation](platform/README.md)**

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[API Reference](docs/api/)** - Complete REST API documentation
- **[Migration Guide](docs/guides/migration.md)** - Migrate from other platforms
- **[Architecture Overview](docs/architecture/overview.md)** - System design and components
- **[Deployment Guide](docs/guides/deployment-railway.md)** - Production deployment on Railway
- **[SDK Documentation](docs/api/)** - TypeScript SDK usage and examples
- **[The Architecture of Intelligence Monetization](docs/architecture/INTELLIGENCE_MONETIZATION.md)** - Strategic framework and manifesto

## 🏛️ Architecture

OpenMonetize is a microservices architecture built with TypeScript, Fastify, and PostgreSQL:

```mermaid
graph LR
    App[Your App] --> Proxy[OpenMonetize Proxy]
    Proxy --> LLM[LLM Provider<br/>(OpenAI/Anthropic)]
    Proxy -.-> Billing[Billing Engine]
    Billing --> DB[(Database)]
```

**Core Services:**
- **API Gateway** - Authentication, routing, rate limiting
- **Ingestion Service** - High-throughput event processing
- **Rating Engine** - Cost calculation and burn tables

**Technology Stack:**
- TypeScript 5.9+ with Node.js 20+
- Fastify (40K+ req/sec performance)
- PostgreSQL 15 with Prisma ORM
- Redis 7 for caching and rate limiting
- Turborepo monorepo orchestration

## 🎓 Key Concepts

### Business Model

OpenMonetize helps **AI SaaS companies** (customers) track and bill their **end-users** for AI consumption:

- **Customer**: Your SaaS company using OpenMonetize
- **User**: Your customer's end-users consuming AI services
- **Provider**: AI service providers (OpenAI, Anthropic, etc.)

### Credit System

The credit system is the financial core of OpenMonetize:

1. **BurnTable** - Configurable pricing (e.g., 1.5 credits per 1K tokens for GPT-4)
2. **UsageEvent** - Records consumption (tokens, API calls)
3. **CreditTransaction** - Atomic credit deductions
4. **CreditWallet** - Balance management with multi-currency support

### Multi-tenancy

All data is isolated by customer with:
- Secure API key authentication (`X-API-Key: om_live_xxxx`)
- Row-level tenant isolation
- Indexed foreign keys for performance

## 🛠️ Development

```bash
# Start all services in development mode
pnpm dev

# Run tests
pnpm test

# Run tests for specific package
pnpm --filter @openmonetize/rating-engine test

# Lint code
pnpm lint

# Build all packages
pnpm build

# Database operations (from packages/common)
cd packages/common
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Create migration
npx prisma studio          # Visual database editor
```

**Monorepo Structure:**
```
platform/packages/
├── common/              # Shared: Prisma client, types, validation
├── api-gateway/         # Port 3000: Authentication, routing
├── ingestion-service/   # Port 8081: Event ingestion
├── rating-engine/       # Port 3001: Cost calculation
└── sdk/                 # TypeScript client library
```

## 🤝 Contributing

We welcome contributions! Please see:

- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines
- **[Security Policy](SECURITY.md)** - Report vulnerabilities
- **[Changelog](CHANGELOG.md)** - Version history

## 📊 Project Status

**Phase**: Production Readiness (MVP Complete)

- ✅ Core services functional and tested
- ✅ Database schema finalized
- ✅ API endpoints documented
- ✅ SDK available for TypeScript
- ✅ Deployment guides for Railway/Docker
- 🚧 Python/Go SDKs (planned)
- 🚧 Kubernetes deployment (planned)

**[Current Priorities](PRIORITIES.md)** | **[Development Roadmap](docs/architecture/roadmap.md)**

## 📄 License

OpenMonetize uses dual licensing to balance openness with business sustainability:

### Server & Infrastructure: AGPLv3

The OpenMonetize platform (API Gateway, Ingestion Service, Rating Engine, and all backend services) is licensed under the **[GNU Affero General Public License v3.0 (AGPLv3)](LICENSE)**.

✅ **You are free to:**
- Host OpenMonetize yourself for internal use
- Modify the source code for your needs
- Use it in production without licensing fees

⚠️ **Requirements:**
- If you modify and deploy OpenMonetize as a network service, you must open-source your modifications under AGPLv3
- This ensures the community benefits from improvements

### SDKs & Client Libraries: MIT

The OpenMonetize SDKs (`@openmonetize/sdk` and future Python/Go SDKs) are licensed under the **[MIT License](platform/packages/sdk/LICENSE)**.

✅ **You can safely:**
- Install our SDKs into your proprietary applications
- Distribute applications using our SDKs without legal risk
- No copyleft obligations for your application code

### Why Dual Licensing?

This model follows successful Commercial Open Source (COSS) companies like Sentry, Lago, and GitLab:

1. **AGPLv3 backend** - Protects our core platform while allowing self-hosting
2. **MIT SDKs** - Zero friction for developers integrating OpenMonetize
3. **Clear separation** - Your application code remains fully proprietary

**Questions?** See our [LICENSE](LICENSE) file or contact legal@openmonetize.com

## 🔗 Links

- **Documentation**: [docs/](docs/)
- **API Reference**: [docs/api/](docs/api/)
- **Platform Setup**: [platform/README.md](platform/README.md)
- **Quick Start**: [QUICK_START.md](QUICK_START.md)
- **Issues**: [GitHub Issues](https://github.com/openmonetize/openmonetize/issues)
- **Discussions**: [GitHub Discussions](https://github.com/openmonetize/openmonetize/discussions)

## 💬 Community & Support

- 📧 **Email**: support@openmonetize.com
- 💬 **Discord**: [Join our community](https://discord.gg/openmonetize) (coming soon)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/openmonetize/openmonetize/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/openmonetize/openmonetize/discussions)

---

**Built with ❤️ by the OpenMonetize team**
