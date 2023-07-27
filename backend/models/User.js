// create a user moongose model with email,username and password
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // this is the hashed password
  },
  points: {
    type: Number,
    default: 0,
  },
  totalpoints: {
    type: Number,
    default: 0,
  },
  purchasedAvatars: {
    type: [[String]],
    default: [
      ['https://api.dicebear.com/6.x/initials/svg?seed=default'],
      [],
      [],
      [],
    ],
  },
  labellist: {
    type: Array,
    default: [{ name: 'event', color: '#0000FF' }], // Default value as an array with a single label object
  },
  bio: {
    type: String,
    default: 'Write something here',
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  temp = await bcrypt.compare(enteredPassword, this.password);

  return temp;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
// Path: backend\models\index.js
