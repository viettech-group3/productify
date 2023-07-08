// create a user moongose model with email,username and password
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: false,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "overdue"],
    default: "ongoing",
  },
  label: {
    name: {
      type: String,
      default: "event",
    },
    color: {
      type: String,
      default: '#0000FF',
    }
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
