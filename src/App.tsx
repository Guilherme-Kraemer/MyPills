import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { RootState, AppDispatch } from './store/store'
import { checkAuthStatus } from './store/slices/authSlice'

// Pages
import LoadingScreen from '@components/LoadingScreen'
import OnboardingScreen from '@features/auth/OnboardingScreen'
import LoginScreen from '@features/auth/LoginScreen'
import DashboardScreen from '@features/dashboard/DashboardScreen'
import MedicationsScreen from '@features/medications/MedicationsScreen'
import RemindersScreen from '@features/reminders/RemindersScreen'
import SettingsScreen from '@features/settings/SettingsScreen'

// Layout
import AppLayout from '@components/AppLayout'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen />
  }

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/medications/*" element={<MedicationsScreen />} />
          <Route path="/reminders" element={<RemindersScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppLayout>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-text-disabled)',
          },
        }}
      />
    </>
  )
}

export default App