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

export const {setUser, addToLikedPosts, removeFromLikedPosts, updateUser, clearUser} = userSlice.actions

export default userSlice.reducer
