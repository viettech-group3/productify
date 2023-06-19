import React, { useEffect, useState } from "react";
import styles from "./Day.module.css";
import dayjs from "dayjs";
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../slices/ShowModalSlice' //Import toggle function to turn on/off Modal


function Day({ day, row }) {
  const currentDate = new Date(day)
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const isToday = day.isSame(dayjs(), 'day');  // Check if the day is today
  const circleColor = isToday ? "#aacaef" : ""; // If it is today, the circle will be blue

  const MonthEvents = useSelector(state => state.MonthEvents.value)
  const todayEvents = MonthEvents.filter(event => {  //Algorithm to filter which events is on today
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 1);
    const endOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
    const minTime = Math.min(start.getTime(), end.getTime(), startOfCurrentDate.getTime(), endOfCurrentDate.getTime())
    const maxTime = Math.max(start.getTime(), end.getTime(), startOfCurrentDate.getTime(), endOfCurrentDate.getTime())
    return ((maxTime - minTime) < 24 * 60 * 60 * 1000 + (end.getTime() - start.getTime()));
  });


  return (
    <td key={day} className={styles.box_day} onClick={() => dispatch(toggle())}>
      <div className="d-flex justify-content-center align-items-center">
        <p className={`${styles.day} ${isToday ? styles.today : ""}`} style={{ borderColor: circleColor }}>
          {day.format("DD")}
        </p>
      </div>
      <div>
        {todayEvents.map((event, idx) =>
          (<div className={styles.todayEvents} key={idx}>{event.name}</div>))}
      </div>
    </td>
  );
}

export default Day;
