#!/bin/bash
# Test script for Entitlement System
# Usage: ./test-entitlements.sh

set -e

echo "🧪 Testing Entitlement System"
echo "=============================="
echo ""

# Configuration
API_URL="http://localhost:3000"
API_KEY="om_dev_test_key"  # Test API key from seed data
CUSTOMER_ID="550e8400-e29b-41d4-a716-446655440000"  # Test customer from seed
USER_ID="660e8400-e29b-41d4-a716-446655440001"  # Test user (create if needed)

echo "📋 Step 1: Create entitlement for 'ai-chat' feature"
echo "----------------------------------------------------"
ENTITLEMENT_RESPONSE=$(curl -s -X POST "${API_URL}/v1/entitlements" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"userId\": \"${USER_ID}\",
    \"featureId\": \"ai-chat\",
    \"limitType\": \"HARD\",
    \"limitValue\": 10000,
    \"period\": \"MONTHLY\"
  }")

echo "$ENTITLEMENT_RESPONSE" | jq '.'
ENTITLEMENT_ID=$(echo "$ENTITLEMENT_RESPONSE" | jq -r '.data.id')

echo ""
echo ""

echo "✅ Step 2: Check entitlement (should allow - sufficient credits)"
echo "----------------------------------------------------------------"
curl -s -X POST "${API_URL}/v1/entitlements/check" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"userId\": \"${USER_ID}\",
    \"featureId\": \"ai-chat\",
    \"action\": {
      \"type\": \"token_usage\",
      \"provider\": \"OPENAI\",
      \"model\": \"gpt-4\",
      \"estimated_input_tokens\": 100,
      \"estimated_output_tokens\": 200
    }
  }" | jq '.'

echo ""
echo ""

echo "📝 Step 3: List all entitlements for customer"
echo "----------------------------------------------"
curl -s -X GET "${API_URL}/v1/customers/${CUSTOMER_ID}/entitlements" \
  -H "X-API-Key: ${API_KEY}" | jq '.'

echo ""
echo ""

echo "🔄 Step 4: Update entitlement (change to SOFT limit)"
echo "-----------------------------------------------------"
curl -s -X PUT "${API_URL}/v1/entitlements/${ENTITLEMENT_ID}" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"limitType\": \"SOFT\",
    \"limitValue\": 5000
  }" | jq '.'

echo ""
echo ""

echo "🚫 Step 5: Check entitlement with low credits (SOFT limit should warn)"
echo "----------------------------------------------------------------------"
curl -s -X POST "${API_URL}/v1/entitlements/check" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"userId\": \"${USER_ID}\",
    \"featureId\": \"ai-chat\",
    \"action\": {
      \"type\": \"token_usage\",
      \"provider\": \"OPENAI\",
      \"model\": \"gpt-4\",
      \"estimated_input_tokens\": 1000,
      \"estimated_output_tokens\": 2000
    }
  }" | jq '.'

echo ""
echo ""

echo "❌ Step 6: Check non-existent feature (should deny)"
echo "----------------------------------------------------"
curl -s -X POST "${API_URL}/v1/entitlements/check" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"userId\": \"${USER_ID}\",
    \"featureId\": \"non-existent-feature\",
    \"action\": {
      \"type\": \"api_call\"
    }
  }" | jq '.'

echo ""
echo ""

echo "🗑️  Step 7: Delete entitlement"
echo "------------------------------"
curl -s -X DELETE "${API_URL}/v1/entitlements/${ENTITLEMENT_ID}" \
  -H "X-API-Key: ${API_KEY}" -w "\nHTTP Status: %{http_code}\n"

echo ""
echo ""

echo "📊 Step 8: Verify entitlement is deleted"
echo "----------------------------------------"
curl -s -X GET "${API_URL}/v1/customers/${CUSTOMER_ID}/entitlements" \
  -H "X-API-Key: ${API_KEY}" | jq '.'

echo ""
echo ""

echo "✅ Entitlement System Testing Complete!"
echo "========================================"
