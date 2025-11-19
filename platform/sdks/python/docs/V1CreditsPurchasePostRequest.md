# V1CreditsPurchasePostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customer_id** | **str** |  | 
**user_id** | **str** |  | 
**amount** | **float** |  | 
**purchase_price** | **float** |  | 
**expires_at** | **datetime** |  | [optional] 

## Example

```python
from openmonetize.models.v1_credits_purchase_post_request import V1CreditsPurchasePostRequest

# TODO update the JSON string below
json = "{}"
# create an instance of V1CreditsPurchasePostRequest from a JSON string
v1_credits_purchase_post_request_instance = V1CreditsPurchasePostRequest.from_json(json)
# print the JSON string representation of the object
print(V1CreditsPurchasePostRequest.to_json())

# convert the object into a dict
v1_credits_purchase_post_request_dict = v1_credits_purchase_post_request_instance.to_dict()
# create an instance of V1CreditsPurchasePostRequest from a dict
v1_credits_purchase_post_request_from_dict = V1CreditsPurchasePostRequest.from_dict(v1_credits_purchase_post_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


