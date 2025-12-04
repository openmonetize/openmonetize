# @openmonetize/sdk

Official TypeScript/JavaScript SDK for OpenMonetize - AI usage tracking and consumption-based billing.

[![npm version](https://badge.fury.io/js/@openmonetize%2Fsdk.svg)](https://www.npmjs.com/package/@openmonetize/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @openmonetize/sdk
# or
yarn add @openmonetize/sdk
# or
pnpm add @openmonetize/sdk
```

## Quick Start

```typescript
import { OpenMonetize } from "@openmonetize/sdk";

// Initialize the client
const client = new OpenMonetize({
  apiKey: process.env.OPENMONETIZE_API_KEY!,
});

// Track token usage (automatically batched)
client.trackTokenUsage({
  user_id: "law-firm-a",
  customer_id: "legalai-corp",
  feature_id: "legal-research",
  provider: "OPENAI",
  model: "gpt-4",
  input_tokens: 1000,
  output_tokens: 500,
});

// Flush events before process exit (optional, events are auto-flushed)
await client.flush();
```

## Features

- ✅ **Type-Safe** - Full TypeScript support with comprehensive type definitions
- ✅ **Easy Integration** - Drop-in helpers for OpenAI, Anthropic, Google Gemini, and more
- ✅ **Real-Time Tracking** - Track AI usage as it happens
- ✅ **Credit Management** - Check balances, purchase credits, view transactions
- ✅ **Entitlements** - Gate features based on credit balance
- ✅ **Analytics** - Get usage insights and cost breakdowns
- ✅ **Batch Processing** - Efficient bulk event tracking
- ✅ **Error Handling** - Proper error types and retry logic

## Testing with Sandbox

The easiest way to verify your integration is using the OpenMonetize Sandbox. It visualizes the flow of data and helps you debug issues in real-time.

### Local Development

If you are running the platform locally:

1.  Go to `http://localhost:3002/sandbox`.
2.  Use the **Integration Code** tab to copy the snippet for your specific use case.
3.  Run your code and watch the **Live Logs** in the sandbox to see the event travel through the system.

### Cloud Sandbox

If you are using the managed OpenMonetize cloud:

1.  Log in to the [Console](https://console.openmonetize.io).
2.  Navigate to the **Sandbox** tab.
3.  Use your production API key to test events against the live system.

## Usage Examples

### 1. OpenAI Integration

```typescript
import OpenAI from "openai";
import { OpenMonetize, withOpenAITracking } from "@openmonetize/sdk";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const monitor = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });

// Wrap OpenAI calls with automatic tracking
const response = await withOpenAITracking(
  monitor,
  () =>
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: "Write a legal brief" }],
    }),
  {
    customerId: "legalai-corp",
    userId: "law-firm-a",
    featureId: "legal-research",
  },
);

// Usage is automatically tracked!
console.log(response.choices[0].message.content);
```

### 2. Anthropic Integration

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { OpenMonetize, withAnthropicTracking } from "@openmonetize/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const monitor = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });

const response = await withAnthropicTracking(
  monitor,
  () =>
    anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Analyze this contract" }],
    }),
  {
    customerId: "legalai-corp",
    userId: "law-firm-a",
    featureId: "contract-analysis",
  },
);
```

### 3. Google (Gemini) Integration

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenMonetize, withGoogleTracking } from "@openmonetize/sdk";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const monitor = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });

const response = await withGoogleTracking(
  monitor,
  () => model.generateContent("Write a story about a magic backpack."),
  {
    customerId: "legalai-corp",
    userId: "law-firm-a",
    featureId: "story-generation",
    model: "gemini-pro",
  },
);

console.log(response.response.text());
```

### 4. Image Generation Tracking

```typescript
// Track usage for image generation models like DALL-E 3 or Midjourney
client.trackImageGeneration({
  user_id: "law-firm-a",
  customer_id: "legalai-corp",
  feature_id: "marketing-assets",
  provider: "OPENAI",
  model: "dall-e-3",
  image_count: 1,
  image_size: "1024x1024",
  quality: "hd",
});
```

### 5. Custom Event Tracking

```typescript
// Track any custom unit for outcome-based metering
client.trackCustomEvent({
  user_id: "law-firm-a",
  customer_id: "legalai-corp",
  feature_id: "video-transcription",
  unit_type: "minutes",
  quantity: 15.5,
  metadata: {
    file_id: "vid_123",
    language: "en-US",
  },
});
```

### 6. Check Credit Balance Before API Call

```typescript
// Check if user has enough credits
const balance = await client.getCreditBalance('legalai-corp', 'law-firm-a');

if (balance.available < 100) {
  console.log('Insufficient credits!');
  console.log(`Current balance: ${balance.available} credits`);
  console.log(`Reserved: ${balance.reserved} credits`);
  return;
}

// Proceed with AI call
await openai.chat.completions.create({...});
```

### 7. Real-Time Entitlement Check

```typescript
// Check if user can perform an action BEFORE executing it
const entitlement = await client.checkEntitlement('legalai-corp', {
  user_id: 'law-firm-a',
  feature_id: 'legal-research',
  action: {
    type: 'token_usage',
    provider: 'openai',
    model: 'gpt-4',
    estimated_input_tokens: 1000,
    estimated_output_tokens: 500
  }
});

if (!entitlement.allowed) {
  console.log(`Access denied: ${entitlement.reason}`);
  console.log(`Current balance: ${entitlement.current_balance} credits`);
  console.log(`Estimated cost: ${entitlement.estimated_cost_credits} credits`);

  // Show upgrade options
  entitlement.actions.forEach(action => {
    console.log(`${action.label}: ${action.url}`);
  });
  return;
}

// User has sufficient credits, proceed
await openai.chat.completions.create({...});
```

### 8. Batch Event Tracking

> **Note:** All tracking methods (`trackTokenUsage`, `trackImageGeneration`, etc.) are automatically batched by default to optimize performance. You only need to use `BatchTracker` if you want manual control over the batching process.

### 9. Manual Batching

```typescript
import { BatchTracker } from "@openmonetize/sdk";

const tracker = new BatchTracker(client);

// Add multiple events
tracker.add({
  customerId: "legalai-corp",
  userId: "law-firm-a",
  featureId: "document-review",
  provider: "OPENAI",
  model: "gpt-4",
  inputTokens: 1000,
  outputTokens: 500,
});

tracker.add({
  customerId: "legalai-corp",
  userId: "law-firm-b",
  featureId: "contract-analysis",
  provider: "ANTHROPIC",
  model: "claude-3-sonnet",
  inputTokens: 2000,
  outputTokens: 1000,
});

// Flush all events at once
await tracker.flush();
console.log(`Tracked ${tracker.pending} events`);
```

### 10. Purchase Credits

```typescript
// Top up user's credit balance
const result = await client.purchaseCredits("legalai-corp", {
  user_id: "law-firm-a",
  amount: 10000,
  purchase_price: 99.99,
  expires_at: "2025-12-31T23:59:59Z", // Optional
});

console.log(`Transaction ID: ${result.transaction_id}`);
console.log(`New balance: ${result.new_balance} credits`);
```

### 11. Get Usage Analytics

```typescript
const analytics = await client.getUsageAnalytics("legalai-corp", {
  user_id: "law-firm-a",
  start_date: "2025-01-01T00:00:00Z",
  end_date: "2025-01-31T23:59:59Z",
});

console.log(`Total credits used: ${analytics.total_credits}`);
console.log(`Total cost: $${analytics.total_cost_usd}`);

// By provider
Object.entries(analytics.by_provider).forEach(([provider, stats]) => {
  console.log(`${provider}: ${stats.credits} credits (${stats.percentage}%)`);
});

// By model
Object.entries(analytics.by_model).forEach(([model, stats]) => {
  console.log(`${model}: $${stats.cost_usd}`);
});
```

### 12. Calculate Cost Before Execution

```typescript
// Preview cost before making the API call
const cost = await client.calculateCost({
  customerId: 'legalai-corp',
  provider: 'OPENAI',
  model: 'gpt-4',
  input_tokens: 1000,
  output_tokens: 500
});

console.log(`This will cost ${cost.credits} credits`);
console.log(`Provider cost: $${cost.provider_cost_usd}`);
console.log(`Your cost: $${cost.cost_breakdown.total_cost_usd}`);
console.log(`Margin: ${cost.margin_percent}%`);

// Ask user for confirmation
if (await confirmWithUser(cost.credits)) {
  await openai.chat.completions.create({...});
}
```

### 13. Transaction History

```typescript
const history = await client.getTransactionHistory(
  "legalai-corp",
  "law-firm-a",
  {
    limit: 50,
    offset: 0,
  },
);

history.data.forEach((tx) => {
  console.log(`${tx.transaction_type}: ${tx.amount} credits`);
  console.log(`Balance: ${tx.balance_before} → ${tx.balance_after}`);
  console.log(`Date: ${tx.created_at}`);
});

console.log(`Total transactions: ${history.pagination.total}`);
```

## Configuration

### Environment Variables

```bash
# Required
OPENMONETIZE_API_KEY=your_api_key_here

# Optional - for debugging
OPENMONETIZE_BASE_URL=http://localhost:3000  # Default: https://api.openmonetize.io
```

### Client Options

```typescript
const client = new OpenMonetize({
  apiKey: "your_api_key",
  baseUrl: "https://api.openmonetize.io", // Optional
  timeout: 30000, // Optional (ms)
  debug: false, // Optional
});
```

## Error Handling

```typescript
import { OpenMonetizeError } from '@openmonetize/sdk';

try {
  await client.trackTokenUsage({...});
} catch (error) {
  if (error instanceof OpenMonetizeError) {
    console.error('OpenMonetize error:', error.message);
    console.error('Status code:', error.statusCode);
    console.error('Response:', error.response);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import type {
  TokenUsageEvent,
  CreditBalance,
  EntitlementCheckResponse,
  UsageAnalyticsResponse
} from '@openmonetize/sdk';

// All API responses are fully typed
const balance: CreditBalance = await client.getCreditBalance(...);
const analytics: UsageAnalyticsResponse = await client.getUsageAnalytics(...);
```

## Best Practices

### 1. Always Check Entitlements First

```typescript
// ✅ Good: Check before executing
const entitlement = await client.checkEntitlement(...);
if (entitlement.allowed) {
  await executeAIOperation();
}

// ❌ Bad: Execute without checking
await executeAIOperation(); // User might not have credits!
```

### 2. Use Batch Tracking for High Volume

```typescript
// ✅ Good: Batch multiple events
const tracker = new BatchTracker(client);
for (const event of events) {
  tracker.add(event);
}
await tracker.flush();

// ❌ Bad: Individual requests
for (const event of events) {
  await client.trackTokenUsage(event); // Too many API calls!
}
```

### 3. Handle Errors Gracefully

```typescript
// ✅ Good: Async tracking with error handling
client.trackTokenUsage({...}).catch(error => {
  console.error('Failed to track usage:', error);
  // Maybe retry or log to monitoring service
});

// ❌ Bad: Blocking user experience
await client.trackTokenUsage({...}); // Don't block on tracking!
```

## API Reference

### Client Methods

| Method                                               | Description                                       |
| ---------------------------------------------------- | ------------------------------------------------- |
| `trackTokenUsage(params)`                            | Track LLM token consumption (sync, auto-batched)  |
| `trackImageGeneration(params)`                       | Track image generation usage (sync, auto-batched) |
| `trackCustomEvent(params)`                           | Track custom usage events (sync, auto-batched)    |
| `flush()`                                            | Flush pending events to API (returns Promise)     |
| `ingestEvents(request)`                              | Directly ingest batch of events (returns Promise) |
| `getCreditBalance(customerId, userId)`               | Get user's credit balance                         |
| `purchaseCredits(customerId, request)`               | Purchase credits for a user                       |
| `getTransactionHistory(customerId, userId, options)` | Get transaction history                           |
| `checkEntitlement(customerId, request)`              | Check if user can perform an action               |
| `calculateCost(request)`                             | Preview operation cost before execution           |
| `getUsageAnalytics(customerId, request)`             | Get usage analytics                               |
| `getCostBreakdown(customerId, startDate, endDate)`   | Get cost breakdown by provider/model              |
| `normalizeProviderResponse(provider, response)`      | Extract token counts from provider responses      |

### Helper Functions

| Function                                     | Description                                                |
| -------------------------------------------- | ---------------------------------------------------------- |
| `withOpenAITracking(client, fn, context)`    | Wrap OpenAI calls with automatic tracking                  |
| `withAnthropicTracking(client, fn, context)` | Wrap Anthropic calls with automatic tracking               |
| `withGoogleTracking(client, fn, context)`    | Wrap Google Gemini calls with automatic tracking           |
| `trackUsage(client, fn, tracking)`           | Generic tracking wrapper for any provider                  |
| `BatchTracker`                               | Manual batch event processing class                        |
| `formatCredits`                              | Credit formatting utilities (`number`, `withLabel`, `usd`) |
| `validateConfig(config)`                     | Validate environment configuration                         |

## Support

- **Documentation**: https://docs.openmonetize.io
- **Discord**: https://discord.gg/openmonetize
- **GitHub**: https://github.com/openmonetize/sdk
- **Email**: hello@openmonetize.io

## License

Apache 2.0 - See [LICENSE](LICENSE) for details.

---

**Made with ❤️ by the OpenMonetize team**
