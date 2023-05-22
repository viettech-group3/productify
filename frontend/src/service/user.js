import axios from "axios";

export const createUser = async (username, email, password) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/users",
      { username, email, password },
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  console.log(email, password);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};
