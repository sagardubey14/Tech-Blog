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
            console.log(state.otheruser);
        },
    }

})

export const {setUser} = otherUserSlice.actions

export default otherUserSlice.reducer
