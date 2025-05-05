# MenuItemCreate


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | 
**description** | **str** |  | 
**price** | **float** |  | 
**is_available** | **bool** |  | [optional] [default to True]

## Example

```python
from openapi_client.models.menu_item_create import MenuItemCreate

# TODO update the JSON string below
json = "{}"
# create an instance of MenuItemCreate from a JSON string
menu_item_create_instance = MenuItemCreate.from_json(json)
# print the JSON string representation of the object
print(MenuItemCreate.to_json())

# convert the object into a dict
menu_item_create_dict = menu_item_create_instance.to_dict()
# create an instance of MenuItemCreate from a dict
menu_item_create_from_dict = MenuItemCreate.from_dict(menu_item_create_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


