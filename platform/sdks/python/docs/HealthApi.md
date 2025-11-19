# openmonetize.HealthApi

All URIs are relative to *http://localhost:8081*

Method | HTTP request | Description
------------- | ------------- | -------------
[**health_get**](HealthApi.md#health_get) | **GET** /health | 
[**ready_get**](HealthApi.md#ready_get) | **GET** /ready | 
[**v1_info_get**](HealthApi.md#v1_info_get) | **GET** /v1/info | 


# **health_get**
> HealthGet200Response health_get()

Basic health check endpoint

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.health_get200_response import HealthGet200Response
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
    api_instance = openmonetize.HealthApi(api_client)

    try:
        api_response = api_instance.health_get()
        print("The response of HealthApi->health_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling HealthApi->health_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**HealthGet200Response**](HealthGet200Response.md)

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

# **ready_get**
> ReadyGet200Response ready_get()

Readiness check including database connectivity

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.ready_get200_response import ReadyGet200Response
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
    api_instance = openmonetize.HealthApi(api_client)

    try:
        api_response = api_instance.ready_get()
        print("The response of HealthApi->ready_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling HealthApi->ready_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**ReadyGet200Response**](ReadyGet200Response.md)

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

# **v1_info_get**
> V1InfoGet200Response v1_info_get()

API Gateway information and version

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_info_get200_response import V1InfoGet200Response
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
    api_instance = openmonetize.HealthApi(api_client)

    try:
        api_response = api_instance.v1_info_get()
        print("The response of HealthApi->v1_info_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling HealthApi->v1_info_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**V1InfoGet200Response**](V1InfoGet200Response.md)

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

