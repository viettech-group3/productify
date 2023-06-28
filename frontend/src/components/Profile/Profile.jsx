import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { Card, Button } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import AvatarCarousel from './AvatarCarousel';
import myImage from '../../assets/images/logoWhite.png';
import axios from 'axios';

const Profile = () => {
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NzkzNjg5OCwiZXhwIjoxNjkwNTI4ODk4fQ.q4zxr2yP4GrH-51AgX6aYUYWLjN78yw_JGTfA_StvXc';
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/getUser',
          {
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
          },
        );
        console.log('User information:', response.data);
        setAvatar(response.data.profilepicture);
      } catch (error) {
        console.log('There is something wrong with fetching avatar');
      }
    };
    fetchUser();
  });

  const [totalPoints, setTotalPoints] = useState(1000); // for demo

  const handleTradePoints = pointsToTrade => {
    // TODO Logic for trading points and updating totalPoints state
  };

  const handleTradeRandomAvatar = () => {
    // TODO Logic for trading 100 points for a random avatar
    handleTradePoints(100);
  };

  const handleTradeCustomAvatar = () => {
    // TODO Logic for trading 500 points to change to a custom avatar
    handleTradePoints(500);
  };

  return (
    <div className={styles.viewport}>
      <div className={styles.sidebar}>
        {/* Hoa */}
        <img
          src={`${avatar}`}
          alt="Calendar Demo Image"
          className={`${styles.image}`}
        />
        <p className={`${styles.paragraph} text-center`}> User Name</p>
        <p className={`${styles.paragraph} text-center`}> User Email </p>
        <p className={`${styles.paragraph} text-center`}> Points: 100pts </p>
      </div>

      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>Total Points: {totalPoints}</Card.Title>
          <AvatarCarousel />
          <div className={styles.buttonContainer}>
            <Button
              className={styles.tradeButton}
              onClick={handleTradeRandomAvatar}
            >
              Use Random Avatar for 100 points
            </Button>
            <Button
              // variant="primary"
              className={styles.tradeButton}
              onClick={handleTradeCustomAvatar}
            >
              Use Custom Avatar for 500 points
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
