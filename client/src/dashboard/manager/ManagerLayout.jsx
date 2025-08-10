// src/dashboard/manager/ManagerLayout.jsx
import React from 'react';
import { 
  Box,
  Typography,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const ManagerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>
      
      <Breadcrumbs aria-label="breadcrumb" >
        <Link 
          underline="hover" 
          color="inherit" 
          onClick={() => navigate('/manager-invite')}
          sx={{ cursor: 'pointer' }}
        >
          Manager Invite
        </Link>
       <Link 
          underline="hover" 
          color="inherit" 
          onClick={() => navigate('/manager-list')}
          sx={{ cursor: 'pointer' }}
        >
          Manager List
        </Link>
      </Breadcrumbs>

      <Outlet />
    </Box>
  );
};

export default ManagerLayout;