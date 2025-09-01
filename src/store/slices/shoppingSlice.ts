import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShoppingList, ShoppingItem } from '@types/index'

export interface ShoppingState {
  lists: ShoppingList[]
  isLoading: boolean
  error: string | null
}

const initialState: ShoppingState = {
  lists: [],
  isLoading: false,
  error: null,
}

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addList: (state, action: PayloadAction<ShoppingList>) => {
      state.lists.push(action.payload)
      localStorage.setItem('mypills_shopping_lists', JSON.stringify(state.lists))
    },
    updateList: (state, action: PayloadAction<ShoppingList>) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id)
      if (index !== -1) {
        state.lists[index] = action.payload
        localStorage.setItem('mypills_shopping_lists', JSON.stringify(state.lists))
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload)
      localStorage.setItem('mypills_shopping_lists', JSON.stringify(state.lists))
    },
    toggleItemPurchased: (state, action: PayloadAction<{ listId: string; itemId: string }>) => {
      const list = state.lists.find(l => l.id === action.payload.listId)
      if (list) {
        const item = list.items.find(i => i.id === action.payload.itemId)
        if (item) {
          item.isPurchased = !item.isPurchased
          localStorage.setItem('mypills_shopping_lists', JSON.stringify(state.lists))
        }
      }
    },
    loadFromStorage: (state) => {
      try {
        const saved = localStorage.getItem('mypills_shopping_lists')
        if (saved) state.lists = JSON.parse(saved)
      } catch (error) {
        console.error('Error loading shopping lists:', error)
      }
    },
  },
})

export const {
  setLoading,
  addList,
  updateList,
  deleteList,
  toggleItemPurchased,
  loadFromStorage,
} = shoppingSlice.actions

export default shoppingSlice.reducer