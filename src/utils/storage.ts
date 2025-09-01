import localforage from 'localforage'

// Configure localforage for better storage
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'MyPills',
  version: 1.0,
  storeName: 'mypills_data',
  description: 'MyPills application data storage'
})

export class Storage {
  // Generic storage methods
  static async set<T>(key: string, value: T): Promise<void> {
    try {
      await localforage.setItem(key, value)
    } catch (error) {
      console.error(`Error setting storage key ${key}:`, error)
      // Fallback to localStorage
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    try {
      return await localforage.getItem<T>(key)
    } catch (error) {
      console.error(`Error getting storage key ${key}:`, error)
      // Fallback to localStorage
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch {
        return null
      }
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await localforage.removeItem(key)
    } catch (error) {
      console.error(`Error removing storage key ${key}:`, error)
      localStorage.removeItem(key)
    }
  }

  static async clear(): Promise<void> {
    try {
      await localforage.clear()
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing storage:', error)
      localStorage.clear()
    }
  }

  // Specific storage keys
  static readonly KEYS = {
    USER: 'mypills_user',
    MEDICATIONS: 'mypills_medications',
    SCHEDULES: 'mypills_schedules',
    MEDICATION_LOGS: 'mypills_medication_logs',
    REMINDERS: 'mypills_reminders',
    FINANCIAL_ACCOUNTS: 'mypills_accounts',
    FINANCIAL_TRANSACTIONS: 'mypills_transactions',
    SHOPPING_LISTS: 'mypills_shopping_lists',
    CONVERSATIONS: 'mypills_conversations',
    FAVORITE_ROUTES: 'mypills_favorite_routes',
    ONBOARDING_COMPLETED: 'mypills_onboarding_completed',
    SETTINGS: 'mypills_settings',
  }
}

export default Storage