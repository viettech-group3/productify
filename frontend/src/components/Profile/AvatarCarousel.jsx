import React from 'react';
import { Carousel } from 'react-bootstrap';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import styles from './AvatarCarousel.module.css';

const AvatarCarousel = () => {
  return (
    <Carousel>
      {[...Array(10)].map((_, index) => {
        const seed = `Avatar${index + 1}`;
        const avatar = createAvatar(bigSmile, {
          seed,
        });
        const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          avatar.toString(),
        )}`;

        return (
          <Carousel.Item key={index}>
            <img
              src={avatarDataUrl}
              alt={`Avatar ${index + 1}`}
              className={styles.images}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default AvatarCarousel;
