# AI Proxy Integration Examples

This document provides copy-paste code examples for integrating the OpenMonetize AI Proxy with your existing AI provider code.

## Prerequisites

Start the AI Proxy service:

```bash
cd platform
pnpm --filter @openmonetize/ai-proxy-service dev
```

The proxy runs on **port 8082** by default.

---

## OpenAI Integration

### Using the SDK Helper (Recommended)

```typescript
import OpenAI from "openai";
import { createBilledOpenAIConfig } from "@openmonetize/sdk";

const openai = new OpenAI(
  createBilledOpenAIConfig({
    openaiApiKey: process.env.OPENAI_API_KEY!,
    openmonetizeApiKey: process.env.OPENMONETIZE_API_KEY!,
    customerId: "cust_your-company",
    userId: "user_current-user",
    featureId: "ai-chat",
    proxyBaseUrl: "http://localhost:8082/v1", // Or your deployed proxy URL
  }),
);

// Use OpenAI normally - billing is automatic!
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(response.choices[0].message.content);
```

### Manual Configuration

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "http://localhost:8082/v1",
  defaultHeaders: {
    "X-OM-Customer-Id": "cust_your-company",
    "X-OM-User-Id": "user_current-user",
    "X-OM-Feature-Id": "ai-chat",
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY!,
  },
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello!" }],
});
```

### Streaming Support

```typescript
const stream = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Tell me a story" }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}
```

---

## Anthropic Integration

```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "http://localhost:8082", // Proxy URL (without /v1)
  defaultHeaders: {
    "X-OM-Customer-Id": "cust_your-company",
    "X-OM-User-Id": "user_current-user",
    "X-OM-Feature-Id": "ai-chat",
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY!,
  },
});

const message = await anthropic.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(message.content[0].text);
```

### Streaming Support

```typescript
const stream = await anthropic.messages.stream({
  model: "claude-3-sonnet-20240229",
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

## Google Gemini Integration

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

// Note: Gemini SDK doesn't support custom baseURL directly,
// so make direct fetch calls to the proxy:

const response = await fetch(
  "http://localhost:8082/v1beta/models/gemini-1.5-flash:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY!,
      "X-OM-Customer-Id": "cust_your-company",
      "X-OM-User-Id": "user_current-user",
      "X-OM-Feature-Id": "ai-chat",
      "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY!,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Hello!" }] }],
    }),
  },
);

const result = await response.json();
console.log(result.candidates[0].content.parts[0].text);
```

---

## Environment Variables

Add these to your `.env` file:

```bash
# OpenMonetize
OPENMONETIZE_API_KEY=om_live_your_key_here

# AI Providers
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
GEMINI_API_KEY=your-gemini-key
```

---

## Custom Headers Reference

| Header             | Required | Description                          |
| ------------------ | -------- | ------------------------------------ |
| `X-OM-Customer-Id` | ✅       | Your customer/company ID for billing |
| `X-OM-User-Id`     | ✅       | End-user ID for attribution          |
| `X-OM-Feature-Id`  | ✅       | Feature/product ID for analytics     |
| `X-OM-Api-Key`     | ✅       | Your OpenMonetize API key            |
| `X-OM-Metadata`    | ❌       | Optional JSON metadata               |

---

## Deployment URLs

| Environment              | Proxy URL                       |
| ------------------------ | ------------------------------- |
| **Cloud SaaS (default)** | `https://proxy.openmonetize.io` |
| Local Development        | `http://localhost:8082`         |
| Self-Hosted              | Your custom domain              |

---

## Fallback to SDK Tracking

If the proxy approach doesn't fit your architecture, you can still use manual SDK tracking:

```typescript
import { OpenMonetize, withOpenAITracking } from "@openmonetize/sdk";

const om = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY! });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await withOpenAITracking(
  om,
  () =>
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: "Hello" }],
    }),
  {
    customerId: "cust_your-company",
    userId: "user_current-user",
    featureId: "ai-chat",
  },
);
```

Both approaches track the same usage data to the ingestion service.
