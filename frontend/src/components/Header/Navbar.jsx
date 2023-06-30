import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logoBlue.png';
import axios from 'axios';

const Navbar = () => {
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NzkzNjg5OCwiZXhwIjoxNjkwNTI4ODk4fQ.q4zxr2yP4GrH-51AgX6aYUYWLjN78yw_JGTfA_StvXc';
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
        setAvatar(response.data.profilepicture);
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
      </ul>
    </nav>
  );
};

export default Navbar;
