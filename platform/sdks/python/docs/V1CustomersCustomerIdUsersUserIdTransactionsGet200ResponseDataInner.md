# V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**transaction_type** | **str** |  | [optional] 
**amount** | **float** |  | [optional] 
**balance_before** | **float** |  | [optional] 
**balance_after** | **float** |  | [optional] 
**description** | **str** |  | [optional] 
**created_at** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.v1_customers_customer_id_users_user_id_transactions_get200_response_data_inner import V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner

# TODO update the JSON string below
json = "{}"
# create an instance of V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner from a JSON string
v1_customers_customer_id_users_user_id_transactions_get200_response_data_inner_instance = V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner.from_json(json)
# print the JSON string representation of the object
print(V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner.to_json())

# convert the object into a dict
v1_customers_customer_id_users_user_id_transactions_get200_response_data_inner_dict = v1_customers_customer_id_users_user_id_transactions_get200_response_data_inner_instance.to_dict()
# create an instance of V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner from a dict
v1_customers_customer_id_users_user_id_transactions_get200_response_data_inner_from_dict = V1CustomersCustomerIdUsersUserIdTransactionsGet200ResponseDataInner.from_dict(v1_customers_customer_id_users_user_id_transactions_get200_response_data_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


