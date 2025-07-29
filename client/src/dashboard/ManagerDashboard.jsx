import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
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
            Manager Dashboard
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
          <Typography variant="h6">Welcome, {user?.name} (Manager)</Typography>
          <Typography variant="body1">Email: {user?.email}</Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Manager Privileges:</Typography>
            <ul>
              <li>View team performance</li>
              <li>Approve requests</li>
              <li>Generate reports</li>
            </ul>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ManagerDashboard;