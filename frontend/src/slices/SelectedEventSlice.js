import { createSlice } from '@reduxjs/toolkit'

export const SelectedEventSlice = createSlice({
    name: 'SelectedEvent',
    initialState: {
        value: null
    },
    reducers: {
        setSelectedEvent: (state, action) => {
            state.value = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { setSelectedEvent } = SelectedEventSlice.actions

export default SelectedEventSlice.reducer
