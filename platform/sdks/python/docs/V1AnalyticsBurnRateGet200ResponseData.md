# V1AnalyticsBurnRateGet200ResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**current_balance** | **str** |  | [optional] 
**last7_days** | [**V1AnalyticsBurnRateGet200ResponseDataLast7Days**](V1AnalyticsBurnRateGet200ResponseDataLast7Days.md) |  | [optional] 
**last30_days** | [**V1AnalyticsBurnRateGet200ResponseDataLast7Days**](V1AnalyticsBurnRateGet200ResponseDataLast7Days.md) |  | [optional] 
**projected_runout** | [**V1AnalyticsBurnRateGet200ResponseDataProjectedRunout**](V1AnalyticsBurnRateGet200ResponseDataProjectedRunout.md) |  | [optional] 
**recommendations** | [**List[V1AnalyticsBurnRateGet200ResponseDataRecommendationsInner]**](V1AnalyticsBurnRateGet200ResponseDataRecommendationsInner.md) |  | [optional] 

## Example

```python
from openmonetize.models.v1_analytics_burn_rate_get200_response_data import V1AnalyticsBurnRateGet200ResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of V1AnalyticsBurnRateGet200ResponseData from a JSON string
v1_analytics_burn_rate_get200_response_data_instance = V1AnalyticsBurnRateGet200ResponseData.from_json(json)
# print the JSON string representation of the object
print(V1AnalyticsBurnRateGet200ResponseData.to_json())

# convert the object into a dict
v1_analytics_burn_rate_get200_response_data_dict = v1_analytics_burn_rate_get200_response_data_instance.to_dict()
# create an instance of V1AnalyticsBurnRateGet200ResponseData from a dict
v1_analytics_burn_rate_get200_response_data_from_dict = V1AnalyticsBurnRateGet200ResponseData.from_dict(v1_analytics_burn_rate_get200_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


