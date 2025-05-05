# MenuItemOut


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**description** | **str** |  | 
**price** | **float** |  | 
**is_available** | **bool** |  | [optional] [default to True]
**id** | **int** |  | 

## Example

```python
from openapi_client.models.menu_item_out import MenuItemOut

# TODO update the JSON string below
json = "{}"
# create an instance of MenuItemOut from a JSON string
menu_item_out_instance = MenuItemOut.from_json(json)
# print the JSON string representation of the object
print(MenuItemOut.to_json())

# convert the object into a dict
menu_item_out_dict = menu_item_out_instance.to_dict()
# create an instance of MenuItemOut from a dict
menu_item_out_from_dict = MenuItemOut.from_dict(menu_item_out_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


