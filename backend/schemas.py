from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MenuItemBase(BaseModel):
    name: str
    description: str
    price: float
    is_available: bool = True

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemOut(MenuItemBase):
    id: int
    class Config:
        orm_mode = True

class OrderItemBase(BaseModel):
    menu_item_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemOut(OrderItemBase):
    id: int
    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    customer_name: str
    whatsapp_number: str

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class OrderOut(OrderBase):
    id: int
    status: str
    created_at: datetime
    cancelled_at: Optional[datetime] = None
    items: List[OrderItemOut]
    class Config:
        orm_mode = True

class OrderStatusUpdate(BaseModel):
    status: str 