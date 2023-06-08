import React from 'react';
import styles from './TodayModal.module.css';
import axios from 'axios';

const TodayModal = () => {
  axios
    .get('https://api.example.com/data')
    .then(response => {
      // Handle successful response
      const data = response.data;
      console.log(data);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });

  return (
    <div className={styles.overlay}>
      <div className={styles.taskBoard}>1. task1 2. task2</div>
    </div>
  );
};

export default TodayModal;
