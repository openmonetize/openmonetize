# V1AnalyticsCostsGet200ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**summary** | [**V1AnalyticsCostsGet200ResponseDataSummary**](V1AnalyticsCostsGet200ResponseDataSummary.md) |  | [optional] 
**by_provider** | [**List[V1AnalyticsCostsGet200ResponseDataByProviderInner]**](V1AnalyticsCostsGet200ResponseDataByProviderInner.md) |  | [optional] 

## Example

```python
from openmonetize.models.v1_analytics_costs_get200_response_data import V1AnalyticsCostsGet200ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1AnalyticsCostsGet200ResponseData from a JSON string
v1_analytics_costs_get200_response_data_instance = V1AnalyticsCostsGet200ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1AnalyticsCostsGet200ResponseData.to_json())

# convert the object into a dict
v1_analytics_costs_get200_response_data_dict = v1_analytics_costs_get200_response_data_instance.to_dict()
# create an instance of V1AnalyticsCostsGet200ResponseData from a dict
v1_analytics_costs_get200_response_data_from_dict = V1AnalyticsCostsGet200ResponseData.from_dict(v1_analytics_costs_get200_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


