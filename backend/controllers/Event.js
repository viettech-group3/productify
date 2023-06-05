const Event = require('../models/Event');
const EventParticipation = require('../models/EventParticipation');
const User = require('../models/User');
const { invite } = require('../utils/invite');

// Create a new event function
const createEvent = async (req, res) => {
  try {
    const { name, describe, start, end, invited } = req.body;
    let creatorId = req.user._id;

    // Create a new event and save
    const event = new Event({
      name: name,
      describe: describe,
      start: start,
      end: end,
    });
    await event.save();

    // Create a new event participation for the creator
    const creatorParticipation = new EventParticipation({
      eventId: event._id,
      userId: creatorId,
      status: 'accepted',
    });
    await creatorParticipation.save();

    // Invited is an array of emails
    if (invited) {
      // Create a new event participation for the invited users by mapping
      const invitedParticipation = invited.map(
        async email => await invite(email, event._id), // a bunch of promises in an array
      );
      //Make sure all promise is fullfilled
      await Promise.all(invitedParticipation);
    }
    res.status(201).json({ event: event });
  } catch (error) {
    console.log(`Failed to create event: ${error}`);
    res.status(500).json({ error: error });
  }
};

/**
 * Controller function to get events of a user
 * Name: getAllEvents
 * Asignee: Phuoc
 * req: request object containing user id.
 * res: response object to return status 200 and events array.
 */

/**
 * Controller function to modify event of a user
 * Asignee: chi Jenny
 * Name: modifyEvent
 * req: request object containing user id, event id, and new event info. For example, new description.
 * res: response object to return status 200.
 */
const modifyEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { updatedData } = req.body;

    // check if user is the creator? -> might change schema for event
    // anyone can change for now

    const event = await Event.findByIdAndUpdate(
      { _id: eventId },
      { $set: updatedData },
      { new: true },
    );

    res.status(200).json({ event: event });
  } catch (error) {
    console.log(`Failed to modify event: ${error}`);
    res.status(500).json({ error: error });
  }
};

/**
 * Controller function when a user finish an event
 * Asignee: chi Jenny
 * Name: finishEvent
 * req: request object containing user id and event id.
 * res: response object to return status 200.
 */
/**
 * NOTES:
 * - might implement time caped. Rigth now, expected that start and end time is in the same day
 * - anyone can click finish for now
 */

const finishEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // the point will only be distributed if user finish the event before the end time

    const event = await Event.findById(eventId);

    // if event is completed, wont do anything
    if (event.status === 'completed') {
      res.status(400).json({ message: 'Event already completed' });
    }

    // get the point based on the time difference between start and end time
    let period = event.end.getTime() - event.start.getTime();
    period = period / 1000 / 60 / 60; // convert from milisecond to hours
    let point = period * 10;

    // check if the event is already overdue and deduct point accordingly
    const currentTime = new Date();
    if (event.end.getTime() < currentTime.getTime()) {
      point = Math.floor(point / 2);
    }

    // Find EventParticipation of the users with that event ID and status == accepted,
    // then for each Event Participation, update the point of that user

    const participation = await EventParticipation.find({
      eventId: eventId,
      status: 'accepted',
    });

    for (let i = 0; i < participation.length; i++) {
      await User.findByIdAndUpdate(
        { _id: participation[i].userId },
        { $inc: { points: point } },
        { new: true },
      );
    }
    await Event.findByIdAndUpdate(
      { _id: eventId },
      { status: 'completed' },
      { new: true },
    );

    res.status(200).json({ event: event });
  } catch (error) {
    console.log(`Failed to modify event: ${error}`);
    res.status(500).json({ error: error });
  }
};

/**
 * Check for overdued event and change status accordingly
 * Asignee: Dang
 * Name: finishEvent
 * req: request object containing event id.
 * res: response object to return status 200.
 */
const checkIfEventOverdue = async (req, res) => {
  try {
    const eventId = req.params.id;
    const timeNow = new Date();
    const event = await Event.findById(eventId);
    if (event.status === 'completed' || event.status === 'overdue') {
      res.status(200).json('Event is already completed or overdue');
    } else {
      if (event.end.getTime() < timeNow.getTime()) {
        await Event.findByIdAndUpdate(
          { _id: eventId },
          { $set: { status: 'overdue' } },
          { new: true },
        );
        res.status(200).json('Event is overdue');
      }
    }
  } catch (error) {
    console.log(`Failed to modify event: ${error}`);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createEvent,
  modifyEvent,
  finishEvent,
};
