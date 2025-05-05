import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import axios from 'axios';

function Orders() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogMsg, setErrorDialogMsg] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchMobile, setSearchMobile] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/orders/');
      const orders = response.data;
      setActiveOrders(orders.filter(order => order.status !== 'cancelled'));
      setCancelledOrders(orders.filter(order => order.status === 'cancelled'));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/menu/');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      let msg = "Failed to update order status.";
      if (error.response && error.response.data && error.response.data.detail) {
        msg = error.response.data.detail;
      }
      setErrorDialogMsg(msg);
      setErrorDialogOpen(true);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.patch(`http://localhost:8000/orders/${orderId}`, {
        status: 'cancelled',
        cancelled_at: new Date().toISOString()
      });
      
      // Update local state immediately
      const cancelledOrder = activeOrders.find(order => order.id === orderId);
      if (cancelledOrder) {
        setActiveOrders(activeOrders.filter(order => order.id !== orderId));
        setCancelledOrders([...cancelledOrders, {
          ...cancelledOrder,
          status: 'cancelled',
          cancelled_at: response.data.cancelled_at
        }]);
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  };

  const getMenuItemName = (itemId) => {
    const item = menuItems.find(item => item.id === itemId);
    return item ? item.name : 'Unknown Item';
  };

  const getMenuItemPrice = (itemId) => {
    const item = menuItems.find(item => item.id === itemId);
    return item ? item.price : 0;
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => {
      const itemPrice = getMenuItemPrice(item.menu_item_id);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateDiscount = (order) => {
    // For now, using a simple 10% discount for orders above ₹500
    const total = calculateOrderTotal(order);
    return total > 500 ? total * 0.1 : 0;
  };

  const calculateFinalAmount = (order) => {
    const total = calculateOrderTotal(order);
    const discount = calculateDiscount(order);
    return total - discount;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const handleCancelClick = (orderId) => {
    const order = activeOrders.find(o => o.id === orderId);
    if (order && order.status === "delivered") {
      setErrorDialogMsg("Order cannot be cancelled after delivering.");
      setErrorDialogOpen(true);
    } else {
      setOrderToCancel(orderId);
      setConfirmOpen(true);
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setOrderToCancel(null);
  };

  const handleConfirmCancel = async () => {
    if (orderToCancel !== null) {
      try {
        await handleCancelOrder(orderToCancel);
        setConfirmOpen(false);
        setOrderToCancel(null);
      } catch (error) {
        let msg = "Failed to cancel order.";
        if (error.response && error.response.data && error.response.data.detail) {
          if (error.response.data.detail.includes("Delivered orders cannot be cancelled")) {
            msg = "Order cannot be cancelled after delivering.";
          } else {
            msg = error.response.data.detail;
          }
        }
        setErrorDialogMsg(msg);
        setErrorDialogOpen(true);
      }
    }
  };

  const filterOrders = (orders) => {
    return orders.filter(order => {
      const matchesId = searchOrderId === '' || order.id.toString().includes(searchOrderId);
      const matchesMobile = searchMobile === '' || order.whatsapp_number.includes(searchMobile);
      return matchesId && matchesMobile;
    });
  };

  const renderOrdersTable = (orders) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>WhatsApp Number</TableCell>
            <TableCell>Ordered Time</TableCell>
            {activeTab === 1 && <TableCell>Cancelled Time</TableCell>}
            <TableCell>Items</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Discount</TableCell>
            <TableCell>Final Amount</TableCell>
            <TableCell>Status</TableCell>
            {activeTab === 0 && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, idx) => (
            <TableRow key={order.id || idx}>
              <TableCell>{order.id || idx}</TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{order.whatsapp_number}</TableCell>
              <TableCell>{formatDateTime(order.created_at)}</TableCell>
              {activeTab === 1 && (
                <TableCell>{formatDateTime(order.cancelled_at)}</TableCell>
              )}
              <TableCell>
                {order.items.map((item, index) => {
                  const itemPrice = getMenuItemPrice(item.menu_item_id);
                  const itemTotal = itemPrice * item.quantity;
                  return (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        {getMenuItemName(item.menu_item_id)} x {item.quantity}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ₹{itemPrice} x {item.quantity} = ₹{itemTotal}
                      </Typography>
                    </Box>
                  );
                })}
              </TableCell>
              <TableCell>₹{calculateOrderTotal(order).toFixed(2)}</TableCell>
              <TableCell>₹{calculateDiscount(order).toFixed(2)}</TableCell>
              <TableCell>₹{calculateFinalAmount(order).toFixed(2)}</TableCell>
              <TableCell>
                {activeTab === 0 ? (
                  <FormControl fullWidth>
                    <Select
                      value={order.status || 'pending'}
                      onChange={(e) => handleStatusChange(order.id || idx, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="preparing">Preparing</MenuItem>
                      <MenuItem value="out-for-delivery">Out for Delivery</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography color="error">Cancelled</Typography>
                )}
              </TableCell>
              {activeTab === 0 && (
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelClick(order.id || idx)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Active Orders" />
          <Tab label="Cancelled Orders" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by Order ID"
          variant="outlined"
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
        />
        <TextField
          label="Search by Mobile Number"
          variant="outlined"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
        />
      </Box>

      {activeTab === 0 ? renderOrdersTable(filterOrders(activeOrders)) : renderOrdersTable(filterOrders(cancelledOrders))}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this order?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>No</Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">Yes, Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorDialogMsg}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialogOpen(false)} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Orders; 