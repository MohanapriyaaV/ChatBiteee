from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class MenuItem(Base):
    __tablename__ = "menu_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    is_available = Column(Boolean, default=True)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    whatsapp_number = Column(String)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    cancelled_at = Column(DateTime, nullable=True)
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"))
    quantity = Column(Integer)
    order = relationship("Order", back_populates="items") 