import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export const CurrentDateSlice = createSlice({
  name: 'CurrentDate',
  initialState: {
    value: new Date().getDate()
  },
  reducers: {
    increaseDate: state => {
      state.value = state.value + 1
    },
    decreaseDate: state => {
      state.value = state.value - 1
    },
    resetDate: state => {
      state.value = new Date().getDate();
    }

  }
})

// Action creators are generated for each case reducer function
export const { increaseDate, decreaseDate, resetDate } = CurrentDateSlice.actions

export default CurrentDateSlice.reducer