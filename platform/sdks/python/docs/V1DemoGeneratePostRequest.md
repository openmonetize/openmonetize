# V1DemoGeneratePostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**prompt** | **str** |  | 
**model** | **str** |  | [optional] 
**provider** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.v1_demo_generate_post_request import V1DemoGeneratePostRequest

# TODO update the JSON string below
json = "{}"
# create an instance of V1DemoGeneratePostRequest from a JSON string
v1_demo_generate_post_request_instance = V1DemoGeneratePostRequest.from_json(json)
# print the JSON string representation of the object
print(V1DemoGeneratePostRequest.to_json())

# convert the object into a dict
v1_demo_generate_post_request_dict = v1_demo_generate_post_request_instance.to_dict()
# create an instance of V1DemoGeneratePostRequest from a dict
v1_demo_generate_post_request_from_dict = V1DemoGeneratePostRequest.from_dict(v1_demo_generate_post_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


