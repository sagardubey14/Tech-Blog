import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/user/userSlice'
import userPostsReducer from '../features/posts/userPostSlice'
import otherUserReducer from '../features/user/otherUserSlice'

export const store = configureStore({
  reducer: {
    posts:postReducer,
    user:userReducer,
    userposts:userPostsReducer,
    otheruser:otherUserReducer,
  },
})
