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
            console.log(state.user);
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        addToLikedPosts: (state, action) => {
            console.log(action.payload);
            const postIdToAdd = action.payload;
            state.user = {
                ...state.user,
                likedPosts: [...state.user.likedPosts, postIdToAdd]
            };
            console.log(state.user);
        },
        addToSavedPosts: (state, action) => {
            console.log(action.payload);
            const postIdToAdd = action.payload;
            state.user = {
                ...state.user,
                savedPosts: [...state.user.savedPosts, postIdToAdd]
            };
            console.log(state.user);
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
        clearUser: (state) => {
            state.user = initialState.user;
        },

    }

})

export const {setUser, addToLikedPosts, removeFromLikedPosts, addToSavedPosts, updateUser, clearUser, removeFromSavedPosts} = userSlice.actions

export default userSlice.reducer
