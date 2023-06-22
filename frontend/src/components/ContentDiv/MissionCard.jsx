import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faLightbulb,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import styles from './MissionCard.module.css';

const MissionCard = props => {
  return (
    <div
      className={`${styles.check_edit} card my-4`}
      style={{ width: '18rem', backgroundColor: 'whitesmoke' }}
    >
      {/* background's card */}
      <div className="d-flex align-items-center justify-content-center mt-3">
        {/* background's icon' */}
        <div className={styles.circle}>
          <FontAwesomeIcon
            icon={props.icon}
            style={{ color: '#aacaef', fontSize: '2rem', paddingTop: '0.5' }}
          />
        </div>
      </div>
      {/* end of background's icon' */}
      <div className="card-body text-center">
        {' '}
        {/* background's description' */}
        <h3 className="card-title pt-3" style={{ fontWeight: 600 }}>
          {props.title}
        </h3>
        <p className="card-text py-3">{props.description}</p>
      </div>
      {/* end of background's description' */}
    </div>
  );
};

export default MissionCard;
