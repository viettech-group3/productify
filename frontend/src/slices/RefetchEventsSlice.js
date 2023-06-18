import { createSlice } from '@reduxjs/toolkit'

export const RefetchEventsSlice = createSlice({
    name: 'RefetchEvents',
    initialState: {
        value: 0
    },
    reducers: {
        generalModified: state => {
            state.value = state.value + 1
        },
    }
})

// Action creators are generated for each case reducer function
export const { generalModified } = RefetchEventsSlice.actions

export default RefetchEventsSlice.reducer