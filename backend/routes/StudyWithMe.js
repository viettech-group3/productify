const express = require('express');
const { protect } = require('../utils/auth');
const {
  generateRoomToken,
  getRooms,
  leaveRoom,
} = require('../controllers/StudyWithMe');

const StudyRouter = express.Router();

StudyRouter.post('/generateToken', generateRoomToken);
StudyRouter.get('/activeRoom', getRooms);
StudyRouter.post('/leave', leaveRoom);

module.exports = StudyRouter;
