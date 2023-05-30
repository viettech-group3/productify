// create a user moongose model with email,username and password
const mongoose = require("mongoose");

const eventParticipationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "denied"],
    default: "pending",
  },
});

const EventParticipation = mongoose.model(
  "EventParticipation",
  eventParticipationSchema
);

module.exports = EventParticipation;
