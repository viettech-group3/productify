import React, { useState, useEffect } from 'react'
import styles from './ShowPoints.module.css'
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { setUser } from '../../../slices/UserStateSlice';

const ShowPoints = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setUser(JSON.parse(localStorage.getItem('user'))))

    }, [])
    const user = useSelector(state => state.UserState)
    console.log("user is:", user)

    return (
        <div className={styles.userPoints}>
            Points: {user.totalpoints}
        </div>
    )
}

export default ShowPoints;