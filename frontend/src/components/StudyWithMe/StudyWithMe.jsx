import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudyWithMe.module.css';
import icon from '../../assets/images/addicon.png';
import { AiOutlineUser } from 'react-icons/ai';
import '@livekit/components-styles';

function StudyWithMe() {
  const studyBacground = [
    'https://i.pinimg.com/736x/e7/0b/ec/e70becaef0d8a63f66cfc2e65a2f947a--jiro-horikoshi-wind-rises.jpg',
    'https://www.otaquest.com/wp-content/uploads/2020/11/firefox_1lmwlEPH3R-1024x551.jpg',
    'https://e0.pxfuel.com/wallpapers/982/216/desktop-wallpaper-whisper-of-the-heart-whisper-of-the-heart-studying-anime-study.jpg',
    'https://clitbait.co.uk/wp-content/uploads/2021/09/lofi-1.png',
    'https://app.lean.social/backgrounds/lofi-girl-2.jpg',
    'https://app.lean.social/backgrounds/lofi-girl-3.jpg',
    'https://app.lean.social/backgrounds/lofi-girl.jpg',
  ];
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user.username;

  const [roomname, setRoomname] = useState('');
  const [activeRooms, setActiveRooms] = useState([]);
  const importAll = requireContext => requireContext.keys().map(requireContext);
  const roomImages = importAll(
    require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/),
  );

  useEffect(() => {
    const fetchActiveRooms = async () => {
      const response = await axios.get(
        'http://localhost:5000/api/studywithme/activeRoom',
      );
      setActiveRooms(response.data.activeRooms);
    };

    fetchActiveRooms();
  }, []);

  const handleCreateRoom = async (username, roomname) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    // Send username and roomname to the backend to generate a token
    const response = await axios.post(
      'http://localhost:5000/api/studywithme/generateToken',
      {
        userName: username,
        roomName: roomname,
        // coverImage: roomImages[Math.floor(Math.random() * roomImages.length)],
        // coverImage: roomImages[0],
      },
      config,
    );

    const { token } = response.data;

    // Redirect the user to the generated token route
    navigate(`/studywithme/${token}`);
  };

  const handleJoinRoom = async (username, roomname) => {
    // Send username and roomname to the backend to generate a token
    const response = await axios.post(
      'http://localhost:5000/api/studywithme/generateToken',
      {
        userName: username,
        roomName: roomname,
        // coverImage: roomImages[Math.floor(Math.random() * roomImages.length)],
        // coverImage: roomImages[0],
      },
    );

    const { token } = response.data;

    // Redirect the user to the generated token route
    navigate(`/studywithme/${token}`);
  };

  return (
    <div className={styles.studyWithMeContainer}>
      <div className={styles.createRoomContainer}>
        <div className={styles.title}>Create New Room</div>
        <div className={styles.inputContainer}>
          {/* <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Enter room name"
            value={roomname}
            onChange={e => setRoomname(e.target.value)}
          />

          <div
            className={`${styles.icon_sentence} d-flex align-items-center mt-4`}
            onClick={() => {
              handleCreateRoom(username, roomname);
            }}
          >
            {/* <img src={icon} alt="Add Icon" className={styles.icon} /> */}
            <span className={styles.sentence}>Create Room</span>
          </div>
        </div>
      </div>

      <div className={styles.activeRoomsContainer}>
        <div className={styles.title}>Join Active Rooms</div>

        {activeRooms.length &&
        activeRooms.every(room => room.numParticipants === 0) ? (
          <p>No active rooms</p>
        ) : (
          <div className={styles.container}>
            {activeRooms.map((room, index) => {
              if (room.numParticipants < 1) {
                return null;
              } else {
                return (
                  <div className={styles.roomCard} key={room.name}>
                    <div className={styles.roomDetails}>
                      <img src={studyBacground[index % 7]} alt="Room Cover" />
                      <span className={styles.roomName}>{room.name}</span>
                      <span className={styles.attendees}>
                        {room.numParticipants}
                        <AiOutlineUser />
                      </span>
                    </div>
                    <button
                      className={styles.joinButton}
                      onClick={() => handleCreateRoom(username, room.name)}
                    >
                      Join Room
                    </button>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyWithMe;
