import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState ={
    posts:[],
    trend:[],
}

export const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        setTrend:(state, action)=>{
            state.trend = action.payload
        },
        setPosts:(state, action)=>{
            state.posts = action.payload
        },
        setOtherPosts:(state, action)=>{
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
            const { id, likes } = action.payload;
            const postToUpdate = state.posts.find(post => post._id === id);
                if (postToUpdate) {
                postToUpdate.likes += likes;
            }
        },
        addComment: (state,action)=>{
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
                    "id":nanoid(),
                    "username":username,
                    "comment":comment,
                    "date": output,
                    "reply":[],
                })
            }
           
        },
        addCommentReply: (state,action)=>{
            const { id, comment, username, cmntId } = action.payload;
            const postToUpdate = state.posts.find(post => post._id === id);
            const cmntToAddReply = postToUpdate.comments.find(cmnt=>cmnt.id===cmntId)
            if (cmntToAddReply) {
                let dateObj = new Date();

                let month = String(dateObj.getMonth() + 1)
                    .padStart(2, '0');
                    
                let day = String(dateObj.getDate())
                    .padStart(2, '0');
    
                let year = dateObj.getFullYear();
                let output = day + '/' + month + '/' + year;
    
                cmntToAddReply.reply.push({
                    "id":nanoid(),
                    "username":username,
                    "comment":comment,
                    "date": output,
                })
            }
           
        },
    }

})

export const {setPosts, addPost, removePost, setTrend, updatePost, addComment, addCommentReply, setOtherPosts} = postSlice.actions

export default postSlice.reducer
