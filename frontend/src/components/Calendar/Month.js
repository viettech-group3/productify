import React from "react";
import Day from "./Day";
import styles from "./Month.module.css";

export default function Month({ month }) {
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
