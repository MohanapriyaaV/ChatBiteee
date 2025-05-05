# OrderItemCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**menu_item_id** | **int** |  | 
**quantity** | **int** |  | 

## Example

```python
from openapi_client.models.order_item_create import OrderItemCreate

# TODO update the JSON string below
json = "{}"
# create an instance of OrderItemCreate from a JSON string
order_item_create_instance = OrderItemCreate.from_json(json)
# print the JSON string representation of the object
print(OrderItemCreate.to_json())

# convert the object into a dict
order_item_create_dict = order_item_create_instance.to_dict()
# create an instance of OrderItemCreate from a dict
order_item_create_from_dict = OrderItemCreate.from_dict(order_item_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


