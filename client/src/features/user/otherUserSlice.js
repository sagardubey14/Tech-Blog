import { createSlice, current } from "@reduxjs/toolkit";

const initialState ={
    otheruser:{
        username:'',
        followers:[],
        following:[],
    },
}

export const otherUserSlice = createSlice({
    name:'otheruser',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.otheruser = action.payload;
        },
        addToFollowers: (state, action) => {
            const userIdToAdd = action.payload;
            state.otheruser = {
                ...state.otheruser,
                followers: [...state.otheruser.followers, userIdToAdd]
            };
        },
        removeFromFollowers: (state, action) => {
            const userIdToRemove = action.payload;
            state.otheruser = {
                ...state.otheruser,
                followers: state.otheruser.followers.filter(userId => userId !== userIdToRemove)
            };
        },
    }

})

export const {setUser, addToFollowers, removeFromFollowers} = otherUserSlice.actions

export default otherUserSlice.reducer
