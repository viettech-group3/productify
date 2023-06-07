import { configureStore } from '@reduxjs/toolkit'
import ShowModalReducer from '../slices/ShowModalSlice'
import MonthIndexReducer from '../slices/MonthIndexSlice'

export default configureStore({
    reducer: {
        ShowModal: ShowModalReducer,
        MonthIndex: MonthIndexReducer
    }
})