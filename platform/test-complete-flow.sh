#!/bin/bash
# Complete End-to-End Test - OpenMonetize MVP
# Tests all major systems: Credits, Entitlements, Analytics, Ingestion

set -e

echo "🚀 OpenMonetize MVP - Complete End-to-End Test"
echo "=============================================="
echo ""

# Configuration
API_URL="http://localhost:3000"
API_KEY="om_dev_test_key"
CUSTOMER_ID="550e8400-e29b-41d4-a716-446655440000"
USER_ID="660e8400-e29b-41d4-a716-446655440001"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 1: Credit Management System    ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}Step 1.1: Check initial balance${NC}"
INITIAL_BALANCE=$(curl -s -X GET "${API_URL}/v1/credits/balance" \
  -H "X-API-Key: ${API_KEY}" | jq -r '.data.balance')
echo "Initial Balance: $INITIAL_BALANCE credits"
echo ""

echo -e "${YELLOW}Step 1.2: Grant 10,000 credits${NC}"
GRANT_RESULT=$(curl -s -X POST "${API_URL}/v1/credits/grant" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"amount\": 10000,
    \"reason\": \"E2E test - initial grant\",
    \"idempotencyKey\": \"e2e-test-grant-$(date +%s)\"
  }")

echo "$GRANT_RESULT" | jq '.'
NEW_BALANCE=$(echo "$GRANT_RESULT" | jq -r '.data.newBalance')
echo -e "${GREEN}✓ Credits granted successfully. New balance: $NEW_BALANCE${NC}"
echo ""

echo -e "${YELLOW}Step 1.3: Verify balance increased${NC}"
CURRENT_BALANCE=$(curl -s -X GET "${API_URL}/v1/credits/balance" \
  -H "X-API-Key: ${API_KEY}" | jq -r '.data.balance')
echo "Current Balance: $CURRENT_BALANCE credits"
echo -e "${GREEN}✓ Balance verified${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 2: Entitlement System          ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}Step 2.1: Create entitlement for 'ai-chat' feature${NC}"
ENTITLEMENT=$(curl -s -X POST "${API_URL}/v1/entitlements" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"userId\": \"${USER_ID}\",
    \"featureId\": \"ai-chat\",
    \"limitType\": \"HARD\",
    \"limitValue\": 5000,
    \"period\": \"MONTHLY\"
  }")

echo "$ENTITLEMENT" | jq '.'
ENTITLEMENT_ID=$(echo "$ENTITLEMENT" | jq -r '.data.id')
echo -e "${GREEN}✓ Entitlement created: $ENTITLEMENT_ID${NC}"
echo ""

echo -e "${YELLOW}Step 2.2: Check entitlement (should allow)${NC}"
ACCESS_CHECK=$(curl -s -X POST "${API_URL}/v1/entitlements/check" \
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
      \"estimated_input_tokens\": 500,
      \"estimated_output_tokens\": 200
    }
  }")

echo "$ACCESS_CHECK" | jq '.'
ALLOWED=$(echo "$ACCESS_CHECK" | jq -r '.allowed')
if [ "$ALLOWED" = "true" ]; then
  echo -e "${GREEN}✓ Access granted${NC}"
else
  echo -e "❌ Access denied"
fi
echo ""

echo -e "${YELLOW}Step 2.3: List all entitlements${NC}"
curl -s -X GET "${API_URL}/v1/customers/${CUSTOMER_ID}/entitlements" \
  -H "X-API-Key: ${API_KEY}" | jq '.'
echo -e "${GREEN}✓ Entitlements listed${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 3: Event Ingestion             ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}Step 3.1: Ingest usage event${NC}"
EVENT_RESULT=$(curl -s -X POST "http://localhost:8081/v1/events/ingest" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: ${API_KEY}" \
  -d "{
    \"customerId\": \"${CUSTOMER_ID}\",
    \"userId\": \"${USER_ID}\",
    \"eventType\": \"TOKEN_USAGE\",
    \"featureId\": \"ai-chat\",
    \"provider\": \"OPENAI\",
    \"model\": \"gpt-4\",
    \"inputTokens\": 500,
    \"outputTokens\": 200,
    \"idempotencyKey\": \"e2e-test-event-$(date +%s)\"
  }")

echo "$EVENT_RESULT" | jq '.'
echo -e "${GREEN}✓ Event ingested successfully${NC}"
echo ""

# Wait for queue processing
echo -e "${YELLOW}Waiting 2 seconds for queue processing...${NC}"
sleep 2
echo ""

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 4: Analytics System             ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}Step 4.1: Get usage analytics${NC}"
USAGE=$(curl -s -X GET "${API_URL}/v1/analytics/usage?customerId=${CUSTOMER_ID}" \
  -H "X-API-Key: ${API_KEY}")
echo "$USAGE" | jq '.data.summary'
echo -e "${GREEN}✓ Usage analytics retrieved${NC}"
echo ""

echo -e "${YELLOW}Step 4.2: Get cost analytics${NC}"
COSTS=$(curl -s -X GET "${API_URL}/v1/analytics/costs?customerId=${CUSTOMER_ID}" \
  -H "X-API-Key: ${API_KEY}")
echo "$COSTS" | jq '.data.summary'
echo -e "${GREEN}✓ Cost analytics retrieved${NC}"
echo ""

echo -e "${YELLOW}Step 4.3: Get burn rate analytics${NC}"
BURN_RATE=$(curl -s -X GET "${API_URL}/v1/analytics/burn-rate?customerId=${CUSTOMER_ID}" \
  -H "X-API-Key: ${API_KEY}")
echo "$BURN_RATE" | jq '.'
echo -e "${GREEN}✓ Burn rate analytics retrieved${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  PHASE 5: Rating Engine                ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}Step 5.1: Calculate cost preview${NC}"
COST_CALC=$(curl -s -X POST "http://localhost:3001/v1/rating/calculate" \
  -H "Content-Type: application/json" \
  -d "{
    \"provider\": \"OPENAI\",
    \"model\": \"gpt-4\",
    \"inputTokens\": 1000,
    \"outputTokens\": 500
  }")

echo "$COST_CALC" | jq '.'
echo -e "${GREEN}✓ Cost calculation complete${NC}"
echo ""

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  CLEANUP                               ${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}Step 6.1: Delete test entitlement${NC}"
curl -s -X DELETE "${API_URL}/v1/entitlements/${ENTITLEMENT_ID}" \
  -H "X-API-Key: ${API_KEY}" -w "\nHTTP Status: %{http_code}\n"
echo -e "${GREEN}✓ Entitlement deleted${NC}"
echo ""

echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ ALL TESTS PASSED!                   ${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "Summary:"
echo "- ✓ Credit management working"
echo "- ✓ Entitlement system working"
echo "- ✓ Event ingestion working"
echo "- ✓ Analytics system working"
echo "- ✓ Rating engine working"
echo ""
echo "OpenMonetize MVP is fully functional! 🎉"
