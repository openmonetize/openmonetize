#!/bin/bash
# Test script for GRANT credits endpoint
# Usage: ./test-grant-credits.sh

set -e

echo "🧪 Testing GRANT Credits Endpoint"
echo "=================================="
echo ""

# Configuration
API_URL="http://localhost:3000"
API_KEY="om_dev_test_key"  # Test API key from seed data
CUSTOMER_ID="550e8400-e29b-41d4-a716-446655440000"  # Test customer from seed

echo "📋 Step 1: Check initial balance"
echo "---------------------------------"
curl -s -X GET "${API_URL}/v1/credits/balance" \
  -H "X-API-Key: ${API_KEY}" | jq '.'

echo ""
echo ""

echo "💰 Step 2: Grant 5000 credits to customer wallet"
echo "------------------------------------------------"
GRANT_RESPONSE=$(curl -s -X POST "${API_URL}/v1/credits/grant" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"amount\": 5000,
    \"reason\": \"Initial credit grant for testing\",
    \"idempotencyKey\": \"grant-test-$(date +%s)\"
  }")

echo "$GRANT_RESPONSE" | jq '.'

echo ""
echo ""

echo "📊 Step 3: Verify new balance"
echo "-----------------------------"
curl -s -X GET "${API_URL}/v1/credits/balance" \
  -H "X-API-Key: ${API_KEY}" | jq '.'

echo ""
echo ""

echo "🔄 Step 4: Test idempotency (retry same grant)"
echo "----------------------------------------------"
IDEMPOTENCY_KEY="grant-idempotent-test-123"

echo "First request:"
curl -s -X POST "${API_URL}/v1/credits/grant" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"amount\": 1000,
    \"reason\": \"Idempotency test\",
    \"idempotencyKey\": \"${IDEMPOTENCY_KEY}\"
  }" | jq '.'

echo ""
echo "Second request (should return same transaction):"
curl -s -X POST "${API_URL}/v1/credits/grant" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"amount\": 1000,
    \"reason\": \"Idempotency test\",
    \"idempotencyKey\": \"${IDEMPOTENCY_KEY}\"
  }" | jq '.'

echo ""
echo ""

echo "✅ Grant Credits Testing Complete!"
echo "==================================="
