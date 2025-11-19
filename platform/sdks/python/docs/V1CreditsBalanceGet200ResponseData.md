# V1CreditsBalanceGet200ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**balance** | **str** | Total balance | [optional] 
**reserved_balance** | **str** | Reserved credits | [optional] 
**available_balance** | **str** | Available credits | [optional] 
**currency** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.v1_credits_balance_get200_response_data import V1CreditsBalanceGet200ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1CreditsBalanceGet200ResponseData from a JSON string
v1_credits_balance_get200_response_data_instance = V1CreditsBalanceGet200ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1CreditsBalanceGet200ResponseData.to_json())

# convert the object into a dict
v1_credits_balance_get200_response_data_dict = v1_credits_balance_get200_response_data_instance.to_dict()
# create an instance of V1CreditsBalanceGet200ResponseData from a dict
v1_credits_balance_get200_response_data_from_dict = V1CreditsBalanceGet200ResponseData.from_dict(v1_credits_balance_get200_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


