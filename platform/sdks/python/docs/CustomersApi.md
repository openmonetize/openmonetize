# openmonetize.CustomersApi

All URIs are relative to *http://localhost:8081*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v1_customers_me_get**](CustomersApi.md#v1_customers_me_get) | **GET** /v1/customers/me | 
[**v1_customers_register_post**](CustomersApi.md#v1_customers_register_post) | **POST** /v1/customers/register | 


# **v1_customers_me_get**
> V1CustomersMeGet200Response v1_customers_me_get()

Get current customer profile

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_customers_me_get200_response import V1CustomersMeGet200Response
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
    api_instance = openmonetize.CustomersApi(api_client)

    try:
        api_response = api_instance.v1_customers_me_get()
        print("The response of CustomersApi->v1_customers_me_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CustomersApi->v1_customers_me_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**V1CustomersMeGet200Response**](V1CustomersMeGet200Response.md)

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

# **v1_customers_register_post**
> V1CustomersRegisterPost201Response v1_customers_register_post(v1_customers_register_post_request)

Register a new customer account

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_customers_register_post201_response import V1CustomersRegisterPost201Response
from openmonetize.models.v1_customers_register_post_request import V1CustomersRegisterPostRequest
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
    api_instance = openmonetize.CustomersApi(api_client)
    v1_customers_register_post_request = openmonetize.V1CustomersRegisterPostRequest() # V1CustomersRegisterPostRequest | 

    try:
        api_response = api_instance.v1_customers_register_post(v1_customers_register_post_request)
        print("The response of CustomersApi->v1_customers_register_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CustomersApi->v1_customers_register_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **v1_customers_register_post_request** | [**V1CustomersRegisterPostRequest**](V1CustomersRegisterPostRequest.md)|  | 

### Return type

[**V1CustomersRegisterPost201Response**](V1CustomersRegisterPost201Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Default Response |  -  |
**400** | Default Response |  -  |
**409** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

