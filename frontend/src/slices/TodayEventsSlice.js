import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const exampleTokenForPhuoc =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE0YTA3MDBkNWM1MDUzMjM3ZTZiMiIsImlhdCI6MTY4ODExNDI0MSwiZXhwIjoxNjkwNzA2MjQxfQ.5KPUaiZJAXMgoEtDXDPM8srQb6-y_GhE-5ZJGffgDy0';

export const fetchTodayEvents = createAsyncThunk(
  'TodayEvents/fetchTodayEvents',
  async day => {
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
        },
      );
      console.log('API Response:', response.data); // Console log the response data

      return response.data;
    } catch (error) {
      console.error(error);
      console.log('error fetching todays events');
      throw error;
    }
  },
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
