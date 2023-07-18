import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import styles from './DayView.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodayEvents } from '../../../slices/TodayEventsSlice';
import dayjs from 'dayjs';

const DayView = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.TodayEvents.value);
  const CurrentDate = useSelector(state => state.CurrentDate.value)

  useEffect(() => {
    dispatch(fetchTodayEvents(CurrentDate));
  }, [dispatch, CurrentDate]);

  const calculateTime = (start, end) => {
    const startDateTime = DateTime.fromISO(start);
    const endDateTime = DateTime.fromISO(end);
    const startTime = startDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    const endTime = endDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    return `${startTime}-${endTime}`;
  };

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
    return height;
  };

  const calculateLeft = (event, sortedEvents) => {
    const index = sortedEvents.findIndex(e => e === event);

    if (index === 0) {
      return '0';
    }

    const previousEvent = sortedEvents[index - 1];
    const previousEventEnd = DateTime.fromISO(previousEvent.end);
    const currentEventStart = DateTime.fromISO(event.start);

    if (previousEventEnd > currentEventStart) {
      const previousEventLeft = calculateLeft(previousEvent, sortedEvents);
      const leftOffset = parseInt(previousEventLeft, 10) + 50;
      return leftOffset + 'px';
    }

    return '0';
  };

  const calculateZIndex = (event, sortedEvents) => {
    const index = sortedEvents.findIndex(e => e === event);
    const earlierStartEvents = sortedEvents
      .slice(0, index)
      .filter(
        prevEvent =>
          DateTime.fromISO(prevEvent.start) < DateTime.fromISO(event.start),
      );
    const shorterDurationEvents = sortedEvents
      .slice(0, index)
      .filter(
        prevEvent =>
          DateTime.fromISO(prevEvent.start) === DateTime.fromISO(event.start) &&
          DateTime.fromISO(prevEvent.end).diff(
            DateTime.fromISO(prevEvent.start),
            'hours',
          ).hours <
          DateTime.fromISO(event.end).diff(
            DateTime.fromISO(event.start),
            'hours',
          ).hours,
      );
    const zIndex = earlierStartEvents.length + shorterDurationEvents.length + 1; // Higher z-index for events with earlier start time and shorter duration
    return zIndex;
  };

  const sortEventsByStartAndDuration = events => {
    return events.slice().sort((a, b) => {
      const aStart = DateTime.fromISO(a.start);
      const bStart = DateTime.fromISO(b.start);
      const aEnd = DateTime.fromISO(a.end);
      const bEnd = DateTime.fromISO(b.end);
      const aDuration = aEnd.diff(aStart, 'hours').hours;
      const bDuration = bEnd.diff(bStart, 'hours').hours;

      if (aStart === bStart) {
        return aDuration - bDuration;
      } else {
        return aStart - bStart;
      }
    });
  };

  const sortedEvents = sortEventsByStartAndDuration(events);

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
      <div className={styles.dayViewHeader}>{CurrentDate}</div>
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

            {events.map((event, index) => {
              const zIndex = calculateZIndex(event, sortedEvents);
              return (
                <div
                  key={index}
                  className={styles.boxInDayView}
                  style={{
                    top: calculateTop(event.start),
                    height: calculateHeight(event.start, event.end),
                    left: calculateLeft(event, sortedEvents),
                    zIndex: zIndex,
                  }}
                >
                  <div className={styles.eventDetails} style={{
                    backgroundColor:
                      event.status !== 'completed' ? event.label.color : '',
                  }}>
                    <div className={styles.eventTitle}>{event.name}</div>
                    <div>{calculateTime(event.start, event.end)}</div>{' '}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
