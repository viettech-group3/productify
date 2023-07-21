import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const CurrentDateSlice = createSlice({
  name: 'CurrentDate',
  initialState: {
    value: dayjs().format('DD MMMM YYYY'),
  },
  reducers: {
    increaseDate: state => {
      state.value = dayjs(state.value).add(1, 'day').format('DD MMMM YYYY');
    },
    decreaseDate: state => {
      state.value = dayjs(state.value).subtract(1, 'day').format('DD MMMM YYYY');
    },
    resetDate: state => {
      state.value = dayjs().format('DD MMMM YYYY');
    },
  },
});

// Action creators are generated


// Action creators are generated for each case reducer function
export const { increaseDate, decreaseDate, resetDate } = CurrentDateSlice.actions

export default CurrentDateSlice.reducer