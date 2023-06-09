import React from 'react';
import styles from './Points.module.css';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggleTodayTasks } from '../../slices/ShowTodayTasksSlice';
import TodayModal from '../../components/Calendar/TodayTaskModal/TodayModal';

const Points = () => {
  const ShowTodayTasks = useSelector(state => state.ShowTodayTasks.value);  //Manage global state of <TodayModal/>
  const dispatch = useDispatch();
  const scores = [
    { id: 1, title: 'Study React', points: 10 },
    { id: 2, title: 'Finish assignment', points: 20 },
    { id: 3, title: 'Attend team meeting', points: 15 },
    { id: 4, title: 'Prepare presentation', points: 30 },
    { id: 5, title: 'Exercise for 30 minutes', points: 25 },
  ];

  return (
    <div className={styles.tasks}>
      <div onClick={() => dispatch(toggleTodayTasks())}> {/*Turn on <TodayModal/> when we click Today's tasks */}
        <h3 className={styles.iconButton}>Today's tasks</h3>
      </div>
      {ShowTodayTasks ? <TodayModal /> : <></>} {/* On/Off Today Tasks */}
      {scores.map(score => (
        <div key={score.id} className={styles.taskList}>
          <input type="checkbox" id={`score-${score.id}`} />
          <label className={styles.label} htmlFor={`score-${score.id}`}>
            {score.title} -{' '}
            <span className={styles.points}>{score.points} points</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Points;
