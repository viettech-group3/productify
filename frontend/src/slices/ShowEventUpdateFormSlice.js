import { createSlice } from '@reduxjs/toolkit'

export const ShowEventUpdateFormSlice = createSlice({
    name: 'ShowEventUpdateForm',
    initialState: {
        value: false
    },
    reducers: {
        toggleUpdateForm: state => {
            state.value = !state.value
        },
    }
})

// Action creators are generated for each case reducer function
export const { toggleUpdateForm } = ShowEventUpdateFormSlice.actions

export default ShowEventUpdateFormSlice.reducer