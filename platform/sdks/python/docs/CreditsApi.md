# openmonetize.CreditsApi

All URIs are relative to *http://localhost:8081*

Method | HTTP request | Description
------------- | ------------- | -------------
[**v1_credits_balance_get**](CreditsApi.md#v1_credits_balance_get) | **GET** /v1/credits/balance | 
[**v1_credits_grant_post**](CreditsApi.md#v1_credits_grant_post) | **POST** /v1/credits/grant | 
[**v1_credits_purchase_post**](CreditsApi.md#v1_credits_purchase_post) | **POST** /v1/credits/purchase | 
[**v1_customers_customer_id_users_user_id_credits_get**](CreditsApi.md#v1_customers_customer_id_users_user_id_credits_get) | **GET** /v1/customers/{customerId}/users/{userId}/credits | 
[**v1_customers_customer_id_users_user_id_transactions_get**](CreditsApi.md#v1_customers_customer_id_users_user_id_transactions_get) | **GET** /v1/customers/{customerId}/users/{userId}/transactions | 


# **v1_credits_balance_get**
> V1CreditsBalanceGet200Response v1_credits_balance_get()

Get credit balance for the authenticated customer

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_credits_balance_get200_response import V1CreditsBalanceGet200Response
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
    api_instance = openmonetize.CreditsApi(api_client)

    try:
        api_response = api_instance.v1_credits_balance_get()
        print("The response of CreditsApi->v1_credits_balance_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CreditsApi->v1_credits_balance_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**V1CreditsBalanceGet200Response**](V1CreditsBalanceGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default Response |  -  |
**404** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **v1_credits_grant_post**
> V1CreditsGrantPost200Response v1_credits_grant_post(v1_credits_grant_post_request)

Grant credits to a customer, user, or team (admin operation)

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_credits_grant_post200_response import V1CreditsGrantPost200Response
from openmonetize.models.v1_credits_grant_post_request import V1CreditsGrantPostRequest
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
    api_instance = openmonetize.CreditsApi(api_client)
    v1_credits_grant_post_request = openmonetize.V1CreditsGrantPostRequest() # V1CreditsGrantPostRequest | 

    try:
        api_response = api_instance.v1_credits_grant_post(v1_credits_grant_post_request)
        print("The response of CreditsApi->v1_credits_grant_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CreditsApi->v1_credits_grant_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **v1_credits_grant_post_request** | [**V1CreditsGrantPostRequest**](V1CreditsGrantPostRequest.md)|  | 

### Return type

[**V1CreditsGrantPost200Response**](V1CreditsGrantPost200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default Response |  -  |
**403** | Default Response |  -  |
**409** | Default Response |  -  |
**500** | Default Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **v1_credits_purchase_post**
> V1CreditsPurchasePost200Response v1_credits_purchase_post(v1_credits_purchase_post_request)

Purchase credits for a user (top-up)

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_credits_purchase_post200_response import V1CreditsPurchasePost200Response
from openmonetize.models.v1_credits_purchase_post_request import V1CreditsPurchasePostRequest
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
    api_instance = openmonetize.CreditsApi(api_client)
    v1_credits_purchase_post_request = openmonetize.V1CreditsPurchasePostRequest() # V1CreditsPurchasePostRequest | 

    try:
        api_response = api_instance.v1_credits_purchase_post(v1_credits_purchase_post_request)
        print("The response of CreditsApi->v1_credits_purchase_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CreditsApi->v1_credits_purchase_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **v1_credits_purchase_post_request** | [**V1CreditsPurchasePostRequest**](V1CreditsPurchasePostRequest.md)|  | 

### Return type

[**V1CreditsPurchasePost200Response**](V1CreditsPurchasePost200Response.md)

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

# **v1_customers_customer_id_users_user_id_credits_get**
> V1CustomersCustomerIdUsersUserIdCreditsGet200Response v1_customers_customer_id_users_user_id_credits_get(customer_id, user_id)

Get credit balance for a specific user

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_customers_customer_id_users_user_id_credits_get200_response import V1CustomersCustomerIdUsersUserIdCreditsGet200Response
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
    api_instance = openmonetize.CreditsApi(api_client)
    customer_id = 'customer_id_example' # str | 
    user_id = 'user_id_example' # str | 

    try:
        api_response = api_instance.v1_customers_customer_id_users_user_id_credits_get(customer_id, user_id)
        print("The response of CreditsApi->v1_customers_customer_id_users_user_id_credits_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CreditsApi->v1_customers_customer_id_users_user_id_credits_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customer_id** | **str**|  | 
 **user_id** | **str**|  | 

### Return type

[**V1CustomersCustomerIdUsersUserIdCreditsGet200Response**](V1CustomersCustomerIdUsersUserIdCreditsGet200Response.md)

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

# **v1_customers_customer_id_users_user_id_transactions_get**
> V1CustomersCustomerIdUsersUserIdTransactionsGet200Response v1_customers_customer_id_users_user_id_transactions_get(customer_id, user_id, limit=limit, offset=offset)

Get credit transaction history for a user

### Example

* Bearer (API Key) Authentication (bearerAuth):

```python
import openmonetize
from openmonetize.models.v1_customers_customer_id_users_user_id_transactions_get200_response import V1CustomersCustomerIdUsersUserIdTransactionsGet200Response
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
    api_instance = openmonetize.CreditsApi(api_client)
    customer_id = 'customer_id_example' # str | 
    user_id = 'user_id_example' # str | 
    limit = 50 # int |  (optional) (default to 50)
    offset = 0 # int |  (optional) (default to 0)

    try:
        api_response = api_instance.v1_customers_customer_id_users_user_id_transactions_get(customer_id, user_id, limit=limit, offset=offset)
        print("The response of CreditsApi->v1_customers_customer_id_users_user_id_transactions_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CreditsApi->v1_customers_customer_id_users_user_id_transactions_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customer_id** | **str**|  | 
 **user_id** | **str**|  | 
 **limit** | **int**|  | [optional] [default to 50]
 **offset** | **int**|  | [optional] [default to 0]

### Return type

[**V1CustomersCustomerIdUsersUserIdTransactionsGet200Response**](V1CustomersCustomerIdUsersUserIdTransactionsGet200Response.md)

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

