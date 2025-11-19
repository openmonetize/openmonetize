# Docker Cleanup & Dashboard Authentication Fixes

## Changes Made

### 1. Removed Ingestion Service from Docker Compose
**File**: `docker-compose.yml`

Removed the containerized ingestion service because:
- ❌ Had monorepo dependency issues (`@openmonetize/common` not found)
- ❌ Caused restart loops in Docker
- ✅ Not needed - services run better locally with `pnpm dev`

**What's left in docker-compose.yml:**
- PostgreSQL (database)
- Redis (BullMQ queues)
- Redis Commander (optional GUI)
- PgAdmin (optional GUI)

### 2. Fixed Dashboard Event Authentication
**File**: `apps/dashboard/src/app/demo/page.tsx`

Changed Image Generation and Custom Event buttons:
- ❌ Was using: `Authorization: Bearer ${DEMO_API_KEY}`
- ✅ Now using: `x-api-key: DEMO_API_KEY`

The ingestion service expects `x-api-key` header, not Bearer token.

### 3. Updated Documentation
**File**: `LOCAL_DEVELOPMENT.md`

Clarified that Docker is **only for infrastructure**, Node services run locally.

## How to Use

### Development
```bash
# 1. Start infrastructure
docker compose up -d

# 2. Start all services
cd platform
pnpm dev
```

### Production (Railway)
- Uses `pnpm build` + `pnpm start:all`
- Railway provides managed Postgres + Redis
- No Docker needed

## Credits Should Now Work!

With these fixes:
1. ✅ Ingestion service runs locally (no Docker issues)
2. ✅ Dashboard buttons use correct auth header
3. ✅ BullMQ worker processes events and burns credits

Try clicking the demo buttons - credits should deduct properly now!
