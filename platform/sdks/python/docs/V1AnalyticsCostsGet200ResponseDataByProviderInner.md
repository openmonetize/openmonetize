# V1AnalyticsCostsGet200ResponseDataByProviderInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**provider** | **str** |  | [optional] 
**model** | **str** |  | [optional] 
**provider_cost** | **str** |  | [optional] 
**revenue** | **str** |  | [optional] 
**margin** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.v1_analytics_costs_get200_response_data_by_provider_inner import V1AnalyticsCostsGet200ResponseDataByProviderInner

# TODO update the JSON string below
json = "{}"
# create an instance of V1AnalyticsCostsGet200ResponseDataByProviderInner from a JSON string
v1_analytics_costs_get200_response_data_by_provider_inner_instance = V1AnalyticsCostsGet200ResponseDataByProviderInner.from_json(json)
# print the JSON string representation of the object
print(V1AnalyticsCostsGet200ResponseDataByProviderInner.to_json())

# convert the object into a dict
v1_analytics_costs_get200_response_data_by_provider_inner_dict = v1_analytics_costs_get200_response_data_by_provider_inner_instance.to_dict()
# create an instance of V1AnalyticsCostsGet200ResponseDataByProviderInner from a dict
v1_analytics_costs_get200_response_data_by_provider_inner_from_dict = V1AnalyticsCostsGet200ResponseDataByProviderInner.from_dict(v1_analytics_costs_get200_response_data_by_provider_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


