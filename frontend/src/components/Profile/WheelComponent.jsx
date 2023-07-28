import React, { useState, useEffect, useRef } from 'react';
import ReactModal from 'react-modal';
import styles from './WheelComponent.module.css';
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
import spinsound from '../../assets/sounds/spinsound.mp3';

const WheelComponent = () => {
  const dispatch = useDispatch();
  const level = useSelector(state => state.UserState.level);
  const points = useSelector(state => state.UserState.points);
  let avatar = useSelector(state => state.UserState.avatar);
  const purchasedAvatar = useSelector(state => state.UserState.purchasedAvatar);
  const allAvatars = useSelector(state => state.UserState.allAvatars);
  // const [avatarUrl, setAvatarUrl] = useState(
  //   useSelector(state => state.UserState.avatar),
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);
  let tempPoints = points;
  let flag = false;
  let description = '';

  let segments = [];
  const currentLevelObj = allAvatars[level - 1].avatars;
  segments.push(
    currentLevelObj.map((avatarObj, avatarIndex) => {
      return avatarObj.name;
    }),
  );

  let segColors = [
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

  const audioRef = useRef(null);

  // Play the congratulations music when the wheel starts spinning and pause it when the wheel stops spinning
  useEffect(() => {
    const onWheelStart = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
      console.log('test audio start');
    };

    const onWheelStop = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      console.log('test audio stop');
    };

    const wheel = document.querySelector('.ReactWheelOfPrizes');
    if (wheel) {
      wheel.addEventListener('start', onWheelStart);
      wheel.addEventListener('stop', onWheelStop);
      console.log('test wheel');
    }

    return () => {
      if (wheel) {
        wheel.removeEventListener('start', onWheelStart);
        wheel.removeEventListener('stop', onWheelStop);
      }
      console.log('test wheel 2');
    };
  }, []);

  const playAudio = () => {
    console.log('test audio 0987');

    if (audioRef.current) {
      audioRef.current.play();
      console.log('test audio 12345');
    }
  };

  const onFinished = async winner => {
    const targetIndex = currentLevelObj.findIndex(obj => obj.name === winner);
    let tempAvatar = 'random';
    if (
      purchasedAvatar[level].includes(currentLevelObj[targetIndex].identifier)
    ) {
      toast.error('You already have this character');
      return;
    }
    if (level === 2) {
      const dicebearAvatar = createAvatar(bigSmile, {
        seed: currentLevelObj[targetIndex].identifier,
      });
      const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        dicebearAvatar.toString(),
      )}`;
      tempAvatar = avatarDataUrl;
      // await dispatch(setAvatar(avatarDataUrl));
      //points
      const response = await deductPoints();
      dispatch(setPoints(response.points));
    } else if (level === 1) {
      const dicebearAvatar = createAvatar(thumbs, {
        seed: currentLevelObj[targetIndex].identifier,
        scale: 80,
      });
      const avatarDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        dicebearAvatar.toString(),
      )}`;
      tempAvatar = avatarDataUrl;
      //tempAvatar = await dispatch(setAvatar(avatarDataUrl));
      //points
      const response = await deductPoints();
      dispatch(setPoints(response.points));
    } else if (level === 3) {
      // no testing yet
      const avatarDataUrl = currentLevelObj[targetIndex].identifier;
      tempAvatar = avatarDataUrl;
      //tempAvatar = await dispatch(setAvatar(avatarDataUrl));
      //points
      const response = await deductPoints();
      dispatch(setPoints(response.points));
    } else {
      await dispatch(setAvatar(winner));
    }

    // avatars
    let temp = JSON.parse(JSON.stringify(purchasedAvatar));
    temp[0][0] = tempAvatar;
    temp[level].push(currentLevelObj[targetIndex].identifier);
    await changeProfilePic(temp);
    dispatch(setPurchasedAvatar(temp));

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (points < 50) {
    flag = true;
  }
  const handleSpinClick = () => {
    if (points < 50) {
      return;
    }
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Handle the error if the browser blocks autoplay
        console.error('Autoplay blocked:', error);
      });
    }
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
    let user = JSON.parse(localStorage.getItem('user'));
    let token;
    if (user !== null) {
      token = user.token;
    }
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
  const wheelKey = segments.flat().join(',');
  return (
    <div key={wheelKey}>
      <div onClick={playAudio}>
        {/* <p className={`${styles.paragraph} text-center`}>{description}</p> */}
        <Wheel
          segments={segments.flat()}
          segColors={segColors}
          onFinished={onFinished}
          primaryColor="#a9caee"
          contrastColor="whitesmoke"
          buttonText="Spin"
          isOnlyOnce={flag}
          size={250}
          upDuration={500}
          downDuration={950}
          fontFamily="Montserrat"
        ></Wheel>
      </div>
      <audio ref={audioRef} src={spinsound} />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Winner Modal"
        className={`${styles.modal} text-center`}
      >
        {/* Add any additional content or styling for the modal */}
        <div className="modal-content">
          <p className={`${styles.paragraph} text-center`}>Congratulations!</p>
          <img
            src={`${avatar}`}
            alt="User Profile"
            className={`${styles.image}`}
          />
          <p className={`${styles.paragraph} text-center`}>
            You won a new avatar!
          </p>
          <button className={styles.closeButton} onClick={closeModal}>
            X
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default WheelComponent;
