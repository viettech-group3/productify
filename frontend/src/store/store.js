import { configureStore } from '@reduxjs/toolkit';
import ShowModalReducer from '../slices/ShowModalSlice';
import MonthIndexReducer from '../slices/MonthIndexSlice';
import ShowTodayTasksReducer from '../slices/ShowTodayTasksSlice';
import TodayEventsReducer from '../slices/TodayEventsSlice';
import MonthEventsReducer from '../slices/MonthEventsSlice';
import ShowInvitationReducer from '../slices/ShowInvitationModal';
import UserState from '../slices/UserStateSlice';
import LabelReducer from '../slices/LabelSlice';
import ShowLabelFormReducer from '../slices/ShowLabelForm';
import ShowEventUpdateFormReducer from '../slices/ShowEventUpdateFormSlice';
import SelectedEventReducer from '../slices/SelectedEventSlice';

export default configureStore({
  reducer: {
    ShowModal: ShowModalReducer,
    MonthIndex: MonthIndexReducer,
    ShowTodayTasks: ShowTodayTasksReducer,
    TodayEvents: TodayEventsReducer,
    MonthEvents: MonthEventsReducer,
    ShowInvitationModal: ShowInvitationReducer,
    SetUser: UserState,
    Label: LabelReducer,
    ShowLabelForm: ShowLabelFormReducer,
    ShowEventUpdateForm: ShowEventUpdateFormReducer,
    SelectedEvent: SelectedEventReducer,
  },
});
