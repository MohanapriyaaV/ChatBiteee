from fastapi.testclient import TestClient
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app


client = TestClient(app)


def test_get_menu():
    response = client.get("/menu/")
    assert response.status_code == 200
    assert len(response.json()) > 0



def test_get_orders():
    response = client.get("/orders/")
    assert response.status_code == 200
    assert len(response.json()) > 0

