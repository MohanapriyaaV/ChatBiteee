import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import axios from 'axios';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    is_available: true,
  });
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addError, setAddError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/menu/');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Add Menu Item
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewItem({ name: '', description: '', price: '', is_available: true });
    setAddError("");
  };
  const handleSubmit = async () => {
    setAdding(true);
    setAddError("");
    try {
      await axios.post('http://localhost:8000/menu/', {
        ...newItem,
        price: parseFloat(newItem.price),
      });
      fetchMenuItems();
      handleClose();
    } catch (error) {
      let msg = "Failed to add menu item.";
      if (error.response && error.response.data && error.response.data.detail) {
        msg = error.response.data.detail;
      }
      setAddError(msg);
    }
    setAdding(false);
  };

  // Edit Menu Item
  const handleEditOpen = (item) => {
    setEditItem({ ...item });
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setEditItem(null);
  };
  const handleEditChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };
  const handleEditSwitch = (e) => {
    setEditItem({ ...editItem, is_available: e.target.checked });
  };
  const handleEditSubmit = async () => {
    setEditing(true);
    try {
      await axios.patch(`http://localhost:8000/menu/${editItem.id}`, {
        name: editItem.name,
        description: editItem.description,
        price: parseFloat(editItem.price),
        is_available: editItem.is_available,
      });
      fetchMenuItems();
      setEditOpen(false);
      setEditItem(null);
    } catch (error) {
      console.error('Error editing menu item:', error);
    }
    setEditing(false);
  };

  // Delete Menu Item
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };
  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/menu/${deleteId}`);
      fetchMenuItems();
      setDeleteOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
    setDeleting(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <TextField
        label="Search Menu by Name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Menu Item
      </Button>
      <Grid container spacing={3}>
        {menuItems
          .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${item.price}
                  </Typography>
                  <Typography variant="body2" color={item.is_available ? 'success.main' : 'error.main'}>
                    {item.is_available ? 'Available' : 'Unavailable'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleEditOpen(item)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDeleteOpen(item.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Add Menu Item Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          {addError && (
            <Typography color="error" variant="body2" sx={{ mt: 0.5, mb: 1 }}>
              {addError}
            </Typography>
          )}
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newItem.is_available}
                onChange={(e) => setNewItem({ ...newItem, is_available: e.target.checked })}
                color="primary"
              />
            }
            label="Available"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={adding}>
            {adding ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Menu Item Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogContent>
          {editItem && (
            <Box>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                value={editItem.name}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Description"
                name="description"
                fullWidth
                value={editItem.description}
                onChange={handleEditChange}
              />
              <TextField
                margin="dense"
                label="Price"
                name="price"
                type="number"
                fullWidth
                value={editItem.price}
                onChange={handleEditChange}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editItem.is_available}
                    onChange={handleEditSwitch}
                    color="primary"
                  />
                }
                label="Available"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary" disabled={editing}>
            {editing ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this menu item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>No</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Yes, Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Menu; 