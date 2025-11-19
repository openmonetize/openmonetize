# V1CustomersRegisterPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**email** | **str** |  | 
**tier** | **str** |  | [optional] [default to 'STARTER']

## Example

```python
from openmonetize.models.v1_customers_register_post_request import V1CustomersRegisterPostRequest

# TODO update the JSON string below
json = "{}"
# create an instance of V1CustomersRegisterPostRequest from a JSON string
v1_customers_register_post_request_instance = V1CustomersRegisterPostRequest.from_json(json)
# print the JSON string representation of the object
print(V1CustomersRegisterPostRequest.to_json())

# convert the object into a dict
v1_customers_register_post_request_dict = v1_customers_register_post_request_instance.to_dict()
# create an instance of V1CustomersRegisterPostRequest from a dict
v1_customers_register_post_request_from_dict = V1CustomersRegisterPostRequest.from_dict(v1_customers_register_post_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


