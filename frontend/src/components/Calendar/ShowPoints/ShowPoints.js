import React, { useEffect } from 'react'
import styles from './ShowPoints.module.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../slices/UserStateSlice';

const ShowPoints = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.UserState);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const exampleTokenForPhuoc = JSON.parse(localStorage.getItem('user')).token;
                const response = await axios.get(
                    'http://localhost:5000/api/users/getUser',
                    {
                        headers: {
                            Authorization: `Bearer ${exampleTokenForPhuoc}`,
                        },
                    },
                );
                console.log("fetch User in ShowPoints", response.data)
                dispatch(setUser(response.data))

                // if avatar is default, change it so that it appears as initials of user
                // else set the current avatar of the user

            } catch (error) {
                console.log('There is something wrong with fetching avatar', error);
            }
        };
        fetchUser();
    }, []); // Add an empty dependency array to run the effect only once on mount

    console.log("user is:", user);

    return (
        <div className={styles.userPoints}>
            Current Points: {user.points}
        </div>
    )
}

export default ShowPoints;
