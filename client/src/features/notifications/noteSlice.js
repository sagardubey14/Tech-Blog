import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    message:{
        msg:'Message',
        time:5,
        showMsg:false,
        type:2,
    },
}

export const noteSlice = createSlice({
    name:'message',
    initialState,
    reducers:{
        setMsg: (state, action) => {
            state.message = action.payload;
        },
        setTimeLeft: (state, action) => {
            state.message.time = action.payload;
        },
        setShowMsg: (state, action) => {
            state.message.showMsg = action.payload;
        },
    }

})

export const {setMsg, setTimeLeft, setShowMsg} = noteSlice.actions

export default noteSlice.reducer
