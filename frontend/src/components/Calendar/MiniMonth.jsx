import React from 'react';
import styles from './MiniMonth.module.css';
import MiniDay from './MiniDay';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { increase, decrease } from '../../slices/MonthIndexSlice';

const MiniMonth = ({ month }) => {
  const dispatch = useDispatch(); //To increase and decrease MonthIndex global state
  return (
    <div className={styles.container}>
      <button
        className={styles.buttonArrow}
        onClick={() => {
          dispatch(increase());
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={styles.icon + ' bi bi-chevron-left'}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </button>

      <button
        onClick={() => {
          dispatch(decrease());
        }}
        className={styles.buttonArrow}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={styles.icon + ' bi bi-chevron-right'}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      {month.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.week}>
          {week.map((day, dayIndex) => (
            <MiniDay key={dayIndex} day={day} row={weekIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MiniMonth;
