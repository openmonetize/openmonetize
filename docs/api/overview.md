# OpenMonetize API Specification

## Overview

The OpenMonetize API provides comprehensive access to billing, metering, and monetization functionality. This document describes the REST API, GraphQL API, and WebSocket interfaces.

## Table of Contents

1. [Authentication](#authentication)
2. [Base URLs](#base-urls)
3. [Core APIs](#core-apis)
4. [Entitlement API](#entitlement-api)
5. [Metering API](#metering-api)
6. [Credit Management API](#credit-management-api)
7. [Pricing API](#pricing-api)
8. [Analytics API](#analytics-api)
9. [Webhooks](#webhooks)
10. [Error Handling](#error-handling)
11. [Rate Limiting](#rate-limiting)
12. [SDKs](#sdks)

## Authentication

### API Key Authentication

```http
Authorization: Bearer om_live_1234567890abcdef
```

### OAuth 2.0

```http
Authorization: Bearer <oauth_token>
```

### JWT Authentication

```http
Authorization: Bearer <jwt_token>
```

## Base URLs

| Environment | Base URL |
|------------|----------|
| Production | `https://api.openmonetize.io/v1` |
| Staging | `https://staging-api.openmonetize.io/v1` |
| EU Region | `https://eu-api.openmonetize.io/v1` |
| APAC Region | `https://apac-api.openmonetize.io/v1` |

## Core APIs

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00Z",
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "queue": "healthy"
  }
}
```

## Entitlement API

### Check Access

Verify if a customer has access to a specific feature.

```http
POST /entitlements/check
```

**Request:**
```json
{
  "customer_id": "cust_123",
  "feature_id": "feature_ai_generation",
  "metadata": {
    "model": "gpt-4",
    "estimated_tokens": 1500
  }
}
```

**Response:**
```json
{
  "allowed": true,
  "remaining_credits": 8500,
  "limit": 10000,
  "reset_at": "2024-02-01T00:00:00Z",
  "cost_preview": {
    "credits": 15,
    "currency_amount": 1.50
  },
  "optimization": {
    "suggested_model": "gpt-3.5-turbo",
    "potential_savings": "75%",
    "quality_score": 0.92
  }
}
```

### Get Entitlements

```http
GET /entitlements?customer_id=cust_123
```

**Response:**
```json
{
  "entitlements": [
    {
      "id": "ent_456",
      "feature_id": "feature_ai_generation",
      "type": "usage",
      "limits": {
        "credits": 10000,
        "period": "monthly"
      },
      "current_usage": 1500,
      "expires_at": "2024-12-31T23:59:59Z"
    }
  ]
}
```

### Update Entitlement

```http
PATCH /entitlements/{entitlement_id}
```

**Request:**
```json
{
  "limits": {
    "credits": 20000
  }
}
```

## Metering API

### Record Usage

Submit usage events for billing.

```http
POST /usage/events
```

**Request:**
```json
{
  "events": [
    {
      "customer_id": "cust_123",
      "event_type": "ai_generation",
      "timestamp": "2024-01-15T10:30:00Z",
      "properties": {
        "model": "gpt-4",
        "input_tokens": 500,
        "output_tokens": 1000,
        "provider": "openai"
      },
      "idempotency_key": "evt_789"
    }
  ]
}
```

**Response:**
```json
{
  "accepted": 1,
  "rejected": 0,
  "events": [
    {
      "id": "evt_789",
      "status": "accepted",
      "credits_consumed": 15,
      "cost": 1.50
    }
  ]
}
```

### Batch Usage Upload

```http
POST /usage/batch
```

**Request:**
```json
{
  "format": "csv",
  "compression": "gzip",
  "data": "base64_encoded_data"
}
```

### Get Usage

```http
GET /usage?customer_id=cust_123&start_time=2024-01-01&end_time=2024-01-31
```

**Response:**
```json
{
  "usage": {
    "customer_id": "cust_123",
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "summary": {
      "total_events": 15000,
      "total_credits": 45000,
      "total_cost": 450.00,
      "optimization_savings": 180.00
    },
    "breakdown": [
      {
        "feature": "ai_generation",
        "events": 10000,
        "credits": 30000,
        "cost": 300.00
      }
    ]
  }
}
```

## Credit Management API

### Get Credit Balance

```http
GET /credits/balance?customer_id=cust_123
```

**Response:**
```json
{
  "customer_id": "cust_123",
  "balance": {
    "available": 8500,
    "pending": 500,
    "total": 9000
  },
  "pools": [
    {
      "id": "pool_main",
      "name": "Main Pool",
      "credits": 8000,
      "expires_at": "2024-12-31T23:59:59Z"
    },
    {
      "id": "pool_promo",
      "name": "Promotional Credits",
      "credits": 500,
      "expires_at": "2024-02-28T23:59:59Z"
    }
  ]
}
```

### Add Credits

```http
POST /credits/add
```

**Request:**
```json
{
  "customer_id": "cust_123",
  "amount": 10000,
  "type": "purchased",
  "expires_at": "2024-12-31T23:59:59Z",
  "metadata": {
    "payment_id": "pay_xyz"
  }
}
```

### Transfer Credits

```http
POST /credits/transfer
```

**Request:**
```json
{
  "from_customer_id": "cust_123",
  "to_customer_id": "cust_456",
  "amount": 1000,
  "reason": "team_sharing"
}
```

### Credit Transactions

```http
GET /credits/transactions?customer_id=cust_123
```

**Response:**
```json
{
  "transactions": [
    {
      "id": "txn_001",
      "type": "debit",
      "amount": 15,
      "balance_after": 8485,
      "description": "AI Generation - GPT-4",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Pricing API

### Get Pricing Plans

```http
GET /pricing/plans
```

**Response:**
```json
{
  "plans": [
    {
      "id": "plan_starter",
      "name": "Starter",
      "type": "hybrid",
      "base_price": 99.00,
      "currency": "USD",
      "billing_period": "monthly",
      "included_credits": 10000,
      "overage_rate": 0.01
    }
  ]
}
```

### Calculate Price

```http
POST /pricing/calculate
```

**Request:**
```json
{
  "customer_id": "cust_123",
  "usage": {
    "ai_generation": 15000,
    "api_calls": 100000
  },
  "plan_id": "plan_pro"
}
```

**Response:**
```json
{
  "calculation": {
    "base_price": 299.00,
    "usage_charges": 150.00,
    "discounts": -44.85,
    "subtotal": 404.15,
    "tax": 36.37,
    "total": 440.52
  },
  "breakdown": [
    {
      "item": "Base Plan",
      "amount": 299.00
    },
    {
      "item": "AI Generation Overage (5000 credits)",
      "amount": 50.00
    }
  ]
}
```

### Create Custom Pricing

```http
POST /pricing/custom
```

**Request:**
```json
{
  "customer_id": "cust_123",
  "rules": [
    {
      "feature": "ai_generation",
      "tiers": [
        {"up_to": 10000, "rate": 0.01},
        {"up_to": 100000, "rate": 0.008},
        {"above": 100000, "rate": 0.006}
      ]
    }
  ]
}
```

## Analytics API

### Get Analytics

```http
GET /analytics?customer_id=cust_123&metrics=cost,usage,optimization
```

**Response:**
```json
{
  "analytics": {
    "period": "last_30_days",
    "metrics": {
      "cost": {
        "total": 1250.00,
        "trend": "+15%",
        "forecast_next_month": 1437.50
      },
      "usage": {
        "total_events": 45000,
        "daily_average": 1500,
        "peak_day": "2024-01-15"
      },
      "optimization": {
        "savings": 520.00,
        "opportunities": [
          {
            "type": "model_downgrade",
            "potential_savings": 200.00,
            "description": "Use GPT-3.5 for simple queries"
          }
        ]
      }
    }
  }
}
```

### Cost Attribution

```http
GET /analytics/attribution?customer_id=cust_123
```

**Response:**
```json
{
  "attribution": {
    "by_feature": [
      {"feature": "ai_generation", "cost": 800.00, "percentage": 64},
      {"feature": "image_generation", "cost": 450.00, "percentage": 36}
    ],
    "by_team": [
      {"team": "engineering", "cost": 700.00, "percentage": 56},
      {"team": "marketing", "cost": 550.00, "percentage": 44}
    ],
    "by_model": [
      {"model": "gpt-4", "cost": 600.00, "percentage": 48},
      {"model": "claude-3", "cost": 400.00, "percentage": 32}
    ]
  }
}
```

## Webhooks

### Webhook Events

```json
{
  "id": "evt_123",
  "type": "credits.low_balance",
  "created_at": "2024-01-15T10:30:00Z",
  "data": {
    "customer_id": "cust_123",
    "balance": 100,
    "threshold": 500
  }
}
```

### Event Types

| Event | Description |
|-------|-------------|
| `credits.low_balance` | Credit balance below threshold |
| `credits.exhausted` | Credits completely depleted |
| `usage.limit_exceeded` | Usage limit exceeded |
| `invoice.created` | New invoice generated |
| `payment.succeeded` | Payment successful |
| `payment.failed` | Payment failed |
| `optimization.available` | Cost optimization opportunity |

### Webhook Configuration

```http
POST /webhooks
```

**Request:**
```json
{
  "url": "https://example.com/webhook",
  "events": ["credits.low_balance", "usage.limit_exceeded"],
  "secret": "webhook_secret_key"
}
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "Customer has insufficient credits for this operation",
    "details": {
      "required_credits": 100,
      "available_credits": 50
    },
    "request_id": "req_abc123"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Malformed request |
| `UNAUTHORIZED` | 401 | Invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Conflicting operation |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

### Rate Limit Headers

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| Entitlement Check | 10,000/min | 1 minute |
| Usage Events | 1,000/sec | 1 second |
| Analytics | 100/min | 1 minute |
| Pricing | 1,000/min | 1 minute |

## SDKs

### Node.js

```javascript
import { OpenMonetize } from '@openmonetize/node';

const om = new OpenMonetize({
  apiKey: 'om_live_123',
  environment: 'production'
});

// Check entitlement
const entitlement = await om.entitlements.check({
  customerId: 'cust_123',
  feature: 'ai_generation',
  metadata: { model: 'gpt-4' }
});

// Record usage
await om.usage.record({
  customerId: 'cust_123',
  eventType: 'ai_generation',
  properties: {
    inputTokens: 500,
    outputTokens: 1000
  }
});
```

### Python

```python
from openmonetize import OpenMonetize

om = OpenMonetize(
    api_key='om_live_123',
    environment='production'
)

# Check entitlement
entitlement = await om.entitlements.check(
    customer_id='cust_123',
    feature='ai_generation',
    metadata={'model': 'gpt-4'}
)

# Record usage
await om.usage.record(
    customer_id='cust_123',
    event_type='ai_generation',
    properties={
        'input_tokens': 500,
        'output_tokens': 1000
    }
)
```

### Go

```go
import "github.com/openmonetize/go-sdk"

client := openmonetize.New(&openmonetize.Config{
    APIKey: "om_live_123",
    Environment: "production",
})

// Check entitlement
entitlement, err := client.Entitlements.Check(&openmonetize.CheckRequest{
    CustomerID: "cust_123",
    Feature: "ai_generation",
    Metadata: map[string]interface{}{
        "model": "gpt-4",
    },
})

// Record usage
err := client.Usage.Record(&openmonetize.UsageEvent{
    CustomerID: "cust_123",
    EventType: "ai_generation",
    Properties: map[string]interface{}{
        "input_tokens": 500,
        "output_tokens": 1000,
    },
})
```

## GraphQL API

### Schema

```graphql
type Query {
  entitlement(customerId: ID!, feature: String!): Entitlement
  usage(customerId: ID!, startTime: DateTime!, endTime: DateTime!): Usage
  credits(customerId: ID!): CreditBalance
  analytics(customerId: ID!, metrics: [String!]): Analytics
}

type Mutation {
  recordUsage(input: UsageEventInput!): UsageEvent
  addCredits(input: AddCreditsInput!): CreditTransaction
  updateEntitlement(id: ID!, input: UpdateEntitlementInput!): Entitlement
}

type Subscription {
  creditBalance(customerId: ID!): CreditBalance
  usageEvents(customerId: ID!): UsageEvent
}
```

### Example Query

```graphql
query GetCustomerData($customerId: ID!) {
  entitlement(customerId: $customerId, feature: "ai_generation") {
    allowed
    remainingCredits
    optimization {
      suggestedModel
      potentialSavings
    }
  }
  credits(customerId: $customerId) {
    available
    pending
  }
  usage(customerId: $customerId, startTime: "2024-01-01", endTime: "2024-01-31") {
    totalEvents
    totalCredits
    totalCost
  }
}
```

## WebSocket API

### Connection

```javascript
const ws = new WebSocket('wss://ws.openmonetize.io/v1');

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'om_live_123'
  }));
});
```

### Real-time Events

```javascript
// Subscribe to credit updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'credits',
  customerId: 'cust_123'
}));

// Receive updates
ws.on('message', (data) => {
  const event = JSON.parse(data);
  console.log('Credit balance:', event.balance);
});
```

## Best Practices

1. **Always use idempotency keys** for usage events to prevent duplicates
2. **Implement exponential backoff** for retries
3. **Cache entitlement responses** with appropriate TTL
4. **Batch usage events** when possible
5. **Use webhooks** for real-time updates instead of polling
6. **Implement circuit breakers** for resilience
7. **Monitor rate limits** and implement queuing
8. **Use appropriate regional endpoints** for lowest latency

## Migration from Competitors

### Stigg Compatibility Mode

```http
POST /compat/stigg/entitlements.check
```

The API accepts Stigg-format requests and returns Stigg-compatible responses while using OpenMonetize infrastructure.

### Stripe Billing Compatibility

```http
POST /compat/stripe/usage_records
```

Compatible with Stripe's usage record format for easy migration.

## Support

- **Documentation**: https://docs.openmonetize.io
- **API Status**: https://status.openmonetize.io
- **Support**: support@openmonetize.io
- **Discord**: https://discord.gg/openmonetize