# V1AnalyticsUsageGet200ResponseDataByFeatureInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**feature_id** | **str** |  | [optional] 
**event_count** | **float** |  | [optional] 
**credits_burned** | **str** |  | [optional] 
**cost_usd** | **str** |  | [optional] 

## Example

```python
from openmonetize.models.v1_analytics_usage_get200_response_data_by_feature_inner import V1AnalyticsUsageGet200ResponseDataByFeatureInner

# TODO update the JSON string below
json = "{}"
# create an instance of V1AnalyticsUsageGet200ResponseDataByFeatureInner from a JSON string
v1_analytics_usage_get200_response_data_by_feature_inner_instance = V1AnalyticsUsageGet200ResponseDataByFeatureInner.from_json(json)
# print the JSON string representation of the object
print(V1AnalyticsUsageGet200ResponseDataByFeatureInner.to_json())

# convert the object into a dict
v1_analytics_usage_get200_response_data_by_feature_inner_dict = v1_analytics_usage_get200_response_data_by_feature_inner_instance.to_dict()
# create an instance of V1AnalyticsUsageGet200ResponseDataByFeatureInner from a dict
v1_analytics_usage_get200_response_data_by_feature_inner_from_dict = V1AnalyticsUsageGet200ResponseDataByFeatureInner.from_dict(v1_analytics_usage_get200_response_data_by_feature_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


