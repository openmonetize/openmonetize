# V1EntitlementsCheckPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customer_id** | **str** |  | 
**user_id** | **str** |  | 
**feature_id** | **str** |  | 
**action** | [**V1EntitlementsCheckPostRequestAction**](V1EntitlementsCheckPostRequestAction.md) |  | 

## Example

```python
from openmonetize.models.v1_entitlements_check_post_request import V1EntitlementsCheckPostRequest

# TODO update the JSON string below
json = "{}"
# create an instance of V1EntitlementsCheckPostRequest from a JSON string
v1_entitlements_check_post_request_instance = V1EntitlementsCheckPostRequest.from_json(json)
# print the JSON string representation of the object
print(V1EntitlementsCheckPostRequest.to_json())

# convert the object into a dict
v1_entitlements_check_post_request_dict = v1_entitlements_check_post_request_instance.to_dict()
# create an instance of V1EntitlementsCheckPostRequest from a dict
v1_entitlements_check_post_request_from_dict = V1EntitlementsCheckPostRequest.from_dict(v1_entitlements_check_post_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


