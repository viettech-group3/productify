import { createSlice } from '@reduxjs/toolkit';

export const UserState = createSlice({
  name: 'UserState',
  initialState: {
    points: 0,
    totalpoints: 0,
    avatar: '',
    purchasedAvatar: [[]],
    level: 1,
    allAvatars: [],
  },
  reducers: {
    setUser(state, action) {
      const { points, totalpoints, avatar, purchasedAvatar, level, allAvatars } = action.payload;
      state.points = points;
      state.totalpoints = totalpoints;
      state.avatar = avatar;
      state.purchasedAvatar = purchasedAvatar;
      state.level = level;
      state.allAvatars = allAvatars;
    },
    setPoints(state, action) {
      state.points = action.payload;
    },
    addPoints(state, action) {
      state.points += action.payload;
    },
    setTotalPoints(state, action) {
      state.totalpoints = action.payload;
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
      return state;

      // return { ...state, avatar: action.payload };
    },
    setPurchasedAvatar(state, action) {
      state.purchasedAvatar = action.payload;
    },
    setLevel(state, action) {
      state.level = action.payload;
    },
    setAllAvatars(state, action) {
      state.allAvatars = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setPoints,
  setTotalPoints,
  setAvatar,
  setPurchasedAvatar,
  setLevel,
  setAllAvatars,
} = UserState.actions;
export default UserState.reducer;
