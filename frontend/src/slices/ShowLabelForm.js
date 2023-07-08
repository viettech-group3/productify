import { createSlice } from '@reduxjs/toolkit'

export const ShowLabelFormSlice = createSlice({
  name: 'ShowLabelForm',
  initialState: {
    value: false
  },
  reducers: {
    toggleLabelForm: state => {
      state.value = !state.value
    },
  }
})

// Action creators are generated for each case reducer function
export const { toggleLabelForm } = ShowLabelFormSlice.actions

export default ShowLabelFormSlice.reducer