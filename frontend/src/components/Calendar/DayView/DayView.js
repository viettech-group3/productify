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
                        <div>1 AM</div>
                        <div>2 AM</div>
                        <div>3 AM</div>
                        <div>4 AM</div>
                        <div>5 AM</div>
                        <div>6 AM</div>
                        <div>7 AM</div>
                        <div>8 AM</div>
                        <div>9 AM</div>
                        <div>10 AM</div>
                        <div>11 AM</div>
                        <div>12 PM</div>
                        <div>1 PM</div>
                        <div>2 PM</div>
                        <div>3 PM</div>
                        <div>4 PM</div>
                        <div>5 PM</div>
                        <div>6 PM</div>
                        <div>7 PM</div>
                        <div>8 PM</div>
                        <div>9 PM</div>
                        <div>10 PM</div>
                        <div>11 PM</div>
                        <div>12 AM</div>
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