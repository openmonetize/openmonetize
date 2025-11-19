# ReadyGet200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **str** |  | [optional] 
**checks** | **object** |  | [optional] 
**timestamp** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.ready_get200_response import ReadyGet200Response

# TODO update the JSON string below
json = "{}"
# create an instance of ReadyGet200Response from a JSON string
ready_get200_response_instance = ReadyGet200Response.from_json(json)
# print the JSON string representation of the object
print(ReadyGet200Response.to_json())

# convert the object into a dict
ready_get200_response_dict = ready_get200_response_instance.to_dict()
# create an instance of ReadyGet200Response from a dict
ready_get200_response_from_dict = ReadyGet200Response.from_dict(ready_get200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


