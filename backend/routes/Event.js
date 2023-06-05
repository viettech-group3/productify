// Create Event routers
const express = require('express');
const {
  createEvent,
  getAllEvents,
  modifyEvent,
  finishEvent,
} = require('../controllers/Event');
const { protect } = require('../utils/auth');
const { inviteUsers } = require('../controllers/EventParticipation');
const EventRouter = express.Router();

// Set up routes
EventRouter.post('/create', protect, createEvent);
EventRouter.post('/invite/:id', protect, inviteUsers);

// Em comment here de no het bug do may function nay chua co, u can uncomment later

// EventRouter.get('/get', protect, getAllEvents);
// EventRouter.put('/modify', protect, modifyEvent);
// EventRouter.post('/finish', protect, finishEvent);

module.exports = EventRouter;
