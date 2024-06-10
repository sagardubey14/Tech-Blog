import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState ={
    posts:[],
}

export const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        setTrend:(state, action)=>{
            state.posts = action.payload
        },
        addPost : (state, action)=>{
            const post = {
                id:nanoid(),
                usernameCreatedBy: action.payload.username,
                keywords: action.payload.keywords,
                title: action.payload.title,
                description: action.payload.description,
                code: action.payload.code,
                likes:0,
                comments:[],
            }
            state.posts.push(post)
        },
        removePost: ()=>{
            console.log("remove");
        },
        updatePost: ()=>{
            console.log("update");
        },
    }

})

export const {addPost, removePost, setTrend} = postSlice.actions

export default postSlice.reducer
