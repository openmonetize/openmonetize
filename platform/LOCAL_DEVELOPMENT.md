# OpenMonetize Local Development Setup

## Why Local Instead of Docker?

**For development, run Node services locally and only use Docker for infrastructure (Postgres + Redis).**

Why?
- ✅ Faster hot-reload with `tsx watch`
- ✅ Easier debugging
- ✅ No monorepo module resolution issues
- ✅ Simpler setup

Docker is used for:
- PostgreSQL database
- Redis (for BullMQ queues)
- Optional: PgAdmin + Redis Commander (GUI tools)

Node services (API Gateway, Ingestion, Rating Engine) run locally with `pnpm dev`.

## Prerequisites

- ✅ Docker running (for Postgres + Redis)
- ✅ Node.js 20+
- ✅ pnpm 8+

## Quick Start

### 1. Ensure Docker Services are Running

```bash
cd /Users/eliranelnasi/openmonetize/platform
docker ps | grep -E "postgres|redis"
```

You should see:
- `openmonetize-postgres` (port 5432)
- `openmonetize-redis` (port 6379)

If not running:
```bash
docker start openmonetize-postgres openmonetize-redis
```

### 2. Start All Node Services

```bash
cd /Users/eliranelnasi/openmonetize/platform
pnpm dev
```

This starts **3 services in parallel**:
- **API Gateway** → `http://localhost:3000`
- **Ingestion Service** → `http://localhost:8081`
- **Rating Engine** → `http://localhost:3001`

### 3. Verify Services are Running

```bash
curl http://localhost:3000/health  # API Gateway
curl http://localhost:8081/health  # Ingestion Service
curl http://localhost:3001/health  # Rating Engine
```

### 4. Test Dashboard

Open: `http://localhost:3001/demo` (if running dashboard separately)

Or start dashboard:
```bash
cd /Users/eliranelnasi/openmonetize/platform/apps/dashboard
pnpm dev
```

## Service Details

| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 3000 | Main API + Auth + Routing |
| Ingestion Service | 8081 | Event ingestion + BullMQ worker + Credit burning |
| Rating Engine | 3001 | Cost calculation |
| Dashboard | 3001 | Demo UI (Next.js) |

## How Credit Deduction Works

1. Demo button → API Gateway `/v1/demo/generate`
2. Gateway → Ingestion Service `/v1/events/ingest`  
3. Ingestion Service → Enqueues event to BullMQ
4. **BullMQ Worker** → Processes event:
   - Calculates cost (Rating Engine logic)
   - Burns credits from wallet
   - Stores usage event

The **BullMQ worker** runs inside the Ingestion Service and is what actually deducts credits!

## Troubleshooting

### "Connection refused" errors
- Ensure Docker services (Postgres/Redis) are running
- Check `.env` file has correct connection strings

### Credits not deducting
- Verify Ingestion Service is running on port 8081
- Check BullMQ worker logs in ingestion service output
- Ensure the demo customer has credits in the database

### Port already in use
```bash
# Find what's using a port
lsof -i :3000
# Kill the process
kill -9 <PID>
```
