import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';

const AdminForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    orgType: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    sameAsBilling: false,
    billingAddress1: '',
    billingAddress2: '',
    billingCountry: '',
    billingState: '',
    billingCity: '',
    billingPostalCode: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const orgTypes = ['Application Based', 'SaaS Based'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'sameAsBilling') {
      const newValue = checked;
      setFormData(prev => ({
        ...prev,
        sameAsBilling: newValue,
        billingAddress1: newValue ? prev.address1 : prev.billingAddress1,
        billingAddress2: newValue ? prev.address2 : prev.billingAddress2,
        billingCountry: newValue ? prev.country : prev.billingCountry,
        billingState: newValue ? prev.state : prev.billingState,
        billingCity: newValue ? prev.city : prev.billingCity,
        billingPostalCode: newValue ? prev.postalCode : prev.billingPostalCode
      }));
    } else {
      setFormData(prev => {
        const updated = {
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        };
        
        if (prev.sameAsBilling && name.startsWith('address')) {
          const billingField = 'billing' + name.charAt(0).toUpperCase() + name.slice(1);
          return {
            ...updated,
            [billingField]: value
          };
        }
        if (prev.sameAsBilling && ['country', 'state', 'city', 'postalCode'].includes(name)) {
          const billingField = 'billing' + name.charAt(0).toUpperCase() + name.slice(1);
          return {
            ...updated,
            [billingField]: value
          };
        }
        return updated;
      });
    }
  };

  const validateForm = () => {
    if (!formData.firstName) return 'First name is required';
    if (!formData.lastName) return 'Last name is required';
    if (!formData.email) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.businessName) return 'Business name is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        orgType: formData.orgType,
      };

      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/v1/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send invitation');
      }

      const responseData = await response.json();

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: '',
        orgType: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        postalCode: '',
        sameAsBilling: false,
        billingAddress1: '',
        billingAddress2: '',
        billingCountry: '',
        billingState: '',
        billingCity: '',
        billingPostalCode: ''
      });

      if (onSuccess) onSuccess();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: 'auto', marginTop: 5 }}>
      <Typography variant="h5" gutterBottom>
        Send Invitation
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Invitation sent successfully! The admin list has been updated.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={4}>
            <Typography variant="subtitle2">First Name *</Typography>
            <TextField
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Last Name *</Typography>
            <TextField
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Email ID *</Typography>
            <TextField
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              type="email"
              required
              variant="outlined"
            />
          </Grid>

          {/* Second Row */}
          <Grid item xs={4}>
            <Typography variant="subtitle2">Phone No</Typography>
            <TextField
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Business Name *</Typography>
            <TextField
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Organization Type</Typography>
            <TextField
              name="orgType"
              select
              value={formData.orgType}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              {orgTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Contact Address Section */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Contact Address
            </Typography>
          </Grid>

          {/* Contact Address Fields */}
          <Grid item xs={4}>
            <Typography variant="subtitle2">Address</Typography>
            <TextField
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Address 2</Typography>
            <TextField
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Country Name</Typography>
            <TextField
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">State</Typography>
            <TextField
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">City</Typography>
            <TextField
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Postal/Zip Code</Typography>
            <TextField
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Billing Address Checkbox */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="sameAsBilling"
                  checked={formData.sameAsBilling}
                  onChange={handleChange}
                />
              }
              label="Contact address and billing address are same"
            />
          </Grid>

          {/* Billing Address Section - Always visible */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Billing Address
            </Typography>
          </Grid>

          {/* Billing Address Fields */}
          <Grid item xs={4}>
            <Typography variant="subtitle2">Address</Typography>
            <TextField
              name="billingAddress1"
              value={formData.billingAddress1}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={formData.sameAsBilling}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Address 2</Typography>
            <TextField
              name="billingAddress2"
              value={formData.billingAddress2}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={formData.sameAsBilling}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Country Name</Typography>
            <TextField
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={formData.sameAsBilling}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">State</Typography>
            <TextField
              name="billingState"
              value={formData.billingState}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={formData.sameAsBilling}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">City</Typography>
            <TextField
              name="billingCity"
              value={formData.billingCity}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={formData.sameAsBilling}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2">Postal/Zip Code</Typography>
            <TextField
              name="billingPostalCode"
              value={formData.billingPostalCode}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={formData.sameAsBilling}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              size="large"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" />
                  <Box sx={{ ml: 1 }}>Sending...</Box>
                </>
              ) : (
                'Send Invitation'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AdminForm;