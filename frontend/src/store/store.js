import { configureStore } from '@reduxjs/toolkit';
import ShowModalReducer from '../slices/ShowModalSlice';
import MonthIndexReducer from '../slices/MonthIndexSlice';
import ShowTodayTasksReducer from '../slices/ShowTodayTasksSlice';
import TodayEventsReducer from '../slices/TodayEventsSlice';
import MonthEventsReducer from '../slices/MonthEventsSlice';
import ShowInvitationReducer from '../slices/ShowInvitationModal';
import UserStateReducer from '../slices/UserStateSlice';
import WinnerReducer from '../slices/WinnerSlice';
import LabelReducer from '../slices/LabelSlice';
import ShowLabelFormReducer from '../slices/ShowLabelForm';
import ShowEventUpdateFormReducer from '../slices/ShowEventUpdateFormSlice';
import SelectedEventReducer from '../slices/SelectedEventSlice';
import ViewModeReducer from '../slices/ViewModeSlice';
import CurrentDateReducer from '../slices/CurrentDateSlice';

export default configureStore({
  reducer: {
    ShowModal: ShowModalReducer,
    MonthIndex: MonthIndexReducer,
    ShowTodayTasks: ShowTodayTasksReducer,
    TodayEvents: TodayEventsReducer,
    MonthEvents: MonthEventsReducer,
    ShowInvitationModal: ShowInvitationReducer,
    UserState: UserStateReducer,
    setWinner: WinnerReducer,
    Label: LabelReducer,
    ShowLabelForm: ShowLabelFormReducer,
    ShowEventUpdateForm: ShowEventUpdateFormReducer,
    SelectedEvent: SelectedEventReducer,
    ViewMode: ViewModeReducer,
    CurrentDate: CurrentDateReducer,
  },
});
