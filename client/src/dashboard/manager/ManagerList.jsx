import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  {
    field: 'Name',
    headerName: 'Name',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
    editable: true,
  },
  {
    field: 'organization',
    headerName: 'Organization',
    width: 180,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 110,
    editable: true,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div>
        <IconButton aria-label="view" size="small" onClick={() => handleView(params.row)}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="edit" size="small" onClick={() => handleEdit(params.row)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" size="small" onClick={() => handleDelete(params.row)} color="error">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    ),
  },
];

const rows = [
  { id: 1, email: 'Snow@gmail.com', Name: 'Jon', organization: "Organization A", role: "Manager", status: "Active" },
  { id: 2, email: 'Lannister@gmail.com', Name: 'Cersei', organization: "Organization A", role: "User", status: "InActive" },
  { id: 3, email: 'Lannister@gmail.com', Name: 'Jaime', organization: "Organization A", role: "User", status: "Active" },
  { id: 4, email: 'Stark@gmail.com', Name: 'Arya', organization: "Organization A", role: "User", status: "Active" },
  { id: 5, email: 'Targaryen@gmail.com', Name: 'Daenerys', organization: "Organization A", role: "User", status: "Active" },
  { id: 6, email: 'Melisandre@gmail.com', Name: "Gaurya", organization: "Organization A", role: "User", status: "Active" },
  { id: 7, email: 'Clifford@gmail.com', Name: 'Ferrara', organization: "Organization A", role: "Manager", status: "Active" },
  { id: 8, email: 'Frances@gmail.com', Name: 'Rossini', organization: "Organization A", role: "Manager", status: "Active" },
  { id: 9, email: 'Roxie@gmail.com', Name: 'Harvey', organization: "Organization A", role: "Manager", status: "Active" },
];

// Handler functions
const handleView = (row) => {
  console.log('View row:', row);
  // Add your view logic here
};

const handleEdit = (row) => {
  console.log('Edit row:', row);
  // Add your edit logic here
};

const handleDelete = (row) => {
  console.log('Delete row:', row);
  // Add your delete logic here
};

export default function DataGridDemo() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      p: 3,
      height: 400, 
      width: '100%' 
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}