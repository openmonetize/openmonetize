# OpenMonetize Migration Guide

## Overview

This guide provides step-by-step instructions for migrating from existing billing solutions to OpenMonetize. We support automated migration from major competitors with minimal downtime and risk.

## Table of Contents

1. [Migration Overview](#migration-overview)
2. [Pre-Migration Checklist](#pre-migration-checklist)
3. [Stigg Migration](#stigg-migration)
4. [Stripe Billing Migration](#stripe-billing-migration)
5. [Chargebee Migration](#chargebee-migration)
6. [Custom Solution Migration](#custom-solution-migration)
7. [Data Migration](#data-migration)
8. [Testing Strategy](#testing-strategy)
9. [Go-Live Process](#go-live-process)
10. [Post-Migration](#post-migration)

## Migration Overview

### Migration Principles

1. **Zero Downtime**: Dual-write mode ensures continuous service
2. **Data Integrity**: Full audit trail and validation
3. **Rollback Ready**: Can revert at any point
4. **Gradual Cutover**: Test with subset before full migration

### Typical Timeline

| Phase | Duration | Activities |
|-------|----------|------------|
| Planning | 1 week | Assessment, mapping, timeline |
| Setup | 2-3 days | Account creation, configuration |
| Data Migration | 1-2 days | Historical data import |
| Testing | 1 week | Validation, load testing |
| Dual-Write | 2-4 weeks | Parallel operation |
| Cutover | 1 day | Switch to OpenMonetize |
| Monitoring | 1 week | Post-migration validation |

## Pre-Migration Checklist

### Technical Requirements

- [ ] API keys from current provider
- [ ] Historical data export access
- [ ] Webhook endpoints documented
- [ ] Current pricing model documented
- [ ] Integration points identified
- [ ] Test environment available

### Business Requirements

- [ ] Migration timeline approved
- [ ] Customer communication plan
- [ ] Support team trained
- [ ] Rollback criteria defined
- [ ] Success metrics established

## Stigg Migration

### Step 1: Compatibility Assessment

```javascript
// Install migration analyzer
npm install -g @openmonetize/migration-cli

// Run compatibility check
om-migrate analyze stigg \
  --api-key YOUR_STIGG_API_KEY \
  --output compatibility-report.json
```

### Step 2: Create OpenMonetize Account

```bash
# Sign up for OpenMonetize
om-migrate setup \
  --email your-email@company.com \
  --company "Your Company"
```

### Step 3: Configure Compatibility Layer

```javascript
// Enable Stigg compatibility mode
const om = new OpenMonetize({
  apiKey: 'om_live_xxx',
  compatibility: 'stigg',
  stiggApiKey: 'stigg_xxx' // For dual-write mode
});

// Your existing Stigg code continues to work
await om.entitlements.check({
  customerId: 'customer_123',
  featureId: 'feature_456'
});
```

### Step 4: Data Migration

```bash
# Export from Stigg
om-migrate export stigg \
  --api-key YOUR_STIGG_API_KEY \
  --output stigg-export.json

# Import to OpenMonetize
om-migrate import \
  --source stigg-export.json \
  --api-key om_live_xxx \
  --validate
```

### Step 5: Dual-Write Configuration

```javascript
// middleware/billing.js
class BillingMiddleware {
  constructor() {
    this.stigg = new Stigg({ apiKey: 'stigg_xxx' });
    this.om = new OpenMonetize({ apiKey: 'om_live_xxx' });
  }

  async recordUsage(event) {
    // Write to both systems
    const [stiggResult, omResult] = await Promise.allSettled([
      this.stigg.reportUsage(event),
      this.om.usage.record(event)
    ]);

    // Log any discrepancies
    if (stiggResult.status === 'rejected' || omResult.status === 'rejected') {
      logger.error('Dual-write discrepancy', { stiggResult, omResult });
    }

    return omResult.value || stiggResult.value;
  }
}
```

### Step 6: Webhook Migration

```javascript
// Proxy webhooks during migration
app.post('/webhooks/billing', async (req, res) => {
  const event = req.body;

  // Forward to both systems
  await Promise.all([
    forwardToStigg(event),
    processWithOpenMonetize(event)
  ]);

  res.status(200).send('OK');
});
```

## Stripe Billing Migration

### Step 1: Export Stripe Data

```python
import stripe
from openmonetize import MigrationTool

stripe.api_key = "sk_live_xxx"
migration = MigrationTool()

# Export customers
customers = stripe.Customer.list(limit=100)
migration.add_customers(customers)

# Export subscriptions
subscriptions = stripe.Subscription.list(limit=100)
migration.add_subscriptions(subscriptions)

# Export usage records
usage = stripe.UsageRecord.list(limit=1000)
migration.add_usage(usage)

# Save export
migration.save("stripe-export.json")
```

### Step 2: Map Stripe Models to OpenMonetize

```yaml
# mapping-config.yaml
mappings:
  customer:
    stripe_id: external_id
    email: email
    metadata: metadata

  subscription:
    plan_id: plan_id
    status: status
    current_period_start: billing_period_start
    current_period_end: billing_period_end

  usage:
    quantity: value
    timestamp: timestamp
    subscription_item: feature_id
```

### Step 3: Import to OpenMonetize

```bash
om-migrate import stripe \
  --source stripe-export.json \
  --mapping mapping-config.yaml \
  --api-key om_live_xxx \
  --dry-run # Remove for actual import
```

### Step 4: Update Integration Code

```javascript
// Before (Stripe)
const stripe = require('stripe')('sk_live_xxx');

await stripe.usageRecords.create(
  subscriptionItem.id,
  {
    quantity: 100,
    timestamp: Math.floor(Date.now() / 1000),
    action: 'increment'
  }
);

// After (OpenMonetize)
const om = require('@openmonetize/node')({
  apiKey: 'om_live_xxx'
});

await om.usage.record({
  customerId: 'cust_123',
  eventType: 'api_calls',
  value: 100,
  timestamp: new Date().toISOString()
});
```

## Chargebee Migration

### Step 1: Chargebee Export

```ruby
require 'chargebee'
require 'openmonetize'

ChargeBee.configure(site: "your-site", api_key: "your_api_key")

# Export all data
exporter = OpenMonetize::Migrator.new

# Customers
ChargeBee::Customer.list.each do |customer|
  exporter.add_customer(customer)
end

# Subscriptions
ChargeBee::Subscription.list.each do |subscription|
  exporter.add_subscription(subscription)
end

# Save export
exporter.save('chargebee-export.json')
```

### Step 2: Configuration Mapping

```javascript
// chargebee-migration.js
const migrationConfig = {
  plans: {
    'chargebee_plan_1': 'om_plan_starter',
    'chargebee_plan_2': 'om_plan_pro'
  },
  features: {
    'api_calls': 'feature_api_calls',
    'storage': 'feature_storage'
  },
  addons: {
    'extra_credits': 'credit_pack_1000'
  }
};
```

## Custom Solution Migration

### Step 1: Define Data Schema

```sql
-- Export your custom billing data
SELECT
  c.id as customer_id,
  c.email,
  c.created_at,
  s.plan_name,
  s.status,
  u.event_type,
  u.quantity,
  u.timestamp
FROM customers c
LEFT JOIN subscriptions s ON c.id = s.customer_id
LEFT JOIN usage_events u ON c.id = u.customer_id
WHERE c.created_at > '2023-01-01';
```

### Step 2: Transform Data

```python
import pandas as pd
from openmonetize import DataTransformer

# Load your data
df = pd.read_csv('custom-billing-export.csv')

# Transform to OpenMonetize format
transformer = DataTransformer()

# Map customers
customers = transformer.transform_customers(df, {
  'customer_id': 'external_id',
  'email': 'email',
  'created_at': 'created_at'
})

# Map usage
usage = transformer.transform_usage(df, {
  'event_type': 'feature_id',
  'quantity': 'value',
  'timestamp': 'timestamp'
})

# Validate and save
transformer.validate()
transformer.save('openmonetize-import.json')
```

### Step 3: Custom Import Script

```javascript
const fs = require('fs');
const { OpenMonetize } = require('@openmonetize/node');

const om = new OpenMonetize({ apiKey: 'om_live_xxx' });
const data = JSON.parse(fs.readFileSync('openmonetize-import.json'));

async function migrate() {
  // Import customers
  for (const customer of data.customers) {
    await om.customers.create(customer);
    console.log(`Created customer: ${customer.external_id}`);
  }

  // Import historical usage
  for (const event of data.usage) {
    await om.usage.record(event);
  }

  console.log('Migration complete!');
}

migrate().catch(console.error);
```

## Data Migration

### Validation Framework

```javascript
class MigrationValidator {
  async validate(source, target) {
    const validations = [
      this.validateCustomerCount,
      this.validateRevenue,
      this.validateUsageEvents,
      this.validateCreditBalances
    ];

    const results = await Promise.all(
      validations.map(v => v(source, target))
    );

    return {
      passed: results.every(r => r.passed),
      details: results
    };
  }

  async validateCustomerCount(source, target) {
    const sourceCount = await source.getCustomerCount();
    const targetCount = await target.getCustomerCount();

    return {
      name: 'Customer Count',
      passed: sourceCount === targetCount,
      source: sourceCount,
      target: targetCount
    };
  }
}
```

### Reconciliation Process

```python
# reconciliation.py
import openmonetize as om
from datetime import datetime, timedelta

def reconcile_daily_usage(date):
    """Compare usage between old and new systems"""

    old_usage = fetch_old_system_usage(date)
    new_usage = om.analytics.get_usage(
        start_date=date,
        end_date=date + timedelta(days=1)
    )

    discrepancies = []

    for customer_id in old_usage.keys():
        old_val = old_usage[customer_id]
        new_val = new_usage.get(customer_id, 0)

        if abs(old_val - new_val) > 0.01:  # Tolerance
            discrepancies.append({
                'customer_id': customer_id,
                'old_value': old_val,
                'new_value': new_val,
                'difference': old_val - new_val
            })

    return discrepancies
```

## Testing Strategy

### Test Scenarios

```javascript
// test/migration.test.js
describe('Migration Testing', () => {
  test('Entitlement checks return same results', async () => {
    const testCases = [
      { customerId: 'test_1', feature: 'api_calls' },
      { customerId: 'test_2', feature: 'storage' }
    ];

    for (const test of testCases) {
      const oldResult = await oldSystem.checkEntitlement(test);
      const newResult = await openMonetize.checkEntitlement(test);

      expect(newResult.allowed).toBe(oldResult.allowed);
      expect(newResult.limit).toBe(oldResult.limit);
    }
  });

  test('Usage recording works in dual-write mode', async () => {
    const event = {
      customerId: 'test_1',
      feature: 'api_calls',
      value: 100
    };

    await dualWriter.recordUsage(event);

    const oldUsage = await oldSystem.getUsage('test_1');
    const newUsage = await openMonetize.getUsage('test_1');

    expect(newUsage).toEqual(oldUsage);
  });
});
```

### Load Testing

```bash
# Load test both systems
k6 run \
  --vus 100 \
  --duration 30s \
  load-test.js

# Compare performance
om-migrate compare-performance \
  --old-system stigg \
  --metrics latency,throughput,error-rate
```

## Go-Live Process

### Cutover Checklist

```markdown
## 24 Hours Before
- [ ] Final data sync completed
- [ ] All tests passing
- [ ] Rollback plan confirmed
- [ ] Team notification sent

## 1 Hour Before
- [ ] Maintenance window announced
- [ ] Monitoring dashboards ready
- [ ] Support team on standby

## Cutover
- [ ] Enable OpenMonetize as primary
- [ ] Disable writes to old system
- [ ] Verify traffic flowing correctly
- [ ] Monitor error rates

## 1 Hour After
- [ ] Validate key metrics
- [ ] Check customer reports
- [ ] Review any alerts

## 24 Hours After
- [ ] Full reconciliation complete
- [ ] Performance metrics reviewed
- [ ] Customer feedback collected
```

### Traffic Switching

```nginx
# nginx.conf - Gradual traffic switch
upstream billing {
  server old-billing.example.com weight=90;
  server openmonetize.example.com weight=10;
}

# Increase OpenMonetize weight gradually
# weight=25, weight=50, weight=75, weight=100
```

## Post-Migration

### Monitoring Dashboard

```javascript
// monitoring/dashboard.js
const metrics = {
  // Compare old vs new
  entitlementLatency: {
    old: await getMetric('old.entitlement.latency.p95'),
    new: await getMetric('new.entitlement.latency.p95'),
    improvement: '60%'
  },

  // Track key metrics
  errorRate: await getMetric('openmonetize.error.rate'),
  throughput: await getMetric('openmonetize.throughput'),

  // Business metrics
  revenueRecognized: await getMetric('revenue.recognized.daily'),
  customersActive: await getMetric('customers.active.count')
};
```

### Optimization Opportunities

```python
# Find optimization opportunities post-migration
analyzer = om.OptimizationAnalyzer()

# Analyze model usage
model_recommendations = analyzer.analyze_model_usage(
  lookback_days=30
)

print(f"Potential savings: ${model_recommendations.total_savings}")
print(f"Recommended changes: {model_recommendations.changes}")

# Analyze caching opportunities
cache_opportunities = analyzer.analyze_cache_patterns()
print(f"Cache hit rate: {cache_opportunities.hit_rate}%")
print(f"Cacheable requests: {cache_opportunities.cacheable}%")
```

### Cleanup

```bash
# After successful migration (30 days)

# 1. Archive old system data
om-migrate archive \
  --source old-system \
  --destination s3://backups/billing-archive

# 2. Remove dual-write code
om-migrate cleanup \
  --remove-compatibility-layer \
  --update-documentation

# 3. Revoke old API keys
om-migrate revoke-keys \
  --provider stigg \
  --confirm

# 4. Update monitoring
om-migrate update-monitoring \
  --remove old-system-alerts \
  --add optimization-alerts
```

## Migration Support

### Resources

- **Migration Hotline**: +1-888-MIGRATE
- **Dedicated Slack Channel**: #migration-support
- **Migration Specialist**: migration@openmonetize.io
- **Documentation**: https://docs.openmonetize.io/migration

### Common Issues

| Issue | Solution |
|-------|----------|
| Data discrepancies | Run reconciliation tool |
| Performance degradation | Check cache configuration |
| Missing features | Enable compatibility mode |
| Webhook failures | Verify endpoint configuration |

### Success Stories

> "We migrated from Stigg in 3 days with zero downtime. The automated tools made it seamless." - TechCorp

> "OpenMonetize reduced our AI costs by 45% within the first month after migration." - AI Startup

> "The dual-write mode gave us confidence to migrate gradually without risk." - Enterprise Co

## Conclusion

Migration to OpenMonetize is designed to be safe, gradual, and reversible. Our tools and compatibility layers ensure you can migrate at your own pace while maintaining business continuity. The investment in migration typically pays for itself within 2-3 months through cost optimization and improved efficiency.