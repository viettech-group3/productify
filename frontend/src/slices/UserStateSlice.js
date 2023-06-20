import { createSlice } from '@reduxjs/toolkit';

export const UserState = createSlice({
  name: 'User',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = UserState.actions;
export default UserState.reducer;
