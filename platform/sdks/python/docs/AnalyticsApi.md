# openmonetize.AnalyticsApi

All URIs are relative to *http://localhost:8081*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v1_analytics_burn_rate_get**](AnalyticsApi.md#v1_analytics_burn_rate_get) | **GET** /v1/analytics/burn-rate | 
[**v1_analytics_costs_get**](AnalyticsApi.md#v1_analytics_costs_get) | **GET** /v1/analytics/costs | 
[**v1_analytics_usage_get**](AnalyticsApi.md#v1_analytics_usage_get) | **GET** /v1/analytics/usage | 


# **v1_analytics_burn_rate_get**
> V1AnalyticsBurnRateGet200Response v1_analytics_burn_rate_get(customer_id=customer_id, user_id=user_id)

Get credit burn rate and consumption trends

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_analytics_burn_rate_get200_response import V1AnalyticsBurnRateGet200Response
from openmonetize.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost:8081
# See configuration.py for a list of all supported configuration parameters.
configuration = openmonetize.Configuration(
    host = "http://localhost:8081"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (API Key): bearerAuth
configuration = openmonetize.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with openmonetize.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openmonetize.AnalyticsApi(api_client)
    customer_id = 'customer_id_example' # str |  (optional)
    user_id = 'user_id_example' # str |  (optional)

    try:
        api_response = api_instance.v1_analytics_burn_rate_get(customer_id=customer_id, user_id=user_id)
        print("The response of AnalyticsApi->v1_analytics_burn_rate_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AnalyticsApi->v1_analytics_burn_rate_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customer_id** | **str**|  | [optional] 
 **user_id** | **str**|  | [optional] 

### Return type

[**V1AnalyticsBurnRateGet200Response**](V1AnalyticsBurnRateGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **v1_analytics_costs_get**
> V1AnalyticsCostsGet200Response v1_analytics_costs_get(customer_id=customer_id, start_date=start_date, end_date=end_date)

Get cost breakdown and margin analysis

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_analytics_costs_get200_response import V1AnalyticsCostsGet200Response
from openmonetize.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost:8081
# See configuration.py for a list of all supported configuration parameters.
configuration = openmonetize.Configuration(
    host = "http://localhost:8081"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (API Key): bearerAuth
configuration = openmonetize.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with openmonetize.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openmonetize.AnalyticsApi(api_client)
    customer_id = 'customer_id_example' # str |  (optional)
    start_date = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
    end_date = '2013-10-20T19:20:30+01:00' # datetime |  (optional)

    try:
        api_response = api_instance.v1_analytics_costs_get(customer_id=customer_id, start_date=start_date, end_date=end_date)
        print("The response of AnalyticsApi->v1_analytics_costs_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AnalyticsApi->v1_analytics_costs_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customer_id** | **str**|  | [optional] 
 **start_date** | **datetime**|  | [optional] 
 **end_date** | **datetime**|  | [optional] 

### Return type

[**V1AnalyticsCostsGet200Response**](V1AnalyticsCostsGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **v1_analytics_usage_get**
> V1AnalyticsUsageGet200Response v1_analytics_usage_get(customer_id=customer_id, start_date=start_date, end_date=end_date, group_by=group_by)

Get usage analytics by feature for a customer

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_analytics_usage_get200_response import V1AnalyticsUsageGet200Response
from openmonetize.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost:8081
# See configuration.py for a list of all supported configuration parameters.
configuration = openmonetize.Configuration(
    host = "http://localhost:8081"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (API Key): bearerAuth
configuration = openmonetize.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with openmonetize.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openmonetize.AnalyticsApi(api_client)
    customer_id = 'customer_id_example' # str |  (optional)
    start_date = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
    end_date = '2013-10-20T19:20:30+01:00' # datetime |  (optional)
    group_by = 'group_by_example' # str |  (optional)

    try:
        api_response = api_instance.v1_analytics_usage_get(customer_id=customer_id, start_date=start_date, end_date=end_date, group_by=group_by)
        print("The response of AnalyticsApi->v1_analytics_usage_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AnalyticsApi->v1_analytics_usage_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customer_id** | **str**|  | [optional] 
 **start_date** | **datetime**|  | [optional] 
 **end_date** | **datetime**|  | [optional] 
 **group_by** | **str**|  | [optional] 

### Return type

[**V1AnalyticsUsageGet200Response**](V1AnalyticsUsageGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

