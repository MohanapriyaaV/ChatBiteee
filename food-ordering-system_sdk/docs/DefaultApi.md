# openapi_client.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cancel_order_orders_order_id_delete**](DefaultApi.md#cancel_order_orders_order_id_delete) | **DELETE** /orders/{order_id} | Cancel Order
[**create_menu_item_menu_post**](DefaultApi.md#create_menu_item_menu_post) | **POST** /menu/ | Create Menu Item
[**create_order_orders_post**](DefaultApi.md#create_order_orders_post) | **POST** /orders/ | Create Order
[**delete_menu_item_menu_item_id_delete**](DefaultApi.md#delete_menu_item_menu_item_id_delete) | **DELETE** /menu/{item_id} | Delete Menu Item
[**get_menu_item_menu_item_id_get**](DefaultApi.md#get_menu_item_menu_item_id_get) | **GET** /menu/{item_id} | Get Menu Item
[**get_menu_menu_get**](DefaultApi.md#get_menu_menu_get) | **GET** /menu/ | Get Menu
[**get_order_orders_order_id_get**](DefaultApi.md#get_order_orders_order_id_get) | **GET** /orders/{order_id} | Get Order
[**get_orders_orders_get**](DefaultApi.md#get_orders_orders_get) | **GET** /orders/ | Get Orders
[**update_menu_item_menu_item_id_patch**](DefaultApi.md#update_menu_item_menu_item_id_patch) | **PATCH** /menu/{item_id} | Update Menu Item
[**update_order_status_orders_order_id_patch**](DefaultApi.md#update_order_status_orders_order_id_patch) | **PATCH** /orders/{order_id} | Update Order Status


# **cancel_order_orders_order_id_delete**
> object cancel_order_orders_order_id_delete(order_id)

Cancel Order

### Example


```python
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    order_id = 56 # int | 

    try:
        # Cancel Order
        api_response = api_instance.cancel_order_orders_order_id_delete(order_id)
        print("The response of DefaultApi->cancel_order_orders_order_id_delete:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->cancel_order_orders_order_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_id** | **int**|  | 

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_menu_item_menu_post**
> MenuItemOut create_menu_item_menu_post(menu_item_create)

Create Menu Item

### Example


```python
import openapi_client
from openapi_client.models.menu_item_create import MenuItemCreate
from openapi_client.models.menu_item_out import MenuItemOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    menu_item_create = openapi_client.MenuItemCreate() # MenuItemCreate | 

    try:
        # Create Menu Item
        api_response = api_instance.create_menu_item_menu_post(menu_item_create)
        print("The response of DefaultApi->create_menu_item_menu_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_menu_item_menu_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **menu_item_create** | [**MenuItemCreate**](MenuItemCreate.md)|  | 

### Return type

[**MenuItemOut**](MenuItemOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_order_orders_post**
> OrderOut create_order_orders_post(order_create)

Create Order

### Example


```python
import openapi_client
from openapi_client.models.order_create import OrderCreate
from openapi_client.models.order_out import OrderOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    order_create = openapi_client.OrderCreate() # OrderCreate | 

    try:
        # Create Order
        api_response = api_instance.create_order_orders_post(order_create)
        print("The response of DefaultApi->create_order_orders_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->create_order_orders_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_create** | [**OrderCreate**](OrderCreate.md)|  | 

### Return type

[**OrderOut**](OrderOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_menu_item_menu_item_id_delete**
> object delete_menu_item_menu_item_id_delete(item_id)

Delete Menu Item

### Example


```python
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    item_id = 56 # int | 

    try:
        # Delete Menu Item
        api_response = api_instance.delete_menu_item_menu_item_id_delete(item_id)
        print("The response of DefaultApi->delete_menu_item_menu_item_id_delete:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->delete_menu_item_menu_item_id_delete: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **item_id** | **int**|  | 

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_menu_item_menu_item_id_get**
> MenuItemOut get_menu_item_menu_item_id_get(item_id)

Get Menu Item

### Example


```python
import openapi_client
from openapi_client.models.menu_item_out import MenuItemOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    item_id = 56 # int | 

    try:
        # Get Menu Item
        api_response = api_instance.get_menu_item_menu_item_id_get(item_id)
        print("The response of DefaultApi->get_menu_item_menu_item_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_menu_item_menu_item_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **item_id** | **int**|  | 

### Return type

[**MenuItemOut**](MenuItemOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_menu_menu_get**
> List[MenuItemOut] get_menu_menu_get()

Get Menu

### Example


```python
import openapi_client
from openapi_client.models.menu_item_out import MenuItemOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)

    try:
        # Get Menu
        api_response = api_instance.get_menu_menu_get()
        print("The response of DefaultApi->get_menu_menu_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_menu_menu_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[MenuItemOut]**](MenuItemOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_order_orders_order_id_get**
> OrderOut get_order_orders_order_id_get(order_id)

Get Order

### Example


```python
import openapi_client
from openapi_client.models.order_out import OrderOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    order_id = 56 # int | 

    try:
        # Get Order
        api_response = api_instance.get_order_orders_order_id_get(order_id)
        print("The response of DefaultApi->get_order_orders_order_id_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_order_orders_order_id_get: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_id** | **int**|  | 

### Return type

[**OrderOut**](OrderOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_orders_orders_get**
> List[OrderOut] get_orders_orders_get()

Get Orders

### Example


```python
import openapi_client
from openapi_client.models.order_out import OrderOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)

    try:
        # Get Orders
        api_response = api_instance.get_orders_orders_get()
        print("The response of DefaultApi->get_orders_orders_get:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_orders_orders_get: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**List[OrderOut]**](OrderOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_menu_item_menu_item_id_patch**
> MenuItemOut update_menu_item_menu_item_id_patch(item_id, menu_item_create)

Update Menu Item

### Example


```python
import openapi_client
from openapi_client.models.menu_item_create import MenuItemCreate
from openapi_client.models.menu_item_out import MenuItemOut
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    item_id = 56 # int | 
    menu_item_create = openapi_client.MenuItemCreate() # MenuItemCreate | 

    try:
        # Update Menu Item
        api_response = api_instance.update_menu_item_menu_item_id_patch(item_id, menu_item_create)
        print("The response of DefaultApi->update_menu_item_menu_item_id_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->update_menu_item_menu_item_id_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **item_id** | **int**|  | 
 **menu_item_create** | [**MenuItemCreate**](MenuItemCreate.md)|  | 

### Return type

[**MenuItemOut**](MenuItemOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_order_status_orders_order_id_patch**
> OrderOut update_order_status_orders_order_id_patch(order_id, order_status_update)

Update Order Status

### Example


```python
import openapi_client
from openapi_client.models.order_out import OrderOut
from openapi_client.models.order_status_update import OrderStatusUpdate
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    order_id = 56 # int | 
    order_status_update = openapi_client.OrderStatusUpdate() # OrderStatusUpdate | 

    try:
        # Update Order Status
        api_response = api_instance.update_order_status_orders_order_id_patch(order_id, order_status_update)
        print("The response of DefaultApi->update_order_status_orders_order_id_patch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->update_order_status_orders_order_id_patch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **order_id** | **int**|  | 
 **order_status_update** | [**OrderStatusUpdate**](OrderStatusUpdate.md)|  | 

### Return type

[**OrderOut**](OrderOut.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

