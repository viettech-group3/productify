import React, { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { thumbs } from '@dicebear/collection';
import styles from './AvatarCarousel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {
  setPoints,
  setTotalPoints,
  setAvatar,
  setPurchasedAvatar,
  setLevel,
  setAllAvatars,
} from '../../slices/UserStateSlice';
import axios, { all } from 'axios';

const AvatarCarousel = () => {
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  const [isLoading, setIsLoading] = useState(false);
  const level = useSelector(state => state.UserState.level);
  const purchasedAvatar = useSelector(state => state.UserState.purchasedAvatar);

  const allAvatars = useSelector(state => state.UserState.allAvatars);
  const currentLevelObj = allAvatars[level - 1].avatars;
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };
  const points = useSelector(state => state.UserState.points);
  const dispatch = useDispatch();

  const handleChosenAvatar = async () => {
    console.log(currentLevelObj);
    const chosenAvatar = currentLevelObj[activeIndex];

    try {
      if (chosenAvatar.unlocked) {
        setIsLoading(true);
        let temp = JSON.parse(JSON.stringify(purchasedAvatar));
        temp[0][0] = getAvatarUrl(chosenAvatar);
        console.log(temp);
        const response = await axios.put(
          `http://localhost:5000/api/users/update`,
          { purchasedAvatars: temp },
          {
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
          },
        );
        dispatch(setAvatar(chosenAvatar));
        setIsLoading(false);
      } else {
        toast.error("You haven't purchase this avatar");
      }
    } catch (err) {
      console.log(err);
      console.log('There is something wrong with updating chosen avatar');
      setIsLoading(false);
    }
  };

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
      console.error(error);
      console.log('There is something wrong with update avatar');
    }
  };

  return (
    <div>
      <div className={styles.carouselContainer}>
        <Carousel
          activeIndex={activeIndex}
          onSelect={handleSelect}
          interval={null}
        >
          {currentLevelObj.map((avatarObj, avatarIndex) => {
            return (
              <CarouselItem
                key={avatarIndex}
                url={getAvatarUrl(avatarObj)}
                index={avatarIndex}
                activeIndex={activeIndex}
                unlocked={avatarObj.unlocked}
                name={avatarObj.name}
              />
            );
          })}
        </Carousel>
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.tradeButton} onClick={handleChosenAvatar}>
          Choose this avatar
        </Button>
        <Button
          className={styles.tradeButton}
          onClick={handleTradeCustomAvatar}
        >
          Generate new avatar
        </Button>
      </div>
    </div>
  );
};

const CarouselItem = ({ url, index, activeIndex, unlocked, name }) => {
  return (
    <div>
      <div>
        <Carousel.Item
          className={`${styles.carouselItem} ${
            index === activeIndex ? styles.active : ''
          }`}
        >
          <div className={styles.avatarWrapper}>
            {!unlocked && (
              <div className={styles.productifyLockIcon}>
                <i className="fa-solid fa-lock"></i>
              </div>
            )}
            <img
              src={url}
              alt={`Avatar ${index + 1}`}
              className={styles.avatarImage}
            />
          </div>
          <p className={`${styles.paragraph} text-center`}> {name} </p>
        </Carousel.Item>
      </div>
    </div>
  );
};

const getAvatarUrl = ({ type, identifier, name, unlocked }) => {
  if (type === 'bigSmile') {
    const dicebearAvatar = createAvatar(bigSmile, {
      seed: identifier,
    });

    const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      dicebearAvatar.toString(),
    )}`;
    return avatarDataUrl;
  } else if (type === 'thumbs') {
    const dicebearAvatar = createAvatar(thumbs, {
      seed: identifier,
      scale: 80,
    });
    const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      dicebearAvatar.toString(),
    )}`;
    return avatarDataUrl;
  } else if (type === 'url') {
    return identifier;
  } else {
    console.log('error in getAvatarUrl', identifier);
    return identifier;
  }
};

export { AvatarCarousel };
