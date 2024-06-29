import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState ={
    userposts:[],
    savedpost:[],
}

export const userPostSlice = createSlice({
    name:'userposts',
    initialState,
    reducers:{
        getPosts:(state, action)=>{
            state.userposts = action.payload
        },
        getSavedPosts:(state, action)=>{
            state.savedpost = action.payload
        },
        updatePost:(state, action)=>{
            const { id, post} = action.payload;
            const index = state.userposts.findIndex(p => p._id === id);
            if (index !== -1) {
                state.userposts[index] = post;
            }
        },
        addPost : (state, action)=>{
            state.userposts.push(action.payload)
        },
        removePost: (state, action)=>{
            const { id} = action.payload;
            state.userposts = state.userposts.filter(p=>p._id !== id)
        },
    }

})

export const {addPost, removePost, getPosts, getSavedPosts, updatePost} = userPostSlice.actions

export default userPostSlice.reducer
