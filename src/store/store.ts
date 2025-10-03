import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import medicationsSlice from './slices/medicationsSlice'
import remindersSlice from './slices/remindersSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    medications: medicationsSlice,
    reminders: remindersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch