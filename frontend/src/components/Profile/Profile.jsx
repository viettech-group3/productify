import React, { useState } from 'react';
import styles from './Profile.module.css';
import { Card, Button } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import AvatarCarousel from './AvatarCarousel';

const Profile = () => {
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
