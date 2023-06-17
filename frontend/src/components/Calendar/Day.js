import React, { useEffect } from "react";
import styles from "./Day.module.css";
import dayjs from "dayjs";
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../slices/ShowModalSlice' //Import toggle function to turn on/off Modal
import { fetchTodayEvents } from '../../slices/TodayEventsSlice'

function Day({ day, row }) {
  const ShowModal = useSelector(state => state.ShowModal.value); //ShowModal is a boolean state that know as True - showing and False - not showing
  const TodayEvents = useSelector(state => state.TodayEvents.value);
  console.log(TodayEvents)
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const isToday = day.isSame(dayjs(), 'day');  // Check if the day is today
  const circleColor = isToday ? "#aacaef" : ""; // If it is today, the circle will be blue

  const handleClick = () => {
    alert(day.format("DD-MM-YY"));
  };

  useEffect(() => {
    // Dispatch the fetchTodayEvents thunk
    dispatch(fetchTodayEvents(new Date(day)));
  }, [dispatch]);
  return (
    <td className={styles.box_day} onClick={() => dispatch(toggle())}>
      <div className="d-flex justify-content-center align-items-center">
        <p className={`${styles.day} ${isToday ? styles.today : ""}`} style={{ borderColor: circleColor }}>
          {day.format("DD")}
        </p>
      </div>
      <div>
        {TodayEvents.map((event) =>
          (<div>{event.name}</div>))}
      </div>
    </td>
  );
}

export default Day;