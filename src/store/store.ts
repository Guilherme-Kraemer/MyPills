import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import medicationsSlice from './slices/medicationsSlice'
import remindersSlice from './slices/remindersSlice'
import financesSlice from './slices/financesSlice'
import transportSlice from './slices/transportSlice'
import shoppingSlice from './slices/shoppingSlice'
import assistantSlice from './slices/assistantSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    medications: medicationsSlice,
    reminders: remindersSlice,
    finances: financesSlice,
    transport: transportSlice,
    shopping: shoppingSlice,
    assistant: assistantSlice,
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