import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import styles from './AvatarCarousel.module.css';

const AvatarCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
      {[...Array(16)].map((_, index) => {
        const seed = `Avatar${index + 1}`;
        const avatar = createAvatar(bigSmile, {
          seed,
        });
        const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          avatar.toString(),
        )}`;

        return (
          <Carousel.Item
            key={index}
            className={`${styles.carouselItem} ${
              index === activeIndex ? styles.active : ''
            }`}
          >
            <img
              src={avatarDataUrl}
              alt={`Avatar ${index + 1}`}
              className={styles.avatarImage}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default AvatarCarousel;
