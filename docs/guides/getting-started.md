# Getting Started with OpenMonetize

Get your OpenMonetize API key and start tracking AI usage in minutes.

## Step 1: Create Your Account

1. Go to [app.openmonetize.io](https://app.openmonetize.io)
2. Sign in with **Google** or **Email**
3. Complete the onboarding to set up your organization

---

## Step 2: Generate Your API Key

1. Navigate to **Settings** → **API Keys** in the dashboard
2. Click **Generate New Key**
3. Give your key a descriptive name (e.g., "Production", "Development")
4. **Copy the key immediately** — it's only shown once!

Your API key will look like:

```
om_live_xxxxxxxxxxxxxxxxxxxxx
```

> [!WARNING]
> Store your API key securely. Never commit it to version control or expose it in client-side code.

---

## Step 3: Set Up Your Environment

Add your API key to your environment variables:

```bash
# .env file
OPENMONETIZE_API_KEY=om_live_xxxxxxxxxxxxxxxxxxxxx

# Provider API keys (as needed)
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
GEMINI_API_KEY=xxxxx
```

---

## Step 4: Choose Your Integration Method

### Option A: AI Proxy (Recommended)

The easiest way—just change your `baseURL`:

```typescript
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://proxy.openmonetize.io",
  defaultHeaders: {
    "X-OM-Customer-Id": "your-customer-id",
    "X-OM-User-Id": "current-user-id",
    "X-OM-Feature-Id": "ai-chat",
    "X-OM-Api-Key": process.env.OPENMONETIZE_API_KEY,
  },
});

// Use normally - billing is automatic!
const message = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }],
});
```

See the full [AI Proxy Guide](./ai-proxy.md) for more details.

### Option B: SDK Tracking

Use the SDK for manual tracking or when the proxy doesn't fit:

```bash
npm install @openmonetize/sdk
```

```typescript
import { OpenMonetize, withAnthropicTracking } from "@openmonetize/sdk";
import Anthropic from "@anthropic-ai/sdk";

const client = new OpenMonetize({ apiKey: process.env.OPENMONETIZE_API_KEY });
const anthropic = new Anthropic();

const response = await withAnthropicTracking(
  client,
  () =>
    anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hello!" }],
    }),
  {
    customerId: "your-customer-id",
    userId: "current-user-id",
    featureId: "ai-chat",
  },
);
```

See the full [SDK Usage Guide](../sdk-usage-guide.md) for more details.

---

## Step 5: View Your Usage

After making your first tracked request:

1. Open the [Dashboard](https://app.openmonetize.io)
2. Go to **Activity** to see real-time events
3. Go to **Analytics** for aggregated charts and insights

---

## API Key Best Practices

### Use Separate Keys for Environments

| Environment | Key Name     | Purpose                |
| ----------- | ------------ | ---------------------- |
| Development | `dev-local`  | Local testing          |
| Staging     | `staging`    | Pre-production testing |
| Production  | `production` | Live customer traffic  |

### Rotate Keys Regularly

1. Generate a new key
2. Update your environment variables
3. Deploy the change
4. Revoke the old key after confirming everything works

### Secure Storage

- ✅ Environment variables
- ✅ Secret managers (AWS Secrets, Vault, etc.)
- ❌ Source code
- ❌ Client-side JavaScript
- ❌ Logs or error messages

---

## Next Steps

- [AI Proxy Guide](./ai-proxy.md) — Zero-code billing setup
- [SDK Usage Guide](../sdk-usage-guide.md) — Manual tracking for advanced use
- [Dashboard Analytics](./dashboard-analytics.md) — Understanding your usage
- [Troubleshooting](./troubleshooting.md) — Common issues and solutions
