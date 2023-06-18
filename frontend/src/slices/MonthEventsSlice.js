import { createSlice } from '@reduxjs/toolkit';
//This is how we can deal with fetching data in redux toolkit without using creationAsyncThunk! 
//We fetch data in somewhere else then set MonthEvents into that data

export const MonthEventsSlice = createSlice({
    name: 'MonthEvents',
    initialState: {
        value: []
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        },
        add: (state, action) => {
            state.value.push(action.payload);
        },
        remove: (state, action) => {
            state.value = state.value.filter(event => event.id !== action.payload.id);
        },
        update: (state, action) => {
            const index = state.value.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.value[index] = action.payload;
            }
        }
    }
});

export const { set, add, remove, update } = MonthEventsSlice.actions;

export default MonthEventsSlice.reducer;
