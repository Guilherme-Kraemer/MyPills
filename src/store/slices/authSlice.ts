import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/index'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  hasCompletedOnboarding: boolean
  biometricEnabled: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  hasCompletedOnboarding: false,
  biometricEnabled: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
    },
    
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true
    },
    
    enableBiometric: (state, action: PayloadAction<boolean>) => {
      state.biometricEnabled = action.payload
      if (state.user) {
        state.user.preferences.biometricAuth = action.payload
      }
    },
    
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload }
      }
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    checkAuthStatus: (state) => {
      // Check if user was previously authenticated (localStorage/IndexedDB)
      const savedUser = localStorage.getItem('mypills_user')
      const onboardingCompleted = localStorage.getItem('mypills_onboarding_completed')
      
      if (savedUser) {
        try {
          state.user = JSON.parse(savedUser)
          state.isAuthenticated = true
        } catch {
          localStorage.removeItem('mypills_user')
        }
      }
      
      state.hasCompletedOnboarding = onboardingCompleted === 'true'
      state.isLoading = false
    }
  },
})

export const {
  setLoading,
  loginSuccess,
  loginFailure,
  logout,
  completeOnboarding,
  enableBiometric,
  updateUserPreferences,
  clearError,
  checkAuthStatus,
} = authSlice.actions

export default authSlice.reducer