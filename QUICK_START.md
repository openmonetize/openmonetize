# 🚀 OpenMonetize - Quick Start Guide

**MVP Status**: 95% Complete ✅
**Last Updated**: November 18, 2024

Get the complete OpenMonetize platform running in 5 minutes!

---

## Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL 15 (via Docker)
- Redis 7 (via Docker)

---

## Step 1: Start Infrastructure (30 seconds)

```bash
cd platform
docker compose up -d
```

**Wait for services to be healthy:**
```bash
docker compose ps
```

You should see:
- ✅ postgres (healthy)
- ✅ redis (healthy)
- ✅ pgadmin (healthy)
- ✅ redis-commander (healthy)

---

## Step 2: Install Dependencies (1 minute)

```bash
pnpm install
```

---

## Step 3: Setup Database (30 seconds)

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed initial data (provider costs, test customer)
pnpm db:seed
```

---

## Step 4: Start Services (10 seconds)

```bash
# Start all 3 services simultaneously
pnpm dev
```

This will start:
- **API Gateway** (port 3000) - Main API entry point
- **Ingestion Service** (port 8081) - Event processing
- **Rating Engine** (port 3001) - Cost calculation

**Wait for startup messages:**
```
API Gateway listening on http://localhost:3000
Ingestion Service listening on http://localhost:8081
Rating Engine listening on http://localhost:3001
```

---

## Step 5: Verify Health (10 seconds)

In a new terminal:

```bash
# Check all services are healthy
curl http://localhost:3000/health
curl http://localhost:8081/health
curl http://localhost:3001/health

# All should return: {"status": "healthy"}
```

---

## Step 6: Run Complete Test Suite (30 seconds)

```bash
cd platform
./test-complete-flow.sh
```

This comprehensive test will:
1. ✅ Grant credits to customer
2. ✅ Create entitlement for ai-chat feature
3. ✅ Check access (entitlement validation)
4. ✅ Ingest usage event
5. ✅ Query analytics (usage, costs, burn-rate)
6. ✅ Calculate cost preview
7. ✅ Cleanup test data

**Expected output:**
```
🚀 OpenMonetize MVP - Complete End-to-End Test
==============================================

PHASE 1: Credit Management System
PHASE 2: Entitlement System
PHASE 3: Event Ingestion
PHASE 4: Analytics System
PHASE 5: Rating Engine
CLEANUP

✓ ALL TESTS PASSED!

OpenMonetize MVP is fully functional! 🎉
```

---

## 🎯 What's Working

### Complete API Surface (22 endpoints)

**Credit Management** (4 endpoints)
- `GET /v1/credits/balance` - Query balance
- `POST /v1/credits/grant` - Admin grant credits
- `POST /v1/credits/purchase` - Purchase credits
- `GET /v1/customers/:customerId/users/:userId/transactions` - Transaction history

**Entitlements** (5 endpoints)
- `POST /v1/entitlements/check` - Real-time access control
- `POST /v1/entitlements` - Create entitlement
- `PUT /v1/entitlements/:id` - Update entitlement
- `DELETE /v1/entitlements/:id` - Delete entitlement
- `GET /v1/customers/:customerId/entitlements` - List entitlements

**Analytics** (3 endpoints)
- `GET /v1/analytics/usage` - Usage by feature/provider/timeline
- `GET /v1/analytics/costs` - Cost breakdown and margins
- `GET /v1/analytics/burn-rate` - Consumption tracking with predictions

**Event Ingestion** (1 endpoint)
- `POST /v1/events/ingest` - High-throughput event processing

**Rating Engine** (2 endpoints)
- `POST /v1/rating/calculate` - Cost preview
- Burn table CRUD operations

**Core Services** (7 endpoints)
- `POST /v1/customers/register` - Customer registration
- `GET /health` - Health check
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe
- `GET /docs` - Swagger UI
- `GET /docs/json` - OpenAPI spec
- `GET /docs/yaml` - OpenAPI YAML

---

## 📖 Interactive API Documentation

Browse the complete API with Swagger UI:

```
http://localhost:3000/docs
```

Features:
- ✅ Interactive "Try it out" for all endpoints
- ✅ Complete request/response schemas
- ✅ Authentication testing
- ✅ OpenAPI 3.0 specification

---

## 🧪 Individual Test Scripts

Test specific systems:

```bash
# Test credit grant system
./test-grant-credits.sh

# Test entitlement system
./test-entitlements.sh

# Test complete end-to-end flow
./test-complete-flow.sh
```

---

## 🛠️ Useful Commands

### Development

```bash
# Start all services
pnpm dev

# Start individual service
pnpm --filter @openmonetize/api-gateway dev
pnpm --filter @openmonetize/ingestion-service dev
pnpm --filter @openmonetize/rating-engine dev

# Run tests
pnpm test

# Lint code
pnpm lint

# Build for production
pnpm build
```

### Database Management

```bash
# View database in browser
npx prisma studio
# Opens at http://localhost:5555

# Create new migration
cd platform/packages/common
npx prisma migrate dev --name my_migration

# Reset database (DANGEROUS!)
npx prisma migrate reset
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
```

---

## 🎯 Quick API Examples

### 1. Register Customer

```bash
curl -X POST http://localhost:3000/v1/customers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My AI Company",
    "email": "admin@myai.com"
  }'
```

**Response:**
```json
{
  "data": {
    "id": "cust_xxx",
    "apiKey": "om_live_xxxxxx",
    "tier": "STARTER"
  }
}
```

**⚠️ IMPORTANT**: Save the API key - it's only shown once!

### 2. Grant Credits

```bash
API_KEY="om_live_xxxxxx"  # From registration
CUSTOMER_ID="cust_xxx"    # From registration

curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d "{
    \"customerId\": \"$CUSTOMER_ID\",
    \"amount\": 10000,
    \"reason\": \"Welcome bonus\"
  }"
```

### 3. Create Entitlement

```bash
curl -X POST http://localhost:3000/v1/entitlements \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d "{
    \"customerId\": \"$CUSTOMER_ID\",
    \"featureId\": \"ai-chat\",
    \"limitType\": \"HARD\",
    \"limitValue\": 5000
  }"
```

### 4. Check Access

```bash
curl -X POST http://localhost:3000/v1/entitlements/check \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d "{
    \"customerId\": \"$CUSTOMER_ID\",
    \"userId\": \"user_xxx\",
    \"featureId\": \"ai-chat\",
    \"action\": {
      \"type\": \"token_usage\",
      \"provider\": \"OPENAI\",
      \"model\": \"gpt-4\",
      \"estimated_input_tokens\": 1000
    }
  }"
```

### 5. Ingest Usage

```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $API_KEY" \
  -d "{
    \"customerId\": \"$CUSTOMER_ID\",
    \"eventType\": \"TOKEN_USAGE\",
    \"featureId\": \"ai-chat\",
    \"provider\": \"OPENAI\",
    \"model\": \"gpt-4\",
    \"inputTokens\": 1000,
    \"outputTokens\": 500
  }"
```

### 6. View Analytics

```bash
# Usage analytics
curl "http://localhost:3000/v1/analytics/usage?customerId=$CUSTOMER_ID" \
  -H "X-API-Key: $API_KEY"

# Cost analytics
curl "http://localhost:3000/v1/analytics/costs?customerId=$CUSTOMER_ID" \
  -H "X-API-Key: $API_KEY"

# Burn rate
curl "http://localhost:3000/v1/analytics/burn-rate?customerId=$CUSTOMER_ID" \
  -H "X-API-Key: $API_KEY"
```

---

## 🔍 Troubleshooting

### Services won't start

**Check Docker is running:**
```bash
docker compose ps
```

If services aren't healthy:
```bash
docker compose restart postgres redis
```

### Database connection errors

**Regenerate Prisma client:**
```bash
cd platform/packages/common
npx prisma generate
```

**Check database is accessible:**
```bash
psql postgresql://admin:dev_password_change_in_production@localhost:5432/monetization
```

### Port already in use

**Find process using port:**
```bash
lsof -i :3000  # or :8081, :3001
```

**Kill the process:**
```bash
kill -9 <PID>
```

### TypeScript errors

**Clean and rebuild:**
```bash
pnpm clean
pnpm install
pnpm db:generate
pnpm build
```

---

## 📚 Documentation

### API Documentation
- [Credit GRANT API](docs/CREDIT_GRANT_API.md)
- [Entitlement System](docs/ENTITLEMENT_SYSTEM.md)
- [Analytics API](docs/ANALYTICS_API.md)
- [API Specification](docs/API_SPECIFICATION.md)
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md)

### Project Tracking
- [Progress Report](PROGRESS.md) - Detailed status (95% complete)
- [Current Priorities](PRIORITIES.md) - This week's focus
- [Next Steps](NEXT_STEPS.md) - Development guide
- [MVP Summary](MVP_COMPLETION_SUMMARY.md) - Achievement summary

---

## 🎉 Success!

If you see:
- ✅ All health checks passing
- ✅ Test script completes successfully
- ✅ Swagger UI loads at http://localhost:3000/docs

**Congratulations! OpenMonetize MVP is running!** 🚀

---

## 💡 What's Next?

Now that the MVP is running, you can:

1. **Explore the API** - Use Swagger UI at http://localhost:3000/docs
2. **Run more tests** - Try the individual test scripts
3. **Build integrations** - Use the API to track AI usage
4. **View database** - Check Prisma Studio at http://localhost:5555
5. **Monitor Redis** - View Redis Commander at http://localhost:8001

---

## 📞 Need Help?

Check the documentation:
- [NEXT_STEPS.md](NEXT_STEPS.md) - Development guide
- [PROGRESS.md](PROGRESS.md) - Current status
- [Technical docs](docs/) - Complete API reference

---

**Generated**: November 18, 2024
**Version**: MVP 0.95.0
**Status**: Production-ready core features ✅
