import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { Card, Button } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import AvatarCarousel from './AvatarCarousel';
import myImage from '../../assets/images/logoWhite.png';
import axios from 'axios';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';

const Profile = () => {
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2MxMDRmYzlkMzVkYTI2ZmMyODc0MSIsImlhdCI6MTY4Nzk5MzI2NiwiZXhwIjoxNjkwNTg1MjY2fQ.lLlluqxq3At3vH1KfIm6ZOwDMnXFt2Tk8hBwkcgujBY';
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [points, setPoints] = useState(0);
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
        setName(response.data.username);
        setEmail(response.data.email);
        setPoints(response.data.points);
        if (
          response.data.profilepicture ===
          'https://api.dicebear.com/6.x/initials/svg?seed=default'
        ) {
          setAvatar(
            'https://api.dicebear.com/6.x/initials/svg?seed=' +
              response.data.username,
          );
        } else {
          setAvatar(response.data.profilepicture);
        }
      } catch (error) {
        console.log('There is something wrong with fetching avatar');
      }
    };
    fetchUser();
  });

  const handleTradePoints = pointsToTrade => {
    // TODO Logic for trading points and updating totalPoints state
  };

  const handleTradeRandomAvatar = () => {
    // TODO Logic for trading 100 points for a random avatar
    if (points < 100) {
      alert('Not enough point');
      return;
    }
    const arrAvatar = [...Array(10)].map((_, index) => {
      const seed = `Avatar${index + 1}`;
      const currentAvatar = createAvatar(bigSmile, {
        seed,
      });
      const currentAvatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        currentAvatar.toString(),
      )}`;
      return currentAvatarDataUrl;
    });

    const randomAvatar = Math.floor(Math.random() * 10);
    console.log(randomAvatar);
    setAvatar(randomAvatar);
    setPoints(points - 100);
  };

  const handleTradeCustomAvatar = () => {
    // TODO Logic for trading 500 points to change to a custom avatar
    handleTradePoints(500);
  };

  return (
    <div className={styles.viewport}>
      <div className={styles.sidebar}>
        <img
          src={`${avatar}`}
          alt="Calendar Demo Image"
          className={`${styles.image}`}
        />
        <p className={`${styles.paragraph} text-center`}> {name} </p>
        <p className={`${styles.paragraph} text-center`}> {email} </p>
        <p className={`${styles.paragraph} text-center`}> {points} pts </p>
      </div>

      <div className={styles.avatarSection}>
        <Card className={styles.cardContainer}>
          <Card.Body className={styles.cardBody}>
            <div className={styles.pointTitle}>Customize your avatar!</div>
            <AvatarCarousel />
            <div className={styles.buttonContainer}>
              <Button
                className={styles.tradeButton}
                onClick={handleTradeRandomAvatar}
              >
                Use Random Avatar for 100 points
              </Button>
              <Button
                className={styles.tradeButton}
                onClick={handleTradeCustomAvatar}
              >
                Use Custom Avatar for 500 points
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
