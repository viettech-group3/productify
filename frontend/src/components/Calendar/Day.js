import React, { useEffect, useState } from 'react';
import styles from './Day.module.css';
import dayjs from 'dayjs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../slices/ShowModalSlice';
import { updateStatus } from '../../slices/MonthEventsSlice';
import { filterTodayEvents } from '../../service/util';
import EventUpdateForm from '../EventUpdateForm/EventUpdateForm';
import { toggleUpdateForm } from '../../slices/ShowEventUpdateFormSlice';
import { setSelectedEvent } from '../../slices/SelectedEventSlice';

function Day({ day, row, loadingState }) {
  const currentDate = new Date(day);
  const dispatch = useDispatch();
  const isToday = day.isSame(dayjs(), 'day');
  const circleColor = isToday ? '#aacaef' : '';
  const ShowEventUpdateForm = useSelector(
    state => state.ShowEventUpdateForm.value,
  );
  const [finish, setFinish] = useState(false);

  const selectedEvent = useSelector(state => state.SelectedEvent.value);
  const labelList = useSelector(state => state.Label.value);
  const MonthEvents = useSelector(state => state.MonthEvents.value);
  const todayEvents = filterTodayEvents(MonthEvents, currentDate);
  const todayEventsWithLabels = todayEvents.filter(obj =>
    labelList.some(
      label =>
        label.name === obj.label.name &&
        label.color === obj.label.color &&
        label.deleted === undefined,
    ),
  );
  const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
  const handleEventClick = (e, event) => {
    e.stopPropagation();
    if (selectedEvent !== event) {
      dispatch(setSelectedEvent(event));
      dispatch(toggleUpdateForm());
    } else {
      dispatch(setSelectedEvent(null));
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
        console.log('Finish event successfully');
        console.log(response.data);
      })
      .catch(error => {
        console.log('There are some bugs when we try to finish events');
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

      {loadingState && (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}

      <div>
        {todayEventsWithLabels.map((event, idx) => (
          <div key={idx} className="position-relative">
            <div
              className={`${styles.todayEvents} ${event.status === 'completed' ? styles.completedEvents : ''
                }`}
              style={{
                backgroundColor: event.label.color,
              }}
              onClick={e => {
                handleEventClick(e, event);
              }}
            >
              {event.name}
              {event.status === 'completed' && (
                <span class={styles.finishBadge}>
                </span>
              )}
            </div>

            {ShowEventUpdateForm && selectedEvent === event && (
              <EventUpdateForm eventInformation={event} />
            )}
          </div>
        ))}
      </div>
    </td >
  );
}

export default Day;
