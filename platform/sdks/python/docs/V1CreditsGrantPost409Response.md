# V1CreditsGrantPost409Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**error** | **str** |  | [optional] 
**message** | **str** |  | [optional] 
**existing_transaction** | **object** |  | [optional] 

## Example

```python
from openmonetize.models.v1_credits_grant_post409_response import V1CreditsGrantPost409Response

# TODO update the JSON string below
json = "{}"
# create an instance of V1CreditsGrantPost409Response from a JSON string
v1_credits_grant_post409_response_instance = V1CreditsGrantPost409Response.from_json(json)
# print the JSON string representation of the object
print(V1CreditsGrantPost409Response.to_json())

# convert the object into a dict
v1_credits_grant_post409_response_dict = v1_credits_grant_post409_response_instance.to_dict()
# create an instance of V1CreditsGrantPost409Response from a dict
v1_credits_grant_post409_response_from_dict = V1CreditsGrantPost409Response.from_dict(v1_credits_grant_post409_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


