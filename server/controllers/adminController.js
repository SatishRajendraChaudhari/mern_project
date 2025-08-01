// server/controllers/adminController.js
const Admin = require('../models/Admin');

exports.createAdmin = async (req, res) => {
  try {
    const { businessName, email, /* other fields */ } = req.body;
    
    const admin = await Admin.create({
      businessName,
      email,
      // other fields
    });

    res.status(201).json({
      success: true,
      data: admin
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// server/controllers/adminController.js
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    
    // Ensure consistent response structure
    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins // This must be an array
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};