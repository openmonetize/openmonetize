# Analytics API

## Overview

The Analytics API provides comprehensive insights into AI usage, costs, and credit consumption patterns. It enables customers to:

- **Track Usage** - Monitor AI consumption by feature, provider, and time period
- **Analyze Costs** - Understand margins, provider costs, and revenue
- **Monitor Burn Rate** - Track credit consumption and predict runout dates
- **Optimize Spending** - Identify high-cost features and optimization opportunities

## Endpoints

### 1. Usage Analytics

Get detailed usage metrics grouped by feature, provider, and time.

```
GET /v1/analytics/usage?customerId={id}&startDate={iso}&endDate={iso}&groupBy={period}
```

**Query Parameters:**
- `customerId` (required): UUID of the customer
- `startDate` (optional): ISO 8601 datetime (default: 30 days ago)
- `endDate` (optional): ISO 8601 datetime (default: now)
- `groupBy` (optional): `day`, `week`, or `month` (default: day)

**Response:**
```json
{
  "data": {
    "summary": {
      "totalEvents": 1250,
      "totalInputTokens": "523000",
      "totalOutputTokens": "187000",
      "totalCreditsBurned": "15750",
      "totalCostUsd": "15.7500"
    },
    "byFeature": [
      {
        "featureId": "ai-chat",
        "eventCount": 800,
        "creditsBurned": "10000",
        "costUsd": "10.0000"
      },
      {
        "featureId": "image-generation",
        "eventCount": 450,
        "creditsBurned": "5750",
        "costUsd": "5.7500"
      }
    ],
    "byProvider": [
      {
        "provider": "OPENAI",
        "model": "gpt-4",
        "eventCount": 600,
        "inputTokens": "400000",
        "outputTokens": "120000"
      },
      {
        "provider": "ANTHROPIC",
        "model": "claude-3-opus",
        "eventCount": 200,
        "inputTokens": "123000",
        "outputTokens": "67000"
      }
    ],
    "timeline": [
      {
        "date": "2024-11-17",
        "events": 42,
        "creditsBurned": "525"
      },
      {
        "date": "2024-11-18",
        "events": 58,
        "creditsBurned": "712"
      }
    ]
  }
}
```

**Use Cases:**
- Dashboard widgets showing usage trends
- Feature adoption analysis
- Provider comparison for cost optimization
- Daily/weekly/monthly reporting

### 2. Cost Analytics

Analyze revenue, provider costs, and profit margins.

```
GET /v1/analytics/costs?customerId={id}&startDate={iso}&endDate={iso}
```

**Query Parameters:**
- `customerId` (required): UUID of the customer
- `startDate` (optional): ISO 8601 datetime (default: 30 days ago)
- `endDate` (optional): ISO 8601 datetime (default: now)

**Response:**
```json
{
  "data": {
    "summary": {
      "totalRevenue": "15.7500",
      "totalProviderCost": "7.8750",
      "totalMargin": "7.8750",
      "marginPercent": 50.0
    },
    "byProvider": [
      {
        "provider": "OPENAI",
        "model": "gpt-4",
        "providerCost": "5.0000",
        "revenue": "10.0000",
        "margin": "5.0000"
      },
      {
        "provider": "ANTHROPIC",
        "model": "claude-3-opus",
        "providerCost": "2.8750",
        "revenue": "5.7500",
        "margin": "2.8750"
      }
    ]
  }
}
```

**Margin Calculation:**
```
Revenue = creditsBurned / 1000  (1000 credits = $1 USD)
Margin = Revenue - Provider Cost
Margin % = (Margin / Revenue) * 100
```

**Use Cases:**
- Financial reporting and profitability analysis
- Identify high-margin vs low-margin providers
- Pricing optimization
- Budget planning

### 3. Burn Rate Analytics

Monitor credit consumption rate and predict when credits will run out.

```
GET /v1/analytics/burn-rate?customerId={id}&userId={id}
```

**Query Parameters:**
- `customerId` (required): UUID of the customer
- `userId` (optional): UUID of specific user (omit for customer-level wallet)

**Response:**
```json
{
  "data": {
    "currentBalance": "8500",
    "last7Days": {
      "creditsBurned": "1400",
      "averagePerDay": "200.00"
    },
    "last30Days": {
      "creditsBurned": "4500",
      "averagePerDay": "150.00"
    },
    "projectedRunout": {
      "daysRemaining": 42,
      "estimatedRunoutDate": "2024-12-30T10:30:00Z"
    },
    "recommendations": [
      {
        "type": "alert",
        "message": "Your burn rate has increased 50% in the last 7 days. Review usage patterns.",
        "action": "review_usage"
      }
    ]
  }
}
```

**Recommendation Types:**
- `urgent` - Less than 7 days of credits remaining
- `warning` - Less than 14 days of credits remaining
- `alert` - Burn rate increased significantly (>50%)

**Projection Algorithm:**
```
Daily Average (7 days) = Last 7 Days Credits Burned / 7
Days Remaining = Current Balance / Daily Average
Runout Date = Today + Days Remaining
```

**Use Cases:**
- Credit balance monitoring
- Proactive purchase notifications
- Usage spike detection
- Budget forecasting

## Integration Examples

### Frontend Dashboard

```typescript
// Fetch usage analytics for dashboard
async function loadUsageDashboard(customerId: string, days: number = 30) {
  const endDate = new Date().toISOString();
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const response = await fetch(
    `/v1/analytics/usage?customerId=${customerId}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: { 'X-API-Key': API_KEY },
    }
  );

  const data = await response.json();

  // Render charts
  renderUsageChart(data.data.timeline);
  renderFeatureBreakdown(data.data.byFeature);
  renderProviderComparison(data.data.byProvider);

  return data;
}

// Monitor burn rate and show alerts
async function checkBurnRate(customerId: string) {
  const response = await fetch(
    `/v1/analytics/burn-rate?customerId=${customerId}`,
    {
      headers: { 'X-API-Key': API_KEY },
    }
  );

  const data = await response.json();

  // Show urgent alerts
  data.data.recommendations.forEach((rec) => {
    if (rec.type === 'urgent') {
      showNotification({
        type: 'error',
        title: 'Low Credits',
        message: rec.message,
        action: rec.action,
      });
    }
  });

  // Update UI
  updateBalanceDisplay(data.data.currentBalance);
  updateRunoutProjection(data.data.projectedRunout);
}
```

### Backend Reporting

```typescript
// Generate monthly usage report
async function generateMonthlyReport(customerId: string, month: string) {
  const startDate = new Date(`${month}-01T00:00:00Z`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const [usage, costs, burnRate] = await Promise.all([
    fetchUsageAnalytics(customerId, startDate, endDate),
    fetchCostAnalytics(customerId, startDate, endDate),
    fetchBurnRate(customerId),
  ]);

  return {
    period: month,
    usage: usage.data.summary,
    costs: costs.data.summary,
    burnRate: burnRate.data,
    topFeatures: usage.data.byFeature.slice(0, 5),
    recommendations: generateRecommendations(usage, costs, burnRate),
  };
}

// Automated alert system
async function checkCreditAlerts() {
  const customers = await getAllCustomers();

  for (const customer of customers) {
    const burnRate = await fetchBurnRate(customer.id);

    if (burnRate.data.projectedRunout.daysRemaining < 7) {
      await sendEmail({
        to: customer.email,
        subject: 'Urgent: Low Credit Balance',
        body: `Your credits will run out in ${burnRate.data.projectedRunout.daysRemaining} days.`,
      });

      await sendWebhook({
        event: 'credit_warning',
        customerId: customer.id,
        daysRemaining: burnRate.data.projectedRunout.daysRemaining,
      });
    }
  }
}
```

## Performance Considerations

### Query Optimization

1. **Date Range Indexing**
   ```sql
   CREATE INDEX idx_usage_events_timestamp
   ON usage_events(customer_id, timestamp DESC);
   ```

2. **Aggregation Strategies**
   - Use database-level aggregation for large datasets
   - Cache recent analytics for frequently accessed data
   - Pre-compute daily/weekly/monthly summaries

3. **Response Time Targets**
   - **P50**: <100ms
   - **P95**: <500ms
   - **P99**: <1s

### Caching Strategy

```typescript
// Cache analytics for 5 minutes
const CACHE_TTL = 300; // seconds

async function getCachedUsageAnalytics(customerId: string, params: AnalyticsParams) {
  const cacheKey = `analytics:usage:${customerId}:${JSON.stringify(params)}`;

  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch fresh data
  const data = await fetchUsageAnalytics(customerId, params);

  // Cache result
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(data));

  return data;
}
```

## Testing

### Test Script

```bash
cd platform
./test-analytics.sh
```

### Manual Testing

```bash
# Usage analytics
curl "http://localhost:3000/v1/analytics/usage?customerId=550e8400-e29b-41d4-a716-446655440000" \
  -H "X-API-Key: your-api-key"

# Cost analytics
curl "http://localhost:3000/v1/analytics/costs?customerId=550e8400-e29b-41d4-a716-446655440000" \
  -H "X-API-Key: your-api-key"

# Burn rate
curl "http://localhost:3000/v1/analytics/burn-rate?customerId=550e8400-e29b-41d4-a716-446655440000" \
  -H "X-API-Key: your-api-key"
```

## Common Patterns

### Pattern 1: Real-time Dashboard

```typescript
// Refresh dashboard every 30 seconds
useEffect(() => {
  const loadData = async () => {
    const data = await fetchUsageAnalytics(customerId, {
      startDate: last7Days,
      endDate: now,
    });
    setDashboardData(data);
  };

  loadData();
  const interval = setInterval(loadData, 30000);

  return () => clearInterval(interval);
}, [customerId]);
```

### Pattern 2: Weekly Email Report

```typescript
// Cron job: Every Monday at 9am
cron.schedule('0 9 * * MON', async () => {
  const customers = await getAllCustomers();

  for (const customer of customers) {
    const report = await generateWeeklyReport(customer.id);
    await sendEmailReport(customer.email, report);
  }
});
```

### Pattern 3: Proactive Alerts

```typescript
// Check burn rate every hour
setInterval(async () => {
  const customers = await getAllCustomers();

  for (const customer of customers) {
    const burnRate = await fetchBurnRate(customer.id);

    burnRate.data.recommendations.forEach(async (rec) => {
      if (rec.type === 'urgent' || rec.type === 'warning') {
        await createNotification({
          customerId: customer.id,
          type: rec.type,
          message: rec.message,
          action: rec.action,
        });
      }
    });
  }
}, 60 * 60 * 1000); // Every hour
```

## Future Enhancements

### Roadmap

1. **Advanced Visualizations**
   - Interactive charts (D3.js/Chart.js integration)
   - Heatmaps for usage patterns
   - Comparative analysis (week-over-week, month-over-month)

2. **Predictive Analytics**
   - ML-based usage forecasting
   - Anomaly detection
   - Cost optimization recommendations

3. **Export Capabilities**
   - CSV/Excel export
   - PDF reports
   - Scheduled email reports

4. **Custom Metrics**
   - User-defined KPIs
   - Custom date ranges
   - Saved report templates

5. **Real-time Streaming**
   - WebSocket support for live updates
   - Real-time alerts
   - Live dashboard updates

## Related Documentation

- [Credit System](./CREDIT_GRANT_API.md) - Credit management
- [Entitlement System](./ENTITLEMENT_SYSTEM.md) - Feature access control
- [API Specification](./API_SPECIFICATION.md) - Complete API reference

## Changelog

- **2024-11-18**: Initial implementation
  - Usage analytics by feature/provider/timeline
  - Cost analytics with margin calculation
  - Burn rate tracking with projections
  - Automated recommendations
