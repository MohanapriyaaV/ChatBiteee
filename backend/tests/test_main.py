from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to WhatsApp Food Ordering System"}

def test_create_menu_item():
    menu_item = {
        "name": "Pizza",
        "description": "Delicious pizza",
        "price": 10.99,
        "is_available": True
    }
    response = client.post("/menu/", json=menu_item)
    assert response.status_code == 200
    assert response.json()["item"]["name"] == "Pizza"

def test_get_menu():
    response = client.get("/menu/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_create_order():
    order = {
        "customer_name": "John Doe",
        "whatsapp_number": "+1234567890",
        "items": [
            {
                "menu_item_id": 0,
                "quantity": 1
            }
        ]
    }
    response = client.post("/orders/", json=order)
    assert response.status_code == 200
    assert response.json()["order"]["customer_name"] == "John Doe"

def test_get_orders():
    response = client.get("/orders/")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_update_order_status():
    status = {"status": "preparing"}
    response = client.patch("/orders/0", json=status)
    assert response.status_code == 200
    assert response.json()["message"] == "Order status updated successfully" 