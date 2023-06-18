import React, { useEffect, useState } from "react";
import styles from "./Day.module.css";
import dayjs from "dayjs";
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../slices/ShowModalSlice' //Import toggle function to turn on/off Modal
import { generalModified } from "../../slices/RefetchEventsSlice";
import axios from 'axios'

function Day({ day, row }) {
  console.log("day is:", day.toString())
  const currentDate = new Date(day)
  const ShowModal = useSelector(state => state.ShowModal.value); //ShowModal is a boolean state that know as True - showing and False - not showing
  const MonthIndex = useSelector(state => state.MonthIndex.value)
  //const TodayEvents = useSelector(state => state.TodayEvents.value);
  const RefetchEvents = useSelector(state => state.RefetchEvents.value);
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const isToday = day.isSame(dayjs(), 'day');  // Check if the day is today
  const circleColor = isToday ? "#aacaef" : ""; // If it is today, the circle will be blue
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NjE1NzQxOSwiZXhwIjoxNjg4NzQ5NDE5fQ.u2Xv7d9vm62wFiNQEJgq4Mak6LBBjpe9I69Dl4BH8eA';


  const MonthEvents = useSelector(state => state.MonthEvents.value)
  const todayEvents = MonthEvents.filter(event => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 1);
    const endOfCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
    console.log(start, end, startOfCurrentDate, endOfCurrentDate, "Date is: ", event.start.toString(), event.end.toString())
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
          (<div key={idx}>{event.name}</div>))}
      </div>
    </td>
  );
}

export default Day;
