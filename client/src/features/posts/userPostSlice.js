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
        addPost : (state, action)=>{
            console.log("add");
        },
        removePost: ()=>{
            console.log("remove");
        },
        updatePost: ()=>{
            console.log("update");
        },
    }

})

export const {addPost, removePost, getPosts} = userPostSlice.actions

export default userPostSlice.reducer
