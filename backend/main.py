from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import models
import schemas
import database
from whatsapp_utils import send_whatsapp_message
from datetime import datetime

ORDER_STATUS_FLOW = ["pending", "preparing", "out-for-delivery", "delivered", "cancelled"]

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="WhatsApp Food Ordering System",
    description="A food ordering system with WhatsApp integration",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Menu Endpoints
@app.post("/menu/", response_model=schemas.MenuItemOut)
def create_menu_item(item: schemas.MenuItemCreate, db: Session = Depends(get_db)):
    # Check for existing menu item with the same name (case-insensitive)
    existing = db.query(models.MenuItem).filter(
        models.MenuItem.name.ilike(item.name)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Menu item with this name already exists.")
    db_item = models.MenuItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/menu/", response_model=List[schemas.MenuItemOut])
def get_menu(db: Session = Depends(get_db)):
    return db.query(models.MenuItem).all()

@app.get("/menu/{item_id}", response_model=schemas.MenuItemOut)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item

@app.patch("/menu/{item_id}", response_model=schemas.MenuItemOut)
def update_menu_item(item_id: int, item: schemas.MenuItemCreate, db: Session = Depends(get_db)):
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/menu/{item_id}")
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Menu item deleted"}

# Order Endpoints
@app.post("/orders/", response_model=schemas.OrderOut)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = models.Order(
        customer_name=order.customer_name,
        whatsapp_number=order.whatsapp_number,
        status="pending"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    for item in order.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            menu_item_id=item.menu_item_id,
            quantity=item.quantity
        )
        db.add(db_item)
    db.commit()
    db.refresh(db_order)
    # WhatsApp notification: order placed
    send_whatsapp_message(
        db_order.whatsapp_number,
        f"Hi {db_order.customer_name}, your order has been placed! Status: {db_order.status}"
    )
    return db_order

@app.get("/orders/", response_model=List[schemas.OrderOut])
def get_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()

@app.get("/orders/{order_id}", response_model=schemas.OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@app.patch("/orders/{order_id}", response_model=schemas.OrderOut)
def update_order_status(order_id: int, status: schemas.OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status == "delivered":
        raise HTTPException(status_code=400, detail="Delivered orders cannot be updated")
    if status.status == "cancelled":
        order.status = "cancelled"
        order.cancelled_at = datetime.utcnow()
    else:
        try:
            current_index = ORDER_STATUS_FLOW.index(order.status)
            new_index = ORDER_STATUS_FLOW.index(status.status)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid status value")
        if new_index < current_index:
            raise HTTPException(status_code=400, detail="Cannot revert order status")
        order.status = status.status
    db.commit()
    db.refresh(order)
    # WhatsApp notification: status update
    send_whatsapp_message(
        order.whatsapp_number,
        f"Hi {order.customer_name}, your order status is now: {order.status}"
    )
    return order

@app.delete("/orders/{order_id}")
def cancel_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status == "delivered":
        raise HTTPException(status_code=400, detail="Delivered orders cannot be cancelled")
    # WhatsApp notification: order cancelled
    send_whatsapp_message(
        order.whatsapp_number,
        f"Hi {order.customer_name}, your order has been cancelled."
    )
    db.delete(order)
    db.commit()
    return {"message": "Order cancelled successfully"} 