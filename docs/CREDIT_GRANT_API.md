# Credit Grant API

## Overview

The Credit Grant endpoint allows administrators to manually allocate credits to customer, user, or team wallets. This is an admin operation that doesn't require payment processing and is useful for:

- **Initial credit allocation** - Onboarding new customers
- **Promotional credits** - Marketing campaigns
- **Service recovery** - Compensating for service issues
- **Testing** - Setting up test environments
- **Manual adjustments** - Correcting billing errors

## Endpoint

```
POST /v1/credits/grant
```

## Authentication

Required: API key via `X-API-Key` or `Authorization: Bearer` header

## Request Body

```typescript
{
  customerId: string;        // Required: UUID of the customer
  userId?: string;           // Optional: UUID of specific user
  teamId?: string;           // Optional: UUID of specific team
  amount: number;            // Required: Credits to grant (positive integer)
  reason?: string;           // Optional: Description/reason for grant
  metadata?: object;         // Optional: Additional context
  idempotencyKey?: string;   // Optional: Prevent duplicate grants
  expiresAt?: string;        // Optional: ISO 8601 expiration datetime
}
```

### Wallet Selection Logic

The endpoint determines which wallet to grant credits to based on the provided parameters:

1. **Customer-level wallet** - If only `customerId` provided (no userId or teamId)
2. **User-specific wallet** - If `customerId` + `userId` provided
3. **Team-level wallet** - If `customerId` + `teamId` provided

If the target wallet doesn't exist, it will be created automatically.

## Response

### Success (200 OK)

```json
{
  "data": {
    "transactionId": "550e8400-e29b-41d4-a716-446655440000",
    "walletId": "660e8400-e29b-41d4-a716-446655440001",
    "newBalance": "15000",
    "amount": "5000"
  }
}
```

### Forbidden (403)

Returned when trying to grant credits to a different customer without admin privileges.

```json
{
  "error": "Forbidden",
  "message": "Access denied to this customer"
}
```

### Conflict (409)

Returned when the same `idempotencyKey` is used for a duplicate request.

```json
{
  "error": "Conflict",
  "message": "Duplicate grant operation detected"
}
```

### Internal Server Error (500)

```json
{
  "error": "Internal Server Error",
  "message": "Failed to grant credits"
}
```

## Features

### 1. Idempotency

The endpoint supports idempotent operations via the `idempotencyKey` parameter. If the same key is used multiple times, the endpoint will:

- Return the original transaction for subsequent requests
- Prevent duplicate credit grants
- Ensure exactly-once semantics

**Example:**

```bash
# First request - creates new grant
curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 1000,
    "reason": "Promotional credits",
    "idempotencyKey": "promo-2024-q1-customer-123"
  }'

# Second request - returns existing transaction (same idempotencyKey)
curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 1000,
    "reason": "Promotional credits",
    "idempotencyKey": "promo-2024-q1-customer-123"
  }'
```

### 2. Atomic Transactions

Credit grants are processed atomically using database transactions:

```typescript
// Pseudo-code of internal logic
db.$transaction([
  createCreditTransaction({
    transactionType: 'GRANT',
    amount: grantAmount,
    balanceBefore: currentBalance,
    balanceAfter: currentBalance + grantAmount
  }),
  updateCreditWallet({
    balance: currentBalance + grantAmount
  })
]);
```

This ensures:
- **Consistency** - Balance always matches transaction history
- **No race conditions** - Concurrent grants are serialized
- **Rollback on error** - Failed grants don't corrupt data

### 3. Automatic Wallet Creation

If a wallet doesn't exist for the target (customer/user/team), it will be created automatically:

```typescript
// If user wallet doesn't exist
wallet = createWallet({
  customerId: "...",
  userId: "...",
  balance: 0,
  reservedBalance: 0
});
```

### 4. Audit Trail

All grants are recorded in the transaction history with:
- Transaction ID (unique identifier)
- Timestamp (exact grant time)
- Description (reason for grant)
- Metadata (additional context, including who granted the credits)

## Use Cases

### 1. Onboarding New Customer

Grant initial credits to new customers:

```bash
curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 10000,
    "reason": "Welcome credits for new customer",
    "metadata": {
      "campaign": "q4-2024-onboarding",
      "salesRep": "john@company.com"
    }
  }'
```

### 2. User-Specific Promotion

Grant credits to a specific user within a customer account:

```bash
curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440001",
    "amount": 5000,
    "reason": "Referral bonus for user",
    "metadata": {
      "referralCode": "REF123"
    }
  }'
```

### 3. Service Recovery

Compensate customers for service disruptions:

```bash
curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 2000,
    "reason": "Service credit for downtime on 2024-11-15",
    "metadata": {
      "incident": "INC-2024-1115",
      "downtimeMinutes": 45
    },
    "idempotencyKey": "incident-INC-2024-1115-recovery"
  }'
```

### 4. Team Budget Allocation

Grant credits to a team wallet for shared usage:

```bash
curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "teamId": "770e8400-e29b-41d4-a716-446655440002",
    "amount": 50000,
    "reason": "Q4 2024 team budget allocation",
    "metadata": {
      "department": "Engineering",
      "quarter": "Q4-2024"
    }
  }'
```

### 5. Expiring Promotional Credits

Grant credits with an expiration date:

```bash
curl -X POST http://localhost:3000/v1/credits/grant \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "customerId": "550e8400-e29b-41d4-a716-446655440000",
    "amount": 10000,
    "reason": "Limited time promotional offer",
    "expiresAt": "2024-12-31T23:59:59Z",
    "metadata": {
      "campaign": "holiday-2024"
    }
  }'
```

## Testing

A test script is provided at `platform/test-grant-credits.sh`:

```bash
cd platform
./test-grant-credits.sh
```

This script will:
1. Check initial balance
2. Grant credits to customer wallet
3. Verify new balance
4. Test idempotency with duplicate requests

## Security Considerations

1. **Authentication Required** - All requests must include valid API key
2. **Customer Validation** - Can only grant to own customer (unless admin)
3. **Audit Logging** - All grants are logged with grantedBy metadata
4. **Idempotency** - Prevents accidental duplicate grants
5. **Atomic Operations** - Transactions ensure data consistency

## Database Schema

The grant operation interacts with two main tables:

### CreditWallet

```sql
CREATE TABLE credit_wallets (
  id UUID PRIMARY KEY,
  customer_id UUID NOT NULL,
  user_id UUID,
  team_id UUID,
  balance BIGINT DEFAULT 0,
  reserved_balance BIGINT DEFAULT 0,
  currency VARCHAR DEFAULT 'credits',
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### CreditTransaction

```sql
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY,
  wallet_id UUID NOT NULL,
  customer_id UUID NOT NULL,
  transaction_type VARCHAR NOT NULL, -- 'GRANT', 'PURCHASE', 'BURN', etc.
  amount BIGINT NOT NULL,
  balance_before BIGINT NOT NULL,
  balance_after BIGINT NOT NULL,
  description TEXT,
  metadata JSONB,
  idempotency_key VARCHAR UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Related Endpoints

- `GET /v1/credits/balance` - Query current credit balance
- `POST /v1/credits/purchase` - Purchase credits (payment required)
- `GET /v1/customers/:customerId/users/:userId/transactions` - Transaction history

## Implementation Details

- **File**: `platform/packages/api-gateway/src/routes/credits.ts` (lines 309-513)
- **Schema**: `platform/packages/common/src/schemas/credits.ts`
- **Transaction Type**: `GRANT` (defined in Prisma schema)

## Changelog

- **2024-11-18**: Initial implementation of GRANT endpoint
  - Idempotency support
  - Multi-level wallet support (customer/user/team)
  - Automatic wallet creation
  - Atomic transactions
  - Comprehensive error handling
