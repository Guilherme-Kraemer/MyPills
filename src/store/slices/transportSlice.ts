import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BusRoute, BusStop, RouteArrival } from '@types/index'

export interface TransportState {
  routes: BusRoute[]
  favoriteRoutes: string[]
  nearbyStops: BusStop[]
  arrivals: RouteArrival[]
  isLoading: boolean
  error: string | null
}

const initialState: TransportState = {
  routes: [],
  favoriteRoutes: [],
  nearbyStops: [],
  arrivals: [],
  isLoading: false,
  error: null,
}

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setRoutes: (state, action: PayloadAction<BusRoute[]>) => {
      state.routes = action.payload
    },
    addFavoriteRoute: (state, action: PayloadAction<string>) => {
      if (!state.favoriteRoutes.includes(action.payload)) {
        state.favoriteRoutes.push(action.payload)
        localStorage.setItem('mypills_favorite_routes', JSON.stringify(state.favoriteRoutes))
      }
    },
    removeFavoriteRoute: (state, action: PayloadAction<string>) => {
      state.favoriteRoutes = state.favoriteRoutes.filter(id => id !== action.payload)
      localStorage.setItem('mypills_favorite_routes', JSON.stringify(state.favoriteRoutes))
    },
    setNearbyStops: (state, action: PayloadAction<BusStop[]>) => {
      state.nearbyStops = action.payload
    },
    setArrivals: (state, action: PayloadAction<RouteArrival[]>) => {
      state.arrivals = action.payload
    },
    loadFromStorage: (state) => {
      try {
        const saved = localStorage.getItem('mypills_favorite_routes')
        if (saved) state.favoriteRoutes = JSON.parse(saved)
      } catch (error) {
        console.error('Error loading transport data:', error)
      }
    },
  },
})

export const {
  setLoading,
  setRoutes,
  addFavoriteRoute,
  removeFavoriteRoute,
  setNearbyStops,
  setArrivals,
  loadFromStorage,
} = transportSlice.actions

export default transportSlice.reducer