# V1CreditsGrantPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customer_id** | **str** |  | 
**user_id** | **str** |  | [optional] 
**team_id** | **str** |  | [optional] 
**amount** | **float** |  | 
**reason** | **str** |  | [optional] 
**metadata** | **object** |  | [optional] 
**idempotency_key** | **str** |  | [optional] 
**expires_at** | **datetime** |  | [optional] 

## Example

```python
from openmonetize.models.v1_credits_grant_post_request import V1CreditsGrantPostRequest

# TODO update the JSON string below
json = "{}"
# create an instance of V1CreditsGrantPostRequest from a JSON string
v1_credits_grant_post_request_instance = V1CreditsGrantPostRequest.from_json(json)
# print the JSON string representation of the object
print(V1CreditsGrantPostRequest.to_json())

# convert the object into a dict
v1_credits_grant_post_request_dict = v1_credits_grant_post_request_instance.to_dict()
# create an instance of V1CreditsGrantPostRequest from a dict
v1_credits_grant_post_request_from_dict = V1CreditsGrantPostRequest.from_dict(v1_credits_grant_post_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


