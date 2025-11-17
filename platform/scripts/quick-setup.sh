#!/bin/bash
set -e

echo "🔧 Quick Setup - Creating Test Customer"
echo "========================================"
echo ""

# Generate API key and hash
API_KEY="om_test_$(openssl rand -hex 24)"
API_HASH=$(echo -n "$API_KEY" | sha256sum | cut -d' ' -f1)

echo "🔑 API Key: $API_KEY"
echo "🔐 Hash: $API_HASH"
echo ""

# Clean up existing test data
echo "🧹 Cleaning up existing test data..."
docker exec openmonetize-postgres psql -U admin -d monetization -c "
-- Delete in correct order to respect foreign keys
DELETE FROM credit_transactions WHERE customer_id = 'cust-test-001';
DELETE FROM credit_wallets WHERE customer_id = 'cust-test-001';
DELETE FROM usage_events WHERE customer_id = 'cust-test-001';
DELETE FROM team_memberships WHERE team_id IN (SELECT id FROM teams WHERE customer_id = 'cust-test-001');
DELETE FROM team_memberships WHERE user_id IN (SELECT id FROM users WHERE customer_id = 'cust-test-001');
DELETE FROM users WHERE customer_id = 'cust-test-001';
DELETE FROM teams WHERE customer_id = 'cust-test-001';
DELETE FROM customers WHERE id = 'cust-test-001';
" 2>&1 | grep -v "DELETE" || true

echo "✅ Cleanup complete"
echo ""

# Create customer
echo "👤 Creating test customer..."
docker exec openmonetize-postgres psql -U admin -d monetization -c "
INSERT INTO customers (id, name, email, tier, status, api_key_hash, created_at, updated_at)
VALUES (
  'cust-test-001',
  'Test Company',
  'test@example.com',
  'GROWTH',
  'ACTIVE',
  '$API_HASH',
  NOW(),
  NOW()
);
"

echo "✅ Customer created"
echo ""

# Create wallet
echo "💰 Creating credit wallet..."
docker exec openmonetize-postgres psql -U admin -d monetization -c "
INSERT INTO credit_wallets (id, customer_id, balance, created_at, updated_at)
VALUES (
  'wallet-test-001',
  'cust-test-001',
  1000000,
  NOW(),
  NOW()
);
"

echo "✅ Wallet created with 1,000,000 credits"
echo ""

# Verify
echo "🔍 Verifying..."
docker exec openmonetize-postgres psql -U admin -d monetization -c "
SELECT c.id as customer_id, c.name, c.email, c.tier, w.balance as credits
FROM customers c
LEFT JOIN credit_wallets w ON c.id = w.customer_id
WHERE c.id = 'cust-test-001';
"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔑 Your API Key:"
echo "   $API_KEY"
echo ""
echo "   Save this key! Also saved to: .test-api-key"
echo ""

# Save API key to file
echo "$API_KEY" > .test-api-key
chmod 600 .test-api-key

echo "🚀 Next steps:"
echo ""
echo "   1. Start the ingestion service:"
echo "      cd packages/ingestion-service && pnpm dev"
echo ""
echo "   2. Test with curl:"
echo "      curl -X POST http://localhost:8081/v1/events/ingest \\"
echo "        -H \"Content-Type: application/json\" \\"
echo "        -H \"x-api-key: $API_KEY\" \\"
echo "        -d '{...}'"
echo ""
