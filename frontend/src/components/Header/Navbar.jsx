import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logoBlue.png';
import axios from 'axios';

const Navbar = () => {
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTRiMmY1NGE2NTE2OWY5N2I2ZDAzZSIsImlhdCI6MTY4ODUxNTMyOCwiZXhwIjoxNjkxMTA3MzI4fQ.uGY4JcNkOi3Yfygr5ggkgpqsjlLx3tD72fltsMThweU';
  const [avatar, setAvatar] = useState('');
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
          setAvatar(
            'https://api.dicebear.com/6.x/initials/svg?seed=' +
              response.data.username,
          );
        } else {
          setAvatar(response.data.purchasedAvatars[0][0]);
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
          <img
            src={`${avatar}`}
            alt="User Profile"
            className={`${styles.image}`}
            href="/profile"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
