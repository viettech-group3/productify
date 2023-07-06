import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import styles from './DayView.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodayEvents } from '../../../slices/TodayEventsSlice';

const DayView = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.TodayEvents.value);

  useEffect(() => {
    dispatch(fetchTodayEvents(new Date()));
  }, [dispatch]);

  const calculateTop = start => {
    const startTime = DateTime.fromISO(start);
    const startHours = startTime.hour;
    const topPosition = startHours * 50 + 'px';
    return topPosition;
  };

  const calculateHeight = (start, end) => {
    const startTime = DateTime.fromISO(start);
    const endTime = DateTime.fromISO(end);
    const durationHours = endTime.diff(startTime, 'hours').hours;

    const height = durationHours * 50 + 'px';
    console.log('durationHours', durationHours);
    console.log('startTime', startTime);
    console.log('endTime', endTime);
    console.log('start', start);
    console.log('height', height);
    return height;
  };

  const boxes = [];
  const hourLines = [];

  for (let i = 0; i < 24; i++) {
    const hourLinePosition = i * 50 + 'px';
    boxes.push(
      <div className={styles.boxInDayView} key={i}>
        {i + 1} {i < 12 ? 'AM' : 'PM'}
      </div>,
    );

    hourLines.push(
      <div
        className={styles.hourLine}
        style={{ top: hourLinePosition }}
        key={i}
      ></div>,
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.dayViewHeader}>Wed 5</div>
      <div className={styles.dayView_onTopRow}>
        <div style={{ width: '50px', fontSize: '13px', textAlign: 'center' }}>
          UTC-7
        </div>
        <div className={styles.dayView_onTopRow_Border}></div>
      </div>

      <div className={styles.dayView_grid}>
        <div className={styles.dayView_gridWrapper}>
          <div className={styles.dayView_gridSideTime}>{boxes}</div>

          <div className={styles.dayView_gridMain}>
            {hourLines}
            {events.map((event, index) => (
              <div
                key={index}
                className={styles.boxInDayView}
                style={{
                  top: calculateTop(event.start),
                  height: calculateHeight(event.start, event.end),
                }}
              >
                <div className={styles.eventDetails}>
                  <div className={styles.eventTitle}>{event.name}</div>
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
