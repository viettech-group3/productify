const Event = require("../models/Event");
const EventParticipation = require("../models/EventParticipation");
const User = require("../models/User");
const { invite } = require("../utils/invite");

// create a new event function

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
      status: "accepted",
    });
    await creatorParticipation.save();

    //Invited is an array of emails
    if (invited) {
      // Create a new event participation for the invited users by mapping

      const invitedParticipation = invited.map(
        async (email) => await invite(email, event._id) // a bunch of promises in an array
      );

      //make sure all promise is fullfilled
      await Promise.all(invitedParticipation);
    }

    res.status(201).json({ event: event });
  } catch (error) {
    console.log(`Failed to create event: ${error}`);
    res.status(500).json({ error: error });
  }
};

// get all events function Phuoc
// Lay array of events ( each event is a time period). then show that period on calendar
const getAllEvents = async (req, res) => {};

// mofiying event function chi Jenny
const modifyEvent = async (req, res) => {};

// finish event function chi Jenny
const finishEvent = async (req, res) => {};

module.exports = {
  createEvent,
  getAllEvents,
  modifyEvent,
  finishEvent,
};
