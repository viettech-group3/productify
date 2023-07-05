import React, { useEffect } from 'react';
import styles from './DayView.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodayEvents } from '../../../slices/TodayEventsSlice';

const DayView = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.TodayEvents.value);

  useEffect(() => {
    dispatch(fetchTodayEvents(new Date()));
  }, [dispatch]);

  const calculateTop = (start, index) => {
    const startTime = new Date(start);
    const startHours = startTime.getHours();
    console.log('startTime:', startTime);
    console.log('startHours:', startHours);

    const topPosition = startHours * 50 + 'px'; // Because each hour has a height of 50px = 1200 / 24
    console.log('topPosition:', topPosition);

    return topPosition;
  };

  const calculateHeight = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);

    // Calculate the duration in milliseconds
    const durationMs = endTime - startTime;

    // Calculate the duration in hours
    const durationHours = durationMs / (1000 * 60 * 60);

    // Calculate the start hour of the event
    const startHour = startTime.getHours();

    // Calculate the height based on the duration and start hour
    const height = durationHours * 50 + startHour * 50 + 'px';

    return height;
  };

  const boxes = [];
  for (let i = 0; i < 23; i++) {
    boxes.push(<div className={styles.boxInDayView}></div>);
  }

  return (
    <div className={styles.container}>
      <div className={styles.dayViewHeader}>Current Date/Month/Year</div>
      <div className={styles.dayView_onTopRow}>
        <div style={{ width: '50px', fontSize: '13px', textAlign: 'center' }}>
          UTC-7
        </div>
        <div className={styles.dayView_onTopRow_Border}></div>
      </div>

      <div className={styles.dayView_grid}>
        <div className={styles.dayView_gridWrapper}>
          <div className={styles.dayView_gridSideTime}>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>{index + 1} AM</div>
            ))}

            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>{index + 1} PM</div>
            ))}
          </div>

          <div className={styles.dayView_gridMain}>
            {boxes}
            {events.map((event, index) => (
              <div
                key={index}
                className={styles.boxInDayView}
                style={{
                  top: calculateTop(event.start, index),
                  height: calculateHeight(event.start, event.end),
                }}
              >
                <div className={styles.eventDetails}>
                  <div className={styles.eventTitle}>{event.name}</div>
                  <div>start: {event.start} hours</div>
                  <div>end: {event.end} hours</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
