const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { generateToken, sendPasswordResetEmail } = require('../utils/auth');
const { getAllAvatars } = require('../utils/getAllAvatars');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { google } = require('googleapis');

const oauth2Client = new OAuth2Client(
  '225763645761-hsk3k9suo4qdjenika5i9deutkg7h5u1.apps.googleusercontent.com',
  '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',
  'http://localhost:3000',
);

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
      bio: newUserSaved.bio,
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
    const correctPassword = await existingUser.matchPassword(password);
    if (existingUser && correctPassword) {
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        token: generateToken(existingUser._id),
        points: existingUser.points,
        totalpoints: existingUser.totalpoints,
        purchasedAvatars: existingUser.purchasedAvatars, //We will save it into localStorage and show on Navbar
        bio: existingUser.bio,
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
const loginorsignup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(req.body, '2e2edj');

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      // User exists, attempt to log in
      // Log in successful
      return res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        token: generateToken(existingUser._id),
        points: existingUser.points,
        totalpoints: existingUser.totalpoints,
        purchasedAvatars: existingUser.purchasedAvatars,
      });
    } else {
      // User does not exist, create a new account
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        username,
        password: passwordHashed,
      });

      const newUserSaved = await newUser.save();

      return res.status(201).json({
        _id: newUserSaved._id,
        username: newUserSaved.username,
        email: newUserSaved.email,
        token: generateToken(newUserSaved._id),
        purchasedAvatars: newUserSaved.purchasedAvatars,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUserToken = async (req, res) => {
  try {
    console.log(req.body);
    const { code } = req.body;
    const { tokens } = await oauth2Client.getToken(code);
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createEventWithGoogle = async (req, res) => {
  try {
    const event = req.body.EventForm;
    const token = req.body.token;
    oauth2Client.setCredentials({ refresh_token: token });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const eventT = {
      summary: event.summary,
      description: event.description,
      start: {
        dateTime: new Date(event.start.dateTime).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(event.end.dateTime).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    console.log(eventT);
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: eventT,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const updateUser = async (req, res) => {
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

const forgotPassword = async (req, res) => {
  let email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'Email not found' });
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiresAt = Date.now() + 3600000;
  await user.save();
  sendPasswordResetEmail(
    email,
    `This is the link to change your password: http://localhost:3000/forgotpassword?email=${email}&token=${token}`,
    'Password Reset',
  );

  res.status(200).json({ token });
};
const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    // Check if the email exists and the token is valid and not expired
    const user = await User.findOne({
      email,
      resetToken: token,
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ error: 'Server error' });
  }
};

//getLabellist and setLabellist
//Asignee: Phuoc
//req: request object containing event id.
//res: response object to return status 200.
const getLabelList = async (req, res) => {
  try {
    const userId = req.user._id;
    let currentUser = await User.findById(userId);
    let currentLabelList = currentUser.labellist;
    res.status(200).json(currentLabelList);
  } catch (error) {
    console.log('Failed to fetch labellist from current User', { error });
    res.status(500).json({ error: error });
  }
};

const addLabelList = async (req, res) => {
  /* Res.body is an label object - return a new labellist (array of label objects) */
  const newLabel =
    req.body; /* Axios.post with body is object with name and color, {name: "event", color: "#00054F"} */
  try {
    const userId = req.user._id;
    let currentUser = await User.findById(userId);
    let currentLabelList = currentUser.labellist;
    let newLabelList = [...currentLabelList, newLabel];
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        labellist: newLabelList,
      },
      { new: true },
    );
    res.status(200).json(updateUser.labellist);
  } catch (error) {
    console.log('Failed to update labellist from current User', { error });
    res.status(500).json({ error: error });
  }
};

const deleteLabelList = async (req, res) => {
  const deleteLabel = req.body;
  console.log('deleteLabel is', deleteLabel);
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId);
    const currentLabelList = currentUser.labellist;
    const newLabelList = currentLabelList.filter(labels => {
      return (
        labels.name !== deleteLabel.name || labels.color !== deleteLabel.color
      );
    });
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { labellist: newLabelList },
      { new: true },
    );
    res.status(200).json(updateUser.labellist);
  } catch (error) {
    console.log('failed to delete labels from labellist in current user', {
      error,
    });
    res.status(500).json({ error: error });
  }
};

const deductPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    let { pointsToDeduct } = req.body;
    let currentUser = await User.findById(userId);
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { points: currentUser.points - pointsToDeduct },
      { new: true }, //return to (updateUser variable) the new data
    );
    res.status(200).json({ updateUser });
  } catch (error) {
    console.log(`Failed to modify user points: ${error}`);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  signUp,
  login,
  leaderboard,
  getUser,
  updateUser,
  getAvatars,
  getLabelList,
  addLabelList,
  deleteLabelList,
  resetPassword,
  forgotPassword,
  loginorsignup,
  getUserToken,
  createEventWithGoogle,
  deductPoints,
};
