# OrderItemOut


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**menu_item_id** | **int** |  | 
**quantity** | **int** |  | 
**id** | **int** |  | 

## Example

```python
from openapi_client.models.order_item_out import OrderItemOut

# TODO update the JSON string below
json = "{}"
# create an instance of OrderItemOut from a JSON string
order_item_out_instance = OrderItemOut.from_json(json)
# print the JSON string representation of the object
print(OrderItemOut.to_json())

# convert the object into a dict
order_item_out_dict = order_item_out_instance.to_dict()
# create an instance of OrderItemOut from a dict
order_item_out_from_dict = OrderItemOut.from_dict(order_item_out_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


