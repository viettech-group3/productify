const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const { getAllAvatars } = require('../utils/getAllAvatars');
const bcrypt = require('bcryptjs');

// Get leaderboard function
const leaderboard = async (req, res) => {
  try {
    // get all users
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching leaderboard', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

// Sign up function
const signUp = async (req, res) => {
  let { email, username, password } = req.body;
  // simple validation
  if (!email || !username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  // check for existing user
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    let passwordHashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: passwordHashed,
    });

    // save user
    const newUserSaved = await newUser.save();
    res.status(201).json({
      id: newUserSaved.id,
      username: newUserSaved.username,
      email: newUserSaved.email,
      token: generateToken(newUserSaved._id),
      purchasedAvatars: newUserSaved.purchasedAvatars,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  // check for existing user
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.matchPassword(password)) {
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        token: generateToken(existingUser._id),
        points: existingUser.points,
        totalpoints: existingUser.totalpoints,
        purchasedAvatars: existingUser.purchasedAvatars, //We will save it into localStorage and show on Navbar
      });
    } else {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  //Not user now, just draft it
  try {
    const userId = req.user._id; //Get userID
    let currentUser = await User.findById(userId);
    return res.status(200).json(currentUser);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  //We haven't used and tested it on Postman or frontend
  try {
    const userId = req.user._id;
    let updateInformation = req.body; //THis is an object with full property for user, if we want to update which property, we have to pass new property. If not, just keep it as past
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: updateInformation },
      { new: true }, //return to (updateUser variable) the new data
    );
    res.status(200).json({ updateUser });
  } catch (error) {
    console.log(`Failed to modify user information: ${error}`);
    res.status(500).json({ error: error });
  }
};

const getAvatars = async (req, res) => {
  try {
    const userId = req.user._id;
    let currentUser = await User.findById(userId);
    const allAvatars = await getAllAvatars(
      currentUser.totalpoints,
      currentUser.purchasedAvatars,
    );

    return res.status(200).json(allAvatars);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  signUp,
  login,
  leaderboard,
  getUser,
  updateUser,
  getAvatars,
};
