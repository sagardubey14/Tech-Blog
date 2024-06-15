import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/user/userSlice'
import userPostsReducer from '../features/posts/userPostSlice'

export const store = configureStore({
  reducer: {
    posts:postReducer,
    user:userReducer,
    userposts:userPostsReducer,
  },
})
