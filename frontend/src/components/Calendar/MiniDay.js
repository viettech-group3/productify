import React from "react";
import styles from "./MiniDay.module.css";
import dayjs from "dayjs";

function MiniDay({ day, row }) {
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY"); // Check if the day is today
  const circleColor = isToday ? "#aacaef" : ""; // If it is today, the circle will be blue

  const handleClick = () => {
    alert(day.format("DD-MM-YY"));
  };

  return (
    <td className={styles.box_day} onClick={handleClick}>
      <div className="d-flex justify-content-center align-items-center">
        <p className={`${styles.day} ${isToday ? styles.today : ""}`} style={{ borderColor: circleColor }}>
          {day.format("DD")}
        </p>
      </div>
    </td>
  );
}

export default MiniDay;