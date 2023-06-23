const express = require('express');
const { protect } = require('../utils/auth');
const { generateRoomToken } = require('../controllers/StudyWithMe');

const StudyRouter = express.Router();

StudyRouter.post('/generateToken', generateRoomToken);

module.exports = StudyRouter;
