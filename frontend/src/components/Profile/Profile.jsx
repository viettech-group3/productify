import React, { useState, useEffect, useCallback } from 'react';
import styles from './Profile.module.css';
import { Card, Button } from 'react-bootstrap';
import AvatarCarousel from './AvatarCarousel';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { thumbs } from '@dicebear/collection';
import axios, { all } from 'axios';
import Wheel from './WheelComponent';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPoints,
  setTotalPoints,
  setAvatar,
  setPurchasedAvatar,
  setLevel,
  setAllAvatars,
} from '../../slices/UserStateSlice';

const Profile = () => {
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  //redux toolkit
  const dispatch = useDispatch();
  const winner = useSelector(state => state.setWinner.value);
  const purchasedAvatar = useSelector(state => state.UserState.purchasedAvatar);
  const points = useSelector(state => state.UserState.points);
  const totalpoints = useSelector(state => state.UserState.totalpoints);
  const level = useSelector(state => state.UserState.level);
  const avatar = useSelector(state => state.UserState.avatar);
  const allAvatars = useSelector(state => state.UserState.allAvatars);

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
        //console.log('User information:', response.data);
        setName(response.data.username);
        setEmail(response.data.email);

        // use redux toolkit
        await dispatch(setPoints(response.data.points));
        await dispatch(setTotalPoints(response.data.totalpoints));
        await dispatch(setPurchasedAvatar(response.data.purchasedAvatars));
        console.log(purchasedAvatar);

        // if avatar is default, chaneg it so that it appear as initials of user
        // else set current avatar of user
        if (
          response.data.purchasedAvatars[0][0] ===
          'https://api.dicebear.com/6.x/initials/svg?seed=default'
        ) {
          await dispatch(
            setAvatar(
              'https://api.dicebear.com/6.x/initials/svg?seed=' +
                response.data.username,
            ),
          );
        } else {
          console.log(purchasedAvatar);
          await dispatch(setAvatar(response.data.purchasedAvatars[0][0]));
        }
      } catch (error) {
        console.log('There is something wrong with fetching user info');
      }
    };
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
        await dispatch(setAllAvatars(response.data));

        // const currentLevelObj = allAvatars[level - 1].avatars;
        // console.log('currentLevelObj: ', currentLevelObj);

        // console.log(allAvatars);
      } catch (error) {
        console.log('There is something wrong with fetching avatars');
      }
    };
    fetchAvatars();
    fetchUser();

    setIsLoading(false);
  }, []);

  const handleTradeCustomAvatar = async () => {
    // TODO Logic for trading 500 points to change to a custom avatar
    try {
      //check if user have enough points
      if (points < 100) {
        toast.error('You do not have enough points');
        return;
      }
      console.log('level', level);
      let type = 'none';
      if (level === 1) {
        type = thumbs;
      } else if (level === 2) {
        type = bigSmile;
      } else {
        toast.error("Can't use this function for this level");
        return;
      }

      let seed = prompt('Please enter the name you want to make avatar with: ');
      if (seed === null || seed === '') {
        toast.error('You have to fill in the box');
        return;
      }

      const currentAvatar = createAvatar(type, {
        seed: seed,
      });
      console.log(seed);
      const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        currentAvatar.toString(),
      )}`;

      let tempAvatar = await dispatch(setAvatar(avatarDataUrl));
      let temp = JSON.parse(JSON.stringify(purchasedAvatar));
      temp[0][0] = tempAvatar.payload;
      console.log(temp);

      //update user infor on database
      const response = await axios.put(
        `http://localhost:5000/api/users/update`,
        { purchasedAvatars: temp, points: points - 100 },
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      );

      dispatch(setAvatar(response.data.purchasedAvatars[0][0]));
      dispatch(setPoints(response.data.points));
    } catch (error) {
      console.log('There is something wrong with update avatar');
    }
  };

  const something = () => {};

  // const handleChange = async e => {
  //   try {
  //     let { levelStage, value } = e.target;
  //     dispatch(setLevel(Number(value)));
  //   } catch (error) {
  //     console.log('There is something wrong in level handling');
  //   }
  // };

  const handleChange = async e => {
    try {
      let value = e.target.value;
      dispatch(setLevel(value));
    } catch (error) {
      console.log('There is something wrong in level handling');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.viewport}>
      <Toaster />
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
              <AvatarCarousel />
            ) : // <AvatarCarousel level={level} allAvatars={allAvatars} />
            null}
            <div className={styles.buttonContainer}>
              <Button className={styles.tradeButton} onClick={something}>
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
          {purchasedAvatar[0].length > 0 ? (
            <img
              src={`${avatar}`}
              alt="User Profile"
              className={`${styles.image}`}
            />
          ) : (
            <p>No</p>
          )}
          <p className={`${styles.paragraph} text-center`}> {name} </p>
          <p className={`${styles.paragraph} text-center`}> {email} </p>
          <p className={`${styles.paragraph} text-center`}> {points} pts </p>
          <p className={`${styles.paragraph} text-center`}>
            {' '}
            Total {totalpoints} pts{' '}
          </p>
        </div>

        <div className={styles.wheel}>
          {allAvatars.length > 0 && purchasedAvatar[0].length > 0 ? (
            <Wheel />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
