# Troubleshooting Guide

Common issues and solutions when using OpenMonetize.

## Table of Contents

- [Proxy Issues](#proxy-issues)
- [SDK Issues](#sdk-issues)
- [Dashboard Issues](#dashboard-issues)
- [Debug Tips](#debug-tips)

---

## Proxy Issues

### Missing Billing Headers (400 Error)

**Symptom:**

```json
{
  "error": {
    "message": "Missing required OpenMonetize headers. Required: X-OM-Customer-Id, X-OM-User-Id, X-OM-Feature-Id, X-OM-Api-Key",
    "type": "invalid_request_error",
    "code": "missing_billing_headers"
  }
}
```

**Cause:** Your request is missing one or more required OpenMonetize headers.

**Solution:**

```typescript
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://proxy.openmonetize.io",
  defaultHeaders: {
    "X-OM-Customer-Id": "your-customer-id", // Required
    "X-OM-User-Id": "your-user-id", // Required
    "X-OM-Feature-Id": "your-feature-id", // Required
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY, // Required
  },
});
```

---

### Invalid API Key (401 Error)

**Symptom:**

```json
{
  "error": {
    "message": "Invalid OpenMonetize API key",
    "type": "authentication_error",
    "code": "invalid_api_key"
  }
}
```

**Possible Causes:**

1. API key is malformed or copied incorrectly
2. API key has been revoked
3. Using wrong environment key (dev vs production)

**Solution:**

1. Verify your API key in the [Dashboard](https://app.openmonetize.io/api-keys)
2. Regenerate a new key if necessary
3. Ensure `X-OM-Api-Key` header is set correctly

---

### Upstream Provider Errors (4xx/5xx)

The proxy transparently forwards errors from providers (Anthropic, OpenAI, Gemini).

**401 - Invalid Provider API Key:**

```json
{
  "error": {
    "message": "Invalid API key provided",
    "type": "authentication_error"
  }
}
```

**Solution:** Check your provider API key (e.g., `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`).

**429 - Rate Limit Exceeded:**

```json
{
  "error": {
    "message": "Rate limit exceeded",
    "type": "rate_limit_error"
  }
}
```

**Solution:**

- Implement exponential backoff
- Check your provider's rate limits
- Consider upgrading your provider tier

**500/502/503 - Provider Server Errors:**

**Solution:**

- Retry with exponential backoff
- Check provider status pages
- Use fallback providers if available

---

### Proxy Connection Issues (502/504)

**Symptom:** 502 Bad Gateway or 504 Gateway Timeout

**Possible Causes:**

1. Proxy can't reach the upstream provider
2. Ingestion service is unavailable
3. Network timeout

**Solutions:**

1. **Check proxy health:**

   ```bash
   curl https://proxy.openmonetize.io/health
   ```

2. **For local development:**

   ```bash
   # Ensure all services are running
   cd platform && pnpm dev

   # Check individual service health
   curl http://localhost:8082/health  # AI Proxy
   curl http://localhost:8081/health  # Ingestion Service
   ```

3. **Increase timeout settings** in your client if needed

---

### Rate Limiting Behavior

OpenMonetize doesn't impose its own rate limits on the proxy—limits come from upstream providers.

**Handling Rate Limits:**

```typescript
async function callWithRetry(fn: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 429 && i < maxRetries - 1) {
        const retryAfter = error.headers?.["retry-after"] || Math.pow(2, i);
        await new Promise((r) => setTimeout(r, retryAfter * 1000));
        continue;
      }
      throw error;
    }
  }
}
```

---

### Timeout Handling

**Default Timeouts:**

- Provider requests: 60 seconds
- Streaming: No timeout (controlled by provider)

**Handling Timeouts:**

```typescript
// Set custom timeout with AbortController
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);

try {
  const response = await anthropic.messages.create(
    {
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello" }],
    },
    { signal: controller.signal },
  );
} finally {
  clearTimeout(timeout);
}
```

---

## SDK Issues

### SDK Not Tracking Usage

**Symptom:** Usage events not appearing in dashboard

**Checklist:**

1. ✅ Verify API key is valid
2. ✅ Call `await client.flush()` before process exits
3. ✅ Check for network errors in logs
4. ✅ Verify the ingestion endpoint is reachable

**Debug:**

```typescript
const client = new OpenMonetize({
  apiKey: process.env.OPENMONETIZE_API_KEY,
  debug: true, // Enable debug logging
});
```

---

### Tracking Helper Returns Error

**Symptom:** `withAnthropicTracking` or similar throws error

**Common Causes:**

1. Provider call failed (error bubbles up)
2. Tracking call failed (logged but doesn't throw)

**Solution:** The tracking helpers catch and log tracking errors to avoid breaking your app flow. Check your logs for `[OpenMonetize]` entries.

---

## Dashboard Issues

### Usage Not Showing

**Symptom:** Dashboard shows no usage after making API calls

**Possible Causes:**

1. Events haven't been ingested yet (1-2 second delay)
2. Wrong customer/feature filter selected
3. Date range doesn't include recent events

**Solutions:**

1. Wait a few seconds and refresh
2. Check your filters in the Activity page
3. Verify the correct customer is selected

---

### API Keys Page Empty

**Symptom:** No API keys visible in dashboard

**Solution:** Generate your first API key:

1. Go to **Settings** → **API Keys**
2. Click **Generate New Key**
3. Copy and save the key immediately (shown only once)

---

## Debug Tips

### Enable Verbose Logging

**SDK:**

```typescript
const client = new OpenMonetize({
  apiKey: process.env.OPENMONETIZE_API_KEY,
  debug: true,
});
```

**Proxy (local development):**

```bash
LOG_LEVEL=debug pnpm --filter @openmonetize/ai-proxy-service dev
```

### Test Connectivity

```bash
# Test proxy
curl -X POST https://proxy.openmonetize.io/health

# Test ingestion (local)
curl http://localhost:8081/health

# Test with headers
curl -X POST https://proxy.openmonetize.io/v1/messages \
  -H "Content-Type: application/json" \
  -H "X-OM-Customer-Id: test" \
  -H "X-OM-User-Id: test" \
  -H "X-OM-Feature-Id: test" \
  -H "X-OM-Api-Key: your-api-key" \
  -H "x-api-key: your-anthropic-key" \
  -d '{"model": "claude-sonnet-4-20250514", "max_tokens": 10, "messages": [{"role": "user", "content": "Hi"}]}'
```

### Check Event Ingestion

1. Open the **Activity** page in the dashboard
2. Filter by your customer ID
3. Verify events appear with correct metadata

---

## Getting Help

If issues persist:

1. **GitHub Issues**: [openmonetize/openmonetize](https://github.com/openmonetize/openmonetize/issues)
2. **Documentation**: [docs.openmonetize.io](https://docs.openmonetize.io)
3. **Email**: support@openmonetize.io

When reporting issues, include:

- Error messages and stack traces
- SDK/Proxy version
- Example code (sanitized)
- Request/response logs (if available)
