import React from 'react'
import styles from "./SideBar.module.css"
import icon from "../../assets/images/addicon.png" 
import { getMonth } from "../../service/util"
import MiniMonth from "./MiniMonth"

const SideBar = () => {
    const monthTest = getMonth()
    return (
        <div>
            <button>
                <img src={icon} alt="Icon" className={styles.button} /> 
            </button>
            <div>
                <MiniMonth month={monthTest} />
            </div>
        </div>
    );
}

export default SideBar;