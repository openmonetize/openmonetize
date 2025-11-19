# V1CustomersRegisterPost201ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customer_id** | **str** |  | [optional] 
**api_key** | **str** | API key - only shown once! Save it securely. | [optional] 
**name** | **str** |  | [optional] 
**email** | **str** |  | [optional] 
**tier** | **str** |  | [optional] 
**created_at** | **datetime** |  | [optional] 

## Example

```python
from openmonetize.models.v1_customers_register_post201_response_data import V1CustomersRegisterPost201ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1CustomersRegisterPost201ResponseData from a JSON string
v1_customers_register_post201_response_data_instance = V1CustomersRegisterPost201ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1CustomersRegisterPost201ResponseData.to_json())

# convert the object into a dict
v1_customers_register_post201_response_data_dict = v1_customers_register_post201_response_data_instance.to_dict()
# create an instance of V1CustomersRegisterPost201ResponseData from a dict
v1_customers_register_post201_response_data_from_dict = V1CustomersRegisterPost201ResponseData.from_dict(v1_customers_register_post201_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


