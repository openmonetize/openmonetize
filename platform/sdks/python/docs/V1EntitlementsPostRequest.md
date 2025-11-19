# V1EntitlementsPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customer_id** | **str** |  | 
**user_id** | **str** |  | [optional] 
**feature_id** | **str** |  | 
**limit_type** | **str** |  | 
**limit_value** | **float** |  | [optional] 
**period** | **str** |  | [optional] 
**metadata** | **object** |  | [optional] 

## Example

```python
from openmonetize.models.v1_entitlements_post_request import V1EntitlementsPostRequest

# TODO update the JSON string below
json = "{}"
# create an instance of V1EntitlementsPostRequest from a JSON string
v1_entitlements_post_request_instance = V1EntitlementsPostRequest.from_json(json)
# print the JSON string representation of the object
print(V1EntitlementsPostRequest.to_json())

# convert the object into a dict
v1_entitlements_post_request_dict = v1_entitlements_post_request_instance.to_dict()
# create an instance of V1EntitlementsPostRequest from a dict
v1_entitlements_post_request_from_dict = V1EntitlementsPostRequest.from_dict(v1_entitlements_post_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


