import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Reminder } from '../../types/index'

export interface RemindersState {
  reminders: Reminder[]
  isLoading: boolean
  error: string | null
}

const initialState: RemindersState = {
  reminders: [],
  isLoading: false,
  error: null,
}

const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setReminders: (state, action: PayloadAction<Reminder[]>) => {
      state.reminders = action.payload
    },
    addReminder: (state, action: PayloadAction<Reminder>) => {
      state.reminders.push(action.payload)
      localStorage.setItem('mypills_reminders', JSON.stringify(state.reminders))
    },
    updateReminder: (state, action: PayloadAction<Reminder>) => {
      const index = state.reminders.findIndex(r => r.id === action.payload.id)
      if (index !== -1) {
        state.reminders[index] = action.payload
        localStorage.setItem('mypills_reminders', JSON.stringify(state.reminders))
      }
    },
    deleteReminder: (state, action: PayloadAction<string>) => {
      state.reminders = state.reminders.filter(r => r.id !== action.payload)
      localStorage.setItem('mypills_reminders', JSON.stringify(state.reminders))
    },
    completeReminder: (state, action: PayloadAction<string>) => {
      const reminder = state.reminders.find(r => r.id === action.payload)
      if (reminder) {
        reminder.isCompleted = true
        localStorage.setItem('mypills_reminders', JSON.stringify(state.reminders))
      }
    },
    loadFromStorage: (state) => {
      try {
        const saved = localStorage.getItem('mypills_reminders')
        if (saved) {
          state.reminders = JSON.parse(saved)
        }
      } catch (error) {
        console.error('Error loading reminders:', error)
      }
    },
  },
})

export const {
  setLoading,
  setReminders,
  addReminder,
  updateReminder,
  deleteReminder,
  completeReminder,
  loadFromStorage,
} = remindersSlice.actions

export default remindersSlice.reducer