import { createSlice } from '@reduxjs/toolkit';
export const Winner = createSlice({
  name: 'Winner',
  initialState: {
    value: 'none',
  },
  reducers: {
    setWinner(state, action) {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWinner } = Winner.actions;
export default Winner.reducer;
