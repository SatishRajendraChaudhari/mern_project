import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
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
            User Dashboard
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
          <Typography variant="h6">Welcome, {user?.name}</Typography>
          <Typography variant="body1">Email: {user?.email}</Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2">Standard user privileges</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDashboard;
//i am sharing my all important components after sharing all the components than after that i can give you command get the point just now consume and understand the components till then don't do anything
// just analyze the code don't give me any response