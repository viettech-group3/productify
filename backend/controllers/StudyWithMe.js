const { AccessToken } = require('livekit-server-sdk');
const Room = require('../models/Room');

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
    const rooms = await Room.find();
    const activeRooms = rooms.filter(room => room.attendees > 0);
    res.json({ activeRooms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'getRooms error' });
  }
};

const leaveRoom = async (req, res) => {
  let { roomName } = req.body;
  roomName = roomName.trim();
  await Room.findOneAndUpdate(
    { name: roomName },
    { attendees: attendees - 1 },
    { new: true },
  );
  res.json({ message: 'success' });
};

module.exports = { generateRoomToken, getRooms, leaveRoom };
