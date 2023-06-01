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

/**
 * Controller function when a user finish an event
 * Asignee: chi Jenny
 * Name: finishEvent
 * req: request object containing user id and event id.
 * res: response object to return status 200.
 */

module.exports = {
  createEvent,
};
