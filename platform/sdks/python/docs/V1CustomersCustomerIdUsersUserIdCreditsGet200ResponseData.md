# V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**balance** | **float** |  | [optional] 
**reserved** | **float** |  | [optional] 
**available** | **float** |  | [optional] 
**expires_at** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.v1_customers_customer_id_users_user_id_credits_get200_response_data import V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData from a JSON string
v1_customers_customer_id_users_user_id_credits_get200_response_data_instance = V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData.to_json())

# convert the object into a dict
v1_customers_customer_id_users_user_id_credits_get200_response_data_dict = v1_customers_customer_id_users_user_id_credits_get200_response_data_instance.to_dict()
# create an instance of V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData from a dict
v1_customers_customer_id_users_user_id_credits_get200_response_data_from_dict = V1CustomersCustomerIdUsersUserIdCreditsGet200ResponseData.from_dict(v1_customers_customer_id_users_user_id_credits_get200_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


