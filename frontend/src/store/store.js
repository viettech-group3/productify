import { configureStore } from '@reduxjs/toolkit'
import ShowModalReducer from '../slices/ShowModalSlice'
import MonthIndexReducer from '../slices/MonthIndexSlice'
import ShowTodayTasksReducer from '../slices/ShowTodayTasksSlice'

export default configureStore({
    reducer: {
        ShowModal: ShowModalReducer,
        MonthIndex: MonthIndexReducer,
        ShowTodayTasks: ShowTodayTasksReducer
    }
})