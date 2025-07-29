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
//i am sharing my all important components after sharing all the components than after that i can give you command get the point just now consume and understand the components till then don't do anything
// just analyze the code don't give me any response