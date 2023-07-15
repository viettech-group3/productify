import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { thumbs } from '@dicebear/collection';
import styles from './AvatarCarousel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPoints,
  setTotalPoints,
  setAvatar,
  setPurchasedAvatar,
  setLevel,
  setAllAvatars,
} from '../../slices/UserStateSlice';

const AvatarCarousel = () => {
  const level = useSelector(state => state.UserState.level);
  const allAvatars = useSelector(state => state.UserState.allAvatars);

  const currentLevelObj = allAvatars[level - 1].avatars;

  const [activeIndex, setActiveIndex] = useState(0);
  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div>
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
  );
};

const CarouselItem = ({ url, index, activeIndex, unlocked, name }) => {
  return (
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

export default AvatarCarousel;
