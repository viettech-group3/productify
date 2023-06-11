import React from 'react'
import styles from './DayView.module.css'
const DayView = () => {

    const boxes = []
    for (let i = 0; i < 23; i++) {
        boxes.push(
            <div className={styles.boxInDayView}>

            </div>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.dayViewHeader}>Current Date/Month/Year</div>
            <div className={styles.dayView_onTopRow}>
                <div>UTC-7</div>
                <div className={styles.dayView_onTopRow_Border}></div>
            </div>

            <div className={styles.dayView_grid}>
                <div className={styles.dayView_gridWrapper}>{/*THis is flexbox*/}
                    <div className={styles.dayView_gridSideTime}>
                        <span></span>
                        <span>1 AM</span>
                        <span>2 AM</span>
                        <span>3 AM</span>
                        <span>4 AM</span>
                        <span>5 AM</span>
                        <span>6 AM</span>
                        <span>7 AM</span>
                        <span>8 AM</span>
                        <span>9 AM</span>
                        <span>10 AM</span>
                        <span>11 AM</span>
                        <span>12 PM</span>
                        <span>1 PM</span>
                        <span>2 PM</span>
                        <span>3 PM</span>
                        <span>4 PM</span>
                        <span>5 PM</span>
                        <span>6 PM</span>
                        <span>7 PM</span>
                        <span>8 PM</span>
                        <span>9 PM</span>
                        <span>10 PM</span>
                        <span>11 PM</span>
                        <span>12 AM</span>
                    </div>
                    <div className={styles.dayView_gridMain}>
                        {boxes}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayView