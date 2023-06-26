import axios from 'axios';

// fix when merge
export const getPendingInvitations = async token => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      'http://localhost:5000/api/events/getPending',
      config,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

// fix when merge
export const updateInvitationStatus = async (id, token, decision) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/events/updateStatus/:${id}`,
      decision,
      config,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};
