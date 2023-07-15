import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logoBlue.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPoints,
  setTotalPoints,
  setAvatar,
  setPurchasedAvatar,
  setLevel,
} from '../../slices/UserStateSlice';

const Navbar = () => {
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  const dispatch = useDispatch();
  const avatar = useSelector(state => state.UserState.avatar);

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
        console.log('User information:', response.data);

        // if avatar is default, chaneg it so that it appear as initials of user
        // else set current avatar of user
        if (
          response.data.purchasedAvatars[0][0] ===
          'https://api.dicebear.com/6.x/initials/svg?seed=default'
        ) {
          dispatch(
            setAvatar(
              'https://api.dicebear.com/6.x/initials/svg?seed=' +
                response.data.username,
            ),
          );
        } else {
          dispatch(setAvatar(response.data.purchasedAvatars[0][0]));
        }
      } catch (error) {
        console.log('There is something wrong with fetching avatar');
      }
    };
    fetchUser();
  });
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <img src={logo} alt="Logo" className={styles.logo} />{' '}
      </a>
      <ul className={styles.navbarNav}>
        <li className={styles.navbarItem}>
          <a className={styles.navbarLink} href="/">
            Home
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a className={styles.navbarLink} href="/calendar">
            Calendar
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a className={styles.navbarLink} href="/leaderboard">
            Top Users
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a className={styles.navbarLink} href="/studywithme">
            Study Room
          </a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/profile">
            <img
              src={`${avatar}`}
              alt="User Profile"
              className={`${styles.image}`}
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
