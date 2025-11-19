# V1InfoGet200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**service** | **str** |  | [optional] 
**version** | **str** |  | [optional] 
**environment** | **str** |  | [optional] 
**uptime** | **float** |  | [optional] 

## Example

```python
from openmonetize.models.v1_info_get200_response import V1InfoGet200Response

# TODO update the JSON string below
json = "{}"
# create an instance of V1InfoGet200Response from a JSON string
v1_info_get200_response_instance = V1InfoGet200Response.from_json(json)
# print the JSON string representation of the object
print(V1InfoGet200Response.to_json())

# convert the object into a dict
v1_info_get200_response_dict = v1_info_get200_response_instance.to_dict()
# create an instance of V1InfoGet200Response from a dict
v1_info_get200_response_from_dict = V1InfoGet200Response.from_dict(v1_info_get200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


