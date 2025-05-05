from whatsapp_food_sdk.api.orders_api import OrdersApi
from whatsapp_food_sdk.api.menu_api import MenuApi
from whatsapp_food_sdk import ApiClient

# Initialize the API client
client = ApiClient()
orders_api = OrdersApi(client)
menu_api = MenuApi(client)

def main():
    # Add a menu item
    menu_item = {
        "name": "Margherita Pizza",
        "description": "Classic pizza with tomato sauce and mozzarella",
        "price": 12.99,
        "is_available": True
    }
    menu_api.create_menu_item(menu_item)
    print("Menu item created successfully")

    # Get all menu items
    menu_items = menu_api.get_menu()
    print("\nMenu Items:")
    for item in menu_items:
        print(f"- {item.name}: ${item.price}")

    # Place an order
    order = {
        "customer_name": "John Doe",
        "whatsapp_number": "+1234567890",
        "items": [
            {
                "menu_item_id": 0,
                "quantity": 2
            }
        ]
    }
    order_response = orders_api.create_order(order)
    print("\nOrder created successfully")
    print(f"Order ID: {order_response.id}")

    # Get all orders
    orders = orders_api.get_orders()
    print("\nAll Orders:")
    for order in orders:
        print(f"- Order {order.id}: {order.customer_name}")

    # Update order status
    status = {"status": "preparing"}
    orders_api.update_order_status(0, status)
    print("\nOrder status updated to 'preparing'")

if __name__ == "__main__":
    main() 