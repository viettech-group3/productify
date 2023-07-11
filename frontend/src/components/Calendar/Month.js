import React, { useEffect, useState } from 'react';
import Day from './Day';
import styles from './Month.module.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { set, add, remove, update } from '../../slices/MonthEventsSlice';

export default function Month({ month }) {
  const exampleTokenForPhuoc =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4ODc3NDUzNSwiZXhwIjoxNjkxMzY2NTM1fQ.HB-064k-AHO7jvM4rexrZ3DfMNQX5_zM0v6tRaVM7Z8';
  const dispatch = useDispatch(); //dispatch is to use function to interact with State of Redux
  const [loadingState, setLoadingState] = useState(true)
  const startDate = month[0][0];
  const endDate = month[4][6];
  console.log(123);
  useEffect(() => {
    let cancelRequest = null; //This is set up to cacel request if we try to send to many requests at the same time (such as moving forward/backward month too fast and send GET requests continuously)

    const fetchData = async () => {
      try {
        const source = axios.CancelToken.source(); //Token to check status of request
        cancelRequest = source.cancel;
        const response = await axios.get(
          'http://localhost:5000/api/events/getMonth',
          {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
            headers: {
              Authorization: `Bearer ${exampleTokenForPhuoc}`,
            },
            cancelToken: source.token,
          },
        );

        dispatch(set(response.data)); //Update MonthEvents Global state in Redux Store
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log('Error:', error.message);
        }
      } finally {
        setLoadingState(false)
      }
    };

    fetchData();

    return () => {
      //This is cleanup function of useEffect() to cancel old request before making the new request
      if (cancelRequest) {
        setLoadingState(true)
        cancelRequest('Request canceled');
      }
    };
  }, [month]);

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
                  <Day day={day} key={j} row={i} loadingState={loadingState} /> /*Headers */
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
