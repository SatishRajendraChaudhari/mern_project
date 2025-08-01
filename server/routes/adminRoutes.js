// server/routes/adminRoutes.js
const express = require('express');
const { createAdmin, getAdmins } = require('../controllers/adminController');
const router = express.Router();

router.post('/', createAdmin);
router.get('/', getAdmins);

module.exports = router;