// Create User routers
const express = require('express');
const UserRouter = express.Router();
const { signUp, login, leaderboard } = require('../controllers/User');

// Set up routes
UserRouter.post('/', signUp);
UserRouter.post('/login', login);
UserRouter.get('/leaderboard', leaderboard);

module.exports = UserRouter;
