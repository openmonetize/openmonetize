# V1EntitlementsCheckPostRequestAction


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **str** |  | 
**provider** | **str** |  | [optional] 
**model** | **str** |  | [optional] 
**estimated_input_tokens** | **float** |  | [optional] 
**estimated_output_tokens** | **float** |  | [optional] 

## Example

```python
from openmonetize.models.v1_entitlements_check_post_request_action import V1EntitlementsCheckPostRequestAction

# TODO update the JSON string below
json = "{}"
# create an instance of V1EntitlementsCheckPostRequestAction from a JSON string
v1_entitlements_check_post_request_action_instance = V1EntitlementsCheckPostRequestAction.from_json(json)
# print the JSON string representation of the object
print(V1EntitlementsCheckPostRequestAction.to_json())

# convert the object into a dict
v1_entitlements_check_post_request_action_dict = v1_entitlements_check_post_request_action_instance.to_dict()
# create an instance of V1EntitlementsCheckPostRequestAction from a dict
v1_entitlements_check_post_request_action_from_dict = V1EntitlementsCheckPostRequestAction.from_dict(v1_entitlements_check_post_request_action_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


