import { React } from 'react';
import MissionCard from './MissionCard';
import styles from './MissionDiv.module.css';
import {
  faRocket,
  faLightbulb,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

const MissionDiv = () => {
  return (
    <div className={`${styles.total} text-center`}>
      <h1 className={`${styles.mission} text-center pt-5 pb-2`}>MISSION</h1>
      <p className={`${styles.paragraph} text-center`}>
        At Productify, our mission is to empower individuals and teams to
        enhance their productivity and achieve their goals efficiently. We
        believe that by providing a comprehensive and intuitive task management
        solution, we can help users stay organized, focused, and in control of
        their busy lives.
      </p>
      <div className="d-flex justify-content-evenly pb-5">
        {' '}
        {/* Div with 3 Cards */}
        <MissionCard
          icon={faRocket}
          title="Boost Productivity"
          description="Through our comprehensive task management solution and development, we provide users with the tools and features they need to streamline their workflows"
        />
        <MissionCard
          icon={faLightbulb}
          title="Simplify Task Management"
          description="With Productify, users can effortlessly create, organize, control the schedule, diligently track their tasks, ensuring nothing falls through the cracks."
        />
        <MissionCard
          icon={faCalendar}
          title="Enhance Collaboration"
          description="Our platform facilitates seamless collaboration by providing features such as shared task lists, real-time updates, and team communication channels"
        />
      </div>
    </div>
  );
};

export default MissionDiv;
