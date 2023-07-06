import React, { useEffect, useState } from 'react';
import styles from './TodayModal.module.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggleTodayTasks } from '../../../slices/ShowTodayTasksSlice';

const TodayModal = () => {
  //This file is used to fetch today task and show it on the screen
  const dispatch = useDispatch();
  const exampleTokenForPhuoc = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NjE1NzQxOSwiZXhwIjoxNjg4NzQ5NDE5fQ.u2Xv7d9vm62wFiNQEJgq4Mak6LBBjpe9I69Dl4BH8eA';
  //Example token to pass protect in backend route (We'll delete it later)
  const [eventsData, setEventsData] = useState([]); //EventData is a state

  useEffect(() => {
    //Fetch Events of currentUser by getAllEvents() when we open <TodayModal/>
    axios
      .get('http://localhost:5000/api/events/get', {
        headers: {
          Authorization: `Bearer ${exampleTokenForPhuoc}`,
        },
      })
      .then(response => {
        // Handle the response
        const fetchedEventsData = response.data;

        setEventsData(fetchedEventsData);
      })
      .catch(error => {
        // Handle the error
        console.log(
          'There is an error when we try to fetch event for today tasks',
        );
        console.error(error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  const filterEventsByToday = eventsData => {
    //Filter event in today
    const currentDate = new Date();

    return eventsData.filter(event => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      // Check if the events is in today (ignoring the time)
      return (
        start.getTime() <= currentDate.getTime() &&
        currentDate.getTime() <= end.getTime()
      );
    });
  };

  const filteredEvents = filterEventsByToday(eventsData); //Get all events of today
  return (
    <div
      className={styles.overlay}
      onClick={() => dispatch(toggleTodayTasks())} //Click outside to turn off todaymodal
    >
      <div className={styles.taskBoard}>
        {filteredEvents.map(event => {
          return (
            <div>
              Event Name: {event.name} - Event Start: {event.start} - Event End:
              {event.end}
              <div></div> {/*just for new line*/}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TodayModal;
