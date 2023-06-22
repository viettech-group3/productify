import { configureStore } from '@reduxjs/toolkit';
import ShowModalReducer from '../slices/ShowModalSlice';
import MonthIndexReducer from '../slices/MonthIndexSlice';
import ShowTodayTasksReducer from '../slices/ShowTodayTasksSlice';
import TodayEventsReducer from '../slices/TodayEventsSlice';
import MonthEventsReducer from '../slices/MonthEventsSlice';
import ShowInvitationReducer from '../slices/ShowInvitationModal';
import UserState from '../slices/UserStateSlice';

export default configureStore({
  reducer: {
    ShowModal: ShowModalReducer,
    MonthIndex: MonthIndexReducer,
    ShowTodayTasks: ShowTodayTasksReducer,
    TodayEvents: TodayEventsReducer,
    MonthEvents: MonthEventsReducer,
    ShowInvitationModal: ShowInvitationReducer,
    SetUser: UserState,
  },
});
