const Event = require('../models/Event');
const EventParticipation = require('../models/EventParticipation');
const User = require('../models/User');
const { invite } = require('../utils/invite');
const { points } = require('../utils/points');
const {
  filterTodayEvents,
  filterMonthEvents,
} = require('../utils/filterEvents');
const { sendPasswordResetEmail } = require('../utils/auth');
const schedule = require('node-schedule');
const moment = require('moment');
// Create a new event function
const createEvent = async (req, res) => {
  try {
    const { name, describe, start, end, invited, label } = req.body;
    let creatorId = req.user._id;
    console.log('start and end in backend is', typeof start, 'and', typeof end);

    // Create a new event and save
    const event = new Event({
      name: name,
      describe: describe,
      start: start,
      end: end,
      status: 'ongoing',
      label: label,
    });
    await event.save();
    console.log(
      'start and end in backend after I save it to EVENT MODEL is',
      event.start,
      'and',
      event.end,
    );
    // Create a new event participation for the creator
    const creatorParticipation = new EventParticipation({
      eventId: event._id,
      userId: creatorId,
      status: 'accepted',
    });
    await creatorParticipation.save();
    //Add a populate below this code to ref userId into email in database

    // Invited is an array of emails
    if (invited) {
      // Create a new event participation for the invited users by mapping
      const invitedParticipation = invited.map(
        async email => await invite(email, event._id, creatorId), // a bunch of promises in an array
      );
      //Make sure all promise is fullfilled
      await Promise.all(invitedParticipation);
    }
    const reminderTime = new Date(event.end);

    const humanReadableDate = moment(reminderTime)
      .local()
      .format('MMMM D, YYYY, h:mm A');
    console.log('reminderTime', humanReadableDate);
    reminderTime.setHours(reminderTime.getHours() - 12);

    // Fetch the event creator's email from the database based on their ID
    const eventCreator = await User.findById(creatorId).select('email');

    // Schedule the reminder email using node-schedule
    schedule.scheduleJob(reminderTime, async () => {
      if (eventCreator) {
        await sendPasswordResetEmail(
          eventCreator,
          `This is a friendly reminder that your event ${event.name} is ending in 12 hours at ${humanReadableDate}`,
          'Event Reminder',
        );
      }
    });
    res.status(201).json(event); //Adjust this return to fetch it easily in MonthEvents Redux Store
  } catch (error) {
    console.log(`Failed to create event: ${error}`);
    res.status(500).json({ error: error });
  }
};

/**
 * Controller function to get events of a user
 * req: request object containing user id.
 * res: response object to return status 200 and events array.
 */
const getAllEvents = async (req, res) => {
  try {
    const userId = req.user._id; //Fetch the UserId of current User
    const participation = await EventParticipation.find({
      //Find in EventParticipation, which Participation have the same userId with current user, and status is "accepted"
      userId: userId,
      status: 'accepted',
    });
    const eventsIdOfThisUser = participation.map(eventParticipation => {
      //After have the EventParticipation, we can access t
      return eventParticipation.eventId;
    });

    let eventsOfThisUser = await Promise.all(
      //We need this line beacuse Event.find() is a Promise (it can be success or failed), this line only accept success Promise
      eventsIdOfThisUser.map(async id => {
        return await Event.find({
          _id: id,
          status: { $in: ['overdue', 'ongoing', 'completed'] },
        }); // return an array
      }),
    );

    eventsOfThisUser = eventsOfThisUser.flat(); // Flattens the array of arrays

    res.status(200).json(eventsOfThisUser);
  } catch (error) {
    console.log('Failed to fetch all events from database');
    res.status(500).json({ error: error });
  }
};

//Add this events to display on MOnth View
const getAllEventsToday = async (req, res) => {
  try {
    const currentDate = new Date(req.query.currentDate);
    const userId = req.user._id;

    const participation = await EventParticipation.find({
      userId: userId,
      status: 'accepted',
    });

    const eventsIdOfThisUser = participation.map(eventParticipation => {
      return eventParticipation.eventId;
    });

    let eventsOfThisUser = await Promise.all(
      //We need this line beacuse Event.find() is a Promise (it can be success or failed), this line only accept success Promise
      eventsIdOfThisUser.map(async id => {
        return await Event.find({
          _id: id,
          status: { $in: ['overdue', 'ongoing', 'completed'] },
        }); // return an array
      }),
    );

    eventsOfThisUser = eventsOfThisUser.flat(); // Flattens the array of arrays
    const todayEvents = filterTodayEvents(eventsOfThisUser, currentDate); //filter all event that ongoing on currentDate

    res.status(200).json(todayEvents);
  } catch (error) {
    console.log(
      'Failed to fetch all TODAY events from the database:',
      error.message,
    );
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const getAllEventsMonths = async (req, res) => {
  try {
    let startDate = new Date(req.query.startDate);
    let endDate = new Date(req.query.endDate);
    const userId = req.user._id; //Fetch the UserId of current User
    const participation = await EventParticipation.find({
      //Find in EventParticipation, which Participation have the same userId with current user, and status is "accepted"
      userId: userId,
      status: 'accepted',
    });
    console.log('participation', participation);
    const eventsIdOfThisUser = participation.map(eventParticipation => {
      //After have the EventParticipation, we can access t
      return eventParticipation.eventId;
    });
    let eventsOfThisUser = await Promise.all(
      //We need this line beacuse Event.find() is a Promise (it can be success or failed), this line only accept success Promise
      eventsIdOfThisUser.map(async id => {
        return await Event.find({
          _id: id,
          status: { $in: ['overdue', 'ongoing', 'completed'] },
        }); // return an array
      }),
    );
    console.log('eventsOfThisUser', eventsOfThisUser);
    eventsOfThisUser = eventsOfThisUser.flat(); // Flattens the array of arrays (of this user's events), make 2D array become 1D array
    const monthEvents = filterMonthEvents(eventsOfThisUser, startDate, endDate); //Filter all events that ongoing in this month

    res.status(200).json(monthEvents);
  } catch (error) {
    console.log('Failed to fetch all Month events from database', '\n', error);
    res.status(500).json({ error: error });
  }
};

/**
 * Controller function to modify event of a user
 * req: request object containing user id, event id, and new event info. For example, new description.
 * res: response object to return status 200.
 */
const modifyEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;

    // check if user is the creator? -> might change schema for event
    // anyone can change for now

    const event = await Event.findByIdAndUpdate(
      { _id: eventId },
      { $set: updatedData },
      { new: true },
    );

    res.status(200).json(event);
  } catch (error) {
    console.log(`Failed to modify event: ${error}`);
    res.status(500).json({ error: error });
  }
};

/**
 * Controller function when a user finish an event
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
      return;
    }

    // Find EventParticipation of the users with that event ID and status == accepted,
    // then for each Event Participation, update the point of that user

    const participation = await EventParticipation.find({
      eventId: eventId,
      status: 'accepted',
    });

    const updatedEvents = participation.map(participation => {
      return User.findByIdAndUpdate(
        { _id: participation.userId },
        { $inc: { points: points(event.start, event.end) } },
        { new: true },
      );
    });
    await Promise.all(updatedEvents);

    newEvent = await Event.findByIdAndUpdate(
      { _id: eventId },
      { status: 'completed' },
      { new: true },
    );

    res.status(200).json({ event: newEvent });
  } catch (error) {
    console.log(`Failed to finish event: ${error}`);
    res.status(500).json({ error: error });
  }
};

/**
 * Check for overdued event and change status accordingly
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
  getAllEvents,
  getAllEventsToday,
  getAllEventsMonths,
  modifyEvent,
  finishEvent,
  checkIfEventOverdue,
};
