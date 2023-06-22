import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export const MonthIndexSlice = createSlice({
  name: 'MonthIndex',
  initialState: {
    value: dayjs().month()
  },
  reducers: {
    increase: state => {
      state.value = state.value + 1
    },
    decrease: state => {
      state.value = state.value - 1
    },
    reset: state => {
      state.value = dayjs().month();
    }

  }
})

// Action creators are generated for each case reducer function
export const { increase, decrease, reset } = MonthIndexSlice.actions

export default MonthIndexSlice.reducer