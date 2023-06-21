import { createSlice } from '@reduxjs/toolkit'

export const ShowTodayTasksSlice = createSlice({
  name: 'ShowTodayTasks',
  initialState: {
    value: false
  },
  reducers: {
    toggleTodayTasks: state => {
      state.value = !state.value
    },
  }
})

// Action creators are generated for each case reducer function
export const { toggleTodayTasks } = ShowTodayTasksSlice.actions

export default ShowTodayTasksSlice.reducer