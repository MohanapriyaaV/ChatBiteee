# OrderOut


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**customer_name** | **str** |  | 
**whatsapp_number** | **str** |  | 
**id** | **int** |  | 
**status** | **str** |  | 
**created_at** | **datetime** |  | 
**cancelled_at** | **datetime** |  | [optional] 
**items** | [**List[OrderItemOut]**](OrderItemOut.md) |  | 

## Example

```python
from openapi_client.models.order_out import OrderOut

# TODO update the JSON string below
json = "{}"
# create an instance of OrderOut from a JSON string
order_out_instance = OrderOut.from_json(json)
# print the JSON string representation of the object
print(OrderOut.to_json())

# convert the object into a dict
order_out_dict = order_out_instance.to_dict()
# create an instance of OrderOut from a dict
order_out_from_dict = OrderOut.from_dict(order_out_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


