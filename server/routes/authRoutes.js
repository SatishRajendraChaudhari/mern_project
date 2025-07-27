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