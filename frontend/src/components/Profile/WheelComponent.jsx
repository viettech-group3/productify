import React from 'react';
import Wheel from 'react-wheel-of-prizes';

const WheelComponent = () => {
  const segments = [
    'truc',
    'khoa',
    'phuoc',
    'dang',
    'hoa',
    'huy anh',
    'nguyen',
    'kevin',
    'thu anh',
    'chan le',
  ];
  const segColors = [
    '#eac7c8', //pink
    '#CCB3AE', //pink
    '#ded9f4', //purple
    '#C7CEEA', //purple
    '#C7E2F0', //blue
    '#AAD5DC', //blue
    '#CDEBC5', //green
    '#a0c3d2', //green
    '#F4E8D7', //yellow
    '#eae0db', //yello
  ];
  const onFinished = winner => {
    console.log(winner);
  };
  return (
    <Wheel
      segments={segments}
      segColors={segColors}
      onFinished={onFinished}
      primaryColor="#a9caee"
      contrastColor="whitesmoke"
      buttonText="Spin"
      isOnlyOnce={false}
      size={250}
      upDuration={500}
      downDuration={600}
      fontFamily="Montserrat"
    />
  );
};

export default WheelComponent;
