import React, { useState } from 'react';
import { getMonth } from "../../service/util";
import MiniMonth from "./MiniMonth";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const monthTest = getMonth();
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Study React', completed: false },
    { id: 2, text: 'Finish reading assignment', completed: false },
    { id: 3, text: 'Attend team meeting', completed: false },
    { id: 4, text: 'Prepare presentation', completed: false },
    { id: 5, text: 'Exercise for 30 minutes', completed: false },
  ]);

  const handleTaskToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <div>
        <MiniMonth month={monthTest} />
      </div>
      <div className={styles.tasks}>
        <h3 className={styles.button1}>Today's Tasks</h3>
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(task.id)}
                />
                <span style={{ marginLeft: '10px' }}>{task.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
