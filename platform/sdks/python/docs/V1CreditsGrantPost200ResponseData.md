# V1CreditsGrantPost200ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**transaction_id** | **str** |  | [optional] 
**wallet_id** | **str** |  | [optional] 
**new_balance** | **str** |  | [optional] 
**amount** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.v1_credits_grant_post200_response_data import V1CreditsGrantPost200ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1CreditsGrantPost200ResponseData from a JSON string
v1_credits_grant_post200_response_data_instance = V1CreditsGrantPost200ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1CreditsGrantPost200ResponseData.to_json())

# convert the object into a dict
v1_credits_grant_post200_response_data_dict = v1_credits_grant_post200_response_data_instance.to_dict()
# create an instance of V1CreditsGrantPost200ResponseData from a dict
v1_credits_grant_post200_response_data_from_dict = V1CreditsGrantPost200ResponseData.from_dict(v1_credits_grant_post200_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


