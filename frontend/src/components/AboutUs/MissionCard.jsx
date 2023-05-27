import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLightbulb, faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from "./MissionCard.module.css"


const MissionCard = (props) => {
    return (
        <div className={`${styles.check_edit} card my-4`} style={{ width: "18rem", backgroundColor:"whitesmoke" }}>
            <div className="d-flex align-items-center justify-content-center mt-3">
                <div className={styles.circle}>
                    <FontAwesomeIcon icon={props.icon} style={{ color: "#125fe2", fontSize: "2rem", paddingTop: "0.5"}} />
                </div>
            </div>
            <div className="card-body text-center">
                <h3 className="card-title pt-3">{props.title}</h3>
                <p className="card-text py-3">{props.description}</p>
            </div>
        </div>
    );
};

export default MissionCard;
