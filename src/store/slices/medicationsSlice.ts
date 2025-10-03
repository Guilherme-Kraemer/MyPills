import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Medication, MedicationSchedule, MedicationLog } from '../../types/index'

export interface MedicationsState {
  medications: Medication[]
  schedules: MedicationSchedule[]
  logs: MedicationLog[]
  isLoading: boolean
  error: string | null
  selectedMedication: Medication | null
  scannerOpen: boolean
}

const initialState: MedicationsState = {
  medications: [],
  schedules: [],
  logs: [],
  isLoading: false,
  error: null,
  selectedMedication: null,
  scannerOpen: false,
}

const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    setMedications: (state, action: PayloadAction<Medication[]>) => {
      state.medications = action.payload
      state.isLoading = false
    },
    
    addMedication: (state, action: PayloadAction<Medication>) => {
      state.medications.push(action.payload)
      // Save to localStorage
      localStorage.setItem('mypills_medications', JSON.stringify(state.medications))
    },
    
    updateMedication: (state, action: PayloadAction<Medication>) => {
      const index = state.medications.findIndex(med => med.id === action.payload.id)
      if (index !== -1) {
        state.medications[index] = action.payload
        localStorage.setItem('mypills_medications', JSON.stringify(state.medications))
      }
    },
    
    deleteMedication: (state, action: PayloadAction<string>) => {
      state.medications = state.medications.filter(med => med.id !== action.payload)
      state.schedules = state.schedules.filter(schedule => schedule.medicationId !== action.payload)
      localStorage.setItem('mypills_medications', JSON.stringify(state.medications))
      localStorage.setItem('mypills_schedules', JSON.stringify(state.schedules))
    },
    
    setSelectedMedication: (state, action: PayloadAction<Medication | null>) => {
      state.selectedMedication = action.payload
    },
    
    addSchedule: (state, action: PayloadAction<MedicationSchedule>) => {
      state.schedules.push(action.payload)
      localStorage.setItem('mypills_schedules', JSON.stringify(state.schedules))
    },
    
    updateSchedule: (state, action: PayloadAction<MedicationSchedule>) => {
      const index = state.schedules.findIndex(schedule => schedule.id === action.payload.id)
      if (index !== -1) {
        state.schedules[index] = action.payload
        localStorage.setItem('mypills_schedules', JSON.stringify(state.schedules))
      }
    },
    
    deleteSchedule: (state, action: PayloadAction<string>) => {
      state.schedules = state.schedules.filter(schedule => schedule.id !== action.payload)
      localStorage.setItem('mypills_schedules', JSON.stringify(state.schedules))
    },
    
    addMedicationLog: (state, action: PayloadAction<MedicationLog>) => {
      state.logs.push(action.payload)
      localStorage.setItem('mypills_medication_logs', JSON.stringify(state.logs))
    },
    
    takeMedication: (state, action: PayloadAction<{ medicationId: string; scheduledFor: Date; notes?: string }>) => {
      const log: MedicationLog = {
        id: crypto.randomUUID(),
        medicationId: action.payload.medicationId,
        takenAt: new Date(),
        scheduledFor: action.payload.scheduledFor,
        status: 'taken',
        notes: action.payload.notes,
      }
      
      state.logs.push(log)
      
      // Update medication quantity
      const medication = state.medications.find(med => med.id === action.payload.medicationId)
      if (medication && medication.currentQuantity > 0) {
        medication.currentQuantity -= 1
        medication.updatedAt = new Date()
      }
      
      localStorage.setItem('mypills_medication_logs', JSON.stringify(state.logs))
      localStorage.setItem('mypills_medications', JSON.stringify(state.medications))
    },
    
    openScanner: (state) => {
      state.scannerOpen = true
    },
    
    closeScanner: (state) => {
      state.scannerOpen = false
    },
    
    loadFromStorage: (state) => {
      try {
        const savedMedications = localStorage.getItem('mypills_medications')
        const savedSchedules = localStorage.getItem('mypills_schedules')
        const savedLogs = localStorage.getItem('mypills_medication_logs')
        
        if (savedMedications) {
          state.medications = JSON.parse(savedMedications)
        }
        if (savedSchedules) {
          state.schedules = JSON.parse(savedSchedules)
        }
        if (savedLogs) {
          state.logs = JSON.parse(savedLogs)
        }
      } catch (error) {
        console.error('Error loading medications from storage:', error)
      }
    },
  },
})

export const {
  setLoading,
  setError,
  clearError,
  setMedications,
  addMedication,
  updateMedication,
  deleteMedication,
  setSelectedMedication,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  addMedicationLog,
  takeMedication,
  openScanner,
  closeScanner,
  loadFromStorage,
} = medicationsSlice.actions

export default medicationsSlice.reducer