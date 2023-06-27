// create a user moongose model with email,username and password
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  attendees: {
    type: Number,
    required: false,
  },
  // coverImage: {
  //   type: String,
  //   required: false,
  // },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
