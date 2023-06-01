import React from 'react';
import styles from './Points.module.css';

const Points = () => {
  const scores = [
    { id: 1, title: 'Study React', points: 10 },
    { id: 2, title: 'Finish assignment', points: 20 },
    { id: 3, title: 'Attend team meeting', points: 15  },
    { id: 4, title: 'Prepare presentation', points: 30 },
    { id: 5, title: 'Exercise for 30 minutes', points: 25 },
  ];

  return (
    <div className={styles.tasks}>
      <h3 className={styles.button1}>Today's tasks</h3>
      {scores.map((score) => (
        <div key={score.id} className={styles.taskList}>
          <input type="checkbox" id={`score-${score.id}`} />
          <label className={styles.label} htmlFor={`score-${score.id}`}>
          {score.title} - <span className={styles.points}>{score.points} points</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Points;
