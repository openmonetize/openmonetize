# openmonetize.EntitlementsApi

All URIs are relative to *http://localhost:8081*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v1_customers_customer_id_entitlements_get**](EntitlementsApi.md#v1_customers_customer_id_entitlements_get) | **GET** /v1/customers/{customerId}/entitlements | 
[**v1_entitlements_check_post**](EntitlementsApi.md#v1_entitlements_check_post) | **POST** /v1/entitlements/check | 
[**v1_entitlements_id_delete**](EntitlementsApi.md#v1_entitlements_id_delete) | **DELETE** /v1/entitlements/{id} | 
[**v1_entitlements_id_put**](EntitlementsApi.md#v1_entitlements_id_put) | **PUT** /v1/entitlements/{id} | 
[**v1_entitlements_post**](EntitlementsApi.md#v1_entitlements_post) | **POST** /v1/entitlements | 


# **v1_customers_customer_id_entitlements_get**
> V1CustomersCustomerIdEntitlementsGet200Response v1_customers_customer_id_entitlements_get(customer_id)

List all entitlements for a customer

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_customers_customer_id_entitlements_get200_response import V1CustomersCustomerIdEntitlementsGet200Response
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
    api_instance = openmonetize.EntitlementsApi(api_client)
    customer_id = 'customer_id_example' # str | 

    try:
        api_response = api_instance.v1_customers_customer_id_entitlements_get(customer_id)
        print("The response of EntitlementsApi->v1_customers_customer_id_entitlements_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EntitlementsApi->v1_customers_customer_id_entitlements_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customer_id** | **str**|  | 

### Return type

[**V1CustomersCustomerIdEntitlementsGet200Response**](V1CustomersCustomerIdEntitlementsGet200Response.md)

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

# **v1_entitlements_check_post**
> V1EntitlementsCheckPost200Response v1_entitlements_check_post(v1_entitlements_check_post_request)

Check if a user is entitled to perform an action (sub-10ms latency)

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_entitlements_check_post200_response import V1EntitlementsCheckPost200Response
from openmonetize.models.v1_entitlements_check_post_request import V1EntitlementsCheckPostRequest
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
    api_instance = openmonetize.EntitlementsApi(api_client)
    v1_entitlements_check_post_request = openmonetize.V1EntitlementsCheckPostRequest() # V1EntitlementsCheckPostRequest | 

    try:
        api_response = api_instance.v1_entitlements_check_post(v1_entitlements_check_post_request)
        print("The response of EntitlementsApi->v1_entitlements_check_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EntitlementsApi->v1_entitlements_check_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **v1_entitlements_check_post_request** | [**V1EntitlementsCheckPostRequest**](V1EntitlementsCheckPostRequest.md)|  | 

### Return type

[**V1EntitlementsCheckPost200Response**](V1EntitlementsCheckPost200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **v1_entitlements_id_delete**
> v1_entitlements_id_delete(id)

Delete an entitlement

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
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
    api_instance = openmonetize.EntitlementsApi(api_client)
    id = 'id_example' # str | 

    try:
        api_instance.v1_entitlements_id_delete(id)
    except Exception as e:
        print("Exception when calling EntitlementsApi->v1_entitlements_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Entitlement deleted successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **v1_entitlements_id_put**
> V1EntitlementsPost201Response v1_entitlements_id_put(id, v1_entitlements_id_put_request=v1_entitlements_id_put_request)

Update an existing entitlement

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_entitlements_id_put_request import V1EntitlementsIdPutRequest
from openmonetize.models.v1_entitlements_post201_response import V1EntitlementsPost201Response
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
    api_instance = openmonetize.EntitlementsApi(api_client)
    id = 'id_example' # str | 
    v1_entitlements_id_put_request = openmonetize.V1EntitlementsIdPutRequest() # V1EntitlementsIdPutRequest |  (optional)

    try:
        api_response = api_instance.v1_entitlements_id_put(id, v1_entitlements_id_put_request=v1_entitlements_id_put_request)
        print("The response of EntitlementsApi->v1_entitlements_id_put:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EntitlementsApi->v1_entitlements_id_put: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  | 
 **v1_entitlements_id_put_request** | [**V1EntitlementsIdPutRequest**](V1EntitlementsIdPutRequest.md)|  | [optional] 

### Return type

[**V1EntitlementsPost201Response**](V1EntitlementsPost201Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **v1_entitlements_post**
> V1EntitlementsPost201Response v1_entitlements_post(v1_entitlements_post_request)

Create a new entitlement for a customer or user

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_entitlements_post201_response import V1EntitlementsPost201Response
from openmonetize.models.v1_entitlements_post_request import V1EntitlementsPostRequest
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
    api_instance = openmonetize.EntitlementsApi(api_client)
    v1_entitlements_post_request = openmonetize.V1EntitlementsPostRequest() # V1EntitlementsPostRequest | 

    try:
        api_response = api_instance.v1_entitlements_post(v1_entitlements_post_request)
        print("The response of EntitlementsApi->v1_entitlements_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling EntitlementsApi->v1_entitlements_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **v1_entitlements_post_request** | [**V1EntitlementsPostRequest**](V1EntitlementsPostRequest.md)|  | 

### Return type

[**V1EntitlementsPost201Response**](V1EntitlementsPost201Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

