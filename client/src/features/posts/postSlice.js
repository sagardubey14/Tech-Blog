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
        updatePost: (state,action)=>{
            console.log("update",action.payload);
            const { id, likes } = action.payload;
            const postToUpdate = state.posts.find(post => post._id === id);
                if (postToUpdate) {
                postToUpdate.likes += likes;
            }
        },
        addComment: (state,action)=>{
            console.log("comment",action.payload);
            const { id, comment, username } = action.payload;
            const postToUpdate = state.posts.find(post => post._id === id);
            if (postToUpdate) {
                let dateObj = new Date();

                let month = String(dateObj.getMonth() + 1)
                    .padStart(2, '0');
                    
                let day = String(dateObj.getDate())
                    .padStart(2, '0');
    
                let year = dateObj.getFullYear();
                let output = day + '/' + month + '/' + year;
    
                postToUpdate.comments.push({
                    "username":username,
                    "comment":comment,
                    "date": output,
                })
            }
           
        },
    }

})

export const {addPost, removePost, setTrend, updatePost, addComment} = postSlice.actions

export default postSlice.reducer
