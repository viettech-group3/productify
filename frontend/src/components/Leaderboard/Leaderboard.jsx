import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Leaderboard.module.css';
import { BsFillAwardFill } from 'react-icons/bs';
import ConfettiRain from './ConfettiRain';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/leaderboard',
        );
        const usersData = response.data;
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch leaderboard');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Sort users by points in descending order
  const sortedUsers = users.sort((a, b) => b.points - a.points);

  // Slice the top 6 users into a separate array
  const topUsers = sortedUsers.slice(0, 13);

  // Slice the top 3 users into a separate array
  const top3Users = topUsers.slice(0, 3);

  // Slice the remaining users into a separate array
  const next10Users = topUsers.slice(3, 10);

  return (
    <div className={styles.viewport}>
      <h1 className={styles.congrats}>Top 10 Productive Superstars</h1>

      <ConfettiRain />

      <div className={styles.topUsers}>
        <div className={styles.userCard}>
          {/* <div className={styles.points}>{top3Users[1].points} points</div> */}
          <BsFillAwardFill className={`${styles.rankIcon} ${styles.silver}`} />
          <div className={styles.badgeIcon}>
            <span className={styles.rankNumber}>2</span>
          </div>
          <div className={styles.username}>{top3Users[1].username}</div>
          <div className={styles.topPoints}>{top3Users[1].points}</div>
        </div>

        <div className={styles.userCard}>
          {/* <div className={styles.points}>{top3Users[0].points} points</div> */}
          <BsFillAwardFill className={`${styles.rankIcon} ${styles.gold}`} />
          <div className={styles.badgeIcon}>
            <span className={styles.rankNumber}>1</span>
          </div>
          <div className={styles.username}>{top3Users[0].username}</div>
          <div className={styles.topPoints}>{top3Users[0].points}</div>

        </div>

        <div className={styles.userCard}>
          {/* <div className={styles.points}>{top3Users[2].points} points</div> */}
          <BsFillAwardFill className={`${styles.rankIcon} ${styles.bronze}`} />
          <div className={styles.badgeIcon}>
            <span className={styles.rankNumber}>3</span>
          </div>
          <div className={styles.username}>{top3Users[2].username}</div>
          <div className={styles.topPoints}>{top3Users[2].points}</div>

        </div>
      </div>

      <table className={styles.nextUsers}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {next10Users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 4}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
