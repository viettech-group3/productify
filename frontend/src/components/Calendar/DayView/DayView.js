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

  console.log('events', events);

  // const calculateTop = start => {
  //   const startTime = new Date(start);
  //   const startHours = startTime.getHours();
  //   const startMinutes = startTime.getMinutes();
  //   const startSeconds = startTime.getSeconds();

  //   // Calculate the total minutes from the start time
  //   const totalMinutes = startHours * 60 + startMinutes + startSeconds / 60;

  //   // Calculate the top position based on the total minutes
  //   const topPosition = totalMinutes * 50 + 'px';
  //   console.log('topPosition:', topPosition);

  //   return topPosition; // Assuming each minute has a height of 50px
  // };

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
    // Convert start and end times to Date objects
    const startTime = new Date(start).toISOString();
    const endTime = new Date(end).toISOString();
    console.log('start:', start);
    console.log('end:', end);
    console.log('startTime:', startTime);
    console.log('endTime:', endTime);
    console.log('duration: ', (endTime - startTime) / (1000 * 60 * 60));

    // Check if the conversion was successful
    if (isNaN(startTime.getHours) || isNaN(endTime.getHours)) {
      console.log('conversion failed');
      return '0px'; // Return 0 height if the conversion fails
    }

    // Calculate the duration in hours
    const duration = (endTime - startTime) / (1000 * 60 * 60);
    console.log('duration:', duration);

    // Calculate the height based on the duration
    const height = duration * 50 + 'px'; // Assuming each hour has a height of 50px

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

                  <div>
                    duration: {(event.end - event.start) / (1000 * 60 * 60)}{' '}
                    hours
                  </div>
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
