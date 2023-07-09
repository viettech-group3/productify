import React, { useState, useEffect, useCallback } from 'react';
import styles from './Profile.module.css';
import { Card, Button } from 'react-bootstrap';
import AvatarCarousel from './AvatarCarousel';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import axios, { all } from 'axios';
import Wheel from './WheelComponent';

const Profile = () => {
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE0YTA3MDBkNWM1MDUzMjM3ZTZiMiIsImlhdCI6MTY4ODExNDI0MSwiZXhwIjoxNjkwNzA2MjQxfQ.5KPUaiZJAXMgoEtDXDPM8srQb6-y_GhE-5ZJGffgDy0';
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [points, setPoints] = useState(0);
  const [purchasedAvatars, setPurchasedAvatars] = useState([[]]);
  const [totalpoints, setTotalPoints] = useState(0);
  const [allAvatars, setAllAvatars] = useState([]);
  const [level, setLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
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
      //console.log('User information:', response.data);
      setName(response.data.username);
      setEmail(response.data.email);
      setPoints(response.data.points);
      setPurchasedAvatars(response.data.purchasedAvatars);
      setTotalPoints(response.data.totalpoints);

      // if avatar is default, chaneg it so that it appear as initials of user
      // else set current avatar of user
      if (
        response.data.purchasedAvatars[0][0] ===
        'https://api.dicebear.com/6.x/initials/svg?seed=default'
      ) {
        setAvatar(
          'https://api.dicebear.com/6.x/initials/svg?seed=' +
            response.data.username,
        );
      } else {
        setAvatar(response.data.purchasedAvatars[0][0]);
      }
    } catch (error) {
      console.log('There is something wrong with fetching user info');
    }
  };

  /**
   * Handle All Avatars List
   */
  const fetchAvatars = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/users/getAvatars',
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      );
      await setAllAvatars(response.data);
      console.log(
        'All avatars: ',
        response.data,
        typeof response.data,
        typeof allAvatars,
        'this is the  very first origin',
      );
      await console.log('All avatars:', allAvatars, 'this is the origin');
      await console.log('type of 0', typeof allAvatars);

      await console.log('ditmecuocdoi', allAvatars[0].avatars);
      //console.log(allAvatars);
    } catch (error) {
      console.log('There is something wrong with fetching avatars');
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await sleep(1000);
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/getUser',
          {
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
          },
        );
        //console.log('User information:', response.data);
        setName(response.data.username);
        setEmail(response.data.email);
        setPoints(response.data.points);
        setPurchasedAvatars(response.data.purchasedAvatars);
        setTotalPoints(response.data.totalpoints);

        // if avatar is default, chaneg it so that it appear as initials of user
        // else set current avatar of user
        if (
          response.data.purchasedAvatars[0][0] ===
          'https://api.dicebear.com/6.x/initials/svg?seed=default'
        ) {
          setAvatar(
            'https://api.dicebear.com/6.x/initials/svg?seed=' +
              response.data.username,
          );
        } else {
          setAvatar(response.data.profilepicture[0][0]);
        }
      } catch (error) {
        console.log('There is something wrong with fetching user info');
      }
    };
    const fetchAvatars = async () => {
      await sleep(1000);
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/getAvatars',
          {
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
          },
        );
        await setAllAvatars(response.data);
        console.log(
          'All avatars: ',
          response.data,
          typeof response.data,
          typeof allAvatars,
          'this is the  very first origin',
        );

        //console.log(allAvatars);
      } catch (error) {
        console.log('There is something wrong with fetching avatars');
      }
    };
    fetchAvatars();
    fetchUser();

    setIsLoading(false);
  }, []);

  const handleTradeRandomAvatar = async () => {
    try {
      //check if user have enough points
      if (points < 50) {
        alert('Not enough point');
        return;
      }
      //create array of available avatar urls
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

      //get a random avatar url
      const randomIndex = Math.floor(Math.random() * 9);
      const randomAvatar = arrAvatar[randomIndex];

      //update user infor on database
      const response = await axios.put(
        `http://localhost:5000/api/users/update`,
        { profilepicture: randomAvatar, points: points - 50 },
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      );

      setAvatar(response.data.profilepicture);
      setPoints(points - 50);
    } catch (error) {
      console.log('There is something wrong with update avatar');
    }
  };

  const handleTradeCustomAvatar = async () => {
    // TODO Logic for trading 500 points to change to a custom avatar
    try {
      //check if user have enough points
      if (points < 500) {
        alert('Not enough point');
        return;
      }

      let seed = prompt('Please enter the name you want to make avatar with: ');
      if (seed === null || seed === '') {
        alert("You can't leave it blank");
        return;
      }

      const currentAvatar = createAvatar(bigSmile, {
        seed,
      });
      const currentAvatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        currentAvatar.toString(),
      )}`;

      //update user infor on database
      const response = await axios.put(
        `http://localhost:5000/api/users/update`,
        { profilepicture: currentAvatarDataUrl, points: points - 100 },
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      );

      setAvatar(response.data.profilepicture);
      setPoints(points - 100);
    } catch (error) {
      console.log('There is something wrong with update avatar');
    }
  };

  const handleChange = async e => {
    try {
      let { levelStage, value } = e.target;
      setLevel(value);
    } catch (error) {
      console.log('There is something wrong in level handling');
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.viewport}>
      <div className={styles.avatarSection}>
        <Card className={styles.cardContainer}>
          <Card.Body className={styles.cardBody}>
            <div className={styles.pointTitle}>Customize your avatar!</div>
            <div classname={styles.levelContainer}>
              <select classname={styles.levelOption} onChange={handleChange}>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
              </select>
            </div>
            {/* ? : means if else. for ex : 1+1 ==2 ? print('right') : print('wrong') => result will be 'right' */}
            {allAvatars.length > 0 ? (
              <AvatarCarousel level={level} allAvatars={allAvatars} />
            ) : null}
            <div className={styles.buttonContainer}>
              <Button
                className={styles.tradeButton}
                onClick={handleTradeRandomAvatar}
              >
                Use Random Avatar for 50 points
              </Button>
              <Button
                className={styles.tradeButton}
                onClick={handleTradeCustomAvatar}
              >
                Use Custom Avatar for 100 points
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className={styles.customization}>
        <div className={styles.sidebar}>
          <img
            src={`${avatar}`}
            alt="User Profile"
            className={`${styles.image}`}
          />
          <p className={`${styles.paragraph} text-center`}> {name} </p>
          <p className={`${styles.paragraph} text-center`}> {email} </p>
          <p className={`${styles.paragraph} text-center`}> {points} pts </p>
          <p className={`${styles.paragraph} text-center`}>
            {' '}
            Total {totalpoints} pts{' '}
          </p>
        </div>

        <div className={styles.wheel}>
          <Wheel />
        </div>
      </div>
    </div>
  );
};

export default Profile;
