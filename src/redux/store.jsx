import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../redux/coine/coineSlice'
export const store = configureStore({
  reducer: {
    coin: coinReducer
  },
})