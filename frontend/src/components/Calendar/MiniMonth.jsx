import React from 'react';
import styles from './MiniMonth.module.css';
import MiniDay from './MiniDay';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { increase, decrease } from '../../slices/MonthIndexSlice';
import { LeftArrow, RightArrow } from '../../assets/smallComponents/icon';

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
        <LeftArrow />
      </button>

      <button
        onClick={() => {
          dispatch(decrease());
        }}
        className={styles.buttonArrow}
      >
        <RightArrow />
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
