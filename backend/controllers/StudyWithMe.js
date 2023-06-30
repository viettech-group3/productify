const { AccessToken } = require('livekit-server-sdk');
const Room = require('../models/Room');
const { parseJwt } = require('../utils/auth');

const generateRoomToken = async (req, res) => {
  let { roomName, userName } = req.body;
  roomName = roomName.trim();
  // find if room name exist in database
  // if not, create room
  // else, join room
  const existedRoom = await Room.find({ name: roomName });
  if (existedRoom.length == 0) {
    const newRoom = new Room({
      name: roomName,
      attendees: 1,
    });
    await newRoom.save();
  } else {
    existedRoom[0].attendees += 1;
    await Room.findByIdAndUpdate(existedRoom[0]._id, existedRoom[0]);
  }

  const token = new AccessToken(
    process.env.LIVEKIT_KEY_SID,
    process.env.LIVEKIT_KEY_SECRET,
    {
      identity: userName,
    },
  );
  token.addGrant({
    roomJoin: true,
    room: roomName,
  });
  res.json({ token: token.toJwt() });
};

const getRooms = async (req, res) => {
  try {
    console.log('Dei was here');
    const rooms = await Room.find();
    const activeRooms = rooms.filter(room => room.attendees > 0);
    console.log(activeRooms);
    res.json({ activeRooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'getRooms error' });
  }
};

const leaveRoom = async (req, res) => {
  let { token } = req.body; // Extract the token from the request body
  const decodedToken = await parseJwt(token); // Decode the token
  console.log(decodedToken, 'hi anh em'); // Print the decoded token and a message

  let roomName = decodedToken.video.room; // Extract the room name from the decoded token

  try {
    // Find the room by its name and update the attendees (decrease by one)
    const updatedRoom = await Room.findOneAndUpdate(
      { name: roomName }, // Query: Find the room with the specified name
      { $inc: { attendees: -1 } }, // Update: Decrease the attendees count by one
      { new: true }, // Return the updated room document
    );

    res.json({ message: 'success', room: updatedRoom }); // Send a JSON response with the success message and updated room
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(500).json({ error: 'An error occurred while leaving the room' });
  }
};

module.exports = { generateRoomToken, getRooms, leaveRoom };
