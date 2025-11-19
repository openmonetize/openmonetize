# V1CustomersCustomerIdUsersUserIdTransactionsGet200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner]**](V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner.md) |  | [optional] 
**pagination** | [**V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponsePagination**](V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponsePagination.md) |  | [optional] 

## Example

```python
from openmonetize.models.v1_customers_customer_id_users_user_id_transactions_get200_response import V1CustomersCustomerIdUsersUserIdTransactionsGet200Response

# TODO update the JSON string below
json = "{}"
# create an instance of V1CustomersCustomerIdUsersUserIdTransactionsGet200Response from a JSON string
v1_customers_customer_id_users_user_id_transactions_get200_response_instance = V1CustomersCustomerIdUsersUserIdTransactionsGet200Response.from_json(json)
# print the JSON string representation of the object
print(V1CustomersCustomerIdUsersUserIdTransactionsGet200Response.to_json())

# convert the object into a dict
v1_customers_customer_id_users_user_id_transactions_get200_response_dict = v1_customers_customer_id_users_user_id_transactions_get200_response_instance.to_dict()
# create an instance of V1CustomersCustomerIdUsersUserIdTransactionsGet200Response from a dict
v1_customers_customer_id_users_user_id_transactions_get200_response_from_dict = V1CustomersCustomerIdUsersUserIdTransactionsGet200Response.from_dict(v1_customers_customer_id_users_user_id_transactions_get200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


