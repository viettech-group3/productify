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
  let tempPoints = points;
  console.log('points outside: ', points);

  // const [segments, setSegments] = useState(['']);
  // useEffect(() => {
  //   const currentLevelObj = allAvatars[level - 1].avatars;
  //   const levelSegment = currentLevelObj.map((avatarObj, avatarIndex) => {
  //     return avatarObj.name;
  //   });
  //   setSegments(levelSegment);
  // }, [level, allAvatars]);
  // console.log(segments);
  // console.log('level in wheel ', level);
  let segments = [];
  const currentLevelObj = allAvatars[level - 1].avatars;
  //console.log(currentLevelObj);
  segments.push(
    currentLevelObj.map((avatarObj, avatarIndex) => {
      return avatarObj.name;
    }),
  );

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
    console.log('point before dispatch: ', tempPoints);
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
      //points
      const response = await deductPoints();
      dispatch(setPoints(response.points));
      console.log('points after dispatch', points);
    } else if (level === 1) {
      const dicebearAvatar = createAvatar(thumbs, {
        seed: winner,
        scale: 80,
      });
      const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        dicebearAvatar.toString(),
      )}`;
      tempAvatar = await dispatch(setAvatar(avatarDataUrl));
      //points
      const response = await deductPoints();
      dispatch(setPoints(response.points));
      console.log('points after dispatch', points);
    } else if (level === 3) {
      // no testing yet
      const targetIndex = currentLevelObj.findIndex(obj => obj.name === winner);
      console.log('targetIndex', targetIndex);
      const avatarDataUrl = currentLevelObj[targetIndex].identifier;
      console.log('url is ', avatarDataUrl);
      tempAvatar = await dispatch(setAvatar(avatarDataUrl));
      //points
      const response = await deductPoints();
      dispatch(setPoints(response.points));
      console.log('points after dispatch', points);
    } else {
      console.log('error in getAvatarUrl', winner);
      await dispatch(setAvatar(winner));
    }

    // avatars
    let temp = JSON.parse(JSON.stringify(purchasedAvatar));
    temp[0][0] = tempAvatar.payload;
    temp[level].push(winner);
    await changeProfilePic(temp);
    dispatch(setPurchasedAvatar(temp));
  };

  const changeProfilePic = async purchasedAvatar => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const response = await axios.put(
      `http://localhost:5000/api/users/update`,
      { purchasedAvatars: purchasedAvatar },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };
  const deductPoints = async () => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const response = await axios.put(
      `http://localhost:5000/api/users/deduct`,
      { pointsToDeduct: 50 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  };
  //console.log(segments);
  const wheelKey = segments.flat().join(',');
  return (
    <div key={wheelKey}>
      <Wheel
        segments={segments.flat()}
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
