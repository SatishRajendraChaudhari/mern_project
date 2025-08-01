// server/models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Add other fields from your form as needed
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Admin', AdminSchema);