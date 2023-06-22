import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const exampleTokenForPhuoc =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBiNTY1ZDhhMzVhNTViMDE2MTFmYiIsImlhdCI6MTY4NjE1NzQxOSwiZXhwIjoxNjg4NzQ5NDE5fQ.u2Xv7d9vm62wFiNQEJgq4Mak6LBBjpe9I69Dl4BH8eA';

export const fetchTodayEvents = createAsyncThunk(
  'TodayEvents/fetchTodayEvents',
  async (day) => {
    const currentDate = day;
    try {
      const response = await axios.get(
        'http://localhost:5000/api/events/getToday',
        {
          params: {
            currentDate: currentDate,
          },
          headers: {
            Authorization: `Bearer ${exampleTokenForPhuoc}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const initialState = {
  value: [],
  status: 'idle',
  error: null,
};

const TodayEventsSlice = createSlice({
  name: 'TodayEvents',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodayEvents.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTodayEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchTodayEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default TodayEventsSlice.reducer;
