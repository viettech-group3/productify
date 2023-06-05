import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/users/leaderboard',
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
  const topUsers = sortedUsers.slice(0, 6);

  // Slice the top 3 users into a separate array
  const top3Users = topUsers.slice(0, 3);

  // Slice the remaining users into a separate array
  const next3Users = topUsers.slice(3);

  return (
    <div>
      <h1>Leaderboard</h1>

      <div className="top-users">
        {top3Users.map(user => (
          <div key={user.id} className="user-card">
            <div className="badge-icon">
              {/* Add your badge icon component here */}
            </div>
            <div className="username">{user.username}</div>
          </div>
        ))}
      </div>

      <table className="next-users">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {next3Users.map((user, index) => (
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
