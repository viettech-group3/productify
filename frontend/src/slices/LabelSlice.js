import { createSlice } from '@reduxjs/toolkit';

export const LabelSlice = createSlice({
  //Month Event is global state, it's an array of events to show on screen and change whenever screen change
  name: 'Label',
  initialState: {
    value: [],
  },
  reducers: {
    setLabelList: (state, action) => {
      state.value = action.payload;
    },
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      const { name, color } = action.payload;
      const index = state.value.findIndex(event => event.name === name && event.color === color);
      if (index !== -1) {
        state.value[index].deleted = 'yes'  //Add new property into label object
      }
    },
    unremove: (state, action) => {
      const { name, color } = action.payload;
      const index = state.value.findIndex(event => event.name === name && event.color === color);
      if (index !== -1) {
        delete state.value[index].deleted  //delete new property out oflabel object
      }
    },
    update: (state, action) => {
      const index = state.value.findIndex(
        event => event._id === action.payload.id,
      );
      if (index !== -1) {
        state.value[index].status = action.payload;
      }
    },

    deleteLabelOutOfList: (state, action) => {
      const newLabelList = state.value.filter(label => {
        return label.name !== action.payload.name || label.color !== action.payload.color
      })
      state.value = newLabelList
    }
  },
})

export const { setLabelList, add, remove, unremove, update, deleteLabelOutOfList } = LabelSlice.actions;

export default LabelSlice.reducer;