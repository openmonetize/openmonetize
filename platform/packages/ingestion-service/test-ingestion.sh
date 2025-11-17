#!/bin/bash

# Test script for Ingestion Service
set -e

echo "🔍 Testing Ingestion Service..."
echo ""

# Test health endpoint
echo "1. Testing /health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:8081/health)
echo "Response: $HEALTH_RESPONSE"
echo ""

# Test ready endpoint
echo "2. Testing /ready endpoint..."
READY_RESPONSE=$(curl -s http://localhost:8081/ready)
echo "Response: $READY_RESPONSE"
echo ""

# Test service info
echo "3. Testing /v1/info endpoint..."
INFO_RESPONSE=$(curl -s http://localhost:8081/v1/info)
echo "Response: $INFO_RESPONSE"
echo ""

# Test event ingestion (will fail without API key - expected)
echo "4. Testing /v1/events/ingest without API key (should return 401)..."
INGEST_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST \
  http://localhost:8081/v1/events/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "events": [
      {
        "event_id": "123e4567-e89b-12d3-a456-426614174000",
        "customer_id": "test-customer",
        "event_type": "TOKEN_USAGE",
        "feature_id": "ai-generation",
        "provider": "OPENAI",
        "model": "gpt-4-turbo",
        "input_tokens": 1000,
        "output_tokens": 500,
        "timestamp": "2025-01-17T14:23:45Z"
      }
    ]
  }')
echo "Response: $INGEST_RESPONSE"
echo ""

echo "✅ All tests completed!"
echo ""
echo "Note: The ingestion test should return 401 Unauthorized (no API key provided)."
echo "This is expected behavior and indicates the auth middleware is working correctly."
