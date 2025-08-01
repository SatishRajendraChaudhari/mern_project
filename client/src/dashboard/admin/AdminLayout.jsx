//dashboard/admin/adminlayout
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbItems = [
    { label: 'Super Admin Form', to: '/admin-form' },
    { label: 'Admin List', to: '/admin-list' },
  ];

  return (
    <Box>
      {/* Header Breadcrumb */}
      <Box sx={{ px: 4, py: 2, backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                textDecoration: 'none',
                color: currentPath === item.to ? '#1976d2' : '#444',
                fontWeight: currentPath === item.to ? 'bold' : 'normal',
                textTransform: 'capitalize',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Typography color="text.primary">
            {breadcrumbItems.find(i => i.to === currentPath)?.label || 'Unknown Page'}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: 4, pt: 4 }}>
        <Outlet />
      </Box>

    
    </Box>
  );
};

export default AdminLayout;
//i am sharing with you my all the components understand until i give you any command just analyze the code and try to understand the flow 
//don't respond anything understand just yes i analyze the code just single line get my point
