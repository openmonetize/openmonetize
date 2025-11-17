#!/bin/bash

# Setup Test Data for Ingestion Service
# This script creates a test customer, wallet, and generates an API key

set -e

echo "🔧 OpenMonetize - Test Data Setup"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker compose ps postgres | grep -q "healthy"; then
    echo "❌ PostgreSQL is not running. Please start it with:"
    echo "   docker compose up -d postgres"
    exit 1
fi

echo "✅ PostgreSQL is running"
echo ""

# Generate API key and hash
echo "📝 Generating API key..."
API_KEY_DATA=$(node -e "
const crypto = require('crypto');
const apiKey = 'om_test_' + crypto.randomBytes(24).toString('hex');
const hash = crypto.createHash('sha256').update(apiKey).digest('hex');
console.log(JSON.stringify({ apiKey, hash }));
")

API_KEY=$(echo $API_KEY_DATA | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).apiKey)")
API_HASH=$(echo $API_KEY_DATA | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).hash)")

echo "✅ API Key generated"
echo ""

# Create test customer
echo "👤 Creating test customer..."
docker exec openmonetize-postgres psql -U admin -d monetization <<EOF > /dev/null 2>&1
-- Delete existing test customer if it exists
DELETE FROM credit_transactions WHERE customer_id = 'cust-test-001';
DELETE FROM credit_wallets WHERE customer_id = 'cust-test-001';
DELETE FROM usage_events WHERE customer_id = 'cust-test-001';
DELETE FROM users WHERE customer_id = 'cust-test-001';
DELETE FROM teams WHERE customer_id = 'cust-test-001';
DELETE FROM customers WHERE id = 'cust-test-001';

-- Create new test customer
INSERT INTO customers (
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
    '$API_HASH',
    NOW(),
    NOW()
);
EOF

if [ $? -eq 0 ]; then
    echo "✅ Test customer created (cust-test-001)"
else
    echo "❌ Failed to create test customer"
    exit 1
fi

# Create credit wallet
echo "💰 Creating credit wallet..."
docker exec openmonetize-postgres psql -U admin -d monetization <<EOF > /dev/null 2>&1
INSERT INTO credit_wallets (
    id,
    customer_id,
    balance,
    created_at,
    updated_at
) VALUES (
    'wallet-test-001',
    'cust-test-001',
    1000000,
    NOW(),
    NOW()
);
EOF

if [ $? -eq 0 ]; then
    echo "✅ Credit wallet created (1,000,000 credits)"
else
    echo "❌ Failed to create credit wallet"
    exit 1
fi

# Verify setup
echo ""
echo "🔍 Verifying setup..."

CUSTOMER_COUNT=$(docker exec openmonetize-postgres psql -U admin -d monetization -t -c "SELECT COUNT(*) FROM customers WHERE id = 'cust-test-001';")
WALLET_COUNT=$(docker exec openmonetize-postgres psql -U admin -d monetization -t -c "SELECT COUNT(*) FROM credit_wallets WHERE customer_id = 'cust-test-001';")

if [ $(echo $CUSTOMER_COUNT | xargs) -eq 1 ] && [ $(echo $WALLET_COUNT | xargs) -eq 1 ]; then
    echo "✅ Setup verified"
else
    echo "❌ Setup verification failed"
    exit 1
fi

# Save API key to file
API_KEY_FILE="$(pwd)/.test-api-key"
echo "$API_KEY" > "$API_KEY_FILE"
chmod 600 "$API_KEY_FILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ${GREEN}Setup Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 ${BLUE}Test Account Details:${NC}"
echo "   Customer ID: ${YELLOW}cust-test-001${NC}"
echo "   Wallet ID:   ${YELLOW}wallet-test-001${NC}"
echo "   Balance:     ${YELLOW}1,000,000 credits${NC}"
echo ""
echo "🔑 ${BLUE}API Key:${NC}"
echo "   ${GREEN}$API_KEY${NC}"
echo ""
echo "   ⚠️  ${YELLOW}IMPORTANT: Save this API key - you cannot retrieve it later!${NC}"
echo "   API key also saved to: ${YELLOW}$API_KEY_FILE${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 ${BLUE}Next Steps:${NC}"
echo ""
echo "   1. Start the Ingestion Service:"
echo "      ${YELLOW}cd packages/ingestion-service && pnpm dev${NC}"
echo ""
echo "   2. Test the service:"
echo "      ${YELLOW}./packages/ingestion-service/test-ingestion.sh${NC}"
echo ""
echo "   3. Or test manually:"
echo "      ${YELLOW}curl -X POST http://localhost:8081/v1/events/ingest \\${NC}"
echo "      ${YELLOW}  -H \"Content-Type: application/json\" \\${NC}"
echo "      ${YELLOW}  -H \"x-api-key: $API_KEY\" \\${NC}"
echo "      ${YELLOW}  -d '{...}'${NC}"
echo ""
echo "📖 For full testing guide, see:"
echo "   ${BLUE}packages/ingestion-service/TESTING_GUIDE.md${NC}"
echo ""
