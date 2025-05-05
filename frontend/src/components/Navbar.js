import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WhatsApp Food Ordering
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/menu"
            startIcon={<RestaurantMenuIcon />}
          >
            Menu
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/orders"
            startIcon={<ShoppingCartIcon />}
          >
            Orders
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/create-order"
            startIcon={<AddShoppingCartIcon />}
          >
            Create Order
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 