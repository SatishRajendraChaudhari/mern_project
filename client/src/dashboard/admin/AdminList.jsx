import React, { useState, useEffect } from 'react';
import { 
  Box, 
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminList({ refreshFlag }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/v1/admin`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Safely handle the response
      const responseData = data?.data || [];
      
      const formattedData = responseData.map(admin => ({
        id: admin._id,
        Organization: admin.businessName || 'N/A',
        AdminEmail: admin.email || 'N/A',
        ManagerEmail: admin.email || 'N/A', // Same as admin email
        user: admin.userCount || 0,
        status: admin.status || 'Active',
        actions: ''
      }));
      
      setRows(formattedData);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Please try again.');
      setRows([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAdmins();
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit admin with id:', id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/v1/admin/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        fetchAdmins(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete admin:', err);
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [refreshFlag]); // Refresh when parent component signals a change

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 90 
    },
    {
      field: 'Organization',
      headerName: 'Organization Name',
      width: 180,
      editable: false,
    },
    {
      field: 'AdminEmail',
      headerName: 'Admin',
      width: 180,
      editable: false,
    },
    {
      field: 'ManagerEmail',
      headerName: 'Manager',
      width: 150,
      editable: false,
    },
    {
      field: 'user',
      headerName: 'Users',
      width: 110,
      editable: false,
      type: 'number'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      editable: false,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.value === 'Active' ? 'success.main' : 'error.main',
            fontWeight: 'bold'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Box sx={{ color: 'error.main', p: 2, textAlign: 'center' }}>
          {error}
        </Box>
      )}

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        components={{
          LoadingOverlay: LinearProgress,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
}