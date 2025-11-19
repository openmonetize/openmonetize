# V1EntitlementsIdPutRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**limit_type** | **str** |  | [optional] 
**limit_value** | **float** |  | [optional] 
**period** | **str** |  | [optional] 
**metadata** | **object** |  | [optional] 

## Example

```python
from openmonetize.models.v1_entitlements_id_put_request import V1EntitlementsIdPutRequest

# TODO update the JSON string below
json = "{}"
# create an instance of V1EntitlementsIdPutRequest from a JSON string
v1_entitlements_id_put_request_instance = V1EntitlementsIdPutRequest.from_json(json)
# print the JSON string representation of the object
print(V1EntitlementsIdPutRequest.to_json())

# convert the object into a dict
v1_entitlements_id_put_request_dict = v1_entitlements_id_put_request_instance.to_dict()
# create an instance of V1EntitlementsIdPutRequest from a dict
v1_entitlements_id_put_request_from_dict = V1EntitlementsIdPutRequest.from_dict(v1_entitlements_id_put_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


