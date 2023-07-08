// Create User routers
const express = require('express');
const UserRouter = express.Router();
const {
  signUp,
  login,
  leaderboard,
  getUser,
  updateUser,
  getLabelList,
  addLabelList,
  deleteLabelList
} = require('../controllers/User');
const { protect } = require('../utils/auth');

// Set up routes
UserRouter.post('/', signUp);
UserRouter.post('/login', login);
UserRouter.get('/leaderboard', leaderboard);
UserRouter.get('/getUser', protect, getUser);
UserRouter.put('/update', protect, updateUser);
UserRouter.get('/getLabelList', protect, getLabelList)
UserRouter.post('/addLabelList', protect, addLabelList)
UserRouter.delete('/deleteLabelList', protect, deleteLabelList)
module.exports = UserRouter;
