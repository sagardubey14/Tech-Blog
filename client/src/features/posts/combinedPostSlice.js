import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userposts: [],
  savedposts: [],
  resultposts: [],
  trendposts: [],
  selectedpost:{
    name:'',
    post:{},
  },
};

export const combinedPostSlice = createSlice({
  name: 'combined',
  initialState,
  reducers: {
    // User posts reducers
    setSearchedPosts: (state, action) => {
        state.resultposts = action.payload;
    },
    setTrendPosts: (state, action) => {
        state.trendposts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userposts = action.payload;
    },
    setSavedPosts: (state, action) => {
      state.savedposts = action.payload;
    },
    setSelectedPost:(state, action)=>{
        state.selectedpost = action.payload
    },

    //userpost actions
    updateUserPost: (state, action) => {
      const { id, post } = action.payload;
      const index = state.userposts.findIndex(p => p._id === id);
      if (index !== -1) {
        state.userposts[index] = post;
      }
    },
    addUserPost: (state, action) => {
      state.userposts.push(action.payload);
    },
    removeUserPost: (state, action) => {
      const { id } = action.payload;
      state.userposts = state.userposts.filter(p => p._id !== id);
    },


    // Posts reducers
    postLikes: (state, action) => {
      const { likes, name, id } = action.payload;
      console.log(name);
      state.selectedpost.post.likes += likes;
      let userPostToUpdate = state.userposts.find(post => post._id === id);
      if (userPostToUpdate) {
        userPostToUpdate.likes += likes;
      }
      let savedPostToUpdate = state.savedposts.find(post => post._id === id);
      if (savedPostToUpdate) {
        savedPostToUpdate.likes += likes;
      }
      let trendPostToUpdate = state.trendposts.find(post => post._id === id);
      if (trendPostToUpdate) {
        trendPostToUpdate.likes += likes;
      }
      let resPostToUpdate = state.resultposts.find(post => post._id === id);
      if (resPostToUpdate) {
        resPostToUpdate.likes += likes;
      }
    },
    
    // addComment: (state, action) => {
    //   const { id, comment } = action.payload;
    //   const postToUpdate = state.posts.find(post => post._id === id);
    //   postToUpdate.comments.push(comment);
    // },
    // addCommentReply: (state, action) => {
    //   const { id, comment, username, cmntId } = action.payload;
    //   const postToUpdate = state.posts.find(post => post._id === id);
    //   const cmntToAddReply = postToUpdate.comments.find(cmnt => cmnt.id === cmntId);
    //   if (cmntToAddReply) {
    //     let dateObj = new Date();

    //     let month = String(dateObj.getMonth() + 1)
    //       .padStart(2, '0');

    //     let day = String(dateObj.getDate())
    //       .padStart(2, '0');

    //     let year = dateObj.getFullYear();
    //     let output = day + '/' + month + '/' + year;

    //     cmntToAddReply.reply.push({
    //       id: nanoid(),
    //       username: username,
    //       comment: comment,
    //       date: output,
    //     });
    //   }
    // },
  },
});

// Exporting actions
export const {
  setSearchedPosts,
  setUserPosts,
  postLikes,
  addUserPost,
  removeUserPost,
  setSavedPosts,
  updateUserPost,
  setPosts,
  addPost,
  removePost,
  setTrendPosts,
  updatePost,
  addComment,
  addCommentReply,
  setOtherPosts,
  setSelectedPost,
} = combinedPostSlice.actions;

export default combinedPostSlice.reducer;
