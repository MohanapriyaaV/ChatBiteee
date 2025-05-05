import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/CreateOrder';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/create-order" element={<CreateOrder />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 