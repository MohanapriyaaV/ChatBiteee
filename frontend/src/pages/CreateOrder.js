import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import axios from 'axios';

function CreateOrder() {
  const [menuItems, setMenuItems] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer_name: '',
    whatsapp_number: '',
    items: [],
  });
  const [itemSelections, setItemSelections] = useState([
    { menu_item_id: '', quantity: 1 },
  ]);
  const [numberError, setNumberError] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogMsg, setErrorDialogMsg] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [itemSelections, menuItems]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/menu/');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleOrderChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleItemChange = (idx, field, value) => {
    const updated = [...itemSelections];
    updated[idx][field] = value;
    setItemSelections(updated);
  };

  const handleAddItem = () => {
    setItemSelections([...itemSelections, { menu_item_id: '', quantity: 1 }]);
  };

  const handleRemoveItem = (idx) => {
    const updated = itemSelections.filter((_, i) => i !== idx);
    setItemSelections(updated);
  };

  const calculateTotal = () => {
    let sum = 0;
    itemSelections.forEach(sel => {
      const item = menuItems.find(m => m.id === parseInt(sel.menu_item_id));
      if (item && sel.quantity) {
        sum += item.price * parseInt(sel.quantity);
      }
    });
    setTotal(sum);
  };

  const handleSubmit = async () => {
    // Validate WhatsApp number
    if (!/^\+\d{10,15}$/.test(newOrder.whatsapp_number)) {
      setNumberError("Please enter a valid international WhatsApp number (e.g. +919876543210)");
      return;
    }
    // Prepare items for backend
    const items = itemSelections
      .filter(sel => sel.menu_item_id !== '')
      .map(sel => ({
        menu_item_id: parseInt(sel.menu_item_id),
        quantity: parseInt(sel.quantity),
      }));
    try {
      await axios.post('http://localhost:8000/orders/', {
        customer_name: newOrder.customer_name,
        whatsapp_number: newOrder.whatsapp_number,
        items,
      });
      setErrorDialogMsg("Order created successfully!");
      setErrorDialogOpen(true);
      setNewOrder({ customer_name: '', whatsapp_number: '', items: [] });
      setItemSelections([{ menu_item_id: '', quantity: 1 }]);
      setTotal(0);
    } catch (error) {
      let msg = "Error creating order.";
      if (error.response && error.response.data && error.response.data.detail) {
        msg = error.response.data.detail;
      }
      setErrorDialogMsg(msg);
      setErrorDialogOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Create Order</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Customer Name"
          name="customer_name"
          fullWidth
          value={newOrder.customer_name}
          onChange={handleOrderChange}
        />
        <TextField
          label="WhatsApp Number (e.g. +919876543210)"
          name="whatsapp_number"
          fullWidth
          value={newOrder.whatsapp_number}
          onChange={(e) => {
            setNewOrder({ ...newOrder, whatsapp_number: e.target.value });
            setNumberError("");
          }}
          error={!!numberError}
          helperText={numberError}
        />
        <Typography variant="subtitle1">Order Items</Typography>
        {itemSelections.map((sel, idx) => (
          <Box key={idx} display="flex" alignItems="center" gap={1} mb={1}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Menu Item</InputLabel>
              <Select
                value={sel.menu_item_id}
                label="Menu Item"
                onChange={e => handleItemChange(idx, 'menu_item_id', e.target.value)}
              >
                <MenuItem value="">Select</MenuItem>
                {menuItems
                  .filter(item => item.is_available)
                  .map(item => (
                    <MenuItem value={item.id} key={item.id}>{item.name} - ₹{item.price}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              type="number"
              value={sel.quantity}
              onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
              sx={{ width: 80 }}
              inputProps={{ min: 1 }}
            />
            <Button onClick={() => handleRemoveItem(idx)} color="error" disabled={itemSelections.length === 1}>Remove</Button>
          </Box>
        ))}
        <Button onClick={handleAddItem} sx={{ mt: 1 }}>Add Another Item</Button>
        <Typography variant="h6" sx={{ mt: 2 }}>Total Amount: ₹{total.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Create Order
        </Button>
      </Box>
      <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
        <DialogTitle>Order Status</DialogTitle>
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

export default CreateOrder; 