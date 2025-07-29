import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="h1" variant="h4">
            Admin Dashboard
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Welcome, {user?.name} (Administrator)</Typography>
          <Typography variant="body1">Email: {user?.email}</Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Admin Privileges:</Typography>
            <ul>
              <li>Manage all users</li>
              <li>System configuration</li>
              <li>Access audit logs</li>
              <li>Global settings management</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;