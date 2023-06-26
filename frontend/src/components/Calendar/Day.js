import React, { useEffect, useState } from 'react';
import styles from './Day.module.css';
import dayjs from 'dayjs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../../slices/ShowModalSlice'; //Import toggle function to turn on/off Modal
import { updateStatus } from '../../slices/MonthEventsSlice';
import { filterTodayEvents } from '../../service/util';
import { current } from '@reduxjs/toolkit';

function Day({ day, row }) {
  const currentDate = new Date(day);
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const isToday = day.isSame(dayjs(), 'day'); // Check if the day is today
  const circleColor = isToday ? '#aacaef' : ''; // If it is today, the circle will be blue
  const [finish, setFinish] = useState(false);
  const [eventFinish, setEventFinish] = useState(null);

  const MonthEvents = useSelector(state => state.MonthEvents.value);
  const todayEvents = filterTodayEvents(MonthEvents, currentDate); //filter all today events from MonthEvents state

  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NzcwOTkyMiwiZXhwIjoxNjkwMzAxOTIyfQ.98Pnx1UPJXvNtCMCIbaY-FnC35OkeXPDFwmfg4KQf1g';

  const handleEventClick = (e, event) => {
    e.stopPropagation(); //So we don't trigger any parent element of this <div> by onClick
    if (event.status !== 'completed') {
      setFinish(value => !value);
      setEventFinish(event);
    }
  };

  const handleFinishEventClick = (e, eventFinish) => {
    e.stopPropagation();
    setFinish(value => !value);
    dispatch(updateStatus({ _id: eventFinish._id, status: 'completed' }));
    axios
      .post(
        `http://localhost:5000/api/events/finish/${eventFinish._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        },
      )
      .then(response => {
        console.log('finish event successfully');
        console.log(response.data);
      })
      .catch(error => {
        console.log('there are some bugs when we try to finish events');
        console.log(error);
      });
  };

  return (
    <td key={day} className={styles.box_day} onClick={() => dispatch(toggle())}>
      <div className="d-flex justify-content-center align-items-center">
        <p
          className={`${styles.day} ${isToday ? styles.today : ''}`}
          style={{ borderColor: circleColor }}
        >
          {day.format('DD')}
        </p>
      </div>

      {/* this code ensure finishModal is not affect height of day cells because it's wrapped by this div height:0px */}
      {finish && (
        <div style={{ height: '0px', width: '0px' }}>
          <div className={styles.finishModal}>
            <button
              onClick={e =>
                handleFinishEventClick(e, eventFinish)
              } /* pass e into this to use e.stopPropagation() */
              className="btn btn-primary"
            >
              Wanna Finish "{eventFinish.name}" on {day.toString()} ?
            </button>
          </div>
        </div>
      )}

      <div>
        {todayEvents.map((event, idx) => (
          <div
            className={`${styles.todayEvents} ${
              event.status === 'completed' ? styles.completedEvents : ''
            }`}
            key={idx}
            onClick={e => {
              handleEventClick(e, event);
            }}
          >
            {event.name}
          </div>
        ))}
      </div>
    </td>
  );
}

export default Day;
