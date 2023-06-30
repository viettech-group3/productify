import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useRoomContext } from '@livekit/components-react';
import { setLogLevel, LogLevel } from 'livekit-client';

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year(); //current year
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day(); //to get the date (from 0-sunday to 6-sunday)
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function filterTodayEvents(MonthEvents, currentDate) {
  return MonthEvents.filter(event => {
    //Algorithm to filter which events is on today
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startOfCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
      1,
    );
    const endOfCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
      999,
    );
    const minTime = Math.min(
      start.getTime(),
      end.getTime(),
      startOfCurrentDate.getTime(),
      endOfCurrentDate.getTime(),
    );
    const maxTime = Math.max(
      start.getTime(),
      end.getTime(),
      startOfCurrentDate.getTime(),
      endOfCurrentDate.getTime(),
    );
    return (
      maxTime - minTime <
      24 * 60 * 60 * 1000 + (end.getTime() - start.getTime())
    ); //If day and event intersect in any range
  });
}

export const useDebugMode = ({ logLevel }) => {
  setLogLevel(logLevel || 'debug');
  const room = useRoomContext();

  useEffect(() => {
    window.__lk_room = room;

    return () => {
      window.__lk_room = undefined;
    };
  });
};

export const DebugMode = ({ logLevel }) => {
  useDebugMode({ logLevel });
  return <></>;
};
