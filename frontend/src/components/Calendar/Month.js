import React, { useEffect, useState } from "react";
import Day from "./Day";
import styles from "./Month.module.css";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { set, add, remove, update } from '../../slices/MonthEventsSlice'


export default function Month({ month }) {
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NjE1NzQxOSwiZXhwIjoxNjg4NzQ5NDE5fQ.u2Xv7d9vm62wFiNQEJgq4Mak6LBBjpe9I69Dl4BH8eA';
  let MonthEvents = useSelector(state => state.MonthEvents.value)
  let MonthIndex = useSelector(state => state.MonthIndex.value)
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const startDate = month[0][0]
  const endDate = month[4][6]
  useEffect(() => {
    axios.get('http://localhost:5000/api/events/getMonth', {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
      headers: {
        Authorization: `Bearer ${exampleTokenForPhuoc}`,
      }
    }).then((response) => {
      dispatch(set(response.data));
      console.log("monthEvents:", MonthEvents)
    }).catch((error) => {
      console.log("There is some error when we try to fetch Month Events")
      console.log(error)
    })
  }, [MonthIndex])

  return (
    <div className={styles.container}>
      <div className="flex-1">
        <table className={`table ${styles.table}`}>

          <thead>
            <tr>
              <th className={styles.center}>Sun</th>
              <th className={styles.center}>Mon</th>
              <th className={styles.center}>Tue</th>
              <th className={styles.center}>Wed</th>
              <th className={styles.center}>Thu</th>
              <th className={styles.center}>Fri</th>
              <th className={styles.center}>Sat</th>
            </tr>
          </thead>
          <tbody>
            {month.map((week, i) => (
              <tr key={i}>
                {week.map((day, j) => (
                  <Day day={day} key={j} row={i} />  /*Headers */
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
