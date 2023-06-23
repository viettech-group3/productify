const { AccessToken } = require('livekit-server-sdk');

const generateRoomToken = async (req, res) => {
  const { roomName, userName } = req.body;
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

module.exports = { generateRoomToken };
