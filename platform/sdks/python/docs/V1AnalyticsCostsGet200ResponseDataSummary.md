# V1AnalyticsCostsGet200ResponseDataSummary


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total_revenue** | **str** |  | [optional] 
**total_provider_cost** | **str** |  | [optional] 
**total_margin** | **str** |  | [optional] 
**margin_percent** | **float** |  | [optional] 

## Example

```python
from openmonetize.models.v1_analytics_costs_get200_response_data_summary import V1AnalyticsCostsGet200ResponseDataSummary

# TODO update the JSON string below
json = "{}"
# create an instance of V1AnalyticsCostsGet200ResponseDataSummary from a JSON string
v1_analytics_costs_get200_response_data_summary_instance = V1AnalyticsCostsGet200ResponseDataSummary.from_json(json)
# print the JSON string representation of the object
print(V1AnalyticsCostsGet200ResponseDataSummary.to_json())

# convert the object into a dict
v1_analytics_costs_get200_response_data_summary_dict = v1_analytics_costs_get200_response_data_summary_instance.to_dict()
# create an instance of V1AnalyticsCostsGet200ResponseDataSummary from a dict
v1_analytics_costs_get200_response_data_summary_from_dict = V1AnalyticsCostsGet200ResponseDataSummary.from_dict(v1_analytics_costs_get200_response_data_summary_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


