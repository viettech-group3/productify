import { createSlice } from '@reduxjs/toolkit';
export const ViewMode = createSlice({
  name: 'ViewMode',
  initialState: {
    value: 'month',
  },
  reducers: {
    switchViewMode(state, action) {
      state.value = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchViewMode } = ViewMode.actions;
export default ViewMode.reducer;
