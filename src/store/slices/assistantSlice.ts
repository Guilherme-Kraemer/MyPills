import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Conversation, Message } from '@types/index'

export interface AssistantState {
  conversations: Conversation[]
  activeConversationId: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AssistantState = {
  conversations: [],
  activeConversationId: null,
  isLoading: false,
  error: null,
}

const assistantSlice = createSlice({
  name: 'assistant',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload)
      state.activeConversationId = action.payload.id
      localStorage.setItem('mypills_conversations', JSON.stringify(state.conversations))
    },
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeConversationId = action.payload
    },
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
      const conversation = state.conversations.find(c => c.id === action.payload.conversationId)
      if (conversation) {
        conversation.messages.push(action.payload.message)
        conversation.lastActivity = new Date()
        localStorage.setItem('mypills_conversations', JSON.stringify(state.conversations))
      }
    },
    loadFromStorage: (state) => {
      try {
        const saved = localStorage.getItem('mypills_conversations')
        if (saved) {
          state.conversations = JSON.parse(saved)
          if (state.conversations.length > 0) {
            state.activeConversationId = state.conversations[0].id
          }
        }
      } catch (error) {
        console.error('Error loading conversations:', error)
      }
    },
  },
})

export const {
  setLoading,
  addConversation,
  setActiveConversation,
  addMessage,
  loadFromStorage,
} = assistantSlice.actions

export default assistantSlice.reducer