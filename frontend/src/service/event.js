import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export const createEvent = async (formData, token) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      'http://localhost:5000/api/events/create',
      formData,
      config,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const modifyEvent = async (updatedData, id, token) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/events/modify/:${id}`,
      updatedData,
      config,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

//need to fix this when merge with Phuoc branch
export const finishEvent = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:5000/api/events/finish/:${id}`,
      config,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const getAllEventsMonths = async (
  startDate,
  endDate,
  token,
  sourceToken,
) => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/events/getMonth',
      {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cancelToken: sourceToken,
      },
    );

    return response.data;
  } catch (error) {
    console.log('There is some bugs with getAllEventsMonth() in Service util');
    console.log('Error:', error);
    throw error;
  }
};
