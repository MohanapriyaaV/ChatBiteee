import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    outForDeliveryOrders: 0,
    deliveredOrders: 0,
    totalMenuItems: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ordersResponse, menuResponse] = await Promise.all([
        axios.get('http://localhost:8000/orders/'),
        axios.get('http://localhost:8000/menu/'),
      ]);

      const orders = ordersResponse.data;
      const menuItems = menuResponse.data;

      const stats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter((order) => order.status === 'pending').length,
        preparingOrders: orders.filter((order) => order.status === 'preparing').length,
        outForDeliveryOrders: orders.filter((order) => order.status === 'out-for-delivery').length,
        deliveredOrders: orders.filter((order) => order.status === 'delivered').length,
        totalMenuItems: menuItems.length,
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const StatCard = ({ title, value, color }) => (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        backgroundColor: color,
        color: 'white',
      }}
    >
      <Typography component="h2" variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography component="p" variant="h4">
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Preparing Orders"
            value={stats.preparingOrders}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Out for Delivery"
            value={stats.outForDeliveryOrders}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Delivered Orders"
            value={stats.deliveredOrders}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <StatCard
            title="Total Menu Items"
            value={stats.totalMenuItems}
            color="#607d8b"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 