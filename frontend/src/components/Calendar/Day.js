import React, { useEffect, useState } from "react";
import styles from "./Day.module.css";
import dayjs from "dayjs";
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../slices/ShowModalSlice' //Import toggle function to turn on/off Modal
import { filterTodayEvents } from "../../service/util";
import { current } from "@reduxjs/toolkit";


function Day({ day, row }) {
  const currentDate = new Date(day)
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const isToday = day.isSame(dayjs(), 'day');  // Check if the day is today
  const circleColor = isToday ? "#aacaef" : ""; // If it is today, the circle will be blue

  const MonthEvents = useSelector(state => state.MonthEvents.value)
  const todayEvents = filterTodayEvents(MonthEvents, currentDate); //filter all today events from MonthEvents state


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
