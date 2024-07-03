import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import otherUserReducer from '../features/user/otherUserSlice'
import noteReducer from '../features/notifications/noteSlice'
import combinedReducer from '../features/posts/combinedPostSlice'
import queryReducer from '../features/query/querySlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    otheruser:otherUserReducer,
    message:noteReducer,
    combined:combinedReducer,
    query:queryReducer,
  },
})
