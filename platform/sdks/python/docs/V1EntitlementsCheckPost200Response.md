# V1EntitlementsCheckPost200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowed** | **bool** |  | [optional] 
**reason** | **str** |  | [optional] 
**estimated_cost_credits** | **float** |  | [optional] 
**estimated_cost_usd** | **float** |  | [optional] 
**current_balance** | **float** |  | [optional] 
**actions** | [**List[V1EntitlementsCheckPost200ResponseActionsInner]**](V1EntitlementsCheckPost200ResponseActionsInner.md) |  | [optional] 

## Example

```python
from openmonetize.models.v1_entitlements_check_post200_response import V1EntitlementsCheckPost200Response

# TODO update the JSON string below
json = "{}"
# create an instance of V1EntitlementsCheckPost200Response from a JSON string
v1_entitlements_check_post200_response_instance = V1EntitlementsCheckPost200Response.from_json(json)
# print the JSON string representation of the object
print(V1EntitlementsCheckPost200Response.to_json())

# convert the object into a dict
v1_entitlements_check_post200_response_dict = v1_entitlements_check_post200_response_instance.to_dict()
# create an instance of V1EntitlementsCheckPost200Response from a dict
v1_entitlements_check_post200_response_from_dict = V1EntitlementsCheckPost200Response.from_dict(v1_entitlements_check_post200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


