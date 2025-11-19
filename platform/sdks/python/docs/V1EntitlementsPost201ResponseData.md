# V1EntitlementsPost201ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**feature_id** | **str** |  | [optional] 
**limit_type** | **str** |  | [optional] 
**limit_value** | **float** |  | [optional] 

## Example

```python
from openmonetize.models.v1_entitlements_post201_response_data import V1EntitlementsPost201ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1EntitlementsPost201ResponseData from a JSON string
v1_entitlements_post201_response_data_instance = V1EntitlementsPost201ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1EntitlementsPost201ResponseData.to_json())

# convert the object into a dict
v1_entitlements_post201_response_data_dict = v1_entitlements_post201_response_data_instance.to_dict()
# create an instance of V1EntitlementsPost201ResponseData from a dict
v1_entitlements_post201_response_data_from_dict = V1EntitlementsPost201ResponseData.from_dict(v1_entitlements_post201_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


