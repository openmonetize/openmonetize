# Changelog

All notable changes to the OpenMonetize SDK will be documented in this file.

## [0.8.0] - 2025-12-05

### ⚠️ BREAKING CHANGES

This release adopts JavaScript/TypeScript camelCase naming conventions. All method parameters and response types have been updated.

### Migration Guide

Update all SDK method calls from snake_case to camelCase:

#### Tracking Methods

```diff
// trackTokenUsage
client.trackTokenUsage({
-  user_id: 'user-123',
-  customer_id: 'customer-456',
-  feature_id: 'chat-feature',
-  input_tokens: 1000,
-  output_tokens: 500,
+  userId: 'user-123',
+  customerId: 'customer-456',
+  featureId: 'chat-feature',
+  inputTokens: 1000,
+  outputTokens: 500,
   provider: 'OPENAI',
   model: 'gpt-4',
});

// trackImageGeneration
client.trackImageGeneration({
-  user_id: 'user-123',
-  customer_id: 'customer-456',
-  feature_id: 'image-gen',
-  image_count: 1,
-  image_size: '1024x1024',
+  userId: 'user-123',
+  customerId: 'customer-456',
+  featureId: 'image-gen',
+  imageCount: 1,
+  imageSize: '1024x1024',
   provider: 'OPENAI',
   model: 'dall-e-3',
});

// trackCustomEvent
client.trackCustomEvent({
-  user_id: 'user-123',
-  customer_id: 'customer-456',
-  feature_id: 'custom-feature',
-  unit_type: 'api_calls',
+  userId: 'user-123',
+  customerId: 'customer-456',
+  featureId: 'custom-feature',
+  unitType: 'api_calls',
   quantity: 10,
});
```

#### Credit Operations

```diff
// purchaseCredits
const result = await client.purchaseCredits({
-  user_id: 'user-123',
-  purchase_price: 10.00,
-  expires_at: '2025-12-31T23:59:59Z',
+  userId: 'user-123',
+  purchasePrice: 10.00,
+  expiresAt: '2025-12-31T23:59:59Z',
   amount: 1000,
});
-console.log(result.transaction_id, result.new_balance);
+console.log(result.transactionId, result.newBalance);

// grantCredits (NEW METHOD)
const grantResult = await client.grantCredits({
  userId: 'user-123',
  amount: 500,
  reason: 'Welcome bonus',
  idempotencyKey: 'unique-key-123',
});
console.log(grantResult.transactionId, grantResult.newBalance);
```

#### Analytics & Cost Calculation

```diff
// calculateCost
const cost = await client.calculateCost({
-  input_tokens: 1000,
-  output_tokens: 500,
+  inputTokens: 1000,
+  outputTokens: 500,
   provider: 'OPENAI',
   model: 'gpt-4',
});
-console.log(cost.cost_breakdown.total_cost_usd);
+console.log(cost.costBreakdown.totalCostUsd);

// getUsageAnalytics
const analytics = await client.getUsageAnalytics({
-  start_date: '2025-01-01',
-  end_date: '2025-12-31',
-  user_id: 'user-123',
+  startDate: '2025-01-01',
+  endDate: '2025-12-31',
+  userId: 'user-123',
});
-console.log(analytics.total_credits, analytics.by_provider);
+console.log(analytics.totalCredits, analytics.byProvider);
```

#### Transaction History Response

```diff
const history = await client.getTransactionHistory('user-123');
history.data.forEach(tx => {
-  console.log(tx.transaction_type, tx.balance_before, tx.balance_after, tx.created_at);
+  console.log(tx.transactionType, tx.balanceBefore, tx.balanceAfter, tx.createdAt);
});
```

### Added

- **`grantCredits()` method**: Grant credits to users without requiring payment (admin operation)
  - Supports idempotency keys to prevent duplicate grants
  - Can grant to specific users or customer-level wallets

### Changed

- All SDK types now use camelCase (JavaScript convention) instead of snake_case
- Removed internal response transformation layer (API and SDK now use matching naming)

### Full Property Mapping

| Before (v0.7.x)    | After (v0.8.0)    |
| ------------------ | ----------------- |
| `user_id`          | `userId`          |
| `customer_id`      | `customerId`      |
| `feature_id`       | `featureId`       |
| `event_id`         | `eventId`         |
| `event_type`       | `eventType`       |
| `input_tokens`     | `inputTokens`     |
| `output_tokens`    | `outputTokens`    |
| `image_count`      | `imageCount`      |
| `image_size`       | `imageSize`       |
| `unit_type`        | `unitType`        |
| `purchase_price`   | `purchasePrice`   |
| `expires_at`       | `expiresAt`       |
| `transaction_id`   | `transactionId`   |
| `new_balance`      | `newBalance`      |
| `wallet_id`        | `walletId`        |
| `idempotency_key`  | `idempotencyKey`  |
| `transaction_type` | `transactionType` |
| `balance_before`   | `balanceBefore`   |
| `balance_after`    | `balanceAfter`    |
| `created_at`       | `createdAt`       |
| `start_date`       | `startDate`       |
| `end_date`         | `endDate`         |
| `total_credits`    | `totalCredits`    |
| `total_cost_usd`   | `totalCostUsd`    |
| `cost_breakdown`   | `costBreakdown`   |
| `by_provider`      | `byProvider`      |
| `by_model`         | `byModel`         |
| `by_feature`       | `byFeature`       |
