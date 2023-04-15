import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slicers/counterSlice'
import locationReduser, { currentloc } from './Slicers/LocationSlice'
import LocationTypeSlice, { currentType } from './Slicers/LocationTypeSlice'
export const store = configureStore({
  reducer: {
    counter:counterReducer,
    currentloc:locationReduser,
    currentType:LocationTypeSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch