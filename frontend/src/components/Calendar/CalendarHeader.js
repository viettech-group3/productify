import React from 'react';
import styles from "./CalendarHeader.module.css";
import icon from "../../assets/images/addicon.png";

const CalendarHeader = () => {
    return (
        <header className={`d-flex align-items-center ${styles.header}`}>
            <div className={styles.buttonContainer}>
                <div className={`${styles.icon_sentence} d-flex align-items-center mt-4`}>
                    <img src={icon} alt="Add Icon" className={styles.icon} />
                    <span className={styles.sentence}>Create</span>
                </div>
                <button className={styles.button}>Today</button>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.icon + " bi bi-chevron-left"} viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.icon + " bi bi-chevron-right"} viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
            <h3 className={styles.today}>31 May 2023</h3>
        </header>
    )
}

export default CalendarHeader;
