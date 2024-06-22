import { createSlice, current } from "@reduxjs/toolkit";

const initialState ={
    user:{
        username:'',
        email:'',
        question:'',
        saved:[],
        followers:[],
        following:[],
        likedPosts:[],
        savedPosts:[],
    },
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        addToLikedPosts: (state, action) => {
            const postIdToAdd = action.payload;
            state.user = {
                ...state.user,
                likedPosts: [...state.user.likedPosts, postIdToAdd]
            };
        },
        addToSavedPosts: (state, action) => {
            const postIdToAdd = action.payload;
            state.user = {
                ...state.user,
                savedPosts: [...state.user.savedPosts, postIdToAdd]
            };
        },
        removeFromSavedPosts: (state, action) => {
            const postIdToRemove = action.payload;
            state.user = {
                ...state.user,
                savedPosts: state.user.savedPosts.filter(postId => postId !== postIdToRemove)
            };
        },
        removeFromLikedPosts: (state, action) => {
            const postIdToRemove = action.payload;
            state.user = {
                ...state.user,
                likedPosts: state.user.likedPosts.filter(postId => postId !== postIdToRemove)
            };
        },
        addToFollowing: (state, action) => {
            const userIdToAdd = action.payload;
            state.user = {
                ...state.user,
                following: [...state.user.following, userIdToAdd]
            };
        },
        removeFromFollowing: (state, action) => {
            const userIdToRemove = action.payload;
            state.user = {
                ...state.user,
                following: state.user.following.filter(userId => userId !== userIdToRemove)
            };
        },
        addToFollowers: (state, action) => {
            const userIdToAdd = action.payload;
            state.user = {
                ...state.user,
                followers: [...state.user.followers, userIdToAdd]
            };
        },
        clearUser: (state) => {
            state.user = initialState.user;
        },

    }

})

export const {setUser, addToLikedPosts, removeFromLikedPosts, addToSavedPosts, updateUser, clearUser, removeFromSavedPosts, addToFollowing, addToFollowers, removeFromFollowing} = userSlice.actions

export default userSlice.reducer
