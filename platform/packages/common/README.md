# @openmonetize/common

Shared types, utilities, and database client for the OpenMonetize platform.

## Contents

- **Types**: TypeScript type definitions for events, credits, entitlements, providers
- **Schemas**: Zod validation schemas for runtime type checking
- **Utils**: Utility functions for crypto, formatting, validation
- **Database**: Prisma client and connection management

## Usage

```typescript
import {
  // Types
  TokenUsageEvent,
  CreditBalance,
  EntitlementCheckRequest,

  // Schemas
  usageEventSchema,
  entitlementCheckRequestSchema,

  // Utils
  generateApiKey,
  formatCredits,
  formatUSD,

  // Database
  getPrismaClient,
  withTransaction
} from '@openmonetize/common';

// Validate an event
const result = usageEventSchema.safeParse(eventData);

// Get database client
const db = getPrismaClient();
const customer = await db.customer.findUnique({ where: { id: 'customer_id' } });

// Execute a transaction
await withTransaction(async (tx) => {
  await tx.creditTransaction.create({ data: {...} });
  await tx.creditWallet.update({ where: {...}, data: {...} });
});
```

## Database Commands

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate:dev

# Open Prisma Studio
pnpm db:studio
```
