import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import styles from './AvatarCarousel.module.css';

const AvatarCarousel = () => {
  const backendAvatars = [
    {
      level: 1,
      avatars: [
        {
          type: 'dicebear',
          identifier: 'Avatar-1',
          unlocked: true,
        },
        {
          type: 'url',
          identifier:
            'https://www.operationkindness.org/wp-content/uploads/blog-kitten-nursery-operation-kindness.jpg',
          unlocked: false,
        },
      ],
    },
    {
      level: 2,
      avatars: [
        {
          type: 'dicebear',
          identifier: 'Avatar-2',
          unlocked: false,
        },
        {
          type: 'url',
          identifier:
            'https://www.daysoftheyear.com/wp-content/uploads/puppy-day-e1574071869348.jpg',
          unlocked: false,
        },
      ],
    },
  ];

  return (
    <div>
      {backendAvatars.map((levelObj, index) => {
        // levelObj has fields level and avatars
        return (
          <div>
            <p>Level: {levelObj.level}</p>
            <CarouselLevel key={index} levelObj={levelObj} />
          </div>
        );
      })}
    </div>
  );
};

const CarouselLevel = ({ levelObj }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
      {levelObj.avatars.map((avatarObj, aindex) => {
        return (
          <CarouselItem
            key={aindex}
            url={getAvatarUrl(avatarObj)}
            index={aindex}
            activeIndex={activeIndex}
            unlocked={avatarObj.unlocked}
          />
        );
      })}
    </Carousel>
  );
};

const CarouselItem = ({ url, index, activeIndex, unlocked }) => {
  console.log(url);
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
    </Carousel.Item>
  );
};

const getAvatarUrl = ({ type, identifier, unlocked }) => {
  if (type === 'url') {
    return identifier;
  } else if (type === 'dicebear') {
    const avatar = createAvatar(bigSmile, {
      identifier,
    });
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      avatar.toString(),
    )}`;
  } else if (type === 'abcdef') {
    // ...
  }
};

export default AvatarCarousel;
