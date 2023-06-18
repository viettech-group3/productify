import { configureStore } from '@reduxjs/toolkit'
import ShowModalReducer from '../slices/ShowModalSlice'
import MonthIndexReducer from '../slices/MonthIndexSlice'
import ShowTodayTasksReducer from '../slices/ShowTodayTasksSlice'
import TodayEventsReducer from '../slices/TodayEventsSlice'
import RefetchEventsReducer from '../slices/RefetchEventsSlice'

export default configureStore({
    reducer: {
        ShowModal: ShowModalReducer,
        MonthIndex: MonthIndexReducer,
        ShowTodayTasks: ShowTodayTasksReducer,
        TodayEvents: TodayEventsReducer,
        RefetchEvents: RefetchEventsReducer
    }
})