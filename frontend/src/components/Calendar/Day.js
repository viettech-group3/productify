import React, { useEffect, useState } from "react";
import styles from "./Day.module.css";
import dayjs from "dayjs";
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../slices/ShowModalSlice' //Import toggle function to turn on/off Modal
import { generalModified } from "../../slices/RefetchEventsSlice";
import axios from 'axios'

function Day({ day, row }) {
  console.log("day is:", day.toString())
  const ShowModal = useSelector(state => state.ShowModal.value); //ShowModal is a boolean state that know as True - showing and False - not showing
  const MonthIndex = useSelector(state => state.MonthIndex.value)
  //const TodayEvents = useSelector(state => state.TodayEvents.value);
  const RefetchEvents = useSelector(state => state.RefetchEvents.value);
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const isToday = day.isSame(dayjs(), 'day');  // Check if the day is today
  const circleColor = isToday ? "#aacaef" : ""; // If it is today, the circle will be blue
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NjE1NzQxOSwiZXhwIjoxNjg4NzQ5NDE5fQ.u2Xv7d9vm62wFiNQEJgq4Mak6LBBjpe9I69Dl4BH8eA';

  const [todayEvents, setTodayEvents] = useState([])

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/events/getToday',
          {
            params: {
              currentDate: day,
            },
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
            cancelToken: source.token,
          }
        );

        console.log("reponse.data of", day.toString(), "is", response.data);
        setTodayEvents(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchEvents();

    return () => {
      source.cancel();
    };

  }, [RefetchEvents, MonthIndex, day]);

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
