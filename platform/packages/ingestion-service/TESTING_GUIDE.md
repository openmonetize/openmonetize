# Ingestion Service - Testing Guide

This guide walks you through testing the Ingestion Service from scratch, including database setup, creating test data, and running integration tests.

## Prerequisites

Ensure the following services are running:
```bash
docker compose ps
```

You should see:
- ✅ `openmonetize-postgres` (healthy)
- ✅ `openmonetize-redis` (healthy)

## Step 1: Database Setup

### 1.1 Generate Prisma Client

First, generate the Prisma client from the schema:

```bash
cd /Users/eliranelnasi/openmonetize/platform/packages/common
pnpm prisma generate
```

### 1.2 Run Database Migrations

Create the database tables:

```bash
cd /Users/eliranelnasi/openmonetize/platform/packages/common
pnpm prisma migrate dev --name init
```

This will create all 14 tables in PostgreSQL.

### 1.3 Seed Provider Costs

Run the seed script to populate provider pricing:

```bash
cd /Users/eliranelnasi/openmonetize/platform
pnpm db:seed
```

Or manually:

```bash
cd /Users/eliranelnasi/openmonetize/platform/packages/common
tsx ../scripts/seed.ts
```

## Step 2: Create Test Customer

### 2.1 Generate Test API Key

Create a test customer with an API key:

```bash
cd /Users/eliranelnasi/openmonetize/platform/packages/common
node -e "
const crypto = require('crypto');
const apiKey = 'om_test_' + crypto.randomBytes(24).toString('hex');
const hash = crypto.createHash('sha256').update(apiKey).digest('hex');
console.log('API Key:', apiKey);
console.log('Hash:', hash);
console.log('\\nSave the API key - you cannot retrieve it later!');
"
```

**Save the output! Example:**
```
API Key: om_test_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x
Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

### 2.2 Insert Test Customer

Using the hash from above, insert a test customer:

```bash
docker exec openmonetize-postgres psql -U admin -d monetization <<EOF
INSERT INTO "Customer" (
    id,
    name,
    email,
    tier,
    status,
    api_key_hash,
    created_at,
    updated_at
) VALUES (
    'cust-test-001',
    'Test Company',
    'test@example.com',
    'GROWTH',
    'ACTIVE',
    'YOUR_HASH_HERE',  -- Replace with the hash from step 2.1
    NOW(),
    NOW()
);
EOF
```

### 2.3 Create Test Credit Wallet

Give the test customer some credits:

```bash
docker exec openmonetize-postgres psql -U admin -d monetization <<EOF
INSERT INTO "CreditWallet" (
    id,
    customer_id,
    balance,
    created_at,
    updated_at
) VALUES (
    'wallet-test-001',
    'cust-test-001',
    1000000,  -- 1 million credits
    NOW(),
    NOW()
);
EOF
```

### 2.4 Verify Setup

Check that everything was created:

```bash
# Check customer
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT id, name, email, tier, status FROM \"Customer\" WHERE id = 'cust-test-001';"

# Check wallet
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT id, customer_id, balance FROM \"CreditWallet\" WHERE customer_id = 'cust-test-001';"

# Check provider costs
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT provider, model, cost_type, cost_per_unit FROM \"ProviderCost\" LIMIT 10;"
```

## Step 3: Start Ingestion Service

### 3.1 Start the Service

```bash
cd /Users/eliranelnasi/openmonetize/platform/packages/ingestion-service
pnpm dev
```

You should see:
```
[INFO] Queue initialized successfully
[INFO] 🚀 Ingestion service running on 0.0.0.0:8081
```

### 3.2 Verify Service is Running

In a new terminal:

```bash
# Health check
curl http://localhost:8081/health

# Should return:
# {"status":"ok","timestamp":"2025-01-17T..."}

# Readiness check
curl http://localhost:8081/ready

# Should return:
# {"status":"ready","timestamp":"2025-01-17T...","services":{"database":"connected","queue":"connected"}}
```

## Step 4: Test Event Ingestion

### 4.1 Test Without API Key (Should Fail)

```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "events": [
      {
        "event_id": "550e8400-e29b-41d4-a716-446655440001",
        "customer_id": "cust-test-001",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-text-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 1000,
        "output_tokens": 500,
        "timestamp": "2025-01-17T14:30:00Z"
      }
    ]
  }'
```

**Expected Response (401):**
```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}
```

✅ **Good!** Authentication is working.

### 4.2 Test With Valid API Key (Should Succeed)

Replace `YOUR_API_KEY` with the API key from Step 2.1:

```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "events": [
      {
        "event_id": "550e8400-e29b-41d4-a716-446655440001",
        "customer_id": "cust-test-001",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-text-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 1000,
        "output_tokens": 500,
        "timestamp": "2025-01-17T14:30:00Z"
      }
    ]
  }'
```

**Expected Response (202):**
```json
{
  "accepted": 1,
  "rejected": 0,
  "duplicates": 0,
  "batch_id": "batch_xyz789",
  "status": "processing",
  "processing_time_ms": 45
}
```

✅ **Success!** Event was accepted for processing.

### 4.3 Test Idempotency (Should Deduplicate)

Send the **same event** again with the same `event_id`:

```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "events": [
      {
        "event_id": "550e8400-e29b-41d4-a716-446655440001",
        "customer_id": "cust-test-001",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-text-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 1000,
        "output_tokens": 500,
        "timestamp": "2025-01-17T14:30:00Z",
        "idempotency_key": "test-duplicate-1"
      }
    ]
  }'
```

First call:
```json
{
  "accepted": 1,
  "rejected": 0,
  "duplicates": 0,
  "batch_id": "batch_abc123",
  "status": "processing"
}
```

Second call (same idempotency_key):
```json
{
  "accepted": 0,
  "rejected": 0,
  "duplicates": 1,
  "batch_id": null,
  "status": "all_duplicates",
  "message": "All events were duplicates"
}
```

✅ **Perfect!** Idempotency is working.

### 4.4 Test Batch Ingestion

Send multiple events at once:

```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "events": [
      {
        "event_id": "550e8400-e29b-41d4-a716-446655440002",
        "customer_id": "cust-test-001",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-text-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 2000,
        "output_tokens": 1000,
        "timestamp": "2025-01-17T14:31:00Z"
      },
      {
        "event_id": "550e8400-e29b-41d4-a716-446655440003",
        "customer_id": "cust-test-001",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-image-generation",
        "provider": "ANTHROPIC",
        "model": "claude-3-sonnet",
        "input_tokens": 500,
        "output_tokens": 200,
        "timestamp": "2025-01-17T14:32:00Z"
      },
      {
        "event_id": "550e8400-e29b-41d4-a716-446655440004",
        "customer_id": "cust-test-001",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-code-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 3000,
        "output_tokens": 1500,
        "timestamp": "2025-01-17T14:33:00Z"
      }
    ]
  }'
```

**Expected Response:**
```json
{
  "accepted": 3,
  "rejected": 0,
  "duplicates": 0,
  "batch_id": "batch_def456",
  "status": "processing"
}
```

✅ **Excellent!** Batch processing works.

## Step 5: Verify Processing

### 5.1 Check Queue Processing

Open Redis Commander in your browser:
```
http://localhost:8001
```

Navigate to the `usage-events` key to see:
- **Waiting jobs**: Events waiting to be processed
- **Active jobs**: Currently processing
- **Completed jobs**: Successfully processed
- **Failed jobs**: Errors (should be 0)

### 5.2 Check Database Records

#### Check Usage Events
```bash
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT id, customer_id, event_type, provider, model, input_tokens, output_tokens, credits_burned, cost_usd
   FROM \"UsageEvent\"
   WHERE customer_id = 'cust-test-001'
   ORDER BY timestamp DESC
   LIMIT 10;"
```

**Expected Output:**
```
                  id                  | customer_id  | event_type  | provider |     model      | input_tokens | output_tokens | credits_burned |  cost_usd
--------------------------------------+--------------+-------------+----------+----------------+--------------+---------------+----------------+-----------
 550e8400-e29b-41d4-a716-446655440001 | cust-test-001| TOKEN_USAGE | OPENAI   | gpt-4-turbo    |         1000 |           500 |             15 | 0.015000
 550e8400-e29b-41d4-a716-446655440002 | cust-test-001| TOKEN_USAGE | OPENAI   | gpt-4-turbo    |         2000 |          1000 |             30 | 0.030000
```

#### Check Credit Transactions
```bash
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT id, customer_id, transaction_type, amount, balance_before, balance_after, description
   FROM \"CreditTransaction\"
   WHERE customer_id = 'cust-test-001'
   ORDER BY created_at DESC
   LIMIT 10;"
```

**Expected Output:**
```
                  id                  | customer_id  | transaction_type | amount | balance_before | balance_after |     description
--------------------------------------+--------------+------------------+--------+----------------+---------------+--------------------
 txn-...                              | cust-test-001| BURN             |    -15 |        1000000 |        999985 | AI usage credit burn
 txn-...                              | cust-test-001| BURN             |    -30 |         999985 |        999955 | AI usage credit burn
```

#### Check Wallet Balance
```bash
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT id, customer_id, balance
   FROM \"CreditWallet\"
   WHERE customer_id = 'cust-test-001';"
```

**Expected Output:**
```
       id        | customer_id  | balance
-----------------+--------------+---------
 wallet-test-001 | cust-test-001| 999955
```

The balance should be reduced by the credits burned!

✅ **Perfect!** The complete flow is working:
1. Events ingested ✅
2. Costs calculated ✅
3. Credits burned ✅
4. Transactions recorded ✅

## Step 6: Test Error Handling

### 6.1 Invalid Customer ID

```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "events": [
      {
        "event_id": "550e8400-e29b-41d4-a716-446655440099",
        "customer_id": "cust-wrong-999",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-text-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 1000,
        "output_tokens": 500,
        "timestamp": "2025-01-17T14:30:00Z"
      }
    ]
  }'
```

**Expected Response (403):**
```json
{
  "error": "FORBIDDEN",
  "message": "Events contain invalid customer_id. All events must belong to the authenticated customer."
}
```

### 6.2 Invalid Event Schema

```bash
curl -X POST http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "events": [
      {
        "event_id": "not-a-uuid",
        "customer_id": "cust-test-001",
        "event_type": "INVALID_TYPE",
        "feature_id": "ai-text-generation",
        "timestamp": "2025-01-17T14:30:00Z"
      }
    ]
  }'
```

**Expected Response (400):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid event batch format",
  "details": { ... }
}
```

### 6.3 Rate Limiting

Send 1001 requests rapidly (exceeds 1000/min limit):

```bash
for i in {1..1001}; do
  curl -s http://localhost:8081/health > /dev/null
done
```

The last requests should return **429 Too Many Requests**.

## Step 7: Performance Testing

### 7.1 Simple Load Test

Create a load test script:

```bash
cat > /tmp/load-test.sh << 'EOF'
#!/bin/bash
API_KEY="YOUR_API_KEY"  # Replace with your API key

for i in {1..1000}; do
  EVENT_ID=$(uuidgen)
  curl -s -X POST http://localhost:8081/v1/events/ingest \
    -H "Content-Type: application/json" \
    -H "x-api-key: $API_KEY" \
    -d "{
      \"events\": [{
        \"event_id\": \"$EVENT_ID\",
        \"customer_id\": \"cust-test-001\",
        \"event_type\": \"TOKEN_USAGE\",
        \"feature_id\": \"ai-text-generation\",
        \"provider\": \"OPENAI\",
        \"model\": \"gpt-4-turbo\",
        \"input_tokens\": 1000,
        \"output_tokens\": 500,
        \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
      }]
    }" > /dev/null &

  # Run 10 at a time
  if (( i % 10 == 0 )); then
    wait
  fi
done
wait
echo "Load test complete: 1000 events sent"
EOF

chmod +x /tmp/load-test.sh
/tmp/load-test.sh
```

Monitor:
- Service logs for processing
- Redis Commander for queue depth
- Database for new records

### 7.2 Check Performance Metrics

After the load test:

```bash
# Count total events
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT COUNT(*) as total_events FROM \"UsageEvent\" WHERE customer_id = 'cust-test-001';"

# Check average processing time (from logs)
# Look for "Event processed successfully" log entries with processingTimeMs

# Check queue statistics
# Open Redis Commander and view the usage-events queue stats
```

## Step 8: Monitoring & Debugging

### 8.1 View Service Logs

The ingestion service logs show:
- Event ingestion requests
- Authentication attempts
- Queue processing
- Cost calculations
- Credit burns
- Errors

Look for log entries like:
```
[INFO] Events ingested successfully
  customerId: "cust-test-001"
  batchId: "batch_xyz789"
  accepted: 3
  duplicates: 0
  processingTimeMs: 45

[INFO] Event processed successfully
  eventId: "550e8400-e29b-41d4-a716-446655440001"
  credits: "15"
  usd: "0.015"
  processingTimeMs: 120
```

### 8.2 Redis Commander

Access: http://localhost:8001

Navigate to:
- **bullmq:usage-events:**: View queue jobs
- **limiter:**: View rate limit counters

### 8.3 Database Queries

Useful debugging queries:

```bash
# Recent events
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT id, event_type, provider, model, credits_burned, timestamp
   FROM \"UsageEvent\"
   ORDER BY timestamp DESC
   LIMIT 20;"

# Credit transactions
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT customer_id, transaction_type, amount, balance_after, created_at
   FROM \"CreditTransaction\"
   ORDER BY created_at DESC
   LIMIT 20;"

# Wallet balances
docker exec openmonetize-postgres psql -U admin -d monetization -c \
  "SELECT c.name, w.balance
   FROM \"CreditWallet\" w
   JOIN \"Customer\" c ON w.customer_id = c.id;"
```

## Troubleshooting

### Issue: Service won't start

**Error**: `ZodError: Invalid configuration`

**Solution**: Check `.env` file has all required variables:
```bash
cat packages/ingestion-service/.env
```

### Issue: Database connection failed

**Error**: `connect ECONNREFUSED 127.0.0.1:5432`

**Solution**: Ensure PostgreSQL is running:
```bash
docker compose ps postgres
docker compose up -d postgres
```

### Issue: Queue not processing

**Error**: Redis connection failed

**Solution**: Ensure Redis is running:
```bash
docker compose ps redis
docker compose up -d redis
```

### Issue: Events not being processed

**Check**:
1. Queue worker logs (should show processing)
2. Redis Commander (check job status)
3. Database (check for new UsageEvent records)

**Common causes**:
- Provider costs not seeded
- Invalid event data
- Database connection issues

## Summary

✅ **Testing Complete!**

You've verified:
1. ✅ Service startup and health endpoints
2. ✅ Authentication (API key validation)
3. ✅ Event validation (schema checking)
4. ✅ Idempotency (duplicate prevention)
5. ✅ Batch processing (multiple events)
6. ✅ Queue processing (BullMQ workers)
7. ✅ Cost calculation (provider pricing)
8. ✅ Credit burning (wallet deduction)
9. ✅ Transaction recording (audit trail)
10. ✅ Error handling (401, 403, 400, 429)

The Ingestion Service is **fully functional and ready for production use**! 🎉

## Next Steps

1. **Load Testing**: Test 10K events/second throughput
2. **Integration Tests**: Write automated test suite
3. **Monitoring**: Add Prometheus metrics
4. **Alerting**: Set up alerts for errors, queue depth
5. **Documentation**: API documentation with Swagger/OpenAPI
