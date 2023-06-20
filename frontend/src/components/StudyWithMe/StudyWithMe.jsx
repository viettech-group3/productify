import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudyWithMe() {
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    // Send username and roomname to the backend to generate a token
    const response = await axios.post(
      'http://localhost:5000/api/studywithme/generateToken',
      {
        userName: username,
        roomName: roomname,
      },
    );

    const { token } = response.data;
    console.log(token);

    // Redirect the user to the generated token route
    navigate(`/studywithme/${token}`);
  };

  return (
    <div>
      <h1>Study With Me</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter room name"
        value={roomname}
        onChange={e => setRoomname(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
}

export default StudyWithMe;
