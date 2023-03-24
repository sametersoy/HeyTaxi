import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Location} from '../../Models/Location'

const initialState: Location = {
  timestamp: 0,
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  altitude: 0,
  altitudeAccuracy: 0,
  course: 0,
  speed: 0
}
export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    currentloc: (state) => {
      state = state
    }
  },
})

// Action creators are generated for each case reducer function
export const {currentloc} = locationSlice.actions

export default locationSlice.reducer