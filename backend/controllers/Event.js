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



const getAllEvents = async (req, res) => {
  try {
    const userId = req.user._id; //Fetch the UserId of current User
    const participation = await EventParticipation.find({   //Find in EventParticipation, which Participation have the same userId with current user, and status is "accepted"
      userId: userId,
      status: 'accepted',
    })
    const eventsIdOfThisUser = participation.map((eventParticipation) => {  //After have the EventParticipation, we can access t
      return eventParticipation.eventId;
    })

    const eventsOfThisUser = await Promise.all( //We need this line beacuse Event.find() is a Promise (it can be success or failed), this line only accept success Promise
      eventsIdOfThisUser.map(async (id) => {
        return await Event.find({ _id: id, status: { $in: ['overdue', 'ongoing'] } }); // return an array
      })
    );

    const flattenedEvents = eventsOfThisUser.flat(); // Flattens the array of arrays

    res.status(200).json(flattenedEvents)
  } catch (error) {
    console.log('Failed to fetch all events from database');
    res.status(500).json({ error: error })
  }
}

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
  getAllEvents
};
