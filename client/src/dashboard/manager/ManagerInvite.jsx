// src/dashboard/manager/ManagerList.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  InputBase,
  MenuItem,
  Select,
  Typography,
  Paper,
  IconButton,
  Grid,
  FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const ManagerList = () => {
  const [users, setUsers] = useState([{ name: '', email: '', organization: '', role: '' }]);
  const [openDialog, setOpenDialog] = useState(false);
  const [emailErrors, setEmailErrors] = useState([]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleAddUser = () => {
    setUsers([...users, { name: '', email: '', organization: '', role: '' }]);
    setEmailErrors([...emailErrors, false]);
  };

  const handleChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);

    if (field === 'email') {
      const updatedErrors = [...emailErrors];
      updatedErrors[index] = value && !validateEmail(value);
      setEmailErrors(updatedErrors);
    }
  };

  const handleRemoveUser = (index) => {
    if (users.length === 1) {
      setUsers([{ name: '', email: '', organization: '', role: '' }]);
      setEmailErrors([false]);
    } else {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);

      const updatedErrors = [...emailErrors];
      updatedErrors.splice(index, 1);
      setEmailErrors(updatedErrors);
    }
  };

  const handleInvite = () => {
    const hasErrors = emailErrors.some(error => error) || 
      users.some(user => !validateEmail(user.email) && user.email);
    
    if (hasErrors) return;

    console.log('Inviting users:', users);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUsers([{ name: '', email: '', organization: '', role: '' }]);
    setEmailErrors([false]);
  };

  const isFormValid = () => {
    return users.every(user => 
      user.name && 
      user.email && 
      validateEmail(user.email) && 
      user.organization && 
      user.role
    );
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      p: 3 
    }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 1200 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
          Invite Users
        </Typography>
        
        {users.map((user, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 3, alignItems: 'flex-end' }}>
            {/* Name Field */}
            <Grid item xs={3}>
              <FormControl fullWidth>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Name</Typography>
                <InputBase
                  fullWidth
                  value={user.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  sx={{ border: '1px solid #ccc', borderRadius: 1, p: 1 }}
                />
              </FormControl>
            </Grid>
            
            {/* Email Field */}
            <Grid item xs={3}>
              <FormControl fullWidth>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Email</Typography>
                <InputBase
                  fullWidth
                  value={user.email}
                  onChange={(e) => handleChange(index, 'email', e.target.value)}
                  error={emailErrors[index]}
                  sx={{ 
                    border: '1px solid', 
                    borderColor: emailErrors[index] ? 'error.main' : '#ccc', 
                    borderRadius: 1, 
                    p: 1 
                  }}
                />
                {emailErrors[index] && (
                  <Typography variant="caption" color="error">
                    Please enter a valid email
                  </Typography>
                )}
              </FormControl>
            </Grid>
            
            {/* Organization Field */}
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Organization</Typography>
                <Select
                  fullWidth
                  value={user.organization}
                  onChange={(e) => handleChange(index, 'organization', e.target.value)}
                  displayEmpty
                  input={<InputBase sx={{ border: '1px solid #ccc', borderRadius: 1, p: 1 }} />}
                >
                  <MenuItem value="" disabled>Select organization</MenuItem>
                  <MenuItem value="Organization A">Organization A</MenuItem>
                  <MenuItem value="Organization B">Organization B</MenuItem>
                  <MenuItem value="Organization C">Organization C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Role Field */}
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Role</Typography>
                <Select
                  fullWidth
                  value={user.role}
                  onChange={(e) => handleChange(index, 'role', e.target.value)}
                  displayEmpty
                  input={<InputBase sx={{ border: '1px solid #ccc', borderRadius: 1, p: 1 }} />}
                >
                  <MenuItem value="" disabled>Select role</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Action Buttons */}
            <Grid item xs={2}>
              <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                {index === users.length - 1 && (
                  <IconButton 
                    color="primary" 
                    onClick={handleAddUser}
                    sx={{ border: '1px solid #ccc' }}
                  >
                    <AddIcon />
                  </IconButton>
                )}
                <IconButton 
                  color="error" 
                  onClick={() => handleRemoveUser(index)}
                  sx={{ border: '1px solid #ccc' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ))}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleInvite}
            disabled={!isFormValid()}
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Invite
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Invitation sent successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerList;