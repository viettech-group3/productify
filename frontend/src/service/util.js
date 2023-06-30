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
