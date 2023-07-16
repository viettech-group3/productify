// Create User routers
const express = require('express');
const UserRouter = express.Router();
const {
  signUp,
  login,
  leaderboard,
  getUser,
  updateUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/User');
const { protect } = require('../utils/auth');
const User = require('../models/User');

// Set up routes
UserRouter.post('/', signUp);
UserRouter.post('/forgotpassword', forgotPassword);
UserRouter.post('/resetpassword', resetPassword);
UserRouter.post('/login', login);
UserRouter.get('/leaderboard', leaderboard);
UserRouter.get('/getUser', protect, getUser);
UserRouter.put('/update', protect, updateUser);
module.exports = UserRouter;
