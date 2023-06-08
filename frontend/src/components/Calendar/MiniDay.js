import React from "react";
import styles from "./MiniDay.module.css";
import dayjs from "dayjs";

function MiniDay({ day, row }) {
  const isToday = day.isSame(dayjs(), 'day'); // Check if the day is today
  const circleColor = isToday ? "#aacaef" : ""; // If it is today, the circle will be blue


  return (
    <td className={styles.box_day}>
      <div className="d-flex justify-content-center align-items-center">
        <p className={`${styles.day} ${isToday ? styles.today : ""}`} style={{ borderColor: circleColor }}>
          {day.format("DD")}
        </p>
      </div>
    </td>
  );
}

export default MiniDay;