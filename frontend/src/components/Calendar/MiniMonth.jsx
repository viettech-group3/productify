import React from 'react';
import styles from "./MiniMonth.module.css";
import MiniDay from "./MiniDay";

const MiniMonth = ({ month }) => {
  return (
    <div className={styles.container}>
      {month.map((week, weekIndex) => (
        <div key={weekIndex} className={styles.week}>
          {week.map((day, dayIndex) => (
            <MiniDay key={dayIndex} day={day} row={weekIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MiniMonth;
