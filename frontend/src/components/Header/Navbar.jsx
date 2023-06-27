import React from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/images/logoBlue.png';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <a href="/Home">
        <img src={logo} alt="Logo" className={styles.logo} />{' '}
        {/* Add the logo */}
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
