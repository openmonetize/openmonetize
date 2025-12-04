# openmonetize-python

Official Python SDK for OpenMonetize - AI usage tracking and consumption-based billing.

[![PyPI version](https://badge.fury.io/py/openmonetize.svg)](https://pypi.org/project/openmonetize/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
pip install openmonetize
```

## Features

- ✅ **Type-Safe** - Full type hints with Pydantic models
- ✅ **Multiple Event Types** - Token usage, image generation, custom events
- ✅ **Batch Processing** - Efficient bulk event ingestion
- ✅ **Full API Coverage** - Credits, entitlements, analytics, and more
- ✅ **Error Handling** - Proper exception types

## Quick Start

```python
from openmonetize import ApiClient, EventsApi, TokenUsageEvent
from openmonetize.configuration import Configuration

# Initialize the client
config = Configuration()
config.api_key['bearerAuth'] = 'your-api-key'
config.host = 'https://api.openmonetize.io'

client = ApiClient(config)
events_api = EventsApi(client)
```

## Usage Examples

### Tracking Token Usage

```python
from datetime import datetime

event = TokenUsageEvent(
    event_id='evt_123',
    customer_id='cust_abc',
    user_id='user_456',
    feature_id='chat-completion',
    provider='openai',
    model='gpt-4-turbo',
    input_tokens=1000,
    output_tokens=500,
    timestamp=datetime.now().isoformat()
)

events_api.ingest(events=[event])
```

### Tracking Image Generation

```python
from openmonetize import ImageGenerationEvent

event = ImageGenerationEvent(
    event_id='evt_img_123',
    customer_id='cust_abc',
    user_id='user_456',
    feature_id='image-gen',
    provider='openai',
    model='dall-e-3',
    image_count=1,
    image_size='1024x1024',
    quality='hd',
    timestamp=datetime.now().isoformat()
)

events_api.ingest(events=[event])
```

### Tracking Custom Events

```python
from openmonetize import CustomEvent

event = CustomEvent(
    event_id='evt_custom_123',
    customer_id='cust_abc',
    user_id='user_456',
    feature_id='pdf-processing',
    unit_type='pages',
    quantity=10,
    timestamp=datetime.now().isoformat()
)

events_api.ingest(events=[event])
```

### Batch Event Ingestion

```python
# Track multiple events at once
events_api.ingest(events=[event1, event2, event3])
```

## Configuration

```python
from openmonetize.configuration import Configuration

config = Configuration()

# Required: API Key
config.api_key['bearerAuth'] = 'your-api-key'

# Optional: Custom host (default: https://api.openmonetize.io)
config.host = 'https://api.openmonetize.io'

# Optional: Enable debug logging
config.debug = True
```

## Error Handling

```python
from openmonetize import ApiException

try:
    events_api.ingest(events=[event])
except ApiException as e:
    print(f"API error: {e.status} - {e.reason}")
    print(f"Response body: {e.body}")
```

## API Reference

### Available APIs

| API               | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `EventsApi`       | Ingest usage events (token usage, image generation, custom) |
| `CreditsApi`      | Credit balance, purchase, grant, transactions               |
| `EntitlementsApi` | Check user entitlements and access                          |
| `AnalyticsApi`    | Usage analytics, costs, burn rate                           |
| `CustomersApi`    | Customer registration and info                              |
| `HealthApi`       | Health and readiness checks                                 |

### Event Models

| Model                  | Description                                 |
| ---------------------- | ------------------------------------------- |
| `TokenUsageEvent`      | Track LLM token consumption                 |
| `ImageGenerationEvent` | Track image generation usage                |
| `CustomEvent`          | Track custom usage (outcome-based metering) |

## Full API Endpoints

All URIs are relative to `https://api.openmonetize.io`

| Class             | Method                                                                                                                                    | HTTP request                                                   | Description |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------- |
| _AnalyticsApi_    | [**v1_analytics_burn_rate_get**](docs/AnalyticsApi.md#v1_analytics_burn_rate_get)                                                         | **GET** /v1/analytics/burn-rate                                |
| _AnalyticsApi_    | [**v1_analytics_costs_get**](docs/AnalyticsApi.md#v1_analytics_costs_get)                                                                 | **GET** /v1/analytics/costs                                    |
| _AnalyticsApi_    | [**v1_analytics_usage_get**](docs/AnalyticsApi.md#v1_analytics_usage_get)                                                                 | **GET** /v1/analytics/usage                                    |
| _CreditsApi_      | [**v1_credits_balance_get**](docs/CreditsApi.md#v1_credits_balance_get)                                                                   | **GET** /v1/credits/balance                                    |
| _CreditsApi_      | [**v1_credits_grant_post**](docs/CreditsApi.md#v1_credits_grant_post)                                                                     | **POST** /v1/credits/grant                                     |
| _CreditsApi_      | [**v1_credits_purchase_post**](docs/CreditsApi.md#v1_credits_purchase_post)                                                               | **POST** /v1/credits/purchase                                  |
| _CreditsApi_      | [**v1_customers_customer_id_users_user_id_credits_get**](docs/CreditsApi.md#v1_customers_customer_id_users_user_id_credits_get)           | **GET** /v1/customers/{customerId}/users/{userId}/credits      |
| _CreditsApi_      | [**v1_customers_customer_id_users_user_id_transactions_get**](docs/CreditsApi.md#v1_customers_customer_id_users_user_id_transactions_get) | **GET** /v1/customers/{customerId}/users/{userId}/transactions |
| _CustomersApi_    | [**v1_customers_me_get**](docs/CustomersApi.md#v1_customers_me_get)                                                                       | **GET** /v1/customers/me                                       |
| _CustomersApi_    | [**v1_customers_register_post**](docs/CustomersApi.md#v1_customers_register_post)                                                         | **POST** /v1/customers/register                                |
| _DemoApi_         | [**v1_demo_generate_post**](docs/DemoApi.md#v1_demo_generate_post)                                                                        | **POST** /v1/demo/generate                                     |
| _EntitlementsApi_ | [**v1_customers_customer_id_entitlements_get**](docs/EntitlementsApi.md#v1_customers_customer_id_entitlements_get)                        | **GET** /v1/customers/{customerId}/entitlements                |
| _EntitlementsApi_ | [**v1_entitlements_check_post**](docs/EntitlementsApi.md#v1_entitlements_check_post)                                                      | **POST** /v1/entitlements/check                                |
| _EntitlementsApi_ | [**v1_entitlements_id_delete**](docs/EntitlementsApi.md#v1_entitlements_id_delete)                                                        | **DELETE** /v1/entitlements/{id}                               |
| _EntitlementsApi_ | [**v1_entitlements_id_put**](docs/EntitlementsApi.md#v1_entitlements_id_put)                                                              | **PUT** /v1/entitlements/{id}                                  |
| _EntitlementsApi_ | [**v1_entitlements_post**](docs/EntitlementsApi.md#v1_entitlements_post)                                                                  | **POST** /v1/entitlements                                      |
| _HealthApi_       | [**health_get**](docs/HealthApi.md#health_get)                                                                                            | **GET** /health                                                |
| _HealthApi_       | [**ready_get**](docs/HealthApi.md#ready_get)                                                                                              | **GET** /ready                                                 |
| _HealthApi_       | [**v1_info_get**](docs/HealthApi.md#v1_info_get)                                                                                          | **GET** /v1/info                                               |
| _DefaultApi_      | [**v1_analytics_delete**](docs/DefaultApi.md#v1_analytics_delete)                                                                         | **DELETE** /v1/analytics/                                      |
| _DefaultApi_      | [**v1_analytics_delete_0**](docs/DefaultApi.md#v1_analytics_delete_0)                                                                     | **DELETE** /v1/analytics/{\*}                                  |
| _DefaultApi_      | [**v1_analytics_get**](docs/DefaultApi.md#v1_analytics_get)                                                                               | **GET** /v1/analytics/                                         |
| _DefaultApi_      | [**v1_analytics_get_0**](docs/DefaultApi.md#v1_analytics_get_0)                                                                           | **GET** /v1/analytics/{\*}                                     |
| _DefaultApi_      | [**v1_analytics_head**](docs/DefaultApi.md#v1_analytics_head)                                                                             | **HEAD** /v1/analytics/                                        |
| _DefaultApi_      | [**v1_analytics_head_0**](docs/DefaultApi.md#v1_analytics_head_0)                                                                         | **HEAD** /v1/analytics/{\*}                                    |
| _DefaultApi_      | [**v1_analytics_options**](docs/DefaultApi.md#v1_analytics_options)                                                                       | **OPTIONS** /v1/analytics/                                     |
| _DefaultApi_      | [**v1_analytics_options_0**](docs/DefaultApi.md#v1_analytics_options_0)                                                                   | **OPTIONS** /v1/analytics/{\*}                                 |
| _DefaultApi_      | [**v1_analytics_patch**](docs/DefaultApi.md#v1_analytics_patch)                                                                           | **PATCH** /v1/analytics/                                       |
| _DefaultApi_      | [**v1_analytics_patch_0**](docs/DefaultApi.md#v1_analytics_patch_0)                                                                       | **PATCH** /v1/analytics/{\*}                                   |
| _DefaultApi_      | [**v1_analytics_post**](docs/DefaultApi.md#v1_analytics_post)                                                                             | **POST** /v1/analytics/                                        |
| _DefaultApi_      | [**v1_analytics_post_0**](docs/DefaultApi.md#v1_analytics_post_0)                                                                         | **POST** /v1/analytics/{\*}                                    |
| _DefaultApi_      | [**v1_analytics_put**](docs/DefaultApi.md#v1_analytics_put)                                                                               | **PUT** /v1/analytics/                                         |
| _DefaultApi_      | [**v1_analytics_put_0**](docs/DefaultApi.md#v1_analytics_put_0)                                                                           | **PUT** /v1/analytics/{\*}                                     |
| _DefaultApi_      | [**v1_burn_tables_delete**](docs/DefaultApi.md#v1_burn_tables_delete)                                                                     | **DELETE** /v1/burn-tables/                                    |
| _DefaultApi_      | [**v1_burn_tables_delete_0**](docs/DefaultApi.md#v1_burn_tables_delete_0)                                                                 | **DELETE** /v1/burn-tables/{\*}                                |
| _DefaultApi_      | [**v1_burn_tables_get**](docs/DefaultApi.md#v1_burn_tables_get)                                                                           | **GET** /v1/burn-tables/                                       |
| _DefaultApi_      | [**v1_burn_tables_get_0**](docs/DefaultApi.md#v1_burn_tables_get_0)                                                                       | **GET** /v1/burn-tables/{\*}                                   |
| _DefaultApi_      | [**v1_burn_tables_head**](docs/DefaultApi.md#v1_burn_tables_head)                                                                         | **HEAD** /v1/burn-tables/                                      |
| _DefaultApi_      | [**v1_burn_tables_head_0**](docs/DefaultApi.md#v1_burn_tables_head_0)                                                                     | **HEAD** /v1/burn-tables/{\*}                                  |
| _DefaultApi_      | [**v1_burn_tables_options**](docs/DefaultApi.md#v1_burn_tables_options)                                                                   | **OPTIONS** /v1/burn-tables/                                   |
| _DefaultApi_      | [**v1_burn_tables_options_0**](docs/DefaultApi.md#v1_burn_tables_options_0)                                                               | **OPTIONS** /v1/burn-tables/{\*}                               |
| _DefaultApi_      | [**v1_burn_tables_patch**](docs/DefaultApi.md#v1_burn_tables_patch)                                                                       | **PATCH** /v1/burn-tables/                                     |
| _DefaultApi_      | [**v1_burn_tables_patch_0**](docs/DefaultApi.md#v1_burn_tables_patch_0)                                                                   | **PATCH** /v1/burn-tables/{\*}                                 |
| _DefaultApi_      | [**v1_burn_tables_post**](docs/DefaultApi.md#v1_burn_tables_post)                                                                         | **POST** /v1/burn-tables/                                      |
| _DefaultApi_      | [**v1_burn_tables_post_0**](docs/DefaultApi.md#v1_burn_tables_post_0)                                                                     | **POST** /v1/burn-tables/{\*}                                  |
| _DefaultApi_      | [**v1_burn_tables_put**](docs/DefaultApi.md#v1_burn_tables_put)                                                                           | **PUT** /v1/burn-tables/                                       |
| _DefaultApi_      | [**v1_burn_tables_put_0**](docs/DefaultApi.md#v1_burn_tables_put_0)                                                                       | **PUT** /v1/burn-tables/{\*}                                   |
| _DefaultApi_      | [**v1_events_delete**](docs/DefaultApi.md#v1_events_delete)                                                                               | **DELETE** /v1/events/                                         |
| _DefaultApi_      | [**v1_events_delete_0**](docs/DefaultApi.md#v1_events_delete_0)                                                                           | **DELETE** /v1/events/{\*}                                     |
| _DefaultApi_      | [**v1_events_get**](docs/DefaultApi.md#v1_events_get)                                                                                     | **GET** /v1/events/                                            |
| _DefaultApi_      | [**v1_events_get_0**](docs/DefaultApi.md#v1_events_get_0)                                                                                 | **GET** /v1/events/{\*}                                        |
| _DefaultApi_      | [**v1_events_head**](docs/DefaultApi.md#v1_events_head)                                                                                   | **HEAD** /v1/events/                                           |
| _DefaultApi_      | [**v1_events_head_0**](docs/DefaultApi.md#v1_events_head_0)                                                                               | **HEAD** /v1/events/{\*}                                       |
| _DefaultApi_      | [**v1_events_options**](docs/DefaultApi.md#v1_events_options)                                                                             | **OPTIONS** /v1/events/                                        |
| _DefaultApi_      | [**v1_events_options_0**](docs/DefaultApi.md#v1_events_options_0)                                                                         | **OPTIONS** /v1/events/{\*}                                    |
| _DefaultApi_      | [**v1_events_patch**](docs/DefaultApi.md#v1_events_patch)                                                                                 | **PATCH** /v1/events/                                          |
| _DefaultApi_      | [**v1_events_patch_0**](docs/DefaultApi.md#v1_events_patch_0)                                                                             | **PATCH** /v1/events/{\*}                                      |
| _DefaultApi_      | [**v1_events_post**](docs/DefaultApi.md#v1_events_post)                                                                                   | **POST** /v1/events/                                           |
| _DefaultApi_      | [**v1_events_post_0**](docs/DefaultApi.md#v1_events_post_0)                                                                               | **POST** /v1/events/{\*}                                       |
| _DefaultApi_      | [**v1_events_put**](docs/DefaultApi.md#v1_events_put)                                                                                     | **PUT** /v1/events/                                            |
| _DefaultApi_      | [**v1_events_put_0**](docs/DefaultApi.md#v1_events_put_0)                                                                                 | **PUT** /v1/events/{\*}                                        |
| _DefaultApi_      | [**v1_rating_delete**](docs/DefaultApi.md#v1_rating_delete)                                                                               | **DELETE** /v1/rating/                                         |
| _DefaultApi_      | [**v1_rating_delete_0**](docs/DefaultApi.md#v1_rating_delete_0)                                                                           | **DELETE** /v1/rating/{\*}                                     |
| _DefaultApi_      | [**v1_rating_get**](docs/DefaultApi.md#v1_rating_get)                                                                                     | **GET** /v1/rating/                                            |
| _DefaultApi_      | [**v1_rating_get_0**](docs/DefaultApi.md#v1_rating_get_0)                                                                                 | **GET** /v1/rating/{\*}                                        |
| _DefaultApi_      | [**v1_rating_head**](docs/DefaultApi.md#v1_rating_head)                                                                                   | **HEAD** /v1/rating/                                           |
| _DefaultApi_      | [**v1_rating_head_0**](docs/DefaultApi.md#v1_rating_head_0)                                                                               | **HEAD** /v1/rating/{\*}                                       |
| _DefaultApi_      | [**v1_rating_options**](docs/DefaultApi.md#v1_rating_options)                                                                             | **OPTIONS** /v1/rating/                                        |
| _DefaultApi_      | [**v1_rating_options_0**](docs/DefaultApi.md#v1_rating_options_0)                                                                         | **OPTIONS** /v1/rating/{\*}                                    |
| _DefaultApi_      | [**v1_rating_patch**](docs/DefaultApi.md#v1_rating_patch)                                                                                 | **PATCH** /v1/rating/                                          |
| _DefaultApi_      | [**v1_rating_patch_0**](docs/DefaultApi.md#v1_rating_patch_0)                                                                             | **PATCH** /v1/rating/{\*}                                      |
| _DefaultApi_      | [**v1_rating_post**](docs/DefaultApi.md#v1_rating_post)                                                                                   | **POST** /v1/rating/                                           |
| _DefaultApi_      | [**v1_rating_post_0**](docs/DefaultApi.md#v1_rating_post_0)                                                                               | **POST** /v1/rating/{\*}                                       |
| _DefaultApi_      | [**v1_rating_put**](docs/DefaultApi.md#v1_rating_put)                                                                                     | **PUT** /v1/rating/                                            |
| _DefaultApi_      | [**v1_rating_put_0**](docs/DefaultApi.md#v1_rating_put_0)                                                                                 | **PUT** /v1/rating/{\*}                                        |

## Documentation For Models

- [HealthGet200Response](docs/HealthGet200Response.md)
- [ReadyGet200Response](docs/ReadyGet200Response.md)
- [V1AnalyticsBurnRateGet200Response](docs/V1AnalyticsBurnRateGet200Response.md)
- [V1AnalyticsBurnRateGet200ResponseData](docs/V1AnalyticsBurnRateGet200ResponseData.md)
- [V1AnalyticsBurnRateGet200ResponseDataLast7Days](docs/V1AnalyticsBurnRateGet200ResponseDataLast7Days.md)
- [V1AnalyticsBurnRateGet200ResponseDataProjectedRunout](docs/V1AnalyticsBurnRateGet200ResponseDataProjectedRunout.md)
- [V1AnalyticsBurnRateGet200ResponseDataRecommendationsInner](docs/V1AnalyticsBurnRateGet200ResponseDataRecommendationsInner.md)
- [V1AnalyticsCostsGet200Response](docs/V1AnalyticsCostsGet200Response.md)
- [V1AnalyticsCostsGet200ResponseData](docs/V1AnalyticsCostsGet200ResponseData.md)
- [V1AnalyticsCostsGet200ResponseDataByProviderInner](docs/V1AnalyticsCostsGet200ResponseDataByProviderInner.md)
- [V1AnalyticsCostsGet200ResponseDataSummary](docs/V1AnalyticsCostsGet200ResponseDataSummary.md)
- [V1AnalyticsUsageGet200Response](docs/V1AnalyticsUsageGet200Response.md)
- [V1AnalyticsUsageGet200ResponseData](docs/V1AnalyticsUsageGet200ResponseData.md)
- [V1AnalyticsUsageGet200ResponseDataByFeatureInner](docs/V1AnalyticsUsageGet200ResponseDataByFeatureInner.md)
- [V1AnalyticsUsageGet200ResponseDataByProviderInner](docs/V1AnalyticsUsageGet200ResponseDataByProviderInner.md)
- [V1AnalyticsUsageGet200ResponseDataSummary](docs/V1AnalyticsUsageGet200ResponseDataSummary.md)
- [V1AnalyticsUsageGet200ResponseDataTimelineInner](docs/V1AnalyticsUsageGet200ResponseDataTimelineInner.md)
- [V1CreditsBalanceGet200Response](docs/V1CreditsBalanceGet200Response.md)
- [V1CreditsBalanceGet200ResponseData](docs/V1CreditsBalanceGet200ResponseData.md)
- [V1CreditsGrantPost200Response](docs/V1CreditsGrantPost200Response.md)
- [V1CreditsGrantPost200ResponseData](docs/V1CreditsGrantPost200ResponseData.md)
- [V1CreditsGrantPost409Response](docs/V1CreditsGrantPost409Response.md)
- [V1CreditsGrantPostRequest](docs/V1CreditsGrantPostRequest.md)
- [V1CreditsPurchasePost200Response](docs/V1CreditsPurchasePost200Response.md)
- [V1CreditsPurchasePost200ResponseData](docs/V1CreditsPurchasePost200ResponseData.md)
- [V1CreditsPurchasePostRequest](docs/V1CreditsPurchasePostRequest.md)
- [V1CustomersCustomerIdEntitlementsGet200Response](docs/V1CustomersCustomerIdEntitlementsGet200Response.md)
- [V1CustomersCustomerIdEntitlementsGet200ResponseDataInner](docs/V1CustomersCustomerIdEntitlementsGet200ResponseDataInner.md)
- [V1CustomersCustomerIdUsersUserIdCreditsGet200Response](docs/V1CustomersCustomerIdUsersUserIdCreditsGet200Response.md)
- [V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData](docs/V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData.md)
- [V1CustomersCustomerIdUsersUserIdTransactionsGet200Response](docs/V1CustomersCustomerIdUsersUserIdTransactionsGet200Response.md)
- [V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner](docs/V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner.md)
- [V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponsePagination](docs/V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponsePagination.md)
- [V1CustomersMeGet200Response](docs/V1CustomersMeGet200Response.md)
- [V1CustomersMeGet200ResponseData](docs/V1CustomersMeGet200ResponseData.md)
- [V1CustomersRegisterPost201Response](docs/V1CustomersRegisterPost201Response.md)
- [V1CustomersRegisterPost201ResponseData](docs/V1CustomersRegisterPost201ResponseData.md)
- [V1CustomersRegisterPost400Response](docs/V1CustomersRegisterPost400Response.md)
- [V1CustomersRegisterPostRequest](docs/V1CustomersRegisterPostRequest.md)
- [V1DemoGeneratePostRequest](docs/V1DemoGeneratePostRequest.md)
- [V1EntitlementsCheckPost200Response](docs/V1EntitlementsCheckPost200Response.md)
- [V1EntitlementsCheckPost200ResponseActionsInner](docs/V1EntitlementsCheckPost200ResponseActionsInner.md)
- [V1EntitlementsCheckPostRequest](docs/V1EntitlementsCheckPostRequest.md)
- [V1EntitlementsCheckPostRequestAction](docs/V1EntitlementsCheckPostRequestAction.md)
- [V1EntitlementsIdPutRequest](docs/V1EntitlementsIdPutRequest.md)
- [V1EntitlementsPost201Response](docs/V1EntitlementsPost201Response.md)
- [V1EntitlementsPost201ResponseData](docs/V1EntitlementsPost201ResponseData.md)
- [V1EntitlementsPostRequest](docs/V1EntitlementsPostRequest.md)
- [V1InfoGet200Response](docs/V1InfoGet200Response.md)

## Authentication

All API endpoints require authentication using Bearer token format:

```
Authorization: Bearer YOUR_API_KEY
```

Or using the X-API-Key header:

```
X-API-Key: YOUR_API_KEY
```

## Support

- **Documentation**: https://docs.openmonetize.io
- **Discord**: https://discord.gg/openmonetize
- **GitHub**: https://github.com/openmonetize/python-sdk
- **Email**: hello@openmonetize.io

## License

MIT - See [LICENSE](LICENSE) for details.

---

**Made with ❤️ by the OpenMonetize team**
