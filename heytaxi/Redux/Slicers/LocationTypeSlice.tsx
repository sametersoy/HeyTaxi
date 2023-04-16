import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Location} from '../../Models/Location'

export interface typeState {
  value: string
}

const initialState: typeState = {
  value: "",
}
export const locationTypeSlice = createSlice({
  name: 'locationType',
  initialState,
  reducers: {
    currentType: (state, action: PayloadAction<string>) => {
      console.log("action : "+action.payload);
      
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {currentType} = locationTypeSlice.actions

export default locationTypeSlice.reducer