import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChessQueen,
  faEnvelopeOpen,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import styles from './TeamDiv.module.css';
import teamImage from '../../assets/images/teamImage4.png';

const TeamDiv = () => {
  return (
    <div className={`${styles.total} container-fluid`}>
      <div className="row pt-5">
        <div className="col-6 pt-4">
          <h1 className={`${styles.title} pb-2`}>TEAM</h1> {/* Title */}
          <p style={{ paddingBottom: '3rem' }}>
            {' '}
            {/* paragraph */}
            "Productify" is an innovative task management application crafted by
            a dedicated team of four mentees from Viet Tech Mentorship. Our team
            comprises four passionate computer science students hailing from
            various regions of Vietnam, pursuing their studies in the United
            States
          </p>
          <div
            className={` ${styles.icon_sentence} d-flex align-items-center mt-4`}
          >
            {' '}
            {/* Icons + Sentence */}
            <FontAwesomeIcon
              className="pe-3"
              icon={faAddressBook}
              style={{ color: '#aacaef', fontSize: '2rem', paddingTop: '0.5' }}
            />
            <span>Revolutionizing management as tech enthusiasts.</span>
          </div>
          <div
            className={` ${styles.icon_sentence} d-flex align-items-center mt-4 `}
          >
            {' '}
            {/* Icons + Sentence */}
            <FontAwesomeIcon
              className="pe-3"
              icon={faChessQueen}
              style={{ color: '#aacaef', fontSize: '2rem', paddingTop: '0.5' }}
            />
            <span>Simplifying productivity with passion and expertise.</span>
          </div>
          <div
            className={` ${styles.icon_sentence} d-flex align-items-center mt-4 `}
          >
            {' '}
            {/* Icons + Sentence */}
            <FontAwesomeIcon
              className="pe-3"
              icon={faEnvelopeOpen}
              style={{ color: '#aacaef', fontSize: '2rem', paddingTop: '0.5' }}
            />
            <span>
              Innovating intuitive solutions for streamlined workflow
              efficiency.
            </span>
          </div>
        </div>
        <div className="col-6 pt-4">
          {' '}
          {/* Image of calendar */}
          <img
            className={styles.image}
            style={{
              objectFit: 'cover',
              width: '120%',
              height: '100%',
              objectPosition: 'left',
            }}
            src={teamImage}
          ></img>
        </div>
        {/* End of Image of calendar */}
      </div>
    </div>
  );
};

export default TeamDiv;
