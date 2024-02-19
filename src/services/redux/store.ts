import { configureStore } from '@reduxjs/toolkit'
import todoListSlice from './features/todoListSlice'

export const store = configureStore({
  reducer: {
    todoListSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
