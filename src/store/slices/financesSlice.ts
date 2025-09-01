import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FinancialAccount, FinancialTransaction } from '@types/index'

export interface FinancesState {
  accounts: FinancialAccount[]
  transactions: FinancialTransaction[]
  isLoading: boolean
  error: string | null
}

const initialState: FinancesState = {
  accounts: [],
  transactions: [],
  isLoading: false,
  error: null,
}

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addAccount: (state, action: PayloadAction<FinancialAccount>) => {
      state.accounts.push(action.payload)
      localStorage.setItem('mypills_accounts', JSON.stringify(state.accounts))
    },
    addTransaction: (state, action: PayloadAction<FinancialTransaction>) => {
      state.transactions.push(action.payload)
      localStorage.setItem('mypills_transactions', JSON.stringify(state.transactions))
    },
    loadFromStorage: (state) => {
      try {
        const savedAccounts = localStorage.getItem('mypills_accounts')
        const savedTransactions = localStorage.getItem('mypills_transactions')
        
        if (savedAccounts) state.accounts = JSON.parse(savedAccounts)
        if (savedTransactions) state.transactions = JSON.parse(savedTransactions)
      } catch (error) {
        console.error('Error loading finances:', error)
      }
    },
  },
})

export const {
  setLoading,
  addAccount,
  addTransaction,
  loadFromStorage,
} = financesSlice.actions

export default financesSlice.reducer