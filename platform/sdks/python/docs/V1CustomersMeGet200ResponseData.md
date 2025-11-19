# V1CustomersMeGet200ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**email** | **str** |  | [optional] 
**tier** | **str** |  | [optional] 
**status** | **str** |  | [optional] 
**created_at** | **datetime** |  | [optional] 

## Example

```python
from openmonetize.models.v1_customers_me_get200_response_data import V1CustomersMeGet200ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1CustomersMeGet200ResponseData from a JSON string
v1_customers_me_get200_response_data_instance = V1CustomersMeGet200ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1CustomersMeGet200ResponseData.to_json())

# convert the object into a dict
v1_customers_me_get200_response_data_dict = v1_customers_me_get200_response_data_instance.to_dict()
# create an instance of V1CustomersMeGet200ResponseData from a dict
v1_customers_me_get200_response_data_from_dict = V1CustomersMeGet200ResponseData.from_dict(v1_customers_me_get200_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


