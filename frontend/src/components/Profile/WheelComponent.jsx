import React, { useState, useEffect } from 'react';
import Wheel from 'react-wheel-of-prizes';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { thumbs } from '@dicebear/collection';
import axios, { all } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setWinner } from '../../slices/WinnerSlice';
import toast, { Toaster } from 'react-hot-toast';
import {
  setAvatar,
  setPurchasedAvatar,
  setAllAvatars,
  setPoints,
} from '../../slices/UserStateSlice';
import { useSlider } from '@chakra-ui/react';

const WheelComponent = () => {
  const dispatch = useDispatch();
  const level = useSelector(state => state.UserState.level);
  const points = useSelector(state => state.UserState.points);
  let avatar = useSelector(state => state.UserState.avatar);
  const purchasedAvatar = useSelector(state => state.UserState.purchasedAvatar);
  const allAvatars = useSelector(state => state.UserState.allAvatars);
  const [avatarUrl, setAvatarUrl] = useState(
    useSelector(state => state.UserState.avatar),
  );

  const [segments, setSegments] = useState(['']);
  useEffect(() => {
    const currentLevelObj = allAvatars[level - 1].avatars;
    const levelSegment = currentLevelObj.map((avatarObj, avatarIndex) => {
      return avatarObj.name;
    });
    setSegments(levelSegment);
  }, [level, allAvatars]);
  console.log(segments);
  console.log('level in wheel ', level);

  if (points < 50) {
    return <p> You don't have enough points </p>;
  }

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

  const onFinished = async winner => {
    console.log(winner);
    let tempAvatar = 'random';
    if (purchasedAvatar[level].includes(winner)) {
      toast.error('You already have this character');
      return;
    }
    if (level === 2) {
      const dicebearAvatar = createAvatar(bigSmile, {
        seed: winner,
      });
      const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        dicebearAvatar.toString(),
      )}`;
      tempAvatar = await dispatch(setAvatar(avatarDataUrl));
      await dispatch(setPoints(points - 50));
    } else if (level === 1) {
      const dicebearAvatar = createAvatar(thumbs, {
        seed: winner,
        scale: 80,
      });
      const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        dicebearAvatar.toString(),
      )}`;
      tempAvatar = await dispatch(setAvatar(avatarDataUrl));
      await dispatch(setPoints(points - 50));
    } else if (level === 3) {
      // no testing yet
      // const targetIndex = currentLevelObj.findIndex(obj => obj.name === winner);
      // const url = currentLevelObj[targetIndex].identifier;
      // await dispatch(setAvatar(url));
      // await dispatch(setPoints(points-50));
    } else {
      console.log('error in getAvatarUrl', winner);
      await dispatch(setAvatar(winner));
    }
    let temp = JSON.parse(JSON.stringify(purchasedAvatar));
    temp[0][0] = tempAvatar.payload;
    temp[level].push(winner);
    const response = await changeProfilePic(temp, points - 50);
    // dispatch(setPurchasedAvatar(response.purchasedAvatars));
    // dispatch(setPoints(response.points));
  };

  const changeProfilePic = async (purchasedAvatar, points) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const response = await axios.put(
      `http://localhost:5000/api/users/update`,
      { purchasedAvatars: purchasedAvatar, points: points },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };
  console.log(segments);
  return (
    <div>
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
    </div>
  );
};

export default WheelComponent;
