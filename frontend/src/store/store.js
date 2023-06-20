import { configureStore } from '@reduxjs/toolkit';
import ShowModalReducer from '../slices/ShowModalSlice';
import MonthIndexReducer from '../slices/MonthIndexSlice';
import ShowTodayTasksReducer from '../slices/ShowTodayTasksSlice';
import UserState from '../slices/UserStateSlice';

export default configureStore({
  reducer: {
    ShowModal: ShowModalReducer,
    MonthIndex: MonthIndexReducer,
    ShowTodayTasks: ShowTodayTasksReducer,
    SetUser: UserState,
  },
});
