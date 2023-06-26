import axios from 'axios';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/users/leaderboard',
    );
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const createUser = async (email, username, password) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'http://localhost:5000/api/users',
      { username, email, password },
      config,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);

    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};
