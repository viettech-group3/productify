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
import DefaultProfile from '../../assets/images/Defaultprofile.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const avatar = useSelector(state => state.UserState.avatar);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let user = JSON.parse(localStorage.getItem('user'));
        let exampleTokenForPhuoc = user.token;
        const response = await axios.get(
          'http://localhost:5000/api/users/getUser',
          {
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
          },
        );

        console.log('user in navbar', response.data);

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
        dispatch(setAvatar(DefaultProfile));
      }
    };
    fetchUser();
  }, [avatar]);
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
        {JSON.parse(localStorage.getItem('user')) !== null && (
          <>
            <li className={styles.navbarItem}>
              <button
                className={styles.signOutButton}
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('ggToken');
                  window.location.href = '/';
                }}
              >
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
