// Create User routers
const express = require('express');
const UserRouter = express.Router();

const {
  signUp,
  login,
  leaderboard,
  getUser,
  updateUser,
  getAvatars,
  forgotPassword,
  resetPassword,
  getLabelList,
  addLabelList,
  deleteLabelList,
  getUserByEmail,
  getUserToken,
  createEventWithGoogle,
  loginorsignup,
  deductPoints,
} = require('../controllers/User');
const { protect } = require('../utils/auth');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const oauth2Client = new OAuth2Client(
  '225763645761-hsk3k9suo4qdjenika5i9deutkg7h5u1.apps.googleusercontent.com',
  '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',
  'http://localhost:3000',
);

// Set up routes
UserRouter.post('/', signUp);
UserRouter.post('/forgotpassword', forgotPassword);
UserRouter.post('/resetpassword', resetPassword);
UserRouter.post('/login', login);
UserRouter.get('/leaderboard', leaderboard);
UserRouter.get('/getUser', protect, getUser);
UserRouter.post('/loginorsignup', loginorsignup);
UserRouter.post('/getUserToken', getUserToken);
UserRouter.post('/googleevent', createEventWithGoogle);
UserRouter.put('/update', protect, updateUser);
UserRouter.get('/getAvatars', protect, getAvatars);
UserRouter.get('/getLabelList', protect, getLabelList);
UserRouter.post('/addLabelList', protect, addLabelList);
UserRouter.delete('/deleteLabelList', protect, deleteLabelList);
UserRouter.put('/deduct', protect, deductPoints);
module.exports = UserRouter;
