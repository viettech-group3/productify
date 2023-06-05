import { configureStore } from '@reduxjs/toolkit'
import ShowModalReducer from '../slices/ShowModalSlice'

export default configureStore({
    reducer: {
        ShowModal: ShowModalReducer
    }
})