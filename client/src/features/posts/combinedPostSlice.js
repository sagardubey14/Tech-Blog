import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userposts: [],
  savedposts: [],
  resultposts: [],
  trendposts: [],
  otheruserposts:[],
  selectedpost:{
    name:'',
    post:{},
  },
};

const updatePostInArray = (posts, id, updatedPost) => {
  const index = posts.findIndex(p => p._id === id);
  if (index !== -1) {
    posts[index] = updatedPost;
  }
};

const removePostFromArray = (posts, id) => {
  return posts.filter(p => p._id !== id);
};


const updateLikes = (posts, id, likes) => {
  const postToUpdate = posts.find(post => post._id === id);
  if (postToUpdate) {
    postToUpdate.likes += likes;
  }
};

const addCommentToPost = (posts, id, comment) => {
  const postToUpdate = posts.find(post => post._id === id);
  if (postToUpdate) {
    postToUpdate.comments.push(comment);
  }
};

const updateCommentReply = (posts, id, comment, commentIndex) => {
  const postToUpdate = posts.find(post => post._id === id);
  if (postToUpdate) {
    postToUpdate.comments[commentIndex] = comment;
  }
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
    setOtherPosts:(state, action)=>{
      state.otheruserposts = action.payload
    },

    //userpost actions
    updateUserPost: (state, action) => {
      const { id, post } = action.payload;
      updatePostInArray(state.userposts, id, post);
      updatePostInArray(state.userposts, id, post);
      updatePostInArray(state.savedposts, id, post);
      updatePostInArray(state.trendposts, id, post);
      updatePostInArray(state.resultposts, id, post);
    },
    addUserPost: (state, action) => {
      console.log(action.payload);
      state.userposts.push(action.payload);
      console.log(state.userposts);
    },
    removeUserPost: (state, action) => {
      const { id } = action.payload;
      state.userposts = removePostFromArray(state.userposts, id);
      state.userposts = removePostFromArray(state.userposts, id);
      state.savedposts = removePostFromArray(state.savedposts, id);
      state.trendposts = removePostFromArray(state.trendposts, id);
      state.resultposts = removePostFromArray(state.resultposts, id);
    },

    
    // Posts reducers
    postLikes: (state, action) => {
      const { likes, name, id } = action.payload;
      console.log(name);
      if (state.selectedpost.post && state.selectedpost.post._id === id) {
        state.selectedpost.post.likes += likes;
      }
      updateLikes(state.userposts, id, likes);
      updateLikes(state.savedposts, id, likes);
      updateLikes(state.trendposts, id, likes);
      updateLikes(state.resultposts, id, likes);

    },
    
    addComment: (state, action) => {
      const { id, comment } = action.payload;
      if (state.selectedpost.post && state.selectedpost.post._id === id) {
        state.selectedpost.post.comments.push(comment);
      }
      addCommentToPost(state.userposts, id, comment);
      addCommentToPost(state.savedposts, id, comment);
      addCommentToPost(state.trendposts, id, comment);
      addCommentToPost(state.resultposts, id, comment);
    },
    
    addCommentReply: (state, action) => {
      const { id, comment, cmntId } = action.payload;
      const index = state.selectedpost.post.comments.findIndex(cmnt => cmnt.id === cmntId);
      if (index !== -1) {
        state.selectedpost.post.comments[index] = comment;
      }

      // Update comment reply in all relevant arrays
      updateCommentReply(state.userposts, id, comment, index);
      updateCommentReply(state.savedposts, id, comment, index);
      updateCommentReply(state.trendposts, id, comment, index);
      updateCommentReply(state.resultposts, id, comment, index);
      
    },
    clearUserPosts:(state)=>{
      state.userposts = initialState.userposts
      state.savedposts = initialState.savedposts
    }
  },
});

// Exporting actions
export const {
  setSearchedPosts,
  setTrendPosts,
  setUserPosts,
  setSavedPosts,
  setSelectedPost,
  setOtherPosts,
  updateUserPost,
  addUserPost,
  removeUserPost,
  postLikes,
  addComment,
  addCommentReply,
  clearUserPosts,
} = combinedPostSlice.actions;

export default combinedPostSlice.reducer;
