# Self-Hosting Guide

Deploy OpenMonetize on your own infrastructure for complete control over your data and services.

## Architecture Overview

OpenMonetize consists of the following services:

```
┌─────────────────────────────────────────────────────────────┐
│                        Your Application                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI Proxy (port 8082)                       │
│            Routes requests to AI providers                    │
│            Extracts usage → Ingestion Service                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Ingestion Service (port 8081)                 │
│              Processes and stores usage events                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  API Gateway (port 3000)                      │
│           Credits, Entitlements, Analytics APIs               │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
    PostgreSQL                                 Redis
    (Data Store)                              (Cache/Queue)
```

---

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- pnpm 8+

---

## Quick Start with Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/openmonetize/openmonetize.git
cd openmonetize/platform
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database
DATABASE_URL=postgresql://admin:your_secure_password@postgres:5432/monetization

# Redis
REDIS_URL=redis://redis:6379

# API Keys (generate your own for production)
JWT_SECRET=your-secure-jwt-secret

# AI Provider Keys (optional, for proxy)
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx
GEMINI_API_KEY=xxx
```

### 3. Start Services

```bash
docker compose up -d
```

### 4. Run Database Migrations

```bash
docker compose exec api-gateway npx prisma migrate deploy
docker compose exec api-gateway npm run db:seed
```

### 5. Verify Installation

```bash
# Check all services are healthy
curl http://localhost:3000/health   # API Gateway
curl http://localhost:8081/health   # Ingestion Service
curl http://localhost:8082/health   # AI Proxy
```

---

## Environment Variables Reference

### API Gateway

| Variable       | Required | Default     | Description                  |
| -------------- | -------- | ----------- | ---------------------------- |
| `DATABASE_URL` | ✅       | -           | PostgreSQL connection string |
| `REDIS_URL`    | ✅       | -           | Redis connection string      |
| `PORT`         | ❌       | 3000        | API Gateway port             |
| `HOST`         | ❌       | 0.0.0.0     | Bind address                 |
| `NODE_ENV`     | ❌       | development | Environment mode             |

### Ingestion Service

| Variable               | Required | Default | Description                  |
| ---------------------- | -------- | ------- | ---------------------------- |
| `DATABASE_URL`         | ✅       | -       | PostgreSQL connection string |
| `REDIS_URL`            | ✅       | -       | Redis connection string      |
| `PORT`                 | ❌       | 8081    | Ingestion service port       |
| `RATE_LIMIT_MAX`       | ❌       | 1000    | Max requests per window      |
| `RATE_LIMIT_WINDOW_MS` | ❌       | 60000   | Rate limit window (ms)       |
| `QUEUE_CONCURRENCY`    | ❌       | 10      | Event processing concurrency |

### AI Proxy

| Variable                | Required | Default | Description              |
| ----------------------- | -------- | ------- | ------------------------ |
| `PORT`                  | ❌       | 8082    | Proxy port               |
| `INGESTION_SERVICE_URL` | ✅       | -       | URL to ingestion service |
| `ANTHROPIC_API_KEY`     | ❌       | -       | Default Anthropic key    |
| `OPENAI_API_KEY`        | ❌       | -       | Default OpenAI key       |
| `GEMINI_API_KEY`        | ❌       | -       | Default Gemini key       |

---

## Production Considerations

### Security

1. **Change all default passwords** in your `.env`
2. **Use secrets management** (Vault, AWS Secrets Manager, etc.)
3. **Enable TLS** for all external endpoints
4. **Set up firewall rules** to restrict database/Redis access

### Database

1. **Use managed PostgreSQL** for automatic backups (AWS RDS, Cloud SQL, etc.)
2. **Enable connection pooling** with PgBouncer if needed
3. **Regular backups** with point-in-time recovery

### Redis

1. **Use managed Redis** (ElastiCache, Memorystore, etc.)
2. **Enable persistence** (RDB + AOF) for production
3. **Set memory limits** to prevent OOM

### Scaling

**Horizontal Scaling:**

- API Gateway, Ingestion Service, and AI Proxy are stateless
- Scale with load balancer + multiple replicas

**Vertical Scaling:**

- Increase resources as needed
- Monitor memory and CPU usage

### Monitoring

Set up monitoring for:

- Service health endpoints (`/health`)
- Request latency and error rates
- Database connection pool usage
- Redis memory and connection count
- Queue depth (for ingestion service)

---

## Platform-Specific Guides

- **[Railway Deployment](./deployment-railway.md)** — Deploy to Railway.app
- **Kubernetes** — Coming soon
- **AWS ECS** — Coming soon

---

## Updating

### Pull Latest Changes

```bash
git pull origin main
```

### Rebuild and Restart

```bash
docker compose down
docker compose build
docker compose up -d
```

### Run Migrations

```bash
docker compose exec api-gateway npx prisma migrate deploy
```

---

## Troubleshooting

### Services Won't Start

```bash
# Check logs
docker compose logs api-gateway
docker compose logs ingestion-service
docker compose logs ai-proxy

# Verify database is ready
docker compose logs postgres
```

### Database Connection Errors

1. Verify `DATABASE_URL` is correct
2. Ensure PostgreSQL is running and accepting connections
3. Check network connectivity between services

### Redis Connection Errors

1. Verify `REDIS_URL` is correct
2. Ensure Redis is running
3. Check if Redis requires authentication

See the full [Troubleshooting Guide](./troubleshooting.md) for more help.

---

## Support

- **GitHub Issues**: [openmonetize/openmonetize](https://github.com/openmonetize/openmonetize/issues)
- **Documentation**: [docs.openmonetize.io](https://docs.openmonetize.io)
- **Email**: support@openmonetize.io
