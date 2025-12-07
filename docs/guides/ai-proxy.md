# AI Proxy Integration Guide

The OpenMonetize AI Proxy is the **easiest way to add usage tracking and billing** to your AI-powered application. Just change your `baseURL` — no code changes required!

## Overview

Instead of manually instrumenting every AI call with SDK tracking, route your requests through the OpenMonetize Proxy. It automatically:

- ✅ Forwards requests to the AI provider (Anthropic, OpenAI, Gemini)
- ✅ Extracts token usage from responses
- ✅ Records usage events to your OpenMonetize account
- ✅ Supports both streaming and non-streaming requests

```
Your App → OpenMonetize Proxy → AI Provider
                ↓
         Usage Tracking → Database
```

## Quick Start

### 1. Get Your OpenMonetize API Key

Get your API key from the [Dashboard](https://app.openmonetize.io/api-keys) or use the seeded test key `om_dev_test_key` for local development.

### 2. Configure Your AI Client

Simply point your AI client to the proxy and add billing headers:

```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://proxy.openmonetize.io", // OpenMonetize Proxy
  defaultHeaders: {
    "X-OM-Customer-Id": "your-company-id",
    "X-OM-User-Id": "end-user-id",
    "X-OM-Feature-Id": "ai-chat",
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY,
  },
});

// Use Anthropic normally - billing is automatic!
const message = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});
```

That's it! Every request is now tracked and billed automatically.

---

## Supported Providers

| Provider  | Endpoint                                     | Status |
| --------- | -------------------------------------------- | ------ |
| Anthropic | `POST /v1/messages`                          | ✅     |
| OpenAI    | `POST /v1/chat/completions`                  | ✅     |
| Gemini    | `POST /v1beta/models/:model:generateContent` | ✅     |

---

## Required Headers

All proxy requests require these billing headers:

| Header             | Required | Description                          |
| ------------------ | -------- | ------------------------------------ |
| `X-OM-Customer-Id` | ✅       | Your customer/company ID for billing |
| `X-OM-User-Id`     | ✅       | End-user ID for attribution          |
| `X-OM-Feature-Id`  | ✅       | Feature/product ID for analytics     |
| `X-OM-Api-Key`     | ✅       | Your OpenMonetize API key            |
| `X-OM-Metadata`    | ❌       | Optional JSON metadata               |

---

## Proxy URLs

| Environment              | URL                             |
| ------------------------ | ------------------------------- |
| **Cloud SaaS (default)** | `https://proxy.openmonetize.io` |
| Local Development        | `http://localhost:8082`         |
| Self-Hosted              | Your custom domain              |

---

## Provider Examples

### Anthropic

```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://proxy.openmonetize.io",
  defaultHeaders: {
    "X-OM-Customer-Id": "cust_your-company",
    "X-OM-User-Id": "user_current-user",
    "X-OM-Feature-Id": "ai-chat",
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY,
  },
});

const message = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});
```

### OpenAI

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://proxy.openmonetize.io/v1", // Note: /v1 for OpenAI
  defaultHeaders: {
    "X-OM-Customer-Id": "cust_your-company",
    "X-OM-User-Id": "user_current-user",
    "X-OM-Feature-Id": "ai-chat",
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY,
  },
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello!" }],
});
```

### Google Gemini

```typescript
// Gemini SDK doesn't support custom baseURL, use fetch directly:
const response = await fetch(
  "https://proxy.openmonetize.io/v1beta/models/gemini-2.0-flash:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY,
      "X-OM-Customer-Id": "cust_your-company",
      "X-OM-User-Id": "user_current-user",
      "X-OM-Feature-Id": "ai-chat",
      "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Hello!" }] }],
    }),
  },
);

const result = await response.json();
```

---

## Streaming Support

The proxy fully supports streaming for all providers. Token usage is extracted from the final chunk and tracked automatically.

```typescript
// Anthropic streaming
const stream = await anthropic.messages.stream({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Tell me a story" }],
});

for await (const event of stream) {
  if (
    event.type === "content_block_delta" &&
    event.delta.type === "text_delta"
  ) {
    process.stdout.write(event.delta.text);
  }
}
```

---

## Error Handling

The proxy handles errors gracefully and provides clear error messages.

### Error Response Format

| HTTP Status | Meaning                              | Action Required              |
| ----------- | ------------------------------------ | ---------------------------- |
| 400         | Missing billing headers              | Add required X-OM-\* headers |
| 401         | Invalid OpenMonetize or provider key | Check API keys               |
| 429         | Rate limit exceeded (upstream)       | Retry with backoff           |
| 502         | Cannot connect to upstream provider  | Check provider status        |
| 504         | Upstream timeout                     | Retry or increase timeout    |

---

### Missing Billing Headers (400)

```json
{
  "error": {
    "message": "Missing required OpenMonetize headers. Required: X-OM-Customer-Id, X-OM-User-Id, X-OM-Feature-Id, X-OM-Api-Key",
    "type": "invalid_request_error",
    "code": "missing_billing_headers"
  }
}
```

**Fix:** Ensure all required headers are set in your client configuration.

---

### Invalid API Key (401)

**OpenMonetize key invalid:**

```json
{
  "error": {
    "message": "Invalid OpenMonetize API key",
    "type": "authentication_error",
    "code": "invalid_api_key"
  }
}
```

**Provider key invalid** (passed through from upstream):

```json
{
  "error": {
    "message": "Invalid API key provided",
    "type": "authentication_error"
  }
}
```

**Fix:** Verify your API keys in the [Dashboard](https://app.openmonetize.io/api-keys) and your provider's console.

---

### Upstream Provider Errors (4xx/5xx)

Provider errors are passed through transparently. Common scenarios:

| Provider Error   | Cause                    | Solution               |
| ---------------- | ------------------------ | ---------------------- |
| 400 Bad Request  | Invalid request body     | Check request format   |
| 401 Unauthorized | Invalid provider API key | Verify provider key    |
| 403 Forbidden    | Insufficient permissions | Check provider account |
| 429 Rate Limited | Too many requests        | Implement backoff      |
| 500 Server Error | Provider issue           | Retry with backoff     |
| 503 Unavailable  | Provider maintenance     | Wait and retry         |

---

### Connectivity Issues (502/504)

**502 Bad Gateway** — Proxy can't reach the upstream provider:

- Check provider status pages
- Verify network connectivity
- Ensure the provider endpoint is correct

**504 Gateway Timeout** — Request took too long:

- Reduce `max_tokens` if possible
- Increase client timeout settings
- Consider using streaming for long responses

---

### Ingestion Service Unavailable

If the proxy can't reach the ingestion service, your AI request **still succeeds** — only usage tracking is skipped. You'll see a warning in logs, but the response is returned normally.

---

### Retry Recommendations

```typescript
async function callWithRetry<T>(
  fn: () => Promise<T>,
  options = { maxRetries: 3, baseDelayMs: 1000 },
): Promise<T> {
  for (let attempt = 0; attempt < options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const status = error.status || error.response?.status;

      // Don't retry client errors (except rate limits)
      if (status && status >= 400 && status < 500 && status !== 429) {
        throw error;
      }

      // Last attempt, throw the error
      if (attempt === options.maxRetries - 1) {
        throw error;
      }

      // Exponential backoff
      const delay = options.baseDelayMs * Math.pow(2, attempt);
      const jitter = Math.random() * 1000;
      await new Promise((r) => setTimeout(r, delay + jitter));
    }
  }
  throw new Error("Max retries exceeded");
}
```

For more detailed troubleshooting, see the [Troubleshooting Guide](./troubleshooting.md)

---

## Local Development

To run the proxy locally:

```bash
cd platform

# Start all services (includes proxy on port 8082)
pnpm dev

# Or start just the proxy
pnpm --filter @openmonetize/ai-proxy-service dev
```

Then update your `baseURL` to `http://localhost:8082`.

---

## Viewing Usage

After making proxied requests, view your usage in:

1. **Dashboard Activity Page** - Real-time usage events
2. **Analytics Page** - Aggregated usage charts
3. **Database** - `usage_events` table

---

## SDK Helper Functions

For convenience, the SDK provides helper functions:

```typescript
import { getProxyConfig } from "@openmonetize/sdk";

const proxyConfig = getProxyConfig({
  openmonetizeApiKey: process.env.OPENMONETIZE_API_KEY,
  customerId: "cust_your-company",
  userId: "user_current-user",
  featureId: "ai-chat",
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: proxyConfig.baseURL,
  defaultHeaders: proxyConfig.headers,
});
```

---

## Fallback: SDK Tracking

If the proxy doesn't fit your architecture, use manual SDK tracking instead:

```typescript
import { OpenMonetize, withAnthropicTracking } from "@openmonetize/sdk";

const client = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });

const response = await withAnthropicTracking(
  client,
  () =>
    anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello" }],
    }),
  {
    customerId: "cust_your-company",
    userId: "user_current-user",
    featureId: "ai-chat",
  },
);
```

Both approaches track the same usage data.

---

## Next Steps

- [API Overview](../api/overview.md) - Complete API reference
- [SDK Usage Guide](../sdk-usage-guide.md) - Manual SDK tracking
- [Analytics API](../api/analytics.md) - Usage reporting
