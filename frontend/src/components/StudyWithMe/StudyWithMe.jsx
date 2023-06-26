import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudyWithMe() {
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');
  const [activeRooms, setActiveRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveRooms = async () => {
      // Fetch active rooms from the backend
      const response = await axios.get(
        'http://localhost:8080/api/studywithme/activeRoom',
      );
      const { activeRooms } = response.data;
      setActiveRooms(activeRooms);
    };

    fetchActiveRooms();
  }, []);

  const handleCreateRoom = async () => {
    // Send username and roomname to the backend to generate a token
    const response = await axios.post(
      'http://localhost:8080/api/studywithme/generateToken',
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

  const handleJoinRoom = token => {
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

      <div>
        <h2>Active Rooms</h2>
        {activeRooms.length ? (
          <ul>
            {activeRooms.map(room => (
              <li key={room.name}>
                <span>{roomname}</span>
                <button onClick={() => handleJoinRoom(room.token)}>
                  Join Room
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No active rooms</p>
        )}
      </div>
    </div>
  );
}

export default StudyWithMe;
