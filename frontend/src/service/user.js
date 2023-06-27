import axios from 'axios';

export const createUser = async (email, username, password) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'http://localhost:8080/api/users',
      { username, email, password },
      config,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  console.log(email, password, 'email, password');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'http://localhost:8080/api/users/login',
      { email, password },
      config,
    );
    console.log(data, 'da tra ve data');
    return data;
  } catch (error) {
    throw error;
  }
};
