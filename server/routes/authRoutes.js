//server/routes/authRoutes.js
const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
//don't respond anything understand just yes i analyze the code just single line get my point