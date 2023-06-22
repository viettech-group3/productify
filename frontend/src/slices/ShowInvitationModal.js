import { createSlice } from '@reduxjs/toolkit'

export const ShowInvitationModalSlice = createSlice({
  name: 'ShowInvitationModal',
  initialState: {
    value: false
  },
  reducers: {
    toggleInvitationModal: state => {
      state.value = !state.value
    },
  }
})

// Action creators are generated for each case reducer function
export const { toggleInvitationModal } = ShowInvitationModalSlice.actions

export default ShowInvitationModalSlice.reducer