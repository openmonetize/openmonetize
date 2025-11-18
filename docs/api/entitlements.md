# Entitlement System API

## Overview

The Entitlement System provides **real-time feature access control** for AI monetization. It prevents overspending by validating credit balances, enforcing usage limits, and providing cost estimates before operations execute.

**Key Capabilities:**
- ✅ Sub-10ms latency for access checks
- ✅ Real-time credit balance validation
- ✅ Multi-level limits (HARD/SOFT/NONE)
- ✅ Cost estimation for token usage
- ✅ Actionable suggestions (upgrade, purchase credits)
- ✅ Flexible limit periods (DAILY/MONTHLY/TOTAL)

## Core Concepts

### Entitlement
An **entitlement** defines what a customer or user is allowed to do with a specific feature.

**Properties:**
- `featureId` - Feature identifier (e.g., "ai-chat", "image-generation")
- `limitType` - How strictly to enforce limits
  - **HARD**: Block operation if limit exceeded
  - **SOFT**: Warn but allow operation
  - **NONE**: No limits (postpaid model)
- `limitValue` - Credit amount for the limit
- `period` - Time window for limit enforcement
  - **DAILY**: Reset every 24 hours
  - **MONTHLY**: Reset monthly
  - **TOTAL**: Lifetime limit

### Access Check Flow

```
1. User requests feature access
   ↓
2. Check: Does entitlement exist?
   ↓ (NO → Deny with upgrade suggestion)
   ↓ (YES)
3. Check: Is credit wallet valid?
   ↓ (NO → Deny with wallet creation prompt)
   ↓ (YES)
4. Check: Are credits expired?
   ↓ (YES → Deny with purchase prompt)
   ↓ (NO)
5. Estimate operation cost
   ↓
6. Apply limit enforcement
   ↓
7. Return decision + actions
```

## API Endpoints

### 1. Check Entitlement (Real-time Access Control)

The most critical endpoint - determines if a user can perform an action.

```
POST /v1/entitlements/check
```

**Request:**
```json
{
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "660e8400-e29b-41d4-a716-446655440001",
  "featureId": "ai-chat",
  "action": {
    "type": "token_usage",
    "provider": "OPENAI",
    "model": "gpt-4",
    "estimated_input_tokens": 1000,
    "estimated_output_tokens": 500
  }
}
```

**Response (Allowed):**
```json
{
  "allowed": true,
  "reason": null,
  "estimatedCostCredits": 15,
  "estimatedCostUsd": 0.015,
  "currentBalance": 9985,
  "actions": []
}
```

**Response (Denied - Insufficient Credits):**
```json
{
  "allowed": false,
  "reason": "Insufficient credits",
  "estimatedCostCredits": 15,
  "estimatedCostUsd": 0.015,
  "currentBalance": 5,
  "actions": [
    {
      "type": "purchase",
      "label": "Purchase Credits",
      "url": "/credits/purchase"
    }
  ]
}
```

**Response (Denied - Feature Not Enabled):**
```json
{
  "allowed": false,
  "reason": "Feature not enabled for this customer",
  "estimatedCostCredits": null,
  "estimatedCostUsd": null,
  "currentBalance": null,
  "actions": [
    {
      "type": "upgrade",
      "label": "Upgrade Plan",
      "url": "/upgrade"
    }
  ]
}
```

### 2. Create Entitlement

```
POST /v1/entitlements
```

**Request:**
```json
{
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "660e8400-e29b-41d4-a716-446655440001",
  "featureId": "ai-chat",
  "limitType": "HARD",
  "limitValue": 10000,
  "period": "MONTHLY",
  "metadata": {
    "tier": "pro",
    "grantedBy": "admin"
  }
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440003",
    "featureId": "ai-chat",
    "limitType": "HARD",
    "limitValue": 10000
  }
}
```

### 3. Update Entitlement

```
PUT /v1/entitlements/:id
```

**Request:**
```json
{
  "limitType": "SOFT",
  "limitValue": 5000,
  "metadata": {
    "reason": "Customer downgraded plan"
  }
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440003",
    "featureId": "ai-chat",
    "limitType": "SOFT",
    "limitValue": 5000
  }
}
```

### 4. Delete Entitlement

```
DELETE /v1/entitlements/:id
```

**Response:** 204 No Content

### 5. List Entitlements

```
GET /v1/customers/:customerId/entitlements
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "featureId": "ai-chat",
      "limitType": "HARD",
      "limitValue": 10000,
      "period": "MONTHLY",
      "metadata": {}
    },
    {
      "featureId": "image-generation",
      "limitType": "SOFT",
      "limitValue": 5000,
      "period": "DAILY",
      "metadata": {}
    }
  ]
}
```

## Limit Types Explained

### HARD Limit
**Behavior:** Strictly enforce - block operation if insufficient credits

**Use Cases:**
- Prepaid customers
- Freemium trials
- Strict budget enforcement
- Prevent overspending

**Example:**
```json
{
  "limitType": "HARD",
  "limitValue": 10000,
  "period": "MONTHLY"
}
```

If user has 50 credits but operation costs 100 credits:
- ✅ `allowed: false`
- ✅ `reason: "Insufficient credits"`
- ✅ Actions suggest purchasing credits

### SOFT Limit
**Behavior:** Warn but allow - operation proceeds with warning

**Use Cases:**
- Postpaid customers
- Premium tiers
- Grace period enforcement
- Usage alerts

**Example:**
```json
{
  "limitType": "SOFT",
  "limitValue": 5000,
  "period": "MONTHLY"
}
```

If user has 50 credits but operation costs 100 credits:
- ✅ `allowed: true`
- ✅ `reason: "Low credits - consider purchasing more"`
- ✅ Actions suggest purchasing credits
- ✅ Operation proceeds

### NONE Limit
**Behavior:** No limits - always allow

**Use Cases:**
- Internal testing
- Enterprise unlimited plans
- Partner accounts
- Admin accounts

**Example:**
```json
{
  "limitType": "NONE",
  "limitValue": null,
  "period": null
}
```

All operations allowed regardless of credit balance.

## Integration Examples

### Frontend Integration

```typescript
// Check if user can use AI chat
async function checkAIChatAccess(
  userId: string,
  estimatedTokens: { input: number; output: number }
): Promise<{ allowed: boolean; reason?: string }> {
  const response = await fetch('/v1/entitlements/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({
      customerId: CUSTOMER_ID,
      userId,
      featureId: 'ai-chat',
      action: {
        type: 'token_usage',
        provider: 'OPENAI',
        model: 'gpt-4',
        estimated_input_tokens: estimatedTokens.input,
        estimated_output_tokens: estimatedTokens.output,
      },
    }),
  });

  const result = await response.json();

  if (!result.allowed) {
    // Show upgrade modal or credit purchase prompt
    showPaywallModal(result.actions);
  }

  return result;
}

// Usage
const access = await checkAIChatAccess(userId, { input: 1000, output: 500 });
if (access.allowed) {
  // Proceed with AI chat
  await sendChatMessage();
} else {
  // Show error message
  alert(`Access denied: ${access.reason}`);
}
```

### Backend Integration

```typescript
// Validate access before processing expensive operation
export async function processAIRequest(
  userId: string,
  prompt: string
): Promise<AIResponse> {
  // 1. Check entitlement first
  const entitlementCheck = await checkEntitlement({
    userId,
    featureId: 'ai-processing',
    estimatedCost: calculateEstimatedCost(prompt),
  });

  if (!entitlementCheck.allowed) {
    throw new ForbiddenError(entitlementCheck.reason);
  }

  // 2. Proceed with operation
  const response = await callOpenAI(prompt);

  // 3. Record actual usage
  await recordUsage({
    userId,
    actualTokens: response.usage,
    creditsBurned: calculateActualCost(response.usage),
  });

  return response;
}
```

## Performance Considerations

### Target Latency
- **P50**: <5ms
- **P95**: <10ms
- **P99**: <20ms

### Optimization Strategies

1. **Database Indexing**
   ```sql
   CREATE INDEX idx_entitlements_lookup
   ON entitlements(customer_id, feature_id);

   CREATE INDEX idx_wallet_lookup
   ON credit_wallets(user_id, customer_id);
   ```

2. **Caching** (Future Enhancement)
   ```typescript
   // Cache entitlements in Redis
   const cachedEntitlement = await redis.get(
     `entitlement:${customerId}:${featureId}`
   );
   ```

3. **Parallel Queries**
   ```typescript
   // Fetch entitlement and wallet in parallel
   const [entitlement, wallet] = await Promise.all([
     db.entitlement.findFirst(...),
     db.creditWallet.findFirst(...),
   ]);
   ```

## Testing

### Test Script

Run the comprehensive test suite:

```bash
cd platform
./test-entitlements.sh
```

This tests:
1. ✅ Create entitlement
2. ✅ Check access (allowed)
3. ✅ List entitlements
4. ✅ Update entitlement
5. ✅ Check with SOFT limit warning
6. ✅ Check non-existent feature (denied)
7. ✅ Delete entitlement
8. ✅ Verify deletion

### Manual Testing

```bash
# Create entitlement
curl -X POST http://localhost:3000/v1/entitlements \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "featureId": "ai-chat",
    "limitType": "HARD",
    "limitValue": 10000
  }'

# Check access
curl -X POST http://localhost:3000/v1/entitlements/check \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440001",
    "featureId": "ai-chat",
    "action": {
      "type": "token_usage",
      "provider": "OPENAI",
      "model": "gpt-4",
      "estimated_input_tokens": 100,
      "estimated_output_tokens": 200
    }
  }'
```

## Security Considerations

1. **Authentication Required** - All endpoints require valid API key
2. **Customer Validation** - Can only access own entitlements
3. **Audit Logging** - All entitlement changes are logged
4. **Rate Limiting** - Prevent abuse of check endpoint (100 req/min default)

## Implementation Details

- **File**: `platform/packages/api-gateway/src/routes/entitlements.ts`
- **Schema**: `platform/packages/common/prisma/schema.prisma` (Entitlement model)
- **Validation**: `platform/packages/common/src/schemas/entitlements.ts`

## Common Patterns

### Pattern 1: Freemium with Hard Limit

```json
{
  "featureId": "ai-chat-free",
  "limitType": "HARD",
  "limitValue": 1000,
  "period": "MONTHLY"
}
```

Users get 1000 credits/month, operations blocked after exhaustion.

### Pattern 2: Pro Tier with Soft Limit

```json
{
  "featureId": "ai-chat-pro",
  "limitType": "SOFT",
  "limitValue": 100000,
  "period": "MONTHLY"
}
```

Users warned at 100K credits but can continue (pay-as-you-go).

### Pattern 3: Enterprise Unlimited

```json
{
  "featureId": "ai-chat-enterprise",
  "limitType": "NONE",
  "limitValue": null,
  "period": null
}
```

No limits, usage tracked for reporting only.

## Future Enhancements

### Roadmap

1. **Redis Caching** - Cache entitlements for sub-millisecond checks
2. **Usage Tracking** - Track consumption against period limits
3. **Auto-Reset** - Automatically reset DAILY/MONTHLY limits
4. **Webhooks** - Notify on limit approaching/exceeded
5. **Analytics** - Dashboard for entitlement usage patterns
6. **A/B Testing** - Test different limit configurations

## Related Documentation

- [Credit System](./CREDIT_GRANT_API.md) - Credit management and grants
- [API Specification](./API_SPECIFICATION.md) - Complete API reference
- [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) - System design

## Changelog

- **2024-11-18**: Initial implementation
  - Real-time entitlement checks (<10ms)
  - CRUD operations for entitlements
  - Multi-level limit enforcement (HARD/SOFT/NONE)
  - Cost estimation integration
  - Comprehensive test suite
