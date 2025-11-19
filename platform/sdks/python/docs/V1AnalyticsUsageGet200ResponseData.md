# V1AnalyticsUsageGet200ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**summary** | [**V1AnalyticsUsageGet200ResponseDataSummary**](V1AnalyticsUsageGet200ResponseDataSummary.md) |  | [optional] 
**by_feature** | [**List[V1AnalyticsUsageGet200ResponseDataByFeatureInner]**](V1AnalyticsUsageGet200ResponseDataByFeatureInner.md) |  | [optional] 
**by_provider** | [**List[V1AnalyticsUsageGet200ResponseDataByProviderInner]**](V1AnalyticsUsageGet200ResponseDataByProviderInner.md) |  | [optional] 
**timeline** | [**List[V1AnalyticsUsageGet200ResponseDataTimelineInner]**](V1AnalyticsUsageGet200ResponseDataTimelineInner.md) |  | [optional] 

## Example

```python
from openmonetize.models.v1_analytics_usage_get200_response_data import V1AnalyticsUsageGet200ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1AnalyticsUsageGet200ResponseData from a JSON string
v1_analytics_usage_get200_response_data_instance = V1AnalyticsUsageGet200ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1AnalyticsUsageGet200ResponseData.to_json())

# convert the object into a dict
v1_analytics_usage_get200_response_data_dict = v1_analytics_usage_get200_response_data_instance.to_dict()
# create an instance of V1AnalyticsUsageGet200ResponseData from a dict
v1_analytics_usage_get200_response_data_from_dict = V1AnalyticsUsageGet200ResponseData.from_dict(v1_analytics_usage_get200_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


