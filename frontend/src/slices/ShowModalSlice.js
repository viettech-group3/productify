import { createSlice } from '@reduxjs/toolkit'

export const ShowModalSlice = createSlice({
  name: 'ShowModal',
  initialState: {
    value: false
  },
  reducers: {
    toggle: state => {
      state.value = !state.value
    },
  }
})

// Action creators are generated for each case reducer function
export const { toggle } = ShowModalSlice.actions

export default ShowModalSlice.reducer