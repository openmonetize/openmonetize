# Dashboard & Analytics Guide

Learn how to view and analyze your AI usage in the OpenMonetize dashboard.

## Accessing the Dashboard

Go to [app.openmonetize.io](https://app.openmonetize.io) and sign in with your account.

---

## Activity Page

The **Activity** page shows real-time usage events as they happen.

### What You'll See

- **Event Type**: Token usage, image generation, or custom events
- **Customer ID**: Which customer made the request
- **User ID**: Which end-user made the request
- **Feature ID**: Which feature was used (e.g., "ai-chat", "document-analysis")
- **Provider & Model**: The AI provider and model used
- **Token Count**: Input and output tokens
- **Cost**: Calculated cost based on provider pricing
- **Timestamp**: When the event occurred

### Filtering Events

Use the filters to narrow down events:

- **Date Range**: Select a time period
- **Customer**: Filter by specific customer
- **Feature**: Filter by feature ID
- **Provider**: Filter by AI provider (Anthropic, OpenAI, Gemini)
- **Model**: Filter by specific model

---

## Analytics Page

The **Analytics** page provides aggregated insights and visualizations.

### Usage Timeline

View your usage trends over time:

- Daily, weekly, or monthly aggregation
- Compare current period vs previous period
- Identify usage spikes and patterns

### Model Breakdown

See which models consume the most resources:

- Token usage by model
- Cost attribution by model
- Identify expensive models for optimization

### Feature Usage

Understand which features drive usage:

- Usage by feature ID
- Cost per feature
- Feature adoption trends

### Filters

Refine your analytics view with:

- **Date Presets**: Today, Last 7 days, Last 30 days, Custom range
- **Customer Filter**: View analytics for specific customers
- **Provider Filter**: Focus on specific AI providers
- **Model Filter**: Drill down to specific models

---

## Understanding Metrics

### Cost Calculation

Costs are calculated using up-to-date provider pricing:

```
Cost = (Input Tokens × Input Price) + (Output Tokens × Output Price)
```

Pricing is automatically updated to match official provider rates.

### Token Counting

- **Input Tokens**: Tokens in your request (prompt, system message, context)
- **Output Tokens**: Tokens in the AI's response
- **Total Tokens**: Sum of input and output tokens

### Usage Events

Each API call creates one usage event containing:

- Customer and user attribution
- Feature identification
- Provider, model, and token breakdown
- Cost calculation
- Custom metadata (if provided)

---

## Exporting Data

### API Access

Use the Analytics API to export data programmatically:

```bash
curl "https://api.openmonetize.io/v1/analytics/usage?customerId=cust_xxx&startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer om_live_xxx"
```

See the [Analytics API Reference](../api/analytics.md) for full details.

---

## Dashboard Tips

### Set Up Alerts

Monitor for:

- Unusual usage spikes
- Cost thresholds
- Error rate increases

### Regular Reviews

- **Daily**: Check Activity for anomalies
- **Weekly**: Review Analytics trends
- **Monthly**: Analyze cost attribution for optimization

### Cost Optimization

Use the dashboard to identify:

- Expensive models that could be downgraded
- Features with unexpectedly high usage
- Users or customers with unusual patterns

---

## Related Guides

- [Getting Started](./getting-started.md) — Set up your account
- [AI Proxy Guide](./ai-proxy.md) — Start tracking usage
- [Analytics API](../api/analytics.md) — Programmatic data access
- [Troubleshooting](./troubleshooting.md) — Usage not showing? Check here
